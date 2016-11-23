var express = require('express');
var _ = require('underscore');
var bcrypt = require('bcrypt');

var auth = require('../utils/auth');
var validations = require('../utils/validations');
var constants = require('../utils/constants');
var Account = require('../models/account');
var Role = require('../models/role');
var RoleMapping = require('../models/roleMapping');

var router = express.Router();



// endpoints

router.get('/authenticated', auth.authenticate, auth.authorize, function (req, res) {
  res.status(constants.http.SUCCESS.status).json({account: req.account});
});

// create account
router.post('/', function (req, res) {

  var account = Account.schema(req.body);
  var flag = validations.validateProvidedFields(account, Account.requiredFields);

  var fail = function () {
    res.status(constants.http.BAD_REQUEST.status).json({message: constants.http.BAD_REQUEST.message});
  };

  var finish = function () {
    res.status(constants.http.CREATED.status).json({account: account});
  };

  var createRoleMapping = function (err, result) {

    if (err) {
      console.log('err', err);
    }

    var principalId = result.insertId;

    var cb = insertRoleMapping = function (err, rows, fields) {
      var role = rows[0];

      RoleMapping.createRoleMapping({
        roleId: role.id,
        principalId: principalId,
        principalType: 'Account'
      }, finish);
    };

    Role.findRoleByName('rector', cb);

  };

  if (!flag) {
    fail();
  }
  else {
    Account.createAccount(account, createRoleMapping);
  }

});

// get all accounts
router.get('/', auth.authenticate, auth.authorize, function (req, res) {

  var finish = function (err, rows, fields) {
    if (err) {
      res.status(constants.http.INTERNAL_ERROR.status).json({message: constants.http.INTERNAL_ERROR.message});
    }
    else {
      res.status(constants.http.SUCCESS.status).json(rows);
    }
  };

  Account.findAllAccounts(finish);

});


// login
router.post('/login', function(req, res) {
  var account, roles, accessToken;
  var credentials = {
    email: req.body.email,
    password: req.body.password
  };

  var fail = function (status, message) {
    res.status(status).json({message: message});
  };

  var finish = function (accessToken) {
    delete account.password;
    account.roles = roles;
    res.status(constants.http.SUCCESS.status).json({accessToken: accessToken, account: account});
  };

  var processRoles = function (err, rows, fields) {
    roles = _.map(rows, 'name');
    Account.generateAccessTokenForAccount(account.id, finish);
  };

  var parseComparison = function (err, isMatch) {
    if (isMatch) {
      Role.findAssignedRolesFromUser(account.id, processRoles);
    }
    else {
      fail(constants.http.BAD_REQUEST.status, 'Login failed - username or password incorrect.');
    }

  };

  var parseAccount = function (err, rows, fields) {
    if (err) {
      fail(constants.http.INTERNAL_ERROR.status, constants.http.INTERNAL_ERROR.message);
    }
    else if (rows.length === 0) {
      fail(constants.http.BAD_REQUEST.status, 'Login failed - username or password incorrect.');
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
    fail(constants.http.BAD_REQUEST.status, 'Login failed - username or password incorrect.');
  }
});

router.get('/logout', auth.authenticate, auth.authorize, function(req, res) {

  Account.deleteAllAccessTokensForAccount(req.account.id, function () {
    res.status(constants.http.NO_CONTENT.status).json(constants.http.NO_CONTENT.message);
  });


});


// GET account by id
router.get('/:accountId', auth.authenticate, auth.authorize, function (req, res) {
  var account, accountId = req.params.accountId;

  var finish = function (err, rows, fields) {
    var roles = _.map(rows, 'name');
    account.roles = roles;
    res.status(constants.http.SUCCESS.status).json(account);
  };

  if (validations.validateNonEmpty(accountId) && validations.validateNumeric(accountId)) {
    Account.findAccountById(accountId, function (err, rows, fields) {

      if (rows.length === 0) {
        res.status(constants.http.NO_CONTENT.status).json({message: constants.http.NO_CONTENT.message});
      }
      else {
        account = rows && rows[0] || {};
        Role.findAssignedRolesFromUser(accountId, finish);
      }

    });
  }
  else {
    res.status(constants.http.BAD_REQUEST.status).json({message: constants.http.BAD_REQUEST.message});
  }
});

// update account by id
router.put('/:accountId', auth.authenticate, auth.authorize, function (req, res) {
  var account, accountId = req.params.accountId;

  var finish = function (err, result) {
    console.log('result', result);
    if (err) {
      console.log('err', err);
    }
    
    res.status(constants.http.SUCCESS.status).json(account);
  };

  if (validations.validateNonEmpty(accountId) && validations.validateNumeric(accountId)) {
    Account.updateById(accountId, req.body, finish);
  }
  else {
    res.status(constants.http.BAD_REQUEST.status).json({message: constants.http.BAD_REQUEST.message});
  }
});

// delete account by id
router.delete('/:accountId', auth.authenticate, auth.authorize, function (req, res) {
  var account, accountId = req.params.accountId;

  var finish = function (err, rows, fields) {
    res.status(constants.http.SUCCESS.status).json(constants.http.NO_CONTENT.message);
  };

  if (validations.validateNonEmpty(accountId) && validations.validateNumeric(accountId)) {
    Account.deleteAccountById(accountId, finish);
  }
  else {
    res.status(constants.http.BAD_REQUEST.status).json({message: constants.http.BAD_REQUEST.message});
  }
});

// update roles for account by account id
router.post('/:accountId/roles', auth.authenticate, auth.authorize, function (req, res) {
  var account, accountId = req.params.accountId, roleMapping = req.body;

  var finish = function (err, result) {
    console.log('result', result);
    if (err) {
      console.log('err', err);
    }
    
    res.status(constants.http.SUCCESS.status).json(account);
  };

  if (validations.validateNonEmpty(accountId) && validations.validateNumeric(accountId)) {
    RoleMapping.updateByAccountId(accountId, req.body, finish);
  }
  else {
    res.status(constants.http.BAD_REQUEST.status).json({message: constants.http.BAD_REQUEST.message});
  }
});

module.exports = router;
