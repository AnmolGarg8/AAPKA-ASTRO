import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { ZODIAC_SIGNS, DailyHoroscopeService } from "@/lib/astrology/dailyHoroscope";
import { MandalaDivider } from "@/components/ui/MandalaDivider";
import { DiyaIcon } from "@/components/ui/DiyaIcon";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Compass,
  Star,
  PhoneCall,
} from "lucide-react";
import { PLACEHOLDER_ASTROLOGER } from "@/config/placeholderContent";

export const metadata: Metadata = {
  title: "Free Daily Horoscope (दैनिक राशिफल) — All 12 Zodiac Signs | Aapka Astro",
  description:
    "Read your authentic daily Vedic horoscope for all 12 Rashis by Acharya Niraj Kumar. Get accurate astrological guidance for Love, Career, Health, Finance, Lucky Color & Number.",
  keywords: [
    "Daily Horoscope",
    "Dainik Rashifal",
    "Today Horoscope India",
    "Vedic Horoscope 2026",
    "Rashifal today",
    "Aries horoscope today",
    "Kundli reading",
  ],
};

export default function HoroscopeIndexPage() {
  const signs = ZODIAC_SIGNS;
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-[#FBF3E7] text-[#3B2A1E]">
      {/* Sacred Top Hero */}
      <section className="relative overflow-hidden border-b border-[#E8D8C3] bg-gradient-to-b from-[#7B2D26]/10 to-[#FBF3E7] py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E8A33D]/60 bg-[#FFFDF9] px-4 py-1.5 text-xs font-bold text-[#7B2D26] shadow-xs mb-4">
            <DiyaIcon size={14} />
            <span>Vedic Planetary Transit Calculations</span>
            <span className="text-[#6E5545]">•</span>
            <span className="text-[#C1662F] font-mono">{today}</span>
          </div>

          <h1 className="font-temple text-3xl sm:text-5xl font-bold text-[#7B2D26] tracking-tight">
            Daily Vedic Horoscope
          </h1>
          <p className="mt-2 text-lg sm:text-xl font-medium text-[#C1662F]">
            दैनिक राशिफल — 12 राशियों का सम्पूर्ण भविष्यफल
          </p>

          <p className="mt-4 text-sm sm:text-base text-[#6E5545] max-w-2xl mx-auto leading-relaxed">
            Authentic, Shastra-grounded daily astrological readings calculated from real-time planetary transits (Gochara). Select your Rashi below for detailed insights on career, romance, wealth, and auspicious timings.
          </p>

          <div className="flex justify-center my-6">
            <MandalaDivider className="w-32 text-[#C1662F]" />
          </div>
        </div>
      </section>

      {/* 12 Zodiac Signs Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {signs.map((sign) => {
            const preview = DailyHoroscopeService.getHoroscope(sign.id, 0);

            return (
              <Link
                key={sign.id}
                href={`/horoscope/${sign.id}`}
                className="group relative rounded-2xl border border-[#E8D8C3] bg-[#FFFDF9] p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#C1662F] hover:shadow-xl"
              >
                {/* Header with Zodiac Symbol and Element */}
                <div className="flex items-start justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#7B2D26] text-3xl text-[#E8A33D] shadow-sm group-hover:scale-105 transition-transform">
                    {sign.symbol}
                  </div>
                  <span className="rounded-full bg-[#E8A33D]/15 px-2.5 py-1 text-[11px] font-bold text-[#7B2D26]">
                    {sign.element}
                  </span>
                </div>

                {/* Sign Names */}
                <div className="mt-4">
                  <div className="flex items-baseline gap-2">
                    <h2 className="font-temple text-xl font-bold text-[#7B2D26] group-hover:text-[#96372E] transition-colors">
                      {sign.englishName}
                    </h2>
                    <span className="font-hindi text-base font-bold text-[#C1662F]">
                      ({sign.hindiName})
                    </span>
                  </div>
                  <p className="text-xs text-[#6E5545] font-medium">{sign.dateRange}</p>
                </div>

                {/* Ruling Planet & Shastra info */}
                <div className="mt-3 rounded-lg bg-[#FBF3E7] p-2.5 text-[11px] text-[#6E5545]">
                  <p>
                    <span className="font-bold text-[#3B2A1E]">Ruling Planet:</span> {sign.rulingPlanet}
                  </p>
                  <p className="mt-0.5">
                    <span className="font-bold text-[#3B2A1E]">Lucky Color:</span>{" "}
                    {preview?.luckyColor.split("(")[0]}
                  </p>
                </div>

                {/* Short Daily Excerpt */}
                <p className="mt-3 text-xs text-[#3B2A1E] line-clamp-2 leading-relaxed">
                  {preview?.summary}
                </p>

                {/* Read Full CTA */}
                <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-[#7B2D26] group-hover:gap-2 transition-all">
                  <span>Read Complete Horoscope</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Authority Banner — Beat Astrotalk Upsell */}
      <section className="bg-[#7B2D26] text-[#FBF3E7] py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#E8A33D]/20 px-3.5 py-1 text-xs font-bold text-[#E8A33D] mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Personalized Vedic Consultation</span>
          </div>

          <h2 className="font-temple text-2xl sm:text-4xl font-bold">
            General Horoscopes are Helpful. Your Personal Janam Kundli is Definitive.
          </h2>

          <p className="mt-4 text-sm sm:text-base text-[#FBF3E7]/80 leading-relaxed max-w-2xl mx-auto">
            Sun and Moon sign horoscopes reflect broad planetary patterns. For exact timing on your career, marriage, health, and dasha transitions, consult directly with {PLACEHOLDER_ASTROLOGER.displayName}.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/consult"
              className="inline-flex items-center gap-2 rounded-xl bg-[#E8A33D] px-6 py-3.5 text-sm font-bold text-[#3B2A1E] hover:bg-[#D5912C] transition-all shadow-lg"
            >
              <PhoneCall className="h-4 w-4" />
              <span>Talk to Acharya Ji Now</span>
            </Link>
            <Link
              href="/kundli-generator"
              className="inline-flex items-center gap-2 rounded-xl border border-[#FBF3E7]/30 bg-[#7B2D26] px-6 py-3.5 text-sm font-bold text-[#FBF3E7] hover:bg-[#64221C] transition-all"
            >
              <Compass className="h-4 w-4" />
              <span>Generate Free Janam Kundli</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
