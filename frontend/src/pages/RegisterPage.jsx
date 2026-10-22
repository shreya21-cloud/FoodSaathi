import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { AuthLayout } from '../components/auth/AuthLayout';
import { GoogleAuthButton } from '../components/auth/GoogleAuthButton';
import { LegalModal } from '../components/auth/LegalModal';
import { RoleOnboardingModal } from '../components/auth/RoleOnboardingModal';
import {
  UserPlus,
  Mail,
  Lock,
  User,
  Building2,
  Phone,
  MapPin,
  Utensils,
  Bike,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Check,
} from 'lucide-react';

export const RegisterPage = () => {
  const { register, loading, isAuthenticated } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'donor',
    organizationName: '',
    phone: '',
    address: '',
    agreeTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(null);

  // Modals
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState('terms');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [registeredUser, setRegisteredUser] = useState(null);

  // Compute password strength: score 0 to 4
  const getPasswordStrength = (pass) => {
    if (!pass) return { score: 0, label: 'None', color: 'bg-slate-200' };
    let score = 0;
    if (pass.length >= 6) score += 1;
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass) && /[a-z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass) || /[^A-Za-z0-9]/.test(pass)) score += 1;

    switch (score) {
      case 1:
        return { score: 1, label: 'Weak', color: 'bg-rose-500' };
      case 2:
        return { score: 2, label: 'Fair', color: 'bg-amber-500' };
      case 3:
        return { score: 3, label: 'Good', color: 'bg-emerald-500' };
      case 4:
        return { score: 4, label: 'Strong', color: 'bg-emerald-700' };
      default:
        return { score: 0, label: 'Weak', color: 'bg-rose-500' };
    }
  };

  const passwordStrength = getPasswordStrength(formData.password);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear individual field error on typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
    if (serverError) setServerError(null);
  };

  const handleRoleSelect = (role) => {
    setFormData((prev) => ({ ...prev, role }));
  };

  // Client-side validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = 'Full name must be at least 2 characters.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address.';
    }

    if (!formData.password || formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the Terms of Service & Privacy Policy.';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError(null);

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const result = await register({
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        role: formData.role,
        organizationName: formData.organizationName.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
      });

      addToast({
        title: 'Account Created Successfully! 🎉',
        message: `Welcome to FoodRescue AI as a ${formData.role.toUpperCase()}.`,
        type: 'success',
        triggerConfetti: true,
      });

      setRegisteredUser(result.user);
      setShowOnboarding(true);
    } catch (err) {
      setServerError(err.message || 'Registration failed. Please check your details.');
    }
  };

  return (
    <AuthLayout
      title="Create Your Account"
      subtitle="Join verified commercial donors, food banks, and volunteer rescue teams"
      activeMode="register"
    >
      <div className="space-y-5 text-left text-xs">
        {/* Google One-Click Registration Button */}
        <div>
          <GoogleAuthButton
            role={formData.role}
            label="Sign up with Google"
            onSuccess={(user) => {
              setRegisteredUser(user);
              setShowOnboarding(true);
            }}
          />
        </div>

        {/* Divider */}
        <div className="relative flex items-center justify-center">
          <div className="w-full border-t border-slate-200/90" />
          <span className="bg-white px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            or register with email
          </span>
        </div>

        {/* Server Error Announcement */}
        {serverError && (
          <div
            role="alert"
            className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200/80 text-rose-800 flex items-start gap-2.5 animate-shake"
          >
            <AlertCircle size={16} className="text-rose-600 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <span className="font-bold">Registration notice: </span>
              {serverError}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Role Selection Selector */}
          <div>
            <label className="block font-bold text-slate-700 text-xs mb-2">
              Select Your Operational Role <span className="text-rose-500">*</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {/* Donor Role */}
              <button
                type="button"
                onClick={() => handleRoleSelect('donor')}
                className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                  formData.role === 'donor'
                    ? 'border-emerald-700 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-700/20 font-bold shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-white text-slate-600'
                }`}
              >
                <div className={`w-7 h-7 rounded-xl grid place-items-center ${
                  formData.role === 'donor' ? 'bg-emerald-700 text-white' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  <Utensils size={14} />
                </div>
                <div>
                  <div className="text-[11px] font-bold">Food Donor</div>
                  <div className="text-[9px] text-slate-400">Hotel / Caterer</div>
                </div>
              </button>

              {/* NGO Role */}
              <button
                type="button"
                onClick={() => handleRoleSelect('ngo')}
                className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                  formData.role === 'ngo'
                    ? 'border-purple-700 bg-purple-50 text-purple-950 ring-2 ring-purple-700/20 font-bold shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-white text-slate-600'
                }`}
              >
                <div className={`w-7 h-7 rounded-xl grid place-items-center ${
                  formData.role === 'ngo' ? 'bg-purple-700 text-white' : 'bg-purple-100 text-purple-800'
                }`}>
                  <Building2 size={14} />
                </div>
                <div>
                  <div className="text-[11px] font-bold">Partner NGO</div>
                  <div className="text-[9px] text-slate-400">Shelter / Bank</div>
                </div>
              </button>

              {/* Volunteer Role */}
              <button
                type="button"
                onClick={() => handleRoleSelect('volunteer')}
                className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                  formData.role === 'volunteer'
                    ? 'border-blue-700 bg-blue-50 text-blue-950 ring-2 ring-blue-700/20 font-bold shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-white text-slate-600'
                }`}
              >
                <div className={`w-7 h-7 rounded-xl grid place-items-center ${
                  formData.role === 'volunteer' ? 'bg-blue-700 text-white' : 'bg-blue-100 text-blue-800'
                }`}>
                  <Bike size={14} />
                </div>
                <div>
                  <div className="text-[11px] font-bold">Volunteer</div>
                  <div className="text-[9px] text-slate-400">Rescue Courier</div>
                </div>
              </button>
            </div>
            <p className="mt-1.5 text-[10px] text-slate-400">
              {formData.role === 'donor' && '• List cooked & raw surplus meals with temperature safety timers.'}
              {formData.role === 'ngo' && '• Receive surplus batch notifications and claim meals for your community.'}
              {formData.role === 'volunteer' && '• Accept nearby delivery routes to transport food from donors to shelters.'}
            </p>
          </div>

          {/* Full Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="reg-name" className="block font-bold text-slate-700 text-xs mb-1">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  id="reg-name"
                  type="text"
                  name="name"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Maya Sharma"
                  className={`w-full rounded-2xl border pl-10 pr-3 py-2.5 text-xs text-slate-800 bg-slate-50/50 hover:bg-white focus:bg-white focus:outline-hidden focus:ring-3 focus:ring-emerald-600/15 transition-all ${
                    errors.name ? 'border-rose-400 focus:border-rose-500' : 'border-slate-200 focus:border-emerald-600'
                  }`}
                />
              </div>
              {errors.name && <p className="text-[10px] text-rose-600 mt-1">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="reg-email" className="block font-bold text-slate-700 text-xs mb-1">
                Email Address <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  id="reg-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="maya@organization.org"
                  className={`w-full rounded-2xl border pl-10 pr-3 py-2.5 text-xs text-slate-800 bg-slate-50/50 hover:bg-white focus:bg-white focus:outline-hidden focus:ring-3 focus:ring-emerald-600/15 transition-all ${
                    errors.email ? 'border-rose-400 focus:border-rose-500' : 'border-slate-200 focus:border-emerald-600'
                  }`}
                />
              </div>
              {errors.email && <p className="text-[10px] text-rose-600 mt-1">{errors.email}</p>}
            </div>
          </div>

          {/* Organization Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="reg-org" className="block font-bold text-slate-700 text-xs mb-1">
                Organization / Group
              </label>
              <div className="relative">
                <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  id="reg-org"
                  type="text"
                  name="organizationName"
                  value={formData.organizationName}
                  onChange={handleChange}
                  placeholder="e.g. Royal Banquet / Care Shelter"
                  className="w-full rounded-2xl border border-slate-200 pl-10 pr-3 py-2.5 text-xs text-slate-800 bg-slate-50/50 hover:bg-white focus:bg-white focus:border-emerald-600 focus:outline-hidden focus:ring-3 focus:ring-emerald-600/15 transition-all"
                />
              </div>
            </div>

            <div>
              <label htmlFor="reg-phone" className="block font-bold text-slate-700 text-xs mb-1">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  id="reg-phone"
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="w-full rounded-2xl border border-slate-200 pl-10 pr-3 py-2.5 text-xs text-slate-800 bg-slate-50/50 hover:bg-white focus:bg-white focus:border-emerald-600 focus:outline-hidden focus:ring-3 focus:ring-emerald-600/15 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Operating Address */}
          <div>
            <label htmlFor="reg-address" className="block font-bold text-slate-700 text-xs mb-1">
              Operating City / Pickup Address
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                id="reg-address"
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="e.g. Sector 18, Metro City Center"
                className="w-full rounded-2xl border border-slate-200 pl-10 pr-3 py-2.5 text-xs text-slate-800 bg-slate-50/50 hover:bg-white focus:bg-white focus:border-emerald-600 focus:outline-hidden focus:ring-3 focus:ring-emerald-600/15 transition-all"
              />
            </div>
          </div>

          {/* Password & Confirm Password */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="reg-password" className="block font-bold text-slate-700 text-xs mb-1">
                Password <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  id="reg-password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Min 6 characters"
                  className={`w-full rounded-2xl border pl-10 pr-10 py-2.5 text-xs text-slate-800 bg-slate-50/50 hover:bg-white focus:bg-white focus:outline-hidden focus:ring-3 focus:ring-emerald-600/15 transition-all ${
                    errors.password ? 'border-rose-400 focus:border-rose-500' : 'border-slate-200 focus:border-emerald-600'
                  }`}
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

              {/* Password Strength Indicator Bar */}
              {formData.password && (
                <div className="mt-1.5 space-y-1">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-slate-400 font-medium">Strength:</span>
                    <span className="font-bold text-slate-700">{passwordStrength.label}</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden flex gap-1">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${passwordStrength.color} ${
                        passwordStrength.score >= 1 ? 'w-1/4' : 'w-0'
                      }`}
                    />
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${passwordStrength.color} ${
                        passwordStrength.score >= 2 ? 'w-1/4' : 'w-0'
                      }`}
                    />
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${passwordStrength.color} ${
                        passwordStrength.score >= 3 ? 'w-1/4' : 'w-0'
                      }`}
                    />
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${passwordStrength.color} ${
                        passwordStrength.score >= 4 ? 'w-1/4' : 'w-0'
                      }`}
                    />
                  </div>
                </div>
              )}
              {errors.password && <p className="text-[10px] text-rose-600 mt-1">{errors.password}</p>}
            </div>

            <div>
              <label htmlFor="reg-confirm-password" className="block font-bold text-slate-700 text-xs mb-1">
                Confirm Password <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  id="reg-confirm-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  autoComplete="new-password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="Repeat password"
                  className={`w-full rounded-2xl border pl-10 pr-10 py-2.5 text-xs text-slate-800 bg-slate-50/50 hover:bg-white focus:bg-white focus:outline-hidden focus:ring-3 focus:ring-emerald-600/15 transition-all ${
                    errors.confirmPassword
                      ? 'border-rose-400 focus:border-rose-500'
                      : 'border-slate-200 focus:border-emerald-600'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-2.5 p-1 text-slate-400 hover:text-slate-700 rounded-lg transition"
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-[10px] text-rose-600 mt-1">{errors.confirmPassword}</p>
              )}
            </div>
          </div>

          {/* Terms Agreement Checkbox */}
          <div className="pt-1">
            <label className="flex items-start gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                className="w-4 h-4 mt-0.5 rounded-md border-slate-300 text-emerald-700 focus:ring-emerald-600/30 cursor-pointer accent-emerald-700"
              />
              <span className="text-slate-600 text-[11px] leading-relaxed">
                I agree to the{' '}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setLegalModalType('terms');
                    setLegalModalOpen(true);
                  }}
                  className="text-emerald-700 font-bold hover:underline"
                >
                  Terms of Service
                </button>{' '}
                and{' '}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setLegalModalType('privacy');
                    setLegalModalOpen(true);
                  }}
                  className="text-emerald-700 font-bold hover:underline"
                >
                  Privacy Policy
                </button>
                , and agree to uphold food safety standards.
              </span>
            </label>
            {errors.agreeTerms && (
              <p className="text-[10px] text-rose-600 mt-1">{errors.agreeTerms}</p>
            )}
          </div>

          {/* Submit Registration Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3.5 px-4 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-900/15 hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed group"
          >
            <UserPlus size={16} className="transition-transform group-hover:scale-110" />
            <span>{loading ? 'Creating Account...' : 'Complete Registration'}</span>
          </button>
        </form>

        {/* Link to Login */}
        <div className="text-center text-slate-500 text-xs pt-1 border-t border-slate-100">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-bold text-emerald-700 hover:text-emerald-900 hover:underline transition"
          >
            Sign in
          </Link>
        </div>
      </div>

      {/* Legal Terms & Privacy Modal */}
      <LegalModal
        isOpen={legalModalOpen}
        onClose={() => setLegalModalOpen(false)}
        type={legalModalType}
      />

      {/* Role-Aware Onboarding Modal */}
      <RoleOnboardingModal
        isOpen={showOnboarding}
        onClose={() => {
          setShowOnboarding(false);
          navigate('/dashboard');
        }}
        role={registeredUser?.role || formData.role}
        userName={registeredUser?.name || formData.name}
      />
    </AuthLayout>
  );
};

export default RegisterPage;
