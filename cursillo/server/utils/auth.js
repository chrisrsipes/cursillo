var validations = require('../utils/validations');
var Account = require('../models/account');
var Role = require('../models/role');


var authenticate = function (req, res, next) {

  var proceed = function (err, account) {

    if (err) {
      res.status(500).json({message: 'Error executing request.'});
      return;
    }

    req.account = account;

    return next();

  };

  var stop = function () {
    res.status(401).json({message: 'You are unauthorized to access this resource.'});
  };

  if (validations.validateNonEmpty(req.query.authorization)) {
    Account.findAccountFromAccessToken(req.query.authorization, proceed);
  }
  else {
    stop();
  }

};

var authorize = function (req, res, next) {

  // require request is authenticated already
  if (!req || !req.account || !req.account.id) {
    throw Error('Request is in invalid state for authorization.');
  }

  var parseAccess = function (err, access) {
    console.log('access', access);
    console.log('base', req.baseUrl);

    next();
  };

  Role.findAssignedAccessFromUser(req.account.id, parseAccess);
};




var auth = {
  'authenticate': authenticate,
  'authorize': authorize

};

module.exports = auth;
