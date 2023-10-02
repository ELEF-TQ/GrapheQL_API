import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLList ,GraphQLNonNull } from 'graphql';
import _ from 'lodash';

import AUTHOR  from '../models/Author' ;
import BOOK from '../models/Book' ;



const AuthorType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent ,_) {
         return BOOK.find({ authorId: parent.id})
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
      resolve(parent ,_) {
        return AUTHOR.findById(parent.authorId);
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
      resolve(_, args) {
        return BOOK.findById(args.id);
      },
    },
   
    //____Author :
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(_,args) {
        return AUTHOR.findById(args.id);
      },
    },
   
    //____Books :
    books: {
      type: new GraphQLList(BookType),
      resolve() {
        return BOOK.find({}) ;
      },
    },
    
    //____Authors :
    authors: {
      type: new GraphQLList(AuthorType),
      resolve() {
        return AUTHOR.find({}) ;
      },
    },

  },
});


const Mutation: GraphQLObjectType =  new GraphQLObjectType({
  name: 'mutation',
  fields: {
    //____ADD-AUTHOR :
    AddAuthor : {
      type: AuthorType,
      args:{
        name: {type:new GraphQLNonNull(GraphQLString)},
        age: {type:new GraphQLNonNull(GraphQLInt) }
      },
      resolve(_,args) {
        let author = new AUTHOR({
          name: args.name,
          age: args.age
        })
        return author.save();

      },
    },

     //____ADD-BOOK :
     AddBook : {
      type: BookType,
      args:{
        name: {type:new GraphQLNonNull(GraphQLString) },
        genre: {type:new GraphQLNonNull(GraphQLString) },
        authorId: {type:new GraphQLNonNull(GraphQLID) }
      },
      resolve(_,args) {
        let book = new BOOK({
          name: args.name,
          genre: args.genre,
          authorId : args.authorId
        })
        return book.save();

      },
    }


  }
})




const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

export default schema;
