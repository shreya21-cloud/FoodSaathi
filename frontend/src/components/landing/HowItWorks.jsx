import React from "react";
import {
  PlusCircle,
  Cpu,
  Bike,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Clock3,
} from "lucide-react";

export const HowItWorks = () => {
  const steps = [
    {
      step: "01",
      title: "Post surplus food",
      description:
        "Donors list available food, quantities, freshness deadlines and pickup instructions in one simple flow.",
      icon: PlusCircle,
      badge: "FOR FOOD DONORS",
      highlights: [
        "Automatic freshness timer",
        "AI duplicate detection",
        "Smart dietary tagging",
      ],
      accent: "emerald",
    },
    {
      step: "02",
      title: "Find the right match",
      description:
        "Our matching engine considers distance, NGO capacity, food preferences and remaining shelf life.",
      icon: Cpu,
      badge: "INTELLIGENT MATCHING",
      highlights: [
        "Distance and capacity scoring",
        "Food safety priority triage",
        "Top-3 recommendations",
      ],
      accent: "amber",
    },
    {
      step: "03",
      title: "Deliver with purpose",
      description:
        "Volunteers coordinate pickups and bring surplus food to shelters and communities that need it.",
      icon: Bike,
      badge: "FOR RESCUE VOLUNTEERS",
      highlights: [
        "Route optimization",
        "Dispatch timeline",
        "Delivery verification",
      ],
      accent: "teal",
    },
  ];

  const accentStyles = {
    emerald: {
      icon: "bg-emerald-100 text-emerald-800 ring-emerald-200",
      number: "text-emerald-800",
      badge: "border-emerald-200 bg-emerald-50 text-emerald-800",
      line: "bg-emerald-200",
      glow: "group-hover:shadow-emerald-900/10",
    },
    amber: {
      icon: "bg-amber-100 text-amber-800 ring-amber-200",
      number: "text-amber-700",
      badge: "border-amber-200 bg-amber-50 text-amber-800",
      line: "bg-amber-200",
      glow: "group-hover:shadow-amber-900/10",
    },
    teal: {
      icon: "bg-teal-100 text-teal-800 ring-teal-200",
      number: "text-teal-800",
      badge: "border-teal-200 bg-teal-50 text-teal-800",
      line: "bg-teal-200",
      glow: "group-hover:shadow-teal-900/10",
    },
  };

  return (
    <section className="relative overflow-hidden bg-[#fcfdf9] py-20 sm:py-24 lg:py-28">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-32 top-24 h-80 w-80 rounded-full bg-emerald-100/50 blur-[100px]" />
      <div className="pointer-events-none absolute -right-32 bottom-12 h-80 w-80 rounded-full bg-amber-100/40 blur-[100px]" />

      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* Section heading */}
        <div className="mx-auto mb-14 max-w-3xl text-center sm:mb-16">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-4 py-2 shadow-sm">
            <Sparkles size={14} className="text-emerald-700" />
            <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-emerald-900 sm:text-[11px]">
              A smarter way to rescue food
            </span>
          </div>

          <h2 className="text-3xl font-black leading-tight tracking-[-0.055em] text-[#173528] sm:text-4xl lg:text-5xl">
            From surplus to
            <span className="text-emerald-700"> someone’s next meal.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
            Three coordinated steps bring food donors, intelligent matching and
            volunteer delivery together in one connected rescue network.
          </p>
        </div>

        {/* Workflow connector */}
        <div className="relative">
          <div className="pointer-events-none absolute left-[16.66%] right-[16.66%] top-[37px] hidden h-px bg-gradient-to-r from-emerald-300 via-amber-300 to-teal-300 lg:block" />

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const style = accentStyles[step.accent];

              return (
                <article
                  key={step.step}
                  className={`group relative flex flex-col overflow-hidden rounded-[28px] border border-white bg-white/90 p-6 shadow-[0_10px_40px_-25px_rgba(15,76,48,0.22)] transition-all duration-300 hover:-translate-y-2 hover:border-emerald-200 hover:shadow-[0_25px_60px_-25px_rgba(15,76,48,0.2)] ${style.glow} sm:p-7 lg:p-8`}
                >
                  {/* Subtle top accent */}
                  <div
                    className={`absolute inset-x-0 top-0 h-1 ${style.line} opacity-70 transition-opacity group-hover:opacity-100`}
                  />

                  {/* Step header */}
                  <div className="relative flex items-center justify-between gap-3">
                    <span
                      className={`inline-flex items-center rounded-full border px-3 py-1.5 text-[9px] font-extrabold tracking-[0.13em] ${style.badge}`}
                    >
                      {step.badge}
                    </span>

                    <span
                      className={`text-4xl font-black leading-none tracking-[-0.07em] ${style.number} opacity-20 transition-opacity group-hover:opacity-50`}
                    >
                      {step.step}
                    </span>
                  </div>

                  {/* Icon and workflow direction */}
                  <div className="relative mt-7 flex items-center justify-between">
                    <div
                      className={`grid h-[62px] w-[62px] place-items-center rounded-[20px] ring-1 ring-inset transition-all duration-300 group-hover:scale-105 group-hover:rotate-3 ${style.icon}`}
                    >
                      <Icon size={28} strokeWidth={1.8} />
                    </div>

                    {idx < 2 && (
                      <div className="flex items-center gap-2 rounded-full bg-slate-50 px-3 py-2 text-[10px] font-bold text-slate-400">
                        <span>STEP {idx + 1}</span>
                        <ArrowRight size={13} />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="mt-7">
                    <h3 className="text-xl font-extrabold leading-snug tracking-[-0.035em] text-[#173528] sm:text-2xl">
                      {step.title}
                    </h3>

                    <p className="mt-3 min-h-[84px] text-sm leading-7 text-slate-600">
                      {step.description}
                    </p>
                  </div>

                  {/* Highlights */}
                  <div className="mt-6 flex-1 border-t border-slate-100 pt-5">
                    <p className="mb-4 text-[10px] font-extrabold uppercase tracking-[0.15em] text-slate-400">
                      What happens
                    </p>

                    <div className="space-y-3">
                      {step.highlights.map((item) => (
                        <div
                          key={item}
                          className="flex items-start gap-2.5 text-xs font-medium leading-5 text-slate-600"
                        >
                          <CheckCircle2
                            size={15}
                            className="mt-0.5 shrink-0 text-emerald-700"
                          />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom label */}
                  <div className="mt-7 flex items-center justify-between border-t border-slate-100 pt-4">
                    <span className="text-[10px] font-bold text-slate-400">
                      FOODSAATHI AI
                    </span>

                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 group-hover:translate-x-1 ${style.icon}`}
                    >
                      <ArrowRight size={15} />
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Bottom reassurance strip */}
        <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-emerald-100/80 bg-white/75 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-100 text-emerald-800">
              <ShieldCheck size={20} />
            </div>

            <div>
              <p className="text-sm font-extrabold text-[#173528]">
                Every connection has a purpose.
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                Designed around food availability, recipient needs and
                coordinated collection.
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2 text-xs font-bold text-emerald-800">
            <Clock3 size={16} />
            Faster, smarter coordination
          </div>
        </div>
      </div>
    </section>
  );
};
