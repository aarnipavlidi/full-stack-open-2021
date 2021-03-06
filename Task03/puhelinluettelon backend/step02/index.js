// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

// Creates an Express application. The express() function is a top-level function exported by the express module. More information @ http://expressjs.com/en/api.html
const express = require("express") // Alustetaan muuttuja "express", joka vaatii Expressin kirjaston hyödyntämistä.
const program = express() // Alustetaan muuttuja "program", jonka tarkoituksena on luoda Express applikaatio.

let persons = [ // Alustetaan muuttuja "persons", jonka sisälle tulee neljä (4) erilaista arvoa (array) ja jokaisen arvon sisältä löytyy kolme (3) erilaista objektia.
  {
    id: 1,
    name: "Arto Hellas" ,
    number: "040-123456"
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523"
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345"
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122"
  }
]

const maxValue = Math.max(...persons.map(findID => findID.id)) // Alustetaan muuttuja "maxValue", joka hyödyntää "Math.max" funktiota. Jotta me voidaan hyödyntää sitä, niin meidän täytyy luoda taulukosta (persons) kopio, ja etsii sen sisältä jokainen arvo, josta löytyy "id" niminen objekti. Tämän jälkeen se palauttaa korkeimman arvon "maxValue" muuttujan alle.
const showValue = `<h3>There is total of ${maxValue} different persons inside phonebook!</h3>` // Alustetaan muuttuja "showValue", joka on yhtä kuin kyseinen oleva teksti. Tekstin sisältä löytyy myös muuttujan "maxValue" arvo.

const serverTimeDate = new Date().toGMTString() // Alustetaan muuttuja "serverTimeDate", joka näyttää sen hetkisen päivämäärän sekä kellonajan GMT:n muodossa.

// Aina kun käyttäjä yrittää mennä "http://localhost:3001/info" osoitteeseen, niin sovellus palauttaa vastauksena takaisin käyttäjälle "response" muuttujan avulla alla olevan tekstin.
program.get("/info", (request, response) => { // Määritellään sovellukselle tapahtumankäsittelijä (event handler), joka hoitaa sovelluksen polkuun eli "/info" tulevia "HTTP GET" pyyntöjä.
  response.send(`<h4>There is total of ${maxValue} different persons inside phonebook! <br><br> ${serverTimeDate} (Greenwich Mean Time)</h4>`) // Sovellus palauttaa kyseisen tekstin näkyviin käyttäjälle.
  console.log(maxValue) // Tulostaa kyseisen muuttujan "maxValue" arvon terminaaliin näkyviin.
  console.log(serverTimeDate) // Tulostaa kyseisen muuttujan "serverTimeDate" arvon terminaaliin näkyviin.
})

// Muuttujan "persons" data siirtyy .json muodossa selaimeen näkyviin kyseiseen osoitteeseen eli "http://localhost:3001/api/luettelo". Sen voi halutessaan muuttaa esim. => "/api/aarni".
program.get("/api/luettelo", (request, response) => { // Määritellään sovellukselle tapahtumankäsittelijä (event handler), joka hoitaa sovelluksen polkuun eli "/api/luettelo" tulevia "HTTP GET" pyyntöjä.
  response.json(persons) // Pyyntöön vastataan takaisin "response" muuttujan avulla ja Express muuttaa datan automaattisesti .json muotoon. Data näkyy sitten sekä osoitteessa että terminaalissa.
})

const port = 3001 // Alustetaan muuttuja "port", joka on yhtä kuin portin numero "3001".
// xxx.listen() funktion tarkoituksena on sitoa ja kuunnella yhteyksiä määritellyn isännän sekä portin kanssa.
program.listen(port, () => { // Jos tätä ei olisi, niin osoitteeseen eikä terminaaliin ilmestyisi mitään!
  console.log(`Server is running on following port => ${port}`) // Tulostaa kyseisen tekstin näkyviin terminaaliin, kun ohjelma käynnistyy (tai käynnistyy uudestaan).
})
