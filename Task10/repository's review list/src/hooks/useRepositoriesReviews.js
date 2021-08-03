// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import { useState, useEffect } from 'react'; // Sovellus ottaa kyseiset funktiot "react" kirjaston kautta.
import { useQuery } from '@apollo/client' // Sovellus ottaa käyttöön kyseiset funktiot "@apollo/client" kirjaston kautta.
import { useParams } from 'react-router-native'; // Otetaan kyseiset komponentit käyttöön "react-router-native" kirjaston kautta sovelluksen käytettäväksi.
import { GET_CURRENT_REPOSITORY_REVIEWS } from '../graphql/queries'; // Otetaan kyseiset queryt sovelluksen käytettäväksi "queries.js" tiedoston kautta.

// Alustetaan "useRepositoriesReviews" hookki, joka suorittaa {...} sisällä olevat asiat
// aina kun kyseiseen hookkiin tehdään viittaus. Hookin avulla haetaan palvelimesta
// sen hetkinen (klikattu) "repository":n arvon ja näytetään takaisin käyttäjälle
// kaikki arvostelut, jotka viittaavat kyseiseen "repository":n arvoon. Sen hetkinen
// arvo me saadaan "useParams(...)" funktion avulla, jonka muuttuja eli "id" sijoitetaan
// queryn "repositoryID" objektin alle.
const useRepositoriesReviews = () => {

  const { id } = useParams(); // Alustetaan muuttuja "id", jonka avulla suoritetaan "useParams(...)" funktio.

  const [reviews, setReviews] = useState(); // Alustetaan "reviews" muuttuja tilaan.

  // Alustetaan "GET_CURRENT_REPOSITORY_REVIEWS" query, ja otetaan käyttöön {...}
  // sisällä olevat muuttujien arvot. Kun query on suoritettu, niin dataan
  // päästään käsiksi "data" muuttujan avulla ja, jos dataa vielä ladataan
  // palvelimesta eli ei voida näyttää dataa vielä takaisin käyttäjälle,
  // niin "loading" muuttuja on arvoa "true", jota voidaan hyödyntää esim.
  // renderöimällä "spinner" yms. takaisin käyttäjälle näkyviin.
  const { data, error, loading } = useQuery(GET_CURRENT_REPOSITORY_REVIEWS, {
    variables: { repositoryID: id }
  });

  // Alustetaan "fetchRepositoriesReviews" funktio, joka suorittaa {...} sisällä
  // olevat asiat aina, kun kyseiseen funktioon tehdään viittaus. Jos "data"
  // muuttujasta löytyy dataa, niin muutetaan "reviews" muuttujan
  // tilaa sijoittamalla "data.repository" muuttujan data.
  const fetchRepositoriesReviews = async () => {
    if (data) {
      setReviews(data.repository)
    };
  };

  // Alustetaan "useEffect(...)" funktio, joka suorittaa {...} sisällä olevat
  // asiat aina, kun kyseiseen funktioon tehdään viittaus. Jos "data" muuttujasta
  // löytyy dataa, niin suoritetaan "fetchRepositoriesReviews(...)" funktio.
  // Kyseinen "useEffect(...)" funktio suoritetaan aina, kun tapahtuu muutoksia
  // "data" muuttujan osalta.
  useEffect(() => {
    if (data) {
      fetchRepositoriesReviews();
    }
  }, [data]);

  // Hookki palauttaa takaisin {...} sisällä olevat muuttujat komponenttien käytettäväksi,
  // eli voimme tehdä esim. => "{ reviews, loading } = useRepositoriesReviews();"
  return { reviews, loading, refetch: fetchRepositoriesReviews };
};

// Viedään (export) alla oleva hookki (useRepositoriesReviews) sovelluksen käytettäväksi, jotta esim. "App.js" tiedosto pystyy suorittamaan kyseiset funktiot.
export default useRepositoriesReviews;
