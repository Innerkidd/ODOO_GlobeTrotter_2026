const express = require('express');
const cors = require('cors');
const passport = require('passport');
const config = require('./config');
const { errorHandler, notFound } = require('./middleware/errorHandler');

require('./config/passport').configurePassport();

const app = express();

// Middleware
app.use(passport.initialize());
app.use(cors({
  origin: config.frontendUrl,
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', require('./routes/index'));
app.use('/api/auth', require('./routes/auth'));
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
