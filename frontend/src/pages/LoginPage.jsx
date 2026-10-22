import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { AuthLayout } from '../components/auth/AuthLayout';
import { GoogleAuthButton } from '../components/auth/GoogleAuthButton';
import { ForgotPasswordModal } from '../components/auth/ForgotPasswordModal';
import {
  LogIn,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  Utensils,
  Building2,
  Bike,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export const LoginPage = () => {
  const { login, loginAsDemo, loading, isAuthenticated, handleExternalToken } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const destination = location.state?.from?.pathname || '/dashboard';

  // If already authenticated, redirect to destination
  useEffect(() => {
    if (isAuthenticated) {
      navigate(destination, { replace: true });
    }
  }, [isAuthenticated, navigate, destination]);

  // Handle Google OAuth callback redirect parameters (?google_token=... or ?error=...)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const googleToken = params.get('google_token');
    const oauthError = params.get('error');

    if (googleToken) {
      handleExternalToken(googleToken)
        .then((user) => {
          addToast({
            title: 'Google Sign-In Successful! 🌿',
            message: `Welcome back, ${user.name}.`,
            type: 'success',
          });
          navigate(destination, { replace: true });
        })
        .catch((err) => {
          setFormError('Failed to complete Google authentication: ' + err.message);
        });
    } else if (oauthError) {
      setFormError('Google Sign-In notice: ' + decodeURIComponent(oauthError).replace(/_/g, ' '));
    }
  }, [location.search, handleExternalToken, addToast, navigate, destination]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [formError, setFormError] = useState(null);
  const [showForgotModal, setShowForgotModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    if (!email || !email.includes('@')) {
      setFormError('Please enter a valid email address.');
      return;
    }

    if (!password) {
      setFormError('Please enter your password.');
      return;
    }

    try {
      await login(email, password, rememberMe);
      addToast({
        title: 'Welcome Back to FoodRescue AI! 🌿',
        message: 'Successfully authenticated. Accessing live dashboard.',
        type: 'success',
      });
      navigate(destination, { replace: true });
    } catch (err) {
      setFormError(err.message || 'Invalid email or password.');
    }
  };

  const handleDemoClick = (roleKey) => {
    const user = loginAsDemo(roleKey);
    addToast({
      title: `Logged in as Demo ${roleKey.toUpperCase()}`,
      message: `Active session set to ${user.name}.`,
      type: 'success',
    });
    navigate(destination, { replace: true });
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to coordinate surplus food dispatch and rescue missions"
      activeMode="login"
    >
      <div className="space-y-5 text-left text-xs">
        {/* Prominent Google Authentication Button */}
        <div>
          <GoogleAuthButton
            label="Continue with Google"
            onSuccess={() => navigate(destination, { replace: true })}
          />
        </div>

        {/* Divider */}
        <div className="relative flex items-center justify-center">
          <div className="w-full border-t border-slate-200/90" />
          <span className="bg-white px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            or sign in with email
          </span>
        </div>

        {/* Inline Error Announcement */}
        {formError && (
          <div
            role="alert"
            className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200/80 text-rose-800 flex items-start gap-2.5 animate-shake"
          >
            <AlertCircle size={16} className="text-rose-600 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <span className="font-bold">Authentication failed: </span>
              {formError}
            </div>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="login-email"
              className="block font-bold text-slate-700 text-xs mb-1.5"
            >
              Email Address <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                id="login-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (formError) setFormError(null);
                }}
                required
                placeholder="name@organization.org"
                className="w-full rounded-2xl border border-slate-200 pl-10 pr-4 py-2.5 text-xs text-slate-800 bg-slate-50/50 hover:bg-white focus:bg-white focus:border-emerald-600 focus:outline-hidden focus:ring-3 focus:ring-emerald-600/15 transition-all"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="login-password"
                className="block font-bold text-slate-700 text-xs"
              >
                Password <span className="text-rose-500">*</span>
              </label>
              <button
                type="button"
                onClick={() => setShowForgotModal(true)}
                className="text-[11px] font-bold text-emerald-700 hover:text-emerald-900 transition hover:underline"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (formError) setFormError(null);
                }}
                required
                placeholder="••••••••"
                className="w-full rounded-2xl border border-slate-200 pl-10 pr-10 py-2.5 text-xs text-slate-800 bg-slate-50/50 hover:bg-white focus:bg-white focus:border-emerald-600 focus:outline-hidden focus:ring-3 focus:ring-emerald-600/15 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 p-1 text-slate-400 hover:text-slate-700 rounded-lg transition"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {/* Remember Me Option */}
          <div className="flex items-center justify-between py-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded-md border-slate-300 text-emerald-700 focus:ring-emerald-600/30 cursor-pointer accent-emerald-700"
              />
              <span className="text-xs text-slate-600 font-medium">Remember this device</span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-900/15 hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed group"
          >
            <LogIn size={16} className="transition-transform group-hover:translate-x-0.5" />
            <span>{loading ? 'Authenticating...' : 'Sign In to FoodRescue AI'}</span>
          </button>
        </form>

        {/* 1-Click Fast Demo Logins Section */}
        <div className="pt-4 border-t border-slate-100">
          <div className="text-center text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center justify-center gap-1.5">
            <span>⚡ Instant Demo Profiles</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleDemoClick('donor')}
              className="p-2.5 rounded-2xl border border-emerald-200/80 bg-emerald-50/60 hover:bg-emerald-100 text-emerald-950 font-bold transition flex items-center gap-2 text-left"
            >
              <div className="w-7 h-7 rounded-xl bg-emerald-700 text-white grid place-items-center shrink-0 shadow-xs">
                <Utensils size={13} />
              </div>
              <div className="min-w-0">
                <div className="truncate text-[11px] font-bold">Green Feast</div>
                <div className="text-[9px] text-emerald-700 font-normal">Food Donor</div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleDemoClick('ngo')}
              className="p-2.5 rounded-2xl border border-purple-200/80 bg-purple-50/60 hover:bg-purple-100 text-purple-950 font-bold transition flex items-center gap-2 text-left"
            >
              <div className="w-7 h-7 rounded-xl bg-purple-700 text-white grid place-items-center shrink-0 shadow-xs">
                <Building2 size={13} />
              </div>
              <div className="min-w-0">
                <div className="truncate text-[11px] font-bold">Hope Shelter</div>
                <div className="text-[9px] text-purple-700 font-normal">Partner NGO</div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleDemoClick('volunteer')}
              className="p-2.5 rounded-2xl border border-blue-200/80 bg-blue-50/60 hover:bg-blue-100 text-blue-950 font-bold transition flex items-center gap-2 text-left"
            >
              <div className="w-7 h-7 rounded-xl bg-blue-700 text-white grid place-items-center shrink-0 shadow-xs">
                <Bike size={13} />
              </div>
              <div className="min-w-0">
                <div className="truncate text-[11px] font-bold">Alex Rivera</div>
                <div className="text-[9px] text-blue-700 font-normal">Rescue Courier</div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleDemoClick('admin')}
              className="p-2.5 rounded-2xl border border-slate-300 bg-slate-100/80 hover:bg-slate-200 text-slate-900 font-bold transition flex items-center gap-2 text-left"
            >
              <div className="w-7 h-7 rounded-xl bg-slate-800 text-white grid place-items-center shrink-0 shadow-xs">
                <ShieldCheck size={13} />
              </div>
              <div className="min-w-0">
                <div className="truncate text-[11px] font-bold">Platform Admin</div>
                <div className="text-[9px] text-slate-500 font-normal">HQ Oversight</div>
              </div>
            </button>
          </div>
        </div>

        {/* Link to Register */}
        <div className="text-center text-slate-500 text-xs pt-1">
          Don't have an account yet?{' '}
          <Link
            to="/register"
            className="font-bold text-emerald-700 hover:text-emerald-900 hover:underline transition"
          >
            Create an account
          </Link>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={showForgotModal}
        onClose={() => setShowForgotModal(false)}
      />
    </AuthLayout>
  );
};

export default LoginPage;
