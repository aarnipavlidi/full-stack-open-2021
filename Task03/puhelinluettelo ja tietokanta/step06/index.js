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

// Kun käyttäjä siirtyy osoitteeseen "http://localhost:3001/info", niin suoritetaan alla oleva "get(...)" funktio, joka palauttaa "response" muuttujan avulla takaisin alla olevan tekstin sekä tulostaa terminaaliin muuttujan arvon.
// Funktion sisällä käytetään parametreinä "request", "response" ja "next" muuttujia, joita vaaditaan funktion suorittamiseen. Sen lisäksi olemme alustaneet erikseen "serverTimeDate" ja "countPersons" muuttujat funktion sisälle.
program.get("/info", (request, response, next) => {
  ShowData.find({}).then(showResult => {
    const serverTimeDate = new Date().toGMTString() // Alustetaan muuttuja "serverTimeDate", joka näyttää sen hetkisen päivämäärän sekä kellonajan GMT:n muodossa.
    const countPersons = showResult.length // Alustetaan muuttuja "countPersons", joka on yhtä kuin "showResult.length" muuttujan kanssa eli lasketaan kuinka monta erilaista arvoa (array) on yhteensä tietokannassa ja palautetaan arvo takaisin muuttujan alle.

    response.send(`<h4>There is total of ${countPersons} different persons inside phonebook! <br><br> ${serverTimeDate} (Greenwich Mean Time)</h4>`) // Sovellus palauttaa kyseisen tekstin sekä muuttujien arvot takaisin selaimeen tai postmaniin näkyviin!
    console.log("Database has currently:") // Tulostetaan kyseinen teksti takaisin terminaaliin näkyviin.
    console.log(countPersons) // Tulostetaan muuttujan "countPersons" arvo takaisin terminaaliin näkyviin.
    console.log("different persons listed on the phonebook!") // Tulostetaan kyseinen teksti takaisin terminaaliin näkyviin.
  }) // Jos tulee virheitä, kun yritetään siirtyä osoitteeseen "http://localhost:3001/info", niin sovellus suorittaa alla olevan ".catch(...)" funktion.
  .catch(error => next(error)) // Parametrin "next" avulla funktio siirtää virheen käsittelyn "virheidenkäsittelymiddlewarelle" eli => "const errorHandler" muuttujan alle.
})

// Kun sovellus suorittaa (hakee dataa) osoitteesta "http://localhost:3001/api/persons", niin suoritetaan alla oleva funktio.
program.get("/api/persons", (request, response, next) => { // Määritellään sovellukselle tapahtumankäsittelijä (event handler), joka hoitaa sovelluksen polkuun eli "/api/persons" tulevia "HTTP GET" pyyntöjä.
  ShowData.find({}).then(showResult => { // Hakee kaikki arvot tietokannasta ja palauttaa ne näkyviin takaisin käyttäjälle.
    response.json(showResult) // Palauttaa "showResult" muuttujan sisällä olevan datan takaisin JSON muodossa.
    console.log(showResult) // Tulostetaan "showResult" muuttujan arvo takaisin terminaaliin näkyviin.
  }) // Jos tulee virheitä, kun yritetään hakea kaikkia henkilöitä tietokannasta, niin sovellus suorittaa alla olevan ".catch(...)" funktion.
  .catch(error => next(error)) // Parametrin "next" avulla funktio siirtää virheen käsittelyn "virheidenkäsittelymiddlewarelle" eli => "const errorHandler" muuttujan alle.
})

// Kun sovellus suorittaa (hakee dataa) osoitteesta esim. "http://localhost:3001/api/persons/2", niin suoritetaan alla oleva funktio.
program.get("/api/persons/:id", (request, response, next) => { // Määritellään sovellukselle tapahtumankäsittelijä (event handler), joka hoitaa sovelluksen polkuun eli "/api/persons" tulevia "HTTP GET" pyyntöjä.
  ShowData.findById(request.params.id).then(showResult => { // Jos käyttäjä esim. kirjoittaa osoitteeseen ==> "http://localhost:3001/api/persons/2", niin "request.params.id" muuttuja on yhtä kuin kaksi (2).
    if (showResult) { // Jos if-ehto totetuu eli löytyy käyttäjän hakema "id":n arvo tietokannasta, niin suoritetaan {...} sisällä olevat asiat.
      response.json(showResult) // Palauttaa "showResult" muuttujan sisällä olevan datan takaisin JSON muodossa.
      console.log(showResult) // Tulostetaan "showResult" muuttujan arvo takaisin terminaaliin näkyviin.
    } else { // Jos if-ehto ei toteudu eli ei löydy käyttäjän hakemaa "id":n arvoa tietokannasta, niin suoritetaan {...} sisällä oleva asia.
      response.status(404).end() // Palauttaa "404 Not Found":in käyttäjälle ja sulkee "response" muuttujan prosessin "end()" funktion avulla.
    }
  }) // Jos yritetään hakea henkilöä tietokannasta mitä ei ole enään, niin sovellus suorittaa alla olevan ".catch(...)" funktion.
  .catch(error => next(error)) // Parametrin "next" avulla funktio siirtää virheen käsittelyn "virheidenkäsittelymiddlewarelle" eli => "const errorHandler" muuttujan alle.
})

program.use(express.json()) // Jos tämä puuttuu, niin tulee erroria (terminaaliin sekä postmaniin), kun käyttäjä yrittää lisätä uutta arvoa "persons" taulukkoon (/api/persons).
// Kun sovellus lisää uuden henkilön puhelinluetteloon, niin sovellus suorittaa sen osoitteeseen "http://localhost:3001/api/persons" ja suorittaa alla olevat funktiot.
// Funktion sisällä käytetään parametreinä "request" ja "response" muuttujia, joita vaaditaan funktion suorittamiseen.
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

// Kun käyttäjä haluaa päivittää tietyn henkilön puhelinluettelosta, niin suoritetaan alla oleva "put(...)" funktio. Jos käyttäjä esim. haluaa päivittää henkilön, jonka "id" on kaksi (2), niin funktio päivittää osoitteesta => "http://localhost:3001/api/persons/2".
// Funktion sisällä käytetään parametreinä "request", "response" ja "next" muuttujia, joita vaaditaan funktion suorittamiseen.
program.put("/api/persons/:id", (request, response, next) => {
  const getValue = request.body // Alustetaan muuttuja "getValue", joka on yhtä kuin "request.body":n arvo.

  const updateData = { // Alustetaan muuttuja "updateDate", joka saa "name" ja "number" objektit käyttöönsä.
    name: getValue.name, // eli "updateData.name" on yhtä kuin "getValue.name".
    number: getValue.number // eli "updateData.number" on yhtä kuin "getValue.number"
  }

  // Jos käyttäjä haluaa päivittää esim. tietokannan "id":n arvoa kaksi (2), niin "request.params.id" muuttuja on yhtä kuin kaksi (2).
  ShowData.findByIdAndUpdate(request.params.id, updateData, { new: true }) // Suoritetaan "findByIdAndUpdate(...)" funktio, joka päivittää tietokannan "updateData" muuttujan mukaisesti eli ainostaan "name" sekä "number" objektit. Parametrin "{ new: true }" avulla saamme muuttuneen olion palautetuksi kutsujalle.
    .then(updatedPerson => {
      response.json(updatedPerson) // Palauttaa "updatedPerson" muuttujan sisällä olevan datan takaisin JSON muodossa.
      console.log(updatedPerson) // Tulostetaan "updatedPerson" muuttujan arvo takaisin terminaaliin näkyviin.
    }) // Jos yritetään päivittää henkilöä mitä ei ole enään tietokannassa, niin sovellus suorittaa alla olevan ".catch(...)" funktion.
    .catch(error => next(error)) // // Parametrin "next" avulla funktio siirtää virheen käsittelyn "virheidenkäsittelymiddlewarelle" eli => "const errorHandler" muuttujan alle.
})

// Kun käyttäjä haluaa poistaa tietyn henkilön puhelinluettelosta, niin suoritetaan alla oleva "delete(...)" funktio. Jos käyttäjä esim. haluaa poistaa henkilön, jonka "id" on kaksi (2), niin funktio poistaa osoitteesta => "http://localhost:3001/api/persons/2".
// Funktion sisällä käytetään parametreinä "request", "response" ja "next" muuttujia, joita vaaditaan funktion suorittamiseen.
program.delete("/api/persons/:id", (request, response, next) => {
  ShowData.findByIdAndRemove(request.params.id).then(showResult => { // Jos käyttäjä haluaa poistaa henkilön, jonka "id" on kaksi (2), niin muuttuja "request.params.id" saa kyseisen arvon.
    response.status(204).end() // Palauttaa "204 (No Content)":in käyttäjälle ja sulkee "response" muuttujan prosessin "end()" funktion avulla.
  }) // Jos yritetään poistaa tietokannasta henkilöä mitä ei ole enään, niin sovellus suorittaa alla olevan ".catch(...)" funktion.
  .catch(error => next(error)) // Parametrin "next" avulla funktio siirtää virheen käsittelyn "virheidenkäsittelymiddlewarelle" eli => "const errorHandler" muuttujan alle.
})

const errorHandler = (error, request , response, next) => { // Alustetaan muuttuja "errorHandler" (virheidenkäsittelymiddleware), joka saa neljä (4) erilaista parametriä käytettäväksi.
  console.log(error.message) // Tulostaa terminaaliin muuttujan "error.message" arvon eli, jos yritetään esim. poistaa henkilöä tietokannasta mitä ei ole, niin tulee kyseinen teksti => "Cast to ObjectId failed for value "1" at path "_id" for model "persons"" terminaaliin näkyviin.
  console.log(error.name) // Tulostaa terminaaliin muuttujan "error.name" arvon näkyviin käyttäjälle. Tämän avulla voidaan päätellä, mihin if-ehtoon voidaan kyseistä arvoa käyttää ja sitä kautta tulostaa terminaaliin sitä vastaava teksti!

  if (error.name === "CastError") { // Jos if-ehto toteutuu eli "error.name" muuttujan arvo on yhtä kuin "CastError", niin suoritetaan {...} sisällä olevat asiat.
    console.log("Error happened while doing something, check Chrome or Postman for more info! :)") // Tulostaa kyseisen tekstin terminaaliin näkyviin ja palauttaa "404 Not Found":in käyttäjälle sekä alla olevan tekstin näkyviin selaimen tai Postmanin kautta.
    return response.status(400).send({ errorMessage: "You tried to search, update, or delete person, whose id doesn't exist on the database as of right now. Please try again! :)" })
  }

  next(error) // Jos mikään if-ehto ei toteudu, niin "errorHandler" muuttuja suorittaa tämän kyseisen funktion eli "next(error)" ja tulostaa terminaaliin errorin näkyviin käyttäjälle.
}

// Ota huomioon, että alla olevan funktion täytyy olla kaikkien muiden middlewarejen rekisteröinnin jälkeen!
program.use(errorHandler) // Otetaan käyttöön "errorhandler" (middleware), josta saa lisää tietoa @ http://expressjs.com/en/resources/middleware/errorhandler.html

const port = process.env.PORT // Alustetaan muuttuja "port", joka saa arvon "process.env.PORT" (ympäristönmuuttuja // Environment variable). Muuttuja hakee arvon ".env" tiedostosta (localhost varten) ja ota huomioon, jos esim. käytät Heroku:n palvelua niin siellä pitää erikseen lisätä kyseiselle muuttujalle oma arvo (Settings => Config Vars).
// xxx.listen() funktion tarkoituksena on sitoa ja kuunnella yhteyksiä määritellyn isännän sekä portin kanssa.
program.listen(port, () => { // Jos tätä ei olisi, niin osoitteeseen eikä terminaaliin ilmestyisi mitään!
  console.log(`Server is running on following port => ${port}`) // Tulostaa kyseisen tekstin näkyviin terminaaliin, kun ohjelma käynnistyy (tai käynnistyy uudestaan).
})
