const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    return;
  }

  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/taskpulse_db';

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = true;
    console.log(` MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(` MongoDB Connection Warning: ${error.message}`);
    console.warn(' Note: If running locally without local MongoDB or Atlas URI, configure MONGODB_URI in .env');
    // We don't exit process in serverless / test mode so health checks and demos can run
  }
};

module.exports = connectDB;
