import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { ZODIAC_SIGNS_EVERGREEN, getZodiacSignBySlug } from "@/lib/astrology/zodiacHubData";
import {
  Sparkles,
  Compass,
  Flame,
  Mountain,
  Wind,
  Droplet,
  Heart,
  Briefcase,
  Activity,
  CheckCircle2,
  XCircle,
  Gem,
  Calendar,
  PhoneCall,
  ArrowLeft,
  ChevronRight,
  ShieldAlert,
} from "lucide-react";

interface Props {
  params: Promise<{ sign: string }>;
}

export async function generateStaticParams() {
  return ZODIAC_SIGNS_EVERGREEN.map((s) => ({
    sign: s.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { sign: slug } = await params;
  const sign = getZodiacSignBySlug(slug);

  if (!sign) {
    return {
      title: "Zodiac Sign Not Found | Aapka Astro",
    };
  }

  return {
    title: `${sign.name} (${sign.vedicName}) Zodiac Sign Guide | Personality, Love & Vedic Remedies`,
    description: `Complete guide to ${sign.name} (${sign.vedicName}). Discover personality strengths, compatibility matches, ruling planet ${sign.rulingPlanet}, auspicious gemstone, and sacred Vedic mantra.`,
  };
}

const ELEMENT_BADGES: Record<string, { bg: string; text: string; icon: any; border: string }> = {
  Fire: { bg: "bg-[#FDF2F0]", text: "text-[#C1662F]", icon: Flame, border: "border-[#C1662F]/30" },
  Earth: { bg: "bg-[#F5F7F2]", text: "text-[#6B8E5A]", icon: Mountain, border: "border-[#6B8E5A]/30" },
  Air: { bg: "bg-[#FFF9E6]", text: "text-[#E8A33D]", icon: Wind, border: "border-[#E8A33D]/30" },
  Water: { bg: "bg-[#F0F5FA]", text: "text-[#3B6E8C]", icon: Droplet, border: "border-[#3B6E8C]/30" },
};

export default async function ZodiacSignDetailPage({ params }: Props) {
  const { sign: slug } = await params;
  const sign = getZodiacSignBySlug(slug);

  if (!sign) {
    notFound();
  }

  const elem = ELEMENT_BADGES[sign.element] || ELEMENT_BADGES.Fire;
  const ElemIcon = elem.icon;

  return (
    <div className="min-h-screen bg-[#FFFDF9] py-10 px-4 sm:px-6 lg:px-8 text-[#3B2A1E]">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-medium text-[#6E5545]">
          <Link href="/" className="hover:text-[#7B2D26] transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/zodiac-signs" className="hover:text-[#7B2D26] transition-colors">
            Zodiac Signs
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-[#7B2D26] font-bold">{sign.name}</span>
        </nav>

        {/* Hero Header */}
        <header className="bg-[#FBF3E7] rounded-3xl p-6 sm:p-10 border border-[#E8D8C3] shadow-sm relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#FFFDF9] border border-[#E8D8C3] flex items-center justify-center text-4xl sm:text-5xl shadow-md shrink-0">
              {sign.glyph}
            </div>

            <div className="space-y-2 text-center sm:text-left flex-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                <span
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border ${elem.bg} ${elem.text} ${elem.border}`}
                >
                  <ElemIcon className="h-3 w-3" />
                  {sign.element} Sign
                </span>
                <span className="px-3 py-1 rounded-full bg-[#FFFDF9] border border-[#E8D8C3] text-xs font-bold text-[#6E5545]">
                  {sign.modality}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold font-temple text-[#7B2D26]">
                {sign.name} &bull; <span className="text-[#C1662F] font-normal">{sign.vedicName}</span>
              </h1>
              <p className="text-xs sm:text-sm font-semibold text-[#6E5545]">
                {sign.dateRange} &bull; Symbol: {sign.symbol}
              </p>
              <p className="text-sm sm:text-base text-[#7B2D26] italic font-medium pt-1">
                "{sign.tagline}"
              </p>
            </div>
          </div>

          {/* Quick Action Bar */}
          <div className="mt-8 pt-6 border-t border-[#E8D8C3] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Link
                href={`/horoscope/${sign.slug}`}
                className="px-4 py-2 rounded-xl bg-[#FFFDF9] border border-[#E8D8C3] text-xs font-bold text-[#7B2D26] hover:bg-[#7B2D26] hover:text-[#FFFDF9] transition-all shadow-2xs"
              >
                Today's Horoscope &rarr;
              </Link>
              <Link
                href="/kundli-generator"
                className="px-4 py-2 rounded-xl bg-[#FFFDF9] border border-[#E8D8C3] text-xs font-bold text-[#6E5545] hover:border-[#C1662F] transition-all shadow-2xs"
              >
                Check My Kundli
              </Link>
            </div>

            <Link
              href="/consult"
              className="px-5 py-2 rounded-xl bg-[#7B2D26] text-[#FFFDF9] text-xs font-bold uppercase tracking-wider hover:bg-[#63231E] transition-all shadow-sm flex items-center gap-1.5"
            >
              <PhoneCall className="h-3.5 w-3.5" />
              Consult on {sign.name} Lagna
            </Link>
          </div>
        </header>

        {/* Overview Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold font-temple text-[#7B2D26] flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-[#C1662F]" />
            Cosmic Overview &amp; Nature
          </h2>
          <div className="bg-[#FFFDF9] p-6 rounded-2xl border border-[#E8D8C3] shadow-xs">
            <p className="text-sm sm:text-base text-[#6E5545] leading-relaxed">
              {sign.overview}
            </p>
          </div>
        </section>

        {/* Auspicious Cosmic Correspondences Table */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold font-temple text-[#7B2D26] flex items-center gap-2">
            <Gem className="h-5 w-5 text-[#C1662F]" />
            Auspicious Vedic Correspondences
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-xl bg-[#FBF3E7]/70 border border-[#E8D8C3]">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#A89080] block">Ruling Planet</span>
              <span className="text-sm font-bold text-[#3B2A1E]">{sign.rulingPlanet} ({sign.rulingGrahaHindi})</span>
              <span className="text-[11px] text-[#6E5545] block">Vedic Lord: {sign.vedicLord}</span>
            </div>

            <div className="p-4 rounded-xl bg-[#FBF3E7]/70 border border-[#E8D8C3]">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#A89080] block">Lucky Gemstone</span>
              <span className="text-sm font-bold text-[#3B2A1E]">{sign.luckyGemstone}</span>
              <span className="text-[11px] text-[#6E5545] block">Consult before wearing</span>
            </div>

            <div className="p-4 rounded-xl bg-[#FBF3E7]/70 border border-[#E8D8C3]">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#A89080] block">Favorable Days</span>
              <span className="text-sm font-bold text-[#3B2A1E]">{sign.luckyDays.join(", ")}</span>
              <span className="text-[11px] text-[#6E5545] block">Optimum for new ventures</span>
            </div>

            <div className="p-4 rounded-xl bg-[#FBF3E7]/70 border border-[#E8D8C3]">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#A89080] block">Lucky Colors</span>
              <span className="text-sm font-bold text-[#3B2A1E]">{sign.luckyColors.join(", ")}</span>
              <span className="text-[11px] text-[#6E5545] block">Aura harmonizers</span>
            </div>

            <div className="p-4 rounded-xl bg-[#FBF3E7]/70 border border-[#E8D8C3]">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#A89080] block">Lucky Numbers</span>
              <span className="text-sm font-bold text-[#3B2A1E]">{sign.luckyNumbers.join(", ")}</span>
              <span className="text-[11px] text-[#6E5545] block">Numerological synergy</span>
            </div>

            <div className="p-4 rounded-xl bg-[#FBF3E7]/70 border border-[#E8D8C3]">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#A89080] block">Ishta Devata</span>
              <span className="text-sm font-bold text-[#3B2A1E]">{sign.ishtaDeity}</span>
              <span className="text-[11px] text-[#6E5545] block">Spiritual protector</span>
            </div>
          </div>
        </section>

        {/* Personality Strengths & Weaknesses */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold font-temple text-[#7B2D26]">
            Personality, Demeanor &amp; Temperament
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-[#F5F7F2] border border-[#6B8E5A]/30 space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-[#2A4720]">
                <CheckCircle2 className="h-4 w-4 text-[#6B8E5A]" />
                Core Strengths &amp; Virtues
              </div>
              <ul className="space-y-2">
                {sign.personality.strengths.map((s, i) => (
                  <li key={i} className="text-xs sm:text-sm text-[#3B2A1E] flex items-start gap-2">
                    <span className="text-[#6B8E5A] font-bold">&bull;</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-[#FDF2F0] border border-[#C1662F]/30 space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-[#7B2D26]">
                <XCircle className="h-4 w-4 text-[#C1662F]" />
                Vulnerabilities &amp; Shadow Traits
              </div>
              <ul className="space-y-2">
                {sign.personality.weaknesses.map((w, i) => (
                  <li key={i} className="text-xs sm:text-sm text-[#3B2A1E] flex items-start gap-2">
                    <span className="text-[#C1662F] font-bold">&bull;</span>
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-[#6E5545] bg-[#FFFDF9] p-4 rounded-xl border border-[#E8D8C3]">
            {sign.personality.summary}
          </p>
        </section>

        {/* Love & Compatibility */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold font-temple text-[#7B2D26] flex items-center gap-2">
            <Heart className="h-5 w-5 text-[#C1662F]" />
            Love, Romance &amp; Relationship Compatibility
          </h2>
          <div className="bg-[#FFFDF9] p-6 rounded-2xl border border-[#E8D8C3] shadow-xs space-y-4">
            <p className="text-sm text-[#6E5545] leading-relaxed">
              {sign.loveCompatibility.summary}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#FBF3E7] border border-[#E8D8C3]">
                <span className="text-xs font-bold text-[#7B2D26] uppercase tracking-wider block mb-1">
                  Most Harmonious Signs
                </span>
                <p className="text-sm font-bold text-[#3B2A1E]">
                  {sign.loveCompatibility.bestMatches.join(", ")}
                </p>
                <p className="text-[11px] text-[#6E5545] mt-1">
                  Natural trine and elemental complement fostering emotional and spiritual ease.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#FDF2F0] border border-[#C1662F]/30">
                <span className="text-xs font-bold text-[#C1662F] uppercase tracking-wider block mb-1">
                  Challenging Placements
                </span>
                <p className="text-sm font-bold text-[#3B2A1E]">
                  {sign.loveCompatibility.challengingMatches.join(", ")}
                </p>
                <p className="text-[11px] text-[#6E5545] mt-1">
                  Requires deeper Ashtakoot Milan and D9 Navamsha synastry before commitment.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/love-calculator"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#7B2D26] hover:text-[#C1662F] transition-colors"
              >
                Test compatibility with our Free Love Calculator &rarr;
              </Link>
            </div>
          </div>
        </section>

        {/* Career & Wealth */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold font-temple text-[#7B2D26] flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-[#C1662F]" />
            Career, Prosperity &amp; Professional Life
          </h2>
          <div className="bg-[#FFFDF9] p-6 rounded-2xl border border-[#E8D8C3] shadow-xs space-y-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#A89080] block mb-1">
                Favorable Fields &amp; Callings
              </span>
              <div className="flex flex-wrap gap-2">
                {sign.careerAndWealth.idealCareers.map((c, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-lg bg-[#FBF3E7] border border-[#E8D8C3] text-xs font-semibold text-[#3B2A1E]"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#FBF3E7]/60 border border-[#E8D8C3]">
                <span className="text-xs font-bold text-[#7B2D26] block mb-1">Money &amp; Wealth Mindset</span>
                <p className="text-xs sm:text-sm text-[#6E5545] leading-relaxed">
                  {sign.careerAndWealth.moneyAttitude}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#FBF3E7]/60 border border-[#E8D8C3]">
                <span className="text-xs font-bold text-[#7B2D26] block mb-1">Workplace &amp; Leadership Style</span>
                <p className="text-xs sm:text-sm text-[#6E5545] leading-relaxed">
                  {sign.careerAndWealth.leadershipStyle}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Health & Vitality */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold font-temple text-[#7B2D26] flex items-center gap-2">
            <Activity className="h-5 w-5 text-[#C1662F]" />
            Health, Ayurveda &amp; Physical Vitality
          </h2>
          <div className="bg-[#FFFDF9] p-6 rounded-2xl border border-[#E8D8C3] shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#7B2D26]">
              <span>Governing Anatomical Areas:</span>
              <span className="text-[#3B2A1E] font-medium">{sign.healthAndVitality.rulingBodyParts}</span>
            </div>
            <p className="text-xs sm:text-sm text-[#6E5545] leading-relaxed">
              {sign.healthAndVitality.healthTips}
            </p>
          </div>
        </section>

        {/* Vedic vs Western Perspective */}
        <section className="p-6 rounded-2xl bg-[#FBF3E7] border border-[#E8D8C3] shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-base font-bold font-temple text-[#7B2D26]">
            <Compass className="h-5 w-5 text-[#C1662F]" />
            Vedic (Nirayana) vs Western (Sayana) Clarification
          </div>
          <p className="text-xs sm:text-sm text-[#6E5545] leading-relaxed">
            {sign.vedicVsWestern}
          </p>
        </section>

        {/* Sacred Mantra & Spiritual Remedy */}
        <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#7B2D26] to-[#591C17] text-[#FFFDF9] shadow-lg space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[#E8A33D] uppercase tracking-wider">
            <Sparkles className="h-4 w-4" />
            Sacred Planetary Beej Mantra
          </div>
          <div className="bg-[#FFFDF9]/10 border border-[#FFFDF9]/20 p-4 sm:p-5 rounded-2xl text-center">
            <p className="text-base sm:text-xl font-bold font-temple tracking-wide text-[#E8A33D]">
              {sign.sacredMantra}
            </p>
          </div>
          <p className="text-xs text-[#FBF3E7]/80 text-center max-w-xl mx-auto">
            Chant this divine mantra 108 times during sunrise on your auspicious day ({sign.luckyDays.join(", ")}) to strengthen your ruling planet and invite auspicious vibrations.
          </p>
        </section>

        {/* Direct Consultation Conversion Module */}
        <section className="bg-[#FFFDF9] border-2 border-[#C1662F]/40 rounded-3xl p-6 sm:p-8 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#C1662F] block">
              Confidential 1-on-1 Jyotish Consultation
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-temple text-[#7B2D26]">
              Have a Specific Life Dilemma?
            </h3>
            <p className="text-xs sm:text-sm text-[#6E5545] max-w-lg">
              Acharya Niraj Kumar analyzes your full D1 Lagna, D9 Navamsha, and current Mahadasha to recommend precise gemstone and Vedic remedial measures.
            </p>
          </div>

          <Link
            href="/consult"
            className="px-6 py-3.5 rounded-xl bg-[#7B2D26] hover:bg-[#63231E] text-[#FFFDF9] font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2 shrink-0"
          >
            <PhoneCall className="h-4 w-4" />
            Talk to Acharya Ji
          </Link>
        </section>

        {/* Back Link */}
        <div className="text-center pt-4">
          <Link
            href="/zodiac-signs"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#6E5545] hover:text-[#7B2D26] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to All 12 Zodiac Signs
          </Link>
        </div>
      </div>
    </div>
  );
}
