import type { Metadata } from "next";
import { CustomAuthCard } from "@/components/custom-auth-card";
import { safeAuthRedirect } from "@/lib/auth-redirect";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect_url?: string | string[]; task?: string | string[] }>;
}) {
  const params = await searchParams;
  const rawRedirect = Array.isArray(params.redirect_url)
    ? params.redirect_url[0]
    : params.redirect_url;
  const taskMode = Array.isArray(params.task) ? params.task.includes("1") : params.task === "1";

  return (
    <main id="main" className="auth-shell">
      <CustomAuthCard mode="sign-in" redirectUrl={safeAuthRedirect(rawRedirect)} taskMode={taskMode} />
    </main>
  );
}
