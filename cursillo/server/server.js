var express = require('express');

var path = require('path');
var bodyParser = require('body-parser');
var app = express();

var accounts = require('./routing/accounts');
var applicationInfos = require('./routing/applicationInfos');
var contacts = require('./routing/contacts');
var cursillos = require('./routing/cursillos');
var locations = require('./routing/locations');
var parish = require('./routing/parish');
var people = require('./routing/people');
var positions = require('./routing/positions');
var roles = require('./routing/roles');
var talkLinks = require('./routing/talkLinks');
var talks = require('./routing/talks');
var teams = require('./routing/teams');
var weekendPositions = require('./routing/weekendPositions');
var weekends = require('./routing/weekends');


var port = 8080;

// app.use(express.static(path.join(__dirname, '/../client')));

/* GET home page for client side app */

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, '/../client')));
app.use(express.static(path.join(__dirname, '/../swagger/dist')));

app.get('/', function (req, res) {
  res.status(200).sendFile(path.join(__dirname+'/../client/index.html'));
});
app.get('/explorer/', function (req, res) {

  res.status(200).sendFile(path.join(__dirname+'/../swagger/dist/index.html'));
});

app.use('/api/accounts', accounts);
app.use('/api/contacts', contacts);
app.use('/api/cursillos', cursillos);
app.use('/api/locations', locations);
app.use('/api/parishes', parish);
app.use('/api/people', people);
app.use('/api/positions', positions);
app.use('/api/roles', roles);
app.use('/api/talkLinks', talkLinks);
app.use('/api/talks', talks);
app.use('/api/teams', teams);
app.use('/api/weekendPositions', weekendPositions);
app.use('/api/weekends', weekends);
app.use('/api/applications', applicationInfos);


app.listen(port, function () {
  console.log('listening on port ' + port);
});

module.exports = app;
