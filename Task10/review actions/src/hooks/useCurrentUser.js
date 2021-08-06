// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React, { useState, useEffect } from 'react'; // Otetaan käyttöön "react" niminen kirjasto sovelluksen käytettäväksi.
import { useQuery } from '@apollo/client'; // Sovellus ottaa käyttöön kyseiset funktiot "@apollo/client" kirjaston kautta.
import { GET_CURRENT_USER_DATA } from '../graphql/queries'; // Otetaan kyseiset mutaatiot sovelluksen käytettäväksi "mutations.js" tiedoston kautta.

// Alustetaan "useCurrentUser" niminen hookki, joka suorittaa {...} sisällä olevat asiat aina, kun
// kyseiseen hookkiin tehdään viittaus. Kun käyttäjä kirjautuu sovellukseen ensimmäistä kertaa,
// niin hookki saa parametrin "currentUser" arvon (eli löytyy dataa) käyttöönsä, jonka kautta
// alla oleva query eli "GET_CURRENT_USER_DATA" näyttää sen hetkisen kirjautuneen käyttäjän
// luomat eri arvostelujen arvot. Myös aina, kun käyttäjä haluaa lisätä uuden arvostelun tai
// poistaa nykyisen arvostelun, niin data haetaan uudestaan palvelimesta eli query suoritetaan
// uudestaan, jonka kautta hookki muuttaa "currentUserReviews" muuttujan tilaa ja palauttaa
// arvon takaisin "MyReviewsList" komponentin käytettäväksi.
const useCurrentUser = (currentUser) => {

  const [currentUserReviews, setCurrentUserReviews] = useState(null); // Alustetaan "currentUserReviews" muuttuja tilaan, joka saa oletuksena "null" arvon.

  // Alustetaan "GET_CURRENT_USER_DATA" query, jona kautta päästään {...} sisällä oleviin
  // muuttujien arvoihin. Kun query on suoritettu loppuun ja palauttaa palvelimesta kautta
  // tulevan datan, niin siihen me päästään käsiksi "data" muuttujan avulla.
  const { loading, error, data } = useQuery(GET_CURRENT_USER_DATA, {
    variables: {
      includeReviews: currentUser !== null ? true : false
    }
  });

  // Otetaan käyttöön "useEffect(...)" funktio, joka suorittaa {...} sisällä
  // olevat asiat aina, kun sovelluksen aikana "data" muuttujassa tapahtuu
  // muutoksia eli aina kun funktiota suoritetaan, niin me muutetaan
  // muuttujan "currentUserReviews" tilaa => "data.authorizedUser" muuttujan
  // dataan ja kyseistä arvoa käytetään "MyReviewsList" komponentissa.
  useEffect(() => {
    if (data) {
      setCurrentUserReviews(data.authorizedUser)
    }
  }, [data]);

  // "useCurrentUser" hookki palauttaa takaisin {...} sisällä olevat muuttujat muiden komponenttien käytettäväksi.
  return { data, currentUserReviews, setCurrentUserReviews };
};

// Viedään (export) alla oleva hookki (useCurrentUser) sovelluksen käytettäväksi, jotta esim. "App.js" tiedosto pystyy suorittamaan kyseiset funktiot.
export default useCurrentUser;
