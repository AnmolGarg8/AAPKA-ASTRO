import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { ZODIAC_SIGNS_EVERGREEN } from "@/lib/astrology/zodiacHubData";
import { Sparkles, Compass, ShieldCheck, Flame, Mountain, Wind, Droplet, ArrowRight, Heart, Briefcase, PhoneCall } from "lucide-react";

export const metadata: Metadata = {
  title: "12 Vedic Zodiac Signs Guide | Rashi Characteristics, Compatibility & Remedies - Aapka Astro",
  description:
    "Comprehensive guide to all 12 Vedic Zodiac Signs (Rashis). Explore personality traits, love compatibility, career prospects, health vitality, and sacred planetary mantras.",
};

const ELEMENT_COLORS: Record<string, { bg: string; text: string; icon: any; border: string }> = {
  Fire: { bg: "bg-[#FDF2F0]", text: "text-[#C1662F]", icon: Flame, border: "border-[#C1662F]/30" },
  Earth: { bg: "bg-[#F5F7F2]", text: "text-[#6B8E5A]", icon: Mountain, border: "border-[#6B8E5A]/30" },
  Air: { bg: "bg-[#FFF9E6]", text: "text-[#E8A33D]", icon: Wind, border: "border-[#E8A33D]/30" },
  Water: { bg: "bg-[#F0F5FA]", text: "text-[#3B6E8C]", icon: Droplet, border: "border-[#3B6E8C]/30" },
};

export default function ZodiacSignsIndexPage() {
  return (
    <div className="min-h-screen bg-[#FFFDF9] py-12 px-4 sm:px-6 lg:px-8 text-[#3B2A1E]">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Hero Section */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7B2D26]/10 border border-[#7B2D26]/20 text-[#7B2D26] text-xs font-bold uppercase tracking-widest">
            <Sparkles className="h-3.5 w-3.5" />
            Vedic Astrology Encyclopedic Guide
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-temple text-[#7B2D26] leading-tight">
            The 12 Sacred Zodiac Signs
          </h1>
          <p className="text-base sm:text-lg text-[#6E5545] leading-relaxed">
            Discover the cosmic imprint of your celestial sign. In classical Parashari Vedic Jyotish, your Rashi (Moon Sign) and Lagna (Ascendant) reveal your soul’s blueprint, emotional nature, dharmic career, and destiny.
          </p>
        </header>

        {/* Quick Philosophy Banner */}
        <div className="p-6 rounded-2xl bg-[#FBF3E7] border border-[#E8D8C3] shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-bold text-[#7B2D26]">
              <Compass className="h-4 w-4" />
              <span>Nirayana (Sidereal) vs Sayana (Tropical) Precision</span>
            </div>
            <p className="text-xs sm:text-sm text-[#6E5545] max-w-2xl">
              Unlike popular Western horoscopes based on fixed calendar dates, Vedic astrology calculates exact planetary degrees using the Lahiri Ayanamsha. Explore in-depth characteristics, planetary lords, and divine remedies below.
            </p>
          </div>
          <Link
            href="/kundli-generator"
            className="shrink-0 px-5 py-2.5 rounded-xl bg-[#7B2D26] text-[#FFFDF9] font-bold text-xs uppercase tracking-wider hover:bg-[#63231E] transition-all shadow-md flex items-center gap-2"
          >
            Calculate My Rashi
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Zodiac Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ZODIAC_SIGNS_EVERGREEN.map((sign) => {
            const elem = ELEMENT_COLORS[sign.element] || ELEMENT_COLORS.Fire;
            const ElemIcon = elem.icon;

            return (
              <div
                key={sign.slug}
                className="group relative bg-[#FFFDF9] border border-[#E8D8C3] rounded-2xl p-6 shadow-xs hover:shadow-xl hover:border-[#C1662F]/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Row: Symbol, Glyph & Element */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-[#FBF3E7] border border-[#E8D8C3] flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                        {sign.glyph}
                      </div>
                      <div>
                        <h2 className="text-xl font-bold font-temple text-[#7B2D26] flex items-center gap-2">
                          {sign.name}
                        </h2>
                        <p className="text-xs font-medium text-[#C1662F]">{sign.vedicName}</p>
                      </div>
                    </div>

                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border ${elem.bg} ${elem.text} ${elem.border}`}
                    >
                      <ElemIcon className="h-3 w-3" />
                      {sign.element}
                    </span>
                  </div>

                  {/* Dates & Tagline */}
                  <div className="mb-4">
                    <p className="text-xs text-[#6E5545] font-semibold mb-1">
                      {sign.dateRange} &bull; <span className="text-[#3B2A1E] font-normal">{sign.symbol}</span>
                    </p>
                    <p className="text-xs text-[#7B2D26] italic font-medium">"{sign.tagline}"</p>
                  </div>

                  {/* Overview snippet */}
                  <p className="text-xs sm:text-sm text-[#6E5545] line-clamp-3 mb-5 leading-relaxed">
                    {sign.overview}
                  </p>

                  {/* Quick Meta Pills */}
                  <div className="grid grid-cols-2 gap-2 text-xs bg-[#FBF3E7]/60 p-3 rounded-xl border border-[#E8D8C3]/60 mb-5">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#A89080] block">Ruling Graha</span>
                      <span className="font-semibold text-[#3B2A1E]">{sign.rulingPlanet} ({sign.rulingGrahaHindi})</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#A89080] block">Lucky Gemstone</span>
                      <span className="font-semibold text-[#3B2A1E]">{sign.luckyGemstone}</span>
                    </div>
                  </div>
                </div>

                {/* Card Action Link */}
                <div className="pt-2 border-t border-[#E8D8C3]/50 flex items-center justify-between">
                  <Link
                    href={`/horoscope/${sign.slug}`}
                    className="text-xs font-semibold text-[#6E5545] hover:text-[#7B2D26] transition-colors"
                  >
                    Daily Transit &rarr;
                  </Link>
                  <Link
                    href={`/zodiac-signs/${sign.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7B2D26] group-hover:text-[#C1662F] transition-colors"
                  >
                    Read Full Profile
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Free Calculators & Tools Interlinking */}
        <section className="bg-[#FBF3E7] rounded-3xl p-8 border border-[#E8D8C3] shadow-sm space-y-6">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <h3 className="text-2xl font-bold font-temple text-[#7B2D26]">
              Explore Free Vedic Astrology Calculators
            </h3>
            <p className="text-xs sm:text-sm text-[#6E5545]">
              Instant, authentic calculation engines for relationship synergy, lunar placements, and cosmic destiny.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            <Link
              href="/love-calculator"
              className="p-3.5 rounded-xl bg-[#FFFDF9] border border-[#E8D8C3] text-center hover:border-[#C1662F] hover:shadow-md transition-all group"
            >
              <Heart className="h-5 w-5 text-[#C1662F] mx-auto mb-1.5 group-hover:scale-110 transition-transform" />
              <div className="text-xs font-bold text-[#7B2D26]">Love Calculator</div>
              <div className="text-[10px] text-[#A89080]">Harmony Score</div>
            </Link>

            <Link
              href="/moon-sign-calculator"
              className="p-3.5 rounded-xl bg-[#FFFDF9] border border-[#E8D8C3] text-center hover:border-[#C1662F] hover:shadow-md transition-all group"
            >
              <Compass className="h-5 w-5 text-[#3B6E8C] mx-auto mb-1.5 group-hover:scale-110 transition-transform" />
              <div className="text-xs font-bold text-[#7B2D26]">Moon Sign</div>
              <div className="text-[10px] text-[#A89080]">Vedic Rashi</div>
            </Link>

            <Link
              href="/sun-sign-calculator"
              className="p-3.5 rounded-xl bg-[#FFFDF9] border border-[#E8D8C3] text-center hover:border-[#C1662F] hover:shadow-md transition-all group"
            >
              <Sparkles className="h-5 w-5 text-[#E8A33D] mx-auto mb-1.5 group-hover:scale-110 transition-transform" />
              <div className="text-xs font-bold text-[#7B2D26]">Sun Sign</div>
              <div className="text-[10px] text-[#A89080]">Western Zodiac</div>
            </Link>

            <Link
              href="/flames-calculator"
              className="p-3.5 rounded-xl bg-[#FFFDF9] border border-[#E8D8C3] text-center hover:border-[#C1662F] hover:shadow-md transition-all group"
            >
              <Flame className="h-5 w-5 text-[#7B2D26] mx-auto mb-1.5 group-hover:scale-110 transition-transform" />
              <div className="text-xs font-bold text-[#7B2D26]">FLAMES</div>
              <div className="text-[10px] text-[#A89080]">Bond Affinity</div>
            </Link>

            <Link
              href="/numerology-calculator"
              className="p-3.5 rounded-xl bg-[#FFFDF9] border border-[#E8D8C3] text-center hover:border-[#C1662F] hover:shadow-md transition-all group col-span-2 sm:col-span-1"
            >
              <ShieldCheck className="h-5 w-5 text-[#6B8E5A] mx-auto mb-1.5 group-hover:scale-110 transition-transform" />
              <div className="text-xs font-bold text-[#7B2D26]">Numerology</div>
              <div className="text-[10px] text-[#A89080]">Life Path &amp; Destiny</div>
            </Link>
          </div>
        </section>

        {/* Personalized Consultation CTA */}
        <section className="bg-gradient-to-r from-[#7B2D26] to-[#63231E] rounded-3xl p-8 sm:p-10 text-[#FFFDF9] shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <span className="inline-block px-3 py-1 rounded-full bg-[#E8A33D]/20 border border-[#E8A33D]/30 text-[#E8A33D] text-[11px] font-bold uppercase tracking-wider">
              Personalized Kundli Analysis
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-temple leading-tight">
              General Sun Signs Only Scratch the Surface
            </h2>
            <p className="text-xs sm:text-sm text-[#FBF3E7]/80 leading-relaxed">
              Real predictions require analyzing all 9 planetary positions, 12 Bhavas, and running Vimshottari Mahadashas. Speak directly with Acharya Niraj Kumar for precise remedies and guidance.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/consult"
              className="px-6 py-3 rounded-xl bg-[#E8A33D] text-[#3B2A1E] font-bold text-xs uppercase tracking-wider hover:bg-[#d6922e] transition-all shadow-lg text-center flex items-center justify-center gap-2"
            >
              <PhoneCall className="h-4 w-4" />
              Consult Acharya Ji Live
            </Link>
            <Link
              href="/kundli-generator"
              className="px-6 py-3 rounded-xl bg-transparent border border-[#FBF3E7]/40 text-[#FFFDF9] font-bold text-xs uppercase tracking-wider hover:bg-[#FFFDF9]/10 transition-all text-center"
            >
              Generate Full Kundli
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
