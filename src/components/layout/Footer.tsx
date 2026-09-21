"use client";

import React from "react";
import Link from "next/link";
import { Lock, Award, Heart, Phone, Mail, MapPin, ShieldCheck } from "lucide-react";
import { MandalaDivider } from "@/components/ui/MandalaDivider";
import { PLACEHOLDER_ASTROLOGER, PLACEHOLDER_SOCIAL_LINKS } from "@/config/placeholderContent";

// Social Icons as direct SVG components
const InstagramIcon: React.FC<{ className?: string }> = ({ className = "h-4 w-4" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const YoutubeIcon: React.FC<{ className?: string }> = ({ className = "h-4 w-4" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <polygon points="10 15 15 12 10 9 10 15" />
  </svg>
);

const FacebookIcon: React.FC<{ className?: string }> = ({ className = "h-4 w-4" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[#E8D8C3] bg-[#7B2D26] text-[#FBF3E7] text-xs">
      {/* Trust Marks Banner */}
      {/* PLACEHOLDER: replace with real content */}
      <div className="border-b border-[#FBF3E7]/15 bg-[#64221C] py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <Award className="h-6 w-6 text-[#E8A33D] mb-1.5" />
              <span className="font-temple font-bold text-[#FBF3E7]">Over {PLACEHOLDER_ASTROLOGER.experienceYears} Years Vedic Mastery</span>
              <span className="text-[11px] text-[#FBF3E7]/70">Trained in Traditional Vedic Sciences</span>
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
              <span className="font-temple font-bold text-[#FBF3E7]">{PLACEHOLDER_ASTROLOGER.followersCount} Followers</span>
              <span className="text-[11px] text-[#FBF3E7]/70">Growing Trusted Community</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info & Tagline */}
          {/* PLACEHOLDER: replace with real content */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E8A33D] text-[#3B2A1E] font-temple font-black">
                <span>ॐ</span>
              </div>
              <span className="font-temple text-lg font-bold tracking-wider text-[#FBF3E7]">
                AAPKA<span className="text-[#E8A33D]">ASTRO</span>
              </span>
            </div>
            <p className="text-xs text-[#FBF3E7]/90 font-semibold font-temple">
              {PLACEHOLDER_ASTROLOGER.tagline}
            </p>
            <p className="text-xs text-[#FBF3E7]/80 leading-relaxed font-body">
              India&apos;s sacred sanctuary for authentic Vedic astrology, Janampatri analysis, and non-demolition Vastu Shastra. Consultations conducted personally by {PLACEHOLDER_ASTROLOGER.displayName}.
            </p>

            {/* Social Links: Placeholder URLs */}
            {/* PLACEHOLDER: replace with real content. NOTE: Real social media handles will be provided later by the business owner. */}
            <div className="pt-2">
              <div className="text-[11px] font-bold text-[#E8A33D] uppercase tracking-wider mb-2 font-temple">
                Connect With Acharya Ji
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={PLACEHOLDER_SOCIAL_LINKS.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram (Placeholder)"
                  className="rounded-lg bg-[#64221C] p-2 text-[#FBF3E7] hover:bg-[#E8A33D] hover:text-[#3B2A1E] transition-colors"
                >
                  <InstagramIcon className="h-4 w-4" />
                </a>
                <a
                  href={PLACEHOLDER_SOCIAL_LINKS.youtube.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube (Placeholder)"
                  className="rounded-lg bg-[#64221C] p-2 text-[#FBF3E7] hover:bg-[#E8A33D] hover:text-[#3B2A1E] transition-colors"
                >
                  <YoutubeIcon className="h-4 w-4" />
                </a>
                <a
                  href={PLACEHOLDER_SOCIAL_LINKS.facebook.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook (Placeholder)"
                  className="rounded-lg bg-[#64221C] p-2 text-[#FBF3E7] hover:bg-[#E8A33D] hover:text-[#3B2A1E] transition-colors"
                >
                  <FacebookIcon className="h-4 w-4" />
                </a>
              </div>
              <div className="text-[10px] text-[#FBF3E7]/50 mt-1 italic">
                {/* NOTE: Real social media handles will be provided later */}
                Official social channels
              </div>
            </div>
          </div>

          {/* Quick Tools & Resources */}
          <div>
            <h4 className="font-temple text-xs font-bold uppercase tracking-wider text-[#E8A33D] mb-3">
              Tools &amp; Panchang
            </h4>
            <ul className="space-y-2 text-[#FBF3E7]/80">
              <li>
                <Link href="/kundli-generator" className="hover:text-[#E8A33D] transition-colors">
                  Free Kundli Generator
                </Link>
              </li>
              <li>
                <Link href="/panchang" className="hover:text-[#E8A33D] transition-colors">
                  Daily Vedic Panchang
                </Link>
              </li>
              <li>
                <Link href="/reels" className="hover:text-[#E8A33D] transition-colors">
                  Instagram Reels Gallery
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#E8A33D] transition-colors">
                  Vedic Astrology Journal
                </Link>
              </li>
              <li>
                <Link href="/kundli-matching" className="hover:text-[#E8A33D] transition-colors">
                  Kundli Milan (36 Guna)
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-temple text-xs font-bold uppercase tracking-wider text-[#E8A33D] mb-3">
              Vedic Services
            </h4>
            <ul className="space-y-2 text-[#FBF3E7]/80">
              <li>
                <Link href="/services/kundli" className="hover:text-[#E8A33D] transition-colors">
                  Kundli &amp; Horoscope
                </Link>
              </li>
              <li>
                <Link href="/services/vastu" className="hover:text-[#E8A33D] transition-colors">
                  Vastu Consultancy
                </Link>
              </li>
              <li>
                <Link href="/services/gemstone" className="hover:text-[#E8A33D] transition-colors">
                  Gemstone Recommendation
                </Link>
              </li>
              <li>
                <Link href="/services/live-consultation" className="hover:text-[#E8A33D] transition-colors">
                  Live Consultation Room
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#E8A33D] transition-colors">
                  Explore All Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Sacred Desk & Portals */}
          <div>
            <h4 className="font-temple text-xs font-bold uppercase tracking-wider text-[#E8A33D] mb-3">
              Aapka Astro Sanctuary
            </h4>
            <ul className="space-y-2 text-[#FBF3E7]/80">
              <li>
                <Link href="/about" className="hover:text-[#E8A33D] transition-colors">
                  About Acharya Ji
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="hover:text-[#E8A33D] transition-colors">
                  Seeker Testimonials
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#E8A33D] transition-colors">
                  Contact &amp; Helpline
                </Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-[#E8A33D] transition-colors">
                  Seeker Account Portal
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-[#E8A33D] hover:underline font-bold">
                  Operator Cockpit
                </Link>
              </li>
            </ul>

            <ul className="mt-4 space-y-2.5 text-[#FBF3E7]/80">
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
                <span>Varanasi &bull; New Delhi &bull; Global Online Consultations</span>
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
