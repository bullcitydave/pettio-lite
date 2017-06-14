var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var flickrService = require('../services/flickrService.js');
var config = require('../config/config');
var moment = require('moment');

moment.years = function(fromDate, toDate) {
    return moment(fromDate).diff(toDate, 'years');
};


var petController = function (flickrService, nav) {
    var middleware = function (req, res, next) {
//        if (!req.user) {
//        res.redirect('/');
//        }
        req.config = config;
        next();
    };
    var getIndex = function (req, res) {
          var env = process.env.NODE_ENV || 'development';
          console.log('config: ' + req.config[env]);

//        var url =
//            'mongodb://localhost:27017/local';
//        var url = 'mongodb://pettio-lite:pettio-lite@ds115752.mlab.com:15752/heroku_8kbdmjms';

        var db = req.config[env].database;
        console.log('db: ' + db);
//         var url = 'mongodb://' + db.user + ':' + db.pw + '@' + db.host + ':' + db.port + '/' + db.db + '?authSource='  + db.authSource;
         var url = 'mongodb://' + db.host + ':' + db.port + '/' + db.db;
        console.log('url : ' + url);
        mongodb.connect(url, function (err, db) {
            console.log('error ' + err);
            var collection = db.collection('pets');
            collection.find({}).toArray(
                function (err, results) {
                    res.render('petListView', {
                        title: 'My Pets',
                        nav: nav,
                        pets: results,
                        moment: moment
                    });
                }
            );
        });

    };
    
    var getById = function (req, res) {
        var id = new ObjectId(req.params.id);
        var url =
            'mongodb://localhost:27017/local';

        mongodb.connect(url, function (err, db) {
            var collection = db.collection('pets');

            collection.findOne({
                    _id: id
                },
                function (err, results) {
                    if (results.petId) {
                        flickrService
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
        var id = new ObjectId(req.params.id);
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