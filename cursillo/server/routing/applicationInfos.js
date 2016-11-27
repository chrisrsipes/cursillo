var express = require('express');
var _ = require('underscore');
var bcrypt = require('bcrypt');

var auth = require('../utils/auth');
var validations = require('../utils/validations');
var constants = require('../utils/constants');
var ApplicationInfo = require('../models/applicationInfo');

var router = express.Router();

router.use(auth.authenticate);
router.use(auth.authorize);


// endpoints

// get all applicationInfos
router.get('/', function (req, res) {

  var finish = function (err, rows, fields) {
    if (err) {
      res.status(constants.http.INTERNAL_ERROR.status).json({message: constants.http.INTERNAL_ERROR.message});
    }
    else {
      res.status(constants.http.SUCCESS.status).json(rows);
    }
  };

  ApplicationInfo.findAll(finish);

});

// create a new applicationInfo
router.post('/', function (req, res) {
  var applicationInfo = ApplicationInfo.schema(req.body);

  var finish = function (err, result) {
    if (err) {
      res.status(constants.http.INTERNAL_ERROR.status).json({message: constants.http.INTERNAL_ERROR.message});
    }
    else {
      applicationInfo.id = result.insertId;
      res.status(constants.http.SUCCESS.status).json(applicationInfo);
    }
  };

  ApplicationInfo.create(applicationInfo, finish);

});

// get applicationInfo by id
router.get('/:applicationInfoId', function (req, res) {
  var applicationInfo, applicationInfoId = req.params.applicationInfoId;

  var finish = function (err, rows, fields) {
    if (err) {
      res.status(constants.http.INTERNAL_ERROR.status).json({message: constants.http.INTERNAL_ERROR.message});
    }
    else if (rows.length === 0) {
      res.status(constants.http.NO_CONTENT.status).json({message: constants.http.NO_CONTENT.message});
    }
    else {
      applicationInfo = rows && rows[0] || {};
      res.status(constants.http.SUCCESS.status).json(applicationInfo);
    }

  };

  if (validations.validateNonEmpty(applicationInfoId) && validations.validateNumeric(applicationInfoId)) {
    ApplicationInfo.findById(applicationInfoId, finish);
  }
  else {
    res.status(constants.http.BAD_REQUEST.status).json({message: constants.http.BAD_REQUEST.message});
  }
});

// update applicationInfo by id
router.put('/:applicationInfoId', function (req, res) {
  var applicationInfoId = req.params.applicationInfoId;
  var applicationInfo = ApplicationInfo.schema(req.body);

  var finish = function (err, rows, fields) {
    if (err) {
      res.status(constants.http.INTERNAL_ERROR.status).json({message: constants.http.INTERNAL_ERROR.message});
      return;
    }

    res.status(constants.http.SUCCESS.status).json(applicationInfo);
  };

  if (validations.validateNonEmpty(applicationInfoId) && validations.validateNumeric(applicationInfoId)) {
    ApplicationInfo.updateById(applicationInfoId, applicationInfo, finish);
  }
  else {
    res.status(constants.http.BAD_REQUEST.status).json({message: constants.http.BAD_REQUEST.message});
  }

});

// delete applicationInfo by id
router.delete('/:applicationInfoId', function (req, res) {
  var applicationInfo, applicationInfoId = req.params.applicationInfoId;

  var finish = function (err, rows, fields) {
    if (err) {
      res.status(constants.http.INTERNAL_ERROR).json({message: constants.http.INTERNAL_ERROR});
      return;
    }

    res.status(constants.http.NO_CONTENT.status).json({message: 'Successfully deleted.'});
  };

  if (validations.validateNonEmpty(applicationInfoId) && validations.validateNumeric(applicationInfoId)) {
    ApplicationInfo.deleteById(applicationInfoId, finish);
  }
  else {
    res.status(constants.http.BAD_REQUEST.status).json({message: constants.http.BAD_REQUEST.message});
  }
});

module.exports = router;
