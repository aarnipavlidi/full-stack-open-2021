// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react'; // Otetaan käyttöön "react" niminen kirjasto sovelluksen käytettäväksi.
import Constants from 'expo-constants'; // Otetaan käyttöön "Constants" komponentti => "expo-constants" kirjaston kautta sovelluksen käytettäväksi.
import { Text, StyleSheet, View } from 'react-native'; // Otetaan käyttöön kyseiset komponentit "react-native" kirjaston kautta sovelluksen käytettäväksi.

import RepositoryList from './RepositoryList'; // Tuodaan "RepositoryList" (RepositoryList.jsx) niminen komponentti sovelluksen käytettäväksi.
import AppBar from './AppBar'; // Tuodaan "AppBar" (AppBar.jsx) niminen komponentti sovelluksen käytettäväksi.

// Alustetaan "styles" niminen muuttuja, joka suorittaa kyseisen funktion,
// jonka kautta se saa käyttöönsä {...} sisällä olevat tyylien arvot.
const styles = StyleSheet.create({
  appBackground: {
    backgroundColor: '#e1e4e8'
  },
});

// Alustetaan "Main" niminen komponentti, joka suorittaa {...} sisällä olevat asiat
// aina, kun kyseiseen komponenttiin tehdään viittaus.
const Main = () => {

  // Komponentti renderöi (...) sisällä olevat asiat takaisin käyttäjälle näkyviin.
  return (
    <View style={styles.appBackground}>
      <AppBar />
      <RepositoryList />
    </View>
  );
};

// Viedään (export) alla oleva komponentti (Main) sovelluksen käytettäväksi, jotta esim. "App.js" tiedosto pystyy suorittamaan kyseiset funktiot.
export default Main;
