var mysql = require('mysql');
var express = require('express');
var _ = require('underscore');

var requiredFields = ['firstName', 'lastName', 'password', 'email'];


// create connection to db
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    database: 'cursillo'
});

var startConnection = function (cb) {
    console.log('Starting connection');
    connection.connect(cb);
};

var endConnection = function (cb) {
    console.log('Terminating connection');
    connection.end(cb);
};

var createAccount = function (account, cb) {
    
    var afterCloseCb = (function (cb) {
        return function () {
            endConnection(cb);
        };
    })(cb);
    
    var operation = (function (account, cb) {
        return function () {
            console.log('about to perform query');
            var query = connection.query('INSERT INTO Account SET ?', account, cb);
        };
    })(account, afterCloseCb);
    
    connection.query('INSERT INTO Account SET ?', account, cb);
    // startConnection(operation);
};

var Account = function (user) {
    var i, obj = {
        firstName: null,
        lastName: null,
        email: null,
        password: null,
        username: null
    };

    _.each(user, function (val, key) {
        if (obj[key] === null) {
            obj[key] = val;
        }
    });
    
    return obj;
};

var validateNonEmpty = function (field) {
    if ((field === null) || (field === undefined) || (!field && field !== false)) {
        return false;
    }
    else {
        return true;
    }
};

var validateNumeric = function (field) {
  return ((Number(field) + '') === field);
};

var validateMinLength = function (field, len) {
    field = field + '';
    
    return (field.length >= len);
};

var validateAllNonEmpty = function (object) {
    var flag = true;
    
    _.each(object, function (val, key) {
        flag = flag && validateNonEmpty(object[key]);
    });
    
    return flag;
};

var dummyAccount = {
    firstName: 'John',
    lastName: 'Doe',
    username: 'john.doe',
    email: 'johndoe@host.com',
    created: new Date(),
    lastUpdated: new Date(),
    id: 1
};

var router = express.Router();

// create account
router.post('/', function (req, res) {

    var flag = true, account = Account(req.body);

    // validate required fields
    _.each(requiredFields, function (val) {
        flag = flag && validateNonEmpty(account[val]);
        if (!flag) 
            console.log('val', val);
    });

    if (!flag) {
        res.status(400).json({message: 'Bad account object.'});
        return;
    }
    
    var cb = function () {
        res.status(201).json({account: account});
    };
    
    console.log('account', account);
    createAccount(account, cb);
});

router.get('/:accountId', function (req, res) {
    var accountId = req.params.accountId;
    
    if (validateNonEmpty(accountId) && validateNumeric(accountId)) {
        res.status(200).json(dummyAccount);
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
