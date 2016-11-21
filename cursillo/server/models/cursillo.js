var mysql = require('mysql');
var bcrypt = require('bcrypt');
var hat = require('hat');
var _ = require('underscore');
var connection = require('../utils/connection');

var validations = require('../utils/validations');
var constants = require('../utils/constants');

const requiredFields = ['name'];

var schema = function (user) {
    var obj = {
      "id": null,
      "name": null
    };

  // is only null if explicitly part of schema, otherwise is undefined
  _.each(user, function (val, key) {
    if (obj[key] === null) {
      obj[key] = val;
    }
  });

  return obj;
};

var create = function (cursillo, cb) {
  connection.query('INSERT INTO Cursillo SET ?', [cursillo], cb);
};

var findAll= function (cb) {
  connection.query('SELECT * FROM Cursillo', cb);
};

var findById = function (cursilloId, cb) {

  connection.query(
    'SELECT * ' +
    'FROM Cursillo ' +
    'WHERE id = ?', [cursilloId], cb
  );

};

var deleteById = function (cursilloId, cb) {

  connection.query(
    'DELETE FROM Cursillo WHERE id = ?', [cursilloId], cb
  );

};

var updateById = function (cursilloId, cursillo, cb) {
  connection.query('UPDATE Cursillo SET ? WHERE id = ' + cursilloId, schema(cursillo), cb);
};

var findLocationsById = function (cursilloId, cb) {
  connection.query('SELECT * FROM Location WHERE cursilloId = ?', cursilloId, cb);
};

var Cursillo = {
  'create': create,
  'findAll': findAll,
  'findById': findById,
  'updateById': updateById,
  'deleteById': deleteById,
  'findLocationsById': findLocationsById,
  'schema': schema,
  'requiredFields': requiredFields

};

module.exports = Cursillo;
