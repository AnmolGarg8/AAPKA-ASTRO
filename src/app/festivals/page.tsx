"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FESTIVALS_2026,
  getFestivalsByMonth,
  getFestivalsByCategory,
  HinduFestival,
} from "@/lib/astrology/festivalService";
import {
  Calendar,
  Sparkles,
  Clock,
  Flame,
  Moon,
  Sun,
  ShieldCheck,
  ChevronRight,
  PhoneCall,
  Search,
  Filter,
} from "lucide-react";
import { DiyaIcon } from "@/components/ui/DiyaIcon";

const MONTHS = [
  { num: 0, label: "All Months" },
  { num: 1, label: "Jan" },
  { num: 2, label: "Feb" },
  { num: 3, label: "Mar" },
  { num: 4, label: "Apr" },
  { num: 5, label: "May" },
  { num: 6, label: "Jun" },
  { num: 7, label: "Jul" },
  { num: 8, label: "Aug" },
  { num: 9, label: "Sep" },
  { num: 10, label: "Oct" },
  { num: 11, label: "Nov" },
  { num: 12, label: "Dec" },
];

const CATEGORIES = [
  "All Categories",
  "Major Festival",
  "Ekadashi",
  "Pradosh",
  "Purnima & Amavasya",
  "Sankranti",
] as const;

export default function FestivalCalendarPage() {
  const [selectedMonth, setSelectedMonth] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("All Categories");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Filter festivals dynamically
  const filteredFestivals = FESTIVALS_2026.filter((fest) => {
    // Month filter
    if (selectedMonth !== 0) {
      const festMonth = parseInt(fest.date.split("-")[1], 10);
      if (festMonth !== selectedMonth) return false;
    }

    // Category filter
    if (selectedCategory !== "All Categories") {
      if (fest.category !== selectedCategory) return false;
    }

    // Search query
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      const matchName = fest.name.toLowerCase().includes(q);
      const matchHindi = fest.nameHindi.toLowerCase().includes(q);
      const matchTithi = fest.tithi.toLowerCase().includes(q);
      const matchDeity = fest.deity.toLowerCase().includes(q);
      if (!matchName && !matchHindi && !matchTithi && !matchDeity) return false;
    }

    return true;
  });

  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case "Major Festival":
        return "bg-[#7B2D26]/10 text-[#7B2D26] border-[#7B2D26]/20";
      case "Ekadashi":
        return "bg-[#3B6E8C]/10 text-[#3B6E8C] border-[#3B6E8C]/20";
      case "Pradosh":
        return "bg-[#6B8E5A]/10 text-[#2A4720] border-[#6B8E5A]/20";
      case "Sankranti":
        return "bg-[#E8A33D]/10 text-[#7B2D26] border-[#E8A33D]/30";
      default:
        return "bg-[#C1662F]/10 text-[#C1662F] border-[#C1662F]/20";
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] py-12 px-4 sm:px-6 lg:px-8 text-[#3B2A1E]">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Header Banner */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7B2D26]/10 border border-[#7B2D26]/20 text-[#7B2D26] text-xs font-bold uppercase tracking-widest">
            <DiyaIcon className="h-4 w-4" />
            Vedic Panchang Astronomical Engine
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-temple text-[#7B2D26] leading-tight">
            Hindu Festival &amp; Vrat Calendar 2026
          </h1>
          <p className="text-sm sm:text-base text-[#6E5545] leading-relaxed">
            Authentic celestial calendar computed using classical lunar Tithis, Surya Sankrantis, and Nishita Kaal muhurats. Never miss an auspicious fasting day or divine celebration.
          </p>
        </header>

        {/* Filters & Search Control Bar */}
        <div className="bg-[#FBF3E7] rounded-2xl p-5 border border-[#E8D8C3] shadow-xs space-y-4">
          {/* Month Selector Pills */}
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#A89080] block mb-2">
              Select Month
            </span>
            <div className="flex flex-wrap gap-1.5">
              {MONTHS.map((m) => (
                <button
                  key={m.num}
                  type="button"
                  onClick={() => setSelectedMonth(m.num)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedMonth === m.num
                      ? "bg-[#7B2D26] text-[#FFFDF9] shadow-xs"
                      : "bg-[#FFFDF9] text-[#6E5545] border border-[#E8D8C3] hover:border-[#C1662F]"
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Category & Search Row */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pt-2 border-t border-[#E8D8C3]/60">
            {/* Category Pills */}
            <div className="flex flex-wrap gap-1.5 items-center">
              <span className="text-xs font-bold text-[#7B2D26] flex items-center gap-1 mr-1">
                <Filter className="h-3.5 w-3.5" />
                Filter:
              </span>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
                    selectedCategory === cat
                      ? "bg-[#C1662F] text-[#FFFDF9]"
                      : "bg-[#FFFDF9] text-[#6E5545] border border-[#E8D8C3] hover:border-[#C1662F]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[220px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#A89080]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search festival, tithi, deity..."
                className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-[#FFFDF9] border border-[#E8D8C3] text-xs text-[#3B2A1E] focus:outline-hidden focus:border-[#7B2D26]"
              />
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-[#6E5545] px-1">
          <span>
            Showing <strong className="text-[#7B2D26]">{filteredFestivals.length}</strong> festivals &amp; auspicious dates
          </span>
          <Link
            href="/panchang"
            className="font-bold text-[#7B2D26] hover:text-[#C1662F] flex items-center gap-1"
          >
            Open Live Daily Panchang &rarr;
          </Link>
        </div>

        {/* Festivals List */}
        {filteredFestivals.length === 0 ? (
          <div className="bg-[#FFFDF9] border border-[#E8D8C3] rounded-2xl p-12 text-center space-y-3">
            <DiyaIcon className="h-8 w-8 text-[#A89080] mx-auto opacity-50" />
            <h3 className="text-base font-bold text-[#7B2D26]">No Festivals Found</h3>
            <p className="text-xs text-[#6E5545]">
              No events matched your current month or search criteria. Try selecting "All Months" or resetting filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedMonth(0);
                setSelectedCategory("All Categories");
                setSearchQuery("");
              }}
              className="px-4 py-2 rounded-lg bg-[#7B2D26] text-[#FFFDF9] text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredFestivals.map((fest) => {
              const [y, m, d] = fest.date.split("-");
              const dateObj = new Date(parseInt(y), parseInt(m) - 1, parseInt(d));
              const monthName = dateObj.toLocaleString("en-US", { month: "short" });

              return (
                <div
                  key={fest.id}
                  className="bg-[#FFFDF9] border border-[#E8D8C3] rounded-2xl p-5 shadow-xs hover:shadow-md hover:border-[#C1662F]/50 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    {/* Top Row: Date Pill & Category Badge */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-[#FBF3E7] border border-[#E8D8C3] flex flex-col items-center justify-center text-center">
                          <span className="text-[10px] uppercase font-bold text-[#C1662F] leading-none">
                            {monthName}
                          </span>
                          <span className="text-lg font-bold font-temple text-[#7B2D26] leading-tight">
                            {d}
                          </span>
                        </div>
                        <div>
                          <span className="text-xs font-semibold text-[#6E5545]">{fest.dayOfWeek}</span>
                          <div className="text-[11px] text-[#A89080]">
                            {fest.lunarMonth} &bull; {fest.paksha} Paksha
                          </div>
                        </div>
                      </div>

                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${getCategoryBadgeClass(
                          fest.category
                        )}`}
                      >
                        {fest.category}
                      </span>
                    </div>

                    {/* Festival Name & Deity */}
                    <div>
                      <h2 className="text-lg font-bold font-temple text-[#7B2D26] leading-snug">
                        {fest.name}
                      </h2>
                      <div className="text-xs font-medium text-[#C1662F]">
                        {fest.nameHindi} &bull; <span className="text-[#6E5545]">{fest.tithi} Tithi</span>
                      </div>
                    </div>

                    {/* Significance */}
                    <p className="text-xs text-[#6E5545] leading-relaxed line-clamp-2">
                      {fest.significance}
                    </p>

                    {/* Muhurat highlight */}
                    {fest.pujaMuhurat && (
                      <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#FBF3E7] border border-[#E8D8C3] text-xs text-[#7B2D26] font-semibold">
                        <Clock className="h-3.5 w-3.5 text-[#C1662F] shrink-0" />
                        <span>{fest.pujaMuhurat}</span>
                      </div>
                    )}

                    {/* Rituals Pill List */}
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold text-[#A89080]">Sacred Rituals</span>
                      <ul className="space-y-1">
                        {fest.rituals.slice(0, 2).map((r, i) => (
                          <li key={i} className="text-[11px] text-[#3B2A1E] flex items-start gap-1.5">
                            <span className="text-[#C1662F] font-bold">&bull;</span>
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Bottom Action Footer */}
                  <div className="mt-4 pt-3 border-t border-[#E8D8C3]/50 flex items-center justify-between">
                    <span className="text-[11px] font-medium text-[#A89080]">
                      Deity: <strong className="text-[#3B2A1E]">{fest.deity}</strong>
                    </span>

                    <Link
                      href="/consult"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7B2D26] hover:text-[#C1662F] transition-colors"
                    >
                      Book Festival Puja
                      <ChevronRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Astrological Muhurat Guidance CTA */}
        <section className="bg-gradient-to-r from-[#7B2D26] to-[#63231E] rounded-3xl p-8 sm:p-10 text-[#FFFDF9] shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <span className="inline-block px-3 py-1 rounded-full bg-[#E8A33D]/20 border border-[#E8A33D]/30 text-[#E8A33D] text-[11px] font-bold uppercase tracking-wider">
              Muhurat &amp; Sankalpa Consulting
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-temple leading-tight">
              Performing a Special Puja or Vrat?
            </h2>
            <p className="text-xs sm:text-sm text-[#FBF3E7]/80 leading-relaxed">
              Ascertain your personalized auspicious Choghadiya and Shubh Muhurat tailored to your exact birth chart and Gotra with Acharya Niraj Kumar.
            </p>
          </div>

          <Link
            href="/consult"
            className="px-6 py-3.5 rounded-xl bg-[#E8A33D] text-[#3B2A1E] font-bold text-xs uppercase tracking-wider hover:bg-[#d6922e] transition-all shadow-lg text-center flex items-center justify-center gap-2 shrink-0"
          >
            <PhoneCall className="h-4 w-4" />
            Talk to Acharya Ji
          </Link>
        </section>
      </div>
    </div>
  );
}
