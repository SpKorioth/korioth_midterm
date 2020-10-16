//require express
var express =require('express');
//require node-fetch
var fetch = require('node-fetch');

//create express object, call express
var app = express();

//get port information
const port = process.env.PORT || 3000;

//tell application to use EJS for templates
app.set('view engine', 'ejs');

//make styles public
app.use(express.static("public"));

//get home page /
/*
app.get('/',function(req, res){
    //return something to home page
    res.render('index');
})
*/
//get random comic page /random
/*
app.get('/random', function(req, res){
    res.render('random')
})
*/

//get home page /
app.get('/', function(req, res){
    let comicData;
    fetch('http://xkcd.com/info.0.json')
    .then(res => res.json())
    .then(data => {
        res.render('index', {data:data});
    });
})
//get random comic page /random
app.get('/random', function(req, res){
    var randomNumber = Math.floor(Math.random() * 1999) + 1; 
    let comicData;
    fetch('http://xkcd.com/' + randomNumber + '/info.0.json')
    .then(res => res.json())
    .then(data => {
        res.render('random', {data: data});
    });
})

//server setup
app.listen(port, function(){
    console.log('Listening on ' + port)
});