// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react'; // Otetaan käyttöön "react" niminen kirjasto sovelluksen käytettäväksi.
import { StyleSheet, FlatList, View } from 'react-native'; // Otetaan käyttöön kyseiset komponentit "react-native" kirjaston kautta sovelluksen käytettäväksi.

// https://www.apollographql.com/docs/react/api/react/hooks/#useapolloclient
import { useApolloClient } from '@apollo/client'; // Otetaan käyttöön "useApolloClient" funktio kyseisen kirjaston kautta sovelluksen ajaksi.
import { readQuery } from '@apollo/client' // Sovellus ottaa käyttöön kyseiset funktiot "@apollo/client" kirjaston kautta.
import { GET_CURRENT_USER_DATA } from '../graphql/queries'; // Otetaan kyseiset queryt sovelluksen käytettäväksi "queries.js" tiedoston kautta.

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

  // Alla olevan muuttujan avulla pääsemme käsiksi välimuistissa olevaan
  // dataan ja vaikuttamaan siihen esim. poistamalla tiettyjä asioita yms.
  const client = useApolloClient(); // Alustetaan "client" muuttuja, joka suorittaa kyseisen funktion.

  // Alustetaan "readQuery(...)" funktio eli haetaan välimuistista queryn =>
  // "GET_CURRENT_USER_DATA" sekä annetaan objektin "includeReviews" argumentiksi
  // arvoa "true". Jos välimuistista löytyy kyseinen query, niin palautetaan
  // takaisin data "authorizedUser" muuttujan alle, jonka kautta voidaan
  // näyttää sen hetkisen käyttäjän antamat eri arvostelut takaisin näkyviin.
  const { authorizedUser } = client.readQuery({
    query: GET_CURRENT_USER_DATA,
    variables: {
      includeReviews: true,
    },
  });

  // Alustetaan "userReviewsNodes" muuttuja, joka suorittaa alla olevan konditionaalin
  // eli, jos "authorizedUser" muuttujasta löytyy dataa (query => "GET_CURRENT_USER_DATA")
  // niin me haetaan jokainen arvo "reviews.edges" objektin sisältä ja muussa tapauksessa
  // jos dataa ei löydy, niin me palautetaan takaisin tyhjä taulukko muuttujan käytettäväksi.
  const userReviewsNodes = authorizedUser
    ? authorizedUser.reviews.edges.map(results => results.node)
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
