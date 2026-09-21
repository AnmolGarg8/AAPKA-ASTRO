"use client";

import React, { useState } from "react";
import { INDIAN_CITIES, CityLocation } from "@/lib/astrology/indianCities";
import { KundliData } from "@/lib/astrology/types";
import { calculateKundli } from "@/lib/astrology/chartCalculations";
import { Calendar, Clock, MapPin, User, Sparkles } from "lucide-react";

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

  const filteredCities = INDIAN_CITIES.filter((c) =>
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
    }, 400);
  };

  return (
    <div
      className={`rounded-2xl border border-amber-500/30 bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-indigo-950/80 p-6 md:p-8 backdrop-blur-xl shadow-2xl ${className}`}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 text-slate-950 shadow-lg shadow-amber-500/20">
          <Sparkles className="h-5 w-5 fill-current" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            Free Vedic Janam Kundli
          </h3>
          <p className="text-xs text-amber-200/70">
            Precise planetary calculations using authentic Lahiri Ephemeris
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name & Gender */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <User className="h-4 w-4" />
              </div>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full rounded-xl border border-slate-700 bg-slate-800/80 pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Gender
            </label>
            <div className="grid grid-cols-2 gap-1 rounded-xl border border-slate-700 bg-slate-800/80 p-1">
              <button
                type="button"
                onClick={() => setGender("male")}
                className={`rounded-lg py-1.5 text-xs font-semibold transition-all ${
                  gender === "male"
                    ? "bg-amber-500 text-slate-950 shadow"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Male
              </button>
              <button
                type="button"
                onClick={() => setGender("female")}
                className={`rounded-lg py-1.5 text-xs font-semibold transition-all ${
                  gender === "female"
                    ? "bg-amber-500 text-slate-950 shadow"
                    : "text-slate-400 hover:text-white"
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
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Date of Birth
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <Calendar className="h-4 w-4" />
              </div>
              <input
                type="date"
                required
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-800/80 pl-10 pr-4 py-2.5 text-sm text-white focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Time of Birth
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <Clock className="h-4 w-4" />
              </div>
              <input
                type="time"
                required
                value={birthTime}
                onChange={(e) => setBirthTime(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-800/80 pl-10 pr-4 py-2.5 text-sm text-white focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Birth Place with Autocomplete */}
        <div className="relative">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
            Place of Birth
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
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
              className="w-full rounded-xl border border-slate-700 bg-slate-800/80 pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all"
            />
          </div>

          {showCityDropdown && (
            <div className="absolute z-30 mt-1 max-h-48 w-full overflow-auto rounded-xl border border-slate-700 bg-slate-900/95 p-1 shadow-2xl backdrop-blur-md">
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
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs text-slate-200 hover:bg-amber-500/20 hover:text-amber-300 transition-all"
                  >
                    <span>{city.name}</span>
                    <span className="text-[10px] text-slate-500">{city.state}</span>
                  </button>
                ))
              ) : (
                <div className="p-3 text-center text-xs text-slate-400">
                  No matching city found. Please select nearest major city.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isCalculating}
          className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 py-3.5 px-6 font-bold text-slate-950 shadow-xl shadow-amber-500/20 transition-all hover:brightness-110 hover:shadow-amber-500/30 active:scale-[0.99] disabled:opacity-50"
        >
          <div className="flex items-center justify-center gap-2">
            {isCalculating ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-950 border-t-transparent" />
                <span>Computing Vedic Ephemeris...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 fill-current transition-transform group-hover:rotate-12" />
                <span>Generate Free Janam Kundli</span>
              </>
            )}
          </div>
        </button>
      </form>
    </div>
  );
};
