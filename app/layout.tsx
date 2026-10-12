import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: "900",
  display: "swap",
  variable: "--font-barlow-condensed",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const SITE_URL = "https://marketingplaymaker.com.br";
const TITLE = "Playmaker | Sports Marketing Agency";
const DESCRIPTION =
  "We turn gyms, arenas and local sports businesses into brands people recognize, trust and pay more for. Strategic sports marketing that delivers real results.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "sports marketing",
    "sports branding",
    "gym marketing",
    "sports arena marketing",
    "sports marketing agency",
    "sports brand positioning",
  ],
  authors: [{ name: "Playmaker Sports Marketing" }],
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Playmaker Sports Marketing",
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_US",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Playmaker, sports marketing agency" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${barlowCondensed.variable} ${inter.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
