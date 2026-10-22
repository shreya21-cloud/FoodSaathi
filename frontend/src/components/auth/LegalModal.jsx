import React from 'react';
import { X, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';

export const LegalModal = ({ isOpen, onClose, type = 'terms' }) => {
  if (!isOpen) return null;

  const isTerms = type === 'terms';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in text-left text-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
    >
      <div className="w-full max-w-xl rounded-3xl bg-white border border-slate-200 shadow-2xl p-6 sm:p-7 max-h-[85vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-800 grid place-items-center">
              {isTerms ? <FileText size={18} /> : <ShieldCheck size={18} />}
            </div>
            <div>
              <h3 id="legal-modal-title" className="text-base font-bold text-slate-900">
                {isTerms ? 'FoodRescue AI Terms of Service' : 'FoodRescue AI Privacy Policy'}
              </h3>
              <p className="text-[11px] text-slate-500">Last updated: October 2026</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition"
            aria-label="Close legal terms"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Policy Body */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4 text-slate-600 leading-relaxed pr-2">
          {isTerms ? (
            <>
              <section>
                <h4 className="font-bold text-slate-900 mb-1 text-xs">1. Purpose and Network Mission</h4>
                <p>
                  FoodRescue AI connects food donors (restaurants, caterers, hotels, grocers), partner NGOs (shelters, food banks), and volunteer couriers to minimize food waste and alleviate community hunger. By registering an account, you agree to uphold food safety, transparency, and timely communication.
                </p>
              </section>

              <section>
                <h4 className="font-bold text-slate-900 mb-1 text-xs">2. Food Safety & Verification</h4>
                <p>
                  Food donors certify that all surplus meals are safe for human consumption, prepared in compliant facilities, and accurately labeled with allergen details and preparation timestamps. Donors agree to adhere to Good Samaritan food donation guidelines and local health regulations.
                </p>
              </section>

              <section>
                <h4 className="font-bold text-slate-900 mb-1 text-xs">3. Courier & NGO Responsibilities</h4>
                <p>
                  Partner NGOs and volunteer couriers commit to transporting and distributing food within the maximum temperature safety window specified by FoodRescue AI fresh timers. Commercial resale of donated food is strictly prohibited.
                </p>
              </section>

              <section>
                <h4 className="font-bold text-slate-900 mb-1 text-xs">4. Account Integrity</h4>
                <p>
                  Users must maintain accurate account credentials and contact details. Public registration provides donor, NGO, or volunteer roles. Administrative privileges are granted solely through internal verification.
                </p>
              </section>
            </>
          ) : (
            <>
              <section>
                <h4 className="font-bold text-slate-900 mb-1 text-xs">1. Information We Collect</h4>
                <p>
                  FoodRescue AI collects minimal necessary operational information including organization names, contact telephone numbers, operating addresses, and pickup/delivery coordinates required to calculate optimal route matches.
                </p>
              </section>

              <section>
                <h4 className="font-bold text-slate-900 mb-1 text-xs">2. How We Protect Your Data</h4>
                <p>
                  Passkeys and sensitive credentials are encrypted using industry-standard hashing algorithms (bcrypt/Argon2). We never sell or monetize your data. Geolocation information is utilized solely to compute dispatch proximity for food rescue missions.
                </p>
              </section>

              <section>
                <h4 className="font-bold text-slate-900 mb-1 text-xs">3. Third-Party Integrations</h4>
                <p>
                  When signing in with Google OAuth, we only request standard identity claims (verified email address, full name, and avatar) to securely verify your account without exposing your Google account credentials.
                </p>
              </section>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-100 flex justify-end shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow-xs transition"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};

export default LegalModal;
