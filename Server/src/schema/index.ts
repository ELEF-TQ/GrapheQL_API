import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql';
import { graphqlHTTP } from 'express-graphql';
var _ = require('lodash');


const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});


const booksData = [
  { id: '1', name: 'Book 1', genre: 'Genre 1' },
  { id: '2', name: 'Book 2', genre: 'Genre 2' },
  { id: '3', name: 'Book 3', genre: 'Genre 3' },
];

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    books: {
      type: new GraphQLList(BookType),
      resolve() {
        return booksData; 
      },
    },
    book: {
      type: BookType,
      args: {
        id: { type: GraphQLString },
      },
      resolve(parent, args) {
       return _find(booksData, { id : args.id});
      },
    },
  },
});


const schema = new GraphQLSchema({
  query: RootQuery,
});

export default schema;
function _find(booksData: { id: string; name: string; genre: string; }[], arg1: { id: any; }): unknown {
  throw new Error('Function not implemented.');
}

