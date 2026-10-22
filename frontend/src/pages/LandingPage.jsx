import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  LogIn,
  LayoutDashboard,
  Menu,
  X,
  HeartHandshake,
  Leaf,
} from "lucide-react";

import { Hero } from "../components/landing/Hero";
import { StatsSection } from "../components/landing/StatsSection";
import { HowItWorks } from "../components/landing/HowItWorks";
import { FeaturesSection } from "../components/landing/FeaturesSection";
import { ImpactSection } from "../components/landing/ImpactSection";
import { Testimonials } from "../components/landing/Testimonials";
import { Footer } from "../components/landing/Footer";
import { ToastContainer } from "../components/common/ToastContainer";
import { useAuth } from "../context/AuthContext";

export const LandingPage = () => {
  const { isAuthenticated } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const navLinks = [
    { label: "How it works", href: "#how-it-works" },
    { label: "AI capabilities", href: "#features" },
    { label: "Our impact", href: "#impact" },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#fcfdfb] text-slate-900 selection:bg-emerald-200 selection:text-emerald-950">
      <style>{`
        html {
          scroll-behavior: smooth;
          scroll-padding-top: 100px;
        }

        .fr-navbar {
          animation: fr-navbar-enter .5s ease-out both;
        }

        .fr-link {
          position: relative;
        }

        .fr-link::after {
          position: absolute;
          right: 0;
          bottom: -7px;
          left: 0;
          height: 2px;
          content: "";
          background: #059669;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform .25s ease;
        }

        .fr-link:hover::after {
          transform: scaleX(1);
        }

        .fr-cta {
          transition:
            transform .25s ease,
            box-shadow .25s ease,
            background-color .25s ease;
        }

        .fr-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(6, 95, 70, .18);
        }

        @keyframes fr-navbar-enter {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          html {
            scroll-behavior: auto;
          }

          *,
          *::before,
          *::after {
            animation-duration: .01ms !important;
            transition-duration: .01ms !important;
          }
        }
      `}</style>

      {/* Premium announcement bar */}
      <div className="relative overflow-hidden bg-[#123c2e] px-4 py-2.5 text-center text-xs text-white sm:text-sm">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-emerald-950 via-emerald-800/50 to-emerald-950" />

        <div className="relative flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
          <Sparkles size={14} className="text-amber-300" />

          <span className="font-medium text-emerald-50/90">
            Technology with purpose. Communities with hope.
          </span>

          <a
            href="#how-it-works"
            className="inline-flex items-center gap-1 font-bold text-emerald-200 transition hover:text-white"
          >
            Discover how <ArrowUpRight size={13} />
          </a>
        </div>
      </div>

      {/* Main navigation */}
      <header className="fr-navbar sticky top-0 z-50 border-b border-slate-200/70 bg-[#fcfdfb]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-12">
          {/* Brand */}
          <Link
            to="/"
            onClick={closeMenu}
            aria-label="FoodRescue AI home"
            className="group flex shrink-0 items-center gap-3"
          >
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-emerald-700 to-emerald-900 text-white shadow-lg shadow-emerald-950/15 transition duration-300 group-hover:-rotate-3 group-hover:scale-105">
              <HeartHandshake size={23} strokeWidth={1.8} />
            </span>

            <span className="leading-tight">
              <span className="block text-[19px] font-black tracking-[-0.06em] text-slate-950 sm:text-xl">
                FoodRescue
                <span className="text-emerald-700"> AI</span>
              </span>

              <span className="mt-1 block text-[9px] font-bold uppercase tracking-[0.22em] text-slate-400">
                Zero waste network
              </span>
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-7 xl:flex"
          >
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="fr-link py-2 text-[13px] font-semibold text-slate-600 transition-colors hover:text-emerald-800"
              >
                {item.label}
              </a>
            ))}

            <Link
              to="/simulator"
              className="group inline-flex items-center gap-2 rounded-full border border-amber-200/80 bg-amber-50/80 px-4 py-2.5 text-xs font-extrabold text-amber-800 transition hover:border-amber-300 hover:bg-amber-100"
            >
              <Sparkles
                size={15}
                className="text-amber-600 transition-transform group-hover:rotate-12"
              />
              Rescue simulator
              <ArrowUpRight
                size={13}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </nav>

          {/* Desktop actions */}
          <div className="hidden items-center gap-3 md:flex">
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="fr-cta inline-flex min-h-11 items-center gap-2 rounded-full bg-emerald-800 px-5 text-xs font-bold text-white shadow-md shadow-emerald-900/10 hover:bg-emerald-900"
              >
                <LayoutDashboard size={16} />
                Open dashboard
                <ArrowRight size={14} />
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
                >
                  <LogIn size={15} />
                  Log in
                </Link>

                <Link
                  to="/dashboard"
                  className="fr-cta inline-flex min-h-11 items-center gap-2 rounded-full bg-emerald-800 px-5 text-xs font-bold text-white shadow-md shadow-emerald-900/10 hover:bg-emerald-900 sm:text-sm"
                >
                  Explore platform
                  <ArrowRight size={15} />
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-slate-200 bg-white text-slate-800 transition hover:border-emerald-300 hover:bg-emerald-50 md:hidden"
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>

        {/* Mobile navigation */}
        {menuOpen && (
          <div className="border-t border-slate-200 bg-white px-5 py-5 shadow-xl md:hidden">
            <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
              {navLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className="rounded-xl px-4 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-800"
                >
                  {item.label}
                </a>
              ))}

              <Link
                to="/simulator"
                onClick={closeMenu}
                className="flex items-center gap-2 rounded-xl px-4 py-3.5 text-sm font-bold text-amber-800 transition hover:bg-amber-50"
              >
                <Sparkles size={17} />
                Rescue simulator
                <ArrowRight size={15} className="ml-auto" />
              </Link>

              <div className="my-3 border-t border-slate-100" />

              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  onClick={closeMenu}
                  className="flex items-center justify-center gap-2 rounded-full bg-emerald-800 px-5 py-3.5 text-sm font-bold text-white"
                >
                  <LayoutDashboard size={17} />
                  Open dashboard
                </Link>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    to="/login"
                    onClick={closeMenu}
                    className="flex items-center justify-center gap-2 rounded-full border border-slate-200 px-4 py-3.5 text-sm font-bold text-slate-700"
                  >
                    <LogIn size={16} />
                    Log in
                  </Link>

                  <Link
                    to="/dashboard"
                    onClick={closeMenu}
                    className="flex items-center justify-center gap-2 rounded-full bg-emerald-800 px-4 py-3.5 text-sm font-bold text-white"
                  >
                    Live demo
                    <ArrowRight size={15} />
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </header>

      {/* Existing landing page components */}
      <main className="flex-1">
        <Hero />

        <StatsSection />

        <div id="how-it-works" className="scroll-mt-24">
          <HowItWorks />
        </div>

        <div id="features" className="scroll-mt-24">
          <FeaturesSection />
        </div>

        <div id="impact" className="scroll-mt-24">
          <ImpactSection />
        </div>

        <Testimonials />
      </main>

      {/* Closing CTA */}
      <section className="px-5 pb-16 pt-6 sm:px-8 sm:pb-20 lg:px-12">
        <div className="relative mx-auto max-w-[1360px] overflow-hidden rounded-[2rem] bg-[#123c2e] px-6 py-12 text-center text-white sm:px-12 sm:py-16 lg:rounded-[2.5rem] lg:py-20">
          <div className="pointer-events-none absolute -right-24 -top-32 h-80 w-80 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -right-10 -top-16 h-56 w-56 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl" />

          <div className="relative mx-auto max-w-3xl">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-white/10 bg-white/10 text-emerald-200">
              <Leaf size={27} />
            </span>

            <p className="mt-6 text-xs font-bold uppercase tracking-[0.22em] text-emerald-200">
              Every contribution matters
            </p>

            <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-[-0.045em] sm:text-4xl lg:text-5xl">
              Let's make surplus
              <span className="text-emerald-300"> mean something.</span>
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-emerald-50/75 sm:text-base sm:leading-8">
              Join a connected food-rescue network where donors, NGOs and
              volunteers can work together towards a more thoughtful food
              system.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/dashboard"
                className="fr-cta inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-extrabold text-emerald-950 hover:bg-emerald-50"
              >
                Explore FoodRescue AI
                <ArrowRight size={17} />
              </Link>

              <Link
                to="/simulator"
                className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm font-bold text-white transition hover:border-white/40 hover:bg-white/10"
              >
                Try the simulator
                <Sparkles size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <ToastContainer />
    </div>
  );
};

export default LandingPage;
