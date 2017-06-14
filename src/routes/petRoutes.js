//**8***//var express = require('express');
//var petRouter = express.Router();
//var mongodb = require('mongodb').MongoClient;
//var objectId = require('mongodb').ObjectID;
//


var express = require('express');
var petRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;

//var router = function (nav) {
//
//    petRouter.use(function (req, res, next) {
//        if (!req.user) {
//            res.redirect('/');
//        }
//        next();
//    });
//    petRouter.route('/')
//        .get(function (req, res) {
//            var url =
//                'mongodb://localhost:27017/local';
//
//            mongodb.connect(url, function (err, db) {
//                var collection = db.collection('pets');
//
//                collection.find({}).toArray(
//                    function (err, results) {
//                        res.render('petListView', {
//                            title: 'Pets',
//                            nav: nav,
//                            pets: results
//                        });
//                    }
//                );
//            });
//
//        });
//
//    petRouter.route('/:id')
//        .get(function (req, res) {
//            var id = new objectId(req.params.id);
//            var url =
//                'mongodb://localhost:27017/local';
//
//            mongodb.connect(url, function (err, db) {
//                var collection = db.collection('pets');
//
//                collection.findOne({
//                        _id: id
//                    },
//                    function (err, results) {
//                        res.render('petView', {
//                            title: 'Pets',
//                            nav: nav,
//                            pet: results
//                        });
//
//                    }
//                );
//
//            });
//
//        });
//
//    return petRouter;
//};

var router = function (nav) {
    var petService =
        require('../services/flickrService')();    
    var petController =
        require('../controllers/petController')(petService, nav);
    petRouter.use(petController.middleware);
    petRouter.route('/')
        .get(petController.getIndex);

//    petRouter.route('/:id')
//        .get(function (req, res) {
//            var id = new objectId(req.params.id);
//            var url =
//                'mongodb://localhost:27017/local';
//        var url = 'mongodb://pettio-lite:pettio-lite@ds115752.mlab.com:15752/heroku_8kbdmjms';
//
//            mongodb.connect(url, function (err, db) {
//                var collection = db.collection('pets');
//
//                collection.findOne({
//                        _id: id
//                    },
//                    function (err, results) {
//                        res.render('petView', {
//                            title: 'Pets',
//                            nav: nav,
//                            pet: results
//                        });
//
//                    }
//                );
//
//            });
//
//        });
    
    petRouter.route('/tag/:tag')
        .get(petController.getPhotosByTag);

    return petRouter;
};
module.exports = router;