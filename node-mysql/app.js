var mysql = require('mysql');

// create connection to db
var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  database: 'sitepoint'
});

var findEmployees = function (cb) {
  connection.query('CALL sp_employee_getall()', cb);
};

// terminates connection
var endConnection = function () {
  connection.end(function (err) {
    console.log('Connection terminated');
  });
};

// initiates connection
var startConnection = function () {

  connection.connect(function (err) {
    if (err) {
      console.log('Error connecting', err);
      return;
    }
  
    console.log('Connection established');

    var cb = function (err, data) {
      if (err)
        throw err;
  
      var rows = data[0];
  
      console.log('Data received');
      console.log(rows);
  
    };
  
    findEmployees(cb);
    endConnection();
  });

};

startConnection();
