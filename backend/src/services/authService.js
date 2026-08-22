const crypto = require('crypto');
const { PrismaClient } = require('@prisma/client');
const { hashPassword, comparePassword, generateToken } = require('../utils/auth');
const config = require('../config');

const prisma = new PrismaClient();

const SAFE_USER_SELECT = {
  id: true,
  name: true,
  email: true,
  avatar: true,
  provider: true,
  createdAt: true,
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const normalizeEmail = (email) => {
  return String(email || '').trim().toLowerCase();
};

const httpError = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const validateRegistration = ({ name, email, password }) => {
  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    throw httpError(400, 'Name is required and must be at least 2 characters long.');
  }
  if (!email || !EMAIL_REGEX.test(normalizeEmail(email))) {
    throw httpError(400, 'A valid email address is required.');
  }
  if (!password || typeof password !== 'string' || password.length < 6) {
    throw httpError(400, 'Password is required and must be at least 6 characters long.');
  }
};

const validateLogin = ({ email, password }) => {
  if (!email || !EMAIL_REGEX.test(normalizeEmail(email))) {
    throw httpError(400, 'A valid email address is required.');
  }
  if (!password) {
    throw httpError(400, 'Password is required.');
  }
};

const registerUser = async ({ name, email, password }) => {
  validateRegistration({ name, email, password });

  const normalizedEmail = normalizeEmail(email);

  const existingUser = await prisma.user.findUnique({ where: { email: normalizedEmail } });
  if (existingUser) {
    throw httpError(409, 'An account with this email already exists.');
  }

  const hashedPassword = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      provider: 'local',
    },
    select: SAFE_USER_SELECT,
  });

  const token = generateToken({ id: user.id, email: user.email });
  return { user, token };
};

const loginUser = async ({ email, password }) => {
  validateLogin({ email, password });

  const normalizedEmail = normalizeEmail(email);

  const user = await prisma.user.findUnique({ where: { email: normalizedEmail } });

  if (!user || !user.password) {
    throw httpError(401, 'Invalid credentials.');
  }

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw httpError(401, 'Invalid credentials.');
  }

  const safeUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    provider: user.provider,
    createdAt: user.createdAt,
  };

  const token = generateToken({ id: user.id, email: user.email });
  return { user: safeUser, token };
};

const getUserById = async (id) => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: SAFE_USER_SELECT,
  });

  if (!user) {
    throw httpError(404, 'User not found.');
  }

  return user;
};

const hashResetToken = (token) => {
  return crypto.createHash('sha256').update(token).digest('hex');
};

const requestPasswordReset = async ({ email }) => {
  if (!email || !EMAIL_REGEX.test(normalizeEmail(email))) {
    throw httpError(400, 'A valid email address is required.');
  }

  const normalizedEmail = normalizeEmail(email);
  const user = await prisma.user.findUnique({ where: { email: normalizedEmail } });

  let devResetToken;
  if (user && user.password) {
    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = hashResetToken(resetToken);
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000);

    await prisma.user.update({
      where: { id: user.id },
      data: { resetPasswordToken: hashedToken, resetPasswordExpires: expiresAt },
    });

    if (config.nodeEnv !== 'production') {
      devResetToken = resetToken;
    }
  }

  return {
    message: 'If an account with that email exists, a password reset link has been sent.',
    ...(devResetToken ? { devResetToken } : {}),
  };
};

const resetPassword = async ({ token, password }) => {
  if (!token || typeof token !== 'string') {
    throw httpError(400, 'Reset token is required.');
  }
  if (!password || typeof password !== 'string' || password.length < 6) {
    throw httpError(400, 'Password is required and must be at least 6 characters long.');
  }

  const hashedToken = hashResetToken(token);

  const user = await prisma.user.findFirst({
    where: { resetPasswordToken: hashedToken },
  });

  if (!user || !user.resetPasswordExpires || user.resetPasswordExpires < new Date()) {
    throw httpError(400, 'Password reset token is invalid or has expired.');
  }

  const hashedPassword = await hashPassword(password);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
      resetPasswordToken: null,
      resetPasswordExpires: null,
    },
  });
};

module.exports = {
  registerUser,
  loginUser,
  getUserById,
  requestPasswordReset,
  resetPassword,
};
