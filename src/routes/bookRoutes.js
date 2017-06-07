//**8***//var express = require('express');
//var bookRouter = express.Router();
//var mongodb = require('mongodb').MongoClient;
//var objectId = require('mongodb').ObjectID;
//


var express = require('express');
var bookRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;

//var router = function (nav) {
//
//    bookRouter.use(function (req, res, next) {
//        if (!req.user) {
//            res.redirect('/');
//        }
//        next();
//    });
//    bookRouter.route('/')
//        .get(function (req, res) {
//            var url =
//                'mongodb://localhost:27017/local';
//
//            mongodb.connect(url, function (err, db) {
//                var collection = db.collection('pets');
//
//                collection.find({}).toArray(
//                    function (err, results) {
//                        res.render('bookListView', {
//                            title: 'Pets',
//                            nav: nav,
//                            books: results
//                        });
//                    }
//                );
//            });
//
//        });
//
//    bookRouter.route('/:id')
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
//                        res.render('bookView', {
//                            title: 'Pets',
//                            nav: nav,
//                            book: results
//                        });
//
//                    }
//                );
//
//            });
//
//        });
//
//    return bookRouter;
//};

var router = function (nav) {
    var flickrService =
        require('../services/flickrService')();    
    var goodreadsService =
        require('../services/goodreadsService')();
    var bookController =
        require('../controllers/bookController')(goodreadsService, nav);
    bookRouter.use(bookController.middleware);
    bookRouter.route('/')
        .get(bookController.getIndex);

    bookRouter.route('/:id')
        .get(function (req, res) {
            var id = new objectId(req.params.id);
            var url =
                'mongodb://localhost:27017/local';

            mongodb.connect(url, function (err, db) {
                var collection = db.collection('pets');

                collection.findOne({
                        _id: id
                    },
                    function (err, results) {
                        res.render('bookView', {
                            title: 'Pets',
                            nav: nav,
                            book: results
                        });

                    }
                );

            });

        });
    
//    bookRouter.route('/:tag')
//        .get(bookController.getPhotosByTag);

    return bookRouter;
};
module.exports = router;