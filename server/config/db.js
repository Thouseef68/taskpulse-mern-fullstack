const mongoose = require('mongoose');
const dns = require('dns');

// Ensure DNS servers can resolve MongoDB Atlas SRV records
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch {
  // Ignore if restricted
}

let cachedPromise = null;

const isMongoConnected = () => {
  return mongoose.connection.readyState === 1;
};

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return true;
  }

  if (cachedPromise) {
    return cachedPromise;
  }

  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/taskpulse_db';

  cachedPromise = mongoose
    .connect(uri, {
      serverSelectionTimeoutMS: 5000,
    })
    .then((conn) => {
      console.log(` MongoDB Connected: ${conn.connection.host}`);
      return true;
    })
    .catch((error) => {
      console.warn(` MongoDB Connection Warning: ${error.message}`);
      cachedPromise = null;
      return false;
    });

  return cachedPromise;
};

module.exports = { connectDB, isMongoConnected };
