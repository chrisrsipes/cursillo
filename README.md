## Cursillo Weekend Management System

### Dependencies
1. node.js
2. bower
3. MySQL with an open connection on localhost:3036
4. Schema in MySQL database named 'cursillo'

### Build & Deploy

These steps should be executed from the command line.
 
1. Install dependencies: in `/cursillo_slc`, run `npm install`.  In `/cursillo`, run `npm install && bower install`.
2. Generate tables: in `/cursillo_slc`, run `node server/create-lb-tables.js`.
3. Seed tables: in `/cursillo`, run `node server/utils/seed.js`.  
4. Start up the application: in `/cursillo`, run `node server/server.js`

The app will now be running at http://localhost:8080/.  The Swagger documentation can be found at http://localhost:8080/explorer.

