var passport = require('passport'),
    
    mongodb = require('mongodb').MongoClient,

    LocalStrategy = require('passport-local').Strategy;

module.exports = function() {
    passport.use(new LocalStrategy({
        usernameField: 'userName',
        passwordField: 'password'
    },
    function(username, password, done) {
//        var url = 'mongodb://localhost:27017/local';
        var url = 'mongodb://pettio-lite:pettio-lite@ds115752.mlab.com:15752/heroku_8kbdmjms';
        mongodb.connect(url, function(err, db) {
            var collection = db.collection('users');
            collection.findOne({username : username},
              function (err, results) {
                if(results.password === password) {
                    var user = results;
                    done (null,user);
                }
                else {
                    done (null,false, {message : 'Bad Password!!!!'});
                }
            });
        });
//        var user = {
//            username: username,
//            password: password
//        };
//        done(null, user);
//    }));
    }));
};
                                   