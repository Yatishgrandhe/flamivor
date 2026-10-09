import type { Metadata, Viewport } from "next";
import "@fontsource/anton/latin-400.css";
import "@fontsource/space-grotesk/latin-500.css";
import "@fontsource/space-grotesk/latin-600.css";
import "@fontsource/space-grotesk/latin-700.css";
import "@fontsource/manrope/latin-400.css";
import "@fontsource/manrope/latin-500.css";
import "@fontsource/manrope/latin-600.css";
import "@fontsource/manrope/latin-700.css";
import "@fontsource/literata/latin-400.css";
import "@fontsource/literata/latin-500.css";
import "@fontsource/literata/latin-400-italic.css";
import "./globals.css";
import "@/components/public-design.css";
import "@/components/page-transitions.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { DevTools } from "@/components/dev-tools";
import { site } from "@/lib/site";
import { PageTransitions } from "@/components/page-transitions";
import { PageEntrance } from "@/components/page-entrance";
import { InputModality } from "@/components/input-modality";
import { SiteChrome } from "@/components/site-chrome";
export const viewport: Viewport = { themeColor: "#8A0103", viewportFit: "cover", interactiveWidget: "resizes-content" };
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
        <InputModality />
        <PageTransitions>
          <PageEntrance>
            <a className="skip-link" href="#main">Skip to content</a>
            <SiteChrome header={<Header />} footer={<Footer />}>{children}</SiteChrome>
          </PageEntrance>
        </PageTransitions>
        {process.env.NODE_ENV === "development" && <DevTools />}
      </body>
    </html>
  );
}
