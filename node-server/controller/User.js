const router = require('express').Router();
const jwt = require('jsonwebtoken');
const profileModel = require('../model/profileModel');



router.get('/profile', async (req, res) => {
    let userToken = req.header('userToken');
    let passportSession = req.session.passport;
    if (!userToken && !passportSession) {
        return res.status(403).json('UnAuthorised Request')
    }
    let useremail ='';
    if (userToken) {
        useremail = jwt.verify(userToken, 'SECRET_KEY').email;
        
    } else if (passportSession) {
        useremail = passportSession.user.email
    }

    const user = await profileModel.findOne({email: useremail})
    res.status(200).json(user)
})

module.exports = router