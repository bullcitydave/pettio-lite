var express = require('express');

var adminRouter = express.Router();

var mongodb = require('mongodb').MongoClient;

var pets = [{ type: 'cat', name: 'Aremid', birthday: '1996-02-01' },
{ type: 'cat', name: 'Zellouisa', birthday: '1997-09-01' },
{ type: 'dog', name: 'Herman', birthday: '2000-09-10' },
{ type: 'dog', name: 'Moksha', birthday: '2010-04-04' },
{ type: 'cat', name: 'Mr. Featherbottom', birthday: '2008-05-01' },
{ type: 'cat', name: 'Buster', birthday: '2013-05-10' },
{ type: 'cat', name: 'Lucille', birthday: '2012-07-10' },
{ type: 'cat', name: 'Desmond', birthday: '2016-03-05' }
];


var router = function(nav){
    adminRouter.route('/addBooks')
        .get(function (req, res) {
            var url = 'mongodb://localhost:27017/local';
            mongodb.connect(url, function(err, db) {
                var collection = db.collection('pets');
//                collection.insertMany(dogs, function(err, results1) {
//                    results = results1;
//                });                
                collection.insertMany(pets, function(err, results) {
                    res.send(results);
                    db.close();
                });
//                collection.insertMany(cats, function(err, results2) {
//                    results+=results2;
//                    res.send(results);
//                    db.close();
//                });
            });
    });
    return adminRouter;
};

module.exports = router;