var express = require('express');
var _ = require('underscore');
var bcrypt = require('bcrypt');

var auth = require('../utils/auth');
var validations = require('../utils/validations');
var constants = require('../utils/constants');
var Position = require('../models/position');
var Person = require('../models/person');

var router = express.Router();

router.use(auth.authenticate);
router.use(auth.authorize);


// endpoints

// get all positions
router.get('/', function (req, res) {

  var finish = function (err, rows, fields) {
    console.log('err', err);
    if (err) {
      res.status(constants.http.INTERNAL_ERROR.status).json({message: constants.http.INTERNAL_ERROR.message});
    }
    else {
      res.status(constants.http.SUCCESS.status).json(rows);
    }
  };

  Position.findAll(finish);

});

// create a new position
router.post('/', function (req, res) {
  var position = Position.schema(req.body);

  var finish = function (err, result) {
    if (err) {
      res.status(constants.http.INTERNAL_ERROR.status).json({message: constants.http.INTERNAL_ERROR.message});
    }
    else {
      position.id = result.insertId;
      res.status(constants.http.SUCCESS.status).json(position);
    }
  };

  Position.create(position, finish);

});

// get position by id
router.get('/:positionId', function (req, res) {
  var position, positionId = req.params.positionId;

  var finish = function (err, rows, fields) {
    if (err) {
      res.status(constants.http.INTERNAL_ERROR.status).json({message: constants.http.INTERNAL_ERROR.message});
    }
    else if (rows.length === 0) {
      res.status(constants.http.NO_CONTENT.status).json({message: constants.http.NO_CONTENT.message});
    }
    else {
      position = rows && rows[0] || {};
      res.status(constants.http.SUCCESS.status).json(position);
    }

  };

  if (validations.validateNonEmpty(positionId) && validations.validateNumeric(positionId)) {
    Position.findById(positionId, finish);
  }
  else {
    res.status(constants.http.BAD_REQUEST.status).json({message: constants.http.BAD_REQUEST.message});
  }
});

// get people for position by position id
router.get('/:positionId/people', function (req, res) {
  var position, positionId = req.params.positionId;

  var finish = function (err, rows, fields) {
    if (err) {
      console.log('err', err);
      res.status(constants.http.INTERNAL_ERROR.status).json({message: constants.http.INTERNAL_ERROR.message});
    }
    else {
      res.status(constants.http.SUCCESS.status).json(rows);
    }

  };

  if (validations.validateNonEmpty(positionId) && validations.validateNumeric(positionId)) {
    Person.findByPositionId(positionId, finish);
  }
  else {
    res.status(constants.http.BAD_REQUEST.status).json({message: constants.http.BAD_REQUEST.message});
  }
});

// update position by id
router.put('/:positionId', function (req, res) {
  var positionId = req.params.positionId;
  var position = Position.schema(req.body);

  var finish = function (err, rows, fields) {
    if (err) {
      res.status(constants.http.INTERNAL_ERROR.status).json({message: constants.http.INTERNAL_ERROR.message});
      return;
    }

    res.status(constants.http.SUCCESS.status).json(position);
  };

  if (validations.validateNonEmpty(positionId) && validations.validateNumeric(positionId)) {
    Position.updateById(positionId, position, finish);
  }
  else {
    res.status(constants.http.BAD_REQUEST.status).json({message: constants.http.BAD_REQUEST.message});
  }

});

// delete position by id
router.delete('/:positionId', function (req, res) {
  var position, positionId = req.params.positionId;

  var finish = function (err, rows, fields) {
    if (err) {
      res.status(constants.http.INTERNAL_ERROR).json({message: constants.http.INTERNAL_ERROR});
      return;
    }

    res.status(constants.http.NO_CONTENT.status).json({message: 'Successfully deleted.'});
  };

  if (validations.validateNonEmpty(positionId) && validations.validateNumeric(positionId)) {
    Position.deleteById(positionId, finish);
  }
  else {
    res.status(constants.http.BAD_REQUEST.status).json({message: constants.http.BAD_REQUEST.message});
  }
});

module.exports = router;
