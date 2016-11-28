var mysql = require('mysql');
var bcrypt = require('bcrypt');
var hat = require('hat');
var _ = require('underscore');
var connection = require('../utils/connection');

var validations = require('../utils/validations');
var constants = require('../utils/constants');

const requiredFields = ['status', 'talkId', 'personId', 'weekendId'];

var schema = function (user) {
    var obj = {
      "id": null,
      "status": null,
      "talkId": null,
      "personId": null,
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

var create = function (talkLink, cb) {
  connection.query('INSERT INTO TalkLink SET ?', [talkLink], cb);
};

var findAll= function (cb) {
  connection.query('SELECT * FROM TalkLink', cb);
};

var findById = function (talkLinkId, cb) {

  connection.query(
    'SELECT tl.status, tl.id, tl.personId, tl.talkId, t.name as talkName, p.firstName as personFirstName, p.lastName as personLastName ' +
    'FROM TalkLink tl, Talk t, Person p ' +
    'WHERE tl.talkId = t.id ' +
    'AND tl.personId = p.id ' +
    'AND tl.id = ?', [talkLinkId], cb
  );

};

var findByWeekendId = function (weekendId, cb) {

  connection.query(
    'SELECT tl.status, tl.id, tl.personId, tl.weekendId, tl.talkId, t.name as talkName, p.firstName as personFirstName, p.lastName as personLastName ' +
    'FROM TalkLink tl, Talk t, Person p ' +
    'WHERE tl.talkId = t.id ' +
    'AND tl.personId = p.id ' +
    'AND tl.weekendId = ?', [weekendId], cb
  );

};

var findByPersonId = function (personId, weekendIds, cb) {

  if (weekendIds.length === 0) {
    connection.query(
      'SELECT tl.status, tl.id, tl.personId, tl.weekendId, tl.talkId, t.name as talkName, p.firstName as personFirstName, p.lastName as personLastName, w.description, w.startDate, w.endDate ' +
      'FROM TalkLink tl, Talk t, Person p, Weekend w ' +
      'WHERE tl.talkId = t.id ' +
      'AND tl.weekendId = w.id ' +
      'AND tl.personId = p.id ' +
      'AND tl.personId = ?', [personId], cb
    );

  }
  else {
    connection.query(
      'SELECT tl.status, tl.id, tl.personId, tl.weekendId, tl.talkId, t.name as talkName, p.firstName as personFirstName, p.lastName as personLastName, w.description, w.startDate, w.endDate ' +
      'FROM TalkLink tl, Talk t, Person p, Weekend w ' +
      'WHERE tl.talkId = t.id ' +
      'AND tl.weekendId = w.id ' +
      'AND tl.weekendId IN (?) ' +
      'AND tl.personId = p.id ' +
      'AND tl.personId = ?', [weekendIds, personId], cb
    );

  }

};

var deleteById = function (talkLinkId, cb) {

  connection.query(
    'DELETE FROM TalkLink WHERE id = ?', [talkLinkId], cb
  );

};

var updateById = function (talkLinkId, talkLink, cb) {
  connection.query('UPDATE TalkLink SET ? WHERE id = ' + talkLinkId, schema(talkLink), cb);
};

var TalkLink = {
  'create': create,
  'findAll': findAll,
  'findById': findById,
  'findByWeekendId': findByWeekendId,
  'findByPersonId': findByPersonId,
  'updateById': updateById,
  'deleteById': deleteById,
  'schema': schema,
  'requiredFields': requiredFields

};

module.exports = TalkLink;
