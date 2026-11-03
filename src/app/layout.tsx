import type { Metadata, Viewport } from "next";
import { Fraunces, Outfit } from "next/font/google";
import { site } from "@/lib/site";
import { getSettings } from "@/lib/store";
import "./globals.css";

const display = Fraunces({ subsets: ["latin"], variable: "--font-display" });
const sans = Outfit({ subsets: ["latin"], variable: "--font-sans" });

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3eadc" },
    { media: "(prefers-color-scheme: dark)", color: "#14110e" },
  ],
};

// Runs before first paint so a saved light/dark choice never flashes the wrong theme.
const themeScript = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return {
    metadataBase: new URL(site.url),
    applicationName: site.name,
    title: { default: `${site.name}: ${site.tagline}`, template: `%s | ${site.name}` },
    description: site.description,
    openGraph: {
      type: "website",
      locale: site.locale,
      siteName: site.name,
      images: [{ url: "/images/og.jpg", width: 1200, height: 630, alt: "MerchGoa Goa-inspired gifts on a sunlit balcony" }],
    },
    twitter: { card: "summary_large_image" },
    formatDetection: { telephone: false },
    ...(settings.googleVerification ? { verification: { google: settings.googleVerification } } : {}),
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${display.variable} ${sans.variable} antialiased`}>{children}</body>
    </html>
  );
}
