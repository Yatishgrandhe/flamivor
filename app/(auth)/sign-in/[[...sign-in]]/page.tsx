import { SignIn } from "@clerk/nextjs";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};
export default function SignInPage() {
  return (
    <main id="main" className="auth-shell">
      <SignIn />
    </main>
  );
}
