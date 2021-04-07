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

// Muuttujan "persons" data siirtyy .json muodossa selaimeen näkyviin kyseiseen osoitteeseen eli "http://localhost:3001/api/persons". Sen voi halutessaan muuttaa esim. => "/api/aarni".
program.get("/api/persons", (request, response) => { // Määritellään sovellukselle tapahtumankäsittelijä (event handler), joka hoitaa sovelluksen polkuun eli "/api/persons" tulevia "HTTP GET" pyyntöjä.
  response.json(persons) // Pyyntöön vastataan takaisin "response" muuttujan avulla ja Express muuttaa datan automaattisesti .json muotoon. Data näkyy sitten sekä osoitteessa että terminaalissa.
})

// Aina kun käyttäjä yrittää mennä "http://localhost:3001/api/persons/:id" (missä => ":id" on [1, 2, 3, 4]) osoitteeseen, sovellus palauttaa vastauksena takaisin käyttäjälle "response" muuttujan avulla.
program.get("/api/persons/:id", (request, response) => { // Määritellään sovellukselle tapahtumankäsittelijä (event handler), joka hoitaa sovelluksen polkuun eli "/api/persons/:id" tulevia "HTTP GET" pyyntöjä.
  const showID = Number(request.params.id) // Alustetaan muuttuja "showID", joka on yhtä kuin Number(...) funktion kanssa. Mitä "request.params.id" tarkoittaa käytännössä, että aina kun käyttäjä menee esim. osoitteeseen => "http://localhost:3001/api/persons/2" niin se hakee sen kohdalta "id" objektin arvon ja palauttaa takaisin "showID" muuttujan alle.
  const showPerson = persons.find(showResult => showResult.id === showID) // Alustetaan muuttuja "showPerson", joka etsii taulukosta "persons" arvon, jonka "id" objekti on yhtä kuin "showID" muuttujan kanssa.

  if (showPerson) { // Käytetään "if" funktiota eli, jos "showPerson" toteutuu => siis löytyy käyttäjän hakema "id":n arvo (esim. http://localhost:3001/api/persons/2), niin palautetaan "showPerson" muuttujan oleva data .json muodossa takaisin käyttäjälle.
    response.json(showPerson) // Palauttaa takaisin "showPerson" muuttujan olevan datan .json muodossa.
    console.log(showPerson) // Tulostaa kyseisen muuttujan "showPerson" arvon terminaaliin näkyviin.
  } else { // Jos "if" funktio ei toteudu eli, jos käyttäjä yrittää mennä osoitteeseen minkä "id":n arvoa ei löydy tietokannasta, niin palautetaan statuskoodi "404".
    response.status(404).end() // Palautetaan statuskoodi "404" takaisin käyttäjälle, jonka jälkeen suljetaan "response" muuttujan prosessi käyttämällä "end()" funktiota.
    console.log(showPerson) // Tulostaa kyseisen muuttujan "showPerson" arvon terminaaliin näkyviin.
  }
})

// Aina kun käyttäjä yrittää poistaa "http://localhost:3001/api/persons/:id" (missä => ":id" on [1, 2, 3, 4]) osoitteesta arvon, niin sovellus palauttaa vastauksena takaisin käyttäjälle "response" muuttujan avulla.
program.delete("/api/persons/:id", (request, response) => { // Määritellään sovellukselle tapahtumankäsittelijä (event handler), joka hoitaa sovelluksen polkuun eli "/api/persons/:id" tulevia "HTTP GET" pyyntöjä.
  const showID = Number(request.params.id) // Alustetaan muuttuja "showID", joka on yhtä kuin Number(...) funktion kanssa. Mitä "request.params.id" tarkoittaa käytännössä, että aina kun käyttäjä menee esim. osoitteeseen => "http://localhost:3001/api/persons/2" niin se hakee sen kohdalta "id" objektin arvon ja palauttaa takaisin "showID" muuttujan alle.
  console.log("Seuraavaksi tulostuu persons muuttujan taulukon arvot ennen poistamista!") // Tulostaa kyseisen tekstin näkyviin terminaaliin.
  console.log(persons) // Tulostaa kyseisen muuttujan "persons" arvon terminaaliin näkyviin.
  persons = persons.filter(filterResult => filterResult.id !== showID) // Filtteröidään "persons" muuttujan sisällä oleva taulukko, niin että jäljelle jää ainoastaan ne arvot (arvon sisällä oleva "id" objekti) jotka ovat epätosi "showID" muuttujan kanssa.
  console.log("Seuraavaksi tulostuu persons muuttujan taulukon arvot poistamisen jälkeen!") // Tulostaa kyseisen tekstin näkyviin terminaaliin.
  console.log(persons) // Tulostaa kyseisen muuttujan "persons" arvon terminaaliin näkyviin.
  response.status(204).end() // Palautetaan statuskoodi "204" takaisin käyttäjälle, jonka jälkeen suljetaan "response" muuttujan prosessi käyttämällä "end()" funktiota.
})

const port = 3001 // Alustetaan muuttuja "port", joka on yhtä kuin portin numero "3001".
// xxx.listen() funktion tarkoituksena on sitoa ja kuunnella yhteyksiä määritellyn isännän sekä portin kanssa.
program.listen(port, () => { // Jos tätä ei olisi, niin osoitteeseen eikä terminaaliin ilmestyisi mitään!
  console.log(`Server is running on following port => ${port}`) // Tulostaa kyseisen tekstin näkyviin terminaaliin, kun ohjelma käynnistyy (tai käynnistyy uudestaan).
})
