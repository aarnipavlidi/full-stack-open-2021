// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React, { useState } from 'react'; // Otetaan käyttöön "react" niminen kirjasto sovelluksen käytettäväksi.
import { useDebounce } from 'use-debounce'; // Alustetaan "useDebounce" funktio, joka hyödyntää "use-debounce" kirjaston sisältöä sovelluksen aikana.
import { FlatList, View, StyleSheet } from 'react-native'; // Otetaan käyttöön kyseiset komponentit "react-native" kirjaston kautta sovelluksen käytettäväksi.

import RepositoryItem from './RepositoryItem'; // Tuodaan "RepositoryItem" (RepositoryItem.jsx) niminen komponentti sovelluksen käytettäväksi.
import FilterRepositoriesHeader from './FilterRepositoriesHeader'; // Tuodaan "FilterRepositoriesHeader" (FilterRepositoriesHeader.jsx) niminen komponentti sovelluksen käytettäväksi.
import useRepositories from '../hooks/useRepositories'; // Alustetaan "useRepositories" niminen muuttuja, joka hyödyntää "useRepositories.js" tiedoston sisältöä.

// Alustetaan "styles" niminen muuttuja, joka suorittaa kyseisen funktion eli
// kun data renderöidään takaisin käyttäjälle, niin jokaisen arvon väliin
// tulee 10px tyhjää tilaa.
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

  const [currentFilterInput, setCurrentFilterInput] = useState(''); // Alustetaan "currentFilterInput" muuttuja tilaan, joka saa oletuksena arvon => "".
  // Alustetaan "debouncedFilterInput" muuttuja, joka suorittaa kyseisen funktion eli
  // annamme "useDebounce(...)" funktiolle parametrin arvoksi "currentFilterInput".
  // Kun käyttäjä kirjoittaa jotain hakukenttään, niin sen hetkinen arvo siirtyy
  // "currentFilterInput" muuttujan alle, koska muutamme sen tilaa "setCurrentFilterInput"
  // funktiota ja tämän jälkeen "debouncedFilterInput" muuttuja pääsee käsiksi
  // kyseiseen arvoon yhden (1) sekunnin kuluttua siitä, kun "currentFilterInput"
  // muuttuja on muuttunut sovelluksen käytön aikana. Tämän muuttujan avulla suoritetaan
  // "useRepositories(...)" hookissa sijaitseva query ja palautetaan takaisin käyttäjälle
  // ne arvot, jotka täsmäävät käyttäjän antaman hakukentän arvon kanssa!
  const [debouncedFilterInput] = useDebounce(currentFilterInput, 1000);

  // Alustetaan "repositories" niminen muuttuja, jonka olemme alustaneet "useRepositories"
  // hookin kautta, missä kyseinen hook palauttaa takaisin "repositories" muuttujan datan
  // tämän komponentin käytettäväksi. Muuttuna avulla päästään käsiksi palvelimen kautta
  // tulevaan dataan, jotta voimme näyttää datan takaisin käyttäjälle näkyviin. Muutettu
  // tehtävää "Exercise 10.23: sorting the reviewed repositories list" varten alla olevaa
  // koodia niin, että sovellus suorittaa kyseisen hookin (...) sisällä annetuilla parametrin
  // arvoilla, jonka kautta itse query eli "GET_ALL_REPOSITORIES" suoritetaan ja haetaan
  // palvelimesta data takaisin käyttäjälle näkyviin. Aina, kun "orderByState" ja
  // "orderDirectionState" muuttujan tilaa muutetaan, niin kyseinen hookki suorittaa
  // queryn uudestaan ja renderöi "oikean dataan" takaisin käyttäjälle näkyviin. Lisätty
  // "Exercise 10.24: filtering the reviewed repositories list" tehtävää varten muuttujan
  // "debouncedFilterInput" arvo, hookin parametrin arvoksi. Kun käyttäjä saapuu sovellukseen
  // ensimmäistä kertaa, niin query suoritetaan ensin arvolla => '', ja siitä ei tule
  // erroria, koska query odottaa "String" tyyppiä ja kyseessä on "String" tyyppi! :)
  //
  // Muokattu ennen "Exercise 10.25: infinite scrolling for the repository's reviews list"
  // tehtävää (materiaalin mukaisesti) alla olevaa hookkia niin, että kun käyttäjä
  // saapuu sovellukseen (etusivulle), niin suoritetaan query niin että näytetään
  // ensin viisi (5) ensimmäistä arvoa takaisin. Kun käyttäjä on päässyt "viimeisen"
  // arvon sijaintiin niin "FlatList" komponentti renderöi lisää dataa palvelimesta
  // "onEndReach" funktion kautta, joka on yhdistetty "onEndReach" propsin arvoon.
  // Sekä kaikki ({...}) sisällä olevat objektit siirtyvät "variables" muuttujan
  // parametrin arvoon (hookin tiedostossa), jonka kautta aina kun kyseinen hookki
  // hyödyntää kyseistä parametrin arvoa, niin se viittaa aina näihin neljään (4)
  // eri objektin arvoon.
  const { repositories, fetchMore } = useRepositories({
    first: 5,
    orderBySetting: orderByState,
    orderDirectionSetting: orderDirectionState,
    filterInputValue: debouncedFilterInput
  });

  // Alustetaan "onEndReach" muuttuja, joka suorittaa {...} sisällä olevat asiat
  // aina, kun kyseiseen funktioon tehdään viittaus. Funktion toiminta perustuu
  // siihen, että aina kun "FlatList" komponentin renderöidä data näyttää "viimeisen"
  // arvon, kun käyttäjä selaa eri arvoja käytön aikana, niin komponentti hakee
  // lisää dataa takaisin näytettäväksi => "fetchMore(...)" funktion avulla.
  const onEndReach = () => {
    console.log('Fetching more repositories from server!');
    fetchMore();
  };

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
      onEndReached={() => onEndReach()}
      onEndReachedThreshold={0.5}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      keyExtractor={(item, index) => item.fullName}
      renderItem={({ item }) => <RepositoryItem item={item} />}
      ListHeaderComponent={<FilterRepositoriesHeader currentFilter={currentFilter} setCurrentFilter={setCurrentFilter} currentFilterInput={currentFilterInput} setCurrentFilterInput={setCurrentFilterInput} setOrderByState={setOrderByState} setOrderDirectionState={setOrderDirectionState} />}
    />
  );
};

// Viedään (export) alla oleva komponentti (RepositoryList) sovelluksen käytettäväksi, jotta esim. "App.js" tiedosto pystyy suorittamaan kyseiset funktiot.
export default RepositoryList;
