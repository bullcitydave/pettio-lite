var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var flickrService = require('../services/flickrService.js');

var petController = function (flickrService, nav) {
    var middleware = function (req, res, next) {
//        if (!req.user) {
//        res.redirect('/');
//        }
        next();
    };
    var getIndex = function (req, res) {
        var url =
            'mongodb://localhost:27017/local';
        mongodb.connect(url, function (err, db) {
            var collection = db.collection('pets');
            collection.find({}).toArray(
                function (err, results) {
                    res.render('petListView', {
                        title: 'My Pets',
                        nav: nav,
                        pets: results
                    });
                }
            );
        });

    };
    
    var getById = function (req, res) {
        var id = new objectId(req.params.id);
        var url =
            'mongodb://localhost:27017/local';

        mongodb.connect(url, function (err, db) {
            var collection = db.collection('pets');

            collection.findOne({
                    _id: id
                },
                function (err, results) {
                    if (results.petId) {
                        petService
                            .getpetById(results.petId,
                                function (err, pet) {
                                    results.pet = pet;
                                    res.render('petView', {
                                        title: 'Pet',
                                        nav: nav,
                                        pet: results
                                    });
                                });
                    } else {
                        res.render('petView', {
                            title: 'Pets',
                            nav: nav,
                            pet: results
                        });
                    }
                }

            );

        });

    };


    var getPhotosByTag = function (req, res) {
//        var tag = new objectId(req.params.tag);
        var id = new objectId(req.params.id);
        var url =
            'mongodb://localhost:27017/local';

        mongodb.connect(url, function (err, db) {
            var collection = db.collection('pets');

            collection.findOne({
                    _id: id
                },
                function (err, results) {
                    flickrService.getPhotosByTag(results,
                         function(err, pet) {
                            res.render('petView', {
                            title: 'pets',
                            nav: nav,
                            pet: results
                        });
                    });
                }
//                    console.log('results ' + results);
//                    if (results.flickr.tag) {
//                        flickrService
//                            .getPhotosByTag(results.flickr.tag,
//                                function (err, pet) {
//                                    results.pet = pet;
//                                    res.render('petView', {
//                                        title: 'pets',
//                                        nav: nav,
//                                        pet: results
//                                    });
//                                });
//                    } 
//                
//                
//                else {
//                        res.render('petView', {
//                            title: 'pets',
//                            nav: nav,
//                            pet: results
//                        });
//                    }
//                }

            );

        });

    };

    return {
        getIndex: getIndex,
        getById: getById,
        getPhotosByTag: getPhotosByTag,
        middleware: middleware
    };
};

module.exports = petController;