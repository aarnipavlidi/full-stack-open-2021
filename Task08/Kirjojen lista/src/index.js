// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react' // Otetaan käyttöön "react" niminen kirjasto sovellusta varten.
import ReactDOM from 'react-dom' // Otetaan käyttöön "react-dom" niminen kirjasto sovellusta varten.
import App from './App' // Otetaan käyttöön "App" (App.js) niminen komponetti, joka sijaitsee => "./src/App.js".

import './index.css' // Sovellus ottaa "index.css" (tyylitiedosto) tiedoston sisällön käyttöönsä.

import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client' // Sovellus ottaa käyttään kyseiset funktiot "@apollo/client" kirjaston kautta.

const client = new ApolloClient({ // Alustetaan muuttuja "client", joka on yhtä kuin kyseinen funktio.
  cache: new InMemoryCache(), // https://www.apollographql.com/docs/react/caching/cache-configuration/#data-normalization
  link: new HttpLink({ // https://www.apollographql.com/docs/react/api/link/apollo-link-http/#httplink-constructor-options
    uri: 'http://localhost:4000' // Muista laittaa aikaisemmassa tehtävässä tehty palvelin erikseen päälle! :)
  })
})

// Muuttujan "client" avulla me saadaan siis kyseinen sovellus toimimaan
// GrapQL-palvelimen kanssa ja jotta jokainen sovelluksen komponentti
// pääsee käsiksi palvelimen dataan, niin meidän täytyy kääriä "App"
// komponetti => "ApolloProvider" komponentin lapseksi. Lisää tästä löytyy:
// https://www.apollographql.com/docs/react/api/react/hooks/#the-apolloprovider-component

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)
