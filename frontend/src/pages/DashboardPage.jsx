import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";
import { StatCard } from "../components/common/StatCard";
import { PriorityBadge, StatusBadge } from "../components/common/Badge";
import { FreshnessTimer } from "../components/common/FreshnessTimer";
import { DonationFormModal } from "../components/donations/DonationFormModal";
import { MatchingModal } from "../components/ai/MatchingModal";
import { DuplicateWarningModal } from "../components/donations/DuplicateWarningModal";
import { DonationDetailModal } from "../components/donations/DonationDetailModal";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  Utensils,
  Building2,
  Bike,
  Truck,
  AlertTriangle,
  Sparkles,
  PlusCircle,
  TrendingUp,
  Activity,
  Layers,
  ArrowRight,
  MapPin,
  Clock,
  PackageOpen,
  BarChart3,
} from "lucide-react";

const CATEGORY_COLORS = [
  "#059669",
  "#3b82f6",
  "#8b5cf6",
  "#f59e0b",
  "#06b6d4",
  "#f97316",
  "#64748b",
];

const getDate = (value) => {
  if (!value) return null;

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

const getCategoryName = (donation) => {
  const category = donation?.category || donation?.foodCategory;
  if (!category) return "Other";

  return String(category)
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
};

const formatNumber = (value) => Number(value || 0).toLocaleString();

export const DashboardPage = () => {
  const { user, role } = useAuth();

  const {
    summaryMetrics = {},
    donations = [],
    ngos = [],
    volunteers = [],
    deliveries = [],
  } = useData();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedDonationForMatch, setSelectedDonationForMatch] =
    useState(null);
  const [selectedDonationForDetail, setSelectedDonationForDetail] =
    useState(null);
  const [duplicateModalData, setDuplicateModalData] = useState(null);

  const safeDonations = Array.isArray(donations) ? donations : [];
  const safeNGOs = Array.isArray(ngos) ? ngos : [];
  const safeVolunteers = Array.isArray(volunteers) ? volunteers : [];
  const safeDeliveries = Array.isArray(deliveries) ? deliveries : [];

  const availableDonations = useMemo(
    () => safeDonations.filter((item) => item.status === "Available"),
    [safeDonations],
  );

  const urgentDonations = useMemo(
    () =>
      availableDonations.filter(
        (item) => String(item.priority || "").toLowerCase() === "critical",
      ),
    [availableDonations],
  );

  const recentDonations = useMemo(
    () =>
      [...safeDonations]
        .sort((a, b) => {
          const dateA = getDate(a.createdAt || a.updatedAt)?.getTime() || 0;
          const dateB = getDate(b.createdAt || b.updatedAt)?.getTime() || 0;
          return dateB - dateA;
        })
        .slice(0, 4),
    [safeDonations],
  );

  const recentDeliveries = useMemo(
    () =>
      [...safeDeliveries]
        .sort((a, b) => {
          const dateA = getDate(a.assignedAt || a.createdAt)?.getTime() || 0;
          const dateB = getDate(b.assignedAt || b.createdAt)?.getTime() || 0;
          return dateB - dateA;
        })
        .slice(0, 4),
    [safeDeliveries],
  );

  const categoryData = useMemo(() => {
    const counts = new Map();

    safeDonations.forEach((donation) => {
      const category = getCategoryName(donation);
      const quantity = Math.max(0, Number(donation.mealCount) || 0);

      counts.set(category, (counts.get(category) || 0) + quantity);
    });

    const total = [...counts.values()].reduce((sum, value) => sum + value, 0);

    return [...counts.entries()]
      .map(([name, value], index) => ({
        name,
        value,
        percentage: total ? Math.round((value / total) * 100) : 0,
        color: CATEGORY_COLORS[index % CATEGORY_COLORS.length],
      }))
      .sort((a, b) => b.value - a.value);
  }, [safeDonations]);

  const weeklyData = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const days = Array.from({ length: 7 }, (_, index) => {
      const date = new Date(today);
      date.setDate(today.getDate() - (6 - index));

      return {
        date,
        key: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
        day: date.toLocaleDateString("en-US", { weekday: "short" }),
        rescued: 0,
        listings: 0,
      };
    });

    const dayMap = new Map(days.map((day) => [day.key, day]));

    safeDonations.forEach((donation) => {
      const date = getDate(donation.createdAt || donation.updatedAt);
      if (!date) return;

      const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
      const day = dayMap.get(key);
      if (!day) return;

      day.listings += 1;

      if (["Delivered", "Completed", "Rescued"].includes(donation.status)) {
        day.rescued += Math.max(0, Number(donation.mealCount) || 0);
      }
    });

    return days.map(({ date, key, ...day }) => day);
  }, [safeDonations]);

  const hasWeeklyData = weeklyData.some(
    (day) => day.listings > 0 || day.rescued > 0,
  );

  const activeDeliveryCount = safeDeliveries.filter((delivery) =>
    ["Assigned", "Accepted", "Picked Up"].includes(delivery.status),
  ).length;

  const welcomeMessage =
    role === "donor"
      ? "List surplus food, connect with local NGOs, and help good food reach the people who need it."
      : role === "ngo"
        ? "Manage food requirements, review incoming donations, and coordinate meal distribution."
        : role === "volunteer"
          ? "Review your rescue deliveries, coordinate pickups, and help meals reach their destination."
          : "Monitor food rescue activity, coordinate resources, and review the network’s current operations.";

  return (
    <div className="space-y-6 text-left text-sm">
      {/* Welcome header */}
      <section className="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-gradient-to-r from-white via-white to-emerald-50/70 p-5 shadow-sm sm:p-7 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-[11px] font-semibold capitalize text-emerald-800">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              {role || "User"}
            </span>
            <span className="text-xs text-slate-400">
              Food rescue operations
            </span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Welcome back, {user?.name || "Rescuer"}
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            {welcomeMessage}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsCreateModalOpen(true)}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-emerald-800 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        >
          <PlusCircle className="h-4 w-4" />
          Donate surplus food
        </button>
      </section>

      {/* Summary metrics */}
      <section>
        <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Network overview
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              A snapshot of the current rescue operation
            </p>
          </div>
          <span className="text-xs text-slate-400">Summary metrics</span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <StatCard
            title="Meals Rescued"
            value={formatNumber(summaryMetrics.totalMealsRescued)}
            subtitle="Total community portions"
            icon={Utensils}
            colorScheme="emerald"
          />

          <StatCard
            title="Available Food"
            value={formatNumber(summaryMetrics.availableDonationsCount)}
            subtitle="Listings ready for pickup"
            icon={Layers}
            colorScheme="blue"
          />

          <StatCard
            title="Active NGOs"
            value={formatNumber(summaryMetrics.activeNGOsCount)}
            subtitle="Partner organisations"
            icon={Building2}
            colorScheme="purple"
          />

          <StatCard
            title="Available Volunteers"
            value={formatNumber(summaryMetrics.availableVolunteersCount)}
            subtitle="Ready to help"
            icon={Bike}
            colorScheme="blue"
          />

          <StatCard
            title="Urgent Alerts"
            value={formatNumber(summaryMetrics.urgentDonationsCount)}
            subtitle="Critical food listings"
            icon={AlertTriangle}
            colorScheme="rose"
          />

          <StatCard
            title="Active Deliveries"
            value={formatNumber(
              summaryMetrics.activeDeliveriesCount ?? activeDeliveryCount,
            )}
            subtitle="Currently in progress"
            icon={Truck}
            colorScheme="amber"
          />
        </div>
      </section>

      {/* Critical food alerts */}
      {urgentDonations.length > 0 && (
        <section className="rounded-2xl border border-rose-200 bg-rose-50/70 p-4 sm:p-5">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-100 text-rose-700">
                <AlertTriangle className="h-4 w-4" />
              </span>
              <div>
                <h2 className="font-semibold text-rose-950">
                  Critical food rescues
                </h2>
                <p className="mt-0.5 text-xs text-rose-700">
                  {urgentDonations.length} available listing
                  {urgentDonations.length === 1 ? "" : "s"} need attention
                </p>
              </div>
            </div>

            <Link
              to="/donations"
              className="inline-flex items-center gap-1 self-start text-xs font-semibold text-rose-800 hover:text-rose-950"
            >
              Review donations <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
            {urgentDonations.slice(0, 4).map((item) => (
              <div
                key={item._id}
                className="flex min-w-0 flex-col justify-between gap-3 rounded-xl border border-rose-100 bg-white p-4 sm:flex-row sm:items-center"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <PriorityBadge priority={item.priority} size="xs" />
                    <span className="truncate font-semibold text-slate-900">
                      {item.foodName || "Food donation"}
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                    <span>{formatNumber(item.mealCount)} meals</span>
                    {item.pickupAddress && (
                      <span className="inline-flex min-w-0 items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 shrink-0" />
                        <span className="truncate">{item.pickupAddress}</span>
                      </span>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedDonationForMatch(item)}
                  className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg bg-emerald-800 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-emerald-900"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  Match now
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Charts */}
      <section className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5 xl:col-span-2">
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="flex items-center gap-2 font-semibold text-slate-900">
                <TrendingUp className="h-4 w-4 text-emerald-700" />
                Daily food rescue volume
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Donation records from the last 7 days
              </p>
            </div>
            <span className="self-start rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-600">
              Last 7 days
            </span>
          </div>

          {hasWeeklyData ? (
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={weeklyData}
                  margin={{ top: 8, right: 8, left: -18, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="dashboardRescuedFill"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="#059669"
                        stopOpacity={0.25}
                      />
                      <stop offset="95%" stopColor="#059669" stopOpacity={0} />
                    </linearGradient>
                  </defs>

                  <XAxis
                    dataKey="day"
                    tick={{ fontSize: 11 }}
                    tickLine={false}
                    axisLine={{ stroke: "#e2e8f0" }}
                  />

                  <YAxis
                    tick={{ fontSize: 10 }}
                    tickLine={false}
                    axisLine={false}
                    width={42}
                  />

                  <Tooltip
                    contentStyle={{
                      fontSize: 12,
                      borderRadius: 10,
                      border: "1px solid #e2e8f0",
                    }}
                  />

                  <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />

                  <Area
                    type="monotone"
                    dataKey="rescued"
                    name="Meals in completed rescues"
                    stroke="#059669"
                    strokeWidth={2.5}
                    fill="url(#dashboardRescuedFill)"
                  />

                  <Area
                    type="monotone"
                    dataKey="listings"
                    name="Donation listings"
                    yAxisId={undefined}
                    stroke="#3b82f6"
                    strokeWidth={2}
                    fill="none"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="flex h-64 flex-col items-center justify-center rounded-xl bg-slate-50/80 px-5 text-center">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-slate-400 shadow-sm">
                <BarChart3 className="h-5 w-5" />
              </span>
              <p className="mt-3 text-sm font-medium text-slate-700">
                No recent chart data
              </p>
              <p className="mt-1 max-w-xs text-xs leading-5 text-slate-500">
                Donation records with dates from the last seven days will appear
                here.
              </p>
            </div>
          )}
        </div>

        <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="mb-2">
            <h2 className="font-semibold text-slate-900">
              Food category share
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Based on listed meal portions
            </p>
          </div>

          {categoryData.length > 0 ? (
            <>
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={48}
                      outerRadius={72}
                      paddingAngle={3}
                    >
                      {categoryData.map((entry) => (
                        <Cell key={entry.name} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value, name) => [
                        `${formatNumber(value)} portions`,
                        name,
                      ]}
                      contentStyle={{
                        fontSize: 12,
                        borderRadius: 10,
                        border: "1px solid #e2e8f0",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-3 border-t border-slate-100 pt-4">
                {categoryData.slice(0, 5).map((item) => (
                  <div key={item.name}>
                    <div className="mb-1.5 flex items-center justify-between gap-3 text-xs">
                      <span className="flex min-w-0 items-center gap-2 text-slate-600">
                        <span
                          className="h-2.5 w-2.5 shrink-0 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="truncate">{item.name}</span>
                      </span>
                      <span className="shrink-0 font-semibold text-slate-800">
                        {item.percentage}%
                      </span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${item.percentage}%`,
                          backgroundColor: item.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex h-64 flex-col items-center justify-center text-center">
              <PackageOpen className="h-8 w-8 text-slate-300" />
              <p className="mt-3 text-sm font-medium text-slate-700">
                No food categories yet
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Categories will appear when donations are added.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Donations and deliveries */}
      <section className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5 xl:col-span-2">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-semibold text-slate-900">
                Active surplus food inventory
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Recent donation listings and their status
              </p>
            </div>

            <Link
              to="/donations"
              className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 hover:text-emerald-950"
            >
              View all ({safeDonations.length})
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {recentDonations.length > 0 ? (
            <div className="space-y-3">
              {recentDonations.map((donation) => (
                <div
                  key={donation._id}
                  className="flex min-w-0 flex-col gap-3 rounded-xl border border-slate-100 bg-slate-50/70 p-3 transition-colors hover:border-emerald-200 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    {donation.imageUrl ? (
                      <img
                        src={donation.imageUrl}
                        alt={donation.foodName || "Food donation"}
                        className="h-12 w-12 shrink-0 rounded-lg border border-slate-200 object-cover"
                        onError={(event) => {
                          event.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                        <Utensils className="h-5 w-5" />
                      </div>
                    )}

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="truncate font-semibold text-slate-800">
                          {donation.foodName || "Food donation"}
                        </span>
                        <PriorityBadge priority={donation.priority} size="xs" />
                      </div>

                      <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500">
                        <span className="font-medium text-emerald-800">
                          {formatNumber(donation.mealCount)} meals
                        </span>
                        {donation.donorName && (
                          <>
                            <span>·</span>
                            <span>{donation.donorName}</span>
                          </>
                        )}
                      </div>

                      {donation.expiryTime && (
                        <div className="mt-1">
                          <FreshnessTimer
                            expiryTime={donation.expiryTime}
                            compact
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-2 self-end sm:self-center">
                    <StatusBadge status={donation.status} />

                    {donation.status === "Available" && (
                      <button
                        type="button"
                        onClick={() => setSelectedDonationForMatch(donation)}
                        className="inline-flex items-center gap-1 rounded-lg bg-emerald-800 px-2.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-emerald-900"
                      >
                        <Sparkles className="h-3.5 w-3.5" />
                        Match
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => setSelectedDonationForDetail(donation)}
                      className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-100"
                    >
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-slate-200 py-10 text-center">
              <PackageOpen className="mx-auto h-8 w-8 text-slate-300" />
              <p className="mt-3 font-medium text-slate-700">
                No donations to display
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Create a listing to start rescuing surplus food.
              </p>
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(true)}
                className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-emerald-800 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-900"
              >
                <PlusCircle className="h-3.5 w-3.5" />
                Add donation
              </button>
            </div>
          )}
        </div>

        <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h2 className="flex items-center gap-2 font-semibold text-slate-900">
                <Activity className="h-4 w-4 text-blue-700" />
                Live deliveries
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Latest dispatch updates
              </p>
            </div>
            <Link
              to="/deliveries"
              aria-label="View all deliveries"
              className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
            >
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {recentDeliveries.length > 0 ? (
            <div className="space-y-3">
              {recentDeliveries.map((delivery) => (
                <div
                  key={delivery._id}
                  className="rounded-xl border border-slate-100 bg-slate-50/70 p-3"
                >
                  <div className="flex min-w-0 items-start justify-between gap-2">
                    <span className="truncate font-semibold text-slate-800">
                      {delivery.foodName || "Food delivery"}
                    </span>
                    <StatusBadge status={delivery.status} />
                  </div>

                  <p className="mt-2 text-xs text-slate-500">
                    Courier:{" "}
                    <span className="font-medium text-slate-700">
                      {delivery.volunteerName || "Unassigned"}
                    </span>
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {formatNumber(delivery.mealCount)} meals
                  </p>

                  <div className="mt-3 flex items-center justify-between gap-2 border-t border-slate-200/70 pt-2 text-xs text-slate-500">
                    <span className="flex min-w-0 items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 shrink-0" />
                      <span className="truncate">
                        {delivery.ngoName || "NGO pending"}
                      </span>
                    </span>
                    {delivery.estimatedDistanceKm != null && (
                      <span className="shrink-0">
                        {delivery.estimatedDistanceKm} km
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex min-h-52 flex-col items-center justify-center rounded-xl bg-slate-50 px-4 text-center">
              <Truck className="h-8 w-8 text-slate-300" />
              <p className="mt-3 text-sm font-medium text-slate-700">
                No deliveries yet
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                Matched donations will appear here when a delivery is created.
              </p>
              <Link
                to="/deliveries"
                className="mt-3 text-xs font-semibold text-emerald-800 hover:text-emerald-950"
              >
                Open deliveries
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Modals: existing functionality preserved */}
      <DonationFormModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onDuplicateTriggered={(dupInfo) => {
          setIsCreateModalOpen(false);
          setDuplicateModalData(dupInfo);
        }}
      />

      <MatchingModal
        isOpen={!!selectedDonationForMatch}
        onClose={() => setSelectedDonationForMatch(null)}
        donation={selectedDonationForMatch}
      />

      <DonationDetailModal
        isOpen={!!selectedDonationForDetail}
        onClose={() => setSelectedDonationForDetail(null)}
        donation={selectedDonationForDetail}
        onOpenMatch={(donation) => {
          setSelectedDonationForDetail(null);
          setSelectedDonationForMatch(donation);
        }}
      />

      <DuplicateWarningModal
        isOpen={!!duplicateModalData}
        onClose={() => setDuplicateModalData(null)}
        duplicateData={duplicateModalData}
        onConfirmAnyway={() => {
          duplicateModalData?.proceedSave?.();
          setDuplicateModalData(null);
        }}
      />
    </div>
  );
};
