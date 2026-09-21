"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AstrologerStateStore, AstrologerStatus, QueueItem } from "@/lib/store/astrologerStore";
import {
  PhoneCall,
  Sparkles,
  ShieldCheck,
  Award,
  Star,
  Clock,
  CheckCircle,
  Users,
  Compass,
  ArrowRight
} from "lucide-react";

export const Hero: React.FC = () => {
  const [status, setStatus] = useState<AstrologerStatus>("AVAILABLE");
  const [queue, setQueue] = useState<QueueItem[]>([]);

  const sync = () => {
    setStatus(AstrologerStateStore.getStatus());
    setQueue(AstrologerStateStore.getQueue());
  };

  useEffect(() => {
    sync();
    window.addEventListener("astro_state_changed", sync);
    return () => window.removeEventListener("astro_state_changed", sync);
  }, []);

  const queueLength = queue.length;
  const estimatedWait = (queueLength + 1) * 7;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0B0F19] via-[#0F172A] to-[#0B0F19] pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Background Decorative Rings & Cosmic Glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full bg-gradient-to-tr from-amber-600/15 via-indigo-600/10 to-transparent blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            {/* Live Astrologer Presence Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1.5 text-xs font-semibold backdrop-blur-md">
              <div className="relative flex items-center">
                {status === "AVAILABLE" && (
                  <>
                    <span className="absolute h-2.5 w-2.5 animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative h-2 w-2 rounded-full bg-emerald-500" />
                  </>
                )}
                {status === "BUSY" && (
                  <>
                    <span className="absolute h-2.5 w-2.5 animate-ping rounded-full bg-amber-400 opacity-75" />
                    <span className="relative h-2 w-2 rounded-full bg-amber-500" />
                  </>
                )}
                {(status === "BREAK" || status === "OFFLINE") && (
                  <span className="relative h-2 w-2 rounded-full bg-slate-400" />
                )}
              </div>

              <span className="text-amber-300">
                {status === "AVAILABLE" && "Acharya Rajesh Sharma is ONLINE & Available"}
                {status === "BUSY" && `Acharya Ji is IN SESSION (${queueLength} in line • ~${estimatedWait}m wait)`}
                {status === "BREAK" && "Acharya Ji is on a brief break • Resumes shortly"}
                {status === "OFFLINE" && "Acharya Ji is OFFLINE • Available Tomorrow at 10 AM"}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Direct 1-on-1 Guidance with India&apos;s Revered{" "}
              <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">
                Vedic Astrologer
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              Unlike generic marketplaces with hundreds of unvetted practitioners, <strong className="text-white">Aapka Astro</strong> connects you exclusively with <span className="text-amber-400 font-semibold">Acharya Rajesh Sharma</span> — Gold Medalist Jyotish scholar with 18+ years of authentic predictive mastery.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link
                href="/consult"
                className="group flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 px-7 py-4 text-sm font-bold text-slate-950 shadow-xl shadow-amber-500/25 transition-all hover:brightness-110 hover:shadow-amber-500/40 active:scale-[0.99]"
              >
                <PhoneCall className="h-4 w-4" />
                <span>
                  {status === "AVAILABLE" ? "Start Live Consultation" : status === "BUSY" ? "Join Live Queue" : "Book Preferred Slot"}
                </span>
                <span className="rounded-full bg-slate-950/20 px-2 py-0.5 text-[11px] font-extrabold text-slate-950">
                  ₹19/min
                </span>
              </Link>

              <Link
                href="/kundli"
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-6 py-4 text-sm font-semibold text-white hover:border-amber-500/50 hover:bg-slate-800 transition-all"
              >
                <Sparkles className="h-4 w-4 text-amber-400" />
                <span>Calculate Free Kundli</span>
                <ArrowRight className="h-4 w-4 text-slate-400" />
              </Link>
            </div>

            {/* Trust Proof Points */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800/80 max-w-xl">
              <div>
                <div className="text-2xl font-black text-amber-400">18+</div>
                <div className="text-xs text-slate-400">Years Experience</div>
              </div>
              <div>
                <div className="text-2xl font-black text-amber-400">35K+</div>
                <div className="text-xs text-slate-400">Kundlis Decoded</div>
              </div>
              <div>
                <div className="text-2xl font-black text-amber-400">4.98 ★</div>
                <div className="text-xs text-slate-400">12,800+ Reviews</div>
              </div>
            </div>
          </div>

          {/* Right Column: Astrologer Profile Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md rounded-3xl border border-amber-500/30 bg-gradient-to-b from-slate-900/90 via-[#111827] to-[#0B0F19] p-6 shadow-2xl backdrop-blur-xl">
              {/* Subtle Gold Accents */}
              <div className="absolute -top-3 -right-3 rounded-full bg-amber-500 p-2 text-slate-950 shadow-lg shadow-amber-500/30">
                <Award className="h-5 w-5" />
              </div>

              {/* Astrologer Photo & Live Pill */}
              <div className="relative mb-5 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950">
                <img
                  src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80"
                  alt="Acharya Rajesh Sharma"
                  className="h-64 w-full object-cover object-top filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-90" />

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <div className="rounded-lg bg-slate-950/80 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-md border border-slate-700">
                    Sampurnanand Sanskrit Univ., Varanasi
                  </div>
                  <div className="flex items-center gap-1 rounded-lg bg-amber-500/90 px-2 py-1 text-xs font-extrabold text-slate-950">
                    <Star className="h-3.5 w-3.5 fill-current" />
                    <span>4.98</span>
                  </div>
                </div>
              </div>

              {/* Bio Details */}
              <div className="space-y-3">
                <div>
                  <h3 className="text-xl font-bold text-white">Acharya Rajesh Sharma</h3>
                  <p className="text-xs font-medium text-amber-400">
                    Jyotish Acharya &bull; Gold Medalist &bull; Vedic Scholar
                  </p>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                  Renowned for uncompromising precision in Dasha calculations, marital compatibility, financial turnaround yogas, and practical non-demolition Vastu remedies.
                </p>

                {/* Specialties Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {["Janam Kundli", "Kundli Milan", "Vastu Shastra", "Govt. Gemstones"].map((spec) => (
                    <span
                      key={spec}
                      className="rounded-lg border border-slate-800 bg-slate-800/60 px-2.5 py-1 text-[10px] font-medium text-slate-300"
                    >
                      {spec}
                    </span>
                  ))}
                </div>

                {/* Quick Action Button */}
                <div className="pt-2">
                  <Link
                    href="/consult"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500/20 py-3 text-xs font-bold text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 transition-all"
                  >
                    <span>Instant Live Consultation (Audio / Chat)</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
