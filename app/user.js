let mongoose = require('mongoose');

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

module.exports = {
    model: User
};
