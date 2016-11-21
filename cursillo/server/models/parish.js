var mysql = require('mysql');
var bcrypt = require('bcrypt');
var hat = require('hat');
var _ = require('underscore');
var connection = require('../utils/connection');

var validations = require('../utils/validations');
var constants = require('../utils/constants');

const requiredFields = ['name', 'city', 'area', 'cursilloId'];

var schema = function (user) {
    var obj = {
      "id": null,
      "name": null,
      "city": null,
      "area": null,
      "notes": null,
      "cursilloId": null
    };

  // is only null if explicitly part of schema, otherwise is undefined
  _.each(user, function (val, key) {
    if (obj[key] === null) {
      obj[key] = val;
    }
  });

  return obj;
};

var create = function (parish, cb) {
  connection.query('INSERT INTO Parish SET ?', [parish], cb);
};

var findAll= function (cb) {
  connection.query('SELECT * FROM Parish', cb);
};

var findById = function (parishId, cb) {

  connection.query(
    'SELECT * ' +
    'FROM Parish ' +
    'WHERE id = ?', [parishId], cb
  );

};

var deleteById = function (parishId, cb) {

  connection.query(
    'DELETE FROM Parish WHERE id = ?', [parishId], cb
  );

};

var updateById = function (parishId, parish, cb) {
  connection.query('UPDATE Parish SET ? WHERE id = ' + parishId, schema(parish), cb);
};

var Parish = {
  'create': create,
  'findAll': findAll,
  'findById': findById,
  'updateById': updateById,
  'deleteById': deleteById,
  'schema': schema,
  'requiredFields': requiredFields

};

module.exports = Parish;
