"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  TaskChooseOrganization,
  TaskResetPassword,
  TaskSetupMFA,
  useSignIn,
  useSignUp,
  useSession,
} from "@clerk/nextjs";
import { ArrowLeft, ArrowRight, LoaderCircle, Mail } from "lucide-react";
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type AuthMode = "sign-in" | "sign-up";
type CodePurpose = "sign-in" | "sign-in-mfa" | "sign-up";
type SecurityTask = "choose-organization" | "reset-password" | "setup-mfa";

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
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [legalAccepted, setLegalAccepted] = useState(false);
  const [pendingFields, setPendingFields] = useState<string[]>([]);
  const [securityTask, setSecurityTask] = useState<SecurityTask | null>(null);

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
    setBusy(true);
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
      setBusy(false);
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
    setBusy(true);
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
      setBusy(false);
    }
  }

  async function resendCode() {
    setBusy(true);
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
      setBusy(false);
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
    setBusy(true);
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
      setBusy(false);
    }
  }

  const routeTask = session?.currentTask?.key;
  const activeTask = securityTask ?? (isSecurityTask(routeTask) ? routeTask : null);
  const taskWaiting = taskMode && !sessionLoaded;
  const taskRedirecting = sessionLoaded && Boolean(isSignedIn) && !activeTask;
  const visibleStep = activeTask || taskWaiting || taskRedirecting ? "task" : step;

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
              <label className="auth-label" htmlFor="auth-email">Email address</label>
              <Input
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
              />
              <Button className="auth-submit" type="submit" disabled={busy}>
                {busy ? <LoaderCircle className="animate-spin" data-icon="inline-start" /> : <Mail data-icon="inline-start" />}
                {busy ? "Sending code…" : "Continue with email"}
                {!busy && <ArrowRight data-icon="inline-end" />}
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
              <label className="auth-label" htmlFor="auth-code">Verification code</label>
              <Input
                id="auth-code"
                className="auth-input auth-input--code"
                type="text"
                name="code"
                autoComplete="one-time-code"
                inputMode="numeric"
                pattern="[0-9]*"
                required
                value={code}
                onChange={(event) => setCode(event.target.value)}
                placeholder="Enter your code"
                disabled={busy}
              />
              <Button className="auth-submit" type="submit" disabled={busy}>
                {busy ? <LoaderCircle className="animate-spin" data-icon="inline-start" /> : null}
                {busy ? "Verifying…" : "Verify and continue"}
                {!busy && <ArrowRight data-icon="inline-end" />}
              </Button>
            </form>
            <div className="auth-card__code-actions">
              <Button variant="link" type="button" className="auth-text-button" disabled={busy} onClick={resendCode}>Send a new code</Button>
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
              {pendingFields.includes("first_name") && <>
                <label className="auth-label" htmlFor="auth-first-name">First name</label>
                <Input id="auth-first-name" className="auth-input" autoComplete="given-name" required value={firstName} onChange={(event) => setFirstName(event.target.value)} disabled={busy} />
              </>}
              {pendingFields.includes("last_name") && <>
                <label className="auth-label" htmlFor="auth-last-name">Last name</label>
                <Input id="auth-last-name" className="auth-input" autoComplete="family-name" required value={lastName} onChange={(event) => setLastName(event.target.value)} disabled={busy} />
              </>}
              {pendingFields.includes("legal_accepted") && (
                <label className="auth-check">
                  <input type="checkbox" checked={legalAccepted} onChange={(event) => setLegalAccepted(event.target.checked)} required disabled={busy} />
                  <span>I accept the applicable account terms and the <Link href="/privacy" target="_blank" rel="noreferrer">privacy notice</Link>.</span>
                </label>
              )}
              <Button className="auth-submit" type="submit" disabled={busy}>
                {busy ? <LoaderCircle className="animate-spin" data-icon="inline-start" /> : null}
                {busy ? "Saving…" : "Finish creating account"}
                {!busy && <ArrowRight data-icon="inline-end" />}
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
        {notice && <p className="auth-status" role="status">{notice}</p>}
        {error && <p className="auth-error" role="alert">{error}</p>}
      </div>
      <Link className="auth-card__back" href="/">Back to Flamivor Charlotte</Link>
      <p className="auth-card__footnote">Your email is used only to secure your member account.</p>
    </section>
  );
}
