"use client";

import React from "react";
import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";
import { MandalaDivider } from "@/components/ui/MandalaDivider";
import { Loader2, ShieldCheck } from "lucide-react";

export default function RootSSOCallbackPage() {
  return (
    <div className="min-h-[85vh] bg-[#FBF3E7] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md text-center">
        {/* Sacred ॐ Emblem & Header */}
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#7B2D26] text-[#E8A33D] font-temple text-3xl shadow-md mb-4 animate-pulse">
          ॐ
        </div>
        <h1 className="font-temple text-2xl sm:text-3xl font-bold text-[#7B2D26]">
          Completing Sacred Authentication...
        </h1>
        <p className="mt-2 text-xs text-[#6E5545]">
          Establishing your secure Vedic session and redirecting to your sanctuary.
        </p>

        <div className="flex justify-center my-4">
          <MandalaDivider className="w-28 text-[#C1662F]" />
        </div>

        {/* Loading Spinner & Status */}
        <div className="flex flex-col items-center justify-center p-6 space-y-3 bg-[#FFFDF9] border border-[#E8D8C3] rounded-2xl shadow-sm">
          <Loader2 className="h-8 w-8 animate-spin text-[#C1662F]" />
          <span className="text-xs font-semibold text-[#6E5545]">
            Verifying OAuth Credentials...
          </span>
          <div className="flex items-center gap-1.5 text-[11px] text-[#6B8E5A]">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Encrypted Single Sign-On Handshake</span>
          </div>
        </div>

        {/* Clerk OAuth Redirect Handshake Processor */}
        <AuthenticateWithRedirectCallback
          signInForceRedirectUrl="/account"
          signUpForceRedirectUrl="/account"
          signInFallbackRedirectUrl="/account"
          signUpFallbackRedirectUrl="/account"
        />
      </div>
    </div>
  );
}
