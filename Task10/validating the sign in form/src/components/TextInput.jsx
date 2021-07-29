// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react'; // Otetaan käyttöön "react" niminen kirjasto sovelluksen käytettäväksi.
import { TextInput as NativeTextInput, View, Text, StyleSheet } from 'react-native'; // Otetaan käyttöön kyseiset komponentit "react-native" kirjaston kautta sovelluksen käytettäväksi.

// Alustetaan "loginValidationStyling" niminen muuttuja, joka suorittaa kyseisen funktion,
// jonka kautta se saa käyttöönsä {...} sisällä olevat tyylien arvot.
const loginValidationStyling = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center'
  },
  contentNormal: {
    width: '91%',
    marginTop: 15,
    height: 40,
    borderWidth: 2,
    borderColor: 'grey'
  },
  contentError: {
    width: '91%',
    marginTop: 15,
    height: 40,
    borderWidth: 2,
    borderColor: '#d73a4a'
  },
  contentErrorMessage: {
    width: '91%',
    marginTop: 5,
    color: '#d73a4a'
  },
});

// Alustetaan "TextInput" niminen komponentti, joka suorittaa {...} sisällä olevat
// asiat aina, kun kyseiseen komponenttiin tehdään viittaus.
const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [style];

  // Kun käyttäjä yrittää kirjautua sisään sovellukseen ja sen aikana
  // tietty kenttä ei toteuta sille annettuja ehtoja, niin komponentti
  // renderöi alla olevan if-ehdon takaisin käyttäjälle näkyviin.
  // Muussa tapauksessa renderöidään "normaali" kenttä takaisin käyttäjälle.
  if (error) {
    return (
      <View style={loginValidationStyling.container}>
        <NativeTextInput style={loginValidationStyling.contentError} {...props} />
        <Text style={loginValidationStyling.contentErrorMessage}>{error}</Text>
      </View>
    );
  };

  // Jos yllä oleva ehto ei toteudu, niin renderöidään (...) sisällä olevat asiat takaisin käyttäjälle.
  return (
    <View style={loginValidationStyling.container}>
      <NativeTextInput style={loginValidationStyling.contentNormal} {...props} />
    </View>
  );
};

// Viedään (export) alla oleva komponentti (TextInput) sovelluksen käytettäväksi, jotta esim. "App.js" tiedosto pystyy suorittamaan kyseiset funktiot.
export default TextInput;
