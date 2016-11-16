var connection = require('./connection');
var seedObj = require('./seed.json');
var _ = require('underscore');

var count = {};
var completed = {};

_.each(seedObj, function (values, key) {

  completed[key] = false;
  count[key] = 0;

  var truncateQuery = ['DELETE FROM ', key].join('');
  var insertQuery = ['INSERT INTO ', key, ' SET ?'].join('');

  var finish = function () {
    var flag = true;

    _.each(completed, function (val) {
      flag = flag && val;
    });

    if (flag) {
      process.exit()
    }
  };

  var finishInsert = (function (table) {

    return function () {
      console.log('finished inserting ' + table);

      count[key]++;
      if (count[key] === seedObj[key].length) {
        completed[key] = true;
        finish();
      }

    };

  })(key);

  var startInsert = (function (insertQuery, values, table) {

    return function () {
      console.log('finished truncating ' + table);

      _.each(values, function (value) {
        connection.query(insertQuery, value, finishInsert);
      });
    };

  })(insertQuery, values, key);

  connection.query(truncateQuery, startInsert);
});
