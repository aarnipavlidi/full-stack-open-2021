// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import { useState, useEffect } from 'react'; // Sovellus ottaa kyseiset funktiot "react" kirjaston kautta.
import { useQuery } from '@apollo/client' // Sovellus ottaa käyttöön kyseiset funktiot "@apollo/client" kirjaston kautta.
import { useParams } from 'react-router-native'; // Otetaan kyseiset komponentit käyttöön "react-router-native" kirjaston kautta sovelluksen käytettäväksi.
import { GET_CURRENT_REPOSITORY } from '../graphql/queries'; // Otetaan kyseiset queryt sovelluksen käytettäväksi "queries.js" tiedoston kautta.

// Alustetaan "useRepositoriesByID" hookki, joka suorittaa {...} sisällä olevat asiat
// aina kun kyseiseen hookkiin tehdään viittaus. Hookin avulla haetaan palvelimesta
// sen hetkinen (klikattu) "repository":n arvon ja näytetään takaisin käyttäjälle
// näkyviin. Sen hetkinen arvo me saadaan "useParams(...)" funktion avulla, jonka
// muuttuja eli "id" sijoitetaan queryn "repositoryID" objektin alle.
const useRepositoriesByID = () => {

  const { id } = useParams(); // Alustetaan muuttuja "id", jonka avulla suoritetaan "useParams(...)" funktio.

  const [repositoriesByID, setRepositoriesByID] = useState(); // Alustetaan "repositoriesByID" muuttuja tilaan.

  // Alustetaan "GET_CURRENT_REPOSITORY" query, ja otetaan käyttöön {...}
  // sisällä olevat muuttujien arvot. Kun query on suoritettu, niin dataan
  // päästään käsiksi "data" muuttujan avulla ja, jos dataa vielä ladataan
  // palvelimesta eli ei voida näyttää dataa vielä takaisin käyttäjälle,
  // niin "loading" muuttuja on arvoa "true", jota voidaan hyödyntää esim.
  // renderöimällä "spinner" yms. takaisin käyttäjälle näkyviin.
  const { data, error, loading } = useQuery(GET_CURRENT_REPOSITORY, {
    variables: { repositoryID: id }
  });

  // Alustetaan "fetchRepositoriesByID" funktio, joka suorittaa {...} sisällä
  // olevat asiat aina, kun kyseiseen funktioon tehdään viittaus. Jos "data"
  // muuttujasta löytyy dataa, niin muutetaan "repositoriesByID" muuttujan
  // tilaa sijoittamalla "data.repository" muuttujan data.
  const fetchRepositoriesByID = async () => {
    if (data) {
      setRepositoriesByID(data.repository)
    };
  };

  // Alustetaan "useEffect(...)" funktio, joka suorittaa {...} sisällä olevat
  // asiat aina, kun kyseiseen funktioon tehdään viittaus. Jos "data" muuttujasta
  // löytyy dataa, niin suoritetaan "fetchRepositoriesByID(...)" funktio. Kyseinen
  // "useEffect(...)" funktio suoritetaan aina, kun tapahtuu muutoksia "data"
  // muuttujan osalta.
  useEffect(() => {
    if (data) {
      fetchRepositoriesByID();
    }
  }, [data]);

  // Hookki palauttaa takaisin {...} sisällä olevat muuttujat komponenttien käytettäväksi,
  // eli voimme tehdä esim. => "{ repositoriesByID, loading } = useRepositoriesByID();"
  return { repositoriesByID, loading, refetch: fetchRepositoriesByID };
};

// Viedään (export) alla oleva hookki (useRepositoriesByID) sovelluksen käytettäväksi, jotta esim. "App.js" tiedosto pystyy suorittamaan kyseiset funktiot.
export default useRepositoriesByID;
