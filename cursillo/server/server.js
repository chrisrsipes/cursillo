var express = require('express');

var path = require('path');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, '/../client')));

console.log('starting it up');
console.log(path.join(__dirname + '/../client/index.html'));

/* GET home page. */
app.get('/', function(req, res, next) {
    //Path to your main file
    console.log('path to main file');
    console.log(path.join(__dirname + '/../client/index.html'));
    res.status(200).sendFile(path.join(__dirname+'/../client/index.html'));
}, function () {
    console.log('error');
});

app.listen(8080);

module.exports = app;
