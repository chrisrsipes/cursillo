var mysql = require('mysql');
var bcrypt = require('bcrypt');
var hat = require('hat');
var _ = require('underscore');
var connection = require('../utils/connection');

var validations = require('../utils/validations');
var constants = require('../utils/constants');

const requiredFields = ['name', 'number', 'weekendId'];

var schema = function (user) {
    var obj = {
      "id": null,
      "name": null,
      "number": null,
      "weekendId": null
    };

  // is only null if explicitly part of schema, otherwise is undefined
  _.each(user, function (val, key) {
    if (obj[key] === null) {
      obj[key] = val;
    }
  });

  return obj;
};

var create = function (table, cb) {
  connection.query('INSERT INTO cursillo.Table SET ?', [table], cb);
};

var findAll= function (cb) {
  connection.query('SELECT * FROM cursillo.Table', cb);
};

var findById = function (tableId, cb) {

  connection.query(
    'SELECT * ' +
    'FROM cursillo.Table ' +
    'WHERE id = ?', [tableId], cb
  );

};

var deleteById = function (tableId, cb) {

  connection.query(
    'DELETE FROM cursillo.Table WHERE id = ?', [tableId], cb
  );

};

var updateById = function (tableId, table, cb) {
  connection.query('UPDATE cursillo.Table SET ? WHERE id = ' + tableId, schema(table), cb);
};

var Table = {
  'create': create,
  'findAll': findAll,
  'findById': findById,
  'updateById': updateById,
  'deleteById': deleteById,
  'schema': schema,
  'requiredFields': requiredFields

};

module.exports = Table;
