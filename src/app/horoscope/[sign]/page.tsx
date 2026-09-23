import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  DailyHoroscopeService,
  ZODIAC_SIGNS,
} from "@/lib/astrology/dailyHoroscope";
import { MandalaDivider } from "@/components/ui/MandalaDivider";
import { DiyaIcon } from "@/components/ui/DiyaIcon";
import {
  Heart,
  Briefcase,
  Activity,
  Coins,
  Sparkles,
  PhoneCall,
  Clock,
  ArrowLeft,
  ShieldCheck,
  Compass,
} from "lucide-react";
import { PLACEHOLDER_ASTROLOGER } from "@/config/placeholderContent";

interface PageProps {
  params: Promise<{ sign: string }>;
}

export async function generateStaticParams() {
  return ZODIAC_SIGNS.map((s) => ({
    sign: s.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { sign: signId } = await params;
  const horoscope = DailyHoroscopeService.getHoroscope(signId);
  if (!horoscope) {
    return { title: "Horoscope Not Found | Aapka Astro" };
  }

  const sign = horoscope.sign;
  return {
    title: `${sign.englishName} Daily Horoscope (${sign.hindiName} राशिफल) Today | Aapka Astro`,
    description: `Read today's authentic Vedic horoscope for ${sign.englishName} (${sign.hindiName}) by Acharya Niraj Kumar. Accurate astrological predictions for Love, Career, Wealth, Lucky Color, and Remedies.`,
    keywords: [
      `${sign.englishName} horoscope today`,
      `${sign.hindiName} rashifal`,
      `${sign.englishName} daily astrology`,
      "Vedic horoscope",
      "Aapka Astro",
    ],
  };
}

export default async function SignHoroscopePage({ params }: PageProps) {
  const { sign: signId } = await params;
  const horoscope = DailyHoroscopeService.getHoroscope(signId);

  if (!horoscope) {
    notFound();
  }

  const { sign } = horoscope;

  return (
    <div className="min-h-screen bg-[#FBF3E7] text-[#3B2A1E]">
      {/* Breadcrumb Navigation */}
      <div className="border-b border-[#E8D8C3] bg-[#FFFDF9] px-4 py-3 text-xs text-[#6E5545]">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link
            href="/horoscope"
            className="inline-flex items-center gap-1.5 font-bold text-[#7B2D26] hover:text-[#96372E] transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>All 12 Zodiac Rashis</span>
          </Link>
          <span className="font-mono text-[#C1662F] font-bold">{horoscope.formattedDate}</span>
        </div>
      </div>

      {/* Hero Header */}
      <section className="border-b border-[#E8D8C3] bg-gradient-to-b from-[#7B2D26]/10 to-[#FBF3E7] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-[#7B2D26] text-5xl text-[#E8A33D] shadow-lg mb-4">
            {sign.symbol}
          </div>

          <div className="flex items-center justify-center gap-3">
            <h1 className="font-temple text-3xl sm:text-4xl font-bold text-[#7B2D26]">
              {sign.englishName} Daily Horoscope
            </h1>
            <span className="rounded-full bg-[#E8A33D]/25 px-3 py-1 text-sm font-bold text-[#7B2D26]">
              {sign.hindiName}
            </span>
          </div>

          <p className="mt-2 text-xs sm:text-sm text-[#6E5545] font-medium">
            Element: <strong className="text-[#3B2A1E]">{sign.element}</strong> | Ruling Planet:{" "}
            <strong className="text-[#3B2A1E]">{sign.rulingPlanet}</strong> | {sign.dateRange}
          </p>

          <p className="mt-4 text-xs font-mono text-[#C1662F] bg-[#FFFDF9] inline-block border border-[#E8D8C3] px-3 py-1 rounded-full">
            {horoscope.planetaryTransit}
          </p>

          <div className="flex justify-center my-4">
            <MandalaDivider className="w-28 text-[#C1662F]" />
          </div>
        </div>
      </section>

      {/* Main Horoscope Content */}
      <div className="max-w-5xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Daily Summary Box (English & Hindi) */}
        <div className="rounded-3xl border border-[#E8D8C3] bg-[#FFFDF9] p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-bold text-[#7B2D26] uppercase tracking-wider mb-2">
            <Sparkles className="h-4 w-4 text-[#E8A33D]" />
            <span>Today&apos;s Core Astrological Transit Guidance</span>
          </div>

          <p className="text-base sm:text-lg text-[#3B2A1E] leading-relaxed font-medium">
            {horoscope.summary}
          </p>

          <div className="mt-4 pt-4 border-t border-[#E8D8C3]/60">
            <p className="text-sm sm:text-base text-[#C1662F] leading-relaxed font-hindi font-medium">
              {horoscope.summaryHindi}
            </p>
          </div>
        </div>

        {/* 4 Core Dimensions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Love & Relationships */}
          <div className="rounded-2xl border border-[#E8D8C3] bg-[#FFFDF9] p-6 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#7B2D26]/10 text-[#7B2D26]">
                  <Heart className="h-4 w-4" />
                </div>
                <h2 className="font-bold text-sm text-[#7B2D26]">Love &amp; Relationships (प्रेम व सम्बंध)</h2>
              </div>
              <span className="font-mono text-xs font-bold text-[#6B8E5A]">
                {horoscope.love.score}% Positive
              </span>
            </div>
            <p className="text-xs text-[#3B2A1E] leading-relaxed">{horoscope.love.description}</p>
            <p className="mt-2 text-xs text-[#6E5545] font-hindi leading-relaxed">
              {horoscope.love.descriptionHindi}
            </p>
          </div>

          {/* Career & Profession */}
          <div className="rounded-2xl border border-[#E8D8C3] bg-[#FFFDF9] p-6 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E8A33D]/15 text-[#C1662F]">
                  <Briefcase className="h-4 w-4" />
                </div>
                <h2 className="font-bold text-sm text-[#7B2D26]">Career &amp; Business (कार्य व व्यवसाय)</h2>
              </div>
              <span className="font-mono text-xs font-bold text-[#6B8E5A]">
                {horoscope.career.score}% Positive
              </span>
            </div>
            <p className="text-xs text-[#3B2A1E] leading-relaxed">{horoscope.career.description}</p>
            <p className="mt-2 text-xs text-[#6E5545] font-hindi leading-relaxed">
              {horoscope.career.descriptionHindi}
            </p>
          </div>

          {/* Health & Vitality */}
          <div className="rounded-2xl border border-[#E8D8C3] bg-[#FFFDF9] p-6 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#6B8E5A]/15 text-[#6B8E5A]">
                  <Activity className="h-4 w-4" />
                </div>
                <h2 className="font-bold text-sm text-[#7B2D26]">Health &amp; Energy (स्वास्थ्य व ऊर्जा)</h2>
              </div>
              <span className="font-mono text-xs font-bold text-[#6B8E5A]">
                {horoscope.health.score}% Positive
              </span>
            </div>
            <p className="text-xs text-[#3B2A1E] leading-relaxed">{horoscope.health.description}</p>
            <p className="mt-2 text-xs text-[#6E5545] font-hindi leading-relaxed">
              {horoscope.health.descriptionHindi}
            </p>
          </div>

          {/* Wealth & Finance */}
          <div className="rounded-2xl border border-[#E8D8C3] bg-[#FFFDF9] p-6 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#C1662F]/15 text-[#C1662F]">
                  <Coins className="h-4 w-4" />
                </div>
                <h2 className="font-bold text-sm text-[#7B2D26]">Wealth &amp; Finance (धन व लाभ)</h2>
              </div>
              <span className="font-mono text-xs font-bold text-[#6B8E5A]">
                {horoscope.finance.score}% Positive
              </span>
            </div>
            <p className="text-xs text-[#3B2A1E] leading-relaxed">{horoscope.finance.description}</p>
            <p className="mt-2 text-xs text-[#6E5545] font-hindi leading-relaxed">
              {horoscope.finance.descriptionHindi}
            </p>
          </div>
        </div>

        {/* Lucky Indicators & Auspicious Muhurat Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-[#E8D8C3] bg-[#FFFDF9] p-4 text-center">
            <span className="text-[11px] font-bold text-[#6E5545] uppercase">Lucky Color</span>
            <p className="mt-1 font-bold text-sm text-[#7B2D26]">{horoscope.luckyColor}</p>
          </div>
          <div className="rounded-2xl border border-[#E8D8C3] bg-[#FFFDF9] p-4 text-center">
            <span className="text-[11px] font-bold text-[#6E5545] uppercase">Lucky Number</span>
            <p className="mt-1 font-mono font-black text-xl text-[#7B2D26]">{horoscope.luckyNumber}</p>
          </div>
          <div className="rounded-2xl border border-[#E8D8C3] bg-[#FFFDF9] p-4 text-center">
            <span className="text-[11px] font-bold text-[#6E5545] uppercase">Auspicious Time (शुभ मुहूर्त)</span>
            <p className="mt-1 font-mono font-bold text-xs text-[#6B8E5A]">{horoscope.auspiciousTime}</p>
          </div>
        </div>

        {/* Vedic Shastra Remedy of the Day */}
        <div className="rounded-2xl border border-[#E8A33D] bg-[#E8A33D]/10 p-6">
          <div className="flex items-center gap-2 text-xs font-bold text-[#7B2D26] mb-2">
            <DiyaIcon size={16} />
            <span>Today&apos;s Astrological Upay / Remedy (आज का विशेष उपाय)</span>
          </div>
          <p className="text-sm text-[#3B2A1E] font-medium leading-relaxed">{horoscope.remedy}</p>
          <p className="mt-2 text-xs text-[#C1662F] font-hindi leading-relaxed">
            {horoscope.remedyHindi}
          </p>
        </div>

        {/* Call to Action Upsell Banner */}
        <div className="rounded-3xl border border-[#7B2D26] bg-[#7B2D26] p-8 text-center text-[#FBF3E7] shadow-xl">
          <h3 className="font-temple text-xl sm:text-2xl font-bold">
            Seek Clarity on a Specific Concern for {sign.englishName}?
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-[#FBF3E7]/80 max-w-xl mx-auto leading-relaxed">
            Connect directly with {PLACEHOLDER_ASTROLOGER.displayName} for an exhaustive analysis of your Janam Kundli, current Mahadasha, and tailored Vedic gemstone &amp; puja remedies.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="/consult"
              className="inline-flex items-center gap-2 rounded-xl bg-[#E8A33D] px-6 py-3 text-xs font-bold text-[#3B2A1E] hover:bg-[#D5912C] transition-all shadow-md"
            >
              <PhoneCall className="h-4 w-4" />
              <span>Consult Acharya Ji Live</span>
            </Link>
            <Link
              href="/kundli-generator"
              className="inline-flex items-center gap-2 rounded-xl border border-[#FBF3E7]/30 bg-[#FFFDF9]/10 px-6 py-3 text-xs font-bold text-[#FBF3E7] hover:bg-[#FFFDF9]/20 transition-all"
            >
              <Compass className="h-4 w-4" />
              <span>Calculate Birth Chart</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
