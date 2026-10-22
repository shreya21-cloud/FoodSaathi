import React from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  Heart,
  Github,
  Twitter,
  Linkedin,
  Mail,
  ArrowUpRight,
  Leaf,
  Utensils,
} from "lucide-react";

export const Footer = () => {
  const platformLinks = [
    { label: "Main Dashboard", to: "/dashboard" },
    { label: "Donation Listings", to: "/donations" },
    { label: "AI Matchmaker", to: "/ai-matching" },
    { label: "Rescue Simulator", to: "/simulator", highlight: true },
    { label: "Interactive Map", to: "/map" },
  ];

  const workflowLinks = [
    { label: "Donor Portal", to: "/donations" },
    { label: "NGO Dashboard", to: "/ngos" },
    { label: "Volunteer Hub", to: "/volunteers" },
    { label: "Delivery Tracking", to: "/deliveries" },
    { label: "Impact Reports", to: "/analytics" },
  ];

  const socialLinks = [
    { label: "GitHub", icon: Github, href: null },
    { label: "Twitter", icon: Twitter, href: null },
    { label: "LinkedIn", icon: Linkedin, href: null },
    { label: "Email", icon: Mail, href: null },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden border-t border-[#e3e7dc] bg-[#f8f7f0] text-[#193d30]">
      {/* Decorative background */}
      <div className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-emerald-100/40 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-20 h-64 w-64 rounded-full bg-amber-100/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Main footer */}
        <div className="grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.35fr_0.8fr_0.9fr_1.15fr] lg:gap-12 lg:py-16">
          {/* Brand */}
          <div>
            <Link
              to="/"
              aria-label="FoodRescue AI home"
              className="group inline-flex items-center gap-3"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#204634] text-white shadow-lg shadow-emerald-950/10 transition-transform duration-300 group-hover:rotate-[-5deg] group-hover:scale-105">
                <Sparkles size={21} />
              </div>

              <span className="text-lg font-bold tracking-tight text-[#193d30]">
                FoodRescue
                <span className="text-emerald-700"> AI</span>
              </span>
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-7 text-slate-600">
              Giving surplus food a second life through smarter matching,
              coordinated delivery, and community-driven food rescue.
            </p>

            <div className="mt-6 flex items-center gap-2 text-xs font-medium text-emerald-800">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100">
                <Leaf size={14} />
              </span>
              <span>Less waste. More nourishment.</span>
            </div>

            <div className="mt-6 flex items-center gap-2">
              {socialLinks.map(({ label, icon: Icon, href }) => (
                <a
                  key={label}
                  href={href || undefined}
                  aria-label={label}
                  title={href ? label : `${label} link not configured`}
                  onClick={href ? undefined : (event) => event.preventDefault()}
                  aria-disabled={!href}
                  tabIndex={href ? 0 : -1}
                  className={`flex h-10 w-10 items-center justify-center rounded-xl border border-[#e1e6dc] bg-white transition-all duration-200 ${
                    href
                      ? "text-slate-600 hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800"
                      : "cursor-default text-slate-300"
                  }`}
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          {/* Platform links */}
          <div>
            <h3 className="mb-5 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-800">
              Platform
            </h3>

            <ul className="space-y-3.5">
              {platformLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className={`group inline-flex items-center gap-1.5 text-sm transition-colors duration-200 ${
                      item.highlight
                        ? "font-semibold text-amber-800 hover:text-amber-600"
                        : "text-slate-600 hover:text-emerald-800"
                    }`}
                  >
                    {item.label}
                    {item.highlight && (
                      <ArrowUpRight
                        size={13}
                        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Workflows */}
          <div>
            <h3 className="mb-5 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-800">
              Workflows
            </h3>

            <ul className="space-y-3.5">
              {workflowLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="text-sm text-slate-600 transition-colors duration-200 hover:text-emerald-800"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Project note */}
          <div>
            <h3 className="mb-5 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-800">
              Our mission
            </h3>

            <div className="relative overflow-hidden rounded-[22px] border border-[#dfe7dc] bg-white/80 p-5">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-800">
                <Utensils size={19} />
              </div>

              <h4 className="text-base font-semibold leading-snug text-[#193d30]">
                Good food belongs on a plate, not in a landfill.
              </h4>

              <p className="mt-3 text-xs leading-6 text-slate-500">
                Connecting food donors, community organizations, and volunteers
                to make food redistribution more accessible.
              </p>

              <div className="mt-5 h-1 w-12 rounded-full bg-emerald-600" />
            </div>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="border-t border-[#e0e5db] py-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs leading-5 text-slate-500">
              © {new Date().getFullYear()} FoodRescue AI. All rights reserved.
            </p>

            <div className="flex flex-wrap items-center gap-x-2 text-xs text-slate-500">
              <span>Made with</span>
              <Heart size={13} className="fill-rose-500 text-rose-500" />
              <span>for a more sustainable future.</span>
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 self-start rounded-full border border-[#dfe5da] bg-white px-4 py-2.5 text-xs font-semibold text-emerald-900 transition-all duration-200 hover:border-emerald-300 hover:bg-emerald-50 sm:self-auto"
            >
              Back to top
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
