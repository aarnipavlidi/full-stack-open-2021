// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import AsyncStorage from '@react-native-async-storage/async-storage'; // Alustetaan "AsyncStorage", joka hyödyntää kyseisen kirjaston sisältöä sovelluksen aikana.

// Alustetaan "AuthStorage" niminen classi, joka saa käyttöönsä {...} sisällä
// olevia erilaisia funktioita. Jos esim. halutaan saada sen hetkisen kirjautuneen
// käyttäjän "token":in arvo, niin käytämme esim. "authStorage.getAccessToken(...)".
class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  // Alustetaan "getAccessToken(...)" funktio, joka suorittaa {...} sisällä
  // olevat asiat aina, kun kyseiseen funktioon tehdään viittaus.
  async getAccessToken() {
    const currentUserToken = await AsyncStorage.getItem(`${this.namespace}`); // Alustetaan "currentUserToken" muuttuja, joka suorittaa kyseisen funktion.
    console.log(currentUserToken); // Tulostetaan "currentUserToken" muuttujan arvo takaisin konsoliin näkyviin.

    // Jos "currentUserToken" muuttujasta löytyy dataa, niin palauteaan takaisin ensimmäinen
    // vaihtoehto eli "JSON.parse(currentUserToken)", muussa tapauksessa palautetaan
    // tyhjä taulukko eli [] takaisin funktion suorittamisen jälkeen.
    return currentUserToken ? JSON.parse(currentUserToken) : [];
  }

  // Alustetaan "setAccessToken(...)" funktio, joka suorittaa {...} sisällä
  // olevat asiat aina, kun kyseiseen funktioon tehdään viittaus. Funktio
  // saa myös käyttöönsä parametrin arvon => "accessToken".
  async setAccessToken(accessToken) {
    await AsyncStorage.setItem(`${this.namespace}`, JSON.stringify(accessToken));
  }

  // Alustetaan "removeAccessToken(...)" funktio, joka suorittaa {...} sisällä
  // olevat asiat aina, kun kyseiseen funktioon tehdään viittaus.
  async removeAccessToken() {
    await AsyncStorage.removeItem(`${this.namespace}`);
  }
}

// Viedään (export) alla oleva funktio (AuthStorage) sovelluksen käytettäväksi, jotta esim. "App.js" tiedosto pystyy suorittamaan kyseiset funktiot.
export default AuthStorage;
