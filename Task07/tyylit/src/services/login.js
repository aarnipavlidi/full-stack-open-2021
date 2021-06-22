// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import axios from 'axios' // Sovellus ottaa "axios" nimisen kirjaston käyttöönsä.
const url = '/api/login' // Alustetaan muuttuja "url", joka on yhtä kuin kyseisen tekstin arvo.

// Alustetaan muuttuja "login", joka suorittaa {...} sisällä olevat asiat. Muuttuja saa myös parametrin "credentials" arvon käyttöönsä.
// Aina kun käyttäjä haluaa kirjautua sisään, niin tähän funktioon tehdään viittaus => "const userValue = await loginService.login".
// Kun alla oleva funktio on suoritettu, niin palautetaan data takaisin käyttäjälle "response.data" muuttujan avulla.
const login = async credentials => {
  const response = await axios.post(url, credentials)
  return response.data
}

// Viedään (export) alla olevat muuttujat sovelluksen käytettäväksi, jotta esim. "App.js" tiedosto pystyy suorittamaan kyseiset funktiot.
export default { login }
