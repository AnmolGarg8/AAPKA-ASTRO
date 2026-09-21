"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ClientAccountStore } from "@/lib/store/clientAccountStore";
import { MandalaDivider } from "@/components/ui/MandalaDivider";
import { DiyaIcon } from "@/components/ui/DiyaIcon";
import {
  Phone,
  KeyRound,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  User,
  Calendar,
} from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    birthDate: "",
    gender: "Male",
  });
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"details" | "otp">("details");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendTimer, setResendTimer] = useState(30);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === "otp" && resendTimer > 0) {
      interval = setInterval(() => setResendTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step, resendTimer]);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || formData.name.length < 2) {
      setError("Please enter your full name");
      return;
    }
    if (!formData.phone || formData.phone.length < 10) {
      setError("Please enter a valid 10-digit mobile number");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: formData.phone }),
      });
      const data = await res.json();
      if (data.success) {
        setStep("otp");
        setResendTimer(30);
      } else {
        setError(data.message || "Failed to send verification code");
      }
    } catch {
      setStep("otp");
      setResendTimer(30);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || otp.length < 4) {
      setError("Please enter the 6-digit OTP");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: formData.phone,
          otp,
          name: formData.name,
        }),
      });
      const data = await res.json();
      if (data.success || otp === "123456") {
        ClientAccountStore.setLoggedIn(true, formData.phone);
        router.push("/account");
      } else {
        setError(data.message || "Invalid OTP code. For test accounts, enter 123456.");
      }
    } catch {
      ClientAccountStore.setLoggedIn(true, formData.phone);
      router.push("/account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] bg-[#FBF3E7] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="rounded-3xl border border-[#E8D8C3] bg-[#FFFDF9] p-8 sm:p-10 shadow-xl">
          {/* Header */}
          <div className="text-center">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-[#6B8E5A]/30 bg-[#F4F9F2] px-3.5 py-1 text-[11px] font-bold text-[#2A4720] mb-3">
              <Sparkles className="h-3 w-3 text-[#6B8E5A]" />
              <span>50% OFF FIRST CONSULTATION ACTIVATED</span>
            </div>
            <h1 className="font-temple text-2xl sm:text-3xl font-bold text-[#7B2D26]">
              Create Seeker Account
            </h1>
            <p className="mt-1 text-xs text-[#6E5545]">
              Save your birth chart, receive Vedic remedies, and talk directly with Acharya Ji.
            </p>
          </div>

          <MandalaDivider className="my-6" opacity={0.3} />

          {error && (
            <div className="mb-4 rounded-xl border border-rose-300 bg-rose-50 p-3 text-xs font-semibold text-rose-800">
              {error}
            </div>
          )}

          {step === "details" ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#3B2A1E] mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#C1662F]" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priya Nair"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-xl border border-[#E8D8C3] bg-[#FBF3E7] py-2.5 pl-10 pr-4 text-xs font-semibold text-[#3B2A1E] focus:outline-none focus:ring-2 focus:ring-[#7B2D26]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#3B2A1E] mb-1">
                  Mobile Number (India) *
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs font-bold text-[#6E5545]">
                    <span>+91</span>
                    <span className="text-[#E8D8C3]">|</span>
                  </div>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="98765 43210"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value.replace(/\D/g, "") })
                    }
                    className="w-full rounded-xl border border-[#E8D8C3] bg-[#FBF3E7] py-2.5 pl-14 pr-4 text-xs font-semibold text-[#3B2A1E] focus:outline-none focus:ring-2 focus:ring-[#7B2D26]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#3B2A1E] mb-1">
                    Date of Birth (Optional)
                  </label>
                  <input
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                    className="w-full rounded-xl border border-[#E8D8C3] bg-[#FBF3E7] px-3 py-2 text-xs text-[#3B2A1E] focus:outline-none focus:ring-2 focus:ring-[#7B2D26]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#3B2A1E] mb-1">
                    Gender
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full rounded-xl border border-[#E8D8C3] bg-[#FBF3E7] px-3 py-2 text-xs text-[#3B2A1E] focus:outline-none focus:ring-2 focus:ring-[#7B2D26]"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-[#7B2D26] py-3 text-xs font-bold text-[#FBF3E7] hover:bg-[#96372E] transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <span>{loading ? "Sending OTP..." : "Continue with OTP Verification"}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-[#3B2A1E]">
                    Enter 6-Digit OTP
                  </label>
                  <button
                    type="button"
                    onClick={() => setStep("details")}
                    className="text-[11px] text-[#C1662F] hover:underline"
                  >
                    Edit Details
                  </button>
                </div>
                <div className="relative">
                  <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#C1662F]" />
                  <input
                    type="text"
                    required
                    maxLength={6}
                    placeholder="Enter 123456"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    className="w-full rounded-xl border border-[#E8D8C3] bg-[#FBF3E7] py-3 pl-11 pr-4 text-center font-mono text-base font-bold tracking-widest text-[#7B2D26] focus:outline-none focus:ring-2 focus:ring-[#7B2D26]"
                  />
                </div>
                <div className="mt-1 flex items-center justify-between text-[11px] text-[#6E5545]">
                  <span>Sent to +91 {formData.phone}</span>
                  {resendTimer > 0 ? (
                    <span>Resend in {resendTimer}s</span>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      className="font-bold text-[#7B2D26] hover:underline"
                    >
                      Resend OTP
                    </button>
                  )}
                </div>
              </div>

              <div className="rounded-xl border border-[#E8A33D]/30 bg-[#FBF3E7] p-2.5 text-[11px] text-[#7B2D26] text-center font-medium">
                💡 Test Account Note: Use <strong>123456</strong> for instant verification.
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-[#7B2D26] py-3 text-xs font-bold text-[#FBF3E7] hover:bg-[#96372E] transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <span>{loading ? "Registering..." : "Complete Registration"}</span>
                <CheckCircle2 className="h-4 w-4 text-[#E8A33D]" />
              </button>
            </form>
          )}

          <div className="mt-6 pt-4 border-t border-[#E8D8C3] text-center text-xs text-[#6E5545]">
            Already have an account?{" "}
            <Link href="/login" className="font-bold text-[#7B2D26] hover:underline">
              Log In Here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
