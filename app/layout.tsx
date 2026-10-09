import type { Metadata } from "next";
import "@fontsource/anton/latin-400.css";
import "@fontsource/space-grotesk/latin-500.css";
import "@fontsource/space-grotesk/latin-600.css";
import "@fontsource/space-grotesk/latin-700.css";
import "@fontsource/manrope/latin-400.css";
import "@fontsource/manrope/latin-500.css";
import "@fontsource/manrope/latin-600.css";
import "@fontsource/manrope/latin-700.css";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { DevTools } from "@/components/dev-tools";
import { site } from "@/lib/site";
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  icons: { icon: "/images/flamivor-logo-approved.png", apple: "/images/flamivor-logo-approved.png" },
  title: {
    default: "Flamivor Charlotte | Your next chapter",
    template: "%s | Flamivor Charlotte",
  },
  description:
    "A youth-led education community in Charlotte, North Carolina. Explore learning resources, connect with peers, and help create opportunities to learn, lead, and inspire.",
  openGraph: {
    title: "Flamivor Charlotte",
    description:
      "Charlotte students building opportunities to learn, lead, and inspire.",
    images: [{ url: "/images/flamivor-logo-approved.png", width: 252, height: 166 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Flamivor Charlotte",
    description: "Charlotte. Your next chapter.",
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        {children}
        <Footer />
        {process.env.NODE_ENV === "development" && <DevTools />}
      </body>
    </html>
  );
}
