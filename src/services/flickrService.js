var http = require('http');
var xml2js = require('xml2js');
var parser = xml2js.Parser({explicitArray: false});

var flickrService = function () {

    var getPhotosByTag = function (tag, cb) {
        cb(null, {description: 'Our descriotion'});
//        var options = {
//            host: 'api.flickr.com/services/rest',
//            method: 'flickr.photos.search',
//            apiKey: 'f18dd23cf0f189f40c9b280346ec76e5'
//        };
//        var path = options.host + '/?method=' + options.method + '&api_key=' + options.apiKey + '&tags=' + tag;
//        var callback = function(response) {
//            var str = '';
//            response.on('data', function(chunk) {
//                str += chunk;
//            });
//            response.on('end', function() {
//                console.log(str);
//                parser.parseString(str,
//                    function(err, result) {
//                        cb(null,
//                           result);
//                    });
//            });
//        };
//
//        http.request(path, callback).end();
    };

    return {
        getPhotosByTag: getPhotosByTag
    };
};

module.exports = flickrService;