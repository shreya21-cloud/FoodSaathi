require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB, getDBStatus, getDBHealthDetails } = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Routes
const authRoutes = require('./routes/authRoutes');
const donationRoutes = require('./routes/donationRoutes');
const ngoRoutes = require('./routes/ngoRoutes');
const volunteerRoutes = require('./routes/volunteerRoutes');
const deliveryRoutes = require('./routes/deliveryRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const simulatorRoutes = require('./routes/simulatorRoutes');

const app = express();

// Trust reverse proxy (for Render, Heroku, Nginx rate-limiting & HTTPS)
app.set('trust proxy', 1);

// Allowed origins for CORS (supports local development & production deployments)
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow non-browser requests (e.g. mobile apps, curl, server-to-server)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== 'production') {
        return callback(null, true);
      }
      return callback(null, true); // Permissive fallback for seamless local/preview deployment
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  })
);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Connect to MongoDB Atlas / Server (with non-blocking fallback if offline)
connectDB();

// Health check with safe database status (no credentials leaked)
app.get('/api/health', (req, res) => {
  const dbHealth = getDBHealthDetails();
  res.json({
    status: 'online',
    platform: 'FoodRescue AI',
    version: '1.0.0',
    databaseConnected: dbHealth.connected,
    database: {
      status: dbHealth.state,
      connected: dbHealth.connected,
      host: dbHealth.host,
      databaseName: dbHealth.databaseName,
    },
    mode: dbHealth.connected ? 'MongoDB Atlas / Connected' : 'In-Memory Resilient Mode',
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/ngos', ngoRoutes);
app.use('/api/volunteers', volunteerRoutes);
app.use('/api/deliveries', deliveryRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/simulator', simulatorRoutes);

// Root message
app.get('/', (req, res) => {
  res.send('🌿 FoodRescue AI Backend API is active and running.');
});

// Centralized error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`🚀 FoodRescue AI Server listening on port ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/api/health`);
});

module.exports = app;
