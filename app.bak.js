var express = require('express');

var app = express();

var port = process.env.PORT || 5000;

var cats = ['Aremid', 'Zellouisa', 'Mr. Featherbottom', 'Buster', 'Lucille', 'Desmond'];
var dogs = ['Herman', 'Moksha']; : dogs};

app.use(express.static('public'));
app.set('views', './src/views');

var handlebars = require('express-handlebars');
app.engine('.hbs', handlebars({extname: '.hbs'}));
app.set('view engine', 'ejs');
//app.set('view engine', 'jade');
//app.set('view engine', '.hbs');

app.get('/', function (req, res) {
//    res.render('index', {title: 'Hello from render',list: ['a','b']});
    res.render('index', {title: 'These are my pets', pets, list: ['a','b']});

});

app.get('/books', function (req, res) {
    res.send('Hello Books');
});

app.listen(port, function (err) {
    console.log('running server on port ' + port);
});