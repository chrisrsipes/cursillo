var mysql = require('mysql');
var bcrypt = require('bcrypt');
var hat = require('hat');
var _ = require('underscore');
var connection = require('../utils/connection');

var validations = require('../utils/validations');
var constants = require('../utils/constants');

const requiredFields = ['firstName', 'lastName', 'email', 'parishId'];

var schema = function (user) {
    var obj = {
      "firstName": null,
      "lastName": null,
      "email": null,
      "homePhone": null,
      "workPhone": null,
      "street": null,
      "city": null,
      "state": null,
      "zip": null,
      "birthdate": null,
      "occupation": null,
      "gender": null,
      "isTeamMember": null,
      "dateStarted": null,
      "tagName": null,
      "parishId": null
    };

  // is only null if explicitly part of schema, otherwise is undefined
  _.each(user, function (val, key) {
    if (obj[key] === null) {
      obj[key] = val;
    }
  });

  return obj;
};

var create = function (person, cb) {
  connection.query('INSERT INTO person SET ?', [person], cb);
};

var findAll= function (cb) {
  connection.query('SELECT * FROM Person', cb);
};

var findById = function (personId, cb) {

  connection.query(
    'SELECT * ' +
    'FROM Person ' +
    'WHERE id = ?', [personId], cb
  );

};

var findByTalkId = function (talkId, cb) {
  
  connection.query('SELECT * ' +
    'FROM Person p, TalkLink tl, Talk t ' +
    'WHERE tl.talkId = t.id ' +
    'AND p.id = tl.personId ' +
    'AND t.id = ?', [talkId], cb);
  
};

var deleteById = function (personId, cb) {

  connection.query(
    'DELETE FROM Person WHERE id = ?', [personId], cb
  );

};

var updateById = function (personId, person, cb) {
  connection.query('UPDATE Person SET ? WHERE id = ' + personId, schema(person), cb);
};

var Person = {
  'create': create,
  'findAll': findAll,
  'findById': findById,
  'findByTalkId': findByTalkId,
  'updateById': updateById,
  'deleteById': deleteById,
  'schema': schema,
  'requiredFields': requiredFields

};

module.exports = Person;
