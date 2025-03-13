import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
// Important for API Consumption: To enable interaction with our GraphQL API on the front end, we utilize these tools to develop the client-side behavior
import { ApolloClient, InMemoryCache, ApolloProvider,createHttpLink } from '@apollo/client';
import { Outlet } from 'react-router-dom';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: '/graphql',
});

// const httpLink = createHttpLink({
//   uri: 'http://localhost:3001/graphql',
// });

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    // Important for API Consumption: Wrap your component tree with the ApolloProvider component to enable access to the ApolloClient from anywhere within the application
    <ApolloProvider client={client}>
      <div>
        <div>
          <Outlet />
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
