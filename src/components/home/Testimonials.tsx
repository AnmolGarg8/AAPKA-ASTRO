"use client";

import React from "react";
import { Star, ShieldCheck, Quote } from "lucide-react";
import { MandalaDivider } from "@/components/ui/MandalaDivider";

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      name: "Rohit Singhania",
      location: "Gurugram / London",
      service: "Career & Business Transition",
      rating: 5,
      date: "February 2026",
      review:
        "I was stuck in a stalled fintech startup and had two competing offers. Acharya Rajesh Sharma examined my Rahu-Jupiter dasha transit with remarkable precision and advised me to wait until November. Exactly as predicted, an acquisition offer landed. His remedies were simple and grounded — no unnecessary rituals.",
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
    <section className="border-t border-[#E8D8C3] bg-[#FFFDF9] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#E8D8C3] bg-[#FBF3E7] px-3.5 py-1 text-xs font-bold text-[#7B2D26] mb-3">
            <Star className="h-3.5 w-3.5 fill-[#E8A33D] text-[#E8A33D]" />
            <span>REAL STORIES OF LIFE TRANSFORMATION</span>
          </div>
          <h2 className="font-temple text-3xl sm:text-4xl font-bold text-[#7B2D26] tracking-tight">
            Verified Experiences of Seekers Across India
          </h2>
          <MandalaDivider className="my-4" />
          <p className="text-[#6E5545] text-sm sm:text-base">
            Over 35,000 lives touched with clarity, calmness, and practical Vedic guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="relative rounded-2xl border-2 border-[#E8D8C3] bg-[#FBF3E7]/60 p-6 sm:p-8 shadow-sm hover:border-[#C1662F] transition-all flex flex-col justify-between"
            >
              <Quote className="absolute top-6 right-6 h-8 w-8 text-[#C1662F]/20 pointer-events-none" />

              <div>
                <div className="flex items-center gap-1 text-[#E8A33D] mb-3">
                  {[...Array(r.rating)].map((_, idx) => (
                    <Star key={idx} className="h-4 w-4 fill-current" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-[#3B2A1E] leading-relaxed mb-6 italic">
                  &ldquo;{r.review}&rdquo;
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-[#E8D8C3] pt-4 text-xs">
                <div>
                  <div className="font-bold text-[#7B2D26] flex items-center gap-1.5">
                    <span>{r.name}</span>
                    <ShieldCheck className="h-3.5 w-3.5 text-[#6B8E5A]" />
                  </div>
                  <div className="text-[11px] text-[#6E5545]">{r.location}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-[#C1662F] text-[11px]">{r.service}</div>
                  <div className="text-[10px] text-[#A8988B]">{r.date}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
