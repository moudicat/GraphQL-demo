const { 
  GraphQLObjectType,
  GraphQlSchema,
  GraphQLInt
 } = require('graphql');

const schema = new GraphQlSchema({
  query: new GraphQLObjectType({
    name: 'test',
    fields: {
      count: {
        
      }
    }
  })
})