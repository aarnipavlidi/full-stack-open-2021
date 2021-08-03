// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import { useState, useEffect } from 'react'; // Sovellus ottaa kyseiset funktiot "react" kirjaston kautta.
import { useQuery } from '@apollo/client' // Sovellus ottaa käyttöön kyseiset funktiot "@apollo/client" kirjaston kautta.
import { GET_ALL_REPOSITORIES } from '../graphql/queries'; // Otetaan kyseiset queryt sovelluksen käytettäväksi "queries.js" tiedoston kautta.

// Alustetaan "useRepositories" niminen hookki, joka suorittaa {...} sisällä olevat asiat aina,
// kun kyseiseen hookkiin tehdään viittaus. Hookin tarkoitus on hakea siis erikseen palvelimesta
// kautta tuleva data ja siirtää data "repositories" muuttujan tilaan, jotta muut komponentit
// pääsevät käsiksi kyseisen muuttujan arvoon. Olemme myös muokanneet alla olevaa "useEffect(...)"
// funktiota niin, että aina kun data ilmestyy "GET_ALL_REPOSITORIES" queryn alla, niin suoritetaan
// kyseinen funktio, muussa tapauksessa ei tehdä mitään.
const useRepositories = () => {
  const [repositories, setRepositories] = useState(); // Alustetaan "repositories" muuttuja tilaan.

  // Otetaan käyttöön "GET_ALL_REPOSITORIES" query, joka saa käyttöönsä "data",
  // "error" sekä "loading" muuttujien arvot, joida voidaan hyödyntää tämän
  // hookin osalta. Voisimme esim. palauttaa takaisin käyttäjälle tekstin
  // "Data is loading!" => "if (loading) { return "your_text_here" }" ehdon avulla.
  const {data, error, loading} = useQuery(GET_ALL_REPOSITORIES, {
    fetchPolicy: 'cache-and-network'
  });

  // Alustetaan "fetchRepositories" niminen muuttuja, joka suorittaa {...}
  // sisällä olevat asiat aina, kun kyseiseen funktioon tehdään viittaus.
  // Funktio muuttaa "repositories" muuttujan tilaa ainoastaan, jos "data"
  // muuttujasta löytyy dataa. Muussa tapauksessa ei tehdä mitään.
  const fetchRepositories = async () => {
    if (data) {
      setRepositories(data.repositories);
    };
  };

  // Alustetaan "useEffect(...)" funktio, joka suorittaa {...} sisällä olevat
  // asiat aina, kun "data" muuttujassa tapahtuu muutoksia. Jos "data" muuttujasta
  // löytyy dataa, niin suoritetaan "fetchRepositories(...)" funktio ja muussa
  // tapuksessa funktio ei tee mitään.
  useEffect(() => {
    if (data) {
      fetchRepositories();
    };
  }, [data]);

  // "useRepositories" hookki palauttaa takaisin {...} sisällä olevat muuttujat muiden komponenttien käytettäväksi.
  return { repositories, loading, refetch: fetchRepositories };
};

// Viedään (export) alla oleva hookki (useRepositories) sovelluksen käytettäväksi, jotta esim. "App.js" tiedosto pystyy suorittamaan kyseiset funktiot.
export default useRepositories;
