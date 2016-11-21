var express = require('express');
var _ = require('underscore');
var bcrypt = require('bcrypt');

var auth = require('../utils/auth');
var validations = require('../utils/validations');
var constants = require('../utils/constants');
var Talk = require('../models/talk');

var router = express.Router();

router.use(auth.authenticate);
router.use(auth.authorize);


// endpoints

// get all talks
router.get('/', function (req, res) {

  var finish = function (err, rows, fields) {
    if (err) {
      res.status(500).json({message: 'Error executing request.'});
    }
    else {
      res.status(200).json({talks: rows});
    }
  };

  Talk.findAll(finish);

});

// create a new talk
router.post('/', function (req, res) {
  var talk = Talk.schema(req.body);


  var finish = function (err, result) {
    if (err) {
      res.status(500).json({message: 'Error executing request.'});
    }
    else {
      talk.id = result.insertId;
      res.status(200).json(talk);
    }
  };

  Talk.create(talk, finish);

});

// get talk by id
router.get('/:talkId', function (req, res) {
  var talk, talkId = req.params.talkId;

  var finish = function (err, rows, fields) {
    if (rows.length === 0) {
      res.status(404).json({message: 'Talk not found.'});
    }
    else {
      talk = rows && rows[0] || {};
    }

    res.status(200).json(talk);
  };

  if (validations.validateNonEmpty(talkId) && validations.validateNumeric(talkId)) {
    Talk.findById(talkId, finish);
  }
  else {
    res.status(404).json({message: 'Invalid ID provided.'});
  }
});

// update talk by id
router.put('/:talkId', function (req, res) {
  var talk, talkId = req.params.talkId;

  var finish = function (err, rows, fields) {
    if (err) {
      res.status(400).json({message: 'Bad request.'});
    }
    else if (rows.length === 0) {
      res.status(404).json({message: 'Talk not found.'});
    }
    else {
      talk = rows && rows[0] || {};
    }

    res.status(200).json(Talk.schema(req.body));
  };

  if (validations.validateNonEmpty(talkId) && validations.validateNumeric(talkId)) {

    Talk.updateById(talkId, req.body, finish);
  }
  else {
    res.status(404).json({message: 'Invalid ID provided.'});
  }

});

// delete talk by id
router.delete('/:talkId', function (req, res) {
  var talk, talkId = req.params.talkId;

  var finish = function (err, rows, fields) {
    if (rows.length === 0) {
      res.status(404).json({message: 'Talk not found.'});
    }
    else {
      talk = rows && rows[0] || {};
    }

    res.status(200).json({message: 'Successfully deleted.'});
  };

  if (validations.validateNonEmpty(talkId) && validations.validateNumeric(talkId)) {
    Talk.deleteById(talkId, finish);
  }
  else {
    res.status(404).json({message: 'Invalid ID provided.'});
  }
});

module.exports = router;
