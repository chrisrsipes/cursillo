var mysql = require('mysql');
var bcrypt = require('bcrypt');
var hat = require('hat');
var _ = require('underscore');
var connection = require('../utils/connection');

var validations = require('../utils/validations');
var constants = require('../utils/constants');

const requiredFields = ['teamId', 'personId', 'positionId'];

var schema = function (user) {
    var obj = {
      "id": null,
      "isActive": null,
      "teamId": null,
      "positionId": null,
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

var create = function (weekendPosition, cb) {
  connection.query('INSERT INTO WeekendPosition SET ?', [weekendPosition], cb);
};

var findAll= function (cb) {
  connection.query('SELECT * ' +
    'FROM WeekendPosition  ',  cb);
};

var findById = function (weekendPositionId, cb) {
  
  connection.query('SELECT * ' +
    'FROM WeekendPosition ' +
    'WHERE id = ? ', [weekendPositionId], cb);

};

var deleteById = function (weekendPositionId, cb) {

  connection.query(
    'DELETE FROM WeekendPosition WHERE id = ?', [weekendPositionId], cb
  );

};

var updateById = function (weekendPositionId, weekendPosition, cb) {
  connection.query('UPDATE WeekendPosition SET ? WHERE id = ' + weekendPositionId, schema(weekendPosition), cb);
};

var WeekendPosition = {
  'create': create,
  'findAll': findAll,
  'findById': findById,
  'updateById': updateById,
  'deleteById': deleteById,
  'schema': schema,
  'requiredFields': requiredFields

};

module.exports = WeekendPosition;
