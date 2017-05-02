let express = require('express');
let path = require('path');
let router = express.Router();

router.get('/',
    function(req, res) {
        res.sendFile(path.resolve('./public/app/index.html'));
    });

router.get('/userdata',
    function(req, res) {
        let userData = {
            "user" : req.user
        };
        res.send(userData);
    });

module.exports = {
    router: router
};
