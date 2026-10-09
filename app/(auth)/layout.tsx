import { MemberProvider } from "@/components/member-provider";
import "@/components/auth.css";
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MemberProvider>{children}</MemberProvider>;
}
