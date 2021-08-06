// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import { useQuery } from '@apollo/client' // Sovellus ottaa käyttöön kyseiset funktiot "@apollo/client" kirjaston kautta.
import { GET_ALL_REPOSITORIES } from '../graphql/queries'; // Otetaan kyseiset queryt sovelluksen käytettäväksi "queries.js" tiedoston kautta.

// Alustetaan "useRepositories" niminen hookki, joka suorittaa {...} sisällä olevat asiat aina,
// kun kyseiseen hookkiin tehdään viittaus. Hookin tarkoitus on hakea siis erikseen palvelimesta
// kautta tuleva data ja siirtää data "repositories" muuttujan tilaan, jotta muut komponentit
// pääsevät käsiksi kyseisen muuttujan arvoon. Olemme myös muokanneet alla olevaa "useEffect(...)"
// funktiota niin, että aina kun data ilmestyy "GET_ALL_REPOSITORIES" queryn alla, niin suoritetaan
// kyseinen funktio, muussa tapauksessa ei tehdä mitään.
const useRepositories = (variables) => {

  // Otetaan käyttöön "GET_ALL_REPOSITORIES" query, joka saa käyttöönsä "data",
  // "error" sekä "loading" muuttujien arvot, joida voidaan hyödyntää tämän
  // hookin osalta. Voisimme esim. palauttaa takaisin käyttäjälle tekstin
  // "Data is loading!" => "if (loading) { return "your_text_here" }" ehdon avulla.
  const { data, loading, fetchMore, ...result } = useQuery(GET_ALL_REPOSITORIES, {
    variables,
    fetchPolicy: 'cache-and-network'
  });

  // Alustetaan "handleFetchMore" muuttuja, joka suorittaa {...} sisällä olevat asiat aina,
  // kun kyseiseen funktioon tehdään viittaus. Funktion avulla siis tarkistetaan ensin,
  // muuttujan "canFetchMore" avulla, että kun käyttäjä on päässyt "viimeiseen" renderöityyn
  // arvoon näytöllä, niin että löytyykö lisää vielä "samaa dataa" => "pageInfo.hasNextPage"
  // muuttujan arvolla. Muuttuja on joko muotoa "false" tai "true". Jos muuttuja on arvoa
  // "false", niin funktio ei tee mitään (return;) ja muussa tapauksessa suoritetaan funktio
  // "fetchMore(...)", jolle annetaan "variables" objektin arvo, johon sijoitetaan hookin
  // kautta tuleva "variables" parametrin arvo sekä "after" objektin arvo, joka saa arvoksi
  // "pageInfo.endCursor" muuttujan arvon eli viimeisin arvo mikä on "viimeksi" renderöity
  // takaisin käyttäjälle näkyviin. Tämän avulla sovellus pystyy hakemaan palvelimesta
  // seuraavan arvon mitä näytetään takaisin käyttäjälle, eikä tule "samoja arvoja" takaisin.
  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    // Jos muuttuja "canFetchMore" on => "false", niin suoritetaan {...} sisällä oleva asia.
    if (!canFetchMore) {
      return;
    }

    // Muussa tapauksessa suoritetaan alla oleva funktio.
    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  // "useRepositories" hookki palauttaa takaisin {...} sisällä olevat muuttujat muiden komponenttien käytettäväksi.
  return {
    repositories: data?.repositories,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

// Viedään (export) alla oleva hookki (useRepositories) sovelluksen käytettäväksi, jotta esim. "App.js" tiedosto pystyy suorittamaan kyseiset funktiot.
export default useRepositories;
