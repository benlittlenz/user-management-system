import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import App from './App';
import { getAccessToken } from './UserToken';

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql',
  credentials: 'include',
  request: (operation) => {
    const userToken = getAccessToken()
    //Set autorization header with user access token with request
    operation.setContext({
      headers: {
        authorization: userToken ? `bearer ${userToken}` : ''
      }
    });
  }
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
