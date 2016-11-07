var mysql = require('mysql');
var express = require('express');
var _ = require('underscore');

var router = express.Router();

// Schema
var requiredFields = ['firstName', 'lastName', 'password', 'email'];

var Account = function (user) {
    var obj = {
        firstName: null,
        lastName: null,
        email: null,
        password: null,
        username: null
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
    connection.query('INSERT INTO Account SET ?', account, cb);
};

var findAccountById = function (accountId, cb) {
    connection.query('SELECT * FROM Account WHERE id = ?', [accountId], cb);
};


// sample data

var dummyAccount = {
    firstName: 'John',
    lastName: 'Doe',
    username: 'john.doe',
    email: 'johndoe@host.com',
    created: new Date(),
    lastUpdated: new Date(),
    id: 1
};


// endpoints

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

// login
router.post('/login', function(req, res) {
    var credentials = {
        email: req.body.email,
        password: req.body.password
    };

    if (validateAllNonEmpty(credentials) && validateMinLength(credentials.password, 5)) {
        res.status(201).json({
            user: dummyAccount,
            id: 'accesstoken1',
            createdDate: new Date(),
            ttl: 1209600000
        });
    }
    else {
        res.status(400).json({
            message: 'Invalid credentials.'
        });
    }
});

module.exports = router;
