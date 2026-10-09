import type { Metadata } from "next";
import { DashboardProfile } from "@/components/dashboard/dashboard-pages";

export const metadata: Metadata = {
  title: "Your profile",
  robots: { index: false, follow: false },
};

export default function DashboardProfilePage() {
  return <DashboardProfile />;
}
