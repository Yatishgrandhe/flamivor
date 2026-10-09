"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import {
  Authenticated,
  Unauthenticated,
  AuthLoading,
  useQuery,
  useMutation,
} from "convex/react";
import { api } from "@/convex/_generated/api";
import { resources } from "@/lib/resources";
import { site } from "@/lib/site";
import { ArrowUpRight, Check, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";
type Profile = {
  name: string;
  role: "learner" | "volunteer" | "partner";
  interests: string;
};
function InterestForm({
  profile,
  status,
  onStatus,
}: {
  profile: Profile | null;
  status: string;
  onStatus: (status: string) => void;
}) {
  const [value, setValue] = useState<Profile>(
    profile || { name: "", role: "learner", interests: "" },
  );
  const [pending, setPending] = useState(false);
  const save = useMutation(api.members.saveProfile);
  return (
    <form
      method="post"
      className="interest-form"
      onSubmit={async (event) => {
        event.preventDefault();
        if (pending) return;
        setPending(true);
        onStatus("");
        try {
          await save(value);
          onStatus("Your interests have been saved.");
        } catch {
          onStatus("We couldn’t save your interests. Please try again.");
        } finally {
          setPending(false);
        }
      }}
    >
      <Field>
        <FieldLabel htmlFor="member-name">What should we call you?</FieldLabel>
        <Input
          id="member-name"
          required
          minLength={2}
          maxLength={80}
          name="name"
          autoComplete="given-name"
          value={value.name}
          onChange={(e) => setValue({ ...value, name: e.target.value })}
        />
      </Field>
      <fieldset>
        <legend className="text-sm font-semibold">I&apos;m here as a…</legend>
        <div className="role-options">
          {(["learner", "volunteer", "partner"] as const).map((role) => (
            <label className="role-option" key={role}>
              <input
                type="radio"
                name="role"
                value={role}
                checked={value.role === role}
                onChange={() => setValue({ ...value, role })}
              />
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </label>
          ))}
        </div>
      </fieldset>
      <Field>
        <FieldLabel htmlFor="interests">What sparks your interest?</FieldLabel>
        <Textarea
          id="interests"
          maxLength={1000}
          rows={4}
          value={value.interests}
          onChange={(e) => setValue({ ...value, interests: e.target.value })}
          placeholder="STEM projects, tutoring, helping organize events…"
        />
        <FieldDescription>
          Keep this about your interests. Please don&apos;t include private or
          sensitive information.
        </FieldDescription>
      </Field>
      <Button type="submit" disabled={pending} aria-busy={pending}>
        {pending ? <LoaderCircle size={16} /> : <Check size={16} />}{" "}
        {pending ? "Saving…" : "Save my interests"}
      </Button>
      {status && (
        <p className="form-status" role="status">
          {status}
        </p>
      )}
      <noscript>
        Saving interests here requires JavaScript. You can still apply using
        the official chapter form.
      </noscript>
    </form>
  );
}
function Dashboard({ requestedSlug }: { requestedSlug?: string }) {
  const data = useQuery(api.members.get);
  const bookmark = useMutation(api.members.setBookmark);
  const clear = useMutation(api.members.clearMyData);
  const [status, setStatus] = useState("");
  const [profileSaveStatus, setProfileSaveStatus] = useState("");
  const [saveIntentOutcome, setSaveIntentOutcome] = useState<{
    slug: string;
    outcome: "saved" | "failed" | "complete";
  } | null>(null);
  const [busy, setBusy] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);
  const requested = resources.find((r) => r.slug === requestedSlug);

  const attemptedSaveIntents = useRef(new Set<string>());
  useEffect(() => {
    if (
      !requestedSlug ||
      !data ||
      attemptedSaveIntents.current.has(requestedSlug)
    ) {
      return;
    }

    attemptedSaveIntents.current.add(requestedSlug);
    if (data.bookmarks.includes(requestedSlug)) return;
    if (!requested) return;

    void bookmark({ slug: requestedSlug, saved: true })
      .then(() => {
        setSaveIntentOutcome({ slug: requestedSlug, outcome: "saved" });
      })
      .catch(() => {
        setSaveIntentOutcome({ slug: requestedSlug, outcome: "failed" });
      });
  }, [bookmark, data, requested, requestedSlug]);

  if (!data) return <p role="status">Loading your member space…</p>;
  const savedSlugs = new Set(data.bookmarks);
  const outcomeForRequest =
    saveIntentOutcome && saveIntentOutcome.slug === requestedSlug
      ? saveIntentOutcome.outcome
      : null;
  const requestedGuideIsSaved = Boolean(
    requestedSlug && savedSlugs.has(requestedSlug),
  );
  const saveIntentPending = Boolean(
    requested &&
      requestedSlug &&
      !outcomeForRequest &&
      !requestedGuideIsSaved,
  );
  const intentNotice =
    requestedSlug && !requested
      ? "That guide isn’t available to save."
      : requested && outcomeForRequest === "saved"
        ? `${requested.title} was saved to your member space.`
        : requested && outcomeForRequest === "failed"
          ? `We couldn’t save ${requested.title}. Use the save button below to try again.`
          : requested && outcomeForRequest === "complete"
            ? ""
            : requested && requestedGuideIsSaved
            ? `${requested.title} is already in your member space.`
            : saveIntentPending && requested
              ? `Saving ${requested.title} to your member space…`
              : "";
  const statusMessage = status || intentNotice;

  async function toggle(slug: string, saved: boolean) {
    if (slug === requestedSlug)
      setSaveIntentOutcome({ slug, outcome: "complete" });
    setBusy(true);
    setStatus("");
    try {
      await bookmark({ slug, saved });
      setStatus(
        saved
          ? "Guide saved to your collection."
          : "Guide removed from your collection.",
      );
    } catch {
      setStatus("We couldn’t update your collection. Please try again.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <>
      <div className="member-heading">
        <div>
          <p className="eyebrow">YOUR CHARLOTTE MEMBER SPACE</p>
          <h1>
            Room to <em>grow.</em>
          </h1>
        </div>
        <UserButton />
      </div>
      <div className="dashboard-grid member-grid">
        <section className="member-card member-panel">
          <h2>Your starting point</h2>
          <p className="member-intro-copy">
            Save your interests here. To apply to the chapter, please also
            complete our{" "}
            <a
              className="text-link"
              href={site.form}
              target="_blank"
              rel="noreferrer"
            >
              official interest form <ArrowUpRight size={14} />
            </a>
            .
          </p>
          <InterestForm
            key={data.profile ? "existing" : "new"}
            profile={data.profile}
            status={profileSaveStatus}
            onStatus={setProfileSaveStatus}
          />
        </section>
        <section className="member-card member-panel">
          <h2>Your field notes</h2>
          <p>A small collection of ideas to come back to.</p>
          <div className="member-bookmarks">
            {data.bookmarks.length === 0 && (
              <p className="member-empty">
                No saved guides yet. Pick one below to begin.
              </p>
            )}
            {resources.map((r) => (
              <div className="saved-item" key={r.slug}>
                <Link href={`/resources/${r.slug}`}>{r.title}</Link>
                <button
                  disabled={busy || saveIntentPending}
                  onClick={() => toggle(r.slug, !savedSlugs.has(r.slug))}
                  aria-label={`${savedSlugs.has(r.slug) ? "Remove" : "Save"} ${r.title}`}
                >
                  {savedSlugs.has(r.slug) ? "Remove" : "Save"}
                </button>
              </div>
            ))}
            {statusMessage && (
              <p
                className="form-status status-message"
                role="status"
                aria-live="polite"
              >
                {statusMessage}
              </p>
            )}
          </div>
          <div className="member-data-controls">
            <p className="member-data-note">You control your saved data.</p>
            {!confirmClear ? (
              <button
                className="text-link"
                disabled={busy || saveIntentPending}
                onClick={() => setConfirmClear(true)}
              >
                Clear my site data
              </button>
            ) : (
              <div>
                <p>
                  This removes your saved interests and guides. Your sign-in
                  account stays available.
                </p>
                <div className="member-auth-actions">
                  <Button
                    variant="outline"
                    onClick={() => setConfirmClear(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    disabled={busy || saveIntentPending}
                    onClick={async () => {
                      setBusy(true);
                      try {
                        await clear();
                        if (requestedSlug) {
                          setSaveIntentOutcome({
                            slug: requestedSlug,
                            outcome: "complete",
                          });
                        }
                        setProfileSaveStatus("");
                        setStatus("Your saved site data has been cleared.");
                        setConfirmClear(false);
                      } catch {
                        setStatus(
                          "We couldn’t clear your data. Please try again.",
                        );
                      } finally {
                        setBusy(false);
                      }
                    }}
                  >
                    Clear saved data
                  </Button>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
export function MemberDashboard({ requestedSlug }: { requestedSlug?: string }) {
  return (
    <>
      <AuthLoading>
        <p role="status">Connecting to your member space…</p>
      </AuthLoading>
      <Unauthenticated>
        <section className="member-card member-panel">
          <p className="eyebrow">A LITTLE SPACE OF YOUR OWN</p>
          <h1>
            Keep your
            <br />
            <em>curiosity</em> close.
          </h1>
          <p>
            Create an account to save your favorite field notes and your
            learning interests. Public guides are always free to read.
          </p>
          <div className="member-auth-actions">
            <Button asChild>
              <Link
                href={`/sign-up?redirect_url=${encodeURIComponent("/members" + (requestedSlug ? "?save=" + requestedSlug : ""))}`}
              >
                Create an account <ArrowUpRight />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link
                href={`/sign-in?redirect_url=${encodeURIComponent("/members" + (requestedSlug ? "?save=" + requestedSlug : ""))}`}
              >
                Sign in
              </Link>
            </Button>
          </div>
        </section>
      </Unauthenticated>
      <Authenticated>
        <Dashboard requestedSlug={requestedSlug} />
      </Authenticated>
    </>
  );
}
