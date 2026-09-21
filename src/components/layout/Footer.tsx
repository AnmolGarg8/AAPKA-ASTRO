"use client";

import React from "react";
import Link from "next/link";
import { Lock, Award, Heart, Phone, Mail, MapPin, ShieldCheck } from "lucide-react";
import { MandalaDivider } from "@/components/ui/MandalaDivider";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[#E8D8C3] bg-[#7B2D26] text-[#FBF3E7] text-xs">
      {/* Trust Marks Banner */}
      <div className="border-b border-[#FBF3E7]/15 bg-[#64221C] py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <Award className="h-6 w-6 text-[#E8A33D] mb-1.5" />
              <span className="font-temple font-bold text-[#FBF3E7]">18+ Years Vedic Mastery</span>
              <span className="text-[11px] text-[#FBF3E7]/70">Gold Medalist Scholar (BHU)</span>
            </div>
            <div className="flex flex-col items-center">
              <Lock className="h-6 w-6 text-[#E8A33D] mb-1.5" />
              <span className="font-temple font-bold text-[#FBF3E7]">100% Confidential</span>
              <span className="text-[11px] text-[#FBF3E7]/70">Private 1-on-1 Consultation</span>
            </div>
            <div className="flex flex-col items-center">
              <ShieldCheck className="h-6 w-6 text-[#E8A33D] mb-1.5" />
              <span className="font-temple font-bold text-[#FBF3E7]">Govt. Certified Gemstones</span>
              <span className="text-[11px] text-[#FBF3E7]/70">100% Natural &amp; Energized</span>
            </div>
            <div className="flex flex-col items-center">
              <Heart className="h-6 w-6 text-[#E8A33D] mb-1.5" />
              <span className="font-temple font-bold text-[#FBF3E7]">35,000+ Satisfied Clients</span>
              <span className="text-[11px] text-[#FBF3E7]/70">4.98/5 Rated Across India</span>
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
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E8A33D] text-[#3B2A1E] font-temple font-black">
                <span>ॐ</span>
              </div>
              <span className="font-temple text-lg font-bold tracking-wider text-[#FBF3E7]">
                AAPKA<span className="text-[#E8A33D]">ASTRO</span>
              </span>
            </div>
            <p className="text-xs text-[#FBF3E7]/80 leading-relaxed">
              India&apos;s sacred sanctuary for authentic Vedic astrology, Janampatri analysis, and non-demolition Vastu Shastra. Consultations conducted personally by Acharya Rajesh Sharma.
            </p>
            <div className="text-[11px] text-[#E8A33D] font-bold">
              Varanasi &bull; New Delhi &bull; Global Consultations
            </div>
          </div>

          {/* Quick Tools */}
          <div>
            <h4 className="font-temple text-xs font-bold uppercase tracking-wider text-[#E8A33D] mb-3">
              Vedic Astrology Tools
            </h4>
            <ul className="space-y-2 text-[#FBF3E7]/80">
              <li>
                <Link href="/kundli" className="hover:text-[#E8A33D] transition-colors">
                  Janam Kundli Calculator
                </Link>
              </li>
              <li>
                <Link href="/kundli-matching" className="hover:text-[#E8A33D] transition-colors">
                  Kundli Milan (36 Gun Matching)
                </Link>
              </li>
              <li>
                <Link href="/consult" className="hover:text-[#E8A33D] transition-colors">
                  Live Consultation Waitlist
                </Link>
              </li>
              <li>
                <Link href="/wallet" className="hover:text-[#E8A33D] transition-colors">
                  Consultation Wallet &amp; Offers
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-temple text-xs font-bold uppercase tracking-wider text-[#E8A33D] mb-3">
              Signature Consultations
            </h4>
            <ul className="space-y-2 text-[#FBF3E7]/80">
              <li>
                <Link href="/consult" className="hover:text-[#E8A33D] transition-colors">
                  Career &amp; Business Astrology
                </Link>
              </li>
              <li>
                <Link href="/consult" className="hover:text-[#E8A33D] transition-colors">
                  Marriage &amp; Relationship Dasha
                </Link>
              </li>
              <li>
                <Link href="/vastu" className="hover:text-[#E8A33D] transition-colors">
                  Residential &amp; Commercial Vastu
                </Link>
              </li>
              <li>
                <Link href="/gemstones" className="hover:text-[#E8A33D] transition-colors">
                  Natural Certified Gemstones
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Desk */}
          <div>
            <h4 className="font-temple text-xs font-bold uppercase tracking-wider text-[#E8A33D] mb-3">
              Sacred Desk
            </h4>
            <ul className="space-y-2.5 text-[#FBF3E7]/80">
              <li className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-[#E8A33D]" />
                <span>+91 98100 XXXXX (Official Desk)</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-[#E8A33D]" />
                <span>consult@aapkaastro.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-3.5 w-3.5 text-[#E8A33D] mt-0.5" />
                <span>Assi Ghat, Shivala, Varanasi, UP 221005</span>
              </li>
            </ul>

            <div className="mt-4 rounded-lg border border-[#FBF3E7]/15 bg-[#64221C] p-2.5">
              <div className="text-[10px] text-[#FBF3E7]/70">Accepted Payments:</div>
              <div className="mt-1 flex flex-wrap gap-1.5 font-mono text-[10px] font-bold text-[#FBF3E7]">
                <span className="rounded bg-[#7B2D26] px-1.5 py-0.5">UPI</span>
                <span className="rounded bg-[#7B2D26] px-1.5 py-0.5">GPay</span>
                <span className="rounded bg-[#7B2D26] px-1.5 py-0.5">PhonePe</span>
                <span className="rounded bg-[#7B2D26] px-1.5 py-0.5">RuPay</span>
                <span className="rounded bg-[#7B2D26] px-1.5 py-0.5">Cards</span>
              </div>
            </div>
          </div>
        </div>

        {/* Subtle Mandala Divider */}
        <MandalaDivider className="my-8 opacity-40" />

        {/* Copyright */}
        <div className="text-[11px] text-[#FBF3E7]/60 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>
            &copy; {new Date().getFullYear()} Aapka Astro (aapkaastro.com). Preserving authentic Vedic Jyotish &amp; Vastu traditions with complete confidentiality.
          </p>
          <div className="flex gap-4">
            <Link href="/astrologer" className="hover:text-[#FBF3E7]">Astrologer Portal</Link>
            <span>&bull;</span>
            <Link href="/privacy" className="hover:text-[#FBF3E7]">Privacy Policy</Link>
            <span>&bull;</span>
            <Link href="/terms" className="hover:text-[#FBF3E7]">Terms of Consultation</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
