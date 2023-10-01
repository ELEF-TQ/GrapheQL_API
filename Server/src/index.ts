import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql';
import Schema  from './schema';

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


//_____GrapheQL :
const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {},
  }),
});

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true, 
}));