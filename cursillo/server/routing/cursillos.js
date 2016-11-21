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
      res.status(500).json({message: 'Error executing request.'});
    }
    else {
      res.status(200).json({cursillos: rows});
    }
  };

  Cursillo.findAll(finish);

});

// create a new cursillo
router.post('/', function (req, res) {
  var cursillo = Cursillo.schema(req.body);


  var finish = function (err, result) {
    if (err) {
      res.status(500).json({message: 'Error executing request.'});
    }
    else {
      cursillo.id = result.insertId;
      res.status(200).json(cursillo);
    }
  };

  Cursillo.create(cursillo, finish);

});

// get cursillo by id
router.get('/:cursilloId', function (req, res) {
  var cursillo, cursilloId = req.params.cursilloId;

  var finish = function (err, rows, fields) {
    if (rows.length === 0) {
      res.status(404).json({message: 'Cursillo not found.'});
    }
    else {
      cursillo = rows && rows[0] || {};
    }

    res.status(200).json(cursillo);
  };

  if (validations.validateNonEmpty(cursilloId) && validations.validateNumeric(cursilloId)) {
    Cursillo.findById(cursilloId, finish);
  }
  else {
    res.status(404).json({message: 'Invalid ID provided.'});
  }
});

// update cursillo by id
router.put('/:cursilloId', function (req, res) {
  var cursillo, cursilloId = req.params.cursilloId;

  var finish = function (err, rows, fields) {
    if (err) {
      res.status(400).json({message: 'Bad request.'});
    }
    else if (rows.length === 0) {
      res.status(404).json({message: 'Cursillo not found.'});
    }
    else {
      cursillo = rows && rows[0] || {};
    }

    res.status(200).json(Cursillo.schema(req.body));
  };

  if (validations.validateNonEmpty(cursilloId) && validations.validateNumeric(cursilloId)) {

    Cursillo.updateById(cursilloId, req.body, finish);
  }
  else {
    res.status(404).json({message: 'Invalid ID provided.'});
  }

});

// delete cursillo by id
router.delete('/:cursilloId', function (req, res) {
  var cursillo, cursilloId = req.params.cursilloId;

  var finish = function (err, rows, fields) {
    if (rows.length === 0) {
      res.status(404).json({message: 'Cursillo not found.'});
    }
    else {
      cursillo = rows && rows[0] || {};
    }

    res.status(200).json({message: 'Successfully deleted.'});
  };

  if (validations.validateNonEmpty(cursilloId) && validations.validateNumeric(cursilloId)) {
    Cursillo.deleteById(cursilloId, finish);
  }
  else {
    res.status(404).json({message: 'Invalid ID provided.'});
  }
});


// get cursillo's locations by id
router.get('/:cursilloId/locations', function (req, res) {
  var cursillo, cursilloId = req.params.cursilloId;

  var finish = function (err, rows, fields) {
    if (err) {
      console.log('err', err);
      res.status(500).json({message: err});
    }
    else {
      res.status(200).json(rows);
    }

  };

  if (validations.validateNonEmpty(cursilloId) && validations.validateNumeric(cursilloId)) {
    Cursillo.findLocationsById(cursilloId, finish);
  }
  else {
    res.status(404).json({message: 'Invalid ID provided.'});
  }
});

module.exports = router;
