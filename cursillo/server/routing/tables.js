var express = require('express');
var _ = require('underscore');
var bcrypt = require('bcrypt');

var auth = require('../utils/auth');
var validations = require('../utils/validations');
var constants = require('../utils/constants');
var Table = require('../models/table');
var Person = require('../models/person');

var router = express.Router();

router.use(auth.authenticate);
router.use(auth.authorize);


// endpoints

// get all tables
router.get('/', function (req, res) {

  var finish = function (err, rows, fields) {
    if (err) {
      console.log('err', err);
      res.status(constants.http.INTERNAL_ERROR.status).json({message: constants.http.INTERNAL_ERROR.message});
    }
    else {
      res.status(constants.http.SUCCESS.status).json(rows);
    }
  };

  Table.findAll(finish);

});

// create a new table
router.post('/', function (req, res) {
  var table = Table.schema(req.body);

  var finish = function (err, result) {
    if (err) {
      res.status(constants.http.INTERNAL_ERROR.status).json({message: constants.http.INTERNAL_ERROR.message});
    }
    else {
      table.id = result.insertId;
      res.status(constants.http.SUCCESS.status).json(table);
    }
  };

  Table.create(table, finish);

});

// get table by id
router.get('/:tableId', function (req, res) {
  var table, tableId = req.params.tableId;

  var finish = function (err, rows, fields) {
    if (err) {
      res.status(constants.http.INTERNAL_ERROR.status).json({message: constants.http.INTERNAL_ERROR.message});
    }
    else if (rows.length === 0) {
      res.status(constants.http.NO_CONTENT.status).json({message: constants.http.NO_CONTENT.message});
    }
    else {
      table = rows && rows[0] || {};
      res.status(constants.http.SUCCESS.status).json(table);
    }

  };

  if (validations.validateNonEmpty(tableId) && validations.validateNumeric(tableId)) {
    Table.findById(tableId, finish);
  }
  else {
    res.status(constants.http.BAD_REQUEST.status).json({message: constants.http.BAD_REQUEST.message});
  }
});

// get people that have been assigned table by table id
router.get('/:tableId/people', function (req, res) {
  var table, tableId = req.params.tableId;

  var finish = function (err, rows, fields) {
    if (err) {
      res.status(constants.http.INTERNAL_ERROR.status).json({message: constants.http.INTERNAL_ERROR.message});
    }
    else {
      res.status(constants.http.SUCCESS.status).json(rows);
    }

  };

  if (validations.validateNonEmpty(tableId) && validations.validateNumeric(tableId)) {
    Person.findByTableId(tableId, finish);
  }
  else {
    res.status(constants.http.BAD_REQUEST.status).json({message: constants.http.BAD_REQUEST.message});
  }
});


// update table by id
router.put('/:tableId', function (req, res) {
  var tableId = req.params.tableId;
  var table = Table.schema(req.body);

  var finish = function (err, rows, fields) {
    if (err) {
      res.status(constants.http.INTERNAL_ERROR.status).json({message: constants.http.INTERNAL_ERROR.message});
      return;
    }

    res.status(constants.http.SUCCESS.status).json(table);
  };

  if (validations.validateNonEmpty(tableId) && validations.validateNumeric(tableId)) {
    Table.updateById(tableId, table, finish);
  }
  else {
    res.status(constants.http.BAD_REQUEST.status).json({message: constants.http.BAD_REQUEST.message});
  }

});

// delete table by id
router.delete('/:tableId', function (req, res) {
  var table, tableId = req.params.tableId;

  var finish = function (err, rows, fields) {
    if (err) {
      res.status(constants.http.INTERNAL_ERROR).json({message: constants.http.INTERNAL_ERROR});
      return;
    }

    res.status(constants.http.NO_CONTENT.status).json({message: 'Successfully deleted.'});
  };

  if (validations.validateNonEmpty(tableId) && validations.validateNumeric(tableId)) {
    Table.deleteById(tableId, finish);
  }
  else {
    res.status(constants.http.BAD_REQUEST.status).json({message: constants.http.BAD_REQUEST.message});
  }
});

module.exports = router;
