"use client";

import React from "react";
import { Star, ShieldCheck, Quote } from "lucide-react";

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      name: "Rohit Singhania",
      location: "Gurugram / London",
      service: "Career & Business Transition",
      rating: 5,
      date: "February 2026",
      review:
        "I was stuck in a stalled fintech startup and had two competing offers. Acharya Rajesh Sharma examined my Rahu-Jupiter dasha transit with unbelievable precision and advised me to wait until November. Exactly as predicted, an acquisition offer landed. His remedies were simple and grounded — no unnecessary rituals.",
    },
    {
      name: "Priyanka & Saurabh Sen",
      location: "Mumbai",
      service: "Kundli Milan & Marriage",
      rating: 5,
      date: "January 2026",
      review:
        "Two other commercial astrologers told us we had severe Nadi dosha and demanded ₹25,000 for complex pujas. Acharya Ji took the time to explain the deeper cancellation rules in our Navamsha charts. He calmed our parents and gave us simple Shiva stotra remedies. We are happily married today.",
    },
    {
      name: "Col. Vikram Rathore (Retd.)",
      location: "Jaipur",
      service: "Residential Vastu Audit",
      rating: 5,
      date: "March 2026",
      review:
        "Our family home had ongoing health concerns for my wife. Acharya Ji analyzed the Northeast water element defect and corrected the North-West air flow with brass strip installations and pyramid energization — without demolishing a single brick. The positive difference within 45 days was unmistakable.",
    },
    {
      name: "Ananya Deshmukh",
      location: "Bengaluru",
      service: "Vedic Gemstone Prescription",
      rating: 5,
      date: "January 2026",
      review:
        "Purchased a natural Zambian Emerald (Panna) recommended for my Gemini Ascendant. The government lab certificate came with the parcel, and the gemstone was already energized with proper muhurat instructions. My focus and communication in executive meetings improved noticeably.",
    },
  ];

  return (
    <section className="border-t border-slate-800 bg-[#080B12] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-300 mb-3">
            <Star className="h-3.5 w-3.5 fill-current" />
            <span>REAL CLIENT EXPERIENCES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Verified Stories of Clarity &amp; Transformation
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Over 35,000 lives touched across India and the global diaspora.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="relative rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-7 backdrop-blur-md hover:border-slate-700 transition-all"
            >
              <Quote className="absolute top-6 right-6 h-8 w-8 text-slate-800 pointer-events-none" />

              <div className="flex items-center gap-1 text-amber-400 mb-3">
                {[...Array(r.rating)].map((_, idx) => (
                  <Star key={idx} className="h-4 w-4 fill-current" />
                ))}
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
                &ldquo;{r.review}&rdquo;
              </p>

              <div className="flex items-center justify-between border-t border-slate-800/80 pt-4 text-xs">
                <div>
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <span>{r.name}</span>
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                  </div>
                  <div className="text-[11px] text-slate-400">{r.location}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-amber-300/90 text-[11px]">{r.service}</div>
                  <div className="text-[10px] text-slate-500">{r.date}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
