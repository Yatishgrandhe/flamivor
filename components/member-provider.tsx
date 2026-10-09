"use client";
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";
import { useState } from "react";
export function MemberProvider({ children }: { children: React.ReactNode }) {
  const [convex] = useState(
    () => new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!),
  );
  return (
    <ClerkProvider
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      signInFallbackRedirectUrl="/dashboard"
      signUpFallbackRedirectUrl="/dashboard"
      taskUrls={{
        "choose-organization": "/sign-in?task=1",
        "reset-password": "/sign-in?task=1",
        "setup-mfa": "/sign-in?task=1",
      }}
      appearance={{
        variables: {
          colorPrimary: "#8A0103",
          colorBackground: "#F2EFE5",
          borderRadius: "4px",
          fontFamily: "Manrope, sans-serif",
        },
      }}
    >
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
