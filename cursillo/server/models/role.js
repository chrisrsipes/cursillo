var mysql = require('mysql');
var connection = require('../utils/connection');
var _ = require('underscore');

var validations = require('../utils/validations')

const requiredFields = ['name', 'description'];

var schema = function (user) {
  var obj = {
    name: null,
    description: null,
    created: null,
    modified: null
  };

  // is only null if explicitly part of schema, otherwise is undefined
  _.each(user, function (val, key) {
    if (obj[key] === null) {
      obj[key] = val;
    }
  });

  return obj;
};

var findAssignedRolesFromUser = function (accountId, cb) {
  connection.query('SELECT r.id, r.name, r.description FROM Role r, RoleMapping rm WHERE rm.roleId = r.id AND rm.principalId = ?', [accountId], cb);
};

var findAssignedAccessFromUser = function (accountId, cb) {
  connection.query('SELECT a.id, a.model, a.property, a.accessType, a.permission ' +
                   'FROM Role r, RoleMapping rm, ACL a ' +
                   'WHERE a.principalType = "Role" ' +
                   'AND a.principalId = r.id ' +
                   'AND rm.roleId = r.id ' +
                   'AND rm.principalId = ?', [accountId], cb);
};

var findRoleByName = function (name, cb) {
  connection.query('SELECT * FROM Role WHERE name = ?', [name], cb);
};

var Role = {
  'findAssignedRolesFromUser': findAssignedRolesFromUser,
  'findAssignedAccessFromUser': findAssignedAccessFromUser,
  'findRoleByName': findRoleByName,
  'schema': schema,
  'requiredFields': requiredFields

};

module.exports = Role;
