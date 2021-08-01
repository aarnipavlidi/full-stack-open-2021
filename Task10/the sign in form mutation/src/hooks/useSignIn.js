// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import { useMutation } from '@apollo/client' // Sovellus ottaa käyttöön kyseiset funktiot "@apollo/client" kirjaston kautta.
import { USER_LOGIN } from '../graphql/mutations'; // Otetaan kyseiset mutaatiot sovelluksen käytettäväksi "queries.js" tiedoston kautta.

// Alustetaan "useSignIn" niminen hookki, joka suorittaa {...} sisällä olevat asiat aina,
// kun kyseiseen hookkiin tehdään viittaus. Hookki siis hakee palvelimesta sen hetkisen
// kirjautuneen käyttäjän tiedot, ja jos löytyy dataa niin se palauttaa takaisin datan,
// joka vittaa kyseiseen käyttäjään. Tehtävän "Exercise 10.13: the sign in form mutation"
// osalta se palauttaa takaisin "accessToken" objekin arvon.
const useSignIn = () => {

  // Alustetaan "getUserCredentials" muuttuja, joka suorittaa kyseisen mutaation,
  // kun siihen tehdään viittaus. Jos mutaatio onnistuu eli se palauttaa takaisin
  // datan, niin me pääsemme siihen käsiksi "result" muuttujan avulla.
  const [getUserCredentials, result] = useMutation(USER_LOGIN);

  // Alustetaan "signIn" funktio, joka suorittaa {...} sisällä olevat asiat
  // aina kun kyseiseen funktioon tehdään viittaus. Funktio saa käyttöönsä
  // "username" sekä "password" parametrien arvot funktion suorittamista varten.
  const signIn = async ({ username, password }) => {

    // Alustetaan "response" muuttuja, joka suorittaa kyseisen funktion (eli
    // mutaation). Funktio käyttää "variables.userLoginData", koska olimme
    // aikaisemmin alustaneet kyseisen objektin arvo, joka hyödyntää siis
    // "AuthorizeInput" input:in tyyppiä eli sieltä löytyy sekä "username"
    // että "password", joiden molempien täytyy olla "String" muodossa.
    const response = await getUserCredentials({
      variables: {
        userLoginData: {
          username, password
        }
      }
    });

    // Jos "response" muuttujasta löytyy dataa, niin palautetaan takaisin
    // "response" muuttujan arvo, ja muussa tapuksessa palautetaan errori,
    // joka tulostaa alla olevan tekstin takaisin käyttäjälle näkyviin.
    if (response.data) {
      return response;
    } else {
      throw new Error('Could not find token for this current user, please try again!');
    };
  };

  // "useSignIn" hookki palauttaa takaisin [...] sisällä olevat muuttujat muiden komponenttien käytettäväksi.
  return [signIn, result]
};


// Viedään (export) alla oleva hookki (useSignIn) sovelluksen käytettäväksi, jotta esim. "App.js" tiedosto pystyy suorittamaan kyseiset funktiot.
export default useSignIn;
