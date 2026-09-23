import React from "react";
import Link from "next/link";
import { MandalaDivider } from "@/components/ui/MandalaDivider";
import { DiyaIcon } from "@/components/ui/DiyaIcon";
import {
  ShieldCheck,
  Award,
  BookOpen,
  Briefcase,
  Sparkles,
  ExternalLink,
  Users,
  CheckCircle2,
  Tv,
} from "lucide-react";
import { PLACEHOLDER_ASTROLOGER } from "@/config/placeholderContent";

export const TrustCredentialsSection: React.FC = () => {
  return (
    <section className="border-t border-b border-[#E8D8C3] bg-gradient-to-b from-[#FFFDF9] to-[#FBF3E7] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E8A33D]/60 bg-[#FFFDF9] px-4 py-1 text-xs font-bold text-[#7B2D26] shadow-2xs mb-3">
            <ShieldCheck className="h-3.5 w-3.5 text-[#6B8E5A]" />
            <span>Verifiable Vedic Mastery &bull; Zero Marketplace Gimmicks</span>
          </div>

          <h2 className="font-temple text-3xl sm:text-4xl font-bold text-[#7B2D26]">
            Why Seekers Trust {PLACEHOLDER_ASTROLOGER.displayName}
          </h2>

          <p className="mt-3 text-sm text-[#6E5545] leading-relaxed">
            Unlike anonymous marketplace platforms with thousands of unvetted profiles, Aapka Astro provides direct 1-on-1 access to a distinguished scholar blending classical Parashari Jyotish with boardroom-level strategic acumen.
          </p>

          <div className="flex justify-center my-4">
            <MandalaDivider className="w-28 text-[#C1662F]" />
          </div>
        </div>

        {/* Solo Practitioner Trust Badges Strip */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-3 rounded-2xl border border-[#E8D8C3] bg-[#FFFDF9] p-4 shadow-2xs">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#7B2D26]/10 text-[#7B2D26]">
              <Award className="h-5 w-5 text-[#7B2D26]" />
            </div>
            <div>
              <div className="font-temple text-xs font-bold text-[#7B2D26]">Certified Vedic Astrologer</div>
              <div className="text-[10px] text-[#6E5545]">Jyotish Acharya &bull; BVB New Delhi</div>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-[#E8D8C3] bg-[#FFFDF9] p-4 shadow-2xs">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#6B8E5A]/15 text-[#6B8E5A]">
              <ShieldCheck className="h-5 w-5 text-[#6B8E5A]" />
            </div>
            <div>
              <div className="font-temple text-xs font-bold text-[#7B2D26]">100% Confidential</div>
              <div className="text-[10px] text-[#6E5545]">Private 1-on-1 Consultations Only</div>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-[#E8D8C3] bg-[#FFFDF9] p-4 shadow-2xs">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E8A33D]/15 text-[#C1662F]">
              <CheckCircle2 className="h-5 w-5 text-[#C1662F]" />
            </div>
            <div>
              <div className="font-temple text-xs font-bold text-[#7B2D26]">Direct Access to Acharya Ji</div>
              <div className="text-[10px] text-[#6E5545]">No Junior Astrologers or Bots</div>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-[#E8D8C3] bg-[#FFFDF9] p-4 shadow-2xs">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#7B2D26]/10 text-[#7B2D26]">
              <ShieldCheck className="h-5 w-5 text-[#7B2D26]" />
            </div>
            <div>
              <div className="font-temple text-xs font-bold text-[#7B2D26]">Secure Payments</div>
              <div className="text-[10px] text-[#6E5545]">Encrypted via Razorpay &bull; UPI / Cards</div>
            </div>
          </div>
        </div>

        {/* 4 Pillars of Authority */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Pillar 1 */}
          <div className="rounded-2xl border border-[#E8D8C3] bg-[#FFFDF9] p-6 shadow-xs hover:border-[#C1662F] transition-colors">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#7B2D26]/10 text-[#7B2D26] mb-4">
              <Award className="h-6 w-6" />
            </div>
            <h3 className="font-temple text-lg font-bold text-[#7B2D26]">
              20+ Years &amp; 15,000+ Charts
            </h3>
            <p className="mt-2 text-xs text-[#6E5545] leading-relaxed">
              Two decades of exhaustive natal chart reading across 32 countries, deciphering intricate planetary dashas and Gochara transits with surgical precision.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="rounded-2xl border border-[#E8D8C3] bg-[#FFFDF9] p-6 shadow-xs hover:border-[#C1662F] transition-colors">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E8A33D]/15 text-[#C1662F] mb-4">
              <BookOpen className="h-6 w-6" />
            </div>
            <h3 className="font-temple text-lg font-bold text-[#7B2D26]">
              Bhartiya Vidya Bhawan
            </h3>
            <p className="mt-2 text-xs text-[#6E5545] leading-relaxed">
              Formally earned <em>Jyotish Acharya</em> degree from the prestigious K.N. Rao Institute, complemented by M.A. in Jyotish and ICAS Nadi Parveen honors.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="rounded-2xl border border-[#E8D8C3] bg-[#FFFDF9] p-6 shadow-xs hover:border-[#C1662F] transition-colors">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#6B8E5A]/15 text-[#6B8E5A] mb-4">
              <Briefcase className="h-6 w-6" />
            </div>
            <h3 className="font-temple text-lg font-bold text-[#7B2D26]">
              Fortune-50 Corporate VP
            </h3>
            <p className="mt-2 text-xs text-[#6E5545] leading-relaxed">
              Former Vice President at Reliance Retail &amp; Metro Cash &amp; Carry; XLRI alumnus. Unique capacity to guide CXOs, founders, and professionals on career crossroads.
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="rounded-2xl border border-[#E8D8C3] bg-[#FFFDF9] p-6 shadow-xs hover:border-[#C1662F] transition-colors">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#7B2D26]/10 text-[#7B2D26] mb-4">
              <DiyaIcon size={24} />
            </div>
            <h3 className="font-temple text-lg font-bold text-[#7B2D26]">
              Baidyanath Dham Lineage
            </h3>
            <p className="mt-2 text-xs text-[#6E5545] leading-relaxed">
              Born in sacred Deoghar and initiated under Late Guru Shri B. B. Tiwari. Authentic Vedic spiritual remedies with zero fear-mongering or commercial rituals.
            </p>
          </div>
        </div>

        {/* Media & Press Recognition Strip */}
        <div className="mt-12 rounded-3xl border border-[#E8D8C3] bg-[#FFFDF9] p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#E8D8C3]/60 pb-6 mb-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#7B2D26] text-[#E8A33D]">
                <Tv className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-temple text-base font-bold text-[#7B2D26]">
                  Media Discourse &amp; Press Features
                </h3>
                <p className="text-xs text-[#6E5545]">
                  Recognized thought leadership in national news broadcasts, publications, and Vedic seminars
                </p>
              </div>
            </div>

            <Link
              href="/about#credentials"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7B2D26] hover:text-[#96372E] transition-colors"
            >
              <span>View Verified Certificates &amp; Awards</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* PLACEHOLDER: replace with real content - Media press badges to be replaced with verified video links / article clippings once provided by client */}
          {/* Media Badges Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="flex flex-col items-center justify-center rounded-2xl border border-[#E8D8C3]/80 bg-[#FBF3E7]/60 p-4 text-center">
              <span className="font-serif text-lg font-bold text-[#7B2D26] tracking-wider">
                AAJ TAK
              </span>
              <span className="text-[10px] text-[#6E5545] mt-1">Solar Eclipse Discourse</span>
            </div>

            <div className="flex flex-col items-center justify-center rounded-2xl border border-[#E8D8C3]/80 bg-[#FBF3E7]/60 p-4 text-center">
              <span className="font-serif text-lg font-bold text-[#7B2D26] tracking-wider">
                ZEE NEWS
              </span>
              <span className="text-[10px] text-[#6E5545] mt-1">Vedic Panchang Panel</span>
            </div>

            <div className="flex flex-col items-center justify-center rounded-2xl border border-[#E8D8C3]/80 bg-[#FBF3E7]/60 p-4 text-center">
              <span className="font-serif text-lg font-bold text-[#7B2D26] tracking-wider">
                HINDUSTAN TIMES
              </span>
              <span className="text-[10px] text-[#6E5545] mt-1">Devta Vastu Editorial</span>
            </div>

            <div className="flex flex-col items-center justify-center rounded-2xl border border-[#E8D8C3]/80 bg-[#FBF3E7]/60 p-4 text-center">
              <span className="font-serif text-lg font-bold text-[#7B2D26] tracking-wider">
                DAINIK JAGRAN
              </span>
              <span className="text-[10px] text-[#6E5545] mt-1">Annual Horoscope Column</span>
            </div>
          </div>

          {/* Subtle Disclaimer as requested by spec */}
          <div className="mt-4 text-center">
            <span className="text-[10px] text-[#6E5545]/70 italic">
              * Media citations represent Acharya Ji&apos;s television discourses and published astrological panels.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
