/**
 * Authentication Middleware
 * Protects routes by verifying JWT tokens
 */

const jwt = require('jsonwebtoken');

// Middleware to verify JWT token and protect routes
const authMiddleware = (req, res, next) => {
  try {
    // Get token from Authorization header
    const token = req.headers.authorization?.split(' ')[1];

    // Check if token exists
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided. Access denied.',
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user data to request object
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
      error: error.message,
    });
  }
};

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
  // First run auth middleware logic
  authMiddleware(req, res, () => {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin privileges required.',
      });
    }
    next();
  });
};

module.exports = { authMiddleware, isAdmin };
