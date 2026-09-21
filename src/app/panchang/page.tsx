"use client";

import React, { useState } from "react";
import Link from "next/link";
import { getPanchangForCity, CITIES_LIST } from "@/lib/store/panchangStore";
import { MandalaDivider } from "@/components/ui/MandalaDivider";
import { DiyaIcon } from "@/components/ui/DiyaIcon";
import {
  Sun,
  Moon,
  Clock,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Compass,
  MapPin,
  PhoneCall,
} from "lucide-react";

export default function PanchangPage() {
  const [selectedCity, setSelectedCity] = useState("delhi");
  const panchang = getPanchangForCity(selectedCity);

  return (
    <div className="bg-[#FBF3E7] text-[#3B2A1E]">
      {/* 1. Header Banner */}
      <section className="border-b border-[#E8D8C3] bg-[#7B2D26] py-16 sm:py-20 text-[#FBF3E7]">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E8A33D]/30 bg-[#64221C] px-4 py-1 text-xs font-bold text-[#E8A33D] mb-4">
            <DiyaIcon size={14} />
            <span>DAINIK VEDIC KALANIRNAYA</span>
          </div>

          <h1 className="font-temple text-3xl sm:text-5xl font-bold tracking-tight text-[#FBF3E7]">
            Daily Hindu Panchang &amp; Shubh Muhurat
          </h1>

          <p className="mt-3 text-sm sm:text-base text-[#FBF3E7]/80 max-w-2xl mx-auto font-body">
            {panchang.date} • {panchang.samvat}
          </p>

          {/* City Selection */}
          <div className="mt-6 inline-flex items-center gap-3 rounded-2xl bg-[#FFFDF9] px-4 py-2 text-xs font-bold text-[#3B2A1E] shadow-md">
            <MapPin className="h-4 w-4 text-[#C1662F]" />
            <span>Select Location:</span>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="bg-transparent font-bold text-[#7B2D26] focus:outline-none cursor-pointer"
            >
              {CITIES_LIST.map((city) => (
                <option key={city.id} value={city.id} className="text-[#3B2A1E]">
                  {city.name} ({city.state})
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* 2. Main Panchang Content */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-10">
          {/* Quick Astronomical Summary Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="rounded-2xl border border-[#E8D8C3] bg-[#FFFDF9] p-5 shadow-sm text-center">
              <Sun className="h-6 w-6 text-[#E8A33D] mx-auto mb-2" />
              <div className="text-[11px] font-bold text-[#6E5545] uppercase">Surya Uday (Sunrise)</div>
              <div className="mt-1 font-mono text-lg font-black text-[#7B2D26]">
                {panchang.sunTimes.sunrise}
              </div>
            </div>

            <div className="rounded-2xl border border-[#E8D8C3] bg-[#FFFDF9] p-5 shadow-sm text-center">
              <Sun className="h-6 w-6 text-[#C1662F] mx-auto mb-2" />
              <div className="text-[11px] font-bold text-[#6E5545] uppercase">Surya Ast (Sunset)</div>
              <div className="mt-1 font-mono text-lg font-black text-[#7B2D26]">
                {panchang.sunTimes.sunset}
              </div>
            </div>

            <div className="rounded-2xl border border-[#E8D8C3] bg-[#FFFDF9] p-5 shadow-sm text-center">
              <Moon className="h-6 w-6 text-[#7B2D26] mx-auto mb-2" />
              <div className="text-[11px] font-bold text-[#6E5545] uppercase">Chandra Uday (Moonrise)</div>
              <div className="mt-1 font-mono text-lg font-black text-[#7B2D26]">
                {panchang.moonTimes.moonrise}
              </div>
            </div>

            <div className="rounded-2xl border border-[#E8D8C3] bg-[#FFFDF9] p-5 shadow-sm text-center">
              <Compass className="h-6 w-6 text-[#6B8E5A] mx-auto mb-2" />
              <div className="text-[11px] font-bold text-[#6E5545] uppercase">Chandra Rashi (Moon Sign)</div>
              <div className="mt-1 text-xs font-bold text-[#3B2A1E]">
                {panchang.moonTimes.moonSign.split(" ")[0]}
              </div>
            </div>
          </div>

          {/* The 5 Limbs (Pancha Anga) Detailed Table */}
          <div className="rounded-3xl border border-[#E8D8C3] bg-[#FFFDF9] p-6 sm:p-10 shadow-sm">
            <h2 className="font-temple text-2xl font-bold text-[#7B2D26] mb-6 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-[#E8A33D]" />
              <span>The Five Sacred Limbs (पंच-अंग)</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Tithi */}
              <div className="rounded-2xl border border-[#E8D8C3] bg-[#FBF3E7] p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#C1662F]">
                    1. Tithi (तिथी)
                  </span>
                  <span className="rounded bg-[#7B2D26]/10 px-2 py-0.5 text-[11px] font-bold text-[#7B2D26]">
                    {panchang.tithi.paksha}
                  </span>
                </div>
                <div className="mt-2 font-temple text-xl font-bold text-[#7B2D26]">
                  {panchang.tithi.name}
                </div>
                <p className="mt-1 text-xs text-[#6E5545]">
                  Active until <strong>{panchang.tithi.endsAt}</strong>. Followed by {panchang.tithi.nextTithi}.
                </p>
              </div>

              {/* Nakshatra */}
              <div className="rounded-2xl border border-[#E8D8C3] bg-[#FBF3E7] p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#C1662F]">
                    2. Nakshatra (नक्षत्र)
                  </span>
                  <span className="rounded bg-[#7B2D26]/10 px-2 py-0.5 text-[11px] font-bold text-[#7B2D26]">
                    Pada {panchang.nakshatra.pada}
                  </span>
                </div>
                <div className="mt-2 font-temple text-xl font-bold text-[#7B2D26]">
                  {panchang.nakshatra.name}
                </div>
                <p className="mt-1 text-xs text-[#6E5545]">
                  Governing Lord: <strong>{panchang.nakshatra.lord}</strong>. Active till {panchang.nakshatra.endsAt}.
                </p>
              </div>

              {/* Yoga */}
              <div className="rounded-2xl border border-[#E8D8C3] bg-[#FBF3E7] p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#C1662F]">
                    3. Yoga (योग)
                  </span>
                  <span className="text-xs text-[#6E5545]">Harmonious Energy</span>
                </div>
                <div className="mt-2 font-temple text-xl font-bold text-[#7B2D26]">
                  {panchang.yoga.name}
                </div>
                <p className="mt-1 text-xs text-[#6E5545]">
                  Active till <strong>{panchang.yoga.endsAt}</strong>. Highly suitable for satvik tasks.
                </p>
              </div>

              {/* Karana & Vaar */}
              <div className="rounded-2xl border border-[#E8D8C3] bg-[#FBF3E7] p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#C1662F]">
                    4 &amp; 5. Karana &amp; Vaar (करण एवं वार)
                  </span>
                  <span className="text-xs text-[#6E5545]">Solar Day</span>
                </div>
                <div className="mt-2 font-temple text-xl font-bold text-[#7B2D26]">
                  {panchang.karana.name} • {panchang.vaar.split(" ")[0]}
                </div>
                <p className="mt-1 text-xs text-[#6E5545]">
                  Karana active till <strong>{panchang.karana.endsAt}</strong>.
                </p>
              </div>
            </div>
          </div>

          {/* Muhurat Windows: Shubh vs Ashubh */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Auspicious Muhurats */}
            <div className="rounded-3xl border border-[#6B8E5A]/40 bg-[#F4F9F2] p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-bold text-[#2A4720] mb-4">
                <CheckCircle2 className="h-5 w-5 text-[#6B8E5A]" />
                <span>Auspicious Timings (शुभ मुहूर्त)</span>
              </div>
              <p className="text-xs text-[#4F6D40] mb-4">
                Ideal for starting new ventures, signing agreements, buying assets, and performing spiritual rituals.
              </p>

              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-xl bg-white/80 p-3 border border-[#6B8E5A]/20">
                  <span className="text-xs font-bold text-[#2A4720]">Abhijit Muhurat:</span>
                  <span className="font-mono text-xs font-black text-[#2A4720]">
                    {panchang.auspiciousTimings.abhijitMuhurat}
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-white/80 p-3 border border-[#6B8E5A]/20">
                  <span className="text-xs font-bold text-[#2A4720]">Amrit Kaal:</span>
                  <span className="font-mono text-xs font-black text-[#2A4720]">
                    {panchang.auspiciousTimings.amritKaal}
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-white/80 p-3 border border-[#6B8E5A]/20">
                  <span className="text-xs font-bold text-[#2A4720]">Brahma Muhurat:</span>
                  <span className="font-mono text-xs font-black text-[#2A4720]">
                    {panchang.auspiciousTimings.brahmaMuhurat}
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-white/80 p-3 border border-[#6B8E5A]/20">
                  <span className="text-xs font-bold text-[#2A4720]">Vijaya Muhurat:</span>
                  <span className="font-mono text-xs font-black text-[#2A4720]">
                    {panchang.auspiciousTimings.vijayaMuhurat}
                  </span>
                </div>
              </div>
            </div>

            {/* Inauspicious Muhurats */}
            <div className="rounded-3xl border border-[#B33927]/30 bg-[#FDF2F0] p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-bold text-[#8C2010] mb-4">
                <AlertTriangle className="h-5 w-5 text-[#B33927]" />
                <span>Inauspicious Timings (अशुभ काल - Varjya)</span>
              </div>
              <p className="text-xs text-[#A63828] mb-4">
                Refrain from inaugurations, heavy financial transactions, and travelling during these windows.
              </p>

              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-xl bg-white/80 p-3 border border-[#B33927]/20">
                  <span className="text-xs font-bold text-[#8C2010]">Rahu Kaal:</span>
                  <span className="font-mono text-xs font-black text-[#8C2010]">
                    {panchang.inauspiciousTimings.rahuKaal}
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-white/80 p-3 border border-[#B33927]/20">
                  <span className="text-xs font-bold text-[#8C2010]">Yamaganda:</span>
                  <span className="font-mono text-xs font-black text-[#8C2010]">
                    {panchang.inauspiciousTimings.yamaganda}
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-white/80 p-3 border border-[#B33927]/20">
                  <span className="text-xs font-bold text-[#8C2010]">Gulika Kaal:</span>
                  <span className="font-mono text-xs font-black text-[#8C2010]">
                    {panchang.inauspiciousTimings.gulikaKaal}
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-white/80 p-3 border border-[#B33927]/20">
                  <span className="text-xs font-bold text-[#8C2010]">Dur Muhurat:</span>
                  <span className="font-mono text-xs font-black text-[#8C2010]">
                    {panchang.inauspiciousTimings.durMuhurat}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Daily Advice & Consultation Trigger */}
          <div className="rounded-3xl border border-[#E8D8C3] bg-[#FFFDF9] p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#C1662F]">
                Cosmic Guidance for Today
              </span>
              <h3 className="font-temple text-xl font-bold text-[#7B2D26]">
                {panchang.specialSignificance}
              </h3>
              <p className="text-xs text-[#6E5545]">
                Have a specific personal or business decision to execute today? Check your customized Muhurat.
              </p>
            </div>

            <Link
              href="/consult"
              className="shrink-0 flex items-center gap-2 rounded-xl bg-[#7B2D26] px-6 py-3.5 text-xs sm:text-sm font-bold text-[#FBF3E7] hover:bg-[#96372E] transition-all shadow-md"
            >
              <PhoneCall className="h-4 w-4 text-[#E8A33D]" />
              <span>Ask for Muhurat Advice</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
