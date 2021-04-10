// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

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

const cors = require("cors") // Alustetaan muuttuja "cors", joka vaatii cors (middleware) kirjaston hyödyntämistä.
program.use(cors()) // Tämän avulla voidaan sallia kaikista origineista tulevat pyynnöt kaikkiin tämän sovelluksen (index.js) eli backendin express routeihin.

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

const generateRandomNumber = () => { // Alustetaan muuttuja "generateRandomNumber", joka tekee {...} sisällä olevat, kun käyttäjä yrittää lisätä uuden arvon "persons" taulukkoon (/api/persons).
  const minValue = persons.length + 1 // Alustetaan muuttuja "minValue", joka on yhtä kuin "persons.length + 1" eli ensin lasketaan, että kuinka monta erilaista arvoa (array) löytyy "persons" taulukosta ja sen jälkeen lisätään yksi (1) yhteen.
  console.log(`Minimum value is right now: ${minValue}`) // Tulostaa kyseisen tekstin terminaaliin näkyviin ja näyttää samalla sen hetkisen "minValue" muuttujan arvon.
  const maxValue = minValue + 1 // Alustetaan muuttuja "maxValue", joka on yhtä kuin "minValue + 1" eli ensin otetaan muuttujan "minValue" sen hetkinen arvo ja lisätään yksi (1) yhteen.
  console.log(`Maximum value is right now: ${maxValue}`) // Tulostaa kyseisen tekstin terminaaliin näkyviin ja näyttää samalla sen hetkisen "maxValue" muuttujan arvon.
  // Ensimmäisen kerran, kun yritetään lisätä uutta arvoa taulukkoon (/api/persons), niin alla oleva funktio on muotoa => Math.floor(Math.random() * (6 - 5) + 5)!
  const randomValue = Math.floor(Math.random() * (maxValue - minValue) + minValue) // Alustetaan muuttuja "randomValue", joka laskee kyseisen funktion. Funktio => "Math.random()" antaa X arvon väliltä [0, 1] desimaalimuodossa ja funktio "Math.floor()" palauttaa suurimman kokonaisluvun, joka on pienempi tai yhtä suuri kuin annettu luku.
  console.log(`Random value is ${randomValue}, which will be inserted into "id" object!`) // Tulostaa kyseisen tekstin terminaaliin näkyviin ja näyttää samalla sen hetkisen "randomValue" muuttujan arvon.
  return randomValue // Kun yllä oleva funktio (generateRandomNumber) on suoritettu, niin se palauttaa "randomValue" muuttujan arvon => "newValue.id".
}

program.use(express.json()) // Jos tämä puuttuu, niin tulee erroria (terminaaliin sekä postmaniin), kun käyttäjä yrittää lisätä uutta arvoa "persons" taulukkoon (/api/persons).
program.post("/api/persons", (request, response) => { // Määritellään sovellukselle tapahtumankäsittelijä (event handler), joka hoitaa sovelluksen polkuun eli "/api/persons" tulevia "HTTP GET" pyyntöjä.
  // Kun me laitamme jotain arvoja esim. postmanin kautta niin me valitaan sieltä => Body => valitaan raw muoto ja varmistetaan, että se on JSON muodossa.
  // Tämä tarkoittaa sitä, kun arvot lähetetään => "POST http://localhost:3001/api/persons/" niin sovelluksen "request" muuttuja vastaanottaa ne arvot (request.body) ja sen hetkiset arvot alustetaan "getValue" muuttujan taakse.
  const getValue = request.body // Alustetaan muuttuja "getValue", joka on yhtä kuin "request.body". Lue yllä olevat kommentit, niin ymmärrät paremmin! :)

  if (!getValue.name || !getValue.number) { // Mikäli "getValue.name" TAI "getValue.number" on tyhjä arvo (eli puuttuu, kun yritetään lisätä uutta arvoa taulukkoon), niin palautetaan {...} sisällä olevat asiat.
    console.log("No empty values! Please add either name or number and try again! :)") // Tulostaa kyseisen tekstin terminaaliin näkyviin.
    return response.status(400).json({ // Palauttaa takaisin errorin (400 Bad Request) käyttäjälle, jonka lisäksi tulee alla oleva teksti näkyviin.
      errorMessage: "Some content is missing, please try again! :)" // Objektin nimeksi tulee "errorMessage", johon tulee kyseinen teksti/arvo, joka näkyy postmanin kautta.
    })
  }

  // Alustetaan muuttuja "checkPersons", joka hyödyntää "some()" funktiota. Sen tarkoituksena on siis etsiä "persons" muuttujan taulukosta kaikki "name" nimiset objektit ja vertailla, että toteutuuko ehto eli onko yhtä kuin "getValue.name" muuttujan kanssa!
  const checkPersons = persons.some(findPerson => findPerson.name === getValue.name) // Mikäli ehto toteutuu, niin se palauttaa arvon "true", mikäli ehto ei toteudu, niin se palauttaa arvon "false".
  console.log(`Checking if phonebook has currently existing name, which you are trying to add! Result is => ${checkPersons}`) // Tulostaa kyseisen tekstin terminaaliin näkyviin, joka näyttää myös "checkPersons" arvon (joko true tai false).

  if (checkPersons === true) { // Mikäli kyseinen ehto toteutuu, eli muuttuja "checkPersons" saa arvon "true" (eli on yhtä kuin => "=== true" kanssa), niin palautetaan {...} sisällä olevat asiat.
  console.log("You tried to add a person, which already exists on the phonebook! Please try again! :)") // Tulostaa kyseisen tekstin terminaaliin näkyviin.
  return response.status(400).json({ // Palauttaa takaisin errorin (400 Bad Request) käyttäjälle, jonka lisäksi tulee alla oleva teksti näkyviin.
    errorMessage: "Name has to be unique, please try again! :)" // Objektin nimeksi tulee "errorMessage", johon tulee kyseinen teksti/arvo, joka näkyy postmanin kautta.
  })
}

  const newValue = { // Alustetaan "newValue" muuttuja, jonka sisään tulee kolme (3) erilaista objektia.
    id: generateRandomNumber(), // Luodaan "id" objekti, joka saa "generateRandomNumber()" funktion sen hetkisen arvon. Tätä ei siis tarvitse erikseen laittaa esim. postmaniin vaan serveri hoitaa tämän osuuden.
    name: getValue.name, // Luodaan "name" objekti, joka saa Body => "name" arvon eli "getValue.name" on sama asia kuin => "request.body.name".
    number: getValue.number, // Luodaan "number" objekti, joka saa Body => "number" arvon eli "getValue.number" on sama asia kuin => "request.body.number".
  }

  persons = persons.concat(newValue) // Luodaan uusi taulukko "persons" muuttujan alle, kopioimalla "persons" taulukon sen hetkiset arvot, johon lisätään myös sen lisäksi "newValue" muuttujan arvot.
  response.json(newValue) // Palautetaan takaisin käyttäjälle muuttujan "newValue" arvot .json muodossa.
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

const port = process.env.PORT || 3001 // Alustetaan muuttuja "port", jossa saa arvon "process.env.PORT" (ympäristönmuuttuja // Environment variable) TAI "3001". Me käytämme kyseistä muuttujaa, koska haluamme, että Herokun tarjoama palvelu konfiguroi sovelluksen itse ympäristönmuuttujan avulla.
// xxx.listen() funktion tarkoituksena on sitoa ja kuunnella yhteyksiä määritellyn isännän sekä portin kanssa.
program.listen(port, () => { // Jos tätä ei olisi, niin osoitteeseen eikä terminaaliin ilmestyisi mitään!
  console.log(`Server is running on following port => ${port}`) // Tulostaa kyseisen tekstin näkyviin terminaaliin, kun ohjelma käynnistyy (tai käynnistyy uudestaan).
})
