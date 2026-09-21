"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AdminStore, PricingSettings } from "@/lib/store/adminStore";
import { MandalaDivider } from "@/components/ui/MandalaDivider";
import { DiyaIcon } from "@/components/ui/DiyaIcon";
import {
  DollarSign,
  ArrowLeft,
  Save,
  CheckCircle2,
  Percent,
  Sliders,
  Sparkles,
  PhoneCall,
  Video,
  MessageSquare,
} from "lucide-react";

export default function AdminPricingPage() {
  const [pricing, setPricing] = useState<PricingSettings>(() => AdminStore.getPricing());
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    AdminStore.updatePricing(pricing);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="bg-[#FBF3E7] text-[#3B2A1E] min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Navigation & Header */}
        <div>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7B2D26] hover:underline mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </Link>

          <div className="flex items-center justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-md bg-[#7B2D26] px-2 py-0.5 text-[10px] font-bold text-white uppercase mb-1">
                Admin Settings
              </div>
              <h1 className="font-temple text-2xl sm:text-3xl font-bold text-[#7B2D26]">
                Consultation Pricing &amp; Discount Rules
              </h1>
              <p className="text-xs sm:text-sm text-[#6E5545] mt-1">
                Update live per-minute consultation rates, intro discounts, and minimum recharge limits in real-time.
              </p>
            </div>
          </div>
        </div>

        {saved && (
          <div className="rounded-2xl border border-[#6B8E5A]/40 bg-[#F4F9F2] p-4 text-xs font-bold text-[#2A4720] flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-[#6B8E5A]" />
            <span>
              Rates updated successfully! All platform banners, booking meters, and timers now reflect new pricing.
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Per-minute Rates Box */}
          <div className="rounded-3xl border border-[#E8D8C3] bg-[#FFFDF9] p-8 shadow-sm space-y-6">
            <h3 className="font-temple text-lg font-bold text-[#7B2D26] flex items-center gap-2">
              <Sliders className="h-5 w-5 text-[#C1662F]" />
              <span>Base Consultation Rates (Per Minute)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Chat Rate */}
              <div className="rounded-2xl border border-[#E8D8C3] bg-[#FBF3E7] p-5">
                <div className="flex items-center gap-2 text-xs font-bold text-[#7B2D26] mb-3">
                  <MessageSquare className="h-4 w-4 text-[#C1662F]" />
                  <span>Live Chat</span>
                </div>
                <label className="block text-[11px] text-[#6E5545] mb-1">
                  Rate per minute (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-[#7B2D26]">
                    ₹
                  </span>
                  <input
                    type="number"
                    min={5}
                    max={200}
                    value={pricing.chatRate}
                    onChange={(e) =>
                      setPricing({ ...pricing, chatRate: Number(e.target.value) })
                    }
                    className="w-full rounded-xl border border-[#E8D8C3] bg-[#FFFDF9] py-2.5 pl-8 pr-3 font-mono text-base font-bold text-[#7B2D26] focus:outline-none focus:ring-2 focus:ring-[#7B2D26]"
                  />
                </div>
                <span className="mt-2 block text-[10px] text-[#6E5545]">
                  With {pricing.discountPercentage}% off: ₹{(pricing.chatRate * (1 - pricing.discountPercentage / 100)).toFixed(1)}/min
                </span>
              </div>

              {/* Voice Rate */}
              <div className="rounded-2xl border border-[#E8D8C3] bg-[#FBF3E7] p-5">
                <div className="flex items-center gap-2 text-xs font-bold text-[#7B2D26] mb-3">
                  <PhoneCall className="h-4 w-4 text-[#6B8E5A]" />
                  <span>Voice Call</span>
                </div>
                <label className="block text-[11px] text-[#6E5545] mb-1">
                  Rate per minute (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-[#7B2D26]">
                    ₹
                  </span>
                  <input
                    type="number"
                    min={5}
                    max={250}
                    value={pricing.voiceRate}
                    onChange={(e) =>
                      setPricing({ ...pricing, voiceRate: Number(e.target.value) })
                    }
                    className="w-full rounded-xl border border-[#E8D8C3] bg-[#FFFDF9] py-2.5 pl-8 pr-3 font-mono text-base font-bold text-[#7B2D26] focus:outline-none focus:ring-2 focus:ring-[#7B2D26]"
                  />
                </div>
                <span className="mt-2 block text-[10px] text-[#6E5545]">
                  With {pricing.discountPercentage}% off: ₹{(pricing.voiceRate * (1 - pricing.discountPercentage / 100)).toFixed(1)}/min
                </span>
              </div>

              {/* Video Rate */}
              <div className="rounded-2xl border border-[#E8D8C3] bg-[#FBF3E7] p-5">
                <div className="flex items-center gap-2 text-xs font-bold text-[#7B2D26] mb-3">
                  <Video className="h-4 w-4 text-[#E8A33D]" />
                  <span>Video Call</span>
                </div>
                <label className="block text-[11px] text-[#6E5545] mb-1">
                  Rate per minute (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-[#7B2D26]">
                    ₹
                  </span>
                  <input
                    type="number"
                    min={5}
                    max={300}
                    value={pricing.videoRate}
                    onChange={(e) =>
                      setPricing({ ...pricing, videoRate: Number(e.target.value) })
                    }
                    className="w-full rounded-xl border border-[#E8D8C3] bg-[#FFFDF9] py-2.5 pl-8 pr-3 font-mono text-base font-bold text-[#7B2D26] focus:outline-none focus:ring-2 focus:ring-[#7B2D26]"
                  />
                </div>
                <span className="mt-2 block text-[10px] text-[#6E5545]">
                  With {pricing.discountPercentage}% off: ₹{(pricing.videoRate * (1 - pricing.discountPercentage / 100)).toFixed(1)}/min
                </span>
              </div>
            </div>
          </div>

          {/* Promotional Rules */}
          <div className="rounded-3xl border border-[#E8D8C3] bg-[#FFFDF9] p-8 shadow-sm space-y-6">
            <h3 className="font-temple text-lg font-bold text-[#7B2D26] flex items-center gap-2">
              <Percent className="h-5 w-5 text-[#E8A33D]" />
              <span>Promotional &amp; Wallet Thresholds</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
              <div>
                <label className="block font-bold text-[#3B2A1E] mb-1">
                  First Consultation Discount (%)
                </label>
                <input
                  type="number"
                  min={0}
                  max={90}
                  value={pricing.discountPercentage}
                  onChange={(e) =>
                    setPricing({ ...pricing, discountPercentage: Number(e.target.value) })
                  }
                  className="w-full rounded-xl border border-[#E8D8C3] bg-[#FBF3E7] p-3 font-mono text-sm font-bold text-[#7B2D26] focus:outline-none focus:ring-2 focus:ring-[#7B2D26]"
                />
                <span className="text-[11px] text-[#6E5545] mt-1 block">
                  Automatically applied once per verified client account.
                </span>
              </div>

              <div>
                <label className="block font-bold text-[#3B2A1E] mb-1">
                  Minimum Wallet Recharge (₹)
                </label>
                <input
                  type="number"
                  min={50}
                  value={pricing.minimumRechargeAmount}
                  onChange={(e) =>
                    setPricing({ ...pricing, minimumRechargeAmount: Number(e.target.value) })
                  }
                  className="w-full rounded-xl border border-[#E8D8C3] bg-[#FBF3E7] p-3 font-mono text-sm font-bold text-[#7B2D26] focus:outline-none focus:ring-2 focus:ring-[#7B2D26]"
                />
                <span className="text-[11px] text-[#6E5545] mt-1 block">
                  Prevents sub-optimal payment gateway transaction charges.
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="rounded-xl bg-[#7B2D26] px-8 py-3 text-xs sm:text-sm font-bold text-[#FBF3E7] hover:bg-[#96372E] transition-all shadow-md flex items-center gap-2"
            >
              <Save className="h-4 w-4 text-[#E8A33D]" />
              <span>Save &amp; Apply Pricing Rules</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
