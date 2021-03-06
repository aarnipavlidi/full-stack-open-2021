// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

// As early as posssible in your application, require and configure dotenv. More information about it @ https://www.npmjs.com/package/dotenv
require("dotenv").config() // Alustetaan "dotenv" kirjaston hyödyntämistä tässä sovelluksessa. Tämän avulla haetaan kaikki muuttujien arvot ".env" tiedostosta ja palautetaan takaisin sovelluksen käytettäväksi.
const ShowData = require("./models/persons") // Alustetaan muuttuja "ShowData" (erillinen moduuli sovelluksessa) eli "index.js" hyödyntää => "persons.js" tiedostoa, joka sijaitsee => "../models/persons.js".

// Creates an Express application. The express() function is a top-level function exported by the express module. More information @ http://expressjs.com/en/api.html
const express = require("express") // Alustetaan muuttuja "express", joka vaatii Expressin kirjaston hyödyntämistä.
const morgan = require("morgan") // Alustetaan muuttuja "morgan", joka vaatii Morgan (middleware) kirjaston hyödyntämistä.
const program = express() // Alustetaan muuttuja "program", jonka tarkoituksena on luoda Express applikaatio.

// More information about "static" middleware @ https://expressjs.com/en/starter/static-files.html
program.use(express.static("build")) // Kyseisen "middleware":n tarkoituksena on näyttää staattista sisältöä (esim. index.html). Funktio hakee tiedostot yms. "build" nimisestä hakemistosta.
// Aina kun suoritetaan GET-tyyppisiä HTTP-pyyntöjä, niin tarkistetaan löytyykö hakemistosta vastaavan nimistä tiedostoa, jos löytyy niin funktio palauttaa sen takaisin näkyviin käyttäjälle.

// Alla oleva Morgan "middleware" (https://github.com/expressjs/morgan) logaa konsoliin tiny-konfiguraation mukaisesti.
// Käytännössä se tarkoittaa sitä, että aina kun sovellus suorittaa jonkin x HTTP "request":in (esim. luodaan uusi arvo "persons" muuttujan taulukkoon),
// niin se tulostaa seuraavat asiat terminaaliin => "POST /api/persons/ 200 54 - 15.831 ms" eli => ":method :url :status :res[content-length] - :response-time ms".
// Aikaisemmassa tehtävässä (step07) meillä oli pelkästään => "program.use(morgan("tiny"))" funktio ja kuten huomataan niin sitä ei ole nyt eli
// morgan("tiny") ON YHTÄ KUIN => morgan(":method :url :status :res[content-length] - :response-time ms") ja lopuksi olemme vielä lisänneet oman "token":in, joka saa muuttujan arvon "showPostData".
program.use(morgan(":method :url :status :res[content-length] - :response-time ms :showPostData")) // Lisää infoa tästä löytyy osoitteesta => https://www.digitalocean.com/community/tutorials/nodejs-getting-started-morgan

// Alustetaan Morgania varten oma "token", joka saa muuttujan arvon "showPostData" (eli tämän voi nimetä mihin tahansa haluaa).
// Kyseinen muuttuja on sijoitettu yllä olevan funktion eli => "program.use(morgan(...))" sisälle loppuun.
// Aina kun sovellus suorittaa jonkin x HTTP "request":in, niin terminaaliin tulostuu myös tämän muuttujan data eli se palauttaa takaisin .json muodossa "request.body":n sisällä olevan datan.
// Mikäli "request.body" on tyhjä, niin se tulostaa pelkästään "-" merkin terminaaliin.
morgan.token("showPostData", function(request, response) {
  return JSON.stringify(request.body)
})

// HUOM! Tässä tehtävässä tätä riviä ei tarvita!!! const cors = require("cors") // Alustetaan muuttuja "cors", joka vaatii cors (middleware) kirjaston hyödyntämistä.
// HUOM! Tässä tehtävässä tätä riviä ei tarvita!!! program.use(cors()) // Tämän avulla voidaan sallia kaikista origineista tulevat pyynnöt kaikkiin tämän sovelluksen (index.js) eli backendin express routeihin.

// Kun sovellus suorittaa (hakee dataa) osoitteesta "http://localhost:3001/api/persons", niin suoritetaan alla oleva funktio.
program.get("/api/persons", (request, response) => { // Määritellään sovellukselle tapahtumankäsittelijä (event handler), joka hoitaa sovelluksen polkuun eli "/api/persons" tulevia "HTTP GET" pyyntöjä.
  ShowData.find({}).then(showResult => { // Hakee kaikki arvot tietokannasta ja palauttaa ne näkyviin takaisin käyttäjälle.
    response.json(showResult) // Palauttaa "showResult" muuttujan sisällä olevan datan takaisin JSON muodossa.
    console.log(showResult) // Tulostetaan "showResult" muuttujan arvo takaisin terminaaliin näkyviin.
  })
})

// Kun sovellus suorittaa (hakee dataa) osoitteesta esim. "http://localhost:3001/api/persons/2", niin suoritetaan alla oleva funktio.
program.get("/api/persons/:id", (request, response) => { // Määritellään sovellukselle tapahtumankäsittelijä (event handler), joka hoitaa sovelluksen polkuun eli "/api/persons" tulevia "HTTP GET" pyyntöjä.
  ShowData.findById(request.params.id).then(showResult => { // Jos käyttäjä esim. kirjoittaa osoitteeseen ==> "http://localhost:3001/api/persons/2", niin "params.id" muuttuja on yhtä kuin kaksi (2).
    response.json(showResult) // Palauttaa "showResult" muuttujan sisällä olevan datan takaisin JSON muodossa.
    console.log(showResult) // Tulostetaan "showResult" muuttujan arvo takaisin terminaaliin näkyviin.
  })
})

const port = process.env.PORT // Alustetaan muuttuja "port", joka saa arvon "process.env.PORT" (ympäristönmuuttuja // Environment variable). Muuttuja hakee arvon ".env" tiedostosta (localhost varten) ja ota huomioon, jos esim. käytät Heroku:n palvelua niin siellä pitää erikseen lisätä kyseiselle muuttujalle oma arvo (Settings => Config Vars).
// xxx.listen() funktion tarkoituksena on sitoa ja kuunnella yhteyksiä määritellyn isännän sekä portin kanssa.
program.listen(port, () => { // Jos tätä ei olisi, niin osoitteeseen eikä terminaaliin ilmestyisi mitään!
  console.log(`Server is running on following port => ${port}`) // Tulostaa kyseisen tekstin näkyviin terminaaliin, kun ohjelma käynnistyy (tai käynnistyy uudestaan).
})
