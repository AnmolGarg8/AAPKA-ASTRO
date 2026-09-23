"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Sparkles, CheckCircle2, ShieldCheck, ArrowRight, Star, Clock, Award } from "lucide-react";
import { DiyaIcon } from "@/components/ui/DiyaIcon";
import { PLACEHOLDER_ASTROLOGER, ADMIN_CONFIGURABLE_PRICING, FIRST_CONSULTATION_OFFER } from "@/config/placeholderContent";

export const WELCOME_MODAL_STORAGE_KEY = "aapka_welcome_modal_dismissed";

interface WelcomeConsultationModalProps {
  /** Optional delay in milliseconds before displaying the modal on first visit. Default: 2000ms */
  delayMs?: number;
  /** Force open for preview/testing purposes */
  forceOpen?: boolean;
}

export function WelcomeConsultationModal({
  delayMs = 2000,
  forceOpen = false,
}: WelcomeConsultationModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    if (forceOpen) {
      setIsOpen(true);
      return;
    }

    // Check if user has already dismissed or interacted with the welcome modal
    try {
      const isDismissed = localStorage.getItem(WELCOME_MODAL_STORAGE_KEY);
      if (!isDismissed) {
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, delayMs);
        return () => clearTimeout(timer);
      }
    } catch {
      // LocalStorage not available or blocked, skip automatic popup
    }
  }, [delayMs, forceOpen]);

  const handleDismiss = useCallback(() => {
    setIsOpen(false);
    try {
      localStorage.setItem(WELCOME_MODAL_STORAGE_KEY, "true");
    } catch {
      // Ignore storage errors
    }
  }, []);

  // Handle escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleDismiss();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleDismiss]);

  if (!mounted || !isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto bg-black/65 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
    >
      {/* Backdrop overlay dismiss */}
      <div
        className="fixed inset-0"
        onClick={handleDismiss}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border-2 border-[#E8A33D]/50 bg-[#FFFDF9] text-[#3B2A1E] shadow-2xl z-10 my-auto transition-all transform animate-in zoom-in-95 duration-200">
        {/* Top Decorative Border Accent */}
        <div className="h-2 w-full bg-gradient-to-r from-[#7B2D26] via-[#E8A33D] to-[#7B2D26]" />

        {/* Close Button */}
        <button
          type="button"
          onClick={handleDismiss}
          className="absolute right-3.5 top-4.5 z-20 rounded-full bg-[#FBF3E7] p-1.5 text-[#6E5545] hover:bg-[#E8D8C3] hover:text-[#7B2D26] transition-colors focus:outline-hidden focus:ring-2 focus:ring-[#7B2D26]"
          aria-label="Close welcome offer modal"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-5 sm:p-6 space-y-4 sm:space-y-5">
          {/* Header Badge & Title */}
          <div className="text-center space-y-1.5 pt-1">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-[#E8A33D]/60 bg-[#FBF3E7] px-3 py-1 text-xs font-bold text-[#7B2D26] shadow-xs">
              <DiyaIcon size={13} />
              <span className="tracking-wide uppercase">First-Visit Welcome Offer</span>
              <Sparkles className="h-3 w-3 text-[#E8A33D]" />
            </div>

            {/* Strict Client Offer Headline: 50% Off Your First Consultation (NEVER "Free") */}
            <h2
              id="welcome-modal-title"
              className="font-temple text-2xl sm:text-3xl font-extrabold text-[#7B2D26] tracking-tight leading-tight"
            >
              50% Off Your First Consultation
            </h2>
            <p className="text-xs sm:text-sm text-[#6E5545] font-medium">
              Direct 1-on-1 Guidance with {PLACEHOLDER_ASTROLOGER.displayName}
            </p>
          </div>

          {/* Simulated Chat Preview with Acharya Niraj Kumar */}
          <div className="rounded-2xl border border-[#E8D8C3] bg-[#FBF3E7] p-3 sm:p-4 space-y-3 shadow-inner">
            {/* Practitioner Status Bar */}
            <div className="flex items-center justify-between border-b border-[#E8D8C3]/80 pb-2.5">
              <div className="flex items-center gap-2.5">
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border-2 border-[#E8A33D]">
                  <Image
                    src={PLACEHOLDER_ASTROLOGER.avatarUrl}
                    alt={PLACEHOLDER_ASTROLOGER.displayName}
                    fill
                    sizes="40px"
                    className="object-cover object-top"
                  />
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-[#FFFDF9]" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs sm:text-sm font-bold text-[#3B2A1E]">
                      {PLACEHOLDER_ASTROLOGER.displayName}
                    </span>
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#E8A33D] fill-[#E8A33D]/20 shrink-0" />
                  </div>
                  <p className="text-[11px] text-[#6E5545]">
                    Baidyanath Dham Lineage • 24+ Yrs Exp
                  </p>
                </div>
              </div>
              <div className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Available Now</span>
              </div>
            </div>

            {/* Chat Messages Preview */}
            <div className="space-y-2 text-xs">
              {/* Seeker Message */}
              <div className="flex justify-end">
                <div className="max-w-[85%] rounded-2xl rounded-tr-xs bg-[#7B2D26] px-3.5 py-2 text-[#FFFDF9] shadow-xs">
                  <p className="leading-relaxed">
                    Pranam Acharya Ji! Seeking clarity on my career transition & financial stability.
                  </p>
                  <span className="mt-0.5 block text-right text-[10px] text-[#FBF3E7]/70">
                    Just now
                  </span>
                </div>
              </div>

              {/* Acharya Response */}
              <div className="flex justify-start">
                <div className="max-w-[88%] rounded-2xl rounded-tl-xs bg-[#FFFDF9] border border-[#E8D8C3] px-3.5 py-2 text-[#3B2A1E] shadow-xs">
                  <p className="leading-relaxed">
                    Namaskar! Saturn&apos;s transit over your 10th house indicates karmic restructuring. Let us examine your D1 and D9 charts together for an exact turnaround timeline.
                  </p>
                  <div className="mt-1 flex items-center justify-between text-[10px] text-[#6E5545]">
                    <span className="font-semibold text-[#7B2D26]">Verified Vedic Scholar</span>
                    <span>1-on-1 private reading</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Consultation Topics */}
            <div className="pt-1 flex flex-wrap gap-1.5 text-[10px] font-medium text-[#7B2D26]">
              <span className="rounded-md bg-[#FFFDF9] border border-[#E8D8C3] px-2 py-0.5">
                💼 Career & Job
              </span>
              <span className="rounded-md bg-[#FFFDF9] border border-[#E8D8C3] px-2 py-0.5">
                💍 Kundli Milan
              </span>
              <span className="rounded-md bg-[#FFFDF9] border border-[#E8D8C3] px-2 py-0.5">
                💰 Wealth & Business
              </span>
              <span className="rounded-md bg-[#FFFDF9] border border-[#E8D8C3] px-2 py-0.5">
                🏡 Devta Vastu
              </span>
            </div>
          </div>

          {/* Authentic Trust Metrics (Client Reality - Not Astrotalk scale) */}
          <div className="grid grid-cols-4 gap-2 rounded-xl border border-[#E8D8C3] bg-[#FFFDF9] p-2.5 text-center">
            <div className="space-y-0.5">
              <div className="flex items-center justify-center text-[#E8A33D]">
                <Clock className="h-3.5 w-3.5" />
              </div>
              <div className="text-xs sm:text-sm font-bold text-[#7B2D26]">24+ Yrs</div>
              <div className="text-[9px] text-[#6E5545] uppercase tracking-wider">Vedic Mastery</div>
            </div>
            <div className="space-y-0.5 border-l border-[#E8D8C3]">
              <div className="flex items-center justify-center text-[#E8A33D]">
                <Award className="h-3.5 w-3.5" />
              </div>
              <div className="text-xs sm:text-sm font-bold text-[#7B2D26]">15,000+</div>
              <div className="text-[9px] text-[#6E5545] uppercase tracking-wider">Consultations</div>
            </div>
            <div className="space-y-0.5 border-l border-[#E8D8C3]">
              <div className="flex items-center justify-center text-[#E8A33D]">
                <Star className="h-3.5 w-3.5 fill-[#E8A33D]" />
              </div>
              <div className="text-xs sm:text-sm font-bold text-[#7B2D26]">4.9 ★</div>
              <div className="text-[9px] text-[#6E5545] uppercase tracking-wider">Rating</div>
            </div>
            <div className="space-y-0.5 border-l border-[#E8D8C3]">
              <div className="flex items-center justify-center text-[#E8A33D]">
                <ShieldCheck className="h-3.5 w-3.5" />
              </div>
              <div className="text-xs sm:text-sm font-bold text-[#7B2D26]">100%</div>
              <div className="text-[9px] text-[#6E5545] uppercase tracking-wider">Confidential</div>
            </div>
          </div>

          {/* Transparent 50% Off First-Time Pricing */}
          <div className="rounded-xl bg-[#FBF3E7] p-2.5 border border-[#E8D8C3] flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 font-bold text-[#7B2D26]">
              <span>Special First-Time Rates:</span>
            </div>
            <div className="flex items-center gap-3 text-[11px] font-medium text-[#3B2A1E]">
              <div>
                Chat: <span className="font-bold text-[#7B2D26]">₹{ADMIN_CONFIGURABLE_PRICING.chat.effectiveFirstTimeRate}/min</span>{" "}
                <span className="line-through text-[#6E5545]/70 text-[10px]">₹{ADMIN_CONFIGURABLE_PRICING.chat.ratePerMinute}</span>
              </div>
              <div className="border-l border-[#E8D8C3] pl-2">
                Call: <span className="font-bold text-[#7B2D26]">₹{ADMIN_CONFIGURABLE_PRICING.voice.effectiveFirstTimeRate}/min</span>{" "}
                <span className="line-through text-[#6E5545]/70 text-[10px]">₹{ADMIN_CONFIGURABLE_PRICING.voice.ratePerMinute}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-1">
            <Link
              href={`/consult?offer=${FIRST_CONSULTATION_OFFER.code}`}
              onClick={handleDismiss}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#7B2D26] via-[#9E3A31] to-[#7B2D26] py-3.5 px-6 font-bold text-[#FFFDF9] shadow-md hover:from-[#64221C] hover:to-[#64221C] hover:shadow-lg transition-all focus:outline-hidden focus:ring-2 focus:ring-[#7B2D26] focus:ring-offset-2"
            >
              <span>Claim 50% Off & Start Consultation</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <div className="text-center">
              <button
                type="button"
                onClick={handleDismiss}
                className="text-xs text-[#6E5545] hover:text-[#7B2D26] underline underline-offset-4 font-medium transition-colors"
              >
                No thanks, continue browsing
              </button>
            </div>
          </div>

          {/* Footer Guarantee */}
          <div className="flex items-center justify-center gap-1 text-[11px] text-[#6E5545]">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            <span>Promo code {FIRST_CONSULTATION_OFFER.code} auto-applied • Authentic Vedic Ephemeris</span>
          </div>
        </div>
      </div>
    </div>
  );
}
