const express = require('express');
const graphql = require('express-graphql');
const { buildSchema } = require('graphql');

const schema = buildSchema(
  `type Query {
    hello: String
  }`
);

const root = { hello: () => 'Hello world!' };

const app = express();

app.use('/graphql', graphql({
  schema: schema,
  rootValue: root,
  graphiql: true
}));

app.listen(4000, () => console.log('localhost:4000/graphql'));