import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendPositive = true,
  colorScheme = "emerald",
  onClick,
}) => {
  const colorMap = {
    emerald: {
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-700",
      border: "hover:border-emerald-200",
      accent: "text-emerald-700",
    },
    teal: {
      iconBg: "bg-teal-50",
      iconColor: "text-teal-700",
      border: "hover:border-teal-200",
      accent: "text-teal-700",
    },
    blue: {
      iconBg: "bg-blue-50",
      iconColor: "text-blue-700",
      border: "hover:border-blue-200",
      accent: "text-blue-700",
    },
    amber: {
      iconBg: "bg-amber-50",
      iconColor: "text-amber-700",
      border: "hover:border-amber-200",
      accent: "text-amber-700",
    },
    rose: {
      iconBg: "bg-rose-50",
      iconColor: "text-rose-700",
      border: "hover:border-rose-200",
      accent: "text-rose-700",
    },
    purple: {
      iconBg: "bg-purple-50",
      iconColor: "text-purple-700",
      border: "hover:border-purple-200",
      accent: "text-purple-700",
    },
  };

  const scheme = colorMap[colorScheme] || colorMap.emerald;

  const handleKeyDown = (event) => {
    if (!onClick) return;

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <div
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      className={`group flex min-w-0 flex-col rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm transition-colors duration-200 sm:p-4 ${
        scheme.border
      } ${
        onClick
          ? "cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          : ""
      }`}
    >
      <div className="flex min-w-0 items-start justify-between gap-2">
        <p className="min-w-0 break-words text-[11px] font-semibold uppercase leading-4 tracking-wide text-slate-500 sm:text-xs">
          {title}
        </p>

        {Icon && (
          <span
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${scheme.iconBg} ${scheme.iconColor}`}
          >
            <Icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
          </span>
        )}
      </div>

      <div className="mt-3 min-w-0">
        <p
          className="break-words text-2xl font-bold leading-tight tracking-tight text-slate-900 sm:text-[26px]"
          title={String(value ?? "")}
        >
          {value}
        </p>

        {subtitle && (
          <p className="mt-1.5 break-words text-xs leading-5 text-slate-500">
            {subtitle}
          </p>
        )}
      </div>

      {trend && (
        <div className="mt-3 flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-1 border-t border-slate-100 pt-3">
          <span
            className={`inline-flex shrink-0 items-center gap-0.5 text-xs font-semibold ${
              trendPositive ? "text-emerald-700" : "text-rose-700"
            }`}
          >
            {trendPositive ? (
              <ArrowUpRight className="h-3.5 w-3.5" />
            ) : (
              <ArrowDownRight className="h-3.5 w-3.5" />
            )}
            {trend}
          </span>

          <span className="min-w-0 text-[11px] leading-4 text-slate-400">
            vs last week
          </span>
        </div>
      )}
    </div>
  );
};
