import type { Metadata } from "next";
import { Manrope, Libre_Baskerville, Cinzel_Decorative, Syne, Michroma } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

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

export const metadata: Metadata = {
  title: "AI Commercial Filmmaking & AI Automation Systems | McPrime Digital",
  description: "McPrime Digital delivers AI commercial filmmaking and AI automation systems engineered for mid-market and enterprise organizations. We design AI-native cinematic production and structured automation infrastructure built for speed, governance alignment, and scalable execution.",
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
  ]
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
