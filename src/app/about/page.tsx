"use client";

import React from "react";
import Link from "next/link";
import { PLACEHOLDER_ASTROLOGER, ADMIN_CONFIGURABLE_PRICING } from "@/config/placeholderContent";
import { MandalaDivider } from "@/components/ui/MandalaDivider";
import { DiyaIcon } from "@/components/ui/DiyaIcon";
import {
  ShieldCheck,
  Award,
  Sparkles,
  BookOpen,
  Users,
  Compass,
  HeartHandshake,
  PhoneCall,
  CheckCircle2,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-[#FBF3E7] text-[#3B2A1E]">
      {/* 1. Header Banner */}
      <section className="relative overflow-hidden border-b border-[#E8D8C3] bg-[#7B2D26] py-16 sm:py-24 text-[#FBF3E7]">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E8A33D]/30 bg-[#64221C] px-4 py-1 text-xs font-bold text-[#E8A33D] mb-4">
            <DiyaIcon size={14} />
            <span>AUTHENTIC VEDIC LINEAGE</span>
          </div>

          <h1 className="font-temple text-3xl sm:text-5xl font-bold tracking-tight text-[#FBF3E7]">
            Meet {PLACEHOLDER_ASTROLOGER.displayName}
          </h1>

          <p className="mt-4 text-base sm:text-lg text-[#FBF3E7]/80 max-w-2xl mx-auto font-body">
            {PLACEHOLDER_ASTROLOGER.tagline}
          </p>
        </div>
      </section>

      {/* 2. Biography & Sacred Approach */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Image & Badges */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-md overflow-hidden rounded-3xl border-4 border-[#E8D8C3] bg-[#FFFDF9] shadow-xl">
                <img
                  src={PLACEHOLDER_ASTROLOGER.avatarUrl}
                  alt={PLACEHOLDER_ASTROLOGER.displayName}
                  className="w-full h-[450px] object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#3B2A1E]/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white text-center">
                  <div className="font-temple text-2xl font-bold text-[#E8A33D]">
                    {PLACEHOLDER_ASTROLOGER.displayName}
                  </div>
                  <p className="text-xs text-white/90 mt-1">
                    Vedic Jyotish, Vastu Vidya &amp; Ratna Chikitsa
                  </p>
                </div>
              </div>

              {/* Quick Trust Highlights */}
              <div className="mt-6 grid grid-cols-2 gap-3 w-full max-w-md">
                <div className="rounded-2xl border border-[#E8D8C3] bg-[#FFFDF9] p-4 text-center">
                  <div className="text-2xl font-black text-[#7B2D26]">26,000+</div>
                  <div className="text-xs text-[#6E5545] font-medium mt-0.5">Trusted Seekers</div>
                </div>
                <div className="rounded-2xl border border-[#E8D8C3] bg-[#FFFDF9] p-4 text-center">
                  <div className="text-2xl font-black text-[#7B2D26]">10,000+</div>
                  <div className="text-xs text-[#6E5545] font-medium mt-0.5">Kundlis Analyzed</div>
                </div>
              </div>
            </div>

            {/* Right Detailed Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C1662F]">
                <Sparkles className="h-4 w-4" />
                <span>Sacred Lineage &amp; Philosophy</span>
              </div>

              <h2 className="font-temple text-2xl sm:text-4xl font-bold text-[#7B2D26] leading-snug">
                Astrology is Not Fear-Mongering — It is Cosmic Illumination.
              </h2>

              {/* PLACEHOLDER: replace with real content */}
              <p className="text-sm sm:text-base text-[#3B2A1E]/90 leading-relaxed font-body">
                {PLACEHOLDER_ASTROLOGER.bio}
              </p>

              <p className="text-sm sm:text-base text-[#3B2A1E]/80 leading-relaxed">
                Born and initiated into the sacred traditions of Kashi (Varanasi), Acharya Ji has dedicated life to peeling back superstitious misinterpretations of Jyotish. Every consultation is grounded in the foundational classics: <em>Brihat Parashara Hora Shastra</em>, <em>Jaimini Upadesha Sutras</em>, and <em>Mayamatam Vastu Vidya</em>.
              </p>

              <div className="pt-4 border-t border-[#E8D8C3] space-y-3">
                <h3 className="font-temple text-lg font-bold text-[#7B2D26]">
                  The 4 Pillars of Our Practice:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-[#3B2A1E]">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-[#6B8E5A] shrink-0 mt-0.5" />
                    <span><strong>100% Direct:</strong> You speak with Acharya Ji, never an untrained junior or AI bot.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-[#6B8E5A] shrink-0 mt-0.5" />
                    <span><strong>Zero Fear Tactics:</strong> No invented curses or extortionate poojas.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-[#6B8E5A] shrink-0 mt-0.5" />
                    <span><strong>Actionable Remedies:</strong> Mantras, lifestyle timings, and verified natural stones.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-[#6B8E5A] shrink-0 mt-0.5" />
                    <span><strong>Absolute Confidentiality:</strong> Your birth chart and personal life stay protected.</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 flex flex-wrap items-center gap-4">
                <Link
                  href="/consult"
                  className="flex items-center gap-2 rounded-xl bg-[#7B2D26] px-6 py-3.5 text-xs sm:text-sm font-bold text-[#FBF3E7] hover:bg-[#96372E] transition-all shadow-md"
                >
                  <PhoneCall className="h-4 w-4 text-[#E8A33D]" />
                  <span>Consult Acharya Ji (From ₹{ADMIN_CONFIGURABLE_PRICING.chat.ratePerMinute}/min)</span>
                </Link>
                <Link
                  href="/services"
                  className="rounded-xl border border-[#7B2D26] px-6 py-3.5 text-xs sm:text-sm font-bold text-[#7B2D26] hover:bg-[#FBF3E7] transition-all"
                >
                  Explore All Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Divider */}
      <div className="text-center py-4">
        <MandalaDivider opacity={0.3} />
      </div>
    </div>
  );
}
