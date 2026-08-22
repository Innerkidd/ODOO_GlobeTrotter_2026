const express = require('express');
const passport = require('passport');
const { authenticate } = require('../middleware/auth');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authenticate, authController.logout);
router.get('/me', authenticate, authController.getMe);

router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  router.get(
    '/google',
    passport.authenticate('google', { session: false, scope: ['profile', 'email'] })
  );

  router.get(
    '/google/callback',
    passport.authenticate('google', {
      session: false,
      failureRedirect: '/api/auth/google/failure',
    }),
    authController.googleCallback
  );

  router.get('/google/failure', (_req, res) => {
    res.status(401).json({
      success: false,
      message: 'Google authentication failed.',
    });
  });
} else {
  router.get(['/google', '/google/callback'], (_req, res) => {
    res.status(503).json({
      success: false,
      message: 'Google OAuth is not configured on this server.',
    });
  });
}

module.exports = router;
