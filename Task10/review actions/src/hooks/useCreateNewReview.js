// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import { useQuery, useMutation } from '@apollo/client'; // Sovellus ottaa käyttöön kyseiset funktiot "@apollo/client" kirjaston kautta.
import { CREATE_NEW_REVIEW } from '../graphql/mutations'; // Otetaan kyseiset mutaatiot sovelluksen käytettäväksi "mutations.js" tiedoston kautta.
import { GET_CURRENT_USER_DATA } from '../graphql/queries'; // Otetaan kyseiset mutaatiot sovelluksen käytettäväksi "mutations.js" tiedoston kautta.

// Alustetaan "useCreateNewReview" niminen hookki, joka suorittaa {...} sisällä olevat
// asiat aina, kun kyseiseen hookkiin tehdään viittaus. Hookin on tarkoitus toimia niin,
// että aina kun käyttäjä haluaa lisätä uuden arvostelun, suoritetaan mutaatio eli
// "CREATE_NEW_REVIEW". Kun käyttäjä lisää arvon, niin sovellus "submittaa" tiedot
// ja suorittaa "createReview(...)" funktion, jonka kautta se sijoittaa funktion
// kautta tulevat parametrin arvot => "createNewReview(...)" funktiolle, jonka
// kautta suoritetaan mutaatio ja tallennetaan uudet tiedot palvelimelle.
const useCreateNewReview = () => {

  // Alustetaan "CREATE_NEW_REVIEW" mutaatio, sekä "createNewReview" ja
  // "result" muuttujat. Muuttujan "createNewReview" avulla voidaan
  // suorittaa mutaatio, ja jos mutaatio onnistuu (eli tallennetaan tiedot
  // palvelimelle), niin me pääsemme käsiksi dataan "result" muuttujan avulla.
  //
  // Muutettu tehtävää "Exercise 10.27: review actions" tehtävää varten alla olevaa
  // mutaatiota "CREATE_NEW_REVIEW", niin että aina kun käyttäjä on lisännyt uuden
  // arvostelun arvon palvelimeen, niin suoritetaan samassa yhteydessä query =>
  // "GET_CURRENT_USER_DATA", jonka kautta sovellus näyttää uusimman datan
  // kaikista arvosteluista minkä sen hetkinen kirjautunut käyttäjä on tehnyt.
  const [createNewReview, result] = useMutation(CREATE_NEW_REVIEW, {
    refetchQueries: [{
      variables: {
        includeReviews: true,
      },
      query: GET_CURRENT_USER_DATA
    }],
  });

  // Alustetaan "createReview" muuttuja, joka suorittaa {...} sisällä olevat
  // asiat, aina kun kyseiseen funktioon tehdään viittaus. Kun käyttäjä
  // lisää uuden arvostelun, niin "submit" painikkeen kautta tämä funktio
  // suoritetaan, joka saa ({...}) sisällä olevat parametrien arvot käyttöönsä.
  // Me muutamme vielä "rating" muuttujan arvon => numeroksi "parseInt(...)"
  // funktion avulla, koska palvelin hyväksyy ainoastaan "Int" muodossa olevia
  // arvoa. "CreateReview" komponentissa "rating" muuttujan kenttä on oletuksena
  // "string" muodossa, kun käyttäjä laittaa tietyn arvon kentän kohdalle.
  const createReview = async ({ ownerName, repositoryName, rating, text }) => {

    rating = parseInt(rating); // Muutetaan "rating" arvo => "string" tyypistä => "number" tyyppiin.

    // Alustetaan "response" muuttuja, joka suorittaa kyseisen funktion eli
    // suoritetaan "CREATE_NEW_REVIEW" mutaatio, johon sijoitetaan objektin
    // "newReviewData" alle => "createReview" muuttujan kautta tulevat
    // parametrien arvot, joiden avulla suoritetaan mutaatio loppuun.
    const response = await createNewReview({
      variables: {
        newReviewData: {
          ownerName, repositoryName, rating, text
        }
      }
    });

    // Jos "response.data" muuttujasta löytyy dataa, eli mutaation suorittaminen
    // on onnistunut, niin palautetaan takaisin "response" muuttujan data. Muussa
    // tapuksessa palautetaan takaisin konsoliin alla olevan errorin teksti.
    if (response.data) {
      return response;
    } else { // Jos yllä oleva if-ehto ei toteudu, niin suoritetaan {...} sisällä olevat asiat.
      throw new Error('Adding new review for this repository was unsuccessful, please try again!')
    };
  };

  // "useCreateNewReview" hookki palauttaa takaisin [...] sisällä olevat muuttujat muiden komponenttien käytettäväksi.
  return [createReview, result]
};

// Viedään (export) alla oleva hookki (useCreateNewReview) sovelluksen käytettäväksi, jotta esim. "App.js" tiedosto pystyy suorittamaan kyseiset funktiot.
export default useCreateNewReview;
