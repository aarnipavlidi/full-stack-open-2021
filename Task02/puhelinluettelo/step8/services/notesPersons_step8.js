// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import axios from 'axios' // Otetaan "Axios" kirjaston sisältö käyttöön.
const database = 'http://localhost:3001/persons' // Alustetaan muuttuja "database", joka hyödyntää "db.json" arvoja, joka sijaitsee kyseisellä sivulla.

// Alustetaan muuttuja "getAllValues", jonka tarkoituksena ottaa arvot "database" muuttujan sisältä ja palauttaa (return request.then) takaisin käyttäjälle näkyviin.
// Kun käyttäjä avaa sivun ensimmäisen kerran, niin sivulle renderöitään tiedot tietokannasta tämän muuttujan kautta.
const getAllValues = () => {
  const request = axios.get(database) // Muuttuja "database" alustettu rivillä 2.
  return request.then(response => {
    return response.data // Kun funktio on suoriettu, niin sen hetkinen data tallennetaan "response.data" alle, jotta sen muuttujan dataa voidaan hyödyntää sivulla. Jos tätä ei olisi, niin tulisi erroria!
  })
}

// Alustetaan muuttuja "createValue", jonka tarkoituksena on toimia niin kun käyttäjä haluaa haluaa lisätä uudet tiedot tietokantaan, niin me otetaan käyttäjän antamat tiedot "newValue" muuttujan alle ja sijoitetaan ne tietokantaan "database" muuttujan avulla.
// Aina kun käyttäjä haluaa lisätä uudet tiedot tietokantaan, niin sivu suorittaa aina kyseisen funktion eli => "createValue(...)".
const createValue = (newValue) => { // Alustetaan myös "newValue" muuttujan käyttö funktion sisällä. Jos tätä ei olisi, niin tulisi erroria!
  const request = axios.post(database, newValue) // Muuttuja "database" alustettu rivillä 2.
  return request.then(response => {
    return response.data // Kun funktio on suoritettu, niin sen hetkinen data tallennetaan "response.data" alle, jotta sen muuttujan dataa voidaan hyödyntää sivulla. Jos tätä ei olisi, niin tulisi erroria!
  })
}

// Kyseisten muuttujien "export", jos tätä ei olisi, niin näitä ei pystyisi käyttämään "App.js" sisällä.
export default { getAllValues, createValue } // Ota huomioon, että tämä pitää myös importtaa "App.js" sisällä esim. seuraavalla tavalla ==> import notesService from './services/notesPersons'.
