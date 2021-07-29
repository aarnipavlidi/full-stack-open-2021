// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react'; // Otetaan käyttöön "react" niminen kirjasto sovelluksen käytettäväksi.
import { FlatList, View, Text, StyleSheet } from 'react-native'; // Otetaan käyttöön kyseiset komponentit "react-native" kirjaston kautta sovelluksen käytettäväksi.

import RepositoryItem from './RepositoryItem'; // Tuodaan "RepositoryItem" (RepositoryItem.jsx) niminen komponentti sovelluksen käytettäväksi.

// Alustetaan "styles" niminen muuttuja, joka suorittaa kyseisen funktion eli
// kun data renderöidään takaisin käyttäjälle, niin jokaisen arvon väliin
// tulee 20px tyhjää tilaa.
const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const repositories = [ // Alustetaan "repositories" niminen muuttuja, joka saa [...] taulukollisen erilaisia arvoja.
  {
    id: 'jaredpalmer.formik',
    fullName: 'jaredpalmer/formik',
    description: 'Build forms in React, without the tears',
    language: 'TypeScript',
    forksCount: 1589,
    stargazersCount: 21553,
    ratingAverage: 88,
    reviewCount: 4,
    ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/4060187?v=4',
  },
  {
    id: 'rails.rails',
    fullName: 'rails/rails',
    description: 'Ruby on Rails',
    language: 'Ruby',
    forksCount: 18349,
    stargazersCount: 45377,
    ratingAverage: 100,
    reviewCount: 2,
    ownerAvatarUrl: 'https://avatars1.githubusercontent.com/u/4223?v=4',
  },
  {
    id: 'django.django',
    fullName: 'django/django',
    description: 'The Web framework for perfectionists with deadlines.',
    language: 'Python',
    forksCount: 21015,
    stargazersCount: 48496,
    ratingAverage: 73,
    reviewCount: 5,
    ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/27804?v=4',
  },
  {
    id: 'reduxjs.redux',
    fullName: 'reduxjs/redux',
    description: 'Predictable state container for JavaScript apps',
    language: 'TypeScript',
    forksCount: 13902,
    stargazersCount: 52869,
    ratingAverage: 0,
    reviewCount: 0,
    ownerAvatarUrl: 'https://avatars3.githubusercontent.com/u/13142323?v=4',
  },
];

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

  // Komponentti "RepositoryList" renderöi (...) sisällä olevat asiat takaisin käyttäjälle näkyviin.
  // "FlatList" komponentti saa käyttöönsä alla olevat propsien arvot missä "data" määrittää mitä
  // dataa halutaan näyttää käyttäjälle, "ItemSeparatorComponent" määrittää, että missä muodossa
  // data näytetään (tyyli yms.) ja "renderItem" renderöi jokaisen arvon "data" propsin kautta,
  // jotka noudattavat "ItemSeparatorComponent" komponentin rakennetta.
  return (
    <FlatList
      data={repositories}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={RepositoryItem}
    />
  );
};

// Viedään (export) alla oleva komponentti (RepositoryList) sovelluksen käytettäväksi, jotta esim. "App.js" tiedosto pystyy suorittamaan kyseiset funktiot.
export default RepositoryList;
