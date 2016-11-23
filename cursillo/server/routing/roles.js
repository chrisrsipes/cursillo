var express = require('express');
var _ = require('underscore');
var bcrypt = require('bcrypt');

var auth = require('../utils/auth');
var validations = require('../utils/validations');
var constants = require('../utils/constants');
var Role = require('../models/role');
var Person = require('../models/person');

var router = express.Router();

router.use(auth.authenticate);
router.use(auth.authorize);


// endpoints

// get all roles
router.get('/', function (req, res) {

  var finish = function (err, rows, fields) {
    if (err) {
      res.status(constants.http.INTERNAL_ERROR.status).json({message: constants.http.INTERNAL_ERROR.message});
    }
    else {
      res.status(constants.http.SUCCESS.status).json(rows);
    }
  };

  Role.findAll(finish);

});

// create a new role
router.post('/', function (req, res) {
  var role = Role.schema(req.body);

  var finish = function (err, result) {
    if (err) {
      res.status(constants.http.INTERNAL_ERROR.status).json({message: constants.http.INTERNAL_ERROR.message});
    }
    else {
      role.id = result.insertId;
      res.status(constants.http.SUCCESS.status).json(role);
    }
  };

  Role.create(role, finish);

});

// get role by id
router.get('/:roleId', function (req, res) {
  var role, roleId = req.params.roleId;

  var finish = function (err, rows, fields) {
    if (err) {
      res.status(constants.http.INTERNAL_ERROR.status).json({message: constants.http.INTERNAL_ERROR.message});
    }
    else if (rows.length === 0) {
      res.status(constants.http.NO_CONTENT.status).json({message: constants.http.NO_CONTENT.message});
    }
    else {
      role = rows && rows[0] || {};
      res.status(constants.http.SUCCESS.status).json(role);
    }

  };

  if (validations.validateNonEmpty(roleId) && validations.validateNumeric(roleId)) {
    Role.findById(roleId, finish);
  }
  else {
    res.status(constants.http.BAD_REQUEST.status).json({message: constants.http.BAD_REQUEST.message});
  }
});

// get people that have been assigned role by role id
router.get('/:roleId/people', function (req, res) {
  var role, roleId = req.params.roleId;

  var finish = function (err, rows, fields) {
    if (err) {
      res.status(constants.http.INTERNAL_ERROR.status).json({message: constants.http.INTERNAL_ERROR.message});
    }
    else {
      res.status(constants.http.SUCCESS.status).json(rows);
    }

  };

  if (validations.validateNonEmpty(roleId) && validations.validateNumeric(roleId)) {
    Person.findByRoleId(roleId, finish);
  }
  else {
    res.status(constants.http.BAD_REQUEST.status).json({message: constants.http.BAD_REQUEST.message});
  }
});


// update role by id
router.put('/:roleId', function (req, res) {
  var roleId = req.params.roleId;
  var role = Role.schema(req.body);

  var finish = function (err, rows, fields) {
    if (err) {
      res.status(constants.http.INTERNAL_ERROR.status).json({message: constants.http.INTERNAL_ERROR.message});
      return;
    }

    res.status(constants.http.SUCCESS.status).json(role);
  };

  if (validations.validateNonEmpty(roleId) && validations.validateNumeric(roleId)) {
    Role.updateById(roleId, role, finish);
  }
  else {
    res.status(constants.http.BAD_REQUEST.status).json({message: constants.http.BAD_REQUEST.message});
  }

});

// delete role by id
router.delete('/:roleId', function (req, res) {
  var role, roleId = req.params.roleId;

  var finish = function (err, rows, fields) {
    if (err) {
      res.status(constants.http.INTERNAL_ERROR).json({message: constants.http.INTERNAL_ERROR});
      return;
    }

    res.status(constants.http.NO_CONTENT.status).json({message: 'Successfully deleted.'});
  };

  if (validations.validateNonEmpty(roleId) && validations.validateNumeric(roleId)) {
    Role.deleteById(roleId, finish);
  }
  else {
    res.status(constants.http.BAD_REQUEST.status).json({message: constants.http.BAD_REQUEST.message});
  }
});

module.exports = router;
