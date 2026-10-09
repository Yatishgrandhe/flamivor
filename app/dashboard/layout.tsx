import { Suspense } from "react";
import { MemberProvider } from "@/components/member-provider";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import "@/components/dashboard.css";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MemberProvider>
      <Suspense
        fallback={
          <main id="main" className="dashboard-auth-loading">
            <p role="status">Opening your member space…</p>
          </main>
        }
      >
        <DashboardShell>{children}</DashboardShell>
      </Suspense>
    </MemberProvider>
  );
}
