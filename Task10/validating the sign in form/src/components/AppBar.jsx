// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react'; // Otetaan käyttöön "react" niminen kirjasto sovelluksen käytettäväksi.
import { Link } from 'react-router-native'; // Otetaan kyseiset komponentit käyttöön "react-router-native" kirjaston kautta sovelluksen käytettäväksi.
import Constants from 'expo-constants'; // Otetaan käyttöön "Constants" komponentti => "expo-constants" kirjaston kautta sovelluksen käytettäväksi.
import { Text, StyleSheet, ScrollView, View, Pressable } from 'react-native'; // Otetaan käyttöön kyseiset komponentit "react-native" kirjaston kautta sovelluksen käytettäväksi.

import styling from '../styling'; // Alustetaan "styling" niminen muuttuja, jonka avulla sovellus ottaa erillisen tyylitiedoston (styling.js) käyttöönsä.

// Alustetaan "styles" niminen muuttuja, joka suorittaa kyseisen funktion,
// jonka kautta se saa käyttöönsä {...} sisällä olevat tyylien arvot.
const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingBottom: Constants.statusBarHeight,
    backgroundColor: styling.appBarContainer.backgroundColor,
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
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
// aina kun kyseiseen komponenttiin tehdään viittaus. Tehtävää "Exercise 10.7: scrollable app bar"
// varten lisätty alla olevaan koodiin "ScrollView" komponentti, tämän avulla jos lisäämme
// myöhemmin "liikaa linkkejä", niin käyttäjällä on mahdollisuus "scrollata" sivuttain,
// jotta näkee kaikki muut linkit. Ilman tätä linkit jäisivät näytön ulkopuolelle ja sitä
// kautta ei olisi käyttäjällä mahdollisuutta esim. kirjautua ulos yms. 
const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Pressable onPress={() => console.log('Repositories text was clicked!')}>
          <Link to="/">
            <Text style={styles.containerTitle}>Repositories</Text>
          </Link>
        </Pressable>
        <Pressable onPress={() => console.log('Login text was clicked!')}>
          <Link to="login">
            <Text style={styles.containerTitle}>Login</Text>
          </Link>
        </Pressable>
      </ScrollView>
    </View>
  );
};

// Viedään (export) alla oleva komponentti (AppBar) sovelluksen käytettäväksi, jotta esim. "App.js" tiedosto pystyy suorittamaan kyseiset funktiot.
export default AppBar;
