// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import { useMutation } from '@apollo/client'; // Sovellus ottaa käyttöön kyseiset funktiot "@apollo/client" kirjaston kautta.
import { CREATE_NEW_USER } from '../graphql/mutations'; // Otetaan kyseiset mutaatiot sovelluksen käytettäväksi "mutations.js" tiedoston kautta.

// Alustetaan "useCreateNewUser" hookki, joka suorittaa {...} sisällä olevat asiat aina,
// kun kyseiseen hookkiin tehdään viittaus. Hookin avulla voidaan luoda uusi käyttäjä
// palvelimeen, käyttäjän antamilla arvoilla eli "username" ja "password", jotka
// sijoitetaan "CREATE_NEW_USER" mutaation => "newUserData" objektin alle. Jos
// mutaation suorittaminen epäonnistuu, niin palautetaan takaisin konsoliin error:in
// teksti ja muussa tapauksessa palautetaan takaisin "response" muuttujan data.
const useCreateNewUser = () => {

  // Alustetaan "createNewUser" muuttuja, joka suorittaa kyseisen mutaation,
  // kun siihen tehdään viittaus. Jos mutaatio onnistuu eli se palauttaa takaisin
  // datan, niin me pääsemme siihen käsiksi "result" muuttujan avulla.
  const [createNewUser, result] = useMutation(CREATE_NEW_USER);

  // Alustetaan "signUp" funktio, joka suorittaa {...} sisällä olevat
  // asiat aina, kun kyseiseen funktioon tehdään viittaus. Kun käyttäjä
  // haluaa rekisteröityä sovellukseen, niin käyttäjän antamilla arvoilla,
  // jotka sijaitsevat lomakkeessa (CreateUser.jsx) suoritetaan kyseinen
  // funktio ja suoritetaan mutaatio sijoittamalla "newUserData" objektiin
  // funktion kautta tulevat parametrin arvot eli "username" ja "password".
  const signUp = async ({ username, password }) => {

    // Alustetaan "response" muuttuja, joka suorittaa kyseisen funktion.
    const response = await createNewUser({
      variables: {
        newUserData: {
          username, password
        }
      }
    });

    // Jos "response.data" muuttujasta löytyy dataa eli mutaation suorittaminen
    // onnistui (käyttäjän lisääminen palvelimeen onnistui), niin palautetaan
    // takaisin "response" muuttujan data ja muussa tapuksessa palautetaan
    // error:in teksti takaisin konsoliin näkyviin.
    if (response.data) {
      return response;
    } else {
      throw new Error('Creating new user was unsuccessful, please try again!');
    };
  };

  // "useCreateNewUser" hookki palauttaa takaisin [...] sisällä olevat muuttujat muiden komponenttien käytettäväksi.
  return [signUp, result];
};

// Viedään (export) alla oleva hookki (useCreateNewUser) sovelluksen käytettäväksi, jotta esim. "App.js" tiedosto pystyy suorittamaan kyseiset funktiot.
export default useCreateNewUser;
