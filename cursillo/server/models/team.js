var mysql = require('mysql');
var bcrypt = require('bcrypt');
var hat = require('hat');
var _ = require('underscore');
var connection = require('../utils/connection');

var validations = require('../utils/validations');
var constants = require('../utils/constants');

const requiredFields = ['name', 'weekendId'];

var schema = function (user) {
    var obj = {
      "id": null,
      "name": null,
      "notes": null,
      "isTable": null,
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

var create = function (team, cb) {
  connection.query('INSERT INTO Team SET ?', [team], cb);
};

var findAll= function (cb) {
  connection.query('SELECT * FROM Team', cb);
};

var findById = function (teamId, cb) {

  connection.query(
    'SELECT * ' +
    'FROM Team ' +
    'WHERE id = ?', [teamId], cb
  );

};

var findByWeekendId = function (weekendId, cb) {

  connection.query(
    'SELECT * ' +
    'FROM Team ' +
    'WHERE weekendId = ? ', [weekendId], cb
  );

};

var deleteById = function (teamId, cb) {

  connection.query(
    'DELETE FROM Team WHERE id = ?', [teamId], cb
  );

};

var updateById = function (teamId, team, cb) {
  connection.query('UPDATE Team SET ? WHERE id = ' + teamId, schema(team), cb);
};

var Team = {
  'create': create,
  'findAll': findAll,
  'findById': findById,
  'findByWeekendId': findByWeekendId,
  'updateById': updateById,
  'deleteById': deleteById,
  'schema': schema,
  'requiredFields': requiredFields

};

module.exports = Team;
