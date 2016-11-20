var mysql = require('mysql');
var bcrypt = require('bcrypt');
var hat = require('hat');
var _ = require('underscore');
var connection = require('../utils/connection');

var validations = require('../utils/validations')
var constants = require('../utils/constants');

const requiredFields = ['number', 'name'];

var schema = function (user) {
    var obj = {
      "number": null,
      "name": null,
      "description": null
    };

  // is only null if explicitly part of schema, otherwise is undefined
  _.each(user, function (val, key) {
    if (obj[key] === null) {
      obj[key] = val;
    }
  });

  return obj;
};

/*
var createAccount = function (account, cb) {

  // Store hash for password instead of password
  bcrypt.hash(account.password, constants.saltRounds, function(err, hash) {
    account.password = hash;
    connection.query('INSERT INTO Account SET ?', [account], cb);
  });

};

var findAccountById = function (accountId, cb) {
  connection.query(
    'SELECT a.id, a.firstName, a.lastName, a.email, a.status, a.password ' +
    'FROM Account a ' +
    'WHERE a.id = ?', [accountId], cb
  );

};

var findAccountByEmail = function (email, cb) {

  connection.query(
    'SELECT a.id, a.firstName, a.lastName, a.email, a.status, a.password ' +
    'FROM Account a ' +
    'WHERE a.email = ?', [email], cb
  );

};

var findAllAccounts  = function (cb) {
  connection.query('SELECT * FROM Account', cb);
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

*/

var create = function (position, cb) {
  connection.query('INSERT INTO position SET ?', [position], cb);
};

var findAll= function (cb) {
  connection.query('SELECT * FROM Position', cb);
};

var findById = function (positionId, cb) {
  
  connection.query(
    'SELECT * ' +
    'FROM Position ' +
    'WHERE id = ?', [positionId], cb
  );

};

var deleteById = function (positionId, cb) {
  
  connection.query(
    'DELETE FROM Position WHERE id = ?', [positionId], cb
  );

};

var updateById = function (position, cb) {
  
};

var Position = {
  'create': create,
  'findAll': findAll,
  'findById': findById,
  'deleteById': deleteById,
  'schema': schema,
  'requiredFields': requiredFields

};

module.exports = Position;
