"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import WalletPageComponent from "@/app/wallet/page";

export default function AccountWalletPage() {
  return (
    <div className="bg-[#FBF3E7] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 pt-6 sm:px-6 lg:px-8">
        <Link
          href="/account"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7B2D26] hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Account Dashboard</span>
        </Link>
      </div>
      <WalletPageComponent />
    </div>
  );
}
