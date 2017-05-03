let express = require('express');
let passport = require('passport');
let Strategy = require('passport-twitter').Strategy;
let ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
let router = express.Router();
let config = require('../config');

passport.use(new Strategy({
    consumerKey: config.twitter.consumerKey,
    consumerSecret: config.twitter.consumerSecret,
    callbackURL: '/login/twitter/callback'
}, function(token, tokenSecret, profile, callback) {
    let User = require('./user').model;
    User.find({
        twitterUserId: profile.id
    }, function(err, user) {
        if (user.length == 0) {
            let newUser = new User({
                twitterUserId: profile.id,
                displayName: profile.displayName,
                username: profile.username,
                image: profile.photos.length > 0 ? profile.photos[0].value : null
            });

            newUser.save(function(err, user) {
                return callback(err, profile);
            });
        } else {
            return callback(null, profile);
        }
    });
}));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    let User = require('./user').model;
    User.findOne({
        twitterUserId: id
    }, function(err, user) {
        done(err, user);
    });
});

router.use(require('body-parser').json());
router.use(require('morgan')('combined'));
router.use(require('cookie-parser')());
router.use(require('body-parser').urlencoded({
    extended: true
}));
router.use(require('express-session')({
    secret: config.express.sessionSecret,
    maxAge: 360 * 5,
    resave: true,
    saveUninitialized: true
}));

router.use(passport.initialize());
router.use(passport.session());

router.get('/login', function(req, res) {
    let path = require('path');
    res.sendFile(path.resolve('./public/app/login.html'));
});

router.get('/login/twitter', passport.authenticate('twitter'));

router.get('/login/twitter/callback',
    passport.authenticate('twitter', {
        successRedirect: '/',
        failureRedirect: '/login'
    }));

router.get('/login/exit', function(req, res) {
    req.logOut();
    res.redirect("/");
});

module.exports = {
    router: router
};
