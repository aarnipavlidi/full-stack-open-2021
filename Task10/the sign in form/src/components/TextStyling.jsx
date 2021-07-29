// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react'; // Otetaan käyttöön "react" niminen kirjasto sovelluksen käytettäväksi.
import { Text as NativeText, StyleSheet } from 'react-native'; // Otetaan käyttöön kyseiset komponentit "react-native" kirjaston kautta sovelluksen käytettäväksi.

import styling from '../styling'; // Alustetaan "styling" niminen muuttuja, jonka avulla sovellus ottaa erillisen tyylitiedoston (styling.js) käyttöönsä.

// Alustetaan "styles" niminen muuttuja, joka suorittaa kyseisen funktion,
// jonka kautta se saa käyttöönsä {...} sisällä olevat tyylien arvot.
const styles = StyleSheet.create({
  text: {
    color: styling.colors.textPrimary,
    fontSize: styling.fontSizes.body,
    fontFamily: styling.fonts.main,
    fontWeight: styling.fontWeights.normal,
  },
  colorTextSecondary: {
    color: styling.colors.textSecondary,
    flexWrap: 'wrap'
  },
  colorPrimary: {
    color: styling.colors.primary,
  },
  fontSizeSubheading: {
    fontSize: styling.fontSizes.subheading,
  },
  fontWeightBold: {
    fontWeight: styling.fontWeights.bold,
  },
});

// Alustetaan "TextStyling" komponetti, joka suorittaa {...} sisällä olevat asiat
// aina, kun kyseiseen komponenttiin tehdään viittaus. Jos komponentin viittauksen
// yhteydessä esim. "color" parametrin arvo on yhtä kuin => "primary", niin
// komponentti palauttaa takaisin "styles.colorPrimary" tyylin käyttäjälle.
const TextStyling = ({ color, fontSize, fontWeight, style, ...props }) => {
  const textStyle = [
    styles.text,
    color === 'textSecondary' && styles.colorTextSecondary,
    color === 'primary' && styles.colorPrimary,
    fontSize === 'subheading' && styles.fontSizeSubheading,
    fontWeight === 'bold' && styles.fontWeightBold,
    style,
  ];

  // Komponentti renderöi (...) sisällä olevan asian takaisin käyttäjälle.
  return (
    <NativeText style={textStyle} {...props} />
  );
}

// Viedään (export) alla oleva komponentti (TextStyling) sovelluksen käytettäväksi, jotta esim. "App.js" tiedosto pystyy suorittamaan kyseiset funktiot.
export default TextStyling;
