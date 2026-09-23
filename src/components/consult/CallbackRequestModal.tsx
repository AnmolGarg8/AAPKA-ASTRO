"use client";

import React, { useState } from "react";
import { DiyaIcon } from "@/components/ui/DiyaIcon";
import { MandalaDivider } from "@/components/ui/MandalaDivider";
import {
  X,
  PhoneCall,
  Mail,
  Calendar,
  Clock,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { PLACEHOLDER_ASTROLOGER } from "@/config/placeholderContent";

interface CallbackRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  astrologerStatus?: string;
}

export const CallbackRequestModal: React.FC<CallbackRequestModalProps> = ({
  isOpen,
  onClose,
  astrologerStatus = "OFFLINE",
}) => {
  const [name, setName] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [topic, setTopic] = useState("Career & Business Direction");
  const [preferredSlot, setPreferredSlot] = useState("Morning (9 AM - 12 PM)");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || name.trim().length < 2) {
      setError("Please enter your name");
      return;
    }
    if (!identifier || identifier.trim().length < 5) {
      setError("Please enter a valid mobile number or email address");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/callback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientName: name,
          phone: identifier,
          topic,
          preferredSlot,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setError(data.message || "Could not register callback request.");
      }
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl border border-[#E8D8C3] bg-[#FFFDF9] p-6 sm:p-8 shadow-2xl">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-[#6E5545] hover:bg-[#FBF3E7] hover:text-[#3B2A1E] transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#6B8E5A]/15 text-[#6B8E5A] mb-4">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h3 className="font-temple text-2xl font-bold text-[#7B2D26]">
              Callback Request Registered
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-[#6E5545] leading-relaxed max-w-md mx-auto">
              Namaste <strong>{name}</strong>. {PLACEHOLDER_ASTROLOGER.displayName}&apos;s desk has received your consultation inquiry. We will notify you via WhatsApp or Email as soon as he becomes available.
            </p>
            <div className="mt-6">
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="rounded-xl bg-[#7B2D26] px-6 py-2.5 text-xs font-bold text-[#FBF3E7] hover:bg-[#64221C] transition-all shadow-sm"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Modal Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-[#E8A33D]/15 px-3 py-1 text-[11px] font-bold text-[#7B2D26] mb-2">
                <Clock className="h-3.5 w-3.5" />
                <span>
                  {astrologerStatus === "BUSY"
                    ? "Acharya Ji is currently in consultation"
                    : "Acharya Ji is currently offline"}
                </span>
              </div>
              <h2 className="font-temple text-xl sm:text-2xl font-bold text-[#7B2D26]">
                Request a Priority Callback
              </h2>
              <p className="mt-1 text-xs text-[#6E5545]">
                Leave your details below to hold priority placement when Acharya Ji returns online.
              </p>
              <div className="flex justify-center my-2">
                <MandalaDivider className="w-20 text-[#C1662F]" />
              </div>
            </div>

            {/* Error banner */}
            {error && (
              <div className="mb-4 rounded-xl bg-red-50 border border-red-200 p-2.5 text-xs text-red-700 font-medium">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#3B2A1E] mb-1">
                  Your Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Priya Sharma"
                  required
                  className="w-full rounded-xl border border-[#E8D8C3] bg-[#FBF3E7] px-3.5 py-2.5 text-xs text-[#3B2A1E] placeholder:text-[#6E5545]/60 focus:border-[#7B2D26] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#3B2A1E] mb-1">
                  WhatsApp Number or Email Identifier <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="e.g. +91 98765 43210 or priya@example.com"
                  required
                  className="w-full rounded-xl border border-[#E8D8C3] bg-[#FBF3E7] px-3.5 py-2.5 text-xs text-[#3B2A1E] placeholder:text-[#6E5545]/60 focus:border-[#7B2D26] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#3B2A1E] mb-1">
                    Consultation Concern
                  </label>
                  <select
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full rounded-xl border border-[#E8D8C3] bg-[#FBF3E7] px-3 py-2.5 text-xs text-[#3B2A1E] focus:border-[#7B2D26] focus:outline-none"
                  >
                    <option>Career &amp; Business Direction</option>
                    <option>Marriage &amp; Kundli Milan</option>
                    <option>Health &amp; Energy Alignment</option>
                    <option>Devta Vastu Consultation</option>
                    <option>Gemstone &amp; Puja Remedies</option>
                    <option>General Life Question</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#3B2A1E] mb-1">
                    Preferred Time Slot
                  </label>
                  <select
                    value={preferredSlot}
                    onChange={(e) => setPreferredSlot(e.target.value)}
                    className="w-full rounded-xl border border-[#E8D8C3] bg-[#FBF3E7] px-3 py-2.5 text-xs text-[#3B2A1E] focus:border-[#7B2D26] focus:outline-none"
                  >
                    <option>Morning (9:00 AM - 12:00 PM)</option>
                    <option>Afternoon (1:00 PM - 5:00 PM)</option>
                    <option>Evening (6:00 PM - 10:00 PM)</option>
                    <option>Immediate (Whenever available)</option>
                  </select>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-4 flex items-center justify-center gap-2 rounded-xl bg-[#7B2D26] py-3 text-xs font-bold text-[#FBF3E7] hover:bg-[#64221C] transition-all shadow-md disabled:opacity-50"
              >
                <PhoneCall className="h-3.5 w-3.5" />
                <span>{loading ? "Registering..." : "Notify Me & Request Callback"}</span>
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#6E5545] mt-2">
                <ShieldCheck className="h-3.5 w-3.5 text-[#6B8E5A]" />
                <span>100% Private. No spam, guaranteed.</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
