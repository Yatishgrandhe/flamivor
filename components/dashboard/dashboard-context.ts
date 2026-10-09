"use client";

import { createContext, useContext } from "react";
import type { FunctionReturnType } from "convex/server";
import { api } from "@/convex/_generated/api";

type MemberData = FunctionReturnType<typeof api.members.get>;
type MemberProfile = NonNullable<MemberData["profile"]>;
type ProfileValues = MemberProfile;
export type Notice = {
  tone: "success" | "error" | "info";
  message: string;
  retrySave?: boolean;
};

export type DashboardDataContextValue = {
  data: MemberData | undefined;
  pendingAction: string | null;
  notice: Notice | null;
  clearNotice: () => void;
  saveProfile: (profile: ProfileValues) => Promise<boolean>;
  setBookmark: (
    slug: string,
    saved: boolean,
    retryOnFailure?: boolean,
  ) => Promise<boolean>;
  clearMyData: () => Promise<boolean>;
  retrySaveIntent: () => Promise<boolean>;
  requestedSlug?: string;
};

export const DashboardDataContext =
  createContext<DashboardDataContextValue | null>(null);

export function useDashboardData() {
  const context = useContext(DashboardDataContext);
  if (!context) {
    throw new Error("useDashboardData must be used inside DashboardDataProvider");
  }
  return context;
}
