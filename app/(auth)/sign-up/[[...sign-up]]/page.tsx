import type { Metadata } from "next";
import { CustomAuthCard } from "@/components/custom-auth-card";
import { safeAuthRedirect } from "@/lib/auth-redirect";

export const metadata: Metadata = {
  title: "Create your account",
  robots: { index: false, follow: false },
};

export default async function SignUpPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect_url?: string | string[] }>;
}) {
  const params = await searchParams;
  const rawRedirect = Array.isArray(params.redirect_url)
    ? params.redirect_url[0]
    : params.redirect_url;

  return (
    <main id="main" className="auth-shell">
      <CustomAuthCard mode="sign-up" redirectUrl={safeAuthRedirect(rawRedirect)} />
    </main>
  );
}
