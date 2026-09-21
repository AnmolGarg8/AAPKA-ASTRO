"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "How does the live consultation queue work if there is only one astrologer?",
      a: "Because Acharya Rajesh Sharma consults personally without third-party interns, our live queue system is 100% transparent. When he is ONLINE, you can join the queue. You are shown your exact position (e.g. #2 in line) and an accurate estimated wait time (approx. 7–10 minutes per client). Your device chimes and notifies you the moment Acharya Ji connects with you.",
    },
    {
      q: "What happens if Acharya Ji is offline or taking a break?",
      a: "When Acharya Ji is offline or conducting sacred rituals/sadhana, you will see his next available live time (e.g. 'Tomorrow at 10:00 AM IST'). You can pre-book a dedicated 30-minute appointment slot or request an instant SMS alert when he turns online.",
    },
    {
      q: "How does billing and wallet deduction work?",
      a: "Live consultations are billed strictly on a per-minute basis (Introductory offer: ₹19/min; standard ₹35/min). You recharge your Aapka Astro wallet using UPI (Google Pay, PhonePe, Paytm), RuPay, or Cards. The live consultation screen has an active transparent timer displaying second-by-second deductions. Unused wallet balance never expires.",
    },
    {
      q: "How accurate is the free Kundli calculator on this website?",
      a: "Our calculator is built on the rigorous Swiss Ephemeris astronomical model and Lahiri (Chitra Paksha) Ayanamsa — the gold standard recognized by Indian Vedic universities. It calculates planetary longitudes, Bhavas, Navamsha, and Vimshottari Mahadasha down to exact degrees and minutes.",
    },
    {
      q: "Are the recommended gemstones genuine and certified?",
      a: "Yes. Every gemstone recommended and shipped by Aapka Astro is 100% natural, unheated, and untreated. Each piece is accompanied by an individual identification certificate from government-recognized gemological testing laboratories (like IGI/GTL) and energized with proper Vedic Prana Pratishtha.",
    },
    {
      q: "Can I consult about Vastu without demolishing my current house structure?",
      a: "Absolutely. Acharya Rajesh Sharma specializes in non-demolition Vastu remedies. By utilizing elemental balancing (Pancha Tattva), directional metal tapes, consecrated Vedic yantras, and specific natural plants/mirrors, directional defects are balanced effectively without structural damage.",
    },
  ];

  return (
    <section className="border-t border-slate-800 bg-[#0B0F19] py-16 lg:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-300 mb-3">
            <HelpCircle className="h-3.5 w-3.5" />
            <span>CLARITY &amp; TRANSPARENCY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-slate-400 text-sm">
            Everything you need to know about our consultation model, queue, and services.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60 backdrop-blur-md transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between p-5 text-left text-sm font-bold text-white hover:text-amber-300 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-amber-400 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="border-t border-slate-800/80 px-5 pb-5 pt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
