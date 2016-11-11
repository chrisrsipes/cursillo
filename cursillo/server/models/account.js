var mysql = require('mysql');
var bcrypt = require('bcrypt');
var hat = require('hat');
var _ = require('underscore');

var validations = require('../utils/Validations')
var constants = require('../utils/constants');

const requiredFields = ['firstName', 'lastName', 'password', 'email'];

var schema = function (user) {
    var obj = {
      "firstName": null,
      "lastName": null,
      "email": null,
      "tagName": null,
      "street": null,
      "zip": null,
      "homePhone": null,
      "workPhone": null,
      "birthdate": null,
      "occupation": null,
      "maritalStatus": null,
      "gender": null,
      "saint": null,
      "pastor": null,
      "sponsor": null,
      "isTeamMember": null,
      "dateStarted":null,
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

var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  database: 'cursillo'
});

var createAccount = function (account, cb) {

  // Store hash for password instead of password
  bcrypt.hash(account.password, constants.saltRounds, function(err, hash) {
    account.password = hash;
    connection.query('INSERT INTO Account SET ?', [account], cb);
  });

};

var findAccountById = function (accountId, cb) {
  connection.query('SELECT * FROM Account WHERE id = ?', [accountId], cb);
};

var findAccountByEmail = function (email, cb) {
  connection.query('SELECT * FROM Account WHERE email = ?', [email], cb);
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
      console.log('error 3');
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
  'findAccountById': findAccountById,
  'findAccountByEmail': findAccountByEmail,
  'findAllAccounts': findAllAccounts,
  'deleteAllAccessTokensForAccount': deleteAllAccessTokensForAccount,
  'findAccountFromAccessToken':findAccountFromAccessToken,
  'generateAccessTokenForAccount': generateAccessTokenForAccount,
  'schema': schema,
  'requiredFields': requiredFields
  
};

module.exports = Account;
