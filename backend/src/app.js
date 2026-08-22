const express = require('express');
const cors = require('cors');
const passport = require('passport');
const config = require('./config');
const { errorHandler, notFound } = require('./middleware/errorHandler');

require('./config/passport').configurePassport();

const app = express();

// Allowed browser origins for local development.
// Primary frontend origin is http://localhost:3000 (enforced via Vite strictPort).
// No wildcard: Authorization/JWT is involved.
const allowedOrigins = [
  config.frontendUrl,
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3002',
].filter(Boolean);

// Middleware order: CORS -> body parsers -> passport -> routes
app.use(cors({
  origin(origin, callback) {
    // Requests without an Origin (curl / server-to-server / same-origin) pass through.
    // Disallowed browser origins get NO Access-Control-Allow-Origin header,
    // but do NOT throw - throwing here turns preflights into HTTP 500.
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(null, false);
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

// Routes
app.use('/api', require('./routes/index'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/dashboard', require('./routes/dashboard'));
app.use('/api/trips', require('./routes/trips'));
app.use('/api/destinations', require('./routes/cities'));
app.use('/api/activities', require('./routes/activities'));
app.use('/api/itinerary', require('./routes/itinerary'));
app.use('/api/budget', require('./routes/budget'));
app.use('/api/sharing', require('./routes/sharing'));

// 404 handler
app.use(notFound);

// Error handler
app.use(errorHandler);

module.exports = app;
