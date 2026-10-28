import type { Metadata, Viewport } from "next";
import { Manrope, Libre_Baskerville, Cinzel_Decorative, Syne, Michroma } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, SITE_NAME, SITE_URL } from "@/lib/site";

const manrope = Manrope({ subsets: ["latin"] });
const libreBaskerville = Libre_Baskerville({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-libre'
});

const cinzel = Cinzel_Decorative({
  weight: ['400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-cinzel'
});

const syne = Syne({
  weight: ['400', '700', '800'],
  subsets: ['latin'],
  variable: '--font-syne'
});

const michroma = Michroma({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-michroma'
});

export const viewport: Viewport = {
  themeColor: "#0A0D14",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "AI commercial filmmaking",
    "AI commercial production",
    "AI cinematic production",
    "AI automation systems",
    "enterprise AI automation",
    "AI marketing automation infrastructure",
    "AI-powered commercial film",
    "AI production agency",
    "AI workflow automation",
    "enterprise automation architecture",
    "AI brand ambassador systems",
    "AI digital spokesperson",
    "AI-driven advertising",
    "enterprise content automation",
    "AI video production for enterprises",
    "AI automation consulting",
    "AI production infrastructure",
    "AI content systems",
    "AI commercial filmmaking for pharmaceutical companies",
    "AI automation systems for financial institutions",
    "enterprise AI video production agency",
    "AI automation architecture for enterprises",
    "AI-native commercial production infrastructure"
  ],
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
    url: "/",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-video-preview": -1 },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.className} ${libreBaskerville.variable} ${cinzel.variable} ${syne.variable} ${michroma.variable} overflow-x-hidden relative min-h-screen`}>
        <Navbar />
        <main className="w-full relative overflow-x-hidden">
          {children}
        </main>
      </body>
    </html>
  );
}
