// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React, { useState, useEffect } from 'react'; // Otetaan käyttöön "react" niminen kirjasto sovelluksen käytettäväksi.
import { ActivityIndicator, FlatList, Platform, View, Image, Text, StyleSheet, Pressable } from 'react-native'; // Otetaan käyttöön kyseiset komponentit "react-native" kirjaston kautta sovelluksen käytettäväksi.

import TextStyling from './TextStyling'; // Otetaan käyttöön "TextStyling" komponentti (TextStyling.jsx) sovelluksen käytettäväksi.
import styling from '../styling'; // Alustetaan "styling" niminen muuttuja, jonka avulla sovellus ottaa erillisen tyylitiedoston (styling.js) käyttöönsä.

// Lisää tietoa alla olevasta komponentista, löytyy täältä: https://docs.expo.dev/guides/linking/?redirected
import * as Linking from 'expo-linking'; // Alustetaan "Linkin" komponentti, joka hyödyntää "expo-linking" kirjaston sisältöä sovelluksen aikana.

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
    marginBottom: 10
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
    flexGrow: 1,
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
    fontSize: styling.fontSizes.tag,
    fontFamily: Platform.select({
      android: styling.fonts.android,
      ios: styling.fonts.ios,
      default: styling.fonts.default
    }),
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
    fontWeight: styling.fontWeights.bold,
    fontFamily: Platform.select({
      android: styling.fonts.android,
      ios: styling.fonts.ios,
      default: styling.fonts.default
    }),
  },
  dataTitle: {
    fontFamily: Platform.select({
      android: styling.fonts.android,
      ios: styling.fonts.ios,
      default: styling.fonts.default
    }),
  }
});

// Alustetaan "buttonContainer" niminen muuttuja, joka suorittaa kyseisen funktion,
// jonka kautta se saa käyttöönsä {...} sisällä olevat tyylien arvot.
const buttonContainer = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 15
  },
  buttonContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '81%',
    marginTop: 15,
    height: 40,
    backgroundColor: '#808080',
    borderWidth: 3,
    borderColor: '#989898'
  },
  buttonContentText: {
    marginTop: 5,
    color: 'white',
    fontFamily: Platform.select({
      android: styling.fonts.android,
      ios: styling.fonts.ios,
      default: styling.fonts.default
    }),
  }
});

// Alustetaan "loadingContainer" niminen muuttuja, joka suorittaa kyseisen funktion,
// jonka kautta se saa käyttöönsä {...} sisällä olevat tyylien arvot.
const loadingContainer = StyleSheet.create({
  container: {
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

// Alustetaan "RepositoryListHeader" komponentti, joka suorittaa {...} sisällä olevat asiat aina,
// kun kyseiseen komponenttiin tehdään viittaus. Komponentin toiminta on täysin samanlainen kuin
// "RepositoryList" (komponentti joka renderöi siis kaikki arvot näkyviin), mutta tässä me renderöidään
// ainoastaan yhden arvon, jonka sovellus määrittää sen perusteella, että mitä arvoa käyttäjä on
// sillä hetkellä klikannut. Me pääsemme klikatun arvoon käsiksi => "useParams(...)" funktion
// avulla, jota me käytämme, jotta me voimme renderöidä "oikean" arvon palvelimesta =>
// "GET_CURRENT_REPOSITORY" queryn avulla. Jos esim. käyttäjä klikkaa ensimmäistä arvoa
// eli "jaredpalmer/formik" arvoa, niin => funktion "useParams(...)" kautta "id":n muuttujan
// arvo saa arvoksi => "jaredpalmer.formik", joka sijoitetaan "repositoryID" objektin alle.
const RepositoryListHeader = ({ repository, loadingStatus }) => {

  // Alustetaan "openCurrentRepository" muuttuja, joka suorittaa {...}
  // sisällä olevat asiat aina, kun kyseiseen funktioon tehdään viittaus.
  // Kun käyttäjä klikkaa painiketta "Open in GitHub", niin funktion avulla
  // siirrytään sovelluksen ulkopuolelle ja avataan puhelimen oma selain.
  const openCurrentRepository = () => {
    Linking.openURL(repository.url);
  };

  // Jos "loadingStatus" muuttuja on "true" eli queryn kautta tuleva data
  // vielä lataa palvelimesta (eli ei voida näyttää vielä dataa takaisin
  // käyttäjälle), niin komponentti suorittaa {...} sisällä olevat asiat.
  if (loadingStatus) {
    return (
      <View style={loadingContainer.container}>
        <ActivityIndicator size="large" color="#0465d1" />
      </View>
    );
  };

  // Jos yllä oleva if-ehto ei toteudu, niin komponentti renderöi (...) sisällä olevat asiat takaisin käyttäjälle näkyviin.
  return (
    <View style={repositoriesContainer.container}>
      <View style={repositoriesAvatarStyling.container}>
        <View style={repositoriesAvatarStyling.avatarContainer}>
          <Image style={repositoriesAvatarStyling.avatar} source={{uri: repository.ownerAvatarUrl}} />
        </View>
        <View style={repositoriesAvatarStyling.infoContainer}>
          <TextStyling fontFamily={Platform.OS} fontWeight="bold" fontSize="subheading">{repository.fullName}</TextStyling>
          <TextStyling fontFamily={Platform.OS} color="textSecondary">{repository.description}</TextStyling>
        </View>
      </View>
      <View style={repositoriesTagStyling.container}>
        <Text style={repositoriesTagStyling.content}>{repository.language}</Text>
      </View>
      <View style={repositoriesDataStyling.container}>
        <View style={repositoriesDataStyling.content}>
          <Text style={repositoriesDataStyling.data}>{formatValue(repository.stargazersCount)}</Text>
          <Text style={repositoriesDataStyling.dataTitle}>Stars</Text>
        </View>
        <View style={repositoriesDataStyling.content}>
          <Text style={repositoriesDataStyling.data}>{formatValue(repository.forksCount)}</Text>
          <Text style={repositoriesDataStyling.dataTitle}>Forks</Text>
        </View>
        <View style={repositoriesDataStyling.content}>
          <Text style={repositoriesDataStyling.data}>{formatValue(repository.reviewCount)}</Text>
          <Text style={repositoriesDataStyling.dataTitle}>Reviews</Text>
        </View>
        <View style={repositoriesDataStyling.content}>
          <Text style={repositoriesDataStyling.data}>{formatValue(repository.ratingAverage)}</Text>
          <Text style={repositoriesDataStyling.dataTitle}>Rating</Text>
        </View>
      </View>
      <View style={buttonContainer.container}>
        <Pressable style={buttonContainer.buttonContent} onPress={openCurrentRepository}>
          <Text style={buttonContainer.buttonContentText}>Open in GitHub</Text>
        </Pressable>
      </View>
    </View>
  );
};

// Viedään (export) alla oleva komponentti (RepositoryListHeader) sovelluksen käytettäväksi, jotta esim. "App.js" tiedosto pystyy suorittamaan kyseiset funktiot.
export default RepositoryListHeader;
