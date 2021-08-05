// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react'; // Otetaan käyttöön "react" niminen kirjasto sovelluksen käytettäväksi.
import { View, Text, StyleSheet } from 'react-native'; // Otetaan käyttöön kyseiset komponentit "react-native" kirjaston kautta sovelluksen käytettäväksi.

import { format, parseISO } from 'date-fns'; // Alustetaan kyseiset funktiot, jotka hyödyntävät

import styling from '../styling'; // Alustetaan "styling" niminen muuttuja, jonka avulla sovellus ottaa erillisen tyylitiedoston (styling.js) käyttöönsä.

// Alustetaan "reviewsContainer" muuttuja, joka suorittaa kyseisen funktion ja
// saa käyttöönsä {...} sisällä olevat objetien tyylien arvot. Muuttuja on
// jokaisen uuden arvostelun ensimmäinen "laatikko", jonka sisällä tulee
// muut tyylit ja niiden sisällöt.
const reviewsContainer = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    backgroundColor: 'white',
    paddingTop: 10,
    paddingBottom: 10
  }
});

// Alustetaan "reviewsHeader" muuttuja, joka suorittaa kyseisen funktion ja
// saa käyttöönsä {...} sisällä olevat objektien tyylien arvot. Muuttujaa
// käytetään "laatikossa" johon tulee "review.rating", "review.user.username"
// sekä "review.createdAt".
const reviewsHeader = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexGrow: 1,
    marginLeft: 10
  },
  ratingContainer: {
    width: 40,
    height: 40,
    borderWidth: 3,
    borderRadius: 40 / 2,
    borderColor: '#0465d1',
    justifyContent: 'center',
    marginRight: 15,
  },
  rating: {
    textAlign: 'center',
    fontWeight: styling.fontWeights.bold,
    color: '#0465d1'
  },
  usernameAndDateContainer: {
    flexGrow: 1
  },
  username: {
    fontWeight: styling.fontWeights.bold
  }
});

// Alustetaan "reviewsText" muuttuja, joka suorittaa kyseisen funktion ja
// saa käyttöönsä {...} sisällä olevat objektien tyylien arvot. Muuttujaa
// käytetään "laatikossa", johon tulee käyttäjän antama arvostelu eli
// => "review.text" muuttujan arvo. Laatikko sijoitettu, niin että
// alkaa samasta sijainnista, kuin "usernameAndDateContainer" laatikko.
const reviewsText = StyleSheet.create({
  container: {
    flexGrow: 1,
    marginLeft: 65,
    marginRight: 10
  }
});

// Alustetaan "MyReviewsItem" niminen komponentti, joka suorittaa {...} sisällä olevat asiat
// aina, kun kyseiseen komponenttiin tehdään viittaus. Komponentin toiminta on täysin samanlainen
// kuin "ReposityItem" komponentin paitsi, että sen sijaan että me renderöidään kaikki saatavilla
// olevat arvostelut, niin me renderöidään sen hetkisen kirjautuneen käyttäjän arvostelut takaisin.
// Komponentin "MyReviewsList" sisältö hyödyntää "FlatList" nimistä komponenttiä, jolle annettu
// propsin arvo => "data" joka on yhtä kuin "userReviewsNodes", jonka kautta tämän komponentin
// parametrin arvo eli "review" pääsee käsiksi eli "review" on yhtä kuin "userReviewsNodes":n arvo.
const MyReviewsItem = ({ review }) => {

  // Alustetaan "formattedDate" muuttuja, joka suorittaa kyseisen funktion. Palvelimen
  // kautta tuleva data ("createdAt" objektin arvo) tulee oletuksena muodossa =>
  // "2021-07-30T09:46:59.348Z", joten haluamme hieman "siistiä" kyseistä arvoa
  // niin, että poistetaan turhat merkit pois ja näytetään se takaisin käyttäjälle
  // muodossa => "30.07.2021" (päivä.kuukausi.vuosi).
  const formattedDate = format(parseISO(review.createdAt), 'dd.MM.yyyy');

  // Komponentti renderöi (...) sisällä olevat asiat takaisin käyttäjälle näkyviin.
  return (
    <View style={reviewsContainer.container}>
      <View style={reviewsHeader.container}>
        <View style={reviewsHeader.ratingContainer}>
          <Text style={reviewsHeader.rating}>{review.rating}</Text>
        </View>
        <View style={reviewsHeader.usernameAndDateContainer}>
          <Text style={reviewsHeader.username}>{review.user.username}</Text>
          <Text>{formattedDate}</Text>
        </View>
      </View>
      <View style={reviewsText.container}>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};

// Viedään (export) alla oleva komponentti (MyReviewsItem) sovelluksen käytettäväksi, jotta esim. "App.js" tiedosto pystyy suorittamaan kyseiset funktiot.
export default MyReviewsItem;
