var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
require('dotenv').config()

const linkedinStrategy = (passport) => {

    passport.use(new LinkedInStrategy({
        clientID: process.env.LINKEDIN_KEY,
        clientSecret: process.env.LINKEDIN_SECRET,
        callbackURL: "/auth/linkedin/callback",
        scope: ['r_emailaddress', 'r_liteprofile'],
    }, function (accessToken, refreshToken, profile, done) {
        console.log(profile);
        // asynchronous verification, for effect...
        process.nextTick(function () {
            // To keep the example simple, the user's LinkedIn profile is returned to
            // represent the logged-in user. In a typical application, you would want
            // to associate the LinkedIn account with a user record in your database,
            // and return that user instead.
            return done(null, profile);
        });
    }));

}

module.exports = linkedinStrategy