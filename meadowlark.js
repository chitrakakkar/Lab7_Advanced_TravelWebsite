var express = require('express');
var app = express();
// array of fortune cookies
var fortunes = ["Conquer your fears or they will conquer you",
    "Rivers need springs",
    "DO not fear what you don't know",
    "ypu will have a pleasant surprise",
    "Whenever possible , keep it simple"];
//set up handlebars view engine
var handlebars = require('express-handlebars').
        create({defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');


app.set('port', process.env.PORT || 3000);



app.listen(app.get('port'), function ()
{
    console.log('Express started on http://localhost:' + app.get('port') + ';press CTRl-C to terminate.');

});


app.get('/', function (req, res)
{
    res.render('home');

});

app.get('/about', function (req,res)
{
   var randomFortune= fortunes[Math.floor(Math.random()*fortunes.length)];
    res.render('about', {fortune:randomFortune});

});
//adding static middle ware for handling requests
app.use(express.static(__dirname + '/public'));
// custom 404 page
app.use(function (req,res)
{
    res.status(404);
    res.render('404');


});

//custom 500 page

app.use(function (err,req,res, next)
{
    console.error(err.stack);
    res.status(500);
    res.render('500');

});
// custom 404 page
app.use(function (req,res, next)
{
    res.type('text/plain');
    res.status(404);
    res.send('404-NOT FOUND');

});








