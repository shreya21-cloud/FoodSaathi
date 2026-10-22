import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useData } from "../../context/DataContext";
import {
  LayoutDashboard,
  UtensilsCrossed,
  Building2,
  Bike,
  Truck,
  Sparkles,
  Cpu,
  MapPin,
  BarChart3,
  Settings,
  Flame,
  Globe,
  X,
  ArrowUpRight,
  HeartHandshake,
  Leaf,
  ChevronRight,
} from "lucide-react";

export const Sidebar = ({ isOpen, closeSidebar }) => {
  const { summaryMetrics, donations, deliveries } = useData();

  const availableDonations = donations.filter(
    (d) => d.status === "Available",
  ).length;

  const activeDeliveries = deliveries.filter((d) =>
    ["Assigned", "Accepted", "Picked Up"].includes(d.status),
  ).length;

  const groups = [
    {
      title: "Workspace",
      items: [
        { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
        {
          name: "Food Donations",
          path: "/donations",
          icon: UtensilsCrossed,
          badge: availableDonations,
          color: "green",
        },
        { name: "Partner NGOs", path: "/ngos", icon: Building2 },
        { name: "Volunteers", path: "/volunteers", icon: Bike },
        {
          name: "Active Deliveries",
          path: "/deliveries",
          icon: Truck,
          badge: activeDeliveries,
          color: "blue",
        },
      ],
    },
    {
      title: "Intelligence",
      items: [
        {
          name: "AI Matchmaker",
          path: "/ai-matching",
          icon: Cpu,
          badge: "AI",
          color: "purple",
        },
        {
          name: "Rescue Simulator",
          path: "/simulator",
          icon: Sparkles,
          badge: "LAB",
          color: "amber",
        },
        { name: "Interactive Map", path: "/map", icon: MapPin },
        { name: "Impact Analytics", path: "/analytics", icon: BarChart3 },
      ],
    },
    {
      title: "System",
      items: [{ name: "Settings", path: "/settings", icon: Settings }],
    },
  ];

  const badgeColors = {
    green: "bg-emerald-50 text-emerald-700 border-emerald-100",
    blue: "bg-blue-50 text-blue-700 border-blue-100",
    purple: "bg-violet-50 text-violet-700 border-violet-100",
    amber: "bg-amber-50 text-amber-700 border-amber-100",
  };

  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Close navigation backdrop"
          onClick={closeSidebar}
          className="fixed inset-0 z-40 bg-slate-950/45 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        aria-label="Main navigation"
        className={`fixed inset-y-0 left-0 z-50 flex w-[264px] flex-col overflow-hidden border-r border-white/70 bg-[#f8fbf9]/90 shadow-[8px_0_35px_rgba(15,45,35,0.05)] backdrop-blur-2xl transition-transform duration-300 ease-out lg:sticky lg:top-0 lg:z-30 lg:h-screen lg:shrink-0 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Subtle glass background details */}
        <div className="pointer-events-none absolute -left-20 top-28 h-48 w-48 rounded-full bg-emerald-200/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 top-[42%] h-44 w-44 rounded-full bg-teal-100/30 blur-3xl" />

        {/* Brand header */}
        <div className="relative flex h-[76px] shrink-0 items-center justify-between border-b border-white/80 bg-white/60 px-4">
          <Link
            to="/dashboard"
            onClick={closeSidebar}
            className="group flex min-w-0 items-center gap-3"
          >
            <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-[15px] bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-900 text-white shadow-lg shadow-emerald-900/15 transition-transform duration-200 group-hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
              <HeartHandshake
                className="relative h-[21px] w-[21px]"
                strokeWidth={1.8}
              />
            </div>

            <div className="min-w-0">
              <p className="truncate text-[14px] font-extrabold tracking-tight text-slate-900">
                Food<span className="text-emerald-700">Saathi</span>
              </p>
              <p className="mt-1 text-[9px] font-semibold tracking-[0.12em] text-slate-400">
                ZERO WASTE NETWORK
              </p>
            </div>
          </Link>

          <button
            type="button"
            onClick={closeSidebar}
            aria-label="Close sidebar"
            className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-white hover:text-slate-800 lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        {/* Impact glass widget */}
        <div className="relative shrink-0 px-3.5 pb-4 pt-4">
          <div className="relative overflow-hidden rounded-2xl border border-white bg-white/65 p-4 shadow-[0_5px_22px_rgba(15,45,35,0.04)] backdrop-blur-xl">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-50/80 via-white/20 to-teal-50/70" />
            <div className="pointer-events-none absolute -right-8 -top-10 h-28 w-28 rounded-full border border-emerald-200/50" />
            <div className="pointer-events-none absolute -right-2 -top-4 h-16 w-16 rounded-full border border-emerald-200/40" />

            <div className="relative flex items-center justify-between gap-2">
              <span className="flex items-center gap-2 text-[9px] font-extrabold uppercase tracking-[0.13em] text-emerald-800">
                <span className="flex h-7 w-7 items-center justify-center rounded-xl border border-emerald-100 bg-white/80 text-emerald-700 shadow-sm">
                  <Flame size={15} />
                </span>
                Community impact
              </span>
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
            </div>

            <div className="relative mt-4 flex items-end justify-between gap-3">
              <div>
                <p className="text-[28px] font-extrabold leading-none tracking-[-0.04em] tabular-nums text-slate-900">
                  {(summaryMetrics.totalMealsRescued ?? 0).toLocaleString()}
                </p>
                <p className="mt-2 text-[11px] font-medium text-slate-500">
                  Meals rescued
                </p>
              </div>

              <div className="mb-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-emerald-100/80 bg-white/80 text-emerald-700 shadow-sm">
                <HeartHandshake size={21} strokeWidth={1.7} />
              </div>
            </div>

            <div className="relative mt-4 flex items-center gap-2 border-t border-emerald-900/[0.07] pt-3">
              <Leaf size={13} className="shrink-0 text-emerald-700" />
              <p className="text-[10px] font-medium text-slate-500">
                Every meal matters.
              </p>
              <span className="ml-auto text-[9px] font-bold tracking-wide text-emerald-800">
                IMPACT
              </span>
            </div>
          </div>
        </div>

        {/* Navigation groups */}
        <nav className="relative min-h-0 flex-1 space-y-5 overflow-y-auto px-3 pb-4 pt-1">
          {groups.map((group) => (
            <div key={group.title}>
              <div className="mb-2 flex items-center gap-2 px-3">
                <span className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-slate-400">
                  {group.title}
                </span>
                <span className="h-px flex-1 bg-gradient-to-r from-slate-200/80 to-transparent" />
              </div>

              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;

                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={closeSidebar}
                      className={({ isActive }) =>
                        `group relative flex min-h-[41px] items-center justify-between gap-2 rounded-xl border px-3 py-2 text-[12px] transition-all duration-200 ${
                          isActive
                            ? "border-emerald-100/90 bg-white/90 font-bold text-emerald-950 shadow-[0_3px_12px_rgba(16,80,58,0.07)]"
                            : "border-transparent font-medium text-slate-600 hover:border-white/90 hover:bg-white/60 hover:text-slate-950 hover:shadow-sm"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {isActive && (
                            <span className="absolute bottom-2 left-0 top-2 w-[3px] rounded-r-full bg-gradient-to-b from-emerald-500 to-teal-700" />
                          )}

                          <span className="flex min-w-0 items-center gap-3">
                            <span
                              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors ${
                                isActive
                                  ? "bg-emerald-50 text-emerald-800"
                                  : item.color === "amber"
                                    ? "bg-amber-50/80 text-amber-700 group-hover:bg-amber-100"
                                    : "text-slate-400 group-hover:bg-white group-hover:text-slate-700"
                              }`}
                            >
                              <Icon
                                size={16}
                                strokeWidth={isActive ? 2 : 1.8}
                              />
                            </span>
                            <span className="truncate">{item.name}</span>
                          </span>

                          {item.badge !== undefined && (
                            <span
                              className={`shrink-0 rounded-md border px-1.5 py-0.5 text-[9px] font-extrabold ${
                                isActive
                                  ? "border-emerald-700 bg-emerald-800 text-white"
                                  : badgeColors[item.color] ||
                                    "border-slate-100 bg-slate-50 text-slate-600"
                              }`}
                            >
                              {item.badge}
                            </span>
                          )}

                          {item.highlight && (
                            <span className="shrink-0 rounded-md bg-amber-50 px-1.5 py-1 text-[8px] font-extrabold tracking-wide text-amber-800">
                              LAB
                            </span>
                          )}
                        </>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer glass panel */}
        <div className="relative shrink-0 border-t border-white/90 bg-white/55 p-3 backdrop-blur-xl">
          <Link
            to="/"
            onClick={closeSidebar}
            className="group flex min-h-[40px] items-center justify-between gap-2 rounded-xl border border-transparent px-2.5 transition-colors hover:border-white hover:bg-white/80"
          >
            <span className="flex min-w-0 items-center gap-2.5">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/80 text-slate-500 shadow-sm">
                <Globe size={15} />
              </span>
              <span className="truncate text-[11px] font-medium text-slate-600 group-hover:text-emerald-800">
                Public landing page
              </span>
            </span>
            <ArrowUpRight
              size={14}
              className="shrink-0 text-slate-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>

          <div className="mt-2 flex items-center justify-between px-2.5 pt-1 text-[9px] text-slate-400">
            <span>FoodSaathi</span>
            <span className="rounded-md border border-slate-200/80 bg-white/70 px-1.5 py-0.5">
              v1.0
            </span>
          </div>
        </div>
      </aside>
    </>
  );
};
