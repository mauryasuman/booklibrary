/**
 * Authentication Routes
 * Routes for user registration and login
 */

const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

/**
 * POST /api/auth/register
 * Register a new user
 * Body: { name, email, password, confirmPassword }
 */
router.post('/register', register);

/**
 * POST /api/auth/login
 * Login a user
 * Body: { email, password }
 */
router.post('/login', login);

module.exports = router;
