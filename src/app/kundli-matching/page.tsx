"use client";

import React, { useState } from "react";
import Link from "next/link";
import { calculateGunMilan } from "@/lib/astrology/gunMilan";
import { GunMilanResult } from "@/lib/astrology/types";
import { INDIAN_CITIES } from "@/lib/astrology/indianCities";
import {
  HeartHandshake,
  Sparkles,
  PhoneCall,
  CheckCircle2,
  AlertTriangle,
  Heart,
  Calendar,
  Clock,
  MapPin,
  User,
  ShieldAlert,
} from "lucide-react";

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
    <div className="bg-[#0B0F19] py-8 lg:py-12 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-300 mb-3">
            <HeartHandshake className="h-3.5 w-3.5" />
            <span>AUTHENTIC ASHTA KOOTA VEDIC SYSTEM</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Vedic Kundli Milan &amp; 36 Gun Matching
          </h1>
          <p className="mt-2 text-slate-400 text-xs sm:text-sm">
            Calculate exact marital compatibility, Nadi Dosha, Bhakoot Dosha, and emotional harmony.
          </p>
        </div>

        {/* Form Grid */}
        <form onSubmit={handleMatch} className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Boy's Details */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl">
              <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400 mb-4 flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>Groom&apos;s Details (वर का विवरण)</span>
              </h3>
              <div className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Boy&apos;s Name</label>
                  <input
                    type="text"
                    required
                    value={boyName}
                    onChange={(e) => setBoyName(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Birth Date</label>
                    <input
                      type="date"
                      required
                      value={boyDate}
                      onChange={(e) => setBoyDate(e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Birth Time</label>
                    <input
                      type="time"
                      required
                      value={boyTime}
                      onChange={(e) => setBoyTime(e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Birth City</label>
                  <input
                    type="text"
                    required
                    value={boyCity}
                    onChange={(e) => setBoyCity(e.target.value)}
                    placeholder="e.g. New Delhi, Mumbai"
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Girl's Details */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl">
              <h3 className="text-sm font-bold uppercase tracking-wider text-rose-400 mb-4 flex items-center gap-2">
                <Heart className="h-4 w-4" />
                <span>Bride&apos;s Details (कन्या का विवरण)</span>
              </h3>
              <div className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Girl&apos;s Name</label>
                  <input
                    type="text"
                    required
                    value={girlName}
                    onChange={(e) => setGirlName(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Birth Date</label>
                    <input
                      type="date"
                      required
                      value={girlDate}
                      onChange={(e) => setGirlDate(e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Birth Time</label>
                    <input
                      type="time"
                      required
                      value={girlTime}
                      onChange={(e) => setGirlTime(e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Birth City</label>
                  <input
                    type="text"
                    required
                    value={girlCity}
                    onChange={(e) => setGirlCity(e.target.value)}
                    placeholder="e.g. Jaipur, Bengaluru"
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <button
              type="submit"
              disabled={isCalculating}
              className="rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 px-8 py-3.5 text-sm font-bold text-slate-950 shadow-xl shadow-amber-500/20 hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
            >
              <HeartHandshake className="h-4 w-4" />
              <span>{isCalculating ? "Matching Planetary Positions..." : "Calculate 36 Gun Milan"}</span>
            </button>
          </div>
        </form>

        {/* Compatibility Report Display */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 md:p-8 backdrop-blur-2xl shadow-2xl">
          {/* Score Banner */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-slate-800 pb-8">
            <div className="text-center md:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Compatibility Verdict
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                {result.boyName} &amp; {result.girlName}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-xl leading-relaxed">
                {result.recommendations}
              </p>
            </div>

            {/* Score Wheel Pill */}
            <div className="flex items-center gap-4 rounded-2xl border border-amber-500/40 bg-amber-500/10 p-4 text-center shrink-0">
              <div>
                <div className="text-4xl font-black text-amber-400 font-mono">
                  {result.totalScore}
                  <span className="text-xl text-slate-400 font-normal"> / 36</span>
                </div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-amber-200 mt-1">
                  {result.verdict} ({result.percentage}%)
                </div>
              </div>
            </div>
          </div>

          {/* Dosha Highlights */}
          {(result.nadiDosha || result.bhakootDosha) && (
            <div className="mt-6 rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-xs">
              <div className="flex items-center gap-2 font-bold text-rose-300 mb-1">
                <AlertTriangle className="h-4 w-4" />
                <span>Critical Astrological Factors Detected:</span>
              </div>
              <ul className="list-disc list-inside text-slate-300 space-y-1 pl-1">
                {result.nadiDosha && (
                  <li>
                    <strong className="text-rose-300">Nadi Dosha Active:</strong> Both have the same physiological energy classification (0/8 points). Navamsha cancellation and personalized consultation are advised.
                  </li>
                )}
                {result.bhakootDosha && (
                  <li>
                    <strong className="text-amber-300">Bhakoot Disparity:</strong> Relative moon signs require domestic maturity and mutual communication balancing.
                  </li>
                )}
              </ul>
            </div>
          )}

          {/* Ashta Koota Points Breakdown Table */}
          <div className="mt-8">
            <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400 mb-4">
              Ashta Koota Points Breakdown (अष्टकूट विवरण)
            </h4>
            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950/60 text-slate-400 font-semibold uppercase border-b border-slate-800">
                  <tr>
                    <th className="px-4 py-3">Koota</th>
                    <th className="px-4 py-3">Max Points</th>
                    <th className="px-4 py-3">Scored</th>
                    <th className="px-4 py-3">Significance &amp; Analysis</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-200">
                  {kootaList.map((k, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/20">
                      <td className="px-4 py-3 font-semibold text-white">{k.title}</td>
                      <td className="px-4 py-3 font-mono text-slate-400">{k.max}</td>
                      <td className="px-4 py-3 font-mono font-bold text-amber-400">
                        {k.scored} / {k.max}
                      </td>
                      <td className="px-4 py-3 text-slate-300">{k.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Consult Acharya Ji Banner */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-amber-500/40 bg-gradient-to-r from-amber-500/15 via-[#1E1B4B] to-slate-900 p-6">
            <div>
              <h4 className="text-base font-bold text-white">Need a personal review before taking the next step?</h4>
              <p className="text-xs text-slate-300 mt-1 max-w-xl">
                Acharya Rajesh Sharma analyzes deep planetary aspects (Navamsha, Dasha compatibility, and Shani-Manglik balance) that automated calculators cannot see.
              </p>
            </div>
            <Link
              href="/consult"
              className="shrink-0 rounded-xl bg-amber-500 px-6 py-3 text-xs font-extrabold text-slate-950 hover:bg-amber-400 shadow-xl shadow-amber-500/20 flex items-center gap-2"
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
