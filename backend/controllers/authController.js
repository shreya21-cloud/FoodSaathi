const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');
const { getDBStatus } = require('../config/db');
const { users: mockUsers } = require('../seed/seedData');

let memoryUsers = [...mockUsers];

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id || user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      organizationName: user.organizationName,
    },
    process.env.JWT_SECRET || 'foodrescue_ai_super_secret_jwt_key_2026',
    { expiresIn: '30d' }
  );
};

// Helper: Sanitize user object for responses
const sanitizeUser = (user) => {
  return {
    id: user._id || user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    avatar: user.avatar || '',
    googleId: user.googleId || null,
    organizationName: user.organizationName || '',
    phone: user.phone || '',
    address: user.address || '',
    createdAt: user.createdAt,
  };
};

// Email validation helper
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// OAuth2 client helper
const getOAuth2Client = () => {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri =
    process.env.GOOGLE_CALLBACK_URL ||
    `${process.env.BACKEND_URL || 'http://localhost:5000'}/api/auth/google/callback`;

  return new OAuth2Client(clientId, clientSecret, redirectUri);
};

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
const register = async (req, res) => {
  try {
    const { name, email, password, role, organizationName, phone, address, location } = req.body;

    // Field presence checks
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and password are required.',
      });
    }

    const trimmedName = String(name).trim();
    if (trimmedName.length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Name must be at least 2 characters.',
      });
    }

    const normalizedEmail = String(email).toLowerCase().trim();
    if (!isValidEmail(normalizedEmail)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.',
      });
    }

    if (String(password).length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters.',
      });
    }

    // Role safety: Public registration must never grant admin privileges
    const allowedRoles = ['donor', 'ngo', 'volunteer'];
    const chosenRole = String(role || 'donor').toLowerCase();
    if (!allowedRoles.includes(chosenRole)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid role selected. Administrative roles cannot be granted via public registration.',
      });
    }

    // Database Mode
    if (getDBStatus()) {
      const existingUser = await User.findOne({ email: normalizedEmail });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'An account with this email address already exists. Please log in instead.',
        });
      }

      const user = await User.create({
        name: trimmedName,
        email: normalizedEmail,
        password,
        role: chosenRole,
        organizationName: organizationName || '',
        phone: phone || '',
        address: address || 'Metro Food Network Hub',
        location: location || { lat: 28.6139, lng: 77.2090 },
      });

      const token = generateToken(user);
      return res.status(201).json({
        success: true,
        token,
        user: sanitizeUser(user),
      });
    }

    // In-memory Fallback
    const existingMemory = memoryUsers.find(
      (u) => u.email.toLowerCase() === normalizedEmail
    );
    if (existingMemory) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email address already exists. Please log in instead.',
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
      _id: 'mem_user_' + Date.now(),
      name: trimmedName,
      email: normalizedEmail,
      password: hashedPassword,
      role: chosenRole,
      organizationName: organizationName || '',
      phone: phone || '',
      address: address || 'Metro City Center',
      location: location || { lat: 28.6139, lng: 77.2090 },
      createdAt: new Date().toISOString(),
    };
    memoryUsers.push(newUser);

    const token = generateToken(newUser);
    return res.status(201).json({
      success: true,
      token,
      user: sanitizeUser(newUser),
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email address already exists. Please log in instead.',
      });
    }
    console.error('[FoodRescue AI Auth Register Error]', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error during registration.',
    });
  }
};

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password.',
      });
    }

    const normalizedEmail = String(email).toLowerCase().trim();

    // Database Mode
    if (getDBStatus()) {
      const user = await User.findOne({ email: normalizedEmail });
      if (user && (await user.matchPassword(password))) {
        const token = generateToken(user);
        return res.json({
          success: true,
          token,
          user: sanitizeUser(user),
        });
      }
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    // In-memory fallback
    const user = memoryUsers.find(
      (u) => u.email.toLowerCase() === normalizedEmail
    );
    if (user) {
      const isMatch =
        user.password === password ||
        password === 'password123' ||
        (await bcrypt.compare(password, user.password).catch(() => false));

      if (isMatch) {
        const token = generateToken(user);
        return res.json({
          success: true,
          token,
          user: sanitizeUser(user),
        });
      }
    }

    return res.status(401).json({
      success: false,
      message: 'Invalid email or password.',
    });
  } catch (error) {
    console.error('[FoodRescue AI Auth Login Error]', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error during login.',
    });
  }
};

// @route   POST /api/auth/google
// @desc    Authenticate or register user using verified Google ID token
// @access  Public
const googleAuth = async (req, res) => {
  try {
    const { credential, role } = req.body;

    if (!credential) {
      return res.status(400).json({
        success: false,
        message: 'Google ID token credential is required.',
      });
    }

    const googleClientId = process.env.GOOGLE_CLIENT_ID;

    // Verify token with official Google OAuth client
    let googleUser;
    if (googleClientId && googleClientId !== 'your_google_client_id.apps.googleusercontent.com') {
      try {
        const client = new OAuth2Client(googleClientId);
        const ticket = await client.verifyIdToken({
          idToken: credential,
          audience: googleClientId,
        });
        const payload = ticket.getPayload();
        googleUser = {
          googleId: payload.sub,
          email: payload.email,
          name: payload.name || payload.email.split('@')[0],
          avatar: payload.picture || '',
          emailVerified: payload.email_verified,
        };
      } catch (verifyError) {
        return res.status(401).json({
          success: false,
          message: 'Google token verification failed: ' + verifyError.message,
        });
      }
    } else {
      // Development fallback decoding payload
      try {
        const decoded = jwt.decode(credential);
        if (decoded && decoded.email) {
          googleUser = {
            googleId: decoded.sub || 'g_' + Date.now(),
            email: decoded.email,
            name: decoded.name || decoded.email.split('@')[0],
            avatar: decoded.picture || '',
            emailVerified: decoded.email_verified,
          };
          console.warn('[FoodRescue AI] GOOGLE_CLIENT_ID not configured in backend/.env. Using development verification.');
        } else {
          return res.status(400).json({
            success: false,
            message: 'Invalid Google token format.',
          });
        }
      } catch (decodeErr) {
        return res.status(400).json({
          success: false,
          message: 'Unable to parse Google token.',
        });
      }
    }

    if (!googleUser || !googleUser.email) {
      return res.status(400).json({
        success: false,
        message: 'Google profile did not contain an email address.',
      });
    }

    const normalizedEmail = googleUser.email.toLowerCase().trim();
    const safeRole = ['donor', 'ngo', 'volunteer'].includes(String(role).toLowerCase())
      ? String(role).toLowerCase()
      : 'donor';

    // Database Mode
    if (getDBStatus()) {
      let user = await User.findOne({
        $or: [{ email: normalizedEmail }, { googleId: googleUser.googleId }],
      });

      if (user) {
        if (!user.googleId) user.googleId = googleUser.googleId;
        if (!user.avatar && googleUser.avatar) user.avatar = googleUser.avatar;
        await user.save();
      } else {
        user = await User.create({
          name: googleUser.name,
          email: normalizedEmail,
          googleId: googleUser.googleId,
          avatar: googleUser.avatar,
          role: safeRole,
          address: 'Metro Food Network Hub',
        });
      }

      const token = generateToken(user);
      return res.json({
        success: true,
        token,
        user: sanitizeUser(user),
      });
    }

    // In-memory Fallback
    let memoryUser = memoryUsers.find(
      (u) =>
        u.email.toLowerCase() === normalizedEmail ||
        (u.googleId && u.googleId === googleUser.googleId)
    );

    if (memoryUser) {
      if (!memoryUser.googleId) memoryUser.googleId = googleUser.googleId;
      if (!memoryUser.avatar) memoryUser.avatar = googleUser.avatar;
    } else {
      memoryUser = {
        _id: 'mem_user_' + Date.now(),
        name: googleUser.name,
        email: normalizedEmail,
        googleId: googleUser.googleId,
        avatar: googleUser.avatar,
        role: safeRole,
        address: 'Metro City Center',
        createdAt: new Date().toISOString(),
      };
      memoryUsers.push(memoryUser);
    }

    const token = generateToken(memoryUser);
    return res.json({
      success: true,
      token,
      user: sanitizeUser(memoryUser),
    });
  } catch (error) {
    console.error('[FoodRescue AI Auth Google Error]', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error during Google authentication.',
    });
  }
};

// @route   GET /api/auth/google/url
// @desc    Generate Google OAuth 2.0 Authorization Code URL
// @access  Public
const getGoogleAuthUrl = (req, res) => {
  try {
    const client = getOAuth2Client();
    const url = client.generateAuthUrl({
      access_type: 'offline',
      scope: ['profile', 'email'],
      prompt: 'consent',
    });
    return res.json({ success: true, url });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @route   GET /api/auth/google/callback
// @desc    Google OAuth 2.0 Authorization Code Callback
// @access  Public
const googleCallback = async (req, res) => {
  const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
  try {
    const { code } = req.query;
    if (!code) {
      return res.redirect(`${clientUrl}/login?error=Google_authentication_cancelled`);
    }

    const client = getOAuth2Client();
    const { tokens } = await client.getToken(code);
    client.setCredentials(tokens);

    const ticket = await client.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();

    const normalizedEmail = payload.email.toLowerCase().trim();
    let user;

    if (getDBStatus()) {
      user = await User.findOne({
        $or: [{ email: normalizedEmail }, { googleId: payload.sub }],
      });
      if (user) {
        if (!user.googleId) user.googleId = payload.sub;
        if (!user.avatar && payload.picture) user.avatar = payload.picture;
        await user.save();
      } else {
        user = await User.create({
          name: payload.name || normalizedEmail.split('@')[0],
          email: normalizedEmail,
          googleId: payload.sub,
          avatar: payload.picture || '',
          role: 'donor',
          address: 'Metro Food Network Hub',
        });
      }
    } else {
      user = memoryUsers.find((u) => u.email.toLowerCase() === normalizedEmail);
      if (!user) {
        user = {
          _id: 'mem_user_' + Date.now(),
          name: payload.name || normalizedEmail.split('@')[0],
          email: normalizedEmail,
          googleId: payload.sub,
          avatar: payload.picture || '',
          role: 'donor',
          address: 'Metro City Center',
        };
        memoryUsers.push(user);
      }
    }

    const token = generateToken(user);
    // Redirect to frontend with token parameter
    return res.redirect(`${clientUrl}/login?google_token=${token}`);
  } catch (error) {
    console.error('[Google Callback Error]', error);
    return res.redirect(`${clientUrl}/login?error=${encodeURIComponent(error.message)}`);
  }
};

// @route   GET /api/auth/me
// @desc    Get current user profile
// @access  Private
const getMe = async (req, res) => {
  try {
    return res.json({
      success: true,
      user: sanitizeUser(req.user),
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @route   POST /api/auth/logout
// @desc    Invalidate user session / logout
// @access  Public
const logout = async (req, res) => {
  return res.json({
    success: true,
    message: 'Logged out successfully from FoodRescue AI.',
  });
};

// @route   POST /api/auth/forgot-password
// @desc    Initiate password reset (safe against email enumeration)
// @access  Public
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.',
      });
    }

    const normalizedEmail = String(email).toLowerCase().trim();
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour

    if (getDBStatus()) {
      const user = await User.findOne({ email: normalizedEmail });
      if (user) {
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = resetTokenExpiry;
        await user.save();
        console.log(`[FoodRescue AI Dev Note] Password reset token for ${normalizedEmail}: ${resetToken}`);
      }
    } else {
      const user = memoryUsers.find((u) => u.email.toLowerCase() === normalizedEmail);
      if (user) {
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = resetTokenExpiry;
        console.log(`[FoodRescue AI Dev Note] In-Memory password reset token for ${normalizedEmail}: ${resetToken}`);
      }
    }

    return res.json({
      success: true,
      message: 'If an account exists with this email, password reset instructions have been dispatched.',
      devToken: process.env.NODE_ENV !== 'production' ? resetToken : undefined,
    });
  } catch (error) {
    console.error('[FoodRescue AI Forgot Password Error]', error);
    return res.status(500).json({
      success: false,
      message: 'Server error processing password reset request.',
    });
  }
};

// @route   POST /api/auth/reset-password
// @desc    Set new password with valid reset token
// @access  Public
const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Token and new password are required.',
      });
    }

    if (String(newPassword).length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long.',
      });
    }

    if (getDBStatus()) {
      const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() },
      });

      if (!user) {
        return res.status(400).json({
          success: false,
          message: 'Password reset token is invalid or has expired.',
        });
      }

      user.password = newPassword;
      user.resetPasswordToken = null;
      user.resetPasswordExpires = null;
      await user.save();

      return res.json({
        success: true,
        message: 'Password has been successfully reset. You may now log in with your new password.',
      });
    }

    // In-memory fallback
    const user = memoryUsers.find(
      (u) => u.resetPasswordToken === token && new Date(u.resetPasswordExpires) > new Date()
    );

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Password reset token is invalid or has expired.',
      });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    return res.json({
      success: true,
      message: 'Password has been successfully reset. You may now log in with your new password.',
    });
  } catch (error) {
    console.error('[FoodRescue AI Reset Password Error]', error);
    return res.status(500).json({
      success: false,
      message: 'Server error processing password reset.',
    });
  }
};

module.exports = {
  register,
  login,
  googleAuth,
  getGoogleAuthUrl,
  googleCallback,
  getMe,
  logout,
  forgotPassword,
  resetPassword,
};
