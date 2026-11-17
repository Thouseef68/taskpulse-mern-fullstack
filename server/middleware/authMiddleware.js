const jwt = require('jsonwebtoken');
const { getUserModel } = require('../models/dataStore');

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

      // Verify token
      const secret = process.env.JWT_SECRET || 'taskpulse_secure_jwt_secret_key_2026';
      const decoded = jwt.verify(token, secret);

      // Fetch user without password using dynamic model
      const User = getUserModel();
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Not authorized: User belonging to this token no longer exists',
        });
      }

      return next();
    } catch (error) {
      console.error('JWT Verification Error:', error.message);
      return res.status(401).json({
        success: false,
        message: 'Not authorized: Invalid or expired token',
        error: error.message,
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized: No Bearer token provided',
    });
  }
};

module.exports = { protect };
