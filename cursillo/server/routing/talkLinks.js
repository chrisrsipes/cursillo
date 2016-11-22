var express = require('express');
var _ = require('underscore');
var bcrypt = require('bcrypt');

var auth = require('../utils/auth');
var validations = require('../utils/validations');
var constants = require('../utils/constants');
var TalkLink = require('../models/talkLink');

var router = express.Router();

router.use(auth.authenticate);
router.use(auth.authorize);


// endpoints

// get all talkLinks
router.get('/', function (req, res) {

  var finish = function (err, rows, fields) {
    if (err) {
      res.status(constants.http.INTERNAL_ERROR.status).json({message: constants.http.INTERNAL_ERROR.message});
    }
    else {
      res.status(constants.http.SUCCESS.status).json(rows);
    }
  };

  TalkLink.findAll(finish);

});

// create a new talkLink
router.post('/', function (req, res) {
  var talkLink = TalkLink.schema(req.body);

  var finish = function (err, result) {
    if (err) {
      res.status(constants.http.INTERNAL_ERROR.status).json({message: constants.http.INTERNAL_ERROR.message});
    }
    else {
      talkLink.id = result.insertId;
      res.status(constants.http.SUCCESS.status).json(talkLink);
    }
  };

  TalkLink.create(talkLink, finish);

});

// get talkLink by id
router.get('/:talkLinkId', function (req, res) {
  var talkLink, talkLinkId = req.params.talkLinkId;

  var finish = function (err, rows, fields) {
    if (err) {
      res.status(constants.http.INTERNAL_ERROR.status).json({message: constants.http.INTERNAL_ERROR.message});
    }
    else if (rows.length === 0) {
      res.status(constants.http.NO_CONTENT.status).json({message: constants.http.NO_CONTENT.message});
    }
    else {
      talkLink = rows && rows[0] || {};
      res.status(constants.http.SUCCESS.status).json(talkLink);
    }

  };

  if (validations.validateNonEmpty(talkLinkId) && validations.validateNumeric(talkLinkId)) {
    TalkLink.findById(talkLinkId, finish);
  }
  else {
    res.status(constants.http.BAD_REQUEST.status).json({message: constants.http.BAD_REQUEST.message});
  }
});

// update talkLink by id
router.put('/:talkLinkId', function (req, res) {
  var talkLinkId = req.params.talkLinkId;
  var talkLink = TalkLink.schema(req.body);

  var finish = function (err, rows, fields) {
    if (err) {
      res.status(constants.http.INTERNAL_ERROR.status).json({message: constants.http.INTERNAL_ERROR.message});
      return;
    }

    res.status(constants.http.SUCCESS.status).json(talkLink);
  };

  if (validations.validateNonEmpty(talkLinkId) && validations.validateNumeric(talkLinkId)) {
    TalkLink.updateById(talkLinkId, talkLink, finish);
  }
  else {
    res.status(constants.http.BAD_REQUEST.status).json({message: constants.http.BAD_REQUEST.message});
  }

});

// delete talkLink by id
router.delete('/:talkLinkId', function (req, res) {
  var talkLink, talkLinkId = req.params.talkLinkId;

  var finish = function (err, rows, fields) {
    if (err) {
      res.status(constants.http.INTERNAL_ERROR).json({message: constants.http.INTERNAL_ERROR});
      return;
    }

    res.status(constants.http.NO_CONTENT.status).json({message: 'Successfully deleted.'});
  };

  if (validations.validateNonEmpty(talkLinkId) && validations.validateNumeric(talkLinkId)) {
    TalkLink.deleteById(talkLinkId, finish);
  }
  else {
    res.status(constants.http.BAD_REQUEST.status).json({message: constants.http.BAD_REQUEST.message});
  }
});

module.exports = router;
