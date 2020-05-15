import './index.css'

import React from 'react'
import {render} from 'react-dom'

import App from './App'

// Apollo Client Setup
import { ApolloClient, HttpLink, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:4000/graphql',
  })
});

render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.querySelector("#app")
)
