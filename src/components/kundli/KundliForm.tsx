"use client";

import React, { useState } from "react";
import { INDIAN_CITIES, CityLocation } from "@/lib/astrology/indianCities";
import { KundliData } from "@/lib/astrology/types";
import { calculateKundli } from "@/lib/astrology/chartCalculations";
import { Calendar, Clock, MapPin, User } from "lucide-react";
import { DiyaIcon } from "@/components/ui/DiyaIcon";

interface KundliFormProps {
  onCalculated: (data: KundliData) => void;
  className?: string;
}

export const KundliForm: React.FC<KundliFormProps> = ({ onCalculated, className = "" }) => {
  const [name, setName] = useState("Aarav Sharma");
  const [gender, setGender] = useState<"male" | "female" | "other">("male");
  const [birthDate, setBirthDate] = useState("1995-10-24");
  const [birthTime, setBirthTime] = useState("14:35");
  const [selectedCity, setSelectedCity] = useState<CityLocation>(INDIAN_CITIES[0]);
  const [citySearch, setCitySearch] = useState("New Delhi");
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);

  const filteredCities = INDIAN_CITIES.filter(
    (c) =>
      c.name.toLowerCase().includes(citySearch.toLowerCase()) ||
      c.state.toLowerCase().includes(citySearch.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculating(true);

    setTimeout(() => {
      const kundli = calculateKundli({
        name,
        gender,
        birthDate,
        birthTime,
        birthPlace: `${selectedCity.name}, ${selectedCity.state}`,
        latitude: selectedCity.latitude,
        longitude: selectedCity.longitude,
        timezone: selectedCity.timezone,
      });

      onCalculated(kundli);
      setIsCalculating(false);
    }, 350);
  };

  return (
    <div
      className={`rounded-2xl border-2 border-[#E8D8C3] bg-[#FFFDF9] p-6 md:p-8 shadow-sm ${className}`}
    >
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#E8D8C3]">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#7B2D26] text-[#E8A33D] shadow-sm">
          <DiyaIcon size={22} />
        </div>
        <div>
          <h3 className="font-temple text-xl font-bold text-[#7B2D26] tracking-tight">
            Free Janam Kundli
          </h3>
          <p className="text-xs text-[#6E5545]">
            Authentic Lahiri Ephemeris &bull; Precise Lagna &amp; Planetary Degrees
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        {/* Name & Gender */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#3B2A1E] mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-[#6E5545]">
                <User className="h-4 w-4" />
              </div>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter full name"
                className="w-full rounded-xl border border-[#E8D8C3] bg-[#FBF3E7] pl-10 pr-4 py-2.5 text-xs text-[#3B2A1E] focus:border-[#7B2D26] focus:outline-none transition-all font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#3B2A1E] mb-1.5">
              Gender
            </label>
            <div className="grid grid-cols-2 gap-1 rounded-xl border border-[#E8D8C3] bg-[#FBF3E7] p-1">
              <button
                type="button"
                onClick={() => setGender("male")}
                className={`rounded-lg py-1.5 text-xs font-bold transition-all ${
                  gender === "male"
                    ? "bg-[#7B2D26] text-[#FBF3E7] shadow-sm"
                    : "text-[#6E5545] hover:text-[#3B2A1E]"
                }`}
              >
                Male
              </button>
              <button
                type="button"
                onClick={() => setGender("female")}
                className={`rounded-lg py-1.5 text-xs font-bold transition-all ${
                  gender === "female"
                    ? "bg-[#7B2D26] text-[#FBF3E7] shadow-sm"
                    : "text-[#6E5545] hover:text-[#3B2A1E]"
                }`}
              >
                Female
              </button>
            </div>
          </div>
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#3B2A1E] mb-1.5">
              Date of Birth
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-[#6E5545]">
                <Calendar className="h-4 w-4" />
              </div>
              <input
                type="date"
                required
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full rounded-xl border border-[#E8D8C3] bg-[#FBF3E7] pl-10 pr-4 py-2.5 text-xs text-[#3B2A1E] focus:border-[#7B2D26] focus:outline-none transition-all font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#3B2A1E] mb-1.5">
              Time of Birth
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-[#6E5545]">
                <Clock className="h-4 w-4" />
              </div>
              <input
                type="time"
                required
                value={birthTime}
                onChange={(e) => setBirthTime(e.target.value)}
                className="w-full rounded-xl border border-[#E8D8C3] bg-[#FBF3E7] pl-10 pr-4 py-2.5 text-xs text-[#3B2A1E] focus:border-[#7B2D26] focus:outline-none transition-all font-medium"
              />
            </div>
          </div>
        </div>

        {/* Birth Place */}
        <div className="relative">
          <label className="block text-xs font-bold uppercase tracking-wider text-[#3B2A1E] mb-1.5">
            Place of Birth
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-[#6E5545]">
              <MapPin className="h-4 w-4" />
            </div>
            <input
              type="text"
              required
              value={citySearch}
              onChange={(e) => {
                setCitySearch(e.target.value);
                setShowCityDropdown(true);
              }}
              onFocus={() => setShowCityDropdown(true)}
              placeholder="Search Indian or World city..."
              className="w-full rounded-xl border border-[#E8D8C3] bg-[#FBF3E7] pl-10 pr-4 py-2.5 text-xs text-[#3B2A1E] focus:border-[#7B2D26] focus:outline-none transition-all font-medium"
            />
          </div>

          {showCityDropdown && (
            <div className="absolute z-30 mt-1 max-h-48 w-full overflow-auto rounded-xl border border-[#E8D8C3] bg-[#FFFDF9] p-1 shadow-lg">
              {filteredCities.length > 0 ? (
                filteredCities.map((city) => (
                  <button
                    key={`${city.name}-${city.state}`}
                    type="button"
                    onClick={() => {
                      setSelectedCity(city);
                      setCitySearch(`${city.name}, ${city.state}`);
                      setShowCityDropdown(false);
                    }}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs text-[#3B2A1E] hover:bg-[#FBF3E7] hover:text-[#7B2D26] transition-all"
                  >
                    <span className="font-bold">{city.name}</span>
                    <span className="text-[11px] text-[#6E5545]">{city.state}</span>
                  </button>
                ))
              ) : (
                <div className="p-3 text-center text-xs text-[#6E5545]">
                  Select nearest major Indian city.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isCalculating}
          className="w-full rounded-xl bg-[#7B2D26] py-3.5 px-6 font-bold text-[#FBF3E7] shadow-sm hover:bg-[#64221C] transition-all active:scale-[0.99] text-xs flex items-center justify-center gap-2"
        >
          <DiyaIcon size={16} />
          <span>{isCalculating ? "Computing Vedic Ephemeris..." : "Generate Free Janam Kundli"}</span>
        </button>
      </form>
    </div>
  );
};
