import type { Metadata } from "next";
import { MemberDashboard } from "@/components/member-dashboard";
export const metadata: Metadata = {
  title: "Member space",
  robots: { index: false, follow: false },
};
export default async function Members({
  searchParams,
}: {
  searchParams: Promise<{ save?: string }>;
}) {
  const { save } = await searchParams;
  return (
    <main id="main" className="member-section shell">
      <MemberDashboard requestedSlug={save} />
    </main>
  );
}
