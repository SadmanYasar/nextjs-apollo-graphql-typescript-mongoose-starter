import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

// const authLink = setContext((_, { headers }) => {
//     const token = localStorage.getItem('your-token');
//     return {
//         headers: {
//             ...headers,
//             authorization: token ? `bearer ${token}` : null,
//         }
//     };
// });

const httpLink = new HttpLink({
    uri: process.env.REACT_APP_GRAPHQL_URI,
});

const wsLink = new GraphQLWsLink(
    createClient({
        url: process.env.REACT_APP_GRAPHQL_URI_WS as string,
    })
);

const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    httpLink
    // authLink.concat(httpLink)
);

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: splitLink
});

export default client;
