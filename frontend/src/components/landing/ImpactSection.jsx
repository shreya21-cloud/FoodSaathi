import React, { useState } from "react";
import {
  Leaf,
  Droplets,
  IndianRupee,
  Sparkles,
  ArrowDown,
  TreePine,
  Heart,
} from "lucide-react";

export const ImpactSection = () => {
  const [mealInput, setMealInput] = useState(1500);

  // Illustrative estimates per meal, not live measured results.
  const co2PerMeal = 0.45 * 2.5;
  const waterPerMeal = 180;
  const moneyPerMeal = 50;

  const calculatedCO2 = Math.round(mealInput * co2PerMeal);
  const calculatedWater = Math.round(mealInput * waterPerMeal);
  const calculatedRupees = (mealInput * moneyPerMeal).toLocaleString("en-IN");

  const formatNumber = (value) => value.toLocaleString("en-IN");

  const impactCards = [
    {
      label: "Estimated emissions impact",
      title: "CO₂ emissions averted",
      value: `${formatNumber(calculatedCO2)} kg`,
      detail: `Illustrative equivalent: ${formatNumber(
        Math.round(calculatedCO2 / 21),
      )} trees`,
      icon: Leaf,
      iconStyle: "bg-emerald-100 text-emerald-800",
      valueStyle: "text-emerald-800",
    },
    {
      label: "Estimated water footprint",
      title: "Virtual water footprint",
      value: `${formatNumber(calculatedWater)} L`,
      detail: "Based on an assumed 180 L per meal",
      icon: Droplets,
      iconStyle: "bg-sky-100 text-sky-800",
      valueStyle: "text-sky-800",
    },
    {
      label: "Estimated community value",
      title: "Food relief value",
      value: `₹${calculatedRupees}`,
      detail: "Based on an assumed ₹50 per meal",
      icon: IndianRupee,
      iconStyle: "bg-amber-100 text-amber-900",
      valueStyle: "text-amber-800",
    },
  ];

  return (
    <section
      id="impact"
      className="relative overflow-hidden bg-[#f8f7f0] py-20 sm:py-24 lg:py-28"
    >
      {/* Soft background details */}
      <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-emerald-100/60 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-amber-100/50 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Heading */}
        <div className="mb-12 grid gap-7 lg:mb-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-3.5 py-2">
              <Sparkles size={14} className="text-emerald-700" />
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-800">
                Interactive impact estimator
              </span>
            </div>

            <h2 className="max-w-2xl text-4xl font-semibold leading-[1.12] tracking-[-0.045em] text-[#193d30] sm:text-5xl lg:text-6xl">
              Small actions.
              <br />
              <span className="font-serif italic font-normal text-emerald-700">
                A lasting impact.
              </span>
            </h2>
          </div>

          <div className="lg:pb-1">
            <p className="max-w-lg text-sm leading-7 text-slate-600 sm:text-base">
              Food rescue is about more than a meal. Explore how redirecting
              surplus food can translate into estimated environmental savings
              and community value.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs font-medium text-emerald-800">
              <Heart size={15} />
              <span>Rescue food. Reduce waste. Support communities.</span>
            </div>
          </div>
        </div>

        {/* Main estimator */}
        <div className="overflow-hidden rounded-[28px] border border-[#dfe7dc] bg-white shadow-[0_24px_70px_-40px_rgba(25,61,48,0.3)]">
          <div className="grid lg:grid-cols-[0.82fr_1.18fr]">
            {/* Calculator controls */}
            <div className="relative overflow-hidden bg-[#204634] p-7 text-white sm:p-10 lg:p-12">
              <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full border border-white/10" />
              <div className="pointer-events-none absolute -right-5 -top-5 h-36 w-36 rounded-full border border-white/10" />
              <div className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-emerald-400/10 blur-2xl" />

              <div className="relative">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-emerald-200 ring-1 ring-white/10">
                    <Leaf size={22} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      Your rescue scenario
                    </p>
                    <p className="mt-0.5 text-xs text-white/55">
                      Adjust the number of meals
                    </p>
                  </div>
                </div>

                <div className="mt-12">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-200/80">
                    Meals rescued
                  </p>

                  <div className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="text-5xl font-semibold tracking-[-0.05em] sm:text-6xl">
                      {formatNumber(mealInput)}
                    </span>
                    <span className="text-sm font-medium text-emerald-200">
                      meals
                    </span>
                  </div>

                  <div className="mt-8">
                    <input
                      aria-label="Number of surplus meals"
                      type="range"
                      min="100"
                      max="10000"
                      step="100"
                      value={mealInput}
                      onChange={(e) => setMealInput(Number(e.target.value))}
                      className="h-2.5 w-full cursor-pointer appearance-none rounded-full bg-white/20 accent-amber-300"
                    />

                    <div className="mt-3 flex justify-between font-mono text-[10px] text-white/55">
                      <span>100</span>
                      <span>5,000</span>
                      <span>10,000</span>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-2">
                    {[500, 1500, 5000, 10000].map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => setMealInput(amount)}
                        aria-pressed={mealInput === amount}
                        className={`rounded-full border px-3.5 py-2 text-xs font-semibold transition-colors ${
                          mealInput === amount
                            ? "border-amber-300 bg-amber-300 text-[#193d30]"
                            : "border-white/20 bg-white/5 text-white/80 hover:border-white/50 hover:bg-white/10"
                        }`}
                      >
                        {formatNumber(amount)}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-10 border-t border-white/15 pt-5">
                  <p className="flex items-center gap-2 text-xs leading-6 text-white/65">
                    <Sparkles size={14} className="shrink-0 text-amber-300" />
                    Change the quantity to instantly recalculate all three
                    estimates.
                  </p>
                </div>
              </div>
            </div>

            {/* Impact results */}
            <div className="p-6 sm:p-9 lg:p-10">
              <div className="mb-7 flex items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-800">
                    Estimated outcomes
                  </p>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight text-[#193d30] sm:text-2xl">
                    The difference you could make
                  </h3>
                </div>

                <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-800 sm:flex">
                  <ArrowDown size={18} />
                </div>
              </div>

              <div className="space-y-3">
                {impactCards.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="group flex items-center gap-4 rounded-2xl border border-[#e9ebe3] bg-[#fdfdf9] p-4 transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50/40 sm:gap-5 sm:p-5"
                    >
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] ${item.iconStyle}`}
                      >
                        <Icon size={21} strokeWidth={1.8} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-slate-500">
                          {item.label}
                        </p>
                        <p className="mt-1 text-sm font-semibold text-[#193d30]">
                          {item.title}
                        </p>
                        <p className="mt-1 text-[11px] leading-5 text-slate-500">
                          {item.detail}
                        </p>
                      </div>

                      <div
                        aria-live="polite"
                        className={`shrink-0 text-right text-lg font-bold tracking-tight sm:text-xl ${item.valueStyle}`}
                      >
                        {item.value}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 flex items-start gap-3 rounded-xl bg-[#f5f5ed] p-4">
                <TreePine
                  size={17}
                  className="mt-0.5 shrink-0 text-emerald-800"
                />
                <p className="text-[11px] leading-5 text-slate-600">
                  These are illustrative estimates based on fixed per-meal
                  assumptions, not verified real-world savings. Actual
                  environmental impact varies with food type, sourcing, and
                  disposal method.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Closing note */}
        <div className="mt-8 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <p className="text-sm text-slate-500">
            Better distribution can help make surplus food go further.
          </p>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-800">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Built around food rescue and sustainability
          </div>
        </div>
      </div>
    </section>
  );
};
