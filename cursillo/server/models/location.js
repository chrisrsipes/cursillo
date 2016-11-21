var mysql = require('mysql');
var bcrypt = require('bcrypt');
var hat = require('hat');
var _ = require('underscore');
var connection = require('../utils/connection');

var validations = require('../utils/validations');
var constants = require('../utils/constants');

const requiredFields = ['name', 'cursilloId'];

var schema = function (user) {
    var obj = {
      "id": null,
      "name": null,
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

var create = function (location, cb) {
  connection.query('INSERT INTO Location SET ?', [location], cb);
};

var findAll= function (cb) {
  connection.query('SELECT l.id, l.name, l.cursilloId, c.name as cursilloName FROM Location l, Cursillo c WHERE l.cursilloId = c.id', cb);
};

var findById = function (locationId, cb) {

  connection.query('SELECT l.id, l.name, l.cursilloId, c.name as cursilloName ' +
    'FROM Location l, Cursillo c ' +
    'WHERE l.cursilloId = c.id ' +
    'AND l.id = ?', [locationId], cb);
  

};

var deleteById = function (locationId, cb) {

  connection.query(
    'DELETE FROM Location WHERE id = ?', [locationId], cb
  );

};

var updateById = function (locationId, location, cb) {
  connection.query('UPDATE Location SET ? WHERE id = ' + locationId, schema(location), cb);
};

var Location = {
  'create': create,
  'findAll': findAll,
  'findById': findById,
  'updateById': updateById,
  'deleteById': deleteById,
  'schema': schema,
  'requiredFields': requiredFields

};

module.exports = Location;
