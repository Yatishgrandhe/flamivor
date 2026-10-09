"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { resources } from "@/lib/resources";
import {
  DashboardDataContext,
  type Notice,
} from "./dashboard-context";
import type { FunctionReturnType } from "convex/server";

type MemberData = FunctionReturnType<typeof api.members.get>;
type MemberProfile = NonNullable<MemberData["profile"]>;
type ProfileValues = MemberProfile;

export function DashboardDataProvider({
  children,
  requestedSlug,
}: {
  children: ReactNode;
  requestedSlug?: string;
}) {
  const data = useQuery(api.members.get);
  const saveProfileMutation = useMutation(api.members.saveProfile);
  const bookmarkMutation = useMutation(api.members.setBookmark);
  const clearMutation = useMutation(api.members.clearMyData);
  const [pendingAction, setPendingAction] = useState<string | null>(null);
  const [notice, setNotice] = useState<Notice | null>(null);
  const actionLock = useRef(false);
  const attemptedIntent = useRef(false);
  const [initialRequestedSlug] = useState(requestedSlug);

  const saveProfile = useCallback(
    async (profile: ProfileValues) => {
      if (actionLock.current) return false;
      actionLock.current = true;
      setPendingAction("save-profile");
      setNotice(null);
      try {
        await saveProfileMutation(profile);
        setNotice({ tone: "success", message: "Your profile was saved." });
        return true;
      } catch {
        setNotice({
          tone: "error",
          message: "We couldn’t save your profile. Your changes are still here; please try again.",
        });
        return false;
      } finally {
        actionLock.current = false;
        setPendingAction(null);
      }
    },
    [saveProfileMutation],
  );

  const setBookmark = useCallback(
    async (slug: string, saved: boolean, retryOnFailure = false) => {
      if (actionLock.current) return false;
      actionLock.current = true;
      setPendingAction(`bookmark:${slug}`);
      setNotice(null);
      try {
        await bookmarkMutation({ slug, saved });
        const guide = resources.find((resource) => resource.slug === slug);
        setNotice({
          tone: "success",
          message: saved
            ? `${guide?.title ?? "Guide"} was saved to your collection.`
            : `${guide?.title ?? "Guide"} was removed from your collection.`,
        });
        return true;
      } catch {
        setNotice({
          tone: "error",
          message: "We couldn’t update your saved guides. Please try again.",
          retrySave: retryOnFailure,
        });
        return false;
      } finally {
        actionLock.current = false;
        setPendingAction(null);
      }
    },
    [bookmarkMutation],
  );

  const clearMyData = useCallback(async () => {
    if (actionLock.current) return false;
    actionLock.current = true;
    setPendingAction("clear-data");
    setNotice(null);
    try {
      await clearMutation();
      setNotice({
        tone: "success",
        message: "Your saved profile and guides have been cleared. Your sign-in account remains active.",
      });
      return true;
    } catch {
      setNotice({
        tone: "error",
        message: "We couldn’t clear your saved data. Please try again.",
      });
      return false;
    } finally {
      actionLock.current = false;
      setPendingAction(null);
    }
  }, [clearMutation]);

  const retrySaveIntent = useCallback(async () => {
    const slug = initialRequestedSlug;
    if (!slug) return false;
    return setBookmark(slug, true, true);
  }, [initialRequestedSlug, setBookmark]);

  useEffect(() => {
    const slug = initialRequestedSlug;
    if (!slug || !data || attemptedIntent.current) return;
    attemptedIntent.current = true;

    const guide = resources.find((resource) => resource.slug === slug);
    if (!guide) {
      void Promise.resolve().then(() =>
        setNotice({ tone: "error", message: "That guide is not available to save." }),
      );
      return;
    }
    if (data.bookmarks.includes(slug)) return;
    void Promise.resolve().then(() => setBookmark(slug, true, true));
  }, [data, initialRequestedSlug, setBookmark]);

  const value = useMemo(
    () => ({
      data,
      pendingAction,
      notice,
      clearNotice: () => setNotice(null),
      saveProfile,
      setBookmark,
      clearMyData,
      retrySaveIntent,
      requestedSlug: initialRequestedSlug,
    }),
    [
      clearMyData,
      data,
      initialRequestedSlug,
      notice,
      pendingAction,
      retrySaveIntent,
      saveProfile,
      setBookmark,
    ],
  );

  return <DashboardDataContext.Provider value={value}>{children}</DashboardDataContext.Provider>;
}
