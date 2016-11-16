var _ = require('underscore');

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


var Validations = {
  'validateNonEmpty': validateNonEmpty,
  'validateProvidedFields': validateProvidedFields,
  'validateNumeric': validateNumeric,
  'validateMinLength': validateMinLength,
  'validateAllNonEmpty': validateAllNonEmpty
};

module.exports = Validations;
