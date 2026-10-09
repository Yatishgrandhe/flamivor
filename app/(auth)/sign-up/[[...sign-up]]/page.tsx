import { SignUp } from "@clerk/nextjs";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Create your account",
  robots: { index: false, follow: false },
};
export default function SignUpPage() {
  return (
    <main id="main" className="auth-shell">
      <SignUp />
    </main>
  );
}
