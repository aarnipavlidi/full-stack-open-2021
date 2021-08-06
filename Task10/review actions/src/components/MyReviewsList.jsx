// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react'; // Otetaan käyttöön "react" niminen kirjasto sovelluksen käytettäväksi.
import { StyleSheet, FlatList, View } from 'react-native'; // Otetaan käyttöön kyseiset komponentit "react-native" kirjaston kautta sovelluksen käytettäväksi.

import useCurrentUser from '../hooks/useCurrentUser'; // Alustetaan "useCurrentUser" funktio, joka hyödyntää "useCurrentUser.js" tiedoston sisältöä sovelluksen aikana.

import MyReviewsItem from './MyReviewsItem'; // Tuodaan "MyReviewsItem" (MyReviewsItem.jsx) niminen komponentti sovelluksen käytettäväksi.

// Alustetaan "styles" niminen muuttuja, joka suorittaa kyseisen funktion eli
// kun data renderöidään takaisin käyttäjälle, niin jokaisen arvon väliin
// tulee 10px tyhjää tilaa.
const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

// Alustetaan "MyReviewsList" niminen komponentti, joka suorittaa {...} sisällä olevat asiat aina,
// kun kyseiseen komponenttiin tehdään viittaus. Komponentin toiminta perustuu siihen, että kun
// käyttäjä on kirjatunut sisään, niin välimuistiin tulee sen hetkisen kirjautuneen käyttäjän
// tiedot, jonka kautta me pääsemme käsiksi sen käyttäjän kirjoittamiin erilaisiin arvosteluihin.
// Tämän datan avulla komponentti renderöi ne takaisin käyttäjälle näkyviin. Jos sen hetkisellä
// käyttäjällä ei ole toistaiseksi mitään arvostelua kirjoitettu, niin komponentti palauttaa
// takaisin vain tyhjän taulukon eli ei renderöi mitään.
const MyReviewsList = () => {

  // Otetaan käyttöön "useCurrentUser(...)" hookki, jonka kautta päästään käsiksi "currentUserReviews"
  // muuttujan arvoon eli, jos käyttäjä kirjautuu sisään sovellukseen, niin tämän komponentin osalta
  // me pääsemme käsiksi sen hetkisen kirjautuneen "reviews" objektin dataan eli näytetään takaisin
  // kaikki käyttäjän tekemät arvostelujen arvot. Jos käyttäjä poistaa tai lisää uuden arvostelun
  // arvon, niin hookin kautta "currentUserReviews" muuttujan tilaa muutetaan, jonka kautta komponentti
  // näyttää aina "uusimman" datan takaisin käyttäjälle näkyviin. 
  const { currentUserReviews } = useCurrentUser();

  // Alustetaan "userReviewsNodes" muuttuja, joka suorittaa alla olevan konditionaalin
  // eli, jos "currentUserReviews" muuttujasta löytyy dataa (query => "GET_CURRENT_USER_DATA")
  // niin me haetaan jokainen arvo "reviews.edges" objektin sisältä ja muussa tapauksessa
  // jos dataa ei löydy, niin me palautetaan takaisin tyhjä taulukko muuttujan käytettäväksi.
  const userReviewsNodes = currentUserReviews
    ? currentUserReviews.reviews.edges.map(results => results.node)
    : [];

  // Kompoentti renderöi (...) sisällä olevat asiat takaisin käyttäjälle näkyviin. Komponentti
  // "FlatList" propsiin => "data" tulee data mitä me halutaan hyödyntää, "ItemSeparatorComponent"
  // propsi määrittää sen, että mitä jokaisen renderöidyn arvon välillä tehdään eli tässä tapauksessa
  // jokaisen arvon väliin tulee "10" (React Native:n oma mittasuhde). Propsi "renderItem" määrittää
  // sen, että mitä me renderöidään takaisin sekä mitä ulkoasua jokainen arvo noudattaa.
  return (
    <FlatList
      data={userReviewsNodes}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      keyExtractor={({ id }) => id}
      renderItem={({ item }) => <MyReviewsItem review={item} />}
    />
  );
};

// Viedään (export) alla oleva komponentti (MyReviewsList) sovelluksen käytettäväksi, jotta esim. "App.js" tiedosto pystyy suorittamaan kyseiset funktiot.
export default MyReviewsList;
