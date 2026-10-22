import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import {
  KeyRound,
  Mail,
  Lock,
  ArrowRight,
  CheckCircle2,
  X,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';

export const ForgotPasswordModal = ({ isOpen, onClose }) => {
  const { forgotPassword, resetPassword } = useAuth();
  const { addToast } = useToast();

  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [devToken, setDevToken] = useState(null);

  // Reset phase
  const [hasTokenPhase, setHasTokenPhase] = useState(false);
  const [resetTokenInput, setResetTokenInput] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  if (!isOpen) return null;

  const handleRequestReset = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addToast({
        title: 'Validation Notice',
        message: 'Please provide a valid email address.',
        type: 'error',
      });
      return;
    }

    setSubmitting(true);
    setStatusMessage(null);
    try {
      const response = await forgotPassword(email);
      setStatusMessage(
        response?.message ||
          'If an account with that email exists, password reset instructions have been dispatched.'
      );
      if (response?.devToken) {
        setDevToken(response.devToken);
        setResetTokenInput(response.devToken);
      }
    } catch (err) {
      // Still show the safe message to prevent email enumeration attacks
      setStatusMessage(
        'If an account with that email exists, password reset instructions have been dispatched.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleExecuteReset = async (e) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      addToast({
        title: 'Security Notice',
        message: 'Password must be at least 6 characters.',
        type: 'error',
      });
      return;
    }

    if (newPassword !== confirmNewPassword) {
      addToast({
        title: 'Validation Notice',
        message: 'Passwords do not match.',
        type: 'error',
      });
      return;
    }

    setSubmitting(true);
    try {
      await resetPassword(resetTokenInput, newPassword);
      addToast({
        title: 'Password Updated 🎉',
        message: 'Your new password has been set. You can now log in.',
        type: 'success',
      });
      onClose();
    } catch (err) {
      addToast({
        title: 'Reset Error',
        message: err.message || 'Unable to update password.',
        type: 'error',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in text-left text-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="forgot-password-title"
    >
      <div className="w-full max-w-md rounded-3xl bg-white border border-slate-200 shadow-2xl p-6 relative overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 grid place-items-center">
              <KeyRound size={18} />
            </div>
            <div>
              <h3 id="forgot-password-title" className="text-base font-bold text-slate-900">
                {hasTokenPhase ? 'Set New Password' : 'Reset Account Password'}
              </h3>
              <p className="text-[11px] text-slate-500">
                {hasTokenPhase ? 'Enter your verification token' : 'Secure password recovery'}
              </p>
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

        {/* Content */}
        {!hasTokenPhase ? (
          <form onSubmit={handleRequestReset} className="py-4 space-y-4">
            <p className="text-slate-600 leading-relaxed text-xs">
              Enter the email address associated with your FoodSaathi account. If an account is found, a secure reset token will be issued.
            </p>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Account Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="donor@foodsaathi.org"
                  className="w-full rounded-xl border border-slate-200 pl-9 pr-3 py-2.5 text-xs text-slate-800 focus:border-emerald-600 focus:outline-hidden"
                />
              </div>
            </div>

            {statusMessage && (
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200/80 text-emerald-900 space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-emerald-700 shrink-0 mt-0.5" />
                  <p className="text-[11px] font-medium leading-relaxed">{statusMessage}</p>
                </div>

                {devToken && (
                  <div className="mt-2 pt-2 border-t border-emerald-200/60 text-[10px]">
                    <span className="font-bold">Development Reset Token:</span>
                    <div className="font-mono bg-white p-1.5 rounded border border-emerald-200 mt-1 select-all break-all">
                      {devToken}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="pt-2 flex flex-col gap-2">
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow-xs transition flex items-center justify-center gap-2 disabled:opacity-60"
              >
                <RefreshCw size={14} className={submitting ? 'animate-spin' : ''} />
                <span>{submitting ? 'Dispatching...' : 'Send Reset Instructions'}</span>
              </button>

              <button
                type="button"
                onClick={() => setHasTokenPhase(true)}
                className="text-center text-[11px] text-emerald-700 hover:underline font-semibold py-1"
              >
                Already have a reset token? Enter it here
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleExecuteReset} className="py-4 space-y-3.5">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Reset Verification Token</label>
              <input
                type="text"
                value={resetTokenInput}
                onChange={(e) => setResetTokenInput(e.target.value)}
                required
                placeholder="Paste the 64-character token"
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-mono text-slate-800 focus:border-emerald-600 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">New Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  placeholder="Minimum 6 characters"
                  className="w-full rounded-xl border border-slate-200 pl-9 pr-3 py-2 text-xs text-slate-800 focus:border-emerald-600 focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Confirm New Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  required
                  placeholder="Repeat new password"
                  className="w-full rounded-xl border border-slate-200 pl-9 pr-3 py-2 text-xs text-slate-800 focus:border-emerald-600 focus:outline-hidden"
                />
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow-xs transition flex items-center justify-center gap-2 disabled:opacity-60"
              >
                <span>{submitting ? 'Updating Password...' : 'Save New Password & Log In'}</span>
                <ArrowRight size={14} />
              </button>

              <button
                type="button"
                onClick={() => setHasTokenPhase(false)}
                className="text-center text-[11px] text-slate-500 hover:text-slate-800 py-1"
              >
                Back to email request
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
