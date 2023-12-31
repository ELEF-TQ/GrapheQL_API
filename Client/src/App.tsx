import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Book from './components/Book';
import AddBooks from './components/AddBook';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>Reading List</h1>
        <Book />
        <AddBooks />
      </div>
    </ApolloProvider>
  );
}

export default App;
