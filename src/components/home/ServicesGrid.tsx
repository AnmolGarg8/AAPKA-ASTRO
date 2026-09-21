"use client";

import React from "react";
import Link from "next/link";
import { Compass, Gem, FileText, HeartHandshake, ArrowRight, CheckCircle2 } from "lucide-react";
import { MandalaDivider } from "@/components/ui/MandalaDivider";

export const ServicesGrid: React.FC = () => {
  const services = [
    {
      id: "kundli",
      title: "Janam Kundli & Dasha Deep Reading",
      hindi: "जन्म पत्रिका एवं दशा फल",
      description:
        "Comprehensive, mathematical interpretation of your Lagna, planetary yogas, Vimshottari Mahadasha, career ascendance, wealth potential, and health alerts.",
      pricing: "₹999 / In-Depth 30m Session or ₹19/min Live",
      badge: "Most Consulted",
      icon: FileText,
      href: "/kundli",
      features: [
        "Ascendant, Moon sign & Nakshatra breakdown",
        "Upcoming Mahadasha & Antardasha transition timings",
        "Wealth (Dhana) & Authority (Raja) yogas",
        "Precise timeframes for life-defining milestones",
      ],
    },
    {
      id: "milan",
      title: "Kundli Milan & Marital Longevity",
      hindi: "कुंडली मिलान एवं वैवाहिक विचार",
      description:
        "Classical Ashta Koota 36 Gun Milan paired with planetary friendship, Manglik Dosha evaluation, and mutual psychological harmony.",
      pricing: "Included in Live Session / ₹499 Detailed Report",
      badge: "Vedic Precision",
      icon: HeartHandshake,
      href: "/kundli-matching",
      features: [
        "Full 36 Gun Ashta Koota mathematical report",
        "Nadi & Bhakoot dosha cancellation analysis",
        "In-depth physical, biological & mental rapport",
        "Spousal nature, family peace & progeny yogas",
      ],
    },
    {
      id: "vastu",
      title: "Vedic Vastu Shastra Consultancy",
      hindi: "वैज्ञानिक एवं वैदिक वास्तु परामर्श",
      description:
        "Balanced directional alignments for residences, corporate offices, and industrial plots. 100% non-demolition metallic tape and pyramid remedies.",
      pricing: "Starting ₹2,499 / Layout Audit",
      badge: "Zero Demolition",
      icon: Compass,
      href: "/vastu",
      features: [
        "North-East (Ishanya) & South-West energy balancing",
        "Main entrance energy diagnosis and metal correction",
        "Consecrated Vedic yantras and elemental harmonizers",
        "Business cashflow acceleration & domestic tranquility",
      ],
    },
    {
      id: "gemstones",
      title: "Natural Certified Gemstones",
      hindi: "प्रामाणिक रत्न एवं अभिमंत्रित यंत्र",
      description:
        "Personalized gemstone recommendations calculated from planetary strength (Shadbala) and Mahadasha. 100% natural, certified, and energized.",
      pricing: "Free with Consultation / Direct Purchase",
      badge: "Govt. Lab Certified",
      icon: Gem,
      href: "/gemstones",
      features: [
        "100% natural, unheated & untreated gemstones",
        "Govt. recognized gem testing laboratory certificate",
        "Individualized Vedic Prana Pratishtha energization",
        "Prescribed auspicious wearing day, muhurat & mantra",
      ],
    },
  ];

  return (
    <section className="border-t border-[#E8D8C3] bg-[#FFFDF9] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E8D8C3] bg-[#FBF3E7] px-3.5 py-1 text-xs font-bold text-[#7B2D26] mb-3">
            <span>HERITAGE VEDIC TRADITION</span>
          </div>
          <h2 className="font-temple text-3xl sm:text-4xl font-bold text-[#7B2D26] tracking-tight">
            Authentic Astrological Consultations
          </h2>
          <MandalaDivider className="my-4" />
          <p className="text-[#6E5545] text-sm sm:text-base leading-relaxed">
            Every consultation is conducted personally by Acharya Rajesh Sharma using classical Parashari principles. No automated templates or third-party interns.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="group rounded-2xl border-2 border-[#E8D8C3] bg-[#FBF3E7]/70 p-8 transition-all hover:border-[#C1662F] hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#7B2D26] text-[#E8A33D] font-bold shadow-sm">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="rounded-full bg-[#E8A33D]/25 px-3 py-1 text-xs font-bold text-[#7B2D26] border border-[#E8A33D]/40">
                      {service.badge}
                    </span>
                  </div>

                  <h3 className="font-temple text-xl font-bold text-[#7B2D26] group-hover:text-[#C1662F] transition-colors">
                    {service.title}
                  </h3>
                  <div className="text-xs text-[#C1662F] font-bold mb-3">{service.hindi}</div>

                  <p className="text-xs sm:text-sm text-[#6E5545] leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <ul className="space-y-2.5 mb-6 border-t border-[#E8D8C3] pt-4">
                    {service.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-[#3B2A1E]">
                        <CheckCircle2 className="h-4 w-4 text-[#6B8E5A] shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between border-t border-[#E8D8C3] pt-4">
                  <span className="text-xs font-bold text-[#7B2D26]">{service.pricing}</span>
                  <Link
                    href={service.href}
                    className="flex items-center gap-1.5 text-xs font-bold text-[#7B2D26] hover:text-[#C1662F] transition-colors"
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
