// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react'; // Otetaan käyttöön "react" niminen kirjasto sovelluksen käytettäväksi.
import { NativeRouter } from 'react-router-native'; // Otetaan kyseiset komponentit käyttöön "react-router-native" kirjaston kautta sovelluksen käytettäväksi.

import { ApolloProvider } from '@apollo/client'; // Otetaan käyttöön kyseiset komponentit "@apollo/client" kirjaston kautta sovelluksen käytettäväksi.
import createApolloClient from './src/utils/apolloClient'; // Alustetaan "createApolloClient" niminen muuttuja, joka hyödyntää "apolloClient.js" tiedoston sisältöä.

import Main from './src/components/Main'; // Tuodaan "Main" (Main.jsx) niminen komponentti sovelluksen käytettäväksi.

const apolloClient = createApolloClient(); // Alustetaan "apolloClient" muuttuja, joka suorittaa kyseisen funktion.

// Alustetaan "App" niminen komponetti, joka suorittaa {...} sisällä olevat asiat aina,
// kun kyseiseen komponenttiin tehdään viittaus.
const App = () => {
  return (
    <NativeRouter>
      <ApolloProvider client={apolloClient}>
        <Main />
      </ApolloProvider>
    </NativeRouter>
  );
};

// Viedään (export) alla oleva komponentti (App) sovelluksen käytettäväksi, jotta esim. "App.js" tiedosto pystyy suorittamaan kyseiset funktiot.
export default App;
