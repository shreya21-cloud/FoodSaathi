const mongoose = require('mongoose');

let isConnected = false;

// Sanitize MongoDB URI to mask credentials for logs and health checks
const sanitizeURI = (uri) => {
  if (!uri) return 'undefined';
  try {
    return uri.replace(/\/\/([^:]+):([^@]+)@/, '//$1:****@');
  } catch (e) {
    return 'mongodb-masked-uri';
  }
};

const connectDB = async () => {
  // If already connected or connecting, avoid duplicate connection attempts
  if (mongoose.connection.readyState === 1) {
    isConnected = true;
    return mongoose.connection;
  }

  if (mongoose.connection.readyState === 2) {
    return mongoose.connection;
  }

  const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/foodrescue_ai';
  const maskedURI = sanitizeURI(mongoURI);

  try {
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
    });

    isConnected = true;
    console.log(`[MongoDB Atlas/Server] Connected successfully to host: ${conn.connection.host}`);

    // Build/sync indexes safely
    try {
      const User = require('../models/User');
      await User.init();
    } catch (indexErr) {
      // Index initialization non-blocking
    }

    return conn;
  } catch (error) {
    isConnected = false;
    console.warn(`[MongoDB Notice] Database connection unavailable (${maskedURI}): ${error.message}`);
    console.info(`[FoodRescue AI] Server operating in resilient fallback mode (in-memory demo state ready).`);
    return null;
  }
};

// Monitor connection lifecycle
mongoose.connection.on('disconnected', () => {
  isConnected = false;
  console.warn('[MongoDB Atlas/Server] Connection lost. Fallback active.');
});

mongoose.connection.on('reconnected', () => {
  isConnected = true;
  console.log('[MongoDB Atlas/Server] Reconnected to database.');
});

// Safe database health status without credential exposure
const getDBStatus = () => isConnected;

const getDBHealthDetails = () => {
  const states = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  };

  const readyState = mongoose.connection.readyState;
  return {
    connected: readyState === 1,
    state: states[readyState] || 'unknown',
    host: readyState === 1 ? mongoose.connection.host : null,
    databaseName: readyState === 1 ? mongoose.connection.name : null,
  };
};

module.exports = { connectDB, getDBStatus, getDBHealthDetails };
