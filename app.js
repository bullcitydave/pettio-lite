var express = require('express');

var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');


var port = process.env.PORT || 5000;
var nav = [{
    Link: '/Pets',
    Text: 'Pets'
    }
          ];
var petRouter = require('./src/routes/petRoutes')(nav);
var adminRouter = require('./src/routes/adminRoutes')(nav);
var authRouter = require('./src/routes/authRoutes')(nav);

var env = process.env.NODE_ENV || 'development';
var config = require('./src/config/config')[env];
var db = config.database;

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({secret : 'pets'}));
require('./src/config/passport')(app);

app.set('views', './src/views');

app.set('view engine', 'ejs');


app.use('/Pets', petRouter);
app.use('/Admin', adminRouter);
app.use('/Auth', authRouter);
app.use('/', petRouter);
//app.get('/', function (req, res) {
//    res.render('petListView', {
//        title: 'Hello from render',
//        nav: [{
//            Link: '/Pets',
//            Text: 'Pets'
//        }
////              , {
////            Link: '/Authors',
////            Text: 'Author'
////        }
//             ]
//    });
//});

app.get('/pets', function (req, res) {
    res.send('Hello Pets');
});

app.listen(port, function (err) {
    console.log('running server on port ' + port);
});