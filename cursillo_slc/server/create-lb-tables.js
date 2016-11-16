var server = require('./server');
var ds = server.dataSources.cursillo;
var lbTables = ['AccessToken',
  'ACL', 'RoleMapping',
  'Role', 'Account',
  'Image', 'Parish',
  'Position', 'Spiritual',
  'Spouse','Team',
  'Weekend', 'WeekendPosition'
];

var cb = function (er) {
  if (er)
    throw er;
  
  console.log('Loopback tables [' + lbTables + '] created in ', ds.adapter.name);
  ds.disconnect();
};

if (ds.connected) {
  ds.automigrate(lbTables, cb);
}
else {
  ds.once('connected', function() {
    ds.automigrate(lbTables, cb)
  });
} 
