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

router.post('/', function (req, res) {
  var position = Position.schema(req.body);
 
  
  var finish = function (err, result) {
    if (err) {
      res.status(500).json({message: 'Error executing request.'});
    }
    else {
      position.id = result.insertId;
      res.status(200).json(position);
    }
  };

  Position.create(position, finish);

});

router.get('/:positionId', function (req, res) {
  var position, positionId = req.params.positionId;

  var finish = function (err, rows, fields) {
    if (rows.length === 0) {
      res.status(404).json({message: 'Position not found.'});
    }
    else {
      position = rows && rows[0] || {};
    }

    res.status(200).json(position);
  };

  if (validations.validateNonEmpty(positionId) && validations.validateNumeric(positionId)) {
    Position.findById(positionId, finish);
  }
  else {
    res.status(404).json({message: 'Invalid ID provided.'});
  }
});

router.delete('/:positionId', function (req, res) {
  var position, positionId = req.params.positionId;

  var finish = function (err, rows, fields) {
    if (rows.length === 0) {
      res.status(404).json({message: 'Position not found.'});
    }
    else {
      position = rows && rows[0] || {};
    }

    res.status(200).json({message: 'Successfully deleted.'});
  };

  if (validations.validateNonEmpty(positionId) && validations.validateNumeric(positionId)) {
    Position.deleteById(positionId, finish);
  }
  else {
    res.status(404).json({message: 'Invalid ID provided.'});
  }
});

module.exports = router;
