import { MemberProvider } from "@/components/member-provider";
export default function MemberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MemberProvider>{children}</MemberProvider>;
}
