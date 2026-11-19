const mongoose = require('mongoose');
const dns = require('dns');

// Ensure DNS servers can resolve MongoDB Atlas SRV records
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch {
  // Ignore if restricted
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const isMongoConnected = () => {
  return mongoose.connection.readyState === 1;
};

const connectDB = async () => {
  // 1. If already connected, return immediately
  if (mongoose.connection.readyState === 1) {
    return true;
  }

  // 2. If connection is currently in progress, wait for it
  if (cached.promise && mongoose.connection.readyState === 2) {
    return cached.promise;
  }

  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/taskpulse_db';

  cached.promise = mongoose
    .connect(uri, {
      serverSelectionTimeoutMS: 8000,
      connectTimeoutMS: 10000,
      bufferCommands: true, // Keep Mongoose query buffering active during cold starts
    })
    .then((conn) => {
      cached.conn = conn;
      console.log(` MongoDB Connected: ${conn.connection.host}`);
      return true;
    })
    .catch((error) => {
      console.warn(` MongoDB Connection Warning: ${error.message}`);
      cached.promise = null;
      cached.conn = null;
      return false;
    });

  return cached.promise;
};

module.exports = { connectDB, isMongoConnected };
