var mysql = require('mysql');
var bcrypt = require('bcrypt');
var hat = require('hat');
var _ = require('underscore');
var connection = require('../utils/connection');

var validations = require('../utils/validations')
var constants = require('../utils/constants');

const requiredFields = ['firstName', 'lastName', 'password', 'email'];

var schema = function (user) {
    var obj = {
      "firstName": null,
      "lastName": null,
      "email": null,
      "password": null
    };

  // is only null if explicitly part of schema, otherwise is undefined
  _.each(user, function (val, key) {
    if (obj[key] === null) {
      obj[key] = val;
    }
  });

  return obj;
};

var removeNull = function (obj) {
  _.each(obj, function (val, key) {
    if (val == null || val == undefined) {
      delete obj[key];
    }
  });
  
  return obj;
};

var createAccount = function (account, cb) {

  // Store hash for password instead of password
  bcrypt.hash(account.password, constants.saltRounds, function(err, hash) {
    account.password = hash;
    connection.query('INSERT INTO Account SET ?', [account], cb);
  });

};

var findAccountById = function (accountId, cb) {
  
  connection.query('SELECT a.id, a.firstName, a.lastName, a.email, a.status, r.name as roleName, r.id as roleId ' +
    'FROM Account a, RoleMapping rm, Role r ' +
    'WHERE rm.principalId = a.id ' +
    'AND rm.roleId = r.id ' +
    'AND a.id = ?', [accountId], cb);

};

var findAccountByEmail = function (email, cb) {

  connection.query(
    'SELECT a.id, a.firstName, a.lastName, a.email, a.status, a.password ' +
    'FROM Account a ' +
    'WHERE a.email = ?', [email], cb
  );

};

var findAllAccounts  = function (cb) {
  connection.query('SELECT a.id, a.firstName, a.lastName, a.email, r.name as roleName, r.id as roleName ' +
    'FROM Account a, RoleMapping rm, Role r ' +
    'WHERE rm.principalId = a.id ' +
    'AND rm.roleId = r.id', cb);
};

var updateById = function (accountId, account, cb) {
  console.log('password', account.password);
  
  if (account.password) {
    bcrypt.hash(account.password, constants.saltRounds, function(err, hash) {
      account.password = hash;
      connection.query('UPDATE Account SET ? WHERE id = ' + accountId, removeNull(schema(account)), cb);
    });
  }
  else {
    connection.query('UPDATE Account SET ? WHERE id = ' + accountId, removeNull(schema(account)), cb);
  }
};

var deleteAccountById = function (accountId, cb) {
  connection.query('DELETE FROM Account WHERE id = ?', [accountId], cb);
};


var deleteAllAccessTokensForAccount = function (userId, cb) {
  connection.query('DELETE FROM AccessToken WHERE userId = ?', [userId], cb);
};

var findAccountFromAccessToken = function (tokenId, cb) {
  if (!validations.validateNonEmpty(tokenId)) {
    cb(true, null);
    return;
  }

  var handleAccount = function (err, rows, fields) {
    if (err || !rows || rows.length === 0) {
      cb(true, null);
      return;
    }

    cb(false, rows[0]);
  };

  var handleAccessToken = function (err, rows, fields) {
    if (err || !rows || rows.length === 0) {
      cb(true, null);
      return;
    }

    connection.query('SELECT * FROM Account WHERE id = ?', rows[0].userId, handleAccount);
  };

  connection.query('SELECT * FROM AccessToken WHERE id = ?', [tokenId], handleAccessToken);
};

var generateAccessTokenForAccount = function (accountId, cb) {
  if (!validations.validateNonEmpty(accountId)) {
    cb(true, null);
    return;
  }

  var rack = hat.rack();
  var at = {
    id: rack(),
    created: new Date(),
    userId: accountId,
    ttl: 259200000  // 3 days
  };

  var giveBackToken = function (err, rows, fields) {
    cb(at);
  };

  connection.query('INSERT INTO AccessToken SET ?', [at], giveBackToken);
};


var Account = {
  'createAccount': createAccount,
  'updateById': updateById,
  'findAccountById': findAccountById,
  'findAccountByEmail': findAccountByEmail,
  'findAllAccounts': findAllAccounts,
  'deleteAllAccessTokensForAccount': deleteAllAccessTokensForAccount,
  'deleteAccountById': deleteAccountById,
  'findAccountFromAccessToken':findAccountFromAccessToken,
  'generateAccessTokenForAccount': generateAccessTokenForAccount,
  'schema': schema,
  'requiredFields': requiredFields

};

module.exports = Account;
