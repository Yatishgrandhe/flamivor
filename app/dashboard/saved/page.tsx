import type { Metadata } from "next";
import { DashboardSaved } from "@/components/dashboard/dashboard-pages";

export const metadata: Metadata = {
  title: "Saved guides",
  robots: { index: false, follow: false },
};

export default function DashboardSavedPage() {
  return <DashboardSaved />;
}
