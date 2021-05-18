// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import axios from 'axios' // Sovellus ottaa "axios" nimisen kirjaston käyttöönsä.
const url = 'http://localhost:3001/anecdotes' // Alustetaan muuttuja "url", joka on yhtä kuin kyseisen tekstin arvo.

// Alustetaan muuttuja "getValuesFromDatabase", joka suorittaa {...} sisällä olevat asiat. Kun alla
// oleva funktio on suoritettu, niin palautetaan data takaisin käyttäjälle näkyviin
// "response.data" muuttujan avulla. Funktiota hyödynnetään => "App.js" tiedostossa.
const getValuesFromDatabase = async () => {
  const response = await axios.get(url)
  return response.data
}

// Viedään (export) alla olevat muuttujat sovelluksen käytettäväksi, jotta esim. "App.js" tiedosto pystyy suorittamaan kyseiset funktiot.
export default { getValuesFromDatabase }
