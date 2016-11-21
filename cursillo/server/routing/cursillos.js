var express = require('express');
var _ = require('underscore');
var bcrypt = require('bcrypt');

var auth = require('../utils/auth');
var validations = require('../utils/validations');
var constants = require('../utils/constants');
var Cursillo = require('../models/cursillo');

var router = express.Router();

router.use(auth.authenticate);
router.use(auth.authorize);


// endpoints

// get all cursillos
router.get('/', function (req, res) {

  var finish = function (err, rows, fields) {
    if (err) {
      res.status(constants.http.INTERNAL_ERROR.status).json({message: constants.http.INTERNAL_ERROR.message});
    }
    else {
      res.status(constants.http.SUCCESS.status).json(rows);
    }
  };

  Cursillo.findAll(finish);

});

// create a new cursillo
router.post('/', function (req, res) {
  var cursillo = Cursillo.schema(req.body);

  var finish = function (err, result) {
    if (err) {
      res.status(constants.http.INTERNAL_ERROR.status).json({message: constants.http.INTERNAL_ERROR.message});
    }
    else {
      cursillo.id = result.insertId;
      res.status(constants.http.SUCCESS.status).json(cursillo);
    }
  };

  Cursillo.create(cursillo, finish);

});

// get cursillo by id
router.get('/:cursilloId', function (req, res) {
  var cursillo, cursilloId = req.params.cursilloId;

  var finish = function (err, rows, fields) {
    if (err) {
      res.status(constants.http.INTERNAL_ERROR.status).json({message: constants.http.INTERNAL_ERROR.message});
    }
    else if (rows.length === 0) {
      res.status(constants.http.NO_CONTENT.status).json({message: constants.http.NO_CONTENT.message});
    }
    else {
      cursillo = rows && rows[0] || {};
      res.status(constants.http.SUCCESS.status).json(cursillo);
    }

  };

  if (validations.validateNonEmpty(cursilloId) && validations.validateNumeric(cursilloId)) {
    Cursillo.findById(cursilloId, finish);
  }
  else {
    res.status(constants.http.BAD_REQUEST.status).json({message: constants.http.BAD_REQUEST.message});
  }
});

// update cursillo by id
router.put('/:cursilloId', function (req, res) {
  var cursilloId = req.params.cursilloId;
  var cursillo = Cursillo.schema(req.body);

  var finish = function (err, rows, fields) {
    if (err) {
      res.status(constants.http.INTERNAL_ERROR.status).json({message: constants.http.INTERNAL_ERROR.message});
      return;
    }

    res.status(constants.http.SUCCESS.status).json(cursillo);
  };

  if (validations.validateNonEmpty(cursilloId) && validations.validateNumeric(cursilloId)) {
    Cursillo.updateById(cursilloId, cursillo, finish);
  }
  else {
    res.status(constants.http.BAD_REQUEST.status).json({message: constants.http.BAD_REQUEST.message});
  }

});

// delete cursillo by id
router.delete('/:cursilloId', function (req, res) {
  var cursillo, cursilloId = req.params.cursilloId;

  var finish = function (err, rows, fields) {
    if (err) {
      res.status(constants.http.INTERNAL_ERROR).json({message: constants.http.INTERNAL_ERROR});
      return;
    }

    res.status(constants.http.NO_CONTENT.status).json({message: 'Successfully deleted.'});
  };

  if (validations.validateNonEmpty(cursilloId) && validations.validateNumeric(cursilloId)) {
    Cursillo.deleteById(cursilloId, finish);
  }
  else {
    res.status(constants.http.BAD_REQUEST.status).json({message: constants.http.BAD_REQUEST.message});
  }
});


// get cursillo's locations by id
router.get('/:cursilloId/locations', function (req, res) {
  var cursillo, cursilloId = req.params.cursilloId;

  var finish = function (err, rows, fields) {
    if (err) {
      res.status(constants.http.INTERNAL_ERROR.status).json({message: constants.http.INTERNAL_ERROR.message});
    }
    else {
      res.status(constants.http.SUCCESS.status).json(rows);
    }

  };

  if (validations.validateNonEmpty(cursilloId) && validations.validateNumeric(cursilloId)) {
    Cursillo.findLocationsById(cursilloId, finish);
  }
  else {
    res.status(constants.http.BAD_REQUEST.status).json({message: constants.http.BAD_REQUEST.message});
  }
});

// get cursillo's parishes by id
router.get('/:cursilloId/parishes', function (req, res) {
  var cursillo, cursilloId = req.params.cursilloId;

  var finish = function (err, rows, fields) {
    if (err) {
      res.status(constants.http.INTERNAL_ERROR.status).json({message: constants.http.INTERNAL_ERROR.message});
    }
    else {
      res.status(constants.http.SUCCESS.status).json(rows);
    }

  };

  if (validations.validateNonEmpty(cursilloId) && validations.validateNumeric(cursilloId)) {
    Cursillo.findParishesById(cursilloId, finish);
  }
  else {
    res.status(constants.http.BAD_REQUEST.status).json({message: constants.http.BAD_REQUEST.message});
  }
});

module.exports = router;
