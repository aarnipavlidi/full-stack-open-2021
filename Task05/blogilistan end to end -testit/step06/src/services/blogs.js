// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import axios from 'axios' // Sovellus ottaa "axios" nimisen kirjaston käyttöönsä.
const url = '/api/blogs' // Alustetaan muuttuja "url", joka on yhtä kuin kyseisen tekstin arvo.

let token = null // Alustetaan muuttuja "token", joka saa "väliaikaisesti" arvon => "null".

// Alustetaan muuttuja  "setTokenValue", joka suorittaa {...} sisällä olevat asiat. Kyseinen funktio saa myös
// käyttöönsä parametrin arvon "getTokenValue", joka on yhtä kuin => "userValue.token" ("App.js" tiedostossa
// oleva muuttuja). Funktio suoritetaan, kun käyttäjä saapuu sovellukseen eli tarkistetaan, onko käyttäjä jo
// kirjautunut sisään. Jos käyttäjä ei ole, niin kun hän kirjautuu sisään sovellukseen, niin funktio suoritetaan
// uudestaan ja sen hetkinen "token" arvo tallennetaan sekä local storageen ja "let token" muuttujan alle.
const setTokenValue = getTokenValue => {
  token = `bearer ${getTokenValue}`
}

// Alustetaan muuttuja "getAllBlogValues", joka suorittaa {...} sisällä olevat asiat. Kyseinen funktio suoritetaan ainoastaan
// silloin, kun käyttäjä saapuu sovellukseen ensimmäistä kertaa. Kun alla oleva funktio on suoritettu, niin palautetaan data
// takaisin käyttäjälle näkyviin "response.data" muuttujan avulla.
const getAllBlogValues = async () => {
  const response = await axios.get(url)
  return response.data
}

// Alustetaan muuttuja "createNewBlogValue", joka suorittaa {...} sisällä olevat asiat. Kyseinen funktio suoritetaan aina,
// kun käyttäjä haluaa lisätä uuden blogin tietokantaan. Funktio saa myös käyttöönsä parametrin "newObject" arvon käyttöönsä,
// joka on yhtä kuin => "blogContent" ("App.js" tiedostossa oleva muuttuja). Olemme myös alustaneet erikseen "headerConfig"
// muuttujan, koska onnistuneen blogin lisääminen tietokantaan vaadii erillistä "token" arvoa. Kun alla oleva funktio on
// suoritettu, niin "response" muuttujan avulla palautetaan data takaisin käyttäjälle näkyviin => "response.data" avulla.
const createNewBlogValue = async newObject => {
  const headerConfig = {
    headers: { Authorization: token }
  }

  const response = await axios.post(url, newObject, headerConfig)
  return response.data
}

// Alustetaan muuttuja "updateBlogValue", joka suorittaa {...} sisällä olevat asiat. Kyseinen funktio suoritetaan aina,
// kun käyttäjä haluaa lisätä uuden blogin tietokantaan. Funktio saa myös käyttöönsä parametrien "id" sekä "updateObject"
// arvot käyttöönsä eli "id" on yhtä kuin => "blogContent.id" ja "updateObject" on yhtä kuin => "blogContent". Molemmat
// muuttujat ovat siis "App.js" tiedostossa olevia muuttujia. Kun alla oleva funktio on suoritettu, niin "response"
// muuttujan avulla palautetaan data takaisin käyttäjälle näkyviin => "response.data" avulla.
const updateBlogValue = async (id, updateObject) => {
  const response = await axios.put(`${url}/${id}`, updateObject)
  return response.data
}

// Alustetaan muuttuja "removeBlogValue", joka suorittaa {...} sisällä olevat asiat. Kyseinen funktio suoritetaan aina,
// kun käyttäjä haluaa poistaa tietyn blogin tietokannasta. Funktio saa myös käyttöönsä parametrin "id" arvon käyttöönsä,
// eli "currentContent.id" (parametrin arvo "App.js" tiedostossa) on yhtä kuin tämän funktion "id" parametrin arvo.
// Kun alla oleva funktio on suoritettu, niin "response" muuttujan avulla palautetaan data takaisin käyttäjälle näkyviin
// => "response.data" avulla. Olemme myös alustaneet "headerConfig" muuttujan, koska ilman sitä blogin poistaminen
// tietokannasta epäonnistuisi. Tämän avulla varmistetaan, että "oikea" käyttäjätunnus poistaa blogin tietokannasta.
const removeBlogValue = async (id) => {
  const headerConfig = {
    headers: { Authorization: token }
  }

  const response = await axios.delete(`${url}/${id}`, headerConfig)
  return response.data
}

// Viedään (export) alla olevat muuttujat sovelluksen käytettäväksi, jotta esim. "App.js" tiedosto pystyy suorittamaan kyseiset funktiot.
export default { setTokenValue, getAllBlogValues, createNewBlogValue, updateBlogValue, removeBlogValue }
