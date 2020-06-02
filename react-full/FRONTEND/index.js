import React from 'react';
import ReactDOM from 'react-dom';
import App from './src/App';

import { BrowserRouter } from "react-router-dom"

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';



/*
    our frontend api client will make request to 
    the adress we define in the first part.
*/
const apiclient = new ApolloClient({
    uri: 'http://127.0.0.1:8000/graphql',
  });


const Init = () => (
    <ApolloProvider client={apiclient}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ApolloProvider>
)

ReactDOM.render( <Init />, document.getElementById('root'))