const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const {
  register,
  login,
  googleAuth,
  getGoogleAuthUrl,
  googleCallback,
  getMe,
  logout,
  forgotPassword,
  resetPassword,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// General rate limiter for authentication routes: 100 requests per 15 mins
const generalAuthLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests from this IP address. Please try again after 15 minutes.',
  },
});

// Strict rate limiter for sensitive endpoints (login, forgot-password): 10 requests per 15 mins
const strictAuthLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many authentication attempts. Please try again after 15 minutes.',
  },
});

// Registration & Login
router.post('/register', strictAuthLimiter, register);
router.post('/login', strictAuthLimiter, login);

// Google OAuth (ID token & Authorization Code callback)
router.post('/google', generalAuthLimiter, googleAuth);
router.get('/google/url', generalAuthLimiter, getGoogleAuthUrl);
router.get('/google/callback', googleCallback);

// Session & Recovery
router.post('/logout', logout);
router.post('/forgot-password', strictAuthLimiter, forgotPassword);
router.post('/reset-password', strictAuthLimiter, resetPassword);

// Authenticated current user
router.get('/me', protect, getMe);

module.exports = router;
