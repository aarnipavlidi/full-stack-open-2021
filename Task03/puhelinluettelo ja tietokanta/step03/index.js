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
    if (showResult) { // Jos if-ehto totetuu eli löytyy käyttäjän hakema "id":n arvo tietokannasta, niin suoritetaan {...} sisällä olevat asiat.
      response.json(showResult) // Palauttaa "showResult" muuttujan sisällä olevan datan takaisin JSON muodossa.
      console.log(showResult) // Tulostetaan "showResult" muuttujan arvo takaisin terminaaliin näkyviin.
    } else { // Jos if-ehto ei toteudu eli ei löydy käyttäjän hakemaa "id":n arvoa tietokannasta, niin suoritetaan {...} sisällä oleva asia.
      response.status(404).end() // Palauttaa "404 Not Found":in käyttäjälle ja sulkee "response" muuttujan prosessin "end()" funktion avulla.
    }
  })
  .catch(error => { // Mikäli tietyn henkilön etsimisessä (id:n perusteella) tulee ongelmia (Promise is rejected), niin suoritetaan {...} sisällä olevat asiat.
    console.log(error) // Tulostetaan terminaaliin näkyviin muuttujan "error" arvo takaisin käyttäjälle.
    response.status(400).send({ errorMessage: "Database doesn't have following id listed as of right now. Please try again! :)"}) // Palauttaa "response" muuttujan avulla "400 Bad Request":in ja kyseisen tekstin näkyviin selaimen tai Postmanin kautta.
  })
})

program.use(express.json()) // Jos tämä puuttuu, niin tulee erroria (terminaaliin sekä postmaniin), kun käyttäjä yrittää lisätä uutta arvoa "persons" taulukkoon (/api/persons).
// Kun sovellus lisää uuden henkilön puhelinluetteloon, niin sovellus suorittaa sen osoitteeseen "http://localhost:3001/api/persons" ja suorittaa alla olevat funktiot.
program.post("/api/persons", (request, response) => { // Määritellään sovellukselle tapahtumankäsittelijä (event handler), joka hoitaa sovelluksen polkuun eli "/api/persons" tulevia "HTTP POST" pyyntöjä.
  const getValue = request.body // Alustetaan "getValue" muuttuja, joka on yhtä kuin "rquest.body":n arvo.

  if (!getValue.name || !getValue.number) { // Jos "getValue.name" tai "getValue.number" muuttujat ovat tyhjiä, niin if-ehto toteutuu ja suoritetaan {...} sisällä olevat asiat.
    console.log("No empty values! Please add either name or number and try again! :)") // Tulostaa kyseisen tekstin terminaaliin näkyviin ja palauttaa "404 Not Found":in käyttäjälle sekä alla olevan tekstin näkyviin selaimen tai Postmanin kautta.
    return response.status(400).json({
      errorMessage: "Some content is missing, please try again! :)"
    })
  }

  // Alustetaan "buildData" muuttuja, joka hyödyntää "new ShowData({...})" funktiota eli tämä käytännössä tarkoittaa sitä, että kun olemme tuoneet erillisen moduulin "ShowData":n käytettäväksi
  // tämän sovelluksen (index.js) tiedostoa varten, niin aina kun halutaan lisätä uusi henkilö puhelinluetteloon, niin tämä muuttuja hakee tarvittavat funktiot moduulista, jotta voidaan tallentaa tietokantaan "oikeassa muodossa".
  const buildData = new ShowData({ // Moduulista "ShowData" löytyy => "new mongoose.Schema({...})" funktio, jonka avulla määritellään miten me tallennetaan data tietokantaan.
    name: getValue.name, // eli "name: String" (Huom! Tämä on alustettu "persons.js" tiedostossa.) => "name: getValue.name" ja arvot siirtyvät "persons" kokoelman alle => puhelinluettelo.persons
    number: getValue.number // eli "name: String" (Huom! Tämä on alustettu "persons.js" tiedostossa.) => "name: getValue.number" ja arvot siirtyvät "persons" kokoelman alle => puhelinluettelo.persons
  })

  buildData.save().then(showResult => { // "muuttuja.save()" eli "buildData.save()" funktio tallentaa muuttujan datan tietokantaan, jonka jälkeen suoritetaan .then({...}) funktio.
    response.json(showResult) // Palauttaa "showResult" muuttujan sisällä olevan datan takaisin JSON muodossa.
    console.log(showResult) // Tulostetaan "showResult" muuttujan arvo takaisin terminaaliin näkyviin.
  })
})

// Kun käyttäjä haluaa poistaa tietyn henkilön puhelinluettelosta, niin suoritetaan alla oleva "delete(...)" funktio. Jos käyttäjä esim. haluaa poistaa henkilön, jonka "id" on kaksi (2), niin funktio poistaa osoitteesta => "http://localhost:3001/api/persons/2".
// Funktion sisällä käytetään parametreinä "request" ja "response" muuttujia, joita vaaditaan funktion suorittamiseen.
program.delete("/api/persons/:id", (request, response) => {
  ShowData.findByIdAndRemove(request.params.id).then(showResult => { // Jos käyttäjä haluaa poistaa henkilön, jonka "id" on kaksi (2), niin muuttuja "request.params.id" saa kyseisen arvon.
    response.status(204).end() // Palauttaa "204 (No Content)":in käyttäjälle ja sulkee "response" muuttujan prosessin "end()" funktion avulla.
  })
  .catch(error => { // Mikäli poistamisen yhteydessä tulee ongelmia (Promise is rejected), niin suoritetaan {...} sisällä olevat asiat.
    console.log(error) // Tulostetaan terminaaliin näkyviin muuttujan "error" arvo takaisin käyttäjälle.
    response.status(400).send({ errorMessage: "There was a problem deleting person from the database. Please try again! :)" }) // Palauttaa "response" muuttujan avulla "400 Bad Request":in ja kyseisen tekstin näkyviin selaimen tai Postmanin kautta.
  })
})

const port = process.env.PORT // Alustetaan muuttuja "port", joka saa arvon "process.env.PORT" (ympäristönmuuttuja // Environment variable). Muuttuja hakee arvon ".env" tiedostosta (localhost varten) ja ota huomioon, jos esim. käytät Heroku:n palvelua niin siellä pitää erikseen lisätä kyseiselle muuttujalle oma arvo (Settings => Config Vars).
// xxx.listen() funktion tarkoituksena on sitoa ja kuunnella yhteyksiä määritellyn isännän sekä portin kanssa.
program.listen(port, () => { // Jos tätä ei olisi, niin osoitteeseen eikä terminaaliin ilmestyisi mitään!
  console.log(`Server is running on following port => ${port}`) // Tulostaa kyseisen tekstin näkyviin terminaaliin, kun ohjelma käynnistyy (tai käynnistyy uudestaan).
})
