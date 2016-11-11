var express = require('express');
var _ = require('underscore');
var bcrypt = require('bcrypt');

var auth = require('../utils/auth');
var validations = require('../utils/Validations');
var constants = require('../utils/constants');
var Account = require('../models/account');

var router = express.Router();



// endpoints

router.get('/authenticated', auth.authenticate, function (req, res) {
  res.status(200).json({message: 'mde it', account: req.account});
});

// create account
router.post('/', function (req, res) {

  var account = Account.schema(req.body);
  var flag = validations.validateProvidedFields(account, Account.requiredFields);
  
  var fail = function () {
    res.status(400).json({message: 'Bad account object.'});
  };
  
  var finish = function () {
    res.status(201).json({account: account});
  };

  if (!flag) {
    fail();
  }
  else {
    Account.createAccount(account, finish);
  }

});

// get all accounts
router.get('/', function (req, res) {
  
  var finish = function (err, rows, fields) {
    if (err) {
      res.status(500).json({message: 'Error executing request.'});
    }
    else {
      res.status(200).json({accounts: rows});
    }
  };

  Account.findAllAccounts(finish);
  
});


// login
router.post('/login', function(req, res) {
  var account;
  var credentials = {
    email: req.body.email,
    password: req.body.password
  };
  
  var fail = function (status, message) {
    res.status(status).json({message: message});
  };

  var finish = function (accessToken) {
    res.status(200).json({accessToken: accessToken, account: account});
  };

  var parseComparison = function (err, isMatch) {
    if (isMatch) {
      Account.generateAccessTokenForAccount(account.id, finish);
    }
    else {
      fail(401, 'Login failed - username or password incorrect.');
    }

  };

  var parseAccount = function (err, rows, fields) {
    if (err) {
      fail(500, 'There was an error processing your request.');
    }
    else if (rows.length === 0) {
      fail(401, 'Login failed - username or password incorrect.');
    }
    else {
      account = rows[0];
      bcrypt.compare(credentials.password, account.password, parseComparison);
    }

  };

  if (validations.validateAllNonEmpty(credentials) && validations.validateMinLength(credentials.password, 5)) {
    Account.findAccountByEmail(credentials.email, parseAccount);
  }
  else {
    fail(400, 'Invalid credentials.');
  }
});

router.get('/logout', auth.authenticate, function(req, res) {

  Account.deleteAllAccessTokensForAccount(req.account.id, function () {
    res.status(200).json({message: 'Successfully logged out.'});
  });


});


// GET account by id
router.get('/:accountId', function (req, res) {
  var accountId = req.params.accountId;

  if (validations.validateNonEmpty(accountId) && validations.validateNumeric(accountId)) {
    Account.findAccountById(accountId, function (err, rows, fields) {

      if (rows.length === 0) {
        res.status(404).json({message: 'Account not found.'});
      }
      else {
        var first = rows && rows[0] || {};
        res.status(200).json(first);
      }

    });
  }
  else {
    res.status(404).json({message: 'Invalid ID provided.'});
  }
});



module.exports = router;
