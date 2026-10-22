import React from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  HeartHandshake,
  Utensils,
  MapPin,
  Zap,
  Clock3,
  Navigation,
  CheckCircle2,
  Leaf,
  TrendingUp,
  PackageCheck,
  CircleDot,
} from "lucide-react";
import { PriorityBadge } from "../common/Badge";

export const Hero = () => {
  return (
    <section className="hero-motion relative isolate overflow-hidden bg-[#fcfdf9]">
      <style>{`
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translate3d(0, 22px, 0); }
          to { opacity: 1; transform: translate3d(0, 0, 0); }
        }

        @keyframes heroFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }

        @keyframes heroPulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
          }
          50% {
            box-shadow: 0 0 0 7px rgba(16, 185, 129, 0.07);
          }
        }

        @keyframes heroProgress {
          from { width: 0; }
          to { width: 98%; }
        }

        .hero-motion .hero-enter {
          animation: heroFadeUp .75s cubic-bezier(.2,.7,.2,1) both;
        }

        .hero-motion .hero-delay-1 { animation-delay: .10s; }
        .hero-motion .hero-delay-2 { animation-delay: .20s; }
        .hero-motion .hero-delay-3 { animation-delay: .30s; }

        .hero-motion .hero-float {
          animation: heroFloat 3.2s ease-in-out infinite;
          will-change: transform;
        }

        .hero-motion .hero-pulse {
          animation: heroPulse 3.2s ease-in-out infinite;
        }

        .hero-motion .hero-progress {
          animation: heroProgress 1.25s cubic-bezier(.2,.7,.2,1) .35s both;
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-motion .hero-enter,
          .hero-motion .hero-float,
          .hero-motion .hero-pulse,
          .hero-motion .hero-progress {
            animation: none !important;
          }

          .hero-motion .hero-interactive {
            transition: none !important;
          }
        }
      `}</style>

      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -right-40 top-12 h-[520px] w-[520px] rounded-full bg-emerald-100/60 blur-[100px]" />
        <div className="absolute -left-48 top-64 h-[400px] w-[400px] rounded-full bg-amber-100/40 blur-[100px]" />
        <div className="absolute inset-0 opacity-[0.035] [background-image:radial-gradient(#14532d_0.7px,transparent_0.7px)] [background-size:22px_22px]" />
      </div>

      <div className="mx-auto max-w-[1440px] px-5 pb-16 pt-12 sm:px-8 sm:pb-20 sm:pt-16 lg:px-12 lg:pb-24 lg:pt-20">
        <div className="grid items-center gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-12 xl:gap-16">
          {/* Hero content */}
          <div className="hero-enter relative z-10 mx-auto w-full max-w-2xl text-center lg:mx-0 lg:text-left">
            <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-emerald-200/80 bg-white/85 px-4 py-2 shadow-sm shadow-emerald-950/[0.03]">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-600" />
              </span>
              <span className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-emerald-900 sm:text-[11px]">
                Intelligent food rescue network
              </span>
              <Sparkles size={14} className="text-amber-500" />
            </div>

            <h1 className="text-[clamp(2.7rem,5.2vw,5.25rem)] font-black leading-[1.04] tracking-[-0.065em] text-[#142b20]">
              Good food
              <br />
              deserves a{" "}
              <span className="relative inline-block text-emerald-700">
                second life.
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 300 14"
                  fill="none"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M3 10C76 2 205 2 296 8"
                    stroke="#d9a441"
                    strokeWidth="5"
                    strokeLinecap="round"
                    opacity=".72"
                  />
                </svg>
              </span>
            </h1>

            <p className="mx-auto mt-7 max-w-xl text-[15px] leading-7 text-slate-600 sm:text-base sm:leading-8 lg:mx-0">
              Every surplus meal is an opportunity to make a difference.
              FoodRescue AI connects food donors, NGOs and volunteers through
              intelligent matching and coordinated food redistribution.
            </p>

            {/* Login and signup buttons */}
            <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center lg:justify-start">
              <Link
                to="/login"
                className="group inline-flex min-h-[54px] items-center justify-center gap-3 rounded-2xl bg-emerald-800 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-900/15 transition duration-300 hover:-translate-y-1 hover:bg-emerald-900 hover:shadow-xl hover:shadow-emerald-900/20"
              >
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-white/15">
                  <ArrowRight size={16} />
                </span>
                Get Started
                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <Link
                to="/signup"
                className="inline-flex min-h-[54px] items-center justify-center gap-2.5 rounded-2xl border border-slate-200 bg-white/90 px-6 py-4 text-sm font-bold text-slate-800 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:bg-emerald-50/70"
              >
                Create Account
                <ArrowUpRight size={17} className="text-emerald-700" />
              </Link>
            </div>

            <div className="mt-4 flex justify-center lg:justify-start">
              <Link
                to="/simulator"
                className="group inline-flex items-center gap-2 rounded-lg py-2 text-sm font-semibold text-slate-500 transition hover:text-amber-700"
              >
                <span className="grid h-6 w-6 place-items-center rounded-full bg-amber-100 text-amber-700 transition group-hover:bg-amber-200">
                  <Zap size={13} />
                </span>
                See how the rescue simulator works
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>

            {/* Trust strip */}
            <div className="mt-10 border-t border-slate-200/80 pt-6">
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.17em] text-slate-400">
                Built for the entire rescue ecosystem
              </p>

              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 lg:justify-start">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                  <span className="grid h-8 w-8 place-items-center rounded-xl bg-emerald-100/80 text-emerald-800">
                    <ShieldCheck size={17} />
                  </span>
                  Food donors
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                  <span className="grid h-8 w-8 place-items-center rounded-xl bg-amber-100/80 text-amber-800">
                    <HeartHandshake size={17} />
                  </span>
                  NGO partners
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                  <span className="grid h-8 w-8 place-items-center rounded-xl bg-slate-100 text-slate-700">
                    <Navigation size={16} />
                  </span>
                  Rescue volunteers
                </div>
              </div>
            </div>
          </div>

          {/* Dashboard preview */}
          <div className="hero-enter hero-delay-2 relative mx-auto w-full max-w-[570px] lg:ml-auto lg:mr-0">
            <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full border border-emerald-200/60 sm:-right-12 sm:-top-12 sm:h-56 sm:w-56" />
            <div className="pointer-events-none absolute -bottom-8 -left-8 h-32 w-32 rounded-full border border-amber-200/70 sm:-bottom-12 sm:-left-12 sm:h-44 sm:w-44" />

            <div className="hero-interactive relative rounded-[28px] border border-white bg-white/95 p-4 shadow-[0_28px_90px_-32px_rgba(15,76,48,0.25)] transition-all duration-500 hover:shadow-[0_32px_100px_-32px_rgba(15,76,48,0.32)] sm:rounded-[32px] sm:p-6">
              {/* Header */}
              <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-5">
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-emerald-800 text-white shadow-md shadow-emerald-900/15">
                    <HeartHandshake size={21} />
                  </div>
                  <div>
                    <h2 className="text-sm font-extrabold tracking-tight text-slate-900">
                      Rescue operations
                    </h2>
                    <p className="mt-1 text-[11px] text-slate-500">
                      AI-powered coordination preview
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                  <span className="text-[10px] font-bold text-emerald-800">
                    DEMO
                  </span>
                </div>
              </div>

              {/* Metric cards */}
              <div className="grid grid-cols-3 gap-2.5 py-5 sm:gap-3">
                <div className="hero-enter hero-delay-1 hero-interactive rounded-2xl bg-[#f3f7ef] p-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-md sm:p-4">
                  <div className="mb-3 grid h-8 w-8 place-items-center rounded-xl bg-white text-emerald-800 shadow-sm">
                    <Utensils size={16} />
                  </div>
                  <p className="text-lg font-black tracking-tight text-[#173d2b] sm:text-2xl">
                    120
                  </p>
                  <p className="mt-1 text-[10px] font-medium leading-4 text-slate-500 sm:text-[11px]">
                    Meal packets
                  </p>
                </div>

                <div className="hero-enter hero-delay-2 hero-interactive rounded-2xl bg-[#fff8eb] p-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-md sm:p-4">
                  <div className="mb-3 grid h-8 w-8 place-items-center rounded-xl bg-white text-amber-700 shadow-sm">
                    <Clock3 size={16} />
                  </div>
                  <p className="text-lg font-black tracking-tight text-[#704919] sm:text-2xl">
                    Urgent
                  </p>
                  <p className="mt-1 text-[10px] font-medium leading-4 text-slate-500 sm:text-[11px]">
                    Priority level
                  </p>
                </div>

                <div className="hero-enter hero-delay-3 hero-interactive rounded-2xl bg-[#f0f5fb] p-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-md sm:p-4">
                  <div className="mb-3 grid h-8 w-8 place-items-center rounded-xl bg-white text-blue-700 shadow-sm">
                    <MapPin size={16} />
                  </div>
                  <p className="text-lg font-black tracking-tight text-[#234a78] sm:text-2xl">
                    2.1 km
                  </p>
                  <p className="mt-1 text-[10px] font-medium leading-4 text-slate-500 sm:text-[11px]">
                    Sample route
                  </p>
                </div>
              </div>

              {/* Suggested rescues */}
              <div className="hero-enter hero-delay-2 rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-5">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-700">
                      Smart matching
                    </p>
                    <h3 className="mt-1 text-sm font-extrabold text-slate-900">
                      Suggested food rescues
                    </h3>
                  </div>
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-50 text-emerald-800">
                    <Sparkles size={18} />
                  </span>
                </div>

                <div className="hero-interactive rounded-2xl border border-emerald-100 bg-[#f7faf5] p-3.5 transition-all duration-300 hover:border-emerald-300 hover:shadow-md sm:p-4">
                  <div className="flex items-start gap-3">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-emerald-800 shadow-sm">
                      <Utensils size={18} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <PriorityBadge priority="Critical" size="xs" />
                        <span className="text-[10px] font-medium text-slate-500">
                          Connaught Place
                        </span>
                      </div>
                      <h4 className="mt-2 text-xs font-extrabold leading-5 text-slate-900 sm:text-sm">
                        Royal Biryani Feast
                      </h4>
                      <p className="mt-1 text-[11px] text-slate-500">
                        120 meal packets available
                      </p>
                    </div>

                    <div className="shrink-0 text-right">
                      <span className="block text-sm font-black text-emerald-800">
                        98%
                      </span>
                      <span className="text-[9px] font-semibold text-slate-400">
                        Match score
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-emerald-100">
                    <div className="hero-progress h-full w-[98%] rounded-full bg-emerald-600" />
                  </div>

                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-emerald-100 pt-3">
                    <span className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-600">
                      <HeartHandshake size={13} className="text-emerald-700" />
                      Hope Food Shelter
                    </span>
                    <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-800">
                      <CheckCircle2 size={13} />
                      Suggested match
                    </span>
                  </div>
                </div>

                <div className="hero-enter hero-delay-3 hero-interactive mt-3 flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/80 p-3.5 transition-all duration-300 hover:border-amber-200 hover:bg-amber-50/60">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-amber-700 shadow-sm">
                    <PackageCheck size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <PriorityBadge priority="High" size="xs" />
                      <span className="text-[10px] text-slate-500">
                        Barakhamba Road
                      </span>
                    </div>
                    <h4 className="mt-1.5 text-xs font-bold text-slate-800 sm:text-sm">
                      Fresh breads & muffins
                    </h4>
                    <p className="mt-1 text-[10px] text-slate-500">
                      85 meals · Annamrita Care
                    </p>
                  </div>
                  <ArrowUpRight size={17} className="shrink-0 text-slate-400" />
                </div>
              </div>

              {/* Dashboard footer */}
              <div className="mt-4 flex items-center justify-between gap-3 px-1 pb-1 pt-1">
                <div className="flex items-center gap-2">
                  <span className="hero-pulse grid h-8 w-8 place-items-center rounded-full bg-emerald-100 text-emerald-800">
                    <Leaf size={16} />
                  </span>
                  <div>
                    <p className="text-[11px] font-extrabold text-slate-800">
                      Food with a future
                    </p>
                    <p className="mt-0.5 text-[10px] text-slate-500">
                      Every meal counts
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-800">
                  <CircleDot size={13} />
                  <span>Illustrative preview</span>
                </div>
              </div>
            </div>

            {/* Floating impact card */}
            <div className="hero-float absolute -bottom-7 -left-2 hidden min-w-[190px] items-center gap-3 rounded-2xl border border-white/90 bg-white/95 p-3.5 shadow-[0_16px_45px_-16px_rgba(15,76,48,0.3)] backdrop-blur-xl sm:flex lg:-left-8">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-emerald-100 text-emerald-800">
                <TrendingUp size={21} />
              </div>
              <div>
                <p className="text-sm font-black text-slate-900">
                  Smarter redistribution
                </p>
                <p className="mt-1 text-[10px] font-medium text-slate-500">
                  Connecting food to communities
                </p>
              </div>
            </div>

            {/* Floating AI matching badge */}
            <div className="hero-float hero-pulse absolute -right-1 top-12 z-20 hidden items-center gap-2 rounded-full border border-amber-100 bg-white px-4 py-3 shadow-[0_12px_35px_-12px_rgba(120,80,20,0.24)] sm:flex lg:-right-4">
              <Sparkles size={17} className="text-amber-600" />
              <span className="whitespace-nowrap text-[11px] font-extrabold text-slate-800 sm:text-xs">
                AI-assisted matching
              </span>
            </div>
          </div>
        </div>

        {/* Bottom message */}
        <div className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-slate-200/80 pt-6 text-center sm:flex-row sm:text-left lg:mt-24">
          <p className="text-xs leading-6 text-slate-500 sm:text-sm">
            Turning surplus food into meaningful community impact.
          </p>
          <a
            href="#how-it-works"
            className="inline-flex items-center gap-2 text-xs font-bold text-emerald-800 transition hover:text-emerald-950 sm:text-sm"
          >
            Discover how it works
            <ArrowRight size={15} />
          </a>
        </div>
      </div>
    </section>
  );
};
