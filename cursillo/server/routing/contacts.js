var express = require('express');
var _ = require('underscore');
var bcrypt = require('bcrypt');

var auth = require('../utils/auth');
var validations = require('../utils/validations');
var constants = require('../utils/constants');
var Contact = require('../models/contact');

var router = express.Router();

router.use(auth.authenticate);
router.use(auth.authorize);


// endpoints

// get all contacts
router.get('/', function (req, res) {

  var finish = function (err, rows, fields) {
    if (err) {
      res.status(constants.http.INTERNAL_ERROR.status).json({message: constants.http.INTERNAL_ERROR.message});
    }
    else {
      res.status(constants.http.SUCCESS.status).json(rows);
    }
  };

  Contact.findAll(finish);

});

// create a new contact
router.post('/', function (req, res) {
  var contact = Contact.schema(req.body);

  var finish = function (err, result) {
    if (err) {
      res.status(constants.http.INTERNAL_ERROR.status).json({message: constants.http.INTERNAL_ERROR.message});
    }
    else {
      contact.id = result.insertId;
      res.status(constants.http.SUCCESS.status).json(contact);
    }
  };

  Contact.create(contact, finish);

});

// get contact by id
router.get('/:contactId', function (req, res) {
  var contact, contactId = req.params.contactId;

  var finish = function (err, rows, fields) {
    if (err) {
      res.status(constants.http.INTERNAL_ERROR.status).json({message: constants.http.INTERNAL_ERROR.message});
    }
    else if (rows.length === 0) {
      res.status(constants.http.NO_CONTENT.status).json({message: constants.http.NO_CONTENT.message});
    }
    else {
      contact = rows && rows[0] || {};
      res.status(constants.http.SUCCESS.status).json(contact);
    }

  };

  if (validations.validateNonEmpty(contactId) && validations.validateNumeric(contactId)) {
    Contact.findById(contactId, finish);
  }
  else {
    res.status(constants.http.BAD_REQUEST.status).json({message: constants.http.BAD_REQUEST.message});
  }
});

// update contact by id
router.put('/:contactId', function (req, res) {
  var contactId = req.params.contactId;
  var contact = Contact.schema(req.body);

  var finish = function (err, rows, fields) {
    if (err) {
      res.status(constants.http.INTERNAL_ERROR.status).json({message: constants.http.INTERNAL_ERROR.message});
      return;
    }

    res.status(constants.http.SUCCESS.status).json(contact);
  };

  if (validations.validateNonEmpty(contactId) && validations.validateNumeric(contactId)) {
    Contact.updateById(contactId, contact, finish);
  }
  else {
    res.status(constants.http.BAD_REQUEST.status).json({message: constants.http.BAD_REQUEST.message});
  }

});

// delete contact by id
router.delete('/:contactId', function (req, res) {
  var contact, contactId = req.params.contactId;

  var finish = function (err, rows, fields) {
    if (err) {
      res.status(constants.http.INTERNAL_ERROR).json({message: constants.http.INTERNAL_ERROR});
      return;
    }

    res.status(constants.http.NO_CONTENT.status).json({message: 'Successfully deleted.'});
  };

  if (validations.validateNonEmpty(contactId) && validations.validateNumeric(contactId)) {
    Contact.deleteById(contactId, finish);
  }
  else {
    res.status(constants.http.BAD_REQUEST.status).json({message: constants.http.BAD_REQUEST.message});
  }
});

module.exports = router;
