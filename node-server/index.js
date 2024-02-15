const express = require('express');
const server = express();
const mongoose = require('mongoose');
require('dotenv').config()
const cors = require('cors')
const session = require('express-session');
const passport = require('passport')
const googleStrategy = require('./passport/googleStrategy')
const linkedinStrategy = require('./passport/linkedinStrategy')

// model schema needs to declare before connection
require('./model/profileModel')

// passport strategy
googleStrategy(passport)
linkedinStrategy(passport)

// Mongo DB Atlas cconnection
mongoose.connect(process.env.DATABASE).then(() => {
    console.log("connection successfull")
}).catch((err) => console.log(`no connection, error: ${err}`));


server.use(express.json())
server.use(cors({
    credentials: true,
    origin: true
}))
server.use(session({
    secret: 'jbdiauedhiuqdhwoadba',
    saveUninitialized: false,

}))

// passport setup 
server.use(passport.initialize());
server.use(passport.session());

//router middlewares
server.use(require('./controller/Home'))
server.use(require('./controller/Account'))
server.use(require('./controller/PassportAuth'))
server.use(require('./controller/User'))


server.listen('8000', () => {
    console.log('server running on 8000');
})