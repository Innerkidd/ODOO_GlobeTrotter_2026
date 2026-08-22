const authService = require('../services/authService');
const { generateToken } = require('../utils/auth');
const config = require('../config');

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const result = await authService.registerUser({ name, email, password });

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await authService.loginUser({ email, password });

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getMe = async (req, res, next) => {
  try {
    const user = await authService.getUserById(req.user.id);

    res.status(200).json({
      success: true,
      message: 'Current user fetched successfully',
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Logout successful. Please remove the token on the client side.',
  });
};

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const result = await authService.requestPasswordReset({ email });

    res.status(200).json({
      success: true,
      message: result.message,
      ...(result.devResetToken ? { data: { devResetToken: result.devResetToken } } : {}),
    });
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body;
    await authService.resetPassword({ token, password });

    res.status(200).json({
      success: true,
      message: 'Password has been reset successfully. You can now log in with your new password.',
    });
  } catch (error) {
    next(error);
  }
};

const googleCallback = (req, res) => {
  console.log('[OAuth] googleCallback controller reached, user:', req.user?.id);
  const token = generateToken({ id: req.user.id, email: req.user.email });

  console.log('[OAuth] JWT generated for user:', req.user.id);
  const redirectUrl = `${config.frontendUrl}/auth/google/success#token=${token}`;
  console.log('[OAuth] Redirecting to frontend:', redirectUrl.replace(/token=.*/, 'token=REDACTED'));

  res.redirect(redirectUrl);
};

module.exports = {
  register,
  login,
  getMe,
  logout,
  forgotPassword,
  resetPassword,
  googleCallback,
};
