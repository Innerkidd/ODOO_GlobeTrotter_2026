const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
const { PrismaClient } = require('@prisma/client');
const passport = require('passport');
const config = require('./index');

const prisma = new PrismaClient();

const configurePassport = () => {
  if (!config.google.clientId || !config.google.clientSecret) {
    console.log('[OAuth] Google OAuth not configured - missing clientId or clientSecret');
    return;
  }

  console.log('[OAuth] GoogleStrategy configured with callbackURL:', config.google.callbackUrl);

  passport.use(
    new GoogleStrategy(
      {
        clientID: config.google.clientId,
        clientSecret: config.google.clientSecret,
        callbackURL: config.google.callbackUrl,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log('[OAuth] Google profile received, id:', profile.id, 'email:', profile.emails?.[0]?.value);

          const email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;

          if (!email) {
            console.log('[OAuth] No email in Google profile');
            return done(new Error('No email associated with this Google account.'), null);
          }

          const normalizedEmail = email.trim().toLowerCase();

          let user = await prisma.user.findUnique({ where: { googleId: profile.id } });

          const avatarUrl = profile.photos?.[0]?.value ?? null;

          if (!user) {
            const existingByEmail = await prisma.user.findUnique({ where: { email: normalizedEmail } });

            if (existingByEmail) {
              console.log('[OAuth] Linking Google account to existing user by email');
              user = await prisma.user.update({
                where: { id: existingByEmail.id },
                data: {
                  googleId: profile.id,
                  avatar: existingByEmail.avatar || avatarUrl,
                },
              });
            } else {
              console.log('[OAuth] Creating new Google user');
              user = await prisma.user.create({
                data: {
                  name: profile.displayName || normalizedEmail.split('@')[0],
                  email: normalizedEmail,
                  googleId: profile.id,
                  avatar: avatarUrl,
                  provider: 'google',
                },
              });
            }
          } else {
            console.log('[OAuth] User found by googleId');
          }

          console.log('[OAuth] User found/created, id:', user.id);
          return done(null, user);
        } catch (error) {
          console.log('[OAuth] Error in verify callback:', error.message);
          return done(error, null);
        }
      }
    )
  );
};

module.exports = { configurePassport };
