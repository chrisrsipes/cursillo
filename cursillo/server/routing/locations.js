var express = require('express');
var _ = require('underscore');
var bcrypt = require('bcrypt');

var auth = require('../utils/auth');
var validations = require('../utils/validations');
var constants = require('../utils/constants');
var Location = require('../models/location');
var Cursillo = require('../models/cursillo');

var router = express.Router();

router.use(auth.authenticate);
router.use(auth.authorize);


// endpoints

// get all locations
router.get('/', function (req, res) {

  var finish = function (err, rows, fields) {
    if (err) {
      console.log('err', err);
      res.status(constants.http.INTERNAL_ERROR.status).json({message: constants.http.INTERNAL_ERROR.message});
    }
    else {
      res.status(constants.http.SUCCESS.status).json(rows);
    }
  };

  Location.findAll(finish);

});

// create a new location
router.post('/', function (req, res) {
  var location = Location.schema(req.body);

  var finish = function (err, result) {
    if (err) {
      console.log('err', err);
      res.status(constants.http.INTERNAL_ERROR.status).json({message: constants.http.INTERNAL_ERROR.message});
    }
    else {
      location.id = result.insertId;
      res.status(constants.http.SUCCESS.status).json(location);
    }
  };

  Location.create(location, finish);

});

// get location by id
router.get('/:locationId', function (req, res) {
  var location, cursillo, locationId = req.params.locationId;

  var finish = function (err, rows, fields) {
    if (err) {
      console.log('err', err);
      res.status(constants.http.INTERNAL_ERROR.status).json({message: constants.http.INTERNAL_ERROR.message});
    }
    else if (rows.length === 0) {
      res.status(constants.http.NO_CONTENT.status).json({message: constants.http.NO_CONTENT.message});
    }
    else {
      location = rows && rows[0] || {};
      res.status(constants.http.SUCCESS.status).json(location);
    }

  };

  if (validations.validateNonEmpty(locationId) && validations.validateNumeric(locationId)) {
    Location.findById(locationId, finish);
  }
  else {
    res.status(constants.http.BAD_REQUEST.status).json({message: constants.http.BAD_REQUEST.message});
  }
});

// update location by id
router.put('/:locationId', function (req, res) {
  var locationId = req.params.locationId;
  var location = Location.schema(req.body);

  var finish = function (err, rows, fields) {
    if (err) {
      console.log('err', err);
      res.status(constants.http.INTERNAL_ERROR.status).json({message: constants.http.INTERNAL_ERROR.message});
      return;
    }

    res.status(constants.http.SUCCESS.status).json(location);
  };

  if (validations.validateNonEmpty(locationId) && validations.validateNumeric(locationId)) {
    Location.updateById(locationId, location, finish);
  }
  else {
    res.status(constants.http.BAD_REQUEST.status).json({message: constants.http.BAD_REQUEST.message});
  }

});

// delete location by id
router.delete('/:locationId', function (req, res) {
  var location, locationId = req.params.locationId;

  var finish = function (err, rows, fields) {
    if (err) {
      console.log('err', err);
      res.status(constants.http.INTERNAL_ERROR).json({message: constants.http.INTERNAL_ERROR});
      return;
    }

    res.status(constants.http.NO_CONTENT.status).json({message: 'Successfully deleted.'});
  };

  if (validations.validateNonEmpty(locationId) && validations.validateNumeric(locationId)) {
    Location.deleteById(locationId, finish);
  }
  else {
    res.status(constants.http.BAD_REQUEST.status).json({message: constants.http.BAD_REQUEST.message});
  }
});

module.exports = router;
