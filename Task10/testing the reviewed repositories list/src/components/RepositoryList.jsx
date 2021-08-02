// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React, { useState, useEffect } from 'react'; // Otetaan käyttöön "react" niminen kirjasto sovelluksen käytettäväksi.
import { FlatList, View, Text, StyleSheet } from 'react-native'; // Otetaan käyttöön kyseiset komponentit "react-native" kirjaston kautta sovelluksen käytettäväksi.

import RepositoryItem from './RepositoryItem'; // Tuodaan "RepositoryItem" (RepositoryItem.jsx) niminen komponentti sovelluksen käytettäväksi.
import useRepositories from '../hooks/useRepositories'; // Alustetaan "useRepositories" niminen muuttuja, joka hyödyntää "useRepositories.js" tiedoston sisältöä.

// Alustetaan "styles" niminen muuttuja, joka suorittaa kyseisen funktion eli
// kun data renderöidään takaisin käyttäjälle, niin jokaisen arvon väliin
// tulee 20px tyhjää tilaa.
const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

// Alustetaan "ItemSeparator" niminen komponentti, joka suorittaa (...) sisällä olevat
// asiat aina, kun kyseiseen komponenttiin tehdään viittaus. Komponentti saa myös
// käyttöönsä ({...}) sisällä olevat parametrien arvot. Nämä viittaavaat "repositories"
// muuttujan kautta tulevan datan objektien arvoihin, jonka kautta "RepositoryItem"
// komponentti pystyy renderöidään jokaisen "uniikin arvon" omalle "laatikolle".
const ItemSeparator = ({ fullName, description, language, forksCount, stargazersCount, ratingAverage, reviewCount, ownerAvatarUrl }) => (
  <View style={styles.separator}>
    <Text>{fullName}</Text>
    <Text>{description}</Text>
    <Text>{language}</Text>
    <Text>{stargazersCount}</Text>
    <Text>{forksCount}</Text>
    <Text>{reviewCount}</Text>
    <Text>{ratingAverage}</Text>
    <Text>{ownerAvatarUrl}</Text>
  </View>
);

// Alustetaan "RepositoryList" niminen komponentti, joka suorittaa {...} sisällä olevat asiat
// aina, kun kyseiseen komponenttiin tehdään viittaus.
const RepositoryList = () => {

  // Alustetaan "repositories" niminen muuttuja, jonka olemme alustaneet "useRepositories"
  // hookin kautta, missä kyseinen hook palauttaa takaisin "repositories" muuttujan datan
  // tämän komponentin käytettäväksi. Muuttuna avulla päästään käsiksi palvelimen kautta
  // tulevaan dataan, jotta voimme näyttää datan takaisin käyttäjälle näkyviin.
  const { repositories } = useRepositories();

  // Alustetaan "repositoryNodes" muuttuja, joka on yhtä kuin "repositories" muuttuja,
  // jos muuttuja on "tyhjä" eli ei ole dataa, niin palautetaan takaisin "[]" eli
  // tyhjä taulukko ja muuussa tapauksessa suoritetaan alla olevan kyseinen funktio.
  const repositoryNodes = repositories
    ? repositories.edges.map(results => results.node)
    : [];

  // Komponentti "RepositoryList" renderöi (...) sisällä olevat asiat takaisin käyttäjälle näkyviin.
  // "FlatList" komponentti saa käyttöönsä alla olevat propsien arvot missä "data" määrittää mitä
  // dataa halutaan näyttää käyttäjälle, "ItemSeparatorComponent" määrittää, että missä muodossa
  // data näytetään (tyyli yms.) ja "renderItem" renderöi jokaisen arvon "data" propsin kautta,
  // jotka noudattavat "ItemSeparatorComponent" komponentin rakennetta. Lisätty tehtävää varten
  // eli "Exercise 10.11: fetching repositories with Apollo Client" => "keyExtractor" propsi, koska
  // ilman sitä tuli "VirtualizedList: missing keys for items..." erroria terminaaliin näkyviin!
  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={(item, index) => item.fullName}
      renderItem={RepositoryItem}
    />
  );
};

// Viedään (export) alla oleva komponentti (RepositoryList) sovelluksen käytettäväksi, jotta esim. "App.js" tiedosto pystyy suorittamaan kyseiset funktiot.
export default RepositoryList;
