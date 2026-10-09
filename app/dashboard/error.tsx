"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Dashboard route error:", error);
  }, [error]);

  return (
    <section className="dashboard-error-state">
      <p className="eyebrow">MEMBER SPACE / CONNECTION ISSUE</p>
      <h1>We couldn’t load this page.</h1>
      <p>
        Your saved details are still tied to your account. Check your
        connection and try again.
      </p>
      <Button type="button" onClick={reset}>
        Try again
      </Button>
    </section>
  );
}
