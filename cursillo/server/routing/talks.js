var express = require('express');
var _ = require('underscore');
var bcrypt = require('bcrypt');

var auth = require('../utils/auth');
var validations = require('../utils/validations');
var constants = require('../utils/constants');
var Talk = require('../models/talk');
var Person = require('../models/person');

var router = express.Router();

router.use(auth.authenticate);
router.use(auth.authorize);


// endpoints

// get all talks
router.get('/', function (req, res) {

  var finish = function (err, rows, fields) {
    if (err) {
      res.status(constants.http.INTERNAL_ERROR.status).json({message: constants.http.INTERNAL_ERROR.message});
    }
    else {
      res.status(constants.http.SUCCESS.status).json(rows);
    }
  };

  Talk.findAll(finish);

});

// create a new talk
router.post('/', function (req, res) {
  var talk = Talk.schema(req.body);

  var finish = function (err, result) {
    if (err) {
      res.status(constants.http.INTERNAL_ERROR.status).json({message: constants.http.INTERNAL_ERROR.message});
    }
    else {
      talk.id = result.insertId;
      res.status(constants.http.SUCCESS.status).json(talk);
    }
  };

  Talk.create(talk, finish);

});

// get talk by id
router.get('/:talkId', function (req, res) {
  var talk, talkId = req.params.talkId;

  var finish = function (err, rows, fields) {
    if (err) {
      res.status(constants.http.INTERNAL_ERROR.status).json({message: constants.http.INTERNAL_ERROR.message});
    }
    else if (rows.length === 0) {
      res.status(constants.http.NO_CONTENT.status).json({message: constants.http.NO_CONTENT.message});
    }
    else {
      talk = rows && rows[0] || {};
      res.status(constants.http.SUCCESS.status).json(talk);
    }

  };

  if (validations.validateNonEmpty(talkId) && validations.validateNumeric(talkId)) {
    Talk.findById(talkId, finish);
  }
  else {
    res.status(constants.http.BAD_REQUEST.status).json({message: constants.http.BAD_REQUEST.message});
  }
});

// get people that have been assigned talk by talk id
router.get('/:talkId/people', function (req, res) {
  var talk, talkId = req.params.talkId;

  var finish = function (err, rows, fields) {
    if (err) {
      res.status(constants.http.INTERNAL_ERROR.status).json({message: constants.http.INTERNAL_ERROR.message});
    }
    else {
      res.status(constants.http.SUCCESS.status).json(rows);
    }

  };

  if (validations.validateNonEmpty(talkId) && validations.validateNumeric(talkId)) {
    Person.findByTalkId(talkId, finish);
  }
  else {
    res.status(constants.http.BAD_REQUEST.status).json({message: constants.http.BAD_REQUEST.message});
  }
});


// update talk by id
router.put('/:talkId', function (req, res) {
  var talkId = req.params.talkId;
  var talk = Talk.schema(req.body);

  var finish = function (err, rows, fields) {
    if (err) {
      res.status(constants.http.INTERNAL_ERROR.status).json({message: constants.http.INTERNAL_ERROR.message});
      return;
    }

    res.status(constants.http.SUCCESS.status).json(talk);
  };

  if (validations.validateNonEmpty(talkId) && validations.validateNumeric(talkId)) {
    Talk.updateById(talkId, talk, finish);
  }
  else {
    res.status(constants.http.BAD_REQUEST.status).json({message: constants.http.BAD_REQUEST.message});
  }

});

// delete talk by id
router.delete('/:talkId', function (req, res) {
  var talk, talkId = req.params.talkId;

  var finish = function (err, rows, fields) {
    if (err) {
      res.status(constants.http.INTERNAL_ERROR).json({message: constants.http.INTERNAL_ERROR});
      return;
    }

    res.status(constants.http.NO_CONTENT.status).json({message: 'Successfully deleted.'});
  };

  if (validations.validateNonEmpty(talkId) && validations.validateNumeric(talkId)) {
    Talk.deleteById(talkId, finish);
  }
  else {
    res.status(constants.http.BAD_REQUEST.status).json({message: constants.http.BAD_REQUEST.message});
  }
});

module.exports = router;
