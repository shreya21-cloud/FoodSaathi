import React from 'react';
import { Link } from 'react-router-dom';
import {
  HeartHandshake,
  ShieldCheck,
  Truck,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Users,
  Leaf,
  ArrowLeft,
  Utensils,
  MapPin,
  Clock,
} from 'lucide-react';

export const AuthLayout = ({
  children,
  title,
  subtitle,
  activeMode = 'login', // 'login' | 'register'
}) => {
  return (
    <div className="min-h-screen w-full bg-[#fcfdf9] text-slate-900 flex flex-col justify-between selection:bg-emerald-200 selection:text-emerald-950 antialiased overflow-x-hidden">
      {/* Top Mobile Bar */}
      <header className="w-full lg:hidden border-b border-slate-200/70 bg-[#fcfdf9]/90 px-4 py-3.5 backdrop-blur-md flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-emerald-700 to-emerald-900 text-white shadow-md shadow-emerald-950/15">
            <HeartHandshake size={19} strokeWidth={2} />
          </div>
          <div>
            <div className="text-base font-black tracking-tight text-slate-950">
              Food<span className="text-emerald-700">Saathi</span>
            </div>
            <div className="text-[9px] font-bold uppercase tracking-widest text-slate-400">
              Zero Waste Network
            </div>
          </div>
        </Link>

        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-emerald-800 transition"
        >
          <ArrowLeft size={14} />
          <span>Home</span>
        </Link>
      </header>

      {/* Main Split Screen Container */}
      <main className="flex-1 w-full max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-70px)] lg:min-h-screen">
        {/* LEFT PANEL: Brand, Mission, Illustration & Benefit Points (Desktop) */}
        <section
          aria-label="FoodSaathi Network Introduction"
          className="hidden lg:flex lg:col-span-6 xl:col-span-7 flex-col justify-between p-8 xl:p-14 2xl:p-16 border-r border-slate-200/70 bg-gradient-to-br from-[#f8faf5] via-[#fcfdf9] to-emerald-50/40 relative overflow-hidden"
        >
          {/* Subtle Ambient Decorative Circles */}
          <div className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full bg-emerald-200/35 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-amber-200/30 blur-3xl" />

          {/* Top: Logo & Back to Home */}
          <div className="relative z-10 flex items-center justify-between">
            <Link
              to="/"
              className="inline-flex items-center gap-3 group transition"
              aria-label="Back to FoodSaathi Homepage"
            >
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-emerald-700 to-emerald-900 text-white shadow-lg shadow-emerald-950/20 group-hover:scale-105 transition-transform duration-300">
                <HeartHandshake size={23} strokeWidth={2} />
              </div>
              <div>
                <span className="block text-xl font-black tracking-tight text-slate-950">
                  Food<span className="text-emerald-700">Saathi</span>
                </span>
                <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                  AI-Powered Rescue Network
                </span>
              </div>
            </Link>

            <Link
              to="/"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-slate-200/80 bg-white/80 hover:bg-white text-xs font-semibold text-slate-600 hover:text-emerald-800 shadow-xs transition"
            >
              <ArrowLeft size={14} />
              <span>Back to website</span>
            </Link>
          </div>

          {/* Middle: Headline, Visual, and Benefit Points */}
          <div className="relative z-10 my-8 xl:my-10 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/70 border border-emerald-200/70 text-emerald-900 text-xs font-bold tracking-wide mb-5">
              <Sparkles size={13} className="text-emerald-700" />
              <span>Every meal deserves a second chance.</span>
            </div>

            <h1 className="text-3xl xl:text-4xl 2xl:text-5xl font-black tracking-tight text-slate-900 leading-[1.15]">
              Connecting food surplus with{' '}
              <span className="text-emerald-800 underline decoration-emerald-300 decoration-wavy underline-offset-4">
                local community hunger
              </span>{' '}
              in real time.
            </h1>

            <p className="mt-4 text-sm xl:text-base text-slate-600 leading-relaxed">
              Join our nationwide collaborative ecosystem linking conscious commercial donors,
              dedicated NGOs, and verified volunteer rescue couriers through automated AI matchmaking.
            </p>

            {/* Visual Food Rescue Flow Graphic */}
            <div className="mt-8 p-5 rounded-3xl bg-white/90 border border-slate-200/80 shadow-md shadow-slate-900/[0.03] backdrop-blur-sm">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-between">
                <span>Rescue Ecosystem in Motion</span>
                <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
                  </span>
                  Live Dispatch
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-100 flex flex-col items-center">
                  <div className="w-8 h-8 rounded-xl bg-emerald-700 text-white grid place-items-center mb-1.5 shadow-sm">
                    <Utensils size={15} />
                  </div>
                  <span className="text-[11px] font-bold text-slate-800">1. Donors</span>
                  <span className="text-[10px] text-slate-500">Post surplus meals</span>
                </div>

                <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-100 flex flex-col items-center">
                  <div className="w-8 h-8 rounded-xl bg-amber-600 text-white grid place-items-center mb-1.5 shadow-sm">
                    <Sparkles size={15} />
                  </div>
                  <span className="text-[11px] font-bold text-slate-800">2. AI Match</span>
                  <span className="text-[10px] text-slate-500">Urgency & proximity</span>
                </div>

                <div className="p-3 rounded-2xl bg-blue-50/70 border border-blue-100 flex flex-col items-center">
                  <div className="w-8 h-8 rounded-xl bg-blue-600 text-white grid place-items-center mb-1.5 shadow-sm">
                    <Truck size={15} />
                  </div>
                  <span className="text-[11px] font-bold text-slate-800">3. Fast Delivery</span>
                  <span className="text-[10px] text-slate-500">To verified shelters</span>
                </div>
              </div>
            </div>

            {/* 3 Concise Benefit Points */}
            <ul className="mt-8 space-y-3.5">
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 grid place-items-center mt-0.5 shrink-0">
                  <CheckCircle2 size={13} strokeWidth={2.5} />
                </div>
                <div>
                  <h4 className="text-xs xl:text-sm font-bold text-slate-800">
                    Connect with verified food rescue partners
                  </h4>
                  <p className="text-[11px] xl:text-xs text-slate-500">
                    Trusted NGO shelters, soup kitchens, and audited commercial food establishments.
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 grid place-items-center mt-0.5 shrink-0">
                  <CheckCircle2 size={13} strokeWidth={2.5} />
                </div>
                <div>
                  <h4 className="text-xs xl:text-sm font-bold text-slate-800">
                    Coordinate donations and deliveries
                  </h4>
                  <p className="text-[11px] xl:text-xs text-slate-500">
                    Real-time temperature safety timers, routing maps, and instant courier assignment.
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 grid place-items-center mt-0.5 shrink-0">
                  <CheckCircle2 size={13} strokeWidth={2.5} />
                </div>
                <div>
                  <h4 className="text-xs xl:text-sm font-bold text-slate-800">
                    Make a measurable community impact
                  </h4>
                  <p className="text-[11px] xl:text-xs text-slate-500">
                    Live analytics tracking CO₂ emission prevention, water conservation, and meals served.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Bottom: Subtle Real Impact Statistics Section */}
          <div className="relative z-10 pt-6 border-t border-slate-200/80">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-lg xl:text-xl font-black text-slate-900 tracking-tight">1,420+</div>
                <div className="text-[11px] font-semibold text-slate-500">Meals Rescued</div>
              </div>
              <div>
                <div className="text-lg xl:text-xl font-black text-emerald-800 tracking-tight">85+</div>
                <div className="text-[11px] font-semibold text-slate-500">Partner Shelters</div>
              </div>
              <div>
                <div className="text-lg xl:text-xl font-black text-amber-700 tracking-tight">94%</div>
                <div className="text-[11px] font-semibold text-slate-500">Dispatch Rate</div>
              </div>
            </div>
          </div>
        </section>

        {/* RIGHT PANEL: Authentication Form Card */}
        <section
          aria-label="Authentication Form"
          className="lg:col-span-6 xl:col-span-5 flex flex-col justify-center px-4 sm:px-8 xl:px-12 py-8 sm:py-12"
        >
          <div className="w-full max-w-md mx-auto">
            {/* Header Titles */}
            <div className="text-left mb-6">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 text-[11px] font-bold uppercase tracking-wider mb-2">
                <Leaf size={12} />
                <span>FoodSaathi Security</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {title}
              </h2>
              <p className="mt-1.5 text-xs sm:text-sm text-slate-500">
                {subtitle}
              </p>
            </div>

            {/* Auth Mode Toggle Bar */}
            <div className="mb-6 p-1 rounded-2xl bg-slate-100/90 border border-slate-200/80 grid grid-cols-2 gap-1 text-xs font-bold">
              <Link
                to="/login"
                className={`py-2 text-center rounded-xl transition-all ${
                  activeMode === 'login'
                    ? 'bg-white text-slate-900 shadow-sm border border-slate-200/60'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className={`py-2 text-center rounded-xl transition-all ${
                  activeMode === 'register'
                    ? 'bg-white text-slate-900 shadow-sm border border-slate-200/60'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Create Account
              </Link>
            </div>

            {/* Injected Auth Form Card */}
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-900/[0.04] p-6 sm:p-8">
              {children}
            </div>

            {/* Footer Trust & Links */}
            <div className="mt-6 text-center text-xs text-slate-500 space-y-2">
              <p className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
                <ShieldCheck size={13} className="text-emerald-700" />
                <span>256-bit encrypted authentication & role-based access control</span>
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AuthLayout;
