// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react'; // Otetaan käyttöön "react" niminen kirjasto sovelluksen käytettäväksi.
import { View, Image, Text, StyleSheet } from 'react-native'; // Otetaan käyttöön kyseiset komponentit "react-native" kirjaston kautta sovelluksen käytettäväksi.

import TextStyling from './TextStyling'; // Otetaan käyttöön "TextStyling" komponentti (TextStyling.jsx) sovelluksen käytettäväksi.
import styling from '../styling'; // Alustetaan "styling" niminen muuttuja, jonka avulla sovellus ottaa erillisen tyylitiedoston (styling.js) käyttöönsä.

// Alustetaan "formatValue" muuttuja, joka suorittaa {...} sisällä olevat asiat aina,
// kun kyseiseen funktioon tehdään viittaus. Funktio siis tarkistaa, "repositories"
// datan kautta tulevan objektin arvon (esim. "stargazersCount") "tier" muuttujan avulla.
// Jos arvo on esim. "500" niin funktio ei tee mitään vaan palauttaa takaisin alkuperäisen
// arvon näkyviin käyttäjälle ja muussa tapauksessa, jos arvo on esim. "1234" niin funktio
// palauttaa "1" (yhden) desimaalin tarkkuudella takaisin => "1,2k" arvon käyttäjälle näkyviin.
const formatValue = (getValue) => {

  const SI_SYMBOL = ["", "k", "M", "G", "T", "P", "E"]; // Alustetaan "SI_SYMBOL" muuttuja, joka saa taulukollisen erilaisia arvoja.
  const tier = Math.log10(Math.abs(getValue)) / 3 | 0; // Alustetaan "tier" niminen muuttuja, joka suorittaa kyseisen funktion.

  // Jos "tier" muuttujan arvo on funktion viittauksen yhteydessä arvoa "0" (nolla),
  // niin funktio palauttaa takaisin "getValue" (alkuperäisen) arvon käyttäjälle.
  if (tier === 0) {
    return getValue;
  };

  const suffix = SI_SYMBOL[tier]; // Alustetaan "suffix" niminen muuttuja, joka on yhtä kuin kyseinen arvo.
  const scale = Math.pow(10, tier * 3); // Alustetaan "scale" niminen muuttuja, joka suorittaa kyseisen funktion.

  const scaled = getValue / scale; // Alustetaan "scaled" niminen muuttuja, joka jakaa "getValue" muuttujan "scale" muuttujan arvolla.

  return scaled.toFixed(1) + suffix; // Funktio palauttaa takaisin käyttäjälle arvon yhden desimaalin tarkkuudella.
};

// Alustetaan "repositoriesContainer" niminen muuttuja, joka suorittaa kyseisen funktion ja
// saa käyttöönsä {...} sisällä olevat tyylien arvot. Tämän avulla jokainen arvo "repositories"
// muuttujan datasta sijoittuvat tämän elementin sisälle "laatikkoon"  (container) eli
// <View>...ensimmäinen...</View> => <View>...toinen...</View> jne...
const repositoriesContainer = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    backgroundColor: 'white',
  }
});

// Alustetaan "repositoriesAvatarStyling" niminen muuttuja, joka suorittaa kyseisen
// funktion ja saa käyttöönsä {...} sisällä olevat tyylien arvot.
const repositoriesAvatarStyling = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexGrow: 1,
    marginTop: 10,
    marginLeft: 10
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 45 / 2
  },
  avatarContainer: {
    flexGrow: 0,
    paddingRight: 15,

  },
  infoContainer: {
    flexGrow: 1
  }
});

// Alustetaan "repositoriesTagStyling" niminen muuttuja, joka suorittaa kyseisen
// funktion ja saa käyttöönsä {...} sisällä olevat tyylien arvot.
const repositoriesTagStyling = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    backgroundColor: '#0465d1',
    borderColor: '#0465d1',
    borderRadius: 3,
    marginTop: 5,
    marginLeft: 70
  },
  content: {
    fontFamily: styling.fonts.main,
    fontSize: styling.fontSizes.tag,
    color: 'white',
    padding: 5
  }
});

// Alustetaan "repositoriesDataStyling" niminen muuttuja, joka suorittaa kyseisen
// funktion ja saa käyttöönsä {...} sisällä olevat tyylien arvot.
const repositoriesDataStyling = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'space-evenly',
    marginTop: 8,
    marginBottom: 8
  },
  content: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  data: {
    fontWeight: styling.fontWeights.bold
  }
});

// Alustetaan "RepositoryItem" niminen komponentti, joka suorittaa {...} sisällä olevat asiat aina,
// kun kyseiseen komponenttiin tehdään viittaus. Komponentin ideana on siis renderöidä jokainen arvo
// "repositories" muuttujan kautta tulevasta datasta takaisin käyttäjälle näkyviin. Komponentti
// "ItemSeparator" määrittää tyylin, jokaiselle eri arvolle, jonka kautta tämä komponentti pääsee
// käsiksi "item" parametrin avulla.
const RepositoryItem = ({ item }) => {

  // Alustetaan "AvatarContainer" komponentti, joka suorittaa {...} sisällä olevat asiat aina,
  // kun kyseiseen komponenttiin tehdään viittaus. Komponentti määrittää, että miten sovellus
  // renderöi jokaisen arvon (item), johon sisältyy "ownerAvatarUrl", "fullName" sekä
  // "description" objektien arvot. Nämä kaikki arvot rendröidään saman "laatikon" sisälle.
  const AvatarContainer = () => {
    return (
      <View style={repositoriesAvatarStyling.container}>
        <View style={repositoriesAvatarStyling.avatarContainer}>
          <Image style={repositoriesAvatarStyling.avatar} source={{uri: item.ownerAvatarUrl}} />
        </View>
        <View style={repositoriesAvatarStyling.infoContainer}>
          <TextStyling fontWeight="bold" fontSize="subheading">{item.fullName}</TextStyling>
          <TextStyling color="textSecondary">{item.description}</TextStyling>
        </View>
      </View>
    );
  };

  // Alustetaan "TagContainer" komponentti, joka suorittaa {...} sisällä olevat asiat aina,
  // kun kyseiseen komponenttiin tehdään viittaus. Komponentti määrittää, että miten sovellus
  // renderöi jokaisen arvon (item), johon sisältyy "language" objektin arvo. Objektin arvo
  // renderöidään omalle "laatikolle" => "AvatarContainer" komponentin alapuolelle.
  const TagContainer = () => {
    return (
      <View style={repositoriesTagStyling.container}>
        <Text style={repositoriesTagStyling.content}>{item.language}</Text>
      </View>
    );
  };

  // Alustetaan "DataContainer" komponentti, joka suorittaa {...} sisällä olevat asiat aina,
  // kun kyseiseen komponenttiin tehdään viittaus. Komponentti määrittää, että miten sovellus
  // renderöi jokaisen arvon (item), johon sisältyy "stargazersCount", "forksCount", "reviewCount"
  // sekä "ratingAverage" objektien arvot. Nämä kaikki renderöidään samallee "laatikolle"
  // "TagContainer" komponentin alapuolelle.
  const DataContainer = () => {
    return (
      <View style={repositoriesDataStyling.container}>
        <View style={repositoriesDataStyling.content}>
          <Text style={repositoriesDataStyling.data}>{formatValue(item.stargazersCount)}</Text>
          <Text>Stars</Text>
        </View>
        <View style={repositoriesDataStyling.content}>
          <Text style={repositoriesDataStyling.data}>{formatValue(item.forksCount)}</Text>
          <Text>Forks</Text>
        </View>
        <View style={repositoriesDataStyling.content}>
          <Text style={repositoriesDataStyling.data}>{formatValue(item.reviewCount)}</Text>
          <Text>Reviews</Text>
        </View>
        <View style={repositoriesDataStyling.content}>
          <Text style={repositoriesDataStyling.data}>{formatValue(item.ratingAverage)}</Text>
          <Text>Rating</Text>
        </View>
      </View>
    );
  };


  // Komponentti renderöi (...) sisällä olevat asiat takaisin käyttäjälle näkyviin.
  return (
    <View style={repositoriesContainer.container}>
      <AvatarContainer />
      <TagContainer />
      <DataContainer />
    </View>
  );
};

// Viedään (export) alla oleva komponentti (RepositoryItem) sovelluksen käytettäväksi, jotta esim. "App.js" tiedosto pystyy suorittamaan kyseiset funktiot.
export default RepositoryItem;
