import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Utensils,
  Building2,
  Bike,
  Sparkles,
  ArrowRight,
  Clock,
  ShieldCheck,
  CheckCircle2,
  X,
} from 'lucide-react';

export const RoleOnboardingModal = ({ isOpen, onClose, role = 'donor', userName = '' }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const roleDetails = {
    donor: {
      title: 'Welcome to FoodRescue AI, Food Donor! 🍲',
      badge: 'Food Donor Onboarding',
      icon: Utensils,
      color: 'emerald',
      actionText: 'Post Your First Surplus Listing',
      actionPath: '/donations',
      steps: [
        {
          title: 'List Surplus Food Batches',
          desc: 'Specify food type, estimated portions, preparation timestamp, and allergen notes.',
        },
        {
          title: 'Automated AI Matching',
          desc: 'Our engine identifies nearby accredited shelters within the temperature safety window.',
        },
        {
          title: 'Volunteer Courier Pickup',
          desc: 'A verified rescue courier arrives with insulated carriers for seamless handover.',
        },
      ],
    },
    ngo: {
      title: 'Welcome to FoodRescue AI, Partner NGO! 🏢',
      badge: 'Shelter & Food Bank Onboarding',
      icon: Building2,
      color: 'purple',
      actionText: 'Browse Available Food Batches',
      actionPath: '/donations',
      steps: [
        {
          title: 'Set Capacity & Dietary Needs',
          desc: 'Specify your daily meal requirements, storage refrigeration, and operating hours.',
        },
        {
          title: 'Claim Verified Surplus Listings',
          desc: 'Receive real-time alerts when nearby donors have fresh surplus matching your needs.',
        },
        {
          title: 'Track Incoming Deliveries',
          desc: 'Monitor rescue couriers in real time via our interactive map and delivery logs.',
        },
      ],
    },
    volunteer: {
      title: 'Welcome to FoodRescue AI, Rescue Courier! 🛵',
      badge: 'Volunteer Courier Onboarding',
      icon: Bike,
      color: 'blue',
      actionText: 'View Active Rescue Deliveries',
      actionPath: '/deliveries',
      steps: [
        {
          title: 'Accept Nearby Rescue Routes',
          desc: 'Browse available surplus batches needing rapid transport from donor to shelter.',
        },
        {
          title: 'Follow Temperature Timers',
          desc: 'Our fresh timer monitors elapsed time to ensure top food safety during transit.',
        },
        {
          title: 'Earn Badges & Impact Points',
          desc: 'Build your rescue reputation score and see kilograms of CO₂ averted with each ride.',
        },
      ],
    },
  };

  const details = roleDetails[role] || roleDetails.donor;
  const RoleIcon = details.icon;

  const handleAction = () => {
    onClose();
    navigate(details.actionPath);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in text-left text-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="role-onboarding-title"
    >
      <div className="w-full max-w-lg rounded-3xl bg-white border border-slate-200 shadow-2xl p-6 sm:p-8 relative overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="pointer-events-none absolute -top-12 -right-12 w-48 h-48 rounded-full bg-emerald-200/40 blur-2xl" />

        <div className="flex items-start justify-between pb-4 border-b border-slate-100 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-700 text-white grid place-items-center shadow-md shadow-emerald-800/20">
              <RoleIcon size={24} />
            </div>
            <div>
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-bold text-[10px] uppercase tracking-wider mb-1">
                {details.badge}
              </span>
              <h3 id="role-onboarding-title" className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                {details.title}
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="py-5 space-y-4 relative z-10">
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            {userName ? `Hi ${userName}, y` : 'Y'}our account is fully active. Here is how your role powers the FoodRescue AI zero-waste network:
          </p>

          <div className="space-y-3">
            {details.steps.map((step, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3"
              >
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-black text-xs grid place-items-center shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-xs">{step.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 relative z-10">
          <button
            type="button"
            onClick={handleAction}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow-md shadow-emerald-900/15 transition hover:scale-[1.01]"
          >
            <span>{details.actionText}</span>
            <ArrowRight size={14} />
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 text-slate-500 hover:text-slate-800 text-xs font-semibold"
          >
            Go to Dashboard Overview
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleOnboardingModal;
