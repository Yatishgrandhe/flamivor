import type { Metadata } from "next";
import { DashboardResources } from "@/components/dashboard/dashboard-pages";

export const metadata: Metadata = {
  title: "Member resources",
  robots: { index: false, follow: false },
};

export default function DashboardResourcesPage() {
  return <DashboardResources />;
}
