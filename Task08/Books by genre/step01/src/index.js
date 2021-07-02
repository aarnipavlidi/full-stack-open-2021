// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react' // Otetaan käyttöön "react" niminen kirjasto sovellusta varten.
import ReactDOM from 'react-dom' // Otetaan käyttöön "react-dom" niminen kirjasto sovellusta varten.
import App from './App' // Otetaan käyttöön "App" (App.js) niminen komponetti, joka sijaitsee => "./src/App.js".

import './index.css' // Sovellus ottaa "index.css" (tyylitiedosto) tiedoston sisällön käyttöönsä.

import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client' // Sovellus ottaa käyttöön kyseiset funktiot "@apollo/client" kirjaston kautta.

import { setContext } from 'apollo-link-context' // Sovellus ottaa käyttöön kyseisen funktion "apollo-link-context" kirjaston kautta.

// Alustetaan muuttuja "authLink", joka suorittaa kyseisen funktion.
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('current-user-token') // Alustetaan muuttuja "token", joka hakee siis "Local Storage":sta objektin arvon => "current-user-token".
  // Funktio palauttaa takaisin {...} sisällä olevat asiat, jos "token" arvo on tyhjä eli
  // se ei löydä "Local Storage":sta mitään dataa, niin palautetaan takaisin "null". Muussa
  // tapauksessa muuttujan alle tulee => 'bearer ${token}'.
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null,
    }
  }
})

// Nyt, koska olemme alustaneet backendin, niin että jos haluamme lisätä uuden kirjan tai
// muokata nykyistä kirjailijaa, niin se vaatii kirjautuneen käyttäjän "token" arvon.
// Tämän vuoksi lisätty "authLink" muuttuja, joka palauttaa "token":in arvon käyttäjän
// tekemään pyyntöön sekä muokattu "client" muuttujaa, että miten Apollo kommunikoi
// palvelimen (MongoDB) kanssa!

// Alustetaan muuttuja "database", joka suorittaa kyseisen funktion.
const database = new HttpLink({ // https://www.apollographql.com/docs/react/api/link/apollo-link-http/#httplink-constructor-options
  uri: 'http://localhost:4000' // Muista laittaa aikaisemmassa tehtävässä tehty palvelin erikseen päälle! :)
})

const client = new ApolloClient({ // Alustetaan muuttuja "client", joka on yhtä kuin kyseinen funktio.
  cache: new InMemoryCache(), // https://www.apollographql.com/docs/react/caching/cache-configuration/#data-normalization
  link: authLink.concat(database) // Objekti "link" määrittelee siis, että miten Apollo on yhteydessä palvelimeen.
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
