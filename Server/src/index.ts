import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import Schema  from './schema';
import mongoose from 'mongoose';
const cors = require("cors");


const app = express();
const port = 3000;


app.use(cors());

mongoose.connect('mongodb+srv://admin:admin@grapheql.zyz4zc4.mongodb.net/?retryWrites=true&w=majority')
mongoose.connection.once('open',()=> {
  console.log('connected to database')
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


//_____GrapheQL 
app.use('/graphql', graphqlHTTP({
  schema: Schema,
  graphiql: true, 
}));