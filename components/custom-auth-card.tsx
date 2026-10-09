"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import {
  TaskChooseOrganization,
  TaskResetPassword,
  TaskSetupMFA,
  useSignIn,
  useSignUp,
  useSession,
} from "@clerk/nextjs";
import { ArrowLeft, ArrowRight, Mail } from "lucide-react";
import { FormEvent, useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

type AuthMode = "sign-in" | "sign-up";
type CodePurpose = "sign-in" | "sign-in-mfa" | "sign-up";
type SecurityTask = "choose-organization" | "reset-password" | "setup-mfa";
type BusyAction = "send" | "verify" | "resend" | "details" | null;

type CustomAuthCardProps = {
  mode: AuthMode;
  redirectUrl: string;
  taskMode?: boolean;
};

function errorMessage(error: unknown) {
  if (typeof error === "object" && error !== null) {
    const candidate = error as { longMessage?: unknown; message?: unknown };
    if (typeof candidate.longMessage === "string") return candidate.longMessage;
    if (typeof candidate.message === "string") return candidate.message;
  }
  return "We couldn’t complete that request. Please try again.";
}

function errorCode(error: unknown) {
  return typeof error === "object" && error !== null && "code" in error
    ? String((error as { code: unknown }).code)
    : "";
}

function isSecurityTask(value: unknown): value is SecurityTask {
  return (
    value === "choose-organization" ||
    value === "reset-password" ||
    value === "setup-mfa"
  );
}

export function CustomAuthCard({ mode, redirectUrl, taskMode = false }: CustomAuthCardProps) {
  const router = useRouter();
  const { signIn } = useSignIn();
  const { signUp } = useSignUp();
  const { session, isLoaded: sessionLoaded, isSignedIn } = useSession();
  const [step, setStep] = useState<"email" | "code" | "details" | "task">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [codePurpose, setCodePurpose] = useState<CodePurpose>(
    mode === "sign-in" ? "sign-in" : "sign-up",
  );
  const [busyAction, setBusyAction] = useState<BusyAction>(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [legalAccepted, setLegalAccepted] = useState(false);
  const [pendingFields, setPendingFields] = useState<string[]>([]);
  const [securityTask, setSecurityTask] = useState<SecurityTask | null>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const previousVisibleStep = useRef<string | null>(null);
  const busy = busyAction !== null;

  const otherMode = mode === "sign-in" ? "sign-up" : "sign-in";
  const switchHref = `/${otherMode}?redirect_url=${encodeURIComponent(redirectUrl)}`;
  const hasCurrentTask = Boolean(session?.currentTask);

  useEffect(() => {
    if (sessionLoaded && isSignedIn && !hasCurrentTask) {
      router.replace(redirectUrl);
    }
  }, [sessionLoaded, isSignedIn, hasCurrentTask, router, redirectUrl]);

  async function activateSession(
    finalize: (options: {
      navigate: (args: {
        session: { currentTask?: { key: string } | null };
        decorateUrl: (path: string) => string;
      }) => void;
    }) => Promise<{ error: unknown | null }>,
  ) {
    const result = await finalize({
      navigate: ({ session, decorateUrl }) => {
        const task = session.currentTask?.key;
        if (isSecurityTask(task)) {
          setSecurityTask(task);
          setStep("task");
          return;
        }
        const destination = decorateUrl(redirectUrl);
        if (/^https?:\/\//i.test(destination)) {
          window.location.assign(destination);
        } else {
          router.replace(destination);
        }
      },
    });
    if (result.error) setError(errorMessage(result.error));
  }

  async function showMissingRequirements() {
    const missing = signUp.missingFields ?? [];
    if (missing.includes("protect_check")) {
      setError("Clerk requires an additional security verification. Account creation has not completed. Reload this page or contact the chapter for help.");
      return;
    }
    const supported = missing.filter((field) =>
      ["first_name", "last_name", "legal_accepted"].includes(field),
    );
    if (supported.length > 0) {
      setPendingFields(supported);
      setStep("details");
      setNotice("Your email is verified. Add the remaining details to finish creating your account.");
      return;
    }
    if (missing.length > 0) {
      setError("This account needs an additional requirement that this email-code form can’t collect. Please contact the chapter for help.");
      return;
    }
    await activateSession((options) => signUp.finalize(options));
  }

  async function startEmailFlow(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusyAction("send");
    setError("");
    setNotice("");
    try {
      if (mode === "sign-in") {
        const created = await signIn.create({
          identifier: email.trim(),
        });
        if (created.error) throw created.error;
        const sent = await signIn.emailCode.sendCode();
        if (sent.error) throw sent.error;
        setCodePurpose("sign-in");
      } else {
        const created = await signUp.create({ emailAddress: email.trim() });
        if (created.error) throw created.error;
        const sent = await signUp.verifications.sendEmailCode();
        if (sent.error) throw sent.error;
        setCodePurpose("sign-up");
      }
      setCode("");
      setStep("code");
      setNotice(`We sent a verification code to ${email.trim()}.`);
    } catch (cause) {
      if (mode === "sign-in" && errorCode(cause) === "form_identifier_not_found") {
        setError("No account was found for that email. Select Create an account below to get started.");
      } else {
        setError(errorMessage(cause));
      }
    } finally {
      setBusyAction(null);
    }
  }

  async function finishSignIn() {
    if (signIn.status === "needs_second_factor" || signIn.status === "needs_client_trust") {
      if (signIn.supportedSecondFactors.some((factor) => factor.strategy === "email_code")) {
        const sent = await signIn.mfa.sendEmailCode();
        if (sent.error) throw sent.error;
        setCodePurpose("sign-in-mfa");
        setCode("");
        setNotice("Enter the additional verification code we sent you.");
        setStep("code");
        return;
      }
      setError("Your account requires an additional security step that isn’t available in this browser flow. Please contact the chapter for help.");
      return;
    }
    if (signIn.status === "needs_protect_check") {
      setError("Clerk requires an additional security verification. Sign-in has not completed. Reload this page or contact the chapter for help.");
      return;
    }
    if (signIn.status === "complete") {
      await activateSession((options) => signIn.finalize(options));
      return;
    }
    setError("That code was accepted, but sign-in needs another step. Please try again or contact the chapter.");
  }

  async function verifyCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusyAction("verify");
    setError("");
    setNotice("");
    try {
      if (codePurpose === "sign-up") {
        const verified = await signUp.verifications.verifyEmailCode({ code: code.trim() });
        if (verified.error) throw verified.error;
        await showMissingRequirements();
      } else if (codePurpose === "sign-in-mfa") {
        const verified = await signIn.mfa.verifyEmailCode({ code: code.trim() });
        if (verified.error) throw verified.error;
        await finishSignIn();
      } else {
        const verified = await signIn.emailCode.verifyCode({ code: code.trim() });
        if (verified.error) {
          if (errorCode(verified.error) === "sign_up_if_missing_transfer") {
            const transferred = await signUp.create({ transfer: true });
            if (transferred.error) throw transferred.error;
            await showMissingRequirements();
            return;
          }
          throw verified.error;
        }
        await finishSignIn();
      }
    } catch (cause) {
      setError(errorMessage(cause));
    } finally {
      setBusyAction(null);
    }
  }

  async function resendCode() {
    setBusyAction("resend");
    setError("");
    setNotice("");
    try {
      const result =
        codePurpose === "sign-up"
          ? await signUp.verifications.sendEmailCode()
          : codePurpose === "sign-in-mfa"
            ? await signIn.mfa.sendEmailCode()
            : await signIn.emailCode.sendCode();
      if (result.error) throw result.error;
      setNotice(codePurpose === "sign-in-mfa" ? "A new additional verification code was sent." : `A new code was sent to ${email.trim()}.`);
    } catch (cause) {
      setError(errorMessage(cause));
    } finally {
      setBusyAction(null);
    }
  }

  async function goBack() {
    if (busy) return;
    await Promise.all([signIn.reset(), signUp.reset()]);
    setCode("");
    setError("");
    setNotice("");
    setPendingFields([]);
    setStep("email");
  }

  async function completeDetails(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusyAction("details");
    setError("");
    setNotice("");
    try {
      const updated = await signUp.update({
        ...(pendingFields.includes("first_name") ? { firstName: firstName.trim() } : {}),
        ...(pendingFields.includes("last_name") ? { lastName: lastName.trim() } : {}),
        ...(pendingFields.includes("legal_accepted") ? { legalAccepted } : {}),
      });
      if (updated.error) throw updated.error;
      await showMissingRequirements();
    } catch (cause) {
      setError(errorMessage(cause));
    } finally {
      setBusyAction(null);
    }
  }

  const routeTask = session?.currentTask?.key;
  const activeTask = securityTask ?? (isSecurityTask(routeTask) ? routeTask : null);
  const taskWaiting = taskMode && !sessionLoaded;
  const taskRedirecting = sessionLoaded && Boolean(isSignedIn) && !activeTask;
  const visibleStep = activeTask || taskWaiting || taskRedirecting ? "task" : step;

  useEffect(() => {
    if (previousVisibleStep.current === visibleStep) return;
    previousVisibleStep.current = visibleStep;
    if (visibleStep === "email") emailInputRef.current?.focus();
    if (visibleStep === "details") {
      if (nameInputRef.current) nameInputRef.current.focus();
      else document.getElementById("auth-legal")?.focus();
    }
    if (visibleStep === "code") {
      window.requestAnimationFrame(() => {
        document.getElementById("auth-code")?.focus();
      });
    }
  }, [visibleStep]);

  const title =
    visibleStep === "task"
      ? "One more step"
      : visibleStep === "code"
        ? "Check your email"
        : visibleStep === "details"
          ? "Finish your account"
          : mode === "sign-in"
            ? "Welcome back"
            : "Join the member space";

  return (
    <section className="auth-card" aria-labelledby="auth-title">
      <div className="auth-card__brand">
        <Image
          src="/images/flamivor-logo-approved.png"
          alt="Flamivor Charlotte"
          width={252}
          height={166}
          priority
          className="auth-card__logo"
        />
        <p className="auth-card__kicker">Flamivor Charlotte · Member space</p>
      </div>
      <div className="auth-card__content">
        <p className="auth-card__eyebrow">
          {visibleStep === "code" ? "Email verification" : visibleStep === "task" ? "Account security" : "Your chapter, in one place"}
        </p>
        <h1 id="auth-title" className="auth-card__title">{title}</h1>
        {visibleStep === "email" && (
          <>
            <p className="auth-card__description">
              {mode === "sign-in"
                ? "Use your email to receive a one-time sign-in code."
                : "Create your account with a verified email address. No password to remember."}
            </p>
            <form className="auth-form" onSubmit={startEmailFlow}>
              <FieldGroup className="auth-fields">
                <Field data-invalid={Boolean(error) || undefined}>
                  <FieldLabel htmlFor="auth-email">Email address</FieldLabel>
                  <Input
                    ref={emailInputRef}
                    id="auth-email"
                    className="auth-input"
                    type="email"
                    name="email"
                    autoComplete="email"
                    inputMode="email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                    disabled={busy}
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? "auth-form-error" : "auth-email-description"}
                  />
                  <FieldDescription id="auth-email-description">
                    We’ll email you a one-time sign-in code.
                  </FieldDescription>
                  {error && <FieldError id="auth-form-error" className="sr-only" role="note">{error}</FieldError>}
                </Field>
              </FieldGroup>
              <Button className="auth-submit" type="submit" disabled={busy}>
                {busyAction === "send" ? <Spinner data-icon="inline-start" aria-label="Sending code" /> : <Mail data-icon="inline-start" />}
                {busyAction === "send" ? "Sending code…" : "Continue with email"}
                {busyAction !== "send" && <ArrowRight data-icon="inline-end" />}
              </Button>
            </form>
            <p className="auth-card__switch">
              {mode === "sign-in" ? "New to Flamivor?" : "Already have an account?"}{" "}
              <Link href={switchHref}>{mode === "sign-in" ? "Create an account" : "Sign in"}</Link>
            </p>
          </>
        )}
        {visibleStep === "code" && (
          <>
            <p className="auth-card__description">Enter the code sent to <strong>{email}</strong>.</p>
            <form className="auth-form" onSubmit={verifyCode}>
              <FieldGroup className="auth-fields">
                <Field data-invalid={Boolean(error) || undefined}>
                  <FieldLabel htmlFor="auth-code">Verification code</FieldLabel>
                  <InputOTP
                    id="auth-code"
                    className="auth-otp-input"
                    maxLength={6}
                    pattern="^[0-9]+$"
                    value={code}
                    onChange={setCode}
                    disabled={busy}
                    required
                    aria-label="Six-digit verification code"
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? "auth-form-error" : "auth-code-description"}
                  >
                    <InputOTPGroup className="auth-otp-group">
                      {Array.from({ length: 6 }, (_, index) => (
                        <InputOTPSlot key={index} index={index} className="auth-otp-slot" aria-invalid={Boolean(error)} />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                  <FieldDescription id="auth-code-description">
                    Enter the six-digit code from your email.
                  </FieldDescription>
                  {error && <FieldError id="auth-form-error" className="sr-only" role="note">{error}</FieldError>}
                </Field>
              </FieldGroup>
              <Button className="auth-submit" type="submit" disabled={busy}>
                {busyAction === "verify" ? <Spinner data-icon="inline-start" aria-label="Verifying code" /> : null}
                {busyAction === "verify" ? "Verifying code…" : "Verify and continue"}
                {busyAction !== "verify" && <ArrowRight data-icon="inline-end" />}
              </Button>
            </form>
            <div className="auth-card__code-actions">
              <Button variant="link" type="button" className="auth-text-button" disabled={busy} onClick={resendCode}>
                {busyAction === "resend" && <Spinner data-icon="inline-start" aria-label="Resending code" />}
                {busyAction === "resend" ? "Resending code…" : "Send a new code"}
              </Button>
              <Button variant="link" type="button" className="auth-text-button" disabled={busy} onClick={goBack}>
                <ArrowLeft data-icon="inline-start" /> Change email
              </Button>
            </div>
          </>
        )}
        {visibleStep === "details" && (
          <>
            <p className="auth-card__description">Your email is verified. Complete the required details below.</p>
            <form className="auth-form" onSubmit={completeDetails}>
              <FieldGroup className="auth-fields">
                {pendingFields.includes("first_name") && (
                  <Field data-invalid={Boolean(error) || undefined}>
                    <FieldLabel htmlFor="auth-first-name">First name</FieldLabel>
                    <Input ref={nameInputRef} id="auth-first-name" className="auth-input" autoComplete="given-name" required value={firstName} onChange={(event) => setFirstName(event.target.value)} disabled={busy} aria-invalid={Boolean(error)} aria-describedby={error ? "auth-form-error" : undefined} />
                    {error && <FieldError id="auth-form-error" className="sr-only" role="note">{error}</FieldError>}
                  </Field>
                )}
                {pendingFields.includes("last_name") && (
                  <Field data-invalid={Boolean(error) || undefined}>
                    <FieldLabel htmlFor="auth-last-name">Last name</FieldLabel>
                    <Input ref={!pendingFields.includes("first_name") ? nameInputRef : undefined} id="auth-last-name" className="auth-input" autoComplete="family-name" required value={lastName} onChange={(event) => setLastName(event.target.value)} disabled={busy} aria-invalid={Boolean(error)} aria-describedby={error && !pendingFields.includes("first_name") ? "auth-form-error" : undefined} />
                    {error && !pendingFields.includes("first_name") && <FieldError id="auth-form-error" className="sr-only" role="note">{error}</FieldError>}
                  </Field>
                )}
                {pendingFields.includes("legal_accepted") && (
                  <Field className="auth-check-field" orientation="horizontal" data-invalid={Boolean(error) || undefined}>
                    <Checkbox id="auth-legal" checked={legalAccepted} onCheckedChange={(checked) => setLegalAccepted(checked === true)} required disabled={busy} aria-invalid={Boolean(error)} aria-describedby={error && !pendingFields.includes("first_name") && !pendingFields.includes("last_name") ? "auth-form-error" : undefined} />
                    <FieldLabel htmlFor="auth-legal" className="auth-check-label">
                      I accept the applicable account terms and the <Link href="/privacy" target="_blank" rel="noreferrer">privacy notice</Link>.
                    </FieldLabel>
                    {error && !pendingFields.includes("first_name") && !pendingFields.includes("last_name") && <FieldError id="auth-form-error" className="sr-only" role="note">{error}</FieldError>}
                  </Field>
                )}
              </FieldGroup>
              <Button className="auth-submit" type="submit" disabled={busy}>
                {busyAction === "details" ? <Spinner data-icon="inline-start" aria-label="Saving account details" /> : null}
                {busyAction === "details" ? "Saving account…" : "Finish creating account"}
                {busyAction !== "details" && <ArrowRight data-icon="inline-end" />}
              </Button>
            </form>
          </>
        )}
        {visibleStep === "task" && activeTask && (
          <div className="auth-task">
            {activeTask === "choose-organization" && <TaskChooseOrganization redirectUrlComplete={redirectUrl} />}
            {activeTask === "reset-password" && <TaskResetPassword redirectUrlComplete={redirectUrl} />}
            {activeTask === "setup-mfa" && <TaskSetupMFA redirectUrlComplete={redirectUrl} />}
          </div>
        )}
        {(taskWaiting || taskRedirecting) && (
          <p className="auth-card__description" role="status">
            {taskRedirecting ? "Returning to your member space…" : "Checking your account security requirements…"}
          </p>
        )}
        <div id="clerk-captcha" className="auth-captcha" aria-label="Security verification" />
        {(notice || error) && (
          <Alert
            className={cn("auth-feedback", error && "auth-feedback--error")}
            variant={error ? "destructive" : "default"}
            role={error ? "alert" : "status"}
            aria-live={error ? "assertive" : "polite"}
          >
            <AlertDescription>{error || notice}</AlertDescription>
          </Alert>
        )}
      </div>
      <Link className="auth-card__back" href="/">Back to Flamivor Charlotte</Link>
      <p className="auth-card__footnote">Your email is used only to secure your member account.</p>
    </section>
  );
}
