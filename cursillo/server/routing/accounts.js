var express = require('express');
var _ = require('underscore');

var mysql = require('mysql');
var bcrypt = require('bcrypt');
var hat = require('hat');

var router = express.Router();

// constants
const requiredFields = ['firstName', 'lastName', 'password', 'email'];
const saltRounds = 10;

var Account = function (user) {
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


// validations
var validateNonEmpty = function (field) {
  if ((field === null) || (field === undefined) || (!field && field !== false)) {
    return false;
  }
  else {
    return true;
  }
};

var validateProvidedFields = function (obj, fields) {
  var flag = true;

  // validate required fields
  _.each(fields, function (val) {
    flag = flag && validateNonEmpty(obj[val]);
  });

  return flag;
};

var validateNumeric = function (field) {
  return ((Number(field) + '') === field);
};

var validateMinLength = function (field, len) {
  return ((field + '').length >= len);
};

var validateAllNonEmpty = function (object) {
  var flag = true;

  _.each(object, function (val, key) {
    flag = flag && validateNonEmpty(object[key]);
  });

  return flag;
};



// db connections and operations

var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  database: 'cursillo'
});

var createAccount = function (account, cb) {

  // Store hash for password instead of password
  bcrypt.hash(account.password, saltRounds, function(err, hash) {
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
  if (!validateNonEmpty(tokenId)) {
    console.log('error 1');
    cb(true, null);
    return;
  }

  connection.query('SELECT * FROM AccessToken WHERE id = ?', [tokenId], function (err, rows, fields) {
    if (err || !rows || rows.length === 0) {
      cb(true, null);
      return;
    }

    connection.query('SELECT * FROM Account WHERE id = ?', rows[0].userId, function (err, rows, fields) {

      if (err || !rows || rows.length === 0) {
        console.log('error 3');
        cb(true, null);
        return;
      }

      cb(false, rows[0]);
    })
  });
};

var generateAccessTokenForAccount = function (accountId, cb) {
  if (!validateNonEmpty(accountId)) {
    console.log('returning null');
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

  var hackedCb = function (err, rows, fields) {
    cb(at);
  };

  connection.query('INSERT INTO AccessToken SET ?', [at], hackedCb);
};

// authentication

var isAuthenticated = function (req, res, next) {

  if (validateNonEmpty(req.query.authorization)) {
    findAccountFromAccessToken(req.query.authorization, function (err, account) {
      if (err) {
        res.status(500).json({message: 'Error executing request.'});
        return;
      }

      req.account = account;

      return next();
    });
  }
  else {
    res.status(401).json({message: 'You are unauthorized to access this resource.'});
  }

};

// endpoints

router.get('/authenticated', isAuthenticated, function (req, res) {
  res.status(200).json({message: 'mde it', accout: req.account});
});

// create account
router.post('/', function (req, res) {

  var account = Account(req.body);
  var flag = validateProvidedFields(account, requiredFields);

  if (!flag) {
    res.status(400).json({message: 'Bad account object.'});
    return;
  }

  createAccount(account, function () {
    res.status(201).json({account: account});
  });
});

// get all accounts
router.get('/', function (req, res) {

  findAllAccounts(function (err, rows, fields) {
    if (err) {
      res.status(500).json({message: 'Error executing request.'});
      return;
    }

    res.status(200).json({accounts: rows});
  });

});


// login
router.post('/login', function(req, res) {
  var credentials = {
    email: req.body.email,
    password: req.body.password
  };

  if (validateAllNonEmpty(credentials) && validateMinLength(credentials.password, 5)) {

    findAccountByEmail(credentials.email, function (err, rows, fields) {
      if (err) {
        res.status(500).json({message: 'There was an error processing your request.'});
        return;
      }
      else if (rows.length === 0) {
        res.status(401).json({message: 'Login failed - username or password incorrect. (1)'});
        return;
      }

      var account = rows[0];

      bcrypt.compare(credentials.password, account.password, function(err, isMatch) {
        if (isMatch) {

          generateAccessTokenForAccount(account.id, function (accessToken) {
            res.status(200).json({accessToken: accessToken, account: account});
          });

        }
        else {
          res.status(401).json({message: 'Login failed - username or password incorrect. (2)'});
          return;
        }

      });

    });
  }
  else {
    res.status(400).json({
      message: 'Invalid credentials.'
    });
  }
});

router.get('/logout', isAuthenticated, function(req, res) {

  deleteAllAccessTokensForAccount(req.account.id, function () {
    res.status(200).json({message: 'Successfully logged out.'});
  });


});


// GET account by id
router.get('/:accountId', function (req, res) {
  var accountId = req.params.accountId;

  if (validateNonEmpty(accountId) && validateNumeric(accountId)) {
    findAccountById(accountId, function (err, rows, fields) {

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
