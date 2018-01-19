const express = require('express');
const graphql = require('express-graphql');
const schema = require('./schema');

let mongoose = require('mongoose');
let localConfig = require('./dbconfig');

mongoose.Promise = global.Promise;

const app = express();

console.log(`Connecting to ${localConfig.MongodbConnection.uri} ...`);

mongoose.connect(localConfig.MongodbConnection.uri, localConfig.MongodbConnection.options);

global.db = mongoose.connection;

db.once('open', () => {
  console.info('db opend');
});

app.use('/graphql', graphql({
  schema,
  graphiql: true
}));

app.listen(4000, () => console.log('localhost:4000/graphql'));