const {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList,
  GraphQLID,
  GraphQLString,
  GraphQLInt
 } = require('graphql');
 const User = require('./mongoSchema');

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
      user: {
        type: new GraphQLList(new GraphQLObjectType({
          name: 'User',
          description: 'A user',
          fields: () => ({
            _id: {
              type: new GraphQLNonNull(GraphQLID)
            },
            name: {
              type: GraphQLString
            },
            age:{
              type: GraphQLInt
            },
          })
        })),

        resolve: () => {
          return new Promise((resolve, reject) => {
            User.find({}).exec((err, res) => {
              err ? reject(err) : resolve(res);
            })
          })
        }
      }
    })
  })
});

module.exports = schema;