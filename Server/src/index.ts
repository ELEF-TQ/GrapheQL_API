import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import Schema  from './schema';

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


//_____GrapheQL 
app.use('/graphql', graphqlHTTP({
  schema: Schema,
  graphiql: true, 
}));