const router = require('express').Router()
const passport = require('passport')

// const { googleStrategy } = require('../passport/googleStrategy');

router.get('/auth/google', passport.authenticate('google',
    { scope: ['email', 'profile'] }
));


// call this endpoint from frontend --step1
router.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: 'http://localhost:5173',
        failureRedirect: 'http://localhost:5173/login'
    }));



router.get('/auth/linkedin',
    passport.authenticate('linkedin', { state: ['r_emailaddress', 'r_liteprofile'] }),
    function (req, res) {
        // The request will be redirected to LinkedIn for authentication, so this
        // function will not be called.
    });


router.get('/auth/linkedin/callback', passport.authenticate('linkedin', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

module.exports = router