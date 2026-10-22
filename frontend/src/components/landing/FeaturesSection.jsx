import React from "react";
import {
  Cpu,
  ShieldAlert,
  Bike,
  CopyCheck,
  TrendingUp,
  Navigation,
  Sparkles,
  BarChart3,
  ArrowUpRight,
  Leaf,
} from "lucide-react";
import { Link } from "react-router-dom";

export const FeaturesSection = () => {
  const features = [
    {
      title: "Smart Donor–NGO Matching",
      description:
        "Calculates multi-dimensional compatibility using distance, dietary categories, and receiving capacity.",
      icon: Cpu,
      category: "INTELLIGENT MATCHING",
      accent: "emerald",
    },
    {
      title: "Food Priority & Safety Triage",
      description:
        "Categorizes donations into Critical, High, Medium, and Low priorities based on safe consumption deadlines.",
      icon: ShieldAlert,
      category: "FOOD SAFETY",
      accent: "rose",
    },
    {
      title: "Smart Volunteer Dispatch",
      description:
        "Auto-scores available couriers based on distance, cargo capacity, active assignments, and rating.",
      icon: Bike,
      category: "LAST-MILE DELIVERY",
      accent: "blue",
    },
    {
      title: "Duplicate Donation Shield",
      description:
        "Prevents redundant food posts by comparing donor profile, geo-coordinates, and meal timestamps.",
      icon: CopyCheck,
      category: "DATA INTEGRITY",
      accent: "amber",
    },
    {
      title: "Food Demand Forecaster",
      description:
        "Simulates seasonal and day-of-week demand patterns to help shelters prepare ahead of banquet surges.",
      icon: TrendingUp,
      category: "DEMAND INTELLIGENCE",
      accent: "purple",
    },
    {
      title: "Route Optimizer",
      description:
        "Sequences pickup and delivery stops using a TSP heuristic to minimize transit distance and reduce CO₂ emissions.",
      icon: Navigation,
      category: "ROUTE OPTIMIZATION",
      accent: "teal",
    },
    {
      title: "Food Rescue Simulator",
      description:
        "Interactive parametric engine simulating thousand-meal rescue operations with real-time analytics.",
      icon: Sparkles,
      category: "INTERACTIVE EXPERIENCE",
      accent: "feature",
      badge: "HIGHLIGHT",
      featured: true,
    },
    {
      title: "Carbon & Waste Analytics",
      description:
        "Tracks kilograms of food diverted, CO₂ greenhouse gases averted, and monetary community value.",
      icon: BarChart3,
      category: "MEASURABLE IMPACT",
      accent: "indigo",
    },
  ];

  const accentStyles = {
    emerald: {
      icon: "bg-emerald-100 text-emerald-800",
      glow: "group-hover:bg-emerald-100/70",
      line: "group-hover:bg-emerald-500",
      number: "text-emerald-800",
    },
    rose: {
      icon: "bg-rose-100 text-rose-700",
      glow: "group-hover:bg-rose-50",
      line: "group-hover:bg-rose-400",
      number: "text-rose-700",
    },
    blue: {
      icon: "bg-sky-100 text-sky-800",
      glow: "group-hover:bg-sky-50",
      line: "group-hover:bg-sky-400",
      number: "text-sky-800",
    },
    amber: {
      icon: "bg-amber-100 text-amber-800",
      glow: "group-hover:bg-amber-50",
      line: "group-hover:bg-amber-400",
      number: "text-amber-800",
    },
    purple: {
      icon: "bg-violet-100 text-violet-800",
      glow: "group-hover:bg-violet-50",
      line: "group-hover:bg-violet-400",
      number: "text-violet-800",
    },
    teal: {
      icon: "bg-teal-100 text-teal-800",
      glow: "group-hover:bg-teal-50",
      line: "group-hover:bg-teal-400",
      number: "text-teal-800",
    },
    feature: {
      icon: "bg-amber-100 text-amber-900",
      glow: "group-hover:bg-amber-100/60",
      line: "group-hover:bg-amber-500",
      number: "text-amber-900",
    },
    indigo: {
      icon: "bg-indigo-100 text-indigo-800",
      glow: "group-hover:bg-indigo-50",
      line: "group-hover:bg-indigo-400",
      number: "text-indigo-800",
    },
  };

  return (
    <section
      id="features"
      className="relative overflow-hidden bg-[#faf9f4] py-20 sm:py-24 lg:py-28"
    >
      <div className="pointer-events-none absolute -right-36 top-20 h-80 w-80 rounded-full bg-emerald-100/40 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-10 h-72 w-72 rounded-full bg-amber-100/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Section heading */}
        <div className="mb-12 flex flex-col gap-7 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-3.5 py-2 shadow-sm">
              <Sparkles size={14} className="text-emerald-700" />
              <span className="text-[10px] font-bold uppercase tracking-[0.19em] text-emerald-800">
                Powered by heuristic intelligence
              </span>
            </div>

            <h2 className="text-4xl font-semibold leading-[1.12] tracking-[-0.045em] text-[#193d30] sm:text-5xl lg:text-6xl">
              Technology with
              <br />
              <span className="font-serif italic font-normal text-emerald-700">
                a human purpose.
              </span>
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
              Every rescued meal starts with a smarter decision. Explore the
              intelligence that helps move surplus food to the people who need
              it.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-4 border-t border-[#dce5db] pt-5 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-800">
              <Leaf size={23} />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#193d30]">
                One connected ecosystem
              </p>
              <p className="mt-1 text-xs text-slate-500">
                From donation to measurable impact
              </p>
            </div>
          </div>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            const style = accentStyles[feature.accent];

            return (
              <article
                key={feature.title}
                className={`group relative flex min-h-[265px] flex-col overflow-hidden rounded-[24px] border p-6 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_18px_45px_-22px_rgba(25,61,48,0.25)] sm:p-7 ${
                  feature.featured
                    ? "border-[#244c39] bg-[#204634] text-white"
                    : "border-[#e7e7dc] bg-white/85 text-[#193d30] hover:border-emerald-200"
                }`}
              >
                {feature.featured && (
                  <>
                    <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full border border-white/10" />
                    <div className="pointer-events-none absolute -right-5 -top-5 h-28 w-28 rounded-full border border-white/10" />
                    <div className="pointer-events-none absolute -bottom-20 -left-16 h-48 w-48 rounded-full bg-emerald-400/10 blur-2xl" />
                  </>
                )}

                <div className="relative flex items-start justify-between gap-3">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-[16px] transition-transform duration-300 group-hover:rotate-[-5deg] group-hover:scale-105 ${
                      feature.featured
                        ? "bg-white/10 text-amber-300 ring-1 ring-white/10"
                        : style.icon
                    }`}
                  >
                    <Icon size={22} strokeWidth={1.8} />
                  </div>

                  {feature.badge ? (
                    <span className="rounded-full border border-amber-300/30 bg-amber-300/15 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-amber-200">
                      {feature.badge}
                    </span>
                  ) : (
                    <span
                      className={`font-mono text-xs ${
                        feature.featured ? "text-white/35" : "text-slate-300"
                      }`}
                    >
                      0{idx + 1}
                    </span>
                  )}
                </div>

                <div className="relative mt-7 flex-1">
                  <p
                    className={`mb-2 text-[9px] font-bold uppercase tracking-[0.17em] ${
                      feature.featured ? "text-amber-200/80" : style.number
                    }`}
                  >
                    {feature.category}
                  </p>

                  <h3
                    className={`max-w-[250px] text-lg font-semibold leading-snug tracking-[-0.025em] ${
                      feature.featured ? "text-white" : "text-[#193d30]"
                    }`}
                  >
                    {feature.title}
                  </h3>

                  <p
                    className={`mt-3 text-[12px] leading-[1.85] ${
                      feature.featured ? "text-white/70" : "text-slate-500"
                    }`}
                  >
                    {feature.description}
                  </p>
                </div>

                <div
                  className={`relative mt-6 h-px w-full ${
                    feature.featured ? "bg-white/15" : "bg-[#eeeee7]"
                  }`}
                >
                  <div
                    className={`h-full w-0 transition-all duration-500 group-hover:w-full ${
                      feature.featured
                        ? "bg-amber-300"
                        : `bg-emerald-500 ${style.line}`
                    }`}
                  />
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom callout */}
        <div className="mt-8 flex flex-col gap-5 rounded-[24px] border border-[#e3e7dc] bg-white/75 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-800">
              <Sparkles size={20} />
            </div>
            <div>
              <h3 className="text-base font-semibold text-[#193d30] sm:text-lg">
                See the rescue process in action
              </h3>
              <p className="mt-1 max-w-xl text-sm leading-6 text-slate-500">
                Explore the Food Rescue Simulator to see how different scenarios
                can affect rescue operations and their outcomes.
              </p>
            </div>
          </div>

          <Link
            to="/simulator"
            className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-full bg-[#204634] px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-emerald-800 hover:shadow-lg hover:shadow-emerald-900/10 sm:self-center"
          >
            Explore simulator
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};
