import React from "react";
import {
  Utensils,
  Building2,
  Users,
  Leaf,
  ArrowUpRight,
  HeartHandshake,
} from "lucide-react";
import { useData } from "../../context/DataContext";

export const StatsSection = () => {
  const { summaryMetrics } = useData();

  const stats = [
    {
      label: "Meals rescued",
      value: `${(summaryMetrics?.totalMealsRescued ?? 0).toLocaleString()}+`,
      subtitle: "Food redirected to those in need",
      icon: Utensils,
      iconColor: "text-emerald-800",
      iconBg: "bg-emerald-100",
      accent: "from-emerald-500/10",
    },
    {
      label: "Active food donors",
      value: "120+",
      subtitle: "Restaurants, hotels & caterers",
      icon: Users,
      iconColor: "text-blue-800",
      iconBg: "bg-blue-100",
      accent: "from-blue-500/10",
    },
    {
      label: "NGO partners",
      value: "14+",
      subtitle: "Community kitchens & shelters",
      icon: Building2,
      iconColor: "text-amber-800",
      iconBg: "bg-amber-100",
      accent: "from-amber-500/10",
    },
    {
      label: "CO₂ avoided",
      value: "32,000 kg",
      subtitle: "A step towards less food waste",
      icon: Leaf,
      iconColor: "text-teal-800",
      iconBg: "bg-teal-100",
      accent: "from-teal-500/10",
    },
  ];

  return (
    <section className="relative overflow-hidden border-y border-emerald-950/[0.06] bg-[#f7f8f1] py-14 sm:py-16 lg:py-20">
      {/* Soft background accents */}
      <div className="pointer-events-none absolute -left-24 top-0 h-64 w-64 rounded-full bg-emerald-100/60 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-amber-100/50 blur-3xl" />

      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* Section heading */}
        <div className="mb-9 flex flex-col gap-4 sm:mb-11 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.2em] text-emerald-800 sm:text-[11px]">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
              Our growing impact
            </div>

            <h2 className="text-2xl font-black leading-tight tracking-[-0.045em] text-[#173528] sm:text-3xl lg:text-4xl">
              Small actions.
              <span className="text-emerald-700"> Meaningful impact.</span>
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
              Every rescued meal is a step towards reducing waste and connecting
              surplus food with communities that need it.
            </p>
          </div>

          <div className="flex w-fit items-center gap-2 rounded-full border border-emerald-200/80 bg-white/80 px-4 py-2.5">
            <HeartHandshake size={16} className="text-emerald-700" />
            <span className="text-xs font-bold text-slate-700">
              Food. People. Planet.
            </span>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <article
                key={stat.label}
                className="group relative overflow-hidden rounded-[24px] border border-white bg-white/90 p-5 shadow-[0_5px_25px_-15px_rgba(15,76,48,0.15)] transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-200 hover:shadow-[0_20px_45px_-20px_rgba(15,76,48,0.22)] sm:p-6"
              >
                {/* Decorative card gradient */}
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${stat.accent} to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-100`}
                />

                <div className="relative">
                  <div className="flex items-start justify-between gap-3">
                    <div
                      className={`grid h-12 w-12 place-items-center rounded-2xl ${stat.iconBg} ${stat.iconColor} transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3`}
                    >
                      <Icon size={23} strokeWidth={1.8} />
                    </div>

                    <span className="grid h-8 w-8 place-items-center rounded-full border border-slate-100 bg-white text-slate-400 transition-all duration-300 group-hover:border-emerald-200 group-hover:text-emerald-700">
                      <ArrowUpRight size={16} />
                    </span>
                  </div>

                  <p className="mt-7 break-words text-[clamp(1.65rem,2.6vw,2.25rem)] font-black leading-none tracking-[-0.055em] text-[#173528]">
                    {stat.value}
                  </p>

                  <h3 className="mt-3 text-sm font-extrabold text-slate-800">
                    {stat.label}
                  </h3>

                  <p className="mt-1.5 text-xs leading-5 text-slate-500">
                    {stat.subtitle}
                  </p>

                  <div className="mt-5 h-1 w-full overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full w-1/3 rounded-full bg-emerald-600/70 transition-all duration-500 group-hover:w-2/3" />
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Closing note */}
        <div className="mt-6 flex flex-col gap-2 text-[11px] text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            Together, we're building a more thoughtful food-rescue ecosystem.
          </p>
          <p className="font-medium text-slate-400">
            Metrics shown as platform summary
          </p>
        </div>
      </div>
    </section>
  );
};
