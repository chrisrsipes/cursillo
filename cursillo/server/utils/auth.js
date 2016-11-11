var validations = require('../utils/Validations');
var Account = require('../models/account');

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




var auth = {
  'authenticate': authenticate

};

module.exports = auth;
