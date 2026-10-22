import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";
import { RoleBadge } from "./Badge";
import {
  PlusCircle,
  Menu,
  RefreshCw,
  LogOut,
  User,
  ChevronDown,
  Layers,
  Database,
  Check,
  Sparkles,
  LayoutDashboard,
  UtensilsCrossed,
  Building2,
  Bike,
  Truck,
  Cpu,
  MapPin,
  BarChart3,
  Settings,
} from "lucide-react";

export const Navbar = ({ toggleSidebar }) => {
  const { user, role, switchRole, logout } = useAuth();
  const { isBackendConnected, resetDemoData } = useData();
  const location = useLocation();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  const profileRef = useRef(null);
  const roleRef = useRef(null);

  useEffect(() => {
    const closeMenus = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }

      if (roleRef.current && !roleRef.current.contains(event.target)) {
        setRoleMenuOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setDropdownOpen(false);
        setRoleMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", closeMenus);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", closeMenus);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const pageInfo = {
    "/dashboard": {
      title: "Dashboard",
      subtitle: "Your food rescue overview",
      icon: LayoutDashboard,
    },
    "/donations": {
      title: "Food Donations",
      subtitle: "Manage surplus food listings",
      icon: UtensilsCrossed,
    },
    "/ngos": {
      title: "Partner NGOs",
      subtitle: "Community partners and food distribution",
      icon: Building2,
    },
    "/volunteers": {
      title: "Volunteers",
      subtitle: "Your community rescue team",
      icon: Bike,
    },
    "/deliveries": {
      title: "Active Deliveries",
      subtitle: "Track food rescue deliveries",
      icon: Truck,
    },
    "/ai-matching": {
      title: "AI Matchmaker",
      subtitle: "Find suitable donation matches",
      icon: Cpu,
    },
    "/simulator": {
      title: "Rescue Simulator",
      subtitle: "Explore food rescue scenarios",
      icon: Sparkles,
    },
    "/map": {
      title: "Interactive Map",
      subtitle: "Explore rescue locations",
      icon: MapPin,
    },
    "/analytics": {
      title: "Impact Analytics",
      subtitle: "Measure your community impact",
      icon: BarChart3,
    },
    "/settings": {
      title: "Settings",
      subtitle: "Manage your account preferences",
      icon: Settings,
    },
  };

  const page = pageInfo[location.pathname] || {
    title: "Food Rescue Network",
    subtitle: "Connecting surplus food with communities",
    icon: LayoutDashboard,
  };

  const PageIcon = page.icon;

  const roles = [
    { value: "donor", label: "Donor", emoji: "🍲", active: "bg-emerald-700" },
    { value: "ngo", label: "NGO", emoji: "🏢", active: "bg-violet-700" },
    {
      value: "volunteer",
      label: "Volunteer",
      emoji: "🛵",
      active: "bg-blue-700",
    },
    { value: "admin", label: "Admin", emoji: "⚡", active: "bg-slate-800" },
  ];

  const currentRole = roles.find((item) => item.value === role) || roles[0];

  const handleRoleChange = (nextRole) => {
    switchRole(nextRole);
    setRoleMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 flex h-[72px] w-full min-w-0 items-center gap-3 border-b border-slate-200/80 bg-white/95 px-3 backdrop-blur-xl sm:px-5 lg:px-6">
      {/* Mobile menu */}
      <button
        type="button"
        onClick={toggleSidebar}
        aria-label="Toggle navigation menu"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-800 lg:hidden"
      >
        <Menu size={19} />
      </button>

      {/* Current page identity */}
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-100 bg-emerald-50 text-emerald-800 sm:flex">
          <PageIcon size={19} strokeWidth={1.8} />
        </div>

        <div className="min-w-0">
          <h1 className="truncate text-[14px] font-bold tracking-tight text-slate-900 sm:text-[15px]">
            {page.title}
          </h1>
          <p className="mt-1 hidden truncate text-[11px] text-slate-500 sm:block">
            {page.subtitle}
          </p>
        </div>
      </div>

      {/* Role selector */}
      <div ref={roleRef} className="relative shrink-0">
        <div className="hidden items-center gap-1 rounded-xl border border-slate-200 bg-slate-50/80 p-1 xl:flex">
          <span className="flex items-center gap-1 px-2 text-[10px] font-bold uppercase tracking-wide text-slate-500">
            <Layers size={13} className="text-emerald-700" />
            Role
          </span>

          {roles.map((item) => {
            const active = role === item.value;

            return (
              <button
                key={item.value}
                type="button"
                onClick={() => handleRoleChange(item.value)}
                aria-pressed={active}
                className={`flex h-8 items-center gap-1.5 rounded-lg px-2 text-[11px] font-semibold transition-all ${
                  active
                    ? `${item.active} text-white shadow-sm`
                    : "text-slate-600 hover:bg-white hover:text-slate-900"
                }`}
              >
                <span>{item.emoji}</span>
                <span>{item.label}</span>
                {active && <Check size={11} />}
              </button>
            );
          })}
        </div>

        <div className="relative xl:hidden">
          <button
            type="button"
            onClick={() => setRoleMenuOpen((open) => !open)}
            aria-expanded={roleMenuOpen}
            className="flex h-9 items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-2.5 text-[11px] font-semibold text-slate-700 hover:bg-slate-50"
          >
            <Layers size={14} className="text-emerald-700" />
            <span>{currentRole.label}</span>
            <ChevronDown size={13} />
          </button>

          {roleMenuOpen && (
            <div className="absolute right-0 top-full z-50 mt-2 w-40 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl">
              {roles.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => handleRoleChange(item.value)}
                  className={`flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-xs font-medium ${
                    role === item.value
                      ? "bg-emerald-50 text-emerald-900"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <span>{item.emoji}</span>
                  <span>{item.label}</span>
                  {role === item.value && (
                    <Check size={13} className="ml-auto" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex shrink-0 items-center gap-2">
        {/* Backend status */}
        <div
          title={
            isBackendConnected
              ? "Backend API connected"
              : "Client-side demo state is active"
          }
          className="hidden items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-2 2xl:flex"
        >
          <span
            className={`h-2 w-2 rounded-full ${
              isBackendConnected ? "bg-emerald-500" : "bg-amber-500"
            }`}
          />
          <Database
            size={13}
            className={
              isBackendConnected ? "text-emerald-700" : "text-amber-600"
            }
          />
          <span className="whitespace-nowrap text-[10px] font-medium text-slate-600">
            {isBackendConnected ? "Backend connected" : "Demo mode"}
          </span>
        </div>

        <Link
          to="/donations"
          className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-emerald-800 px-2.5 text-[11px] font-semibold text-white shadow-sm transition hover:bg-emerald-900 sm:px-3"
        >
          <PlusCircle size={15} />
          <span className="hidden sm:inline">Donate</span>
        </Link>

        <Link
          to="/simulator"
          className="hidden h-9 items-center gap-1.5 rounded-xl border border-amber-200 bg-amber-50 px-2.5 text-[11px] font-semibold text-amber-900 transition hover:bg-amber-100 md:inline-flex"
        >
          <Sparkles size={14} className="text-amber-600" />
          <span className="hidden 2xl:inline">Rescue </span>
          Simulator
        </Link>

        {/* Account */}
        <div ref={profileRef} className="relative shrink-0">
          <button
            type="button"
            onClick={() => setDropdownOpen((open) => !open)}
            aria-expanded={dropdownOpen}
            aria-label="Open account menu"
            className="flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white p-1.5 transition hover:border-emerald-200 hover:bg-emerald-50/50"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 text-xs font-bold uppercase text-emerald-900">
              {user?.name?.charAt(0) || "U"}
            </span>
            <span className="hidden min-w-0 text-left 2xl:block">
              <span className="block max-w-[100px] truncate text-[11px] font-bold text-slate-800">
                {user?.name || "Guest User"}
              </span>
              <span className="block text-[9px] capitalize text-slate-500">
                {role}
              </span>
            </span>
            <ChevronDown
              size={13}
              className="hidden text-slate-400 2xl:block"
            />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-900/10">
              <div className="mb-1 border-b border-slate-100 px-3 py-3">
                <p className="truncate text-xs font-bold text-slate-900">
                  {user?.name || "Guest User"}
                </p>
                <p className="mt-1 truncate text-[11px] text-slate-500">
                  {user?.email || ""}
                </p>
                <div className="mt-2">
                  <RoleBadge role={role} />
                </div>
              </div>

              <div className="space-y-1 py-1">
                <Link
                  to="/settings"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-emerald-800"
                >
                  <User size={15} className="text-slate-400" />
                  Account & Settings
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    setDropdownOpen(false);
                    resetDemoData();
                  }}
                  className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-xs font-medium text-slate-700 hover:bg-amber-50 hover:text-amber-800"
                >
                  <RefreshCw size={15} className="text-amber-600" />
                  Reset Seed Data
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setDropdownOpen(false);
                    logout();
                  }}
                  className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-xs font-medium text-rose-600 hover:bg-rose-50"
                >
                  <LogOut size={15} />
                  Log Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
