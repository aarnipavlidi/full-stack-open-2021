// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import { useQuery } from '@apollo/client' // Sovellus ottaa käyttöön kyseiset funktiot "@apollo/client" kirjaston kautta.
import { GET_CURRENT_REPOSITORY_REVIEWS } from '../graphql/queries'; // Otetaan kyseiset queryt sovelluksen käytettäväksi "queries.js" tiedoston kautta.

// Alustetaan "useRepositoriesReviews" hookki, joka suorittaa {...} sisällä olevat asiat
// aina kun kyseiseen hookkiin tehdään viittaus. Hookin avulla haetaan palvelimesta
// sen hetkinen (klikattu) "repository":n arvon ja näytetään takaisin käyttäjälle
// kaikki arvostelut, jotka viittaavat kyseiseen "repository":n arvoon. Sen hetkinen
// arvo me saadaan "useParams(...)" funktion avulla, jonka muuttuja eli "id" sijoitetaan
// queryn "repositoryID" objektin alle.
const useRepositoriesReviews = (variables) => {

  // Alustetaan "GET_CURRENT_REPOSITORY_REVIEWS" query, ja otetaan käyttöön {...}
  // sisällä olevat muuttujien arvot. Kun query on suoritettu, niin dataan
  // päästään käsiksi "data" muuttujan avulla ja, jos dataa vielä ladataan
  // palvelimesta eli ei voida näyttää dataa vielä takaisin käyttäjälle,
  // niin "loading" muuttuja on arvoa "true", jota voidaan hyödyntää esim.
  // renderöimällä "spinner" yms. takaisin käyttäjälle näkyviin.
  const { data, loading, fetchMore, ...result } = useQuery(GET_CURRENT_REPOSITORY_REVIEWS, {
    variables,
    fetchPolicy: 'cache-and-network',
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
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;

    // Jos muuttuja "canFetchMore" on => "false", niin suoritetaan {...} sisällä oleva asia.
    if (!canFetchMore) {
      return;
    }

    // Muussa tapauksessa suoritetaan alla oleva funktio.
    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  // "useRepositories" hookki palauttaa takaisin {...} sisällä olevat muuttujat muiden komponenttien käytettäväksi.
  return {
    reviews: data?.repository,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

// Viedään (export) alla oleva hookki (useRepositoriesReviews) sovelluksen käytettäväksi, jotta esim. "App.js" tiedosto pystyy suorittamaan kyseiset funktiot.
export default useRepositoriesReviews;
