let self = module.exports = {
    connection: null,

    getDbConnectionString: function () {
        let config = require('../config');
        let connectionString = config.mongodb.username + ":" +
            config.mongodb.password + "@" +
            config.mongodb.host + ':' +
            config.mongodb.port + '/' +
            config.mongodb.database;

        return connectionString;
    },

    addCrudMethods: function (router, ObjectModel) {
        if (!self.connection) {
            let mongoose = require('mongoose');
            self.connection = mongoose.connect(self.getDbConnectionString());
        }

        // GET all
        router.get("/", function (req, res) {
            let filter = {};
            if (req.query) {
                filter = req.query;
            }

            ObjectModel.find(filter, function (err, doc) {
                if (err) {
                    self.handleError(req, res, err);
                    return;
                }
                res.send(doc);
            });
        });

        // GET an object by id
        router.get("/:id", function (req, res) {
            ObjectModel.findById(req.params.id, function (err, doc) {
                if (err) {
                    self.handleError(req, res, err);
                    return;
                }
                res.send(doc);
            });
        });

        // ADD
        router.post("/", function (req, res) {
            let instance = new ObjectModel(req.body);
            instance.save(function (err, doc) {
                if (err) {
                    self.handleError(req, res, err);
                    return;
                }
                res.status(201).send(doc);
            });
        });

        // UPDATE
        router.put("/", function (req, res) {
            let doc = req.body;
            let docId = doc._id;

            if (!docId) {
                res.status(400).send("No object id given.");
                return;
            }

            delete doc._id;

            ObjectModel.findByIdAndUpdate(docId, {
                $set: doc
            }, {
                new: true
            }, function (err, newDoc) {
                if (err) {
                    self.handleError(req, res, err);
                    return;
                }
                res.status(201).send(newDoc);
            });
        });

        // DELETE by id
        router.delete("/:id", function (req, res) {
            ObjectModel.remove({
                "_id": req.params.id
            }, function (err) {
                if (err) {
                    self.handleError(req, res, err);
                    return;
                }
                res.status(204).send();
            });
        });
    },

    /**
     * Handles an error and sends a response to client.
     */
    handleError: function (req, res, err) {
        if (err.errors) {
            res.status(406).send(err.errors);
        } else {
            console.log(err);
            res.status(500).send("Error occurred.");
        }
    }
};
