const jwt = require('jsonwebtoken');
const { getUserModel } = require('../models/dataStore');
const { connectDB } = require('../config/db');

const protect = async (req, res, next) => {
  let token;

  // Check if Bearer token exists in Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      if (!token) {
        return res.status(401).json({
          success: false,
          message: 'Not authorized: Token missing in Authorization header',
        });
      }

      // Verify token cryptographic signature
      const secret = process.env.JWT_SECRET || 'taskpulse_secure_jwt_secret_key_2026';
      let decoded;
      try {
        decoded = jwt.verify(token, secret);
      } catch (jwtErr) {
        return res.status(401).json({
          success: false,
          message: 'Not authorized: Invalid or expired token',
          error: jwtErr.message,
        });
      }

      // Ensure database is ready before querying user
      await connectDB();
      const User = getUserModel();

      let user;
      try {
        user = await User.findById(decoded.id).select('-password');
      } catch (dbErr) {
        console.error('Database query error in authMiddleware:', dbErr.message);
        // Do NOT return 401 on DB connection errors, return 503 so client doesn't wipe auth state!
        return res.status(503).json({
          success: false,
          message: 'Database connection warming up. Please retry.',
        });
      }

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Not authorized: User belonging to this token no longer exists',
        });
      }

      req.user = user;
      return next();
    } catch (error) {
      console.error('Auth Middleware General Error:', error.message);
      return res.status(500).json({
        success: false,
        message: 'Authentication service error',
        error: error.message,
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized: No Bearer token provided in header',
    });
  }
};

module.exports = { protect };
