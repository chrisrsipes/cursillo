var server = require('./server');
var ds = server.dataSources.mysql;
var lbTables = [
  'ACL',
  'AccessToken',
  'Account',
  'ApplicationInfo',
  'Contact',
  'Cursillo',
  'Image',
  'Location',
  'Parish',
  'Person',
  'Position',
  'RoleMapping',
  'Role',
  'Talk',
  'TalkLink',
  'Team',
  'Weekend',
  'WeekendPosition'
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
