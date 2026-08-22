const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
const { PrismaClient } = require('@prisma/client');
const passport = require('passport');
const config = require('./index');

const prisma = new PrismaClient();

const configurePassport = () => {
  if (!config.google.clientId || !config.google.clientSecret) {
    return;
  }

  passport.use(
    new GoogleStrategy(
      {
        clientID: config.google.clientId,
        clientSecret: config.google.clientSecret,
        callbackURL: config.google.callbackUrl,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;

          if (!email) {
            return done(new Error('No email associated with this Google account.'), null);
          }

          const normalizedEmail = email.trim().toLowerCase();

          let user = await prisma.user.findUnique({ where: { googleId: profile.id } });

          const avatarUrl = profile.photos?.[0]?.value ?? null;

          if (!user) {
            const existingByEmail = await prisma.user.findUnique({ where: { email: normalizedEmail } });

            if (existingByEmail) {
              user = await prisma.user.update({
                where: { id: existingByEmail.id },
                data: {
                  googleId: profile.id,
                  avatar: existingByEmail.avatar || avatarUrl,
                },
              });
            } else {
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
          }

          return done(null, user);
        } catch (error) {
          return done(error, null);
        }
      }
    )
  );
};

module.exports = { configurePassport };
