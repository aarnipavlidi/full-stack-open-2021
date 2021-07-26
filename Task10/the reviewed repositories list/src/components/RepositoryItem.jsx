// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react'; // Otetaan käyttöön "react" niminen kirjasto sovelluksen käytettäväksi.
import { View, Text } from 'react-native'; // Otetaan käyttöön kyseiset komponentit "react-native" kirjaston kautta sovelluksen käytettäväksi.

// Alustetaan "RepositoryItem" niminen komponentti, joka suorittaa {...} sisällä olevat asiat aina,
// kun kyseiseen komponenttiin tehdään viittaus. Komponentin ideana on siis renderöidä jokainen arvo
// "repositories" muuttujan kautta tulevasta datasta takaisin käyttäjälle näkyviin. Komponentti
// "ItemSeparator" määrittää tyylin, jokaiselle eri arvolle, jonka kautta tämä komponentti pääsee
// käsiksi "item" parametrin avulla.
const RepositoryItem = ({ item }) => {

  // Komponentti renderöi (...) sisällä olevat asiat takaisin käyttäjälle näkyviin.
  return (
    <View>
      <Text>Full name: {item.fullName}</Text>
      <Text>Description: {item.description}</Text>
      <Text>Language: {item.language}</Text>
      <Text>Stars: {item.stargazersCount}</Text>
      <Text>Forks: {item.forksCount}</Text>
      <Text>Reviews: {item.reviewCount}</Text>
      <Text>Rating: {item.ratingAverage}</Text>
    </View>
  );
};

// Viedään (export) alla oleva komponentti (RepositoryItem) sovelluksen käytettäväksi, jotta esim. "App.js" tiedosto pystyy suorittamaan kyseiset funktiot.
export default RepositoryItem;
