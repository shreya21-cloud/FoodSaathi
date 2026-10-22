import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { demoAccounts } from '../services/mockData';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Session storage vs Local storage helper
  const getStoredItem = (key) => {
    return localStorage.getItem(key) || sessionStorage.getItem(key) || null;
  };

  const [user, setUser] = useState(() => {
    const saved = getStoredItem('foodrescue_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  const [token, setToken] = useState(() => getStoredItem('foodrescue_token'));
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // Sync session state to storage
  const persistSession = (userData, tokenStr, remember = true) => {
    setUser(userData);
    setToken(tokenStr);

    if (userData && tokenStr) {
      if (remember) {
        localStorage.setItem('foodrescue_user', JSON.stringify(userData));
        localStorage.setItem('foodrescue_token', tokenStr);
        sessionStorage.removeItem('foodrescue_user');
        sessionStorage.removeItem('foodrescue_token');
      } else {
        sessionStorage.setItem('foodrescue_user', JSON.stringify(userData));
        sessionStorage.setItem('foodrescue_token', tokenStr);
        localStorage.removeItem('foodrescue_user');
        localStorage.removeItem('foodrescue_token');
      }
    } else {
      localStorage.removeItem('foodrescue_user');
      localStorage.removeItem('foodrescue_token');
      sessionStorage.removeItem('foodrescue_user');
      sessionStorage.removeItem('foodrescue_token');
    }
  };

  // Validate session on app initialization
  useEffect(() => {
    let isMounted = true;
    const verifySession = async () => {
      const activeToken = getStoredItem('foodrescue_token');
      if (activeToken) {
        try {
          // Attempt to retrieve latest user profile from server
          const res = await api.get('/auth/me');
          if (isMounted && res.data?.success && res.data.user) {
            setUser(res.data.user);
          }
        } catch (err) {
          // If token was a demo token or backend is in offline demo mode, keep client state
          if (activeToken.startsWith('demo_token_')) {
            // Keep active demo session
          } else if (err.response?.status === 401) {
            // Expired or invalid token
            if (isMounted) {
              persistSession(null, null);
            }
          }
        }
      }
      if (isMounted) {
        setInitialLoading(false);
      }
    };

    verifySession();
    return () => {
      isMounted = false;
    };
  }, []);

  // Standard Email/Password Login
  const login = async (email, password, remember = true) => {
    setLoading(true);
    try {
      const res = await api.post('/auth/login', { email, password });
      if (res.data.success) {
        persistSession(res.data.user, res.data.token, remember);
        setLoading(false);
        return { success: true, user: res.data.user };
      }
    } catch (error) {
      // Offline fallback: Check local demo accounts
      const matchedKey = Object.keys(demoAccounts).find(
        (key) => demoAccounts[key].email.toLowerCase() === email.toLowerCase()
      );
      if (matchedKey) {
        const demoUser = demoAccounts[matchedKey];
        const demoToken = 'demo_token_' + matchedKey;
        persistSession(demoUser, demoToken, remember);
        setLoading(false);
        return { success: true, user: demoUser };
      }

      setLoading(false);
      const serverMessage = error.response?.data?.message || error.message || 'Invalid email or password.';
      throw new Error(serverMessage);
    }
  };

  // Standard Registration
  const register = async (userData, remember = true) => {
    setLoading(true);
    try {
      const res = await api.post('/auth/register', userData);
      if (res.data.success) {
        persistSession(res.data.user, res.data.token, remember);
        setLoading(false);
        return { success: true, user: res.data.user };
      }
    } catch (error) {
      // If server returned specific validation error (e.g. email exists), throw it
      if (error.response?.data?.message) {
        setLoading(false);
        throw new Error(error.response.data.message);
      }

      // Offline resilient fallback registration
      const newUser = {
        id: 'user_' + Date.now(),
        name: userData.name,
        email: userData.email,
        role: userData.role || 'donor',
        organizationName: userData.organizationName || '',
        phone: userData.phone || '',
        address: userData.address || 'Metro Center, City',
        createdAt: new Date().toISOString(),
      };
      const fallbackToken = 'demo_token_' + newUser.id;
      persistSession(newUser, fallbackToken, remember);
      setLoading(false);
      return { success: true, user: newUser };
    }
  };

  // Google OAuth Login & Sign-Up
  const googleLogin = async (credential, role = 'donor', remember = true) => {
    setLoading(true);
    try {
      const res = await api.post('/auth/google', { credential, role });
      if (res.data.success) {
        persistSession(res.data.user, res.data.token, remember);
        setLoading(false);
        return { success: true, user: res.data.user };
      }
      throw new Error(res.data.message || 'Google authentication failed.');
    } catch (error) {
      setLoading(false);
      const msg = error.response?.data?.message || error.message || 'Google authentication failed.';
      throw new Error(msg);
    }
  };

  // Forgot Password flow
  const forgotPassword = async (email) => {
    try {
      const res = await api.post('/auth/forgot-password', { email });
      return res.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Unable to process password reset request.');
    }
  };

  // Reset Password with Token
  const resetPassword = async (token, newPassword) => {
    try {
      const res = await api.post('/auth/reset-password', { token, newPassword });
      return res.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Password reset failed.');
    }
  };

  // 1-Click Demo Login
  const loginAsDemo = (roleKey) => {
    const target = demoAccounts[roleKey] || demoAccounts.donor;
    const demoToken = 'demo_token_' + roleKey;
    persistSession(target, demoToken, true);
    return target;
  };

  // Instant Role Switcher for testing
  const switchRole = (newRole) => {
    const target = demoAccounts[newRole] || {
      ...user,
      role: newRole,
      name: `${newRole.toUpperCase()} Representative`,
    };
    persistSession(target, token || 'demo_token_' + newRole, true);
  };

  // Handle external token (e.g. from Google OAuth Authorization Code callback redirect)
  const handleExternalToken = async (tokenStr) => {
    setLoading(true);
    try {
      localStorage.setItem('foodrescue_token', tokenStr);
      const res = await api.get('/auth/me');
      if (res.data?.success && res.data.user) {
        persistSession(res.data.user, tokenStr, true);
        setLoading(false);
        return { success: true, user: res.data.user };
      }
      throw new Error('Failed to retrieve user profile.');
    } catch (err) {
      persistSession(null, null);
      setLoading(false);
      throw err;
    }
  };

  // Logout
  const logout = () => {
    persistSession(null, null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        role: user?.role || 'donor',
        isAuthenticated: Boolean(user && token),
        loading,
        initialLoading,
        login,
        register,
        googleLogin,
        handleExternalToken,
        forgotPassword,
        resetPassword,
        logout,
        loginAsDemo,
        switchRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
