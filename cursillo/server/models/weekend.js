var mysql = require('mysql');
var bcrypt = require('bcrypt');
var hat = require('hat');
var _ = require('underscore');
var connection = require('../utils/connection');

var validations = require('../utils/validations');
var constants = require('../utils/constants');

const requiredFields = ['name', 'locationId', 'gender'];

var schema = function (user) {
    var obj = {
      "id": null,
      "number": null,
      "gender": null,
      "description": null,
      "startDate": null,
      "endDate": null,
      "notes": null,
      "isCompleted": null,
      "locationId": null
    };

  // is only null if explicitly part of schema, otherwise is undefined
  _.each(user, function (val, key) {
    if (obj[key] === null) {
      obj[key] = val;
    }
  });

  return obj;
};

var create = function (weekend, cb) {
  connection.query('INSERT INTO Weekend SET ?', [weekend], cb);
};

var findAll = function (cb) {
  connection.query('SELECT w.id, w.number, w.description, w.startDate, w.endDate, w.notes, w.isCompleted, l.name as locationName, w.gender ' +
    'FROM Weekend w, Location l ' +
    'WHERE l.id = w.locationId', cb);
};

var findById = function (weekendId, cb) {

  connection.query('SELECT w.id, w.number, w.description, w.startDate, w.endDate, w.notes, w.isCompleted, l.name as locationName, l.id as locationId ' +
    'FROM Weekend w, Location l ' +
    'WHERE l.id = w.locationId ' +
    ' AND w.id = ?', [weekendId], cb);

};

var findPastByGender = function (gender, count, cb) {
  connection.query('select * from Weekend where gender = ? order by startDate desc limit ' + count, [gender], cb);
};

var deleteById = function (weekendId, cb) {

  connection.query(
    'DELETE FROM Weekend WHERE id = ?', [weekendId], cb
  );

};

var updateById = function (weekendId, weekend, cb) {
  connection.query('UPDATE Weekend SET ? WHERE id = ' + weekendId, schema(weekend), cb);
};

var Weekend = {
  'create': create,
  'findAll': findAll,
  'findById': findById,
  'findPastByGender': findPastByGender,
  'updateById': updateById,
  'deleteById': deleteById,
  'schema': schema,
  'requiredFields': requiredFields

};

module.exports = Weekend;
