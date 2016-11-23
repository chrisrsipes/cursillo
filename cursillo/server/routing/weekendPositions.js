var express = require('express');
var _ = require('underscore');
var bcrypt = require('bcrypt');

var auth = require('../utils/auth');
var validations = require('../utils/validations');
var constants = require('../utils/constants');
var WeekendPosition = require('../models/weekendPosition.js');

var router = express.Router();

router.use(auth.authenticate);
router.use(auth.authorize);


// endpoints

// get all weekendPositions
router.get('/', function (req, res) {

  var finish = function (err, rows, fields) {
    if (err) {
      res.status(constants.http.INTERNAL_ERROR.status).json({message: constants.http.INTERNAL_ERROR.message});
    }
    else {
      res.status(constants.http.SUCCESS.status).json(rows);
    }
  };

  WeekendPosition.findAll(finish);

});

// create a new weekendPosition
router.post('/', function (req, res) {
  var weekendPosition = WeekendPosition.schema(req.body);

  var finish = function (err, result) {
    if (err) {
      console.log('err', err);
      res.status(constants.http.INTERNAL_ERROR.status).json({message: constants.http.INTERNAL_ERROR.message});
    }
    else {
      weekendPosition.id = result.insertId;
      res.status(constants.http.SUCCESS.status).json(weekendPosition);
    }
  };

  WeekendPosition.create(weekendPosition, finish);

});

// get weekendPosition by id
router.get('/:weekendPositionId', function (req, res) {
  var weekendPosition, cursillo, weekendPositionId = req.params.weekendPositionId;

  var finish = function (err, rows, fields) {
    if (err) {
      console.log('err', err);
      res.status(constants.http.INTERNAL_ERROR.status).json({message: constants.http.INTERNAL_ERROR.message});
    }
    else if (rows.length === 0) {
      res.status(constants.http.NO_CONTENT.status).json({message: constants.http.NO_CONTENT.message});
    }
    else {
      weekendPosition = rows && rows[0] || {};
      res.status(constants.http.SUCCESS.status).json(weekendPosition);
    }

  };

  if (validations.validateNonEmpty(weekendPositionId) && validations.validateNumeric(weekendPositionId)) {
    WeekendPosition.findById(weekendPositionId, finish);
  }
  else {
    res.status(constants.http.BAD_REQUEST.status).json({message: constants.http.BAD_REQUEST.message});
  }
});

// update weekendPosition by id
router.put('/:weekendPositionId', function (req, res) {
  var weekendPositionId = req.params.weekendPositionId;
  var weekendPosition = WeekendPosition.schema(req.body);

  var finish = function (err, rows, fields) {
    if (err) {
      res.status(constants.http.INTERNAL_ERROR.status).json({message: constants.http.INTERNAL_ERROR.message});
      return;
    }

    res.status(constants.http.SUCCESS.status).json(weekendPosition);
  };

  if (validations.validateNonEmpty(weekendPositionId) && validations.validateNumeric(weekendPositionId)) {
    WeekendPosition.updateById(weekendPositionId, weekendPosition, finish);
  }
  else {
    res.status(constants.http.BAD_REQUEST.status).json({message: constants.http.BAD_REQUEST.message});
  }

});

// delete weekendPosition by id
router.delete('/:weekendPositionId', function (req, res) {
  var weekendPosition, weekendPositionId = req.params.weekendPositionId;

  var finish = function (err, rows, fields) {
    if (err) {
      res.status(constants.http.INTERNAL_ERROR).json({message: constants.http.INTERNAL_ERROR});
      return;
    }

    res.status(constants.http.NO_CONTENT.status).json({message: 'Successfully deleted.'});
  };

  if (validations.validateNonEmpty(weekendPositionId) && validations.validateNumeric(weekendPositionId)) {
    WeekendPosition.deleteById(weekendPositionId, finish);
  }
  else {
    res.status(constants.http.BAD_REQUEST.status).json({message: constants.http.BAD_REQUEST.message});
  }
});

module.exports = router;
