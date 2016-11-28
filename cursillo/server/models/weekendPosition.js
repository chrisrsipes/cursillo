var mysql = require('mysql');
var bcrypt = require('bcrypt');
var hat = require('hat');
var _ = require('underscore');
var connection = require('../utils/connection');

var validations = require('../utils/validations');
var constants = require('../utils/constants');

const requiredFields = ['teamId', 'personId', 'positionId', 'status'];

var schema = function (user) {
    var obj = {
      "id": null,
      "status": null,
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

var findByTeamId = function (teamId, cb) {

  connection.query('SELECT wp.id, wp.status, wp.personId, wp.positionId, wp.teamId, pe.firstName, pe.lastName, po.name as positionName, po.id as positionId ' +
    'FROM WeekendPosition wp, Person pe, Position po ' +
    'WHERE wp.positionId = po.id AND wp.personId = pe.id AND wp.teamId = ? ', [teamId], cb);

};

var findByPositionId = function (positionId, cb) {

  connection.query('SELECT wp.id, wp.status, wp.personId, wp.positionId, wp.teamId, pe.firstName, pe.lastName, po.name as positionName, po.id as positionId ' +
    'FROM WeekendPosition wp, Person pe, Position po ' +
    'WHERE wp.positionId = po.id AND wp.personId = pe.id AND wp.positionId = ? ', [positionId], cb);

};

var findByPersonId = function (personId, weekendIds, cb) {

  if (weekendIds.length === 0) {
    connection.query('SELECT wp.id, wp.status, wp.personId, wp.positionId, wp.teamId, pe.firstName, pe.lastName, po.name as positionName, po.id as positionId, w.startDate, w.endDate, w.description ' +
      'FROM WeekendPosition wp, Person pe, Position po, Weekend w, Team t ' +
      'WHERE wp.positionId = po.id ' +
      'AND wp.teamId = t.id ' +
      'AND w.id = t.weekendId ' +
      'AND wp.personId = pe.id ' +
      'AND wp.personId = ? ' +
      'ORDER BY w.startDate DESC', [personId], cb);
  }
  else {
    connection.query('SELECT wp.id, wp.status, wp.personId, wp.positionId, wp.teamId, pe.firstName, pe.lastName, po.name as positionName, po.id as positionId, w.startDate, w.endDate, w.description ' +
      'FROM WeekendPosition wp, Person pe, Position po, Weekend w, Team t ' +
      'WHERE wp.positionId = po.id ' +
      'AND wp.teamId = t.id ' +
      'AND w.id = t.weekendId ' +
      'AND w.id IN (?) ' +
      'AND wp.personId = pe.id ' +
      'AND wp.personId = ? ' +
      'ORDER BY w.startDate DESC', [weekendIds, personId], cb);
  }
  
};

var deleteById = function (weekendPositionId, cb) {

  connection.query(
    'DELETE FROM WeekendPosition WHERE id = ?', [weekendPositionId], cb
  );

};

var deleteByTeamId = function (teamId, cb) {

  connection.query('DELETE FROM WeekendPosition ' +
    'WHERE teamId = ? ', [teamId], cb);

};

var updateById = function (weekendPositionId, weekendPosition, cb) {
  connection.query('UPDATE WeekendPosition SET ? WHERE id = ' + weekendPositionId, schema(weekendPosition), cb);
};

var WeekendPosition = {
  'create': create,
  'findAll': findAll,
  'findById': findById,
  'findByTeamId': findByTeamId,
  'findByPositionId': findByPositionId,
  'findByPersonId': findByPersonId,
  'updateById': updateById,
  'deleteById': deleteById,
  'deleteByTeamId': deleteByTeamId,
  'schema': schema,
  'requiredFields': requiredFields

};

module.exports = WeekendPosition;
