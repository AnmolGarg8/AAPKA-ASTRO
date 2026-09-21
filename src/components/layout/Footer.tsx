"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ShieldCheck, Lock, Award, Heart, Phone, Mail, MapPin } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800 bg-[#080B12] text-slate-400 text-xs">
      {/* Trust Badges Banner */}
      <div className="border-b border-slate-800/80 bg-slate-950/60 py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <Award className="h-6 w-6 text-amber-400 mb-2" />
              <span className="font-bold text-slate-200">18+ Years Vedic Mastery</span>
              <span className="text-[11px] text-slate-500">Gold Medalist Scholar (BHU)</span>
            </div>
            <div className="flex flex-col items-center">
              <Lock className="h-6 w-6 text-amber-400 mb-2" />
              <span className="font-bold text-slate-200">100% Confidential</span>
              <span className="text-[11px] text-slate-500">Private 1-on-1 Consultations</span>
            </div>
            <div className="flex flex-col items-center">
              <ShieldCheck className="h-6 w-6 text-amber-400 mb-2" />
              <span className="font-bold text-slate-200">Govt. Certified Gemstones</span>
              <span className="text-[11px] text-slate-500">100% Natural &amp; Energized</span>
            </div>
            <div className="flex flex-col items-center">
              <Heart className="h-6 w-6 text-amber-400 mb-2" />
              <span className="font-bold text-slate-200">35,000+ Satisfied Clients</span>
              <span className="text-[11px] text-slate-500">4.98/5 Rated Across India</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-slate-950 font-black">
                <Sparkles className="h-4 w-4 fill-current" />
              </div>
              <span className="text-lg font-extrabold tracking-tight text-white">
                AAPKA<span className="text-amber-400">ASTRO</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              India&apos;s premier personalized Vedic astrology consultation sanctuary. Dedicated 1-on-1 consultations directly with Acharya Rajesh Sharma. No bots, no generic unverified advisors.
            </p>
            <div className="text-[11px] text-amber-400/80 font-medium">
              Varanasi • New Delhi • Global Consultations
            </div>
          </div>

          {/* Quick Tools */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Vedic Astrology Tools
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/kundli" className="hover:text-amber-400 transition-colors">
                  Free Janam Kundli Calculator
                </Link>
              </li>
              <li>
                <Link href="/kundli-matching" className="hover:text-amber-400 transition-colors">
                  Kundli Milan (36 Gun Matching)
                </Link>
              </li>
              <li>
                <Link href="/consult" className="hover:text-amber-400 transition-colors">
                  Live Consultation Waitlist
                </Link>
              </li>
              <li>
                <Link href="/wallet" className="hover:text-amber-400 transition-colors">
                  Consultation Wallet &amp; Offers
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Signature Consultations
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/consult" className="hover:text-amber-400 transition-colors">
                  Career &amp; Business Astrology
                </Link>
              </li>
              <li>
                <Link href="/consult" className="hover:text-amber-400 transition-colors">
                  Marriage &amp; Relationship Dasha
                </Link>
              </li>
              <li>
                <Link href="/vastu" className="hover:text-amber-400 transition-colors">
                  Residential &amp; Commercial Vastu
                </Link>
              </li>
              <li>
                <Link href="/gemstones" className="hover:text-amber-400 transition-colors">
                  Vedic Gemstone Recommendations
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Verification */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Direct Contact
            </h4>
            <ul className="space-y-2.5">
              <li className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-amber-400" />
                <span>+91 98100 XXXXX (Official Desk)</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-amber-400" />
                <span>consult@aapkaastro.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-3.5 w-3.5 text-amber-400 mt-0.5" />
                <span>Assi Ghat, Shivala, Varanasi, UP 221005</span>
              </li>
            </ul>

            <div className="mt-4 rounded-lg border border-slate-800 bg-slate-900/60 p-2.5">
              <div className="text-[10px] text-slate-400">Accepted Payment Methods:</div>
              <div className="mt-1 flex flex-wrap gap-1.5 font-mono text-[10px] font-semibold text-slate-300">
                <span className="rounded bg-slate-800 px-1.5 py-0.5">UPI</span>
                <span className="rounded bg-slate-800 px-1.5 py-0.5">GooglePay</span>
                <span className="rounded bg-slate-800 px-1.5 py-0.5">PhonePe</span>
                <span className="rounded bg-slate-800 px-1.5 py-0.5">RuPay</span>
                <span className="rounded bg-slate-800 px-1.5 py-0.5">Cards</span>
                <span className="rounded bg-slate-800 px-1.5 py-0.5">Netbanking</span>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="mt-10 border-t border-slate-800/80 pt-6 text-[11px] text-slate-500 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>
            &copy; {new Date().getFullYear()} Aapka Astro (aapkaastro.com). All Rights Reserved. Astrology is an ancient interpretive science; consultations are for guidance and spiritual empowerment.
          </p>
          <div className="flex gap-4">
            <Link href="/astrologer" className="hover:text-slate-400">Astrologer Portal</Link>
            <span>•</span>
            <Link href="/privacy" className="hover:text-slate-400">Privacy Policy</Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-slate-400">Terms of Consultation</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
