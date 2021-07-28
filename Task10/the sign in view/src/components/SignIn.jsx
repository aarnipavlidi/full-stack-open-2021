// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react'; // Otetaan käyttöön "react" niminen kirjasto sovelluksen käytettäväksi.
import { View, StyleSheet } from 'react-native'; // Otetaan käyttöön kyseiset komponentit "react-native" kirjaston kautta sovelluksen käytettäväksi.

import TextStyling from './TextStyling'; // Otetaan käyttöön "TextStyling" komponentti (TextStyling.jsx) sovelluksen käytettäväksi.

// Alustetaan "container" niminen muuttuja, joka suorittaa kyseisen funktion,
// jonka kautta se saa käyttöönsä {...} sisällä olevat tyylien arvot.
const container = StyleSheet.create({
  container: {
    flexGrow: 1
  }
});

// Alustetaan "SignIn" niminen komponentti, joka suorittaa {...} sisällä olevat asiat aina,
// kun kyseiseen komponenttiin tehdään viittaus. Kun käyttäjä haluaa kirjautua sisään
// sovellukseen, niin käyttäjälle renderöidään kyseisen komponentin näkymä, jonka
// kautta käyttäjä voi kirjautua sisään sovellukseen. "Main" komponentissa olemme
// lisänneet "<Route>...</Route>", jonka avulla sovellus osaa renderöidä "oikean"
// sisällön takaisin, riippuen siitä mitä painiketta (AppBar) käyttäjä on klikannut.
const SignIn = () => {
  return (
    <View style={container.container}>
      <TextStyling>The sign in view</TextStyling>
    </View>
  );
};

// Viedään (export) alla oleva komponentti (SignIn) sovelluksen käytettäväksi, jotta esim. "App.js" tiedosto pystyy suorittamaan kyseiset funktiot.
export default SignIn;
