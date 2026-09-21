"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Compass,
  CheckCircle2,
  Sparkles,
  PhoneCall,
  UploadCloud,
  FileCheck,
  ShieldCheck,
  Home,
  Building,
  Factory,
  ArrowRight,
} from "lucide-react";

export const VastuPage: React.FC = () => {
  const [propertyType, setPropertyType] = useState<"residential" | "commercial" | "industrial">("residential");
  const [userName, setUserName] = useState("Aarav Sharma");
  const [userPhone, setUserPhone] = useState("+91 98765 43210");
  const [city, setCity] = useState("New Delhi");
  const [areaSqFt, setAreaSqFt] = useState("1800");
  const [specificConcern, setSpecificConcern] = useState("Financial stagnation and frequent disputes in North-East area");
  const [submitted, setSubmitted] = useState(false);

  const vastuServices = [
    {
      type: "residential",
      title: "Residential Vastu Shastra",
      hindi: "आवासीय वास्तु परामर्श",
      icon: Home,
      price: "₹2,499",
      ideal: "Apartments, Villas, Independent Houses, Duplexes",
      highlights: [
        "Main Entrance (Simha Dwar) energy analysis",
        "Kitchen (Agni Kon) & Master Bedroom (Nairutya Kon) balancing",
        "Children study room & concentration enhancement",
        "Zero-demolition non-invasive metallic strip & pyramid remedies",
      ],
    },
    {
      type: "commercial",
      title: "Corporate & Retail Vastu",
      hindi: "व्यावसायिक एवं कॉर्पोरेट वास्तु",
      icon: Building,
      price: "₹4,999",
      ideal: "Offices, Showrooms, Clinics, Retail Outlets",
      highlights: [
        "Promoter / Director seating orientation for authority & clarity",
        "Cash counter & Accounts department placement for steady liquidity",
        "Staff productivity and conflict mitigation in open floors",
        "Client conversion acceleration through directional enhancements",
      ],
    },
    {
      type: "industrial",
      title: "Industrial & Factory Vastu",
      hindi: "औद्योगिक एवं फैक्ट्री वास्तु",
      icon: Factory,
      price: "₹9,999",
      ideal: "Manufacturing Plants, Warehouses, Processing Units",
      highlights: [
        "Heavy machinery alignment in South-West stability zones",
        "Transformer & Boiler placement in precise Fire sector",
        "Raw material vs Finished goods movement flow",
        "Labor harmony and prevention of sudden breakdown patterns",
      ],
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-[#0B0F19] py-8 lg:py-16 min-h-screen text-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-300 mb-3">
            <Compass className="h-3.5 w-3.5" />
            <span>AUTHENTIC VEDIC VASTU SHASTRA</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Scientific Non-Demolition Vastu Audits
          </h1>
          <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
            Align your living and working space with cosmic magnetic fields. Correct doshas without tearing down walls using Acharya Rajesh Sharma&apos;s proven elemental remedies.
          </p>
        </div>

        {/* 3 Packages Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {vastuServices.map((srv) => {
            const Icon = srv.icon;
            const isSelected = propertyType === srv.type;
            return (
              <div
                key={srv.type}
                onClick={() => setPropertyType(srv.type as any)}
                className={`cursor-pointer rounded-2xl border p-6 flex flex-col justify-between transition-all backdrop-blur-xl ${
                  isSelected
                    ? "border-amber-500 bg-slate-900/90 shadow-2xl shadow-amber-500/10 ring-1 ring-amber-500/30"
                    : "border-slate-800 bg-slate-900/60 hover:border-slate-700"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl font-bold ${
                        isSelected ? "bg-amber-500 text-slate-950" : "bg-slate-800 text-amber-400"
                      }`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-lg font-black text-amber-400 font-mono">{srv.price}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white">{srv.title}</h3>
                  <div className="text-xs text-amber-200/70 mb-2">{srv.hindi}</div>
                  <div className="text-[11px] text-slate-400 mb-4 italic">Best for: {srv.ideal}</div>

                  <ul className="space-y-2 border-t border-slate-800/80 pt-4 text-xs text-slate-300">
                    {srv.highlights.map((h, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800">
                  <span
                    className={`block w-full text-center rounded-xl py-2.5 text-xs font-bold transition-all ${
                      isSelected
                        ? "bg-amber-500 text-slate-950"
                        : "bg-slate-800 text-slate-300 hover:text-white"
                    }`}
                  >
                    {isSelected ? "Selected Package ✓" : "Select Package"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Audit Booking & Floor Plan Upload Form */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 md:p-10 backdrop-blur-2xl shadow-2xl">
          <div className="max-w-2xl mx-auto text-center mb-8">
            <h2 className="text-2xl font-bold text-white">Book Your Vastu Audit with Acharya Ji</h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Submit your property details and floor plan. Acharya Ji personally performs the directional degree review and provides your detailed remedy roadmap.
            </p>
          </div>

          {submitted ? (
            <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-8 text-center max-w-lg mx-auto">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-slate-950">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-white">Vastu Audit Request Received!</h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Thank you, {userName}. Acharya Rajesh Sharma&apos;s team has received your property details for{" "}
                <strong className="text-white capitalize">{propertyType} Vastu</strong>. Our desk will contact you within 2 hours at <strong className="text-white">{userPhone}</strong> to confirm your directional layout.
              </p>
              <div className="mt-6">
                <Link
                  href="/consult"
                  className="rounded-xl bg-amber-500 px-6 py-2.5 text-xs font-bold text-slate-950 hover:bg-amber-400"
                >
                  Start Live Chat with Acharya Ji Now
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">Contact Number (WhatsApp)</label>
                  <input
                    type="tel"
                    required
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">Property City</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">Approx. Area (Sq. Ft)</label>
                  <input
                    type="text"
                    required
                    value={areaSqFt}
                    onChange={(e) => setAreaSqFt(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">Selected Audit</label>
                  <input
                    type="text"
                    disabled
                    value={propertyType.toUpperCase()}
                    className="w-full rounded-xl border border-slate-700 bg-slate-800/50 p-3 text-amber-400 font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">
                  Describe Main Concerns / Observed Symptoms
                </label>
                <textarea
                  rows={3}
                  required
                  value={specificConcern}
                  onChange={(e) => setSpecificConcern(e.target.value)}
                  placeholder="e.g. Constant medical expenses, business deal cancellations, negative vibes in bedroom..."
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none leading-relaxed"
                />
              </div>

              {/* Upload Floor Plan */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">
                  Upload Floor Plan / Layout Map (Optional)
                </label>
                <div className="rounded-2xl border-2 border-dashed border-slate-700 bg-slate-800/40 p-6 text-center hover:border-amber-500 transition-colors">
                  <UploadCloud className="mx-auto h-8 w-8 text-amber-400 mb-2" />
                  <span className="font-semibold text-slate-200 block">Drag &amp; drop floor plan or browse</span>
                  <span className="text-[11px] text-slate-400">Accepts PDF, JPG, PNG up to 15MB</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 py-4 font-bold text-slate-950 text-sm shadow-xl shadow-amber-500/20 hover:brightness-110 transition-all"
              >
                Submit Vastu Audit Request &rarr;
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default VastuPage;
