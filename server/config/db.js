const mongoose = require('mongoose');

let isConnected = false;

const isMongoConnected = () => {
  return isConnected && mongoose.connection.readyState === 1;
};

const connectDB = async () => {
  if (isConnected) {
    return true;
  }

  const uri = process.env.MONGODB_URI;

  // On Vercel / serverless: if no URI or pointing to localhost, skip attempting localhost to prevent 10s hang
  const isServerlessOrProd = Boolean(process.env.VERCEL || process.env.NODE_ENV === 'production');
  if (!uri && isServerlessOrProd) {
    console.log('ℹ️ Running on Vercel/Cloud without MONGODB_URI. Activating built-in resilient in-memory database store.');
    return false;
  }

  const targetUri = uri || 'mongodb://localhost:27017/taskpulse_db';

  try {
    const conn = await mongoose.connect(targetUri, {
      serverSelectionTimeoutMS: 2500, // fast failover instead of 10s hang
      bufferCommands: false, // Don't buffer if connection fails
    });
    isConnected = true;
    console.log(` MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(` MongoDB Connection Warning: ${error.message}`);
    console.warn(' Switching to built-in resilient database store.');
    isConnected = false;
    return false;
  }
};

module.exports = { connectDB, isMongoConnected };
