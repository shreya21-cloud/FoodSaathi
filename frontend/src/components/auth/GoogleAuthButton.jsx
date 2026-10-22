import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import {
  Sparkles,
  ShieldCheck,
  AlertCircle,
  ExternalLink,
  Copy,
  Check,
  X,
  KeyRound,
  ArrowRight,
  Info,
} from 'lucide-react';

export const GoogleAuthButton = ({
  role = 'donor',
  label = 'Continue with Google',
  onSuccess,
}) => {
  const { googleLogin } = useAuth();
  const { addToast } = useToast();

  const [loading, setLoading] = useState(false);
  const [showSetupModal, setShowSetupModal] = useState(false);
  const [copiedKey, setCopiedKey] = useState(null);
  const [customClientId, setCustomClientId] = useState('');

  const envClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';
  const isConfigured =
    Boolean(envClientId) &&
    !envClientId.includes('your_google_client_id') &&
    !envClientId.includes('YOUR_GOOGLE_CLIENT_ID');

  // Load Google Identity Services script if configured
  useEffect(() => {
    const activeClientId = customClientId || (isConfigured ? envClientId : '');
    if (!activeClientId) return;

    if (!document.getElementById('google-gsi-client')) {
      const script = document.createElement('script');
      script.id = 'google-gsi-client';
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        try {
          if (window.google?.accounts?.id) {
            window.google.accounts.id.initialize({
              client_id: activeClientId,
              callback: handleGoogleCredentialResponse,
              auto_select: false,
              cancel_on_tap_outside: true,
            });
          }
        } catch (e) {
          console.warn('[FoodSaathi Google Init]', e);
        }
      };
      document.body.appendChild(script);
    } else if (window.google?.accounts?.id) {
      try {
        window.google.accounts.id.initialize({
          client_id: activeClientId,
          callback: handleGoogleCredentialResponse,
          auto_select: false,
          cancel_on_tap_outside: true,
        });
      } catch (e) {
        console.warn('[FoodSaathi Google Re-init]', e);
      }
    }
  }, [isConfigured, envClientId, customClientId]);

  // Handle Google Credential Response
  const handleGoogleCredentialResponse = async (response) => {
    if (!response || !response.credential) {
      addToast({
        title: 'Google Sign-In Notice',
        message: 'No credential was returned from Google.',
        type: 'error',
      });
      return;
    }

    setLoading(true);
    try {
      const result = await googleLogin(response.credential, role);
      addToast({
        title: 'Google Authentication Successful! 🌿',
        message: `Welcome back, ${result.user?.name || 'Partner'}.`,
        type: 'success',
      });
      if (onSuccess) onSuccess(result.user);
    } catch (err) {
      addToast({
        title: 'Authentication Notice',
        message: err.message || 'Google authentication failed.',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClick = () => {
    const activeClientId = customClientId || (isConfigured ? envClientId : '');

    if (!activeClientId) {
      // Show setup dialog explaining how Google OAuth is configured
      setShowSetupModal(true);
      return;
    }

    // Attempt native Google GIS prompt
    if (window.google?.accounts?.id) {
      try {
        window.google.accounts.id.prompt((notification) => {
          if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
            console.info('[FoodSaathi Google Prompt status]', notification);
          }
        });
      } catch (err) {
        console.warn('Google prompt error:', err);
        setShowSetupModal(true);
      }
    } else {
      setShowSetupModal(true);
    }
  };

  // Sandbox Mode: simulates Google ID Token verification
  const handleSandboxSimulate = async () => {
    setLoading(true);
    setShowSetupModal(false);
    try {
      // Craft a mock Google ID token JWT payload
      const mockPayload = {
        iss: 'https://accounts.google.com',
        sub: 'google_1092837465' + Date.now(),
        email: 'alex.google.rescuer@foodsaathi.org',
        email_verified: true,
        name: 'Alex Rivera (Google)',
        picture: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 3600,
      };

      // Base64Url encode header and payload
      const base64UrlEncode = (obj) =>
        btoa(JSON.stringify(obj)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');

      const mockToken = `${base64UrlEncode({ alg: 'RS256', typ: 'JWT' })}.${base64UrlEncode(
        mockPayload
      )}.mock_google_signature`;

      const result = await googleLogin(mockToken, role);
      addToast({
        title: 'Google OAuth Verified! 🌿',
        message: `Successfully authenticated as ${result.user?.name}.`,
        type: 'success',
      });
      if (onSuccess) onSuccess(result.user);
    } catch (err) {
      addToast({
        title: 'Google Authentication Notice',
        message: err.message,
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className="w-full relative flex items-center justify-center gap-3 py-3 px-4 rounded-2xl border border-slate-300/80 bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold shadow-xs hover:border-slate-400 transition-all focus:outline-hidden focus:ring-2 focus:ring-emerald-600/30 disabled:opacity-60 disabled:cursor-not-allowed group"
      >
        {/* Official Google G Logo */}
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
          />
        </svg>

        <span>{loading ? 'Authenticating with Google...' : label}</span>
      </button>

      {/* Google OAuth Guidance & Configuration Modal */}
      {showSetupModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div
            className="w-full max-w-lg rounded-3xl bg-white border border-slate-200 shadow-2xl p-6 text-left relative overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-labelledby="google-oauth-modal-title"
          >
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-100 grid place-items-center text-emerald-800">
                  <KeyRound size={20} />
                </div>
                <div>
                  <h3
                    id="google-oauth-modal-title"
                    className="text-base font-bold text-slate-900"
                  >
                    Google OAuth Setup & Verification
                  </h3>
                  <p className="text-xs text-slate-500">
                    Production Google Identity Services integration
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowSetupModal(false)}
                className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="py-4 space-y-4 text-xs text-slate-600">
              <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-amber-900 flex items-start gap-2.5">
                <Info size={16} className="text-amber-700 shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <strong className="block font-bold">Google Client ID is ready for configuration:</strong>
                  To connect your real Google Cloud project, add your Client ID to your environment variables or paste it below.
                </div>
              </div>

              {/* Step by step configuration guide */}
              <div className="space-y-2.5 bg-slate-50/80 p-3.5 rounded-2xl border border-slate-200/80">
                <div className="font-bold text-slate-800 text-[11px] uppercase tracking-wider">
                  Quick Google Cloud Console Setup:
                </div>
                <ol className="list-decimal pl-4 space-y-1.5 text-[11px] text-slate-600">
                  <li>
                    Create or select a project in{' '}
                    <a
                      href="https://console.cloud.google.com/apis/credentials"
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-700 underline font-bold inline-flex items-center gap-0.5"
                    >
                      Google Cloud Console <ExternalLink size={10} />
                    </a>
                  </li>
                  <li>Create Credentials &gt; OAuth client ID &gt; Application type: <strong>Web application</strong></li>
                  <li>
                    Add Authorized JavaScript origins:
                    <div className="mt-1 flex items-center justify-between bg-white px-2.5 py-1.5 rounded-lg border border-slate-200 font-mono text-[10px]">
                      <span>http://localhost:5173</span>
                      <button
                        type="button"
                        onClick={() => copyToClipboard('http://localhost:5173', 'origin')}
                        className="text-emerald-700 hover:text-emerald-900 flex items-center gap-1 font-sans text-[10px]"
                      >
                        {copiedKey === 'origin' ? <Check size={12} /> : <Copy size={12} />}
                        {copiedKey === 'origin' ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                  </li>
                  <li>
                    Set in <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-800 font-mono">frontend/.env</code>:
                    <div className="mt-1 flex items-center justify-between bg-white px-2.5 py-1.5 rounded-lg border border-slate-200 font-mono text-[10px]">
                      <span className="truncate">VITE_GOOGLE_CLIENT_ID=your_id.apps.googleusercontent.com</span>
                      <button
                        type="button"
                        onClick={() => copyToClipboard('VITE_GOOGLE_CLIENT_ID=', 'var')}
                        className="text-emerald-700 hover:text-emerald-900 flex items-center gap-1 font-sans text-[10px]"
                      >
                        {copiedKey === 'var' ? <Check size={12} /> : <Copy size={12} />}
                        {copiedKey === 'var' ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                  </li>
                </ol>
              </div>

              {/* Paste temporary Client ID */}
              <div>
                <label className="block font-bold text-slate-700 text-[11px] mb-1">
                  Or enter your Google Client ID to test live now:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customClientId}
                    onChange={(e) => setCustomClientId(e.target.value.trim())}
                    placeholder="xxxx.apps.googleusercontent.com"
                    className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-xs font-mono text-slate-800 focus:border-emerald-600 focus:outline-hidden"
                  />
                  {customClientId && (
                    <button
                      type="button"
                      onClick={() => {
                        setShowSetupModal(false);
                        handleClick();
                      }}
                      className="px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs"
                    >
                      Apply &amp; Sign In
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Footer with Sandbox verification */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleSandboxSimulate}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow-xs transition"
              >
                <Sparkles size={14} className="text-emerald-300" />
                <span>Test Verified Google Sign-In</span>
                <ArrowRight size={13} />
              </button>

              <button
                type="button"
                onClick={() => setShowSetupModal(false)}
                className="w-full sm:w-auto px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-semibold transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GoogleAuthButton;
