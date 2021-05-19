// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import axios from 'axios' // Sovellus ottaa "axios" nimisen kirjaston käyttöönsä.
const url = 'http://localhost:3001/anecdotes' // Alustetaan muuttuja "url", joka on yhtä kuin kyseisen tekstin arvo.

// Alustetaan muuttuja "getValuesFromDatabase", joka suorittaa {...} sisällä olevat asiat. Kun alla
// oleva funktio on suoritettu, niin palautetaan data takaisin käyttäjälle näkyviin
// "response.data" muuttujan avulla. Funktiota hyödynnetään => "App.js" tiedostossa.
const getValuesFromDatabase = async () => {
  const response = await axios.get(url) // Alustetaan muuttuja "response", joka suorittaa kyseisen funktion kunnes siirtyy seuraavaan kohtaan sovelluksessa.
  return response.data // Funktio palauttaa takaisin käyttäjälle => "response.data" muuttujan arvon.
}

// Alustetaan muuttuja "createNewValueDatabase", joka suorittaa {...} sisällä olevat asiat. Kun
// alla oleva funktio on suoritettu, niin palautetaan data takaisin käyttäjälle näkyviin
// "response.data" muuttujan avulla. Funktiota hyödynnetään => "AnecdoteForm.js" tiedostossa.
// Funktio saa myös käyttöönsä "getContent" parametrin arvon, eli aina kun käyttäjä lisää
// uuden arvon tietokantaan, niin sen hetkinen arvo tallentuu kyseisen parametrin alle.
const createNewValueDatabase = async (getContent) => {
  const valueStructure = { // Alustetaan muuttuja "valueStructure", joka saa {...} sisällä olevat objektit käyttöönsä.
    content: getContent, // eli "valueStructure.content" on yhtä kuin => "getContent" muuttujan arvo.
    votes: 0 // eli "valueStructure.votes" on yhtä kuin => "0" arvo.
  }
  const response = await axios.post(url, valueStructure) // Alustetaan muuttuja "response", joka suorittaa kyseisen funktion kunnes siirtyy seuraavaan kohtaan sovelluksessa.
  return response.data // Funktio palauttaa takaisin käyttäjälle => "response.data" muuttujan arvon.
}

// Alustetaan muuttuja "updateValueDatabase", joka suorittaa {...} sisällä olevat asiat. Kun
// alla oleva funktio on suoritettu, niin palautetaan data takaisin käyttäjälle näkyviin
// "response.data" muuttujan avulla. Funktiota hyödynnetään => "AnecdoteList.js" tiedostossa.
// Funktio saa myös käyttöönsä "getCurrentValue" parametrin arvon, eli aina kun käyttäjä
// haluaa antaa uuden äänen (vote) tietylle tekstille, niin kyseisen tekstin arvot eli =>
// "content", "votes" sekä "id" siirtyvät kyseisen parametrin alle.
const updateValueDatabase = async (getCurrentValue) => {
  const updateVotes = {
    content: getCurrentValue.content,
    votes: getCurrentValue.votes + 1
  }
  const response = await axios.put(`${url}/${getCurrentValue.id}`, updateVotes) // Alustetaan muuttuja "response", joka suorittaa kyseisen funktion kunnes siirtyy seuraavaan kohtaan sovelluksessa.
  return response.data // Funktio palauttaa takaisin käyttäjälle => "response.data" muuttujan arvon.
}

// Viedään (export) alla olevat muuttujat sovelluksen käytettäväksi, jotta esim. "App.js" tiedosto pystyy suorittamaan kyseiset funktiot.
export default { getValuesFromDatabase, createNewValueDatabase, updateValueDatabase }
