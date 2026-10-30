import type { Metadata, Viewport } from "next";
import { Manrope, Libre_Baskerville, Cinzel_Decorative, Syne, Michroma } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import MotionProvider from "@/components/MotionProvider";
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, GENRELINE, SITE_NAME, SITE_URL, SOCIAL_URLS } from "@/lib/site";

/** Organization structured data: who we are, where else we are, and the platform we run on. */
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description: DEFAULT_DESCRIPTION,
  foundingDate: "2023",
  sameAs: Object.values(SOCIAL_URLS),
  knowsAbout: ["AI commercial filmmaking", "AI automation systems", "Hybrid film production", GENRELINE.url],
};

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c") }}
        />
        <MotionProvider>
          <Navbar />
          {/* clip (not hidden) trims sideways overflow without turning main into a scroll box, which would break position: sticky */}
          <main className="w-full relative overflow-x-clip">
            {children}
          </main>
        </MotionProvider>
      </body>
    </html>
  );
}
