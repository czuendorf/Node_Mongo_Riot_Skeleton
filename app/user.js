let database = require('./database');
let mongoose = require('mongoose');
let express = require('express');
let router = express.Router();

let userSchema = mongoose.Schema({
    displayName: {
        type: String,
        required: true
    },
    twitterUserId: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    image: {
        type: String
    }
});

let User = mongoose.model('User', userSchema);
database.addCrudMethods(router, User);

module.exports = {
    router: router,
    model: User
};
