// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react'; // Otetaan käyttöön "react" niminen kirjasto sovelluksen käytettäväksi.
import Constants from 'expo-constants'; // Otetaan käyttöön "Constants" komponentti => "expo-constants" kirjaston kautta sovelluksen käytettäväksi.
import { Text, StyleSheet, View, Pressable } from 'react-native'; // Otetaan käyttöön kyseiset komponentit "react-native" kirjaston kautta sovelluksen käytettäväksi.

import styling from '../styling';

// Alustetaan "styles" niminen muuttuja, joka suorittaa kyseisen funktion,
// jonka kautta se saa käyttöönsä {...} sisällä olevat tyylien arvot.
const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingBottom: Constants.statusBarHeight,
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: styling.appBarContainer.backgroundColor
  },
  containerTitle: {
    marginTop: 25,
    marginLeft: 10,
    fontFamily: styling.appBarContainerTitle.title,
    fontSize: styling.appBarContainerTitle.titleBody,
    fontWeight: styling.appBarContainerTitle.titleWeight,
    color: styling.appBarContainerTitle.titleColor
  }
});

// Alustetaan "AppBar" niminen komponentti, joka suorittaa {...} sisällä olevat asiat
// aina kun kyseiseen komponenttiin tehdään viittaus. 
const AppBar = () => {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => console.log('Repositories text was clicked!')}>
        <Text style={styles.containerTitle}>Repositories</Text>
      </Pressable>
    </View>
  );
};


// Viedään (export) alla oleva komponentti (AppBar) sovelluksen käytettäväksi, jotta esim. "App.js" tiedosto pystyy suorittamaan kyseiset funktiot.
export default AppBar;
