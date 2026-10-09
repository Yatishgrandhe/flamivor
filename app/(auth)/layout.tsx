import { MemberProvider } from "@/components/member-provider";
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MemberProvider>{children}</MemberProvider>;
}
