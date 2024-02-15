const GoogleStrategy = require('passport-google-oauth2').Strategy
require('dotenv').config()
const profileModel = require('../model/profileModel');

const googleStrategy = (passport) => {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_KEY,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
    scope: ['profile', 'email'],
    passReqToCallback: true
  },
    async function (request, accessToken, refreshToken, profile, done) {
      try {
        // console.log(profile);
        const user = await profileModel.findOne({ email: profile.email });
        if (!user) {
          let newProfile = new profileModel({ name: profile.displayName, email: profile.email });
          await newProfile.save();
        }
        return done(null, user)

      } catch (error) {
        return done(error, null)
      }

    }
  ));
  passport.serializeUser((user, done) => {
    done(null, user)
  })
  passport.deserializeUser((user, done) => {
    done(null, user)
  })

}

module.exports = googleStrategy