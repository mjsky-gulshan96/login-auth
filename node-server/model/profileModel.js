const mongoose = require('mongoose')

const {Schema} = mongoose;

const profileSchema = new Schema({
    name: String,
    email: String,
    password: String,
    image: String
});

// create model to work with the schema

const userProfile = mongoose.model('profile', profileSchema);

module.exports = userProfile;