var mysql = require('mysql');
var bcrypt = require('bcrypt');
var hat = require('hat');
var _ = require('underscore');
var connection = require('../utils/connection');

var validations = require('../utils/validations');
var constants = require('../utils/constants');

const requiredFields = ['name', 'number'];

var schema = function (user) {
    var obj = {
      "id": null,
      "name": null,
      "number": null,
      "description": null,
      "isActive": null
    };

  // is only null if explicitly part of schema, otherwise is undefined
  _.each(user, function (val, key) {
    if (obj[key] === null) {
      obj[key] = val;
    }
  });

  return obj;
};

var create = function (talk, cb) {
  connection.query('INSERT INTO Talk SET ?', [talk], cb);
};

var findAll= function (cb) {
  connection.query('SELECT * FROM Talk', cb);
};

var findById = function (talkId, cb) {

  connection.query(
    'SELECT * ' +
    'FROM Talk ' +
    'WHERE id = ?', [talkId], cb
  );

};

var deleteById = function (talkId, cb) {

  connection.query(
    'DELETE FROM Talk WHERE id = ?', [talkId], cb
  );

};

var updateById = function (talkId, talk, cb) {
  connection.query('UPDATE Talk SET ? WHERE id = ' + talkId, schema(talk), cb);
};

var Talk = {
  'create': create,
  'findAll': findAll,
  'findById': findById,
  'updateById': updateById,
  'deleteById': deleteById,
  'schema': schema,
  'requiredFields': requiredFields

};

module.exports = Talk;
