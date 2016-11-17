var express = require('express');
var _ = require('underscore');
var bcrypt = require('bcrypt');

var auth = require('../utils/auth');
var validations = require('../utils/validations');
var constants = require('../utils/constants');
var Position = require('../models/position');

var router = express.Router();

router.use(auth.authenticate);
router.use(auth.authorize);


// endpoints

// get all positions
router.get('/', function (req, res) {

  var finish = function (err, rows, fields) {
    if (err) {
      res.status(500).json({message: 'Error executing request.'});
    }
    else {
      res.status(200).json({positions: rows});
    }
  };

  Position.findAll(finish);

});

module.exports = router;
