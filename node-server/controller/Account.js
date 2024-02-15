const router = require('express').Router();
const jwt = require('jsonwebtoken');
const profileModel = require('../model/profileModel');


router.post('/register', async (req, res) => {
    const { name, email, password } = req.body

    const isExist = await profileModel.findOne({ email: email });
    if (isExist) {
        return res.status(208).json('user already exist');
    }
    let newProfile = new profileModel({ name, email, password });
    await newProfile.save()
    res.status(200).json(newProfile)
})

router.post('/login', async (req, res) => {

    var { email, password, rememberMe } = req.body;
    const user = await profileModel.findOne({ email: email });
    if (!user) {
        return res.status(204).json('user not found');
    } else if (user && user.password !== password) {
        return res.status(404).json('incorrct password');
    }

    let token = ''
    if (rememberMe) {
        token = jwt.sign({ email }, 'SECRET_KEY')
        res.cookie('user', token, {
            secure: true,
            maxAge: 1 * 24 * 60 * 60 * 1000,
            httpOnly: false
        })
    }
    res.status(200).json(user)
})

router.get('/logout', (req, res) => {

    let userToken = req.header('userToken');
    let passportSession = req.session.passport;
    if (!userToken && !passportSession) {
        return res.status(404).json('UnAuthorised Request')
    }
    if (userToken) {
        res.clearCookie('user', {
            httpOnly: false,
            secure: true,
            sameSite: 'none'
        })
        res.status(200).json('user logged out');
    } else if (passportSession) {
        req.session.destroy(function (err) {
            if (!err) {
                res.clearCookie('connect.sid', { path: '/' }).json('user logged out');
            }
        });
    }
})

module.exports = router;