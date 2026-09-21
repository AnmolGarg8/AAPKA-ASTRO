"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Compass, Gem, FileText, HeartHandshake, PhoneCall, ArrowRight, CheckCircle } from "lucide-react";

export const ServicesGrid: React.FC = () => {
  const services = [
    {
      id: "kundli",
      title: "Janam Kundli & Dasha Deep Reading",
      hindi: "जन्म कुंडली एवं दशा फल",
      description:
        "Comprehensive analysis of your Lagna, planetary yogas, Vimshottari Mahadasha, career prospects, wealth potential, and health alerts.",
      pricing: "₹999 / Detailed 30m Session or ₹19/min Live",
      badge: "Most Popular",
      icon: FileText,
      href: "/kundli",
      features: [
        "Ascendant & Moon sign breakdown",
        "Upcoming Mahadasha / Antardasha impact",
        "Career elevation & financial yogas",
        "Specific timeframes for major life events",
      ],
    },
    {
      id: "milan",
      title: "Kundli Milan & Marital Harmony",
      hindi: "कुंडली मिलान एवं विवाह विचार",
      description:
        "Traditional Ashta Koota 36 Gun Milan coupled with planetary friendship, Manglik Dosha evaluation, and mutual psychological longevity.",
      pricing: "Included in Live Session / ₹499 Report",
      badge: "High Precision",
      icon: HeartHandshake,
      href: "/kundli-matching",
      features: [
        "36 Gun Ashta Koota breakdown",
        "Nadi & Bhakoot dosha remedies",
        "In-depth emotional & physical rapport",
        "Spousal nature & in-law relationship",
      ],
    },
    {
      id: "vastu",
      title: "Vedic Vastu Consultancy",
      hindi: "वैदिक वास्तु शास्त्र परामर्श",
      description:
        "Scientifically balanced directional alignments for residences, corporate offices, industrial plots, and factory units. Zero demolition remedies.",
      pricing: "Starting ₹2,499 / Layout Audit",
      badge: "Non-Demolition",
      icon: Compass,
      href: "/vastu",
      features: [
        "North-East (Ishanya) & South-West balancing",
        "Main entrance energy diagnosis",
        "Yantra, pyramid & metal strip remedies",
        "Business cashflow acceleration",
      ],
    },
    {
      id: "gemstones",
      title: "Astro-Scientific Gemstones",
      hindi: "प्रामाणिक रत्न एवं अभिमंत्रित यंत्र",
      description:
        "Personalized gemstone recommendations calculated from planetary strength (Shadbala) and Mahadasha. 100% natural, certified, and energized.",
      pricing: "Free with Consultation / Direct Purchase",
      badge: "Govt. Lab Certified",
      icon: Gem,
      href: "/gemstones",
      features: [
        "Purity tested in Govt. authorized labs",
        "Prana Pratishtha Vedic energization",
        "Specific wearing day, muhurat & mantra",
        "Direct insured home delivery across India",
      ],
    },
  ];

  return (
    <section className="border-t border-slate-800 bg-[#080B12] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-300 mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            <span>AUTHENTIC VEDIC TRADITION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Comprehensive Astrological Solutions
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
            Every consultation is handled personally with ancient rigor and modern clarity.
            No automated cookie-cutter templates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="group relative rounded-2xl border border-slate-800 bg-slate-900/60 p-8 transition-all hover:border-amber-500/40 hover:bg-slate-900/90 hover:shadow-2xl hover:shadow-amber-500/10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-300 border border-amber-500/20">
                      {service.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                    {service.title}
                  </h3>
                  <div className="text-xs text-amber-200/70 font-medium mb-3">{service.hindi}</div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <ul className="space-y-2.5 mb-6 border-t border-slate-800/80 pt-4">
                    {service.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between border-t border-slate-800 pt-4">
                  <span className="text-xs font-bold text-amber-400">{service.pricing}</span>
                  <Link
                    href={service.href}
                    className="flex items-center gap-1.5 text-xs font-bold text-white hover:text-amber-300 transition-colors"
                  >
                    <span>Explore Service</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
