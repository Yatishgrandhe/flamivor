"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Bookmark,
  BookOpenText,
  Check,
  CircleUserRound,
  ExternalLink,
  LoaderCircle,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ResourceBrowser } from "@/components/resource-browser";
import { resources } from "@/lib/resources";
import { site } from "@/lib/site";
import { useDashboardData } from "./dashboard-context";

type Role = "learner" | "volunteer" | "partner";
type ProfileValues = { name: string; role: Role; interests: string };
const blankProfile: ProfileValues = {
  name: "",
  role: "learner",
  interests: "",
};

const roleLabels: Record<Role, string> = {
  learner: "Learner",
  volunteer: "Volunteer",
  partner: "Community partner",
};

export function DashboardOverview() {
  const { data } = useDashboardData();
  if (!data) return null;

  const savedGuides = resources.filter((guide) =>
    data.bookmarks.includes(guide.slug),
  );
  const firstName = data.profile?.name.trim().split(/\s+/)[0];

  return (
    <div className="dashboard-page dashboard-overview">
      <section className="dashboard-welcome">
        <div>
          <p className="eyebrow">YOUR CHARLOTTE MEMBER SPACE</p>
          <h1>{firstName ? `Welcome, ${firstName}.` : "Welcome in."}</h1>
          <p>
            Keep your learning interests and useful field guides in one place.
          </p>
        </div>
        <Link className="dashboard-quiet-link" href="/dashboard/profile">
          <CircleUserRound size={18} aria-hidden="true" />
          {data.profile ? "Edit your profile" : "Set up your profile"}
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </section>

      <section className="dashboard-overview-grid" aria-label="Your member space">
        <article className="dashboard-overview-card dashboard-saved-summary">
          <div className="dashboard-card-heading">
            <span className="dashboard-card-icon" aria-hidden="true">
              <Bookmark size={18} />
            </span>
            <p className="eyebrow">SAVED FIELD GUIDES</p>
          </div>
          <p className="dashboard-count" aria-label={`${data.bookmarks.length} saved guides`}>
            {data.bookmarks.length.toString().padStart(2, "0")}
          </p>
          <p className="dashboard-card-copy">
            {data.bookmarks.length === 1
              ? "One guide ready when you need it."
              : "Guides you choose to keep close."}
          </p>
          {savedGuides.length > 0 ? (
            <ul className="dashboard-preview-list">
              {savedGuides.slice(0, 2).map((guide) => (
                <li key={guide.slug}>
                  <Link href={`/resources/${guide.slug}`}>
                    {guide.title} <ArrowUpRight size={15} aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <Link className="dashboard-text-action" href="/dashboard/resources">
              Browse the guides <ArrowRight size={15} aria-hidden="true" />
            </Link>
          )}
          {savedGuides.length > 0 && (
            <Link className="dashboard-card-bottom-link" href="/dashboard/saved">
              View saved guides <ArrowRight size={15} aria-hidden="true" />
            </Link>
          )}
        </article>

        <article className="dashboard-overview-card dashboard-profile-summary">
          <div className="dashboard-card-heading">
            <span className="dashboard-card-icon" aria-hidden="true">
              <CircleUserRound size={18} />
            </span>
            <p className="eyebrow">YOUR PROFILE</p>
          </div>
          {data.profile ? (
            <>
              <h2>{data.profile.name}</h2>
              <p className="dashboard-role-tag">{roleLabels[data.profile.role]}</p>
              <p className="dashboard-card-copy">
                {data.profile.interests.trim()
                  ? "Your interests are saved to your member profile."
                  : "Your profile is saved. Add a few interests whenever you like."}
              </p>
            </>
          ) : (
            <>
              <h2>A place to begin.</h2>
              <p className="dashboard-card-copy">
                Add your name, choose how you are taking part, and save the
                interests you want to keep here.
              </p>
            </>
          )}
          <Link className="dashboard-card-bottom-link" href="/dashboard/profile">
            {data.profile ? "Update profile" : "Create your profile"}
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </article>
      </section>

      <section className="dashboard-next-steps" aria-labelledby="next-steps-heading">
        <div className="dashboard-section-heading">
          <div>
            <p className="eyebrow">KEEP MOVING</p>
            <h2 id="next-steps-heading">Your next step.</h2>
          </div>
          <p>Read, share, or get in touch with the Charlotte chapter.</p>
        </div>
        <div className="dashboard-next-grid">
          <Link className="dashboard-next-link" href="/dashboard/resources">
            <span className="eyebrow">01 / READ</span>
            <span className="dashboard-next-title">Browse free guides</span>
            <span>Open the field guide library.</span>
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <a
            className="dashboard-next-link"
            href={site.form}
            target="_blank"
            rel="noreferrer"
          >
            <span className="eyebrow">02 / CONNECT</span>
            <span className="dashboard-next-title">Reach the chapter</span>
            <span>Share how you would like to take part.</span>
            <ExternalLink size={17} aria-hidden="true" />
          </a>
        </div>
      </section>
    </div>
  );
}

function ProfileEditor({ profile }: { profile: ProfileValues | null }) {
  const { saveProfile, pendingAction } = useDashboardData();
  const [value, setValue] = useState<ProfileValues>(profile ?? blankProfile);
  const pending = pendingAction === "save-profile";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await saveProfile(value);
  }

  return (
    <form className="dashboard-profile-form" onSubmit={handleSubmit}>
      <label className="dashboard-field" htmlFor="profile-name">
        <span>Your name</span>
        <Input
          id="profile-name"
          name="name"
          autoComplete="name"
          required
          minLength={2}
          maxLength={80}
          value={value.name}
          onChange={(event) =>
            setValue((current) => ({ ...current, name: event.target.value }))
          }
        />
        <small>This is the name shown in your member space.</small>
      </label>

      <fieldset className="dashboard-field">
        <legend>How are you taking part?</legend>
        <div className="dashboard-role-options">
          {(Object.keys(roleLabels) as Role[]).map((role) => (
            <label className="dashboard-role-option" key={role}>
              <input
                type="radio"
                name="profile-role"
                value={role}
                checked={value.role === role}
                onChange={() => setValue((current) => ({ ...current, role }))}
              />
              <span>{roleLabels[role]}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className="dashboard-field" htmlFor="profile-interests">
        <span>What would you like to learn or contribute?</span>
        <Textarea
          id="profile-interests"
          name="interests"
          rows={5}
          maxLength={1000}
          value={value.interests}
          onChange={(event) =>
            setValue((current) => ({ ...current, interests: event.target.value }))
          }
          aria-describedby="profile-interests-help"
          placeholder="A skill you would like to share, a topic you want to explore, or a way you hope to help."
        />
        <small id="profile-interests-help">
          Keep this about your interests. Please do not include private or
          sensitive details.
        </small>
      </label>

      <Button type="submit" disabled={Boolean(pendingAction)} aria-busy={pending}>
        {pending ? (
          <LoaderCircle size={16} aria-hidden="true" />
        ) : (
          <Check size={16} aria-hidden="true" />
        )}
        {pending ? "Saving profile…" : "Save profile"}
      </Button>
    </form>
  );
}

export function DashboardProfile() {
  const { data, clearMyData, pendingAction } = useDashboardData();
  const [confirmClear, setConfirmClear] = useState(false);
  if (!data) return null;

  return (
    <div className="dashboard-page dashboard-profile-page">
      <header className="dashboard-page-heading">
        <p className="eyebrow">YOUR MEMBER DETAILS</p>
        <h1>Your profile</h1>
        <p>
          Save the name, role, and interests you want to keep with this account.
        </p>
      </header>

      <div className="dashboard-profile-layout">
        <section className="dashboard-panel" aria-labelledby="profile-form-heading">
          <div className="dashboard-panel-heading">
            <p className="eyebrow">PROFILE / EDIT</p>
            <h2 id="profile-form-heading">
              {data.profile ? "Your saved details." : "Start with the basics."}
            </h2>
          </div>
          <ProfileEditor
            key={data.profile ? "saved-profile" : "new-profile"}
            profile={data.profile}
          />
        </section>

        <aside className="dashboard-side-note">
          <p className="eyebrow">A NOTE ON PRIVACY</p>
          <h2>Keep this space about learning.</h2>
          <p>
            Your saved profile belongs to your signed-in account. Avoid adding
            passwords, contact details, or other private information to the
            interests field.
          </p>
          <Link className="dashboard-text-action" href="/privacy">
            Read the privacy note <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </aside>
      </div>

      <section className="dashboard-danger-zone" aria-labelledby="clear-data-heading">
        <div>
          <p className="eyebrow">ACCOUNT DATA</p>
          <h2 id="clear-data-heading">Clear saved site data</h2>
          <p>
            This removes your saved profile and all guides in your collection.
            Your Clerk sign-in account stays active.
          </p>
        </div>
        {!confirmClear ? (
          <Button
            type="button"
            variant="outline"
            disabled={Boolean(pendingAction)}
            onClick={() => setConfirmClear(true)}
          >
            <Trash2 size={16} aria-hidden="true" />
            Clear my data
          </Button>
        ) : (
          <div
            className="dashboard-clear-confirmation"
            role="group"
            aria-labelledby="clear-confirm-title"
            aria-describedby="clear-confirm-description"
          >
            <strong id="clear-confirm-title">Clear your saved site data?</strong>
            <p id="clear-confirm-description">
              Your profile and saved guides will be removed from this member
              space.
            </p>
            <div className="dashboard-clear-actions">
              <Button
                type="button"
                variant="outline"
                disabled={Boolean(pendingAction)}
                onClick={() => setConfirmClear(false)}
              >
                Keep my data
              </Button>
              <Button
                type="button"
                disabled={Boolean(pendingAction)}
                aria-busy={pendingAction === "clear-data"}
                onClick={async () => {
                  const cleared = await clearMyData();
                  if (cleared) setConfirmClear(false);
                }}
              >
                {pendingAction === "clear-data" ? (
                  <LoaderCircle size={16} aria-hidden="true" />
                ) : (
                  <Trash2 size={16} aria-hidden="true" />
                )}
                {pendingAction === "clear-data" ? "Clearing…" : "Clear saved data"}
              </Button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export function DashboardSaved() {
  const { data, pendingAction, setBookmark } = useDashboardData();
  if (!data) return null;

  const savedGuides = data.bookmarks
    .map((slug) => resources.find((resource) => resource.slug === slug))
    .filter((resource): resource is (typeof resources)[number] => Boolean(resource));

  return (
    <div className="dashboard-page dashboard-saved-page">
      <header className="dashboard-page-heading">
        <p className="eyebrow">YOUR COLLECTION / {data.bookmarks.length} SAVED</p>
        <h1>Saved guides</h1>
        <p>Field notes you chose to keep for another time.</p>
      </header>

      {savedGuides.length > 0 ? (
        <div className="dashboard-saved-list">
          {savedGuides.map((guide, index) => (
            <article className="dashboard-saved-row" key={guide.slug}>
              <span className="row-index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="dashboard-saved-copy">
                <p className="eyebrow">{guide.category}</p>
                <h2>
                  <Link href={`/resources/${guide.slug}`}>{guide.title}</Link>
                </h2>
                <p>{guide.description}</p>
                <Link className="dashboard-text-action" href={`/resources/${guide.slug}`}>
                  Open this guide <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </div>
              <Button
                type="button"
                variant="outline"
                disabled={Boolean(pendingAction)}
                aria-label={`Remove ${guide.title} from saved guides`}
                onClick={() => void setBookmark(guide.slug, false)}
              >
                <Bookmark size={16} aria-hidden="true" />
                Remove
              </Button>
            </article>
          ))}
        </div>
      ) : (
        <section className="dashboard-empty-state">
          <span className="dashboard-empty-mark" aria-hidden="true">
            <BookOpenText size={25} />
          </span>
          <p className="eyebrow">NO SAVED GUIDES YET</p>
          <h2>Keep a useful idea close.</h2>
          <p>
            Browse the field guide collection and save a guide when you want to
            return to it.
          </p>
          <Button asChild>
            <Link href="/dashboard/resources">
              Browse resources <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
        </section>
      )}
    </div>
  );
}

export function DashboardResources() {
  return (
    <div className="dashboard-page dashboard-resources-page">
      <header className="dashboard-page-heading">
        <p className="eyebrow">OPEN ACCESS / CHARLOTTE FIELD GUIDE</p>
        <h1>Field guides</h1>
        <p>
          Short, free resources to explore, practice, and share. Every guide is
          public; sign in only when you want to save one.
        </p>
      </header>
      <section className="dashboard-resource-browser" aria-label="Browse field guides">
        <ResourceBrowser />
      </section>
    </div>
  );
}
