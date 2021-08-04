// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React, { useState } from 'react'; // Otetaan käyttöön "react" niminen kirjasto sovelluksen käytettäväksi.
import { FlatList, View, StyleSheet } from 'react-native'; // Otetaan käyttöön kyseiset komponentit "react-native" kirjaston kautta sovelluksen käytettäväksi.

import RepositoryItem from './RepositoryItem'; // Tuodaan "RepositoryItem" (RepositoryItem.jsx) niminen komponentti sovelluksen käytettäväksi.
import FilterRepositoriesHeader from './FilterRepositoriesHeader'; // Tuodaan "FilterRepositoriesHeader" (FilterRepositoriesHeader.jsx) niminen komponentti sovelluksen käytettäväksi.
import useRepositories from '../hooks/useRepositories'; // Alustetaan "useRepositories" niminen muuttuja, joka hyödyntää "useRepositories.js" tiedoston sisältöä.

// Alustetaan "styles" niminen muuttuja, joka suorittaa kyseisen funktion eli
// kun data renderöidään takaisin käyttäjälle, niin jokaisen arvon väliin
// tulee 20px tyhjää tilaa.
const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

// Alustetaan "RepositoryList" niminen komponentti, joka suorittaa {...} sisällä olevat asiat
// aina, kun kyseiseen komponenttiin tehdään viittaus.
const RepositoryList = () => {

  const [currentFilter, setCurrentFilter] = useState('Latest repositories'); // Alustetaan "currentFilter" muuttuja tilaan, joka saa oletuksena kyseisen tekstin arvoksi.

  const [orderByState, setOrderByState] = useState('CREATED_AT'); // Alustetaan "orderByState" muuttuja tilaan, joka saa oletuksena kyseisen tekstin arvoksi.
  const [orderDirectionState, setOrderDirectionState] = useState('DESC'); // Alustetaan "orderDirectionState" muuttuja tilaan, joka saa oletuksena kyseisen tekstin arvoksi.

  // Alustetaan "repositories" niminen muuttuja, jonka olemme alustaneet "useRepositories"
  // hookin kautta, missä kyseinen hook palauttaa takaisin "repositories" muuttujan datan
  // tämän komponentin käytettäväksi. Muuttuna avulla päästään käsiksi palvelimen kautta
  // tulevaan dataan, jotta voimme näyttää datan takaisin käyttäjälle näkyviin. Muutettu
  // tehtävää "Exercise 10.23: sorting the reviewed repositories list" varten alla olevaa
  // koodia niin, että sovellus suorittaa kyseisen hookin (...) sisällä annetuilla parametrin
  // arvoilla, jonka kautta itse query eli "GET_ALL_REPOSITORIES" suoritetaan ja haetaan
  // palvelimesta data takaisin käyttäjälle näkyviin. Aina, kun "orderByState" ja
  // "orderDirectionState" muuttujan tilaa muutetaan, niin kyseinen hookki suorittaa
  // queryn uudestaan ja renderöi "oikean dataan" takaisin käyttäjälle näkyviin.
  const { repositories } = useRepositories(orderByState, orderDirectionState);

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
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      keyExtractor={(item, index) => item.fullName}
      renderItem={({ item }) => <RepositoryItem item={item} />}
      ListHeaderComponent={() => <FilterRepositoriesHeader currentFilter={currentFilter} setCurrentFilter={setCurrentFilter} setOrderByState={setOrderByState} setOrderDirectionState={setOrderDirectionState} />}
    />
  );
};

// Viedään (export) alla oleva komponentti (RepositoryList) sovelluksen käytettäväksi, jotta esim. "App.js" tiedosto pystyy suorittamaan kyseiset funktiot.
export default RepositoryList;
