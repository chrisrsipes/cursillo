var express = require('express');
var _ = require('underscore');
var bcrypt = require('bcrypt');

var auth = require('../utils/auth');
var validations = require('../utils/validations');
var constants = require('../utils/constants');
var Weekend = require('../models/weekend.js');
var TalkLink = require('../models/talkLink.js');
var Team = require('../models/team.js');

var router = express.Router();

router.use(auth.authenticate);
router.use(auth.authorize);


// endpoints

// get all weekends
router.get('/', function (req, res) {

  var finish = function (err, rows, fields) {
    if (err) {
      res.status(constants.http.INTERNAL_ERROR.status).json({message: constants.http.INTERNAL_ERROR.message});
    }
    else {
      res.status(constants.http.SUCCESS.status).json(rows);
    }
  };

  Weekend.findAll(finish);

});

// create a new weekend
router.post('/', function (req, res) {
  var weekend = Weekend.schema(req.body);

  var finish = function (err, result) {
    if (err) {
      console.log('err', err);
      res.status(constants.http.INTERNAL_ERROR.status).json({message: constants.http.INTERNAL_ERROR.message});
    }
    else {
      weekend.id = result.insertId;
      res.status(constants.http.SUCCESS.status).json(weekend);
    }
  };

  Weekend.create(weekend, finish);

});

// get past x weekends by gender
router.get('/:gender/past', function (req, res) {
  var weekend, cursillo, gender = req.params.gender, count = req.query.count;

  var finish = function (err, rows, fields) {
    if (err) {
      console.log('err', err);
      res.status(constants.http.INTERNAL_ERROR.status).json({message: constants.http.INTERNAL_ERROR.message});
    }
    else {
      res.status(constants.http.SUCCESS.status).json(rows);
    }

  };

  console.log('gender', gender);
  console.log('count', count);
  if (gender && count && (gender === 'male' || gender === 'female')) {
    Weekend.findPastByGender(gender, count, finish);
  }
  else {
    res.status(constants.http.BAD_REQUEST.status).json({message: constants.http.BAD_REQUEST.message});
  }
});

// get weekend by id
router.get('/:weekendId', function (req, res) {
  var weekend, cursillo, weekendId = req.params.weekendId;

  var finish = function (err, rows, fields) {
    if (err) {
      console.log('err', err);
      res.status(constants.http.INTERNAL_ERROR.status).json({message: constants.http.INTERNAL_ERROR.message});
    }
    else if (rows.length === 0) {
      res.status(constants.http.NO_CONTENT.status).json({message: constants.http.NO_CONTENT.message});
    }
    else {
      weekend = rows && rows[0] || {};
      res.status(constants.http.SUCCESS.status).json(weekend);
    }

  };

  if (validations.validateNonEmpty(weekendId) && validations.validateNumeric(weekendId)) {
    Weekend.findById(weekendId, finish);
  }
  else {
    res.status(constants.http.BAD_REQUEST.status).json({message: constants.http.BAD_REQUEST.message});
  }
});

// get talks for a weekend by weekend id
router.get('/:weekendId/talkLinks', function (req, res) {
  var weekend, cursillo, weekendId = req.params.weekendId;

  var finish = function (err, rows, fields) {
    if (err) {
      console.log('err', err);
      res.status(constants.http.INTERNAL_ERROR.status).json({message: constants.http.INTERNAL_ERROR.message});
    }
    else {
      res.status(constants.http.SUCCESS.status).json(rows);
    }

  };

  if (validations.validateNonEmpty(weekendId) && validations.validateNumeric(weekendId)) {
    TalkLink.findByWeekendId(weekendId, finish);
  }
  else {
    res.status(constants.http.BAD_REQUEST.status).json({message: constants.http.BAD_REQUEST.message});
  }
});

// get teams for a weekend by weekend id
router.get('/:weekendId/teams', function (req, res) {
  var weekend, cursillo, weekendId = req.params.weekendId;

  var finish = function (err, rows, fields) {
    if (err) {
      console.log('err', err);
      res.status(constants.http.INTERNAL_ERROR.status).json({message: constants.http.INTERNAL_ERROR.message});
    }
    else {
      res.status(constants.http.SUCCESS.status).json(rows);
    }

  };

  if (validations.validateNonEmpty(weekendId) && validations.validateNumeric(weekendId)) {
    Team.findByWeekendId(weekendId, finish);
  }
  else {
    res.status(constants.http.BAD_REQUEST.status).json({message: constants.http.BAD_REQUEST.message});
  }
});


// update weekend by id
router.put('/:weekendId', function (req, res) {
  var weekendId = req.params.weekendId;
  var weekend = Weekend.schema(req.body);

  var finish = function (err, rows, fields) {
    if (err) {
      res.status(constants.http.INTERNAL_ERROR.status).json({message: constants.http.INTERNAL_ERROR.message});
      return;
    }

    res.status(constants.http.SUCCESS.status).json(weekend);
  };

  if (validations.validateNonEmpty(weekendId) && validations.validateNumeric(weekendId)) {
    Weekend.updateById(weekendId, weekend, finish);
  }
  else {
    res.status(constants.http.BAD_REQUEST.status).json({message: constants.http.BAD_REQUEST.message});
  }

});

// delete weekend by id
router.delete('/:weekendId', function (req, res) {
  var weekend, weekendId = req.params.weekendId;

  var finish = function (err, rows, fields) {
    if (err) {
      res.status(constants.http.INTERNAL_ERROR).json({message: constants.http.INTERNAL_ERROR});
      return;
    }

    res.status(constants.http.NO_CONTENT.status).json({message: 'Successfully deleted.'});
  };

  if (validations.validateNonEmpty(weekendId) && validations.validateNumeric(weekendId)) {
    Weekend.deleteById(weekendId, finish);
  }
  else {
    res.status(constants.http.BAD_REQUEST.status).json({message: constants.http.BAD_REQUEST.message});
  }
});

module.exports = router;
