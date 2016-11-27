var mysql = require('mysql');
var bcrypt = require('bcrypt');
var hat = require('hat');
var _ = require('underscore');
var connection = require('../utils/connection');

var validations = require('../utils/validations');
var constants = require('../utils/constants');

const requiredFields = ['firstName', 'lastName', 'type', 'personId'];

var schema = function (user) {
    var obj = {
      "id": null,
      "firstName": null,
      "lastName": null,
      "type": null,
      "phone": null,
      "age": null,
      "hasAttended": null,
      "personId": null
    };

  // is only null if explicitly part of schema, otherwise is undefined
  _.each(user, function (val, key) {
    if (obj[key] === null) {
      obj[key] = val;
    }
  });

  return obj;
};

var create = function (contact, cb) {
  connection.query('INSERT INTO Contact SET ?', [contact], cb);
};

var findAll= function (cb) {
  connection.query('SELECT * FROM Contact', cb);
};

var findById = function (contactId, cb) {

  connection.query(
    'SELECT * ' +
    'FROM Contact ' +
    'WHERE id = ?', [contactId], cb
  );

};

var deleteById = function (contactId, cb) {

  connection.query(
    'DELETE FROM Contact WHERE id = ?', [contactId], cb
  );

};

var updateById = function (contactId, contact, cb) {
  connection.query('UPDATE Contact SET ? WHERE id = ' + contactId, schema(contact), cb);
};

var Contact = {
  'create': create,
  'findAll': findAll,
  'findById': findById,
  'updateById': updateById,
  'deleteById': deleteById,
  'schema': schema,
  'requiredFields': requiredFields

};

module.exports = Contact;
