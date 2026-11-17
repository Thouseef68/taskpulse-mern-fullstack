const mongoose = require('mongoose');
const dns = require('dns');

// Ensure DNS servers can resolve MongoDB Atlas SRV records
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch {
  // Ignore if permissions or platform restricts
}

let isConnected = false;

const isMongoConnected = () => {
  return isConnected && mongoose.connection.readyState === 1;
};

const connectDB = async () => {
  if (isConnected && mongoose.connection.readyState === 1) {
    return true;
  }

  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/taskpulse_db';

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = true;
    console.log(` MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(` MongoDB Connection Warning: ${error.message}`);
    isConnected = false;
    return false;
  }
};

module.exports = { connectDB, isMongoConnected };
