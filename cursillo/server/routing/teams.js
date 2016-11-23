var express = require('express');
var _ = require('underscore');
var bcrypt = require('bcrypt');

var auth = require('../utils/auth');
var validations = require('../utils/validations');
var constants = require('../utils/constants');
var Team = require('../models/team');
var Person = require('../models/person');
var WeekendPosition = require('../models/weekendPosition');

var router = express.Router();

router.use(auth.authenticate);
router.use(auth.authorize);


// endpoints

// get all teams
router.get('/', function (req, res) {

  var finish = function (err, rows, fields) {
    if (err) {
      res.status(constants.http.INTERNAL_ERROR.status).json({message: constants.http.INTERNAL_ERROR.message});
    }
    else {
      res.status(constants.http.SUCCESS.status).json(rows);
    }
  };

  Team.findAll(finish);

});

// create a new team
router.post('/', function (req, res) {
  var team = Team.schema(req.body);

  var finish = function (err, result) {
    if (err) {
      res.status(constants.http.INTERNAL_ERROR.status).json({message: constants.http.INTERNAL_ERROR.message});
    }
    else {
      team.id = result.insertId;
      res.status(constants.http.SUCCESS.status).json(team);
    }
  };

  Team.create(team, finish);

});

// get team by id
router.get('/:teamId', function (req, res) {
  var team, teamId = req.params.teamId;

  var finish = function (err, rows, fields) {
    if (err) {
      res.status(constants.http.INTERNAL_ERROR.status).json({message: constants.http.INTERNAL_ERROR.message});
    }
    else if (rows.length === 0) {
      res.status(constants.http.NO_CONTENT.status).json({message: constants.http.NO_CONTENT.message});
    }
    else {
      team = rows && rows[0] || {};
      res.status(constants.http.SUCCESS.status).json(team);
    }

  };

  if (validations.validateNonEmpty(teamId) && validations.validateNumeric(teamId)) {
    Team.findById(teamId, finish);
  }
  else {
    res.status(constants.http.BAD_REQUEST.status).json({message: constants.http.BAD_REQUEST.message});
  }
});

// get weekend positions that have been assigned team by team id
router.get('/:teamId/weekendPositions', function (req, res) {
  var team, teamId = req.params.teamId;

  var finish = function (err, rows, fields) {
    if (err) {
      console.log('err', err);
      res.status(constants.http.INTERNAL_ERROR.status).json({message: constants.http.INTERNAL_ERROR.message});
    }
    else {
      res.status(constants.http.SUCCESS.status).json(rows);
    }

  };

  if (validations.validateNonEmpty(teamId) && validations.validateNumeric(teamId)) {
    WeekendPosition.findByTeamId(teamId, finish);
  }
  else {
    res.status(constants.http.BAD_REQUEST.status).json({message: constants.http.BAD_REQUEST.message});
  }
});

// delete weekend positions that have been assigned team by team id
router.delete('/:teamId/weekendPositions', function (req, res) {
  var team, teamId = req.params.teamId;

  var finish = function (err, rows, fields) {
    if (err) {
      console.log('err', err);
      res.status(constants.http.INTERNAL_ERROR.status).json({message: constants.http.INTERNAL_ERROR.message});
    }
    else {
      res.status(constants.http.SUCCESS.status).json(constants.http.NO_CONTENT.message);
    }

  };

  if (validations.validateNonEmpty(teamId) && validations.validateNumeric(teamId)) {
    WeekendPosition.deleteByTeamId(teamId, finish);
  }
  else {
    res.status(constants.http.BAD_REQUEST.status).json({message: constants.http.BAD_REQUEST.message});
  }
});


// update team by id
router.put('/:teamId', function (req, res) {
  var teamId = req.params.teamId;
  var team = Team.schema(req.body);

  var finish = function (err, rows, fields) {
    if (err) {
      res.status(constants.http.INTERNAL_ERROR.status).json({message: constants.http.INTERNAL_ERROR.message});
      return;
    }

    res.status(constants.http.SUCCESS.status).json(team);
  };

  if (validations.validateNonEmpty(teamId) && validations.validateNumeric(teamId)) {
    Team.updateById(teamId, team, finish);
  }
  else {
    res.status(constants.http.BAD_REQUEST.status).json({message: constants.http.BAD_REQUEST.message});
  }

});

// delete team by id
router.delete('/:teamId', function (req, res) {
  var team, teamId = req.params.teamId;

  var finish = function (err, rows, fields) {
    if (err) {
      res.status(constants.http.INTERNAL_ERROR).json({message: constants.http.INTERNAL_ERROR});
      return;
    }

    res.status(constants.http.NO_CONTENT.status).json({message: 'Successfully deleted.'});
  };

  if (validations.validateNonEmpty(teamId) && validations.validateNumeric(teamId)) {
    Team.deleteById(teamId, finish);
  }
  else {
    res.status(constants.http.BAD_REQUEST.status).json({message: constants.http.BAD_REQUEST.message});
  }
});

module.exports = router;
