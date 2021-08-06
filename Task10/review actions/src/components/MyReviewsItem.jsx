// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react'; // Otetaan käyttöön "react" niminen kirjasto sovelluksen käytettäväksi.
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native'; // Otetaan käyttöön kyseiset komponentit "react-native" kirjaston kautta sovelluksen käytettäväksi.
import { useHistory } from 'react-router-native'; // Otetaan käyttöön "useHistory" funktio, joka hyödyntää "react-router-native" kirjaston sisältöä sovelluksen aikana.

// https://www.apollographql.com/docs/react/api/react/hooks/#useapolloclient
import { useApolloClient } from '@apollo/client'; // Otetaan käyttöön "useApolloClient" funktio kyseisen kirjaston kautta sovelluksen ajaksi.
import { useQuery, useMutation } from '@apollo/client'; // Sovellus ottaa käyttöön kyseiset funktiot "@apollo/client" kirjaston kautta.
import { GET_CURRENT_USER_DATA } from '../graphql/queries'; // Otetaan kyseiset queryt sovelluksen käytettäväksi "queries.js" tiedoston kautta.
import { DELETE_CURRENT_REVIEW } from '../graphql/mutations'; // Otetaan kyseiset mutaatiot sovelluksen käytettäväksi "mutations.js" tiedoston kautta.

import useCurrentUser from '../hooks/useCurrentUser'; // Alustetaan "useCurrentUser" funktio, joka hyödyntää "useCurrentUser.js" tiedoston sisältöä sovelluksen aikana.

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

// Alustetaan "reviewsButtonContainer" muuttuja, joka suorittaa kyseisen funktion
// ja saa käyttöönsä {...} sisällä olevat objektien tyylien arvot. Muuttujaa
// käytetään "laatikossa", johon tulee kaksi (2) eri painiketta, jossa kirjautuneella
// käyttäjällä on mahdollisuus poistaa arvostelu tai siirtyä kyseisen arvostelun
// viittaamaan "repository":n arvoon.
const reviewsButtonContainer = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginLeft: 25,
    marginRight: 25,
    marginBottom: 10
  },
  viewButton: {
    backgroundColor: '#0165d4',
    justifyContent: 'center',
    borderRadius: 35 / 5,
    flexGrow: 0.4,
    height: 35
  },
  deleleButton: {
    backgroundColor: '#d6394c',
    justifyContent: 'center',
    borderRadius: 35 / 5,
    flexGrow: 0.4,
    height: 35
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
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

  const history = useHistory(); // Alustetaan "history" muuttuja, joka suorittaa kyseisen funktion.

  // Alustetaan "DELETE_CURRENT_REVIEW" mutaatio, jonka kautta päästään käsiksi [...] sisällä
  // oleviin muuttujien arvoihin. Kun käyttäjä haluaa poistaa tietyn arvostelun arvon, niin
  // sovellus suorittaa "deleteCurrentReview(...)" funktion, jonka kautta poistaa sen hetkisen
  // arvostelun arvon palvelimesta. Tämän jälkeen "päivitetään" "GET_CURRENT_USER_DATA" queryn
  // kautta tuleva data, koska haluamme että se näyttää uusimman datan mikä on saatavilla. Kun
  // data päivitetään, niin komponentissa "MyReviewsList" sijaitseva "currentUserReviews" muuttujan
  // arvo muuttuu, jonka kautta tämä komponentti pääsee käsiksi kyseiseen muuttujan arvoon.
  const [deleteCurrentReview, result] = useMutation(DELETE_CURRENT_REVIEW, {
    variables: {
      selectedReviewID: review.id
    },
    refetchQueries: [{
      variables: {
        includeReviews: true,
      },
      query: GET_CURRENT_USER_DATA
    }]
  });

  // Alustetaan "deleteReview" niminen funktio, joka suorittaa {...} sisällä olevat
  // asiat aina, kun kyseiseen funktioon tehdään viittaus eli aina kun käyttäjä
  // haluaa poistaa tietyn arvostelun arvon, niin sovellus ensin "varmistaa",
  // että haluaako käyttäjä poistaa valitun arvostelun arvon. Käyttäjällä on
  // mahdollisuus perua vielä "popup ikkunassa" ja, jos käyttäjä päättää poistaa
  // arvon, niin suoritetaan "deleteCurrentReview(...)" funktio (mutaatio).
  const deleteReview = () => {
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "CANCEL",
          onPress: () => console.log('User has cancelled current review deletion!'),
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => deleteCurrentReview(),
        },
      ]
    )
  };

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
      <View style={reviewsButtonContainer.container}>
        <Pressable style={reviewsButtonContainer.viewButton} onPress={() => history.push(`/${review.repositoryId}`)}>
          <Text style={reviewsButtonContainer.buttonText}>View repository</Text>
        </Pressable>
        <Pressable style={reviewsButtonContainer.deleleButton} onPress={() => deleteReview()}>
          <Text style={reviewsButtonContainer.buttonText}>Delete review</Text>
        </Pressable>
      </View>
    </View>
  );
};

// Viedään (export) alla oleva komponentti (MyReviewsItem) sovelluksen käytettäväksi, jotta esim. "App.js" tiedosto pystyy suorittamaan kyseiset funktiot.
export default MyReviewsItem;
