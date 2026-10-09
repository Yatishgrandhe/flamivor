"use client";

import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useClerk, useUser } from "@clerk/nextjs";
import {
  Authenticated,
  AuthLoading,
  Unauthenticated,
} from "convex/react";
import {
  ArrowRight,
  ArrowLeft,
  BookOpenText,
  Bookmark,
  ChevronDown,
  CircleUserRound,
  DoorOpen,
  LayoutDashboard,
  LoaderCircle,
  UserRound,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Brand } from "@/components/brand";
import { resources } from "@/lib/resources";
import { safeAuthRedirect } from "@/lib/auth-redirect";
import { DashboardDataProvider } from "./dashboard-data";
import { useDashboardData } from "./dashboard-context";

const navigation = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Profile", href: "/dashboard/profile", icon: UserRound },
  { label: "Saved guides", href: "/dashboard/saved", icon: Bookmark },
  { label: "Resources", href: "/dashboard/resources", icon: BookOpenText },
];

function DashboardSkeleton() {
  return (
    <div className="dashboard-loading" role="status" aria-live="polite">
      <span className="dashboard-loading-mark" aria-hidden="true" />
      <span>Preparing your member space…</span>
      <div className="dashboard-skeleton-block" aria-hidden="true" />
      <div className="dashboard-skeleton-grid" aria-hidden="true">
        <span />
        <span />
      </div>
    </div>
  );
}

class DashboardDataErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error("Dashboard data error:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main id="main" className="dashboard-error-state">
          <p className="eyebrow">MEMBER SPACE / CONNECTION ISSUE</p>
          <h1>We couldn’t load your member data.</h1>
          <p>
            Check your connection and reload this page to try again.
          </p>
          <Button type="button" onClick={() => window.location.reload()}>
            Reload member space
          </Button>
        </main>
      );
    }
    return this.props.children;
  }
}

function AccountMenu() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const [open, setOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [signOutError, setSignOutError] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const displayName =
    user?.fullName || user?.primaryEmailAddress?.emailAddress || "Your account";
  const initials = displayName
    .split(/[\s@._-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: PointerEvent) {
      if (root.current && !root.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  async function handleSignOut() {
    setSigningOut(true);
    setSignOutError(false);
    try {
      await signOut({ redirectUrl: "/" });
    } catch {
      setSignOutError(true);
    } finally {
      setSigningOut(false);
    }
  }

  return (
    <div className="dashboard-account" ref={root}>
      <button
        className="dashboard-account-trigger"
        ref={trigger}
        type="button"
        aria-label={`Account options for ${displayName}`}
        aria-expanded={open}
        aria-controls="dashboard-account-options"
        onClick={() => setOpen((value) => !value)}
      >
        <span className="dashboard-account-avatar" aria-hidden="true">
          {initials || <CircleUserRound size={17} />}
        </span>
        <span className="dashboard-account-name">{displayName}</span>
        <ChevronDown size={15} aria-hidden="true" />
      </button>
      {open && (
        <div
          className="dashboard-account-menu"
          id="dashboard-account-options"
          aria-label="Account options"
        >
          <div className="dashboard-account-details">
            <span className="eyebrow">SIGNED IN AS</span>
            <strong>{displayName}</strong>
            {user?.primaryEmailAddress?.emailAddress && (
              <span>{user.primaryEmailAddress.emailAddress}</span>
            )}
          </div>
          {signOutError && (
            <p className="dashboard-account-error" role="alert">
              Sign out did not finish. Please try again.
            </p>
          )}
          <Link
            href="/dashboard/profile"
            onClick={() => setOpen(false)}
          >
            <UserRound size={16} aria-hidden="true" />
            Edit profile
          </Link>
          <button
            type="button"
            onClick={handleSignOut}
            disabled={signingOut}
          >
            {signingOut ? (
              <LoaderCircle size={16} aria-hidden="true" />
            ) : (
              <DoorOpen size={16} aria-hidden="true" />
            )}
            {signingOut ? "Signing out…" : "Sign out"}
          </button>
        </div>
      )}
    </div>
  );
}

function SignedOutGate({ returnUrl }: { returnUrl: string }) {
  const safeReturnUrl = safeAuthRedirect(returnUrl);
  return (
    <main id="main" className="dashboard-auth-state">
      <div className="dashboard-auth-paper">
        <div className="dashboard-auth-brand-row">
          <Link
            href="/"
            className="dashboard-auth-brand"
            aria-label="Flamivor Charlotte home"
          >
            <Brand />
          </Link>
          <Link className="dashboard-back-link" href="/">
            <ArrowLeft size={16} aria-hidden="true" />
            Back to Flamivor Charlotte
          </Link>
        </div>
        <p className="eyebrow">FLAMIVOR CHARLOTTE / MEMBER SPACE</p>
        <h1>Your learning notes, together.</h1>
        <p>
          Sign in to keep your profile and saved guides with you. The public
          field guides remain open to everyone.
        </p>
        <div className="dashboard-auth-actions">
          <Button asChild>
            <Link
              href={`/sign-in?redirect_url=${encodeURIComponent(safeReturnUrl)}`}
            >
              Sign in <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link
              href={`/sign-up?redirect_url=${encodeURIComponent(safeReturnUrl)}`}
            >
              Create an account
            </Link>
          </Button>
        </div>
        <Link className="dashboard-public-link" href="/resources">
          Read the public guides <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </main>
  );
}

function DashboardNotice() {
  const {
    notice,
    clearNotice,
    retrySaveIntent,
    pendingAction,
  } = useDashboardData();
  if (!notice && !pendingAction) return null;
  const pendingSlug = pendingAction?.startsWith("bookmark:")
    ? pendingAction.slice("bookmark:".length)
    : undefined;
  const pendingGuide = resources.find((guide) => guide.slug === pendingSlug);
  const pendingMessage =
    pendingAction === "save-profile"
      ? "Saving your profile…"
      : pendingAction === "clear-data"
        ? "Clearing your saved data…"
        : pendingGuide
          ? `Saving ${pendingGuide.title}…`
          : "Updating your saved guides…";
  const tone = notice?.tone ?? "info";
  return (
    <div
      className={`dashboard-notice dashboard-notice-${tone}`}
      role={tone === "error" ? "alert" : "status"}
      aria-live={tone === "error" ? "assertive" : "polite"}
    >
      <p>{notice?.message ?? pendingMessage}</p>
      {notice?.retrySave && (
        <button
          type="button"
          className="dashboard-notice-action"
          disabled={Boolean(pendingAction)}
          onClick={() => void retrySaveIntent()}
        >
          {pendingAction ? "Saving…" : "Try again"}
        </button>
      )}
      {notice && (
        <button
          type="button"
          className="dashboard-notice-close"
          aria-label="Dismiss message"
          onClick={clearNotice}
        >
          <X size={16} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}

function AuthenticatedDashboard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data, notice } = useDashboardData();
  const pageTitle =
    navigation.find((item) => item.href === pathname)?.label ?? "Member space";
  const showSkeleton = !data;

  return (
    <div className="dashboard-layout">
      <aside className="dashboard-sidebar" aria-label="Member space">
        <Link href="/" className="dashboard-brand" aria-label="Flamivor Charlotte home">
          <Brand />
        </Link>
        <div className="dashboard-sidebar-label eyebrow">MEMBER SPACE</div>
        <nav className="dashboard-navigation" aria-label="Member navigation">
          {navigation.map(({ label, href, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                className="dashboard-nav-link"
                href={href}
                key={href}
                aria-current={active ? "page" : undefined}
              >
                <Icon size={17} aria-hidden="true" />
                <span>{label}</span>
                {active && <span className="dashboard-nav-rule" aria-hidden="true" />}
              </Link>
            );
          })}
        </nav>
        <div className="dashboard-sidebar-bottom">
          <Link href="/resources">Public field guide</Link>
          <Link href="/join">Get involved</Link>
        </div>
      </aside>

      <div className="dashboard-main">
        <header className="dashboard-topbar">
          <p className="dashboard-topbar-title">
            <span className="eyebrow">FLAMIVOR / CHARLOTTE</span>
            <span>{pageTitle}</span>
          </p>
          {!showSkeleton && <AccountMenu />}
        </header>
        <nav className="dashboard-mobile-navigation" aria-label="Member navigation">
          {navigation.map(({ label, href, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                className="dashboard-mobile-link"
                href={href}
                key={href}
                aria-current={active ? "page" : undefined}
              >
                <Icon size={16} aria-hidden="true" />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>
        <main id="main" className="dashboard-content">
          {showSkeleton ? (
            <DashboardSkeleton />
          ) : (
            <>
              {notice && <DashboardNotice />}
              {children}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.toString();
  const localPath = pathname.startsWith("/dashboard") ? pathname : "/dashboard";
  const returnUrl = query ? `${localPath}?${query}` : localPath;

  return (
    <>
      <AuthLoading>
        <main id="main" className="dashboard-auth-loading">
          <DashboardSkeleton />
        </main>
      </AuthLoading>
      <Unauthenticated>
        <SignedOutGate returnUrl={returnUrl} />
      </Unauthenticated>
      <Authenticated>
        <DashboardDataErrorBoundary>
          <DashboardDataProvider requestedSlug={searchParams.get("save") ?? undefined}>
            <AuthenticatedDashboard>{children}</AuthenticatedDashboard>
          </DashboardDataProvider>
        </DashboardDataErrorBoundary>
      </Authenticated>
    </>
  );
}
