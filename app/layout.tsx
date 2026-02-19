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
  title: "McPrime Digital | AI-Powered Marketing & Production",
  description: "Unleash Success With Our AI Mastery And Digital Marketing!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.className} ${libreBaskerville.variable} ${cinzel.variable} ${syne.variable} ${michroma.variable}`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
