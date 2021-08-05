// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React, { useState } from 'react'; // Otetaan käyttöön "react" niminen kirjasto sovelluksen käytettäväksi.
import { StyleSheet, View, Text } from 'react-native'; // Otetaan käyttöön kyseiset komponentit "react-native" kirjaston kautta sovelluksen käytettäväksi.
import { Searchbar } from 'react-native-paper'; // Otetaan käyttöön kyseiset komponentit "react-native-paper" kirjaston kautta sovelluksen käytettäväksi.
import { Picker } from '@react-native-picker/picker'; // Otetaan käyttöön "Picker" komponentti, joka hyödyntää "@react-native-picker/picker" kirjaston sisältöä sovelluksen aikana.

import TextStyling from './TextStyling'; // Otetaan käyttöön "TextStyling" komponentti (TextStyling.jsx) sovelluksen käytettäväksi.
import styling from '../styling'; // Alustetaan "styling" niminen muuttuja, jonka avulla sovellus ottaa erillisen tyylitiedoston (styling.js) käyttöönsä.

// Alustetaan "filterContainer" niminen muuttuja, joka suorittaa kyseisen
// funktion ja saa käyttöönsä {...} sisällä olevat tyylien arvot.
const filterContainer = StyleSheet.create({
  container: {
    paddingTop: 20,
    alignItems: 'center',
  },
  filterInputContainer: {
    marginLeft: 25,
    marginRight: 25
  },
  filterContainer: {
    marginTop: 20,
    height: 20,
    width: 250,
    marginBottom: 20
  }
});

// Alustetaan "MemoFilterRepositoriesHeader" niminen komponentti, joka suorittaa {...} sisällä
// olevat asiat aina, kun kyseiseen komponenttiin tehdään viittaus. Komponentti saa myös käyttöönsä
// ({...}) sisällä olevat muuttujien arvot, joiden alkuperäinen sijainti löytyy "RepositoryList"
// komponentissa. Olemme myös ottaneet käyttöön "React.memo(...)" funktion tämän komponentin
// osalta, koska haluamme varmistaa, että kun me muutetaan jonkin muuttujan tilaa niin haluamme
// että tämän komponentin "valittu filtteri" pysyy siinä minkä käyttäjä on valinnut. Ilman tätä
// sovellus renderöisi tämän komponentin uudestaan, mikä tarkoittaisi sitä, että "currentFilter"
// muuttujan arvo olisi alkuperäinen eli "Latest repositories." ja tätä me emme halua! :)
// Käytännössä, kun käyttäjä valitsee tietyn "repository":n arvon filtterin, niin sen jälkeen
// valittu arvo näkyy "filtteri menu:ssa", jonka kautta suoritetaan query palvelimeen (hookki
// saa uudet parametrien arvot) ja palautetaan takaisin "oikea" data käyttäjälle näkyviin.
const MemoFilterRepositoriesHeader = ({ setOrderByState, setOrderDirectionState, currentFilter, setCurrentFilter, currentFilterInput, setCurrentFilterInput }) => {

  // Alustetaan "changeRepositoryQuery" funktio, joka suorittaa {...} sisällä olevat
  // asiat aina, kun kyseiseen funktioon tehdään viittaus. Funktio saa myös käyttöönsä
  // "getSelectedValue" parametin arvon, joka tulee käyttäjän antaman valitun "filtteri"
  // arvon kautta. Jos esim. käyttäjä valitsee "Highest rated repositories" vaihtoehdon
  // niin parametri "getSelectedValue" on yhtä kuin kyseinen vaihtoehto. Tämän avulla
  // voidaan suorittaa {...} sisällä olevia if-ehtoja, joiden kautta voidaan muuttaa
  // muuttujien tilaa, jotka vastaavat käyttäjän valitseman filtterin arvon mukaan.
  const changeRepositoryQuery = (getSelectedValue) => {

    // Jos "getSelectedValue" on yhtä kuin kyseinen teksti, niin
    // funktio suorittaa {...} sisällä olevat asiat.
    if (getSelectedValue === 'Latest repositories') {
      setCurrentFilter(getSelectedValue)
      setOrderByState('CREATED_AT')
      setOrderDirectionState('DESC')
    };

    // Jos "getSelectedValue" on yhtä kuin kyseinen teksti, niin
    // funktio suorittaa {...} sisällä olevat asiat.
    if (getSelectedValue === 'Highest rated repositories') {
      setCurrentFilter(getSelectedValue)
      setOrderByState('RATING_AVERAGE')
      setOrderDirectionState('DESC')
    };

    // Jos "getSelectedValue" on yhtä kuin kyseinen teksti, niin
    // funktio suorittaa {...} sisällä olevat asiat.
    if (getSelectedValue === 'Lowest rated repositories') {
      setCurrentFilter(getSelectedValue)
      setOrderByState('RATING_AVERAGE')
      setOrderDirectionState('ASC')
    };
  };

  // Komponentti renderöi (...) sisällä olevat asiat takaisin käyttäjälle näkyviin.
  return (
    <View style={filterContainer.container}>
      <Searchbar style={filterContainer.filterInputContainer} placeholder="Search for a repository" onChangeText={(query) => setCurrentFilterInput(query)} value={currentFilterInput} clearIcon='close' />
      <Picker style={filterContainer.filterContainer} selectedValue={currentFilter} onValueChange={(itemValue) => changeRepositoryQuery(itemValue)}>
        <Picker.Item label='Latest repositories' value='Latest repositories' />
        <Picker.Item label='Highest rated repositories' value='Highest rated repositories' />
        <Picker.Item label='Lowest rated repositories' value='Lowest rated repositories' />
      </Picker>
    </View>
  );
};

// Alustetaan "FilterRepositoriesHeader" komponentti, joka on yhtä kuin kyseinen
// funktio. Funktion toiminta/idea on selitetty ylhäällä komponentin yläpuolella.
const FilterRepositoriesHeader = React.memo(MemoFilterRepositoriesHeader);

// Viedään (export) alla oleva komponentti (FilterRepositoriesHeader) sovelluksen käytettäväksi, jotta esim. "App.js" tiedosto pystyy suorittamaan kyseiset funktiot.
export default FilterRepositoriesHeader;
