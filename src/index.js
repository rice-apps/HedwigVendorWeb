import './index.css'

import React from 'react'
import {render} from 'react-dom'

import Routes from './Routes'

// Apollo Client Setup
import { ApolloClient, HttpLink, InMemoryCache, ApolloProvider, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';

// Apollo Subscriptions Setup
import { WebSocketLink } from '@apollo/link-ws';

// HTTP Backend Link
const httpLink = new HttpLink({
    uri: 'http://localhost:4000/graphql'
});

// WebSocket Backend Link
const wsLink = new WebSocketLink({
    uri: `ws://localhost:4000/graphql`,
    options: {
      reconnect: true
    }
});

// Uses wsLink for subscriptions, httpLink for queries & mutations (everything else)
const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink,
);

// Initialize Client
const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: splitLink
});

render(
    <ApolloProvider client={client}>
        <Routes />
    </ApolloProvider>,
    document.querySelector("#app")
)
