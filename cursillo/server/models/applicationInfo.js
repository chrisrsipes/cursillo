var mysql = require('mysql');
var bcrypt = require('bcrypt');
var hat = require('hat');
var _ = require('underscore');
var connection = require('../utils/connection');

var validations = require('../utils/validations');
var constants = require('../utils/constants');

const requiredFields = ['personId'];

var schema = function (user) {
    var obj = {
      "id": null,
      "isCatholic": null,
      "isConverted": null,
      "convertedDate": null,
      "receivesEucharist": null,
      "pastor": null,
      "church": null,
      "sponsorName": null,
      "sponsorPhone": null,
      "reasonForApplying": null,
      "requestLowerBunk": null,
      "medicalInformation": null,
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

var create = function (applicationInfo, cb) {
  connection.query('INSERT INTO ApplicationInfo SET ?', [applicationInfo], cb);
};

var findAll= function (cb) {
  connection.query('SELECT * FROM ApplicationInfo', cb);
};

var findById = function (applicationInfoId, cb) {

  connection.query(
    'SELECT * ' +
    'FROM ApplicationInfo ' +
    'WHERE id = ?', [applicationInfoId], cb
  );

};

var findByPersonId = function (personId, cb) {

  connection.query(
    'SELECT * ' +
    'FROM ApplicationInfo ' +
    'WHERE personId = ?', [personId], cb
  );

};

var deleteById = function (applicationInfoId, cb) {

  connection.query(
    'DELETE FROM ApplicationInfo WHERE id = ?', [applicationInfoId], cb
  );

};

var updateById = function (applicationInfoId, applicationInfo, cb) {
  connection.query('UPDATE ApplicationInfo SET ? WHERE id = ' + applicationInfoId, schema(applicationInfo), cb);
};

var ApplicationInfo = {
  'create': create,
  'findAll': findAll,
  'findById': findById,
  'findByPersonId': findByPersonId,
  'updateById': updateById,
  'deleteById': deleteById,
  'schema': schema,
  'requiredFields': requiredFields

};

module.exports = ApplicationInfo;
