var mysql = require('mysql');
var connection = require('../utils/connection');
var _ = require('underscore');

var validations = require('../utils/validations')

const requiredFields = ['principalType', 'principalId', 'roleId'];

var schema = function (user) {
  var obj = {
    principalType: null,
    principalId: null,
    roleId: null
  };

  // is only null if explicitly part of schema, otherwise is undefined
  _.each(user, function (val, key) {
    if (obj[key] === null) {
      obj[key] = val;
    }
  });

  return obj;
};

var createRoleMapping = function (roleMapping, cb) {
  connection.query('INSERT into RoleMapping SET ? ', [roleMapping], cb);
};


var updateByAccountId = function (accountId, roleMapping, cb) {
  connection.query('UPDATE RoleMapping SET ? WHERE principalId = ' + accountId, roleMapping, cb);
};

var RoleMapping = {
  'createRoleMapping': createRoleMapping,
  'updateByAccountId': updateByAccountId,
  'schema': schema,
  'requiredFields': requiredFields

};

module.exports = RoleMapping;
