import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLList } from 'graphql';
import _ from 'lodash';

const authorsData = [
  { id: '1', name: 'Harper Lee', age: 26 },
  { id: '2', name: 'George Orwell', age: 45 },
  { id: '3', name: 'Jane Austen', age: 31 },
];

const booksData = [
  { id: '1', name: 'To Kill a Mockingbird', genre: 'Fiction', authorId: '1' },
  { id: '2', name: '1984', genre: 'Dystopian', authorId: '2' },
  { id: '3', name: 'Pride and Prejudice', genre: 'Classic', authorId: '1' },
  { id: '4', name: 'The Great Gatsby', genre: 'Classic', authorId: '3' },
  { id: '5', name: 'The Catcher in the Rye', genre: 'Fiction', authorId: '3' },
  { id: '6', name: 'Lord of the Rings', genre: 'Fantasy', authorId: '2' },
];

const AuthorType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return _.filter(booksData, { authorId: parent.id });
      },
    },
  }),
});

const BookType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return _.find(authorsData, { id: parent.authorId });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {

    //____Book :
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(booksData, { id: args.id });
      },
    },
   
    //____Author :
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(authorsData, { id: args.id });
      },
    },
   
    //____Books :
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return booksData;
      },
    },
    
    //____Authors :
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return authorsData;
      },
    },

  },
});


const schema = new GraphQLSchema({
  query: RootQuery,
});

export default schema;
