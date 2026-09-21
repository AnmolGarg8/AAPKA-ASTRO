"use client";

import React, { useState } from "react";
import Link from "next/link";
import { calculateGunMilan } from "@/lib/astrology/gunMilan";
import { GunMilanResult } from "@/lib/astrology/types";
import { INDIAN_CITIES } from "@/lib/astrology/indianCities";
import {
  HeartHandshake,
  PhoneCall,
  AlertTriangle,
  Heart,
  User,
} from "lucide-react";
import { PLACEHOLDER_ASTROLOGER } from "@/config/placeholderContent";

export default function KundliMatchingPage() {
  // Boy State
  const [boyName, setBoyName] = useState("Aarav Sharma");
  const [boyDate, setBoyDate] = useState("1995-10-24");
  const [boyTime, setBoyTime] = useState("14:35");
  const [boyCity, setBoyCity] = useState("New Delhi");

  // Girl State
  const [girlName, setGirlName] = useState("Meera Kapoor");
  const [girlDate, setGirlDate] = useState("1997-04-12");
  const [girlTime, setGirlTime] = useState("09:15");
  const [girlCity, setGirlCity] = useState("Jaipur");

  // Calculation Result
  const [result, setResult] = useState<GunMilanResult>(() =>
    calculateGunMilan(
      {
        name: "Aarav Sharma",
        birthDate: "1995-10-24",
        birthTime: "14:35",
        birthPlace: "New Delhi",
        latitude: 28.6139,
        longitude: 77.209,
        timezone: 5.5,
      },
      {
        name: "Meera Kapoor",
        birthDate: "1997-04-12",
        birthTime: "09:15",
        birthPlace: "Jaipur",
        latitude: 26.9124,
        longitude: 75.7873,
        timezone: 5.5,
      }
    )
  );

  const [isCalculating, setIsCalculating] = useState(false);

  const handleMatch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculating(true);

    const bCityObj = INDIAN_CITIES.find((c) => c.name.toLowerCase() === boyCity.toLowerCase()) || INDIAN_CITIES[0];
    const gCityObj = INDIAN_CITIES.find((c) => c.name.toLowerCase() === girlCity.toLowerCase()) || INDIAN_CITIES[5];

    setTimeout(() => {
      const res = calculateGunMilan(
        {
          name: boyName,
          birthDate: boyDate,
          birthTime: boyTime,
          birthPlace: bCityObj.name,
          latitude: bCityObj.latitude,
          longitude: bCityObj.longitude,
          timezone: bCityObj.timezone,
        },
        {
          name: girlName,
          birthDate: girlDate,
          birthTime: girlTime,
          birthPlace: gCityObj.name,
          latitude: gCityObj.latitude,
          longitude: gCityObj.longitude,
          timezone: gCityObj.timezone,
        }
      );
      setResult(res);
      setIsCalculating(false);
    }, 400);
  };

  const kootaList = [
    { title: "Varna Koota (वर्ण)", max: 1, scored: result.varna.points, desc: result.varna.description },
    { title: "Vashya Koota (वश्य)", max: 2, scored: result.vashya.points, desc: result.vashya.description },
    { title: "Tara Koota (तारा)", max: 3, scored: result.tara.points, desc: result.tara.description },
    { title: "Yoni Koota (योनि)", max: 4, scored: result.yoni.points, desc: result.yoni.description },
    { title: "Graha Maitri (ग्रह मैत्री)", max: 5, scored: result.grahaMaitri.points, desc: result.grahaMaitri.description },
    { title: "Gana Koota (गण)", max: 6, scored: result.gana.points, desc: result.gana.description },
    { title: "Bhakoot Koota (भकूट)", max: 7, scored: result.bhakoot.points, desc: result.bhakoot.description },
    { title: "Nadi Koota (नाड़ी)", max: 8, scored: result.nadi.points, desc: result.nadi.description },
  ];

  return (
    <div className="bg-[#FBF3E7] py-8 lg:py-12 min-h-screen text-[#3B2A1E]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E8D8C3] bg-[#FFFDF9] px-3 py-1 text-xs font-semibold text-[#7B2D26] shadow-sm mb-3 font-temple">
            <HeartHandshake className="h-3.5 w-3.5 text-[#C1662F]" />
            <span>AUTHENTIC ASHTA KOOTA VEDIC SYSTEM</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-temple text-[#7B2D26] tracking-tight">
            Vedic Kundli Milan &amp; 36 Gun Matching
          </h1>
          <p className="mt-2 text-[#7D6B5D] text-xs sm:text-sm font-body">
            Calculate exact marital compatibility, Nadi Dosha, Bhakoot Dosha, and emotional harmony.
          </p>
        </div>

        {/* Form Grid */}
        <form onSubmit={handleMatch} className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Boy's Details */}
            <div className="rounded-2xl border border-[#E8D8C3] bg-[#FFFDF9] p-6 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#7B2D26] font-temple mb-4 flex items-center gap-2">
                <User className="h-4 w-4 text-[#E8A33D]" />
                <span>Groom&apos;s Details (वर का विवरण)</span>
              </h3>
              <div className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-[#3B2A1E] mb-1">Boy&apos;s Name</label>
                  <input
                    type="text"
                    required
                    value={boyName}
                    onChange={(e) => setBoyName(e.target.value)}
                    className="w-full rounded-xl border border-[#D4C3B3] bg-[#FAF5EE] px-3.5 py-2 text-xs text-[#3B2A1E] focus:border-[#7B2D26] focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#3B2A1E] mb-1">Birth Date</label>
                    <input
                      type="date"
                      required
                      value={boyDate}
                      onChange={(e) => setBoyDate(e.target.value)}
                      className="w-full rounded-xl border border-[#D4C3B3] bg-[#FAF5EE] px-3 py-2 text-xs text-[#3B2A1E] focus:border-[#7B2D26] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#3B2A1E] mb-1">Birth Time</label>
                    <input
                      type="time"
                      required
                      value={boyTime}
                      onChange={(e) => setBoyTime(e.target.value)}
                      className="w-full rounded-xl border border-[#D4C3B3] bg-[#FAF5EE] px-3 py-2 text-xs text-[#3B2A1E] focus:border-[#7B2D26] focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#3B2A1E] mb-1">Birth City</label>
                  <input
                    type="text"
                    required
                    value={boyCity}
                    onChange={(e) => setBoyCity(e.target.value)}
                    placeholder="e.g. New Delhi, Mumbai"
                    className="w-full rounded-xl border border-[#D4C3B3] bg-[#FAF5EE] px-3.5 py-2 text-xs text-[#3B2A1E] focus:border-[#7B2D26] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Girl's Details */}
            <div className="rounded-2xl border border-[#E8D8C3] bg-[#FFFDF9] p-6 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#C1662F] font-temple mb-4 flex items-center gap-2">
                <Heart className="h-4 w-4 text-[#7B2D26]" />
                <span>Bride&apos;s Details (कन्या का विवरण)</span>
              </h3>
              <div className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-[#3B2A1E] mb-1">Girl&apos;s Name</label>
                  <input
                    type="text"
                    required
                    value={girlName}
                    onChange={(e) => setGirlName(e.target.value)}
                    className="w-full rounded-xl border border-[#D4C3B3] bg-[#FAF5EE] px-3.5 py-2 text-xs text-[#3B2A1E] focus:border-[#7B2D26] focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#3B2A1E] mb-1">Birth Date</label>
                    <input
                      type="date"
                      required
                      value={girlDate}
                      onChange={(e) => setGirlDate(e.target.value)}
                      className="w-full rounded-xl border border-[#D4C3B3] bg-[#FAF5EE] px-3 py-2 text-xs text-[#3B2A1E] focus:border-[#7B2D26] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#3B2A1E] mb-1">Birth Time</label>
                    <input
                      type="time"
                      required
                      value={girlTime}
                      onChange={(e) => setGirlTime(e.target.value)}
                      className="w-full rounded-xl border border-[#D4C3B3] bg-[#FAF5EE] px-3 py-2 text-xs text-[#3B2A1E] focus:border-[#7B2D26] focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#3B2A1E] mb-1">Birth City</label>
                  <input
                    type="text"
                    required
                    value={girlCity}
                    onChange={(e) => setGirlCity(e.target.value)}
                    placeholder="e.g. Jaipur, Bengaluru"
                    className="w-full rounded-xl border border-[#D4C3B3] bg-[#FAF5EE] px-3.5 py-2 text-xs text-[#3B2A1E] focus:border-[#7B2D26] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <button
              type="submit"
              disabled={isCalculating}
              className="rounded-xl bg-[#7B2D26] px-8 py-3.5 text-sm font-bold text-white shadow-md hover:bg-[#64231D] active:scale-95 transition-all flex items-center gap-2"
            >
              <HeartHandshake className="h-4 w-4 text-[#E8A33D]" />
              <span>{isCalculating ? "Matching Planetary Positions..." : "Calculate 36 Gun Milan"}</span>
            </button>
          </div>
        </form>

        {/* Compatibility Report Display */}
        <div className="rounded-3xl border border-[#E8D8C3] bg-[#FFFDF9] p-6 md:p-8 shadow-md">
          {/* Score Banner */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-[#E8D8C3] pb-8">
            <div className="text-center md:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7B2D26] font-temple">
                Compatibility Verdict
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-temple text-[#3B2A1E] mt-1">
                {result.boyName} &amp; {result.girlName}
              </h2>
              <p className="text-xs sm:text-sm text-[#6B5A4E] mt-2 max-w-xl leading-relaxed font-body">
                {result.recommendations}
              </p>
            </div>

            {/* Score Wheel Pill */}
            <div className="flex items-center gap-4 rounded-2xl border border-[#E8A33D]/50 bg-[#FAF1E4] p-4 text-center shrink-0 shadow-sm">
              <div>
                <div className="text-4xl font-bold font-temple text-[#7B2D26]">
                  {result.totalScore}
                  <span className="text-xl text-[#7D6B5D] font-normal font-body"> / 36</span>
                </div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#C1662F] mt-1">
                  {result.verdict} ({result.percentage}%)
                </div>
              </div>
            </div>
          </div>

          {/* Dosha Highlights */}
          {(result.nadiDosha || result.bhakootDosha) && (
            <div className="mt-6 rounded-xl border border-[#C1662F]/40 bg-[#FAF1E4] p-4 text-xs">
              <div className="flex items-center gap-2 font-bold text-[#7B2D26] mb-1 font-temple">
                <AlertTriangle className="h-4 w-4 text-[#C1662F]" />
                <span>Critical Astrological Factors Detected:</span>
              </div>
              <ul className="list-disc list-inside text-[#6B5A4E] space-y-1 pl-1 font-body">
                {result.nadiDosha && (
                  <li>
                    <strong className="text-[#7B2D26]">Nadi Dosha Active:</strong> Both have the same physiological energy classification (0/8 points). Navamsha cancellation and personalized consultation are advised.
                  </li>
                )}
                {result.bhakootDosha && (
                  <li>
                    <strong className="text-[#C1662F]">Bhakoot Disparity:</strong> Relative moon signs require domestic maturity and mutual communication balancing.
                  </li>
                )}
              </ul>
            </div>
          )}

          {/* Ashta Koota Points Breakdown Table */}
          <div className="mt-8">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#7B2D26] font-temple mb-4">
              Ashta Koota Points Breakdown (अष्टकूट विवरण)
            </h4>
            <div className="overflow-x-auto rounded-xl border border-[#E8D8C3]">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF5EE] text-[#7D6B5D] font-semibold uppercase border-b border-[#E8D8C3]">
                  <tr>
                    <th className="px-4 py-3">Koota</th>
                    <th className="px-4 py-3">Max Points</th>
                    <th className="px-4 py-3">Scored</th>
                    <th className="px-4 py-3">Significance &amp; Analysis</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8D8C3]/70 text-[#3B2A1E]">
                  {kootaList.map((k, idx) => (
                    <tr key={idx} className="hover:bg-[#FAF5EE]/60 transition-colors">
                      <td className="px-4 py-3 font-semibold text-[#7B2D26] font-temple">{k.title}</td>
                      <td className="px-4 py-3 font-mono text-[#7D6B5D]">{k.max}</td>
                      <td className="px-4 py-3 font-mono font-bold text-[#C1662F]">
                        {k.scored} / {k.max}
                      </td>
                      <td className="px-4 py-3 text-[#6B5A4E] font-body">{k.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Consult Acharya Ji Banner */}
          {/* PLACEHOLDER: replace with real content */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-[#E8A33D]/60 bg-gradient-to-r from-[#7B2D26] via-[#64231D] to-[#3B2A1E] text-white p-6 shadow-md">
            <div>
              <h4 className="text-base font-bold font-temple">Need a personal review before taking the next step?</h4>
              <p className="text-xs text-amber-100/80 mt-1 max-w-xl font-body">
                {PLACEHOLDER_ASTROLOGER.displayName} analyzes deep planetary aspects (Navamsha, Dasha compatibility, and Shani-Manglik balance) that automated calculators cannot see.
              </p>
            </div>
            <Link
              href="/consult"
              className="shrink-0 rounded-xl bg-[#E8A33D] px-6 py-3 text-xs font-bold text-[#3B2A1E] hover:bg-[#d69330] shadow-md flex items-center gap-2 transition-all"
            >
              <PhoneCall className="h-4 w-4" />
              <span>Discuss With Acharya Ji</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
