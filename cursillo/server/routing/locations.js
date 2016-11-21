var express = require('express');
var _ = require('underscore');
var bcrypt = require('bcrypt');

var auth = require('../utils/auth');
var validations = require('../utils/validations');
var constants = require('../utils/constants');
var Location = require('../models/location');

var router = express.Router();

router.use(auth.authenticate);
router.use(auth.authorize);


// endpoints

// get all locations
router.get('/', function (req, res) {

  var finish = function (err, rows, fields) {
    if (err) {
      res.status(500).json({message: 'Error executing request.'});
    }
    else {
      res.status(200).json({locations: rows});
    }
  };

  Location.findAll(finish);

});

// create a new location
router.post('/', function (req, res) {
  var location = Location.schema(req.body);


  var finish = function (err, result) {
    if (err) {
      res.status(500).json({message: 'Error executing request.'});
    }
    else {
      location.id = result.insertId;
      res.status(200).json(location);
    }
  };

  Location.create(location, finish);

});

// get location by id
router.get('/:locationId', function (req, res) {
  var location, locationId = req.params.locationId;

  var finish = function (err, rows, fields) {
    if (rows.length === 0) {
      res.status(404).json({message: 'Location not found.'});
    }
    else {
      location = rows && rows[0] || {};
    }

    res.status(200).json(location);
  };

  if (validations.validateNonEmpty(locationId) && validations.validateNumeric(locationId)) {
    Location.findById(locationId, finish);
  }
  else {
    res.status(404).json({message: 'Invalid ID provided.'});
  }
});

// update location by id
router.put('/:locationId', function (req, res) {
  var location, locationId = req.params.locationId;

  var finish = function (err, rows, fields) {
    if (err) {
      res.status(400).json({message: 'Bad request.'});
    }
    else if (rows.length === 0) {
      res.status(404).json({message: 'Location not found.'});
    }
    else {
      location = rows && rows[0] || {};
    }

    res.status(200).json(Location.schema(req.body));
  };

  if (validations.validateNonEmpty(locationId) && validations.validateNumeric(locationId)) {

    Location.updateById(locationId, req.body, finish);
  }
  else {
    res.status(404).json({message: 'Invalid ID provided.'});
  }

});

// delete location by id
router.delete('/:locationId', function (req, res) {
  var location, locationId = req.params.locationId;

  var finish = function (err, rows, fields) {
    if (rows.length === 0) {
      res.status(404).json({message: 'Location not found.'});
    }
    else {
      location = rows && rows[0] || {};
    }

    res.status(200).json({message: 'Successfully deleted.'});
  };

  if (validations.validateNonEmpty(locationId) && validations.validateNumeric(locationId)) {
    Location.deleteById(locationId, finish);
  }
  else {
    res.status(404).json({message: 'Invalid ID provided.'});
  }
});

module.exports = router;
