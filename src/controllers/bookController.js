var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var flickrService = require('../services/flickrService.js');

var bookController = function (flickrService, nav) {
    var middleware = function (req, res, next) {
        //if (!req.user) {
        //res.redirect('/');
        //}
        next();
    };
    var getIndex = function (req, res) {
        var url =
            'mongodb://localhost:27017/local';

        mongodb.connect(url, function (err, db) {
            var collection = db.collection('pets');

            collection.find({}).toArray(
                function (err, results) {
                    res.render('bookListView', {
                        title: 'Books',
                        nav: nav,
                        books: results
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
            var collection = db.collection('books');

            collection.findOne({
                    _id: id
                },
                function (err, results) {
                    if (results.bookId) {
                        bookService
                            .getBookById(results.bookId,
                                function (err, book) {
                                    results.book = book;
                                    res.render('bookView', {
                                        title: 'Books',
                                        nav: nav,
                                        book: results
                                    });
                                });
                    } else {
                        res.render('bookView', {
                            title: 'Books',
                            nav: nav,
                            book: results
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
                                                 function(err, book) {
                                                    res.render('bookView', {
                                                    title: 'Books',
                                                    nav: nav,
                                                    book: results
                                    });
                                                 }
                                                 )
            }
//                    console.log('results ' + results);
//                    if (results.flickr.tag) {
//                        flickrService
//                            .getPhotosByTag(results.flickr.tag,
//                                function (err, book) {
//                                    results.book = book;
//                                    res.render('bookView', {
//                                        title: 'Books',
//                                        nav: nav,
//                                        book: results
//                                    });
//                                });
//                    } 
//                
//                
//                else {
//                        res.render('bookView', {
//                            title: 'Books',
//                            nav: nav,
//                            book: results
//                        });
//                    }
//                }

            );

        });

    };

    return {
        getIndex: getIndex,
//        getById: getById,
        getPhotosByTag: getPhotosByTag,
        middleware: middleware
    };
};

module.exports = bookController;