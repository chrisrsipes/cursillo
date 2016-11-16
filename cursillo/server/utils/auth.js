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

  // gets the model from the base url
  var parseModel = function (baseUrl) {
    var raw, formatted, ind;

    ind = baseUrl.indexOf('api/');

    if (ind !== -1) {
      raw = baseUrl.substring(ind + 4);
      formatted = raw.substring(0, raw.length - 1).toLowerCase();
    }

    return formatted;
  };

  // checks if an acl has a permission for the model
  var isAuthorized = function (model, acls) {
    var i;

    for (i = 0; i < acls.length; i++) {
      var acl = acls[i];

      if ((acl.model === '*' || acl.model.toLowerCase() === model) && (acl.accessType === 'GRANT')) {
        return true;
      }

    }

    return false;
  };

  // determines if principal has access to resource
  var parseAccess = function (err, acls) {
    var model = parseModel(req.baseUrl);

    if (model && isAuthorized(model, acls)) {
      next();
    }
    else {
      res.status(401).json({message: 'Unauthorized to access this resource.'});
    }

  };
  
  Role.findAssignedAccessFromUser(req.account.id, parseAccess);
};




var auth = {
  'authenticate': authenticate,
  'authorize': authorize

};

module.exports = auth;
