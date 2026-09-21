"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Gem,
  ShieldCheck,
  Award,
  Sparkles,
  PhoneCall,
  CheckCircle2,
  Filter,
  ArrowRight,
} from "lucide-react";

export const GemstonesPage: React.FC = () => {
  const [selectedPlanet, setSelectedPlanet] = useState<string>("all");
  const [cartCount, setCartCount] = useState(0);

  const gemstones = [
    {
      id: "yellow-sapphire",
      name: "Natural Yellow Sapphire (Pukhraj)",
      hindi: "प्राकृतिक पीला पुखराज",
      planet: "Jupiter (बृहस्पति)",
      planetKey: "jupiter",
      color: "Canary Golden Yellow",
      origin: "Ceylon (Sri Lanka)",
      price: 14500,
      ratti: "5.25 - 6.25 Ratti",
      lab: "IGI-GTL Govt. Lab Certified",
      benefits: "Wisdom, wealth, business expansion, marital bliss for women, higher education.",
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: "emerald",
      name: "Natural Zambian Emerald (Panna)",
      hindi: "प्राकृतिक जाम्बियन पन्ना",
      planet: "Mercury (बुध)",
      planetKey: "mercury",
      color: "Vibrant Deep Green",
      origin: "Zambia",
      price: 12800,
      ratti: "4.50 - 5.50 Ratti",
      lab: "Govt. Recognized Gem Lab",
      benefits: "Sharp intelligence, public speaking mastery, financial acumen, IT & commerce success.",
      image: "https://images.unsplash.com/photo-1615655406736-b37c4fabf923?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: "blue-sapphire",
      name: "Natural Blue Sapphire (Neelam)",
      hindi: "प्राकृतिक नीला नीलम",
      planet: "Saturn (शनि)",
      planetKey: "saturn",
      color: "Royal Cornflower Blue",
      origin: "Madagascar / Ceylon",
      price: 18900,
      ratti: "5.00 - 7.00 Ratti",
      lab: "Govt. Lab Certified & Tested",
      benefits: "Instant breakthroughs, discipline, judicial success, protection against severe accidents.",
      image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: "ruby",
      name: "Natural Burma Ruby (Manikya)",
      hindi: "प्राकृतिक बर्मा माणिक्य",
      planet: "Sun (सूर्य)",
      planetKey: "sun",
      color: "Pigeon Blood Crimson",
      origin: "Burma (Myanmar)",
      price: 16500,
      ratti: "4.00 - 5.25 Ratti",
      lab: "Govt. Authorized Gem Lab",
      benefits: "Executive authority, administrative promotions, fatherly health, immense vitality.",
      image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: "red-coral",
      name: "Italian Red Coral (Moonga)",
      hindi: "प्राकृतिक इटालियन मूंगा",
      planet: "Mars (मंगल)",
      planetKey: "mars",
      color: "Deep Triangular Red",
      origin: "Mediterranean (Italy)",
      price: 6800,
      ratti: "6.50 - 8.25 Ratti",
      lab: "IGI-GTL Lab Certified",
      benefits: "Courage, blood vitality, real estate success, overcoming laziness and debt burden.",
      image: "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: "pearl",
      name: "Natural South Sea Pearl (Moti)",
      hindi: "प्राकृतिक सच्चा मोती",
      planet: "Moon (चन्द्र)",
      planetKey: "moon",
      color: "Lustrous Milky White",
      origin: "South Sea",
      price: 5400,
      ratti: "7.00 - 9.00 Ratti",
      lab: "Govt. Gem Testing Lab",
      benefits: "Emotional tranquility, curing insomnia, strengthening maternal bond, mind control.",
      image: "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?auto=format&fit=crop&w=500&q=80",
    },
  ];

  const filtered = selectedPlanet === "all"
    ? gemstones
    : gemstones.filter((g) => g.planetKey === selectedPlanet);

  const handleAddToCart = (name: string) => {
    setCartCount((c) => c + 1);
    alert(`${name} added to your sacred order! Our desk will coordinate your Vedic energization (Prana Pratishtha) details.`);
  };

  return (
    <div className="bg-[#0B0F19] py-8 lg:py-16 min-h-screen text-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-300 mb-3">
            <Gem className="h-3.5 w-3.5" />
            <span>100% UNHEATED &amp; UNTREATED</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Govt.-Certified Vedic Gemstones
          </h1>
          <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
            Every gemstone recommended by Acharya Rajesh Sharma is hand-selected, lab-certified for natural origin, and consecrated with individualized Vedic mantras before delivery.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12 text-xs font-semibold">
          {[
            { label: "All Gemstones", key: "all" },
            { label: "Jupiter (Pukhraj)", key: "jupiter" },
            { label: "Mercury (Panna)", key: "mercury" },
            { label: "Saturn (Neelam)", key: "saturn" },
            { label: "Sun (Manikya)", key: "sun" },
            { label: "Mars (Moonga)", key: "mars" },
            { label: "Moon (Moti)", key: "moon" },
          ].map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setSelectedPlanet(item.key)}
              className={`rounded-xl px-4 py-2 transition-all ${
                selectedPlanet === item.key
                  ? "bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20"
                  : "border border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Gemstones Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((gem) => (
            <div
              key={gem.id}
              className="group rounded-3xl border border-slate-800 bg-slate-900/60 overflow-hidden backdrop-blur-xl hover:border-amber-500/40 hover:shadow-2xl hover:shadow-amber-500/10 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Image & Lab Badge */}
                <div className="relative h-52 w-full overflow-hidden bg-slate-950">
                  <img
                    src={gem.image}
                    alt={gem.name}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 rounded-lg bg-slate-950/80 px-2.5 py-1 text-[10px] font-bold text-amber-300 backdrop-blur-md border border-amber-500/30 flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3 text-emerald-400" />
                    <span>{gem.lab}</span>
                  </div>
                  <div className="absolute bottom-3 right-3 rounded-lg bg-slate-950/80 px-2.5 py-1 text-[11px] font-mono font-bold text-white backdrop-blur-md">
                    {gem.origin}
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 space-y-3">
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                      {gem.name}
                    </h3>
                    <div className="text-xs text-amber-400/90 font-medium">{gem.hindi}</div>
                  </div>

                  <div className="text-xs text-slate-300">
                    <strong className="text-slate-400">Ruler:</strong> {gem.planet}
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                    {gem.benefits}
                  </p>

                  <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-2.5 text-[11px] flex justify-between text-slate-300">
                    <span>Weight Range:</span>
                    <strong className="text-white font-mono">{gem.ratti}</strong>
                  </div>
                </div>
              </div>

              {/* Price & Action */}
              <div className="border-t border-slate-800 p-6 pt-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block font-semibold">Starting From</span>
                  <span className="text-lg font-black text-amber-400 font-mono">
                    ₹{gem.price.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex gap-2">
                  <Link
                    href="/consult"
                    className="rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white"
                    title="Ask Acharya Ji if this stone is suitable for your Lagna"
                  >
                    Check Suitability
                  </Link>

                  <button
                    type="button"
                    onClick={() => handleAddToCart(gem.name)}
                    className="rounded-xl bg-amber-500 px-3.5 py-2 text-xs font-bold text-slate-950 hover:bg-amber-400 transition-all"
                  >
                    Order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Consult Banner for Gemstone Suitability */}
        <div className="mt-16 rounded-3xl border border-amber-500/40 bg-gradient-to-r from-amber-500/15 via-[#1E1B4B] to-slate-900 p-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-white">
              WARNING: Never wear a gemstone without Kundli verification
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Wearing an incompatible gemstone for an enemy planet (such as Neelam or Moonga without proper house alignment) can trigger severe financial and health reversals. Let Acharya Rajesh Sharma calculate your Shadbala before ordering.
            </p>
          </div>

          <Link
            href="/consult"
            className="shrink-0 rounded-xl bg-amber-500 px-6 py-3.5 text-xs font-black text-slate-950 hover:bg-amber-400 shadow-xl shadow-amber-500/20 flex items-center gap-2"
          >
            <PhoneCall className="h-4 w-4" />
            <span>Consult Acharya Ji First (₹19/min)</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GemstonesPage;
