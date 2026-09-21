"use client";

import React, { useState } from "react";
import Link from "next/link";
import { getPanchangForCity, CITIES_LIST } from "@/lib/store/panchangStore";
import { Sun, Moon, Sparkles, Compass, Clock, ArrowRight } from "lucide-react";
import { MandalaDivider } from "@/components/ui/MandalaDivider";

export const PanchangWidget: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState("delhi");
  const panchang = getPanchangForCity(selectedCity);

  return (
    <section className="relative bg-[#FFFDF9] py-16 px-4 sm:px-6 lg:px-8 border-b border-[#E8D8C3]">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#C1662F]/30 bg-[#FBF3E7] px-3.5 py-1 text-xs font-bold text-[#7B2D26]">
              <Sparkles className="h-3.5 w-3.5 text-[#E8A33D]" />
              <span>DAINIK VEDIC PANCHANG</span>
            </div>
            <h2 className="mt-2 font-temple text-2xl sm:text-3xl font-bold text-[#7B2D26]">
              Today&apos;s Cosmic Alignment &amp; Auspicious Muhurats
            </h2>
            <p className="mt-1 text-sm text-[#6E5545]">
              {panchang.date} • {panchang.samvat}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <label htmlFor="panchang-city" className="text-xs font-bold text-[#3B2A1E]">
              Location:
            </label>
            <select
              id="panchang-city"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="rounded-lg border border-[#E8D8C3] bg-[#FBF3E7] px-3 py-1.5 text-xs font-bold text-[#7B2D26] focus:outline-none focus:ring-2 focus:ring-[#7B2D26]"
            >
              {CITIES_LIST.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>

            <Link
              href="/panchang"
              className="inline-flex items-center gap-1 text-xs font-bold text-[#C1662F] hover:text-[#7B2D26] hover:underline"
            >
              <span>Full Panchang</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Panchang Grid Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {/* Tithi */}
          <div className="rounded-xl border border-[#E8D8C3] bg-[#FBF3E7] p-3.5 shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#C1662F]">Tithi</span>
            <div className="mt-1 font-temple text-base font-bold text-[#7B2D26] truncate">
              {panchang.tithi.name}
            </div>
            <p className="text-[11px] text-[#6E5545]">{panchang.tithi.paksha}</p>
            <span className="mt-2 block text-[10px] text-[#3B2A1E]/70">Till {panchang.tithi.endsAt}</span>
          </div>

          {/* Nakshatra */}
          <div className="rounded-xl border border-[#E8D8C3] bg-[#FBF3E7] p-3.5 shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#C1662F]">Nakshatra</span>
            <div className="mt-1 font-temple text-base font-bold text-[#7B2D26] truncate">
              {panchang.nakshatra.name}
            </div>
            <p className="text-[11px] text-[#6E5545]">Lord: {panchang.nakshatra.lord}</p>
            <span className="mt-2 block text-[10px] text-[#3B2A1E]/70">Till {panchang.nakshatra.endsAt}</span>
          </div>

          {/* Yoga */}
          <div className="rounded-xl border border-[#E8D8C3] bg-[#FBF3E7] p-3.5 shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#C1662F]">Yoga</span>
            <div className="mt-1 font-temple text-base font-bold text-[#7B2D26] truncate">
              {panchang.yoga.name}
            </div>
            <p className="text-[11px] text-[#6E5545]">Auspicious Union</p>
            <span className="mt-2 block text-[10px] text-[#3B2A1E]/70">Till {panchang.yoga.endsAt}</span>
          </div>

          {/* Sun Times */}
          <div className="rounded-xl border border-[#E8D8C3] bg-[#FBF3E7] p-3.5 shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#C1662F] flex items-center gap-1">
              <Sun className="h-3 w-3 text-[#E8A33D]" />
              Surya Uday / Ast
            </span>
            <div className="mt-1 text-xs font-bold text-[#7B2D26]">
              {panchang.sunTimes.sunrise}
            </div>
            <p className="text-[11px] text-[#6E5545]">Sunset: {panchang.sunTimes.sunset}</p>
          </div>

          {/* Abhijit Muhurat */}
          <div className="rounded-xl border border-[#6B8E5A]/40 bg-[#F4F9F2] p-3.5 shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B8E5A] flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Abhijit Muhurat
            </span>
            <div className="mt-1 text-xs font-bold text-[#2A4720]">
              {panchang.auspiciousTimings.abhijitMuhurat}
            </div>
            <p className="text-[10px] text-[#4F6D40]">Most Shubh Window</p>
          </div>

          {/* Rahu Kaal */}
          <div className="rounded-xl border border-[#B33927]/30 bg-[#FDF2F0] p-3.5 shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#B33927]">
              Rahu Kaal (Avoid)
            </span>
            <div className="mt-1 text-xs font-bold text-[#8C2010]">
              {panchang.inauspiciousTimings.rahuKaal.split(" ")[0]} – {panchang.inauspiciousTimings.rahuKaal.split(" ")[2]}
            </div>
            <p className="text-[10px] text-[#A63828]">Avoid New Starts</p>
          </div>
        </div>

        {/* Significance banner */}
        <div className="mt-4 rounded-xl border border-[#E8A33D]/40 bg-[#FBF3E7] p-3 flex items-center justify-between gap-3 text-xs text-[#3B2A1E]">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[#E8A33D] shrink-0" />
            <span>
              <strong>Vedic Guidance:</strong> {panchang.specialSignificance}
            </span>
          </div>
          <Link
            href="/consult"
            className="shrink-0 font-bold text-[#7B2D26] hover:underline"
          >
            Ask Acharya Ji &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
};
