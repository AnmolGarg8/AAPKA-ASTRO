import type { Metadata } from "next";
import { Cinzel, Mukta } from "next/font/google";
import "./globals.css";
import { AstrologerStatusHeader } from "@/components/layout/AstrologerStatusHeader";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PLACEHOLDER_ASTROLOGER } from "@/config/placeholderContent";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
});

const mukta = Mukta({
  variable: "--font-mukta",
  subsets: ["latin", "devanagari"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: `Aapka Astro | ${PLACEHOLDER_ASTROLOGER.displayName} — Vedic Astrology & Vastu`,
  description:
    `Direct 1-on-1 consultations with ${PLACEHOLDER_ASTROLOGER.displayName}. Traditional Vedic sciences, Janam Kundli analysis, Devta & Energy Vastu audits, and certified natural gemstones.`,
  keywords: [
    "Vedic Astrology",
    "Aapka Astro",
    "Astrologer in India",
    "Janam Kundli",
    "Kundli Milan",
    "Vastu Shastra Consultant",
    "Certified Gemstones",
    PLACEHOLDER_ASTROLOGER.displayName,
    "Acharya Niraj Kumar Astrologer",
    "Devta Vastu",
    "Astrotalk alternative",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${mukta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FBF3E7] text-[#3B2A1E] font-body selection:bg-[#E8A33D] selection:text-[#3B2A1E]">
        <AstrologerStatusHeader />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
