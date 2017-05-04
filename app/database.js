let self = module.exports = {
    connection: null,

    /**
     * Connects to mongo database
     */
    connect: function() {
        if (!self.connection) {
            let config = require('../config');
            let mongoose = require('mongoose');
            self.connection = mongoose.connect(`${config.mongodb.username}:${config.mongodb.password}@${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.database}`);
        }
    }
};
