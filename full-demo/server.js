const express = require('express');
const graphql = require('express-graphql');
const schema = require('./schema');

let mongoose = require('mongoose');
let localConfig = require('./dbconfig');
let conn = mongoose.connection;

mongoose.Promise = global.Promise;

const connDB = async () => {
  conn.on('error', function(err) {
    console.error('mongodb connection error:', err);
    process.exit(1);
  });

  conn.once('open', function() {
      console.info('Connected to Mongodb.');
  });

  console.log(`Connecting to ${localConfig.MongodbConnection.uri} ...`);

  let db = mongoose.createConnection(localConfig.MongodbConnection.uri, localConfig.MongodbConnection.options);

  if (db) {
    global.db = db;
  } else {
    console.error('mongodb connected failed!');
  }
}

connDB();

app.use('/graphql', graphql({
  schema,
  graphiql: true
}));

const app = express();

app.listen(4000, () => console.log('localhost:4000/graphql'));