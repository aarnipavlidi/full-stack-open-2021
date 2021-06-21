// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import axios from 'axios' // Sovellus ottaa "axios" nimisen kirjaston käyttöönsä.
const url = '/api/users' // Alustetaan muuttuja "url", joka on yhtä kuin kyseisen tekstin arvo.

// Alustetaan muuttuja "getUsersFromDatabase", joka suorittaa {...} sisällä olevat
// asiat, aina kun kyseiseen funktioon tehdään viittaus. Funktio hakee sen hetkiset
// sovelluksen käyttäjätunnukset tietokannasta ja palauttaa takaisin muuttujan
// => "response.data" alle. Funktiota käytetään "Users" komponentissa.
const getUsersFromDatabase = async () => {
  const response = await axios.get(url)
  return response.data
}

// Viedään (export) alla olevat muuttujat sovelluksen käytettäväksi, jotta esim. "App.js" tiedosto pystyy suorittamaan kyseiset funktiot.
export default { getUsersFromDatabase }
