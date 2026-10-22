import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Session storage vs Local storage helper
  const getStoredItem = (key) => {
    return localStorage.getItem(key) || sessionStorage.getItem(key) || null;
  };

  const [user, setUser] = useState(() => {
    const saved = getStoredItem('foodsaathi_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  const [token, setToken] = useState(() => getStoredItem('foodsaathi_token'));
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // Sync session state to storage
  const persistSession = (userData, tokenStr, remember = true) => {
    setUser(userData);
    setToken(tokenStr);

    if (userData && tokenStr) {
      if (remember) {
        localStorage.setItem('foodsaathi_user', JSON.stringify(userData));
        localStorage.setItem('foodsaathi_token', tokenStr);
        sessionStorage.removeItem('foodsaathi_user');
        sessionStorage.removeItem('foodsaathi_token');
      } else {
        sessionStorage.setItem('foodsaathi_user', JSON.stringify(userData));
        sessionStorage.setItem('foodsaathi_token', tokenStr);
        localStorage.removeItem('foodsaathi_user');
        localStorage.removeItem('foodsaathi_token');
      }
    } else {
      localStorage.removeItem('foodsaathi_user');
      localStorage.removeItem('foodsaathi_token');
      sessionStorage.removeItem('foodsaathi_user');
      sessionStorage.removeItem('foodsaathi_token');
    }
  };

  // Validate session on app initialization
  useEffect(() => {
    let isMounted = true;
    const verifySession = async () => {
      const activeToken = getStoredItem('foodsaathi_token');
      if (activeToken) {
        try {
          const res = await api.get('/auth/me');
          if (isMounted && res.data?.success && res.data.user) {
            setUser(res.data.user);
          }
        } catch (err) {
          if (err.response?.status === 401) {
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
      setLoading(false);
      const serverMessage = error.response?.data?.message || error.message || 'Registration failed.';
      throw new Error(serverMessage);
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

  // Handle external token (e.g. from Google OAuth Authorization Code callback redirect)
  const handleExternalToken = async (tokenStr) => {
    setLoading(true);
    try {
      localStorage.setItem('foodsaathi_token', tokenStr);
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
