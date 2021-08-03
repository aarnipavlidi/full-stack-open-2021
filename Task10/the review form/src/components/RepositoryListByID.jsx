// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react'; // Otetaan käyttöön "react" niminen kirjasto sovelluksen käytettäväksi.
import { FlatList, View, StyleSheet } from 'react-native'; // Otetaan käyttöön kyseiset komponentit "react-native" kirjaston kautta sovelluksen käytettäväksi.

import useRepositoriesReviews from '../hooks/useRepositoriesReviews'; // Alustetaan "useRepositoriesReviews" niminen muuttuja, joka hyödyntää "useRepositories.js" tiedoston sisältöä.
import useRepositoriesByID from '../hooks/useRepositoriesByID'; // Alustetaan "useRepositoriesByID" niminen muuttuja, joka hyödyntää "useRepositoriesByID.js" tiedoston sisältöä.

import ReposityListReviews from './ReposityListReviews'; // Otetaan käyttöön "ReposityListReviews" komponenttin sisältö tämän komponentin käytettäväksi.
import RepositoryListHeader from './RepositoryListHeader'; // Otetaan käyttöön "ReposityListHeader" komponenttin sisältö tämän komponentin käytettäväksi.

import styling from '../styling'; // Alustetaan "styling" niminen muuttuja, jonka avulla sovellus ottaa erillisen tyylitiedoston (styling.js) käyttöönsä.

// Alustetaan "styles" niminen muuttuja, joka suorittaa kyseisen funktion eli
// kun data renderöidään takaisin käyttäjälle, niin jokaisen arvon väliin
// tulee 10px tyhjää tilaa.
const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

// Alustetaan "RepositoryListByID" komponentti, joka suorittaa {...} sisällä olevat asiat aina, kun kyseiseen
// komponenttiin tehdään viittaus. Komponentti renderöi takaisin käyttäjällä "FlatList" komponentin, jossa
// ensimmäisenä tulee aina "ReposityListHeader" komponentin sisältö. Komponentille annetaan propseina
// "repository" eli saa pääsyn "repositoriesNodes" muuttujan dataan sekä "loadingStatus", jonka avulla
// komponentti renderöi "loading spinner":in, jos data ei ole valmis näytettäväksi käyttäjälle.
const RepositoryListByID = () => {

  // Komponetti ottaa käyttöön "useRepositoriesByID(...)" hookin, ja hyödynnetään
  // "repositoriesByID" ja "loading" muuttujia. Hookki suorittaa queryn eli
  // "GET_CURRENT_REPOSITORY", jonka data sijoitetaan "repositoriesByID" muuttujaan
  // sekä "loading" muuttuja kertoo meille sen, jos palvelimen kautta tuleva data
  // "lataa" eli ei voida näyttää dataa vielä takaisin käyttäjälle näkyviin.
  const { repositoriesByID, loading } = useRepositoriesByID();

  // Komponentti ottaa käyttöön "useRepositoriesReviews(...)" hookin, ja hyödynnetään
  // "reviews" muuttujaa. Hookki suorittaa queryn eli "GET_CURRENT_REPOSITORY_REVIEWS",
  // jonka data sijoitetaan "reviews" muuttujaan, jonka avulla voidaan näyttää jokainen
  // arvostelu sen hetkisen "repository":n arvon kanssa.
  const { reviews } = useRepositoriesReviews();

  // Alustetaan "repositoriesNodes" muuttuja, joka saa arvoksi joko tyhjän taulukon
  // arvon tai "repositoriesByID". Jos muuttujasta "repositoriesByID" ei löydy dataa
  // niin palautetaan takaisin tyhjä taulukko ja muussa tapuksessa näytetään data.
  const repositoriesNodes = repositoriesByID
    ? repositoriesByID
    : [];

  // Alustetaan "reviewsNodes" muuttuja, joka saa arvoksi joko tyhjän taulukon
  // arvon tai "reviews..." funktion jälkeisen arvon. Jos muuttujasta "reviews"
  // ei löydy dataa, niin palautetaan takaisin tyhjä taulukko ja muussa tapauksessa
  // näytetään "reviews..." funktion jälkeinen data takaisin käyttäjälle näkyviin.
  const reviewsNodes = reviews
    ? reviews.reviews.edges.map(results => results.node)
    : [];

  // Komponentti renderöi (...) sisällä olevat asiat takaisin käyttäjälle näkyviin.
  // Propsi "ListHeaderComponent" tulee aina ensimmäisenä, kun renderöidään tämän
  // komponentin sisältö, "ItemSeparatorComponent" propsi määrittää sen, että
  // mitä jokaisen arvon välille tehdään eli tässä tapauksessa jokaiselle arvolle
  // tulee väliä "10". Propsi "renderItem" renderöi takaisin sen hetkisen repositoryn
  // arvostelut "item" parametrin avulla, joka tulee "data" propsin kautta, joka
  // on yhdistetty "reviewsNodes" muuttujaan.
  return (
    <FlatList
      data={reviewsNodes}
      keyExtractor={({ id}) => id}
      renderItem={({ item }) => <ReposityListReviews review={item} />}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListHeaderComponent={() => <RepositoryListHeader repository={repositoriesNodes} loadingStatus={loading} />}
    />
  );
};

// Viedään (export) alla oleva komponentti (RepositoryListByID) sovelluksen käytettäväksi, jotta esim. "App.js" tiedosto pystyy suorittamaan kyseiset funktiot.
export default RepositoryListByID;
