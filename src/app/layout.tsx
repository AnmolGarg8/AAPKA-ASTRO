import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AstrologerStatusHeader } from "@/components/layout/AstrologerStatusHeader";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aapka Astro | Premier Vedic Astrology, Kundli & Vastu Consultations",
  description:
    "Direct 1-on-1 consultations with Acharya Rajesh Sharma (18+ Years Exp, BHU Gold Medalist). Accurate Janam Kundli, Gun Milan, Vastu audits, and certified gemstone recommendations.",
  keywords: [
    "Vedic Astrology",
    "Aapka Astro",
    "Astrologer in India",
    "Janam Kundli",
    "Kundli Milan",
    "Vastu Shastra Consultant",
    "Certified Gemstones",
    "Acharya Rajesh Sharma",
    "Astrotalk alternative"
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#0B0F19] text-slate-100 selection:bg-amber-500 selection:text-slate-950 font-sans">
        <AstrologerStatusHeader />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
