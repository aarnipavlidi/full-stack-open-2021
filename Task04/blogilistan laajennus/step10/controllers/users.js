// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

const bcrypt = require('bcrypt') // Alustetaan muuttuja "bcrypt", joka hyödyntää "bcrypt" kirjastoa sovelluksessa.
const userRouter = require('express').Router() // Kyseinen muuttuja hyödyntää myös "Router()" funktiota, jonka tarkoituksena on luoda uusi reititinobjekti sovelluksen käytettäväksi. Lisää tietoa funktion käytöstä löytyy @ https://www.geeksforgeeks.org/express-js-express-router-function/
const User = require('../models/user') // Alustetaan muuttuja "User", joka hyödyntää "user.js" (erillinen moduuli) tiedostoa eli => "../models/user.js".

// Kun suoritetaan pyyntö osoitteeseen "http://localhost:3001/api/users" ja halutaan lisätä uusi käyttäjätunnus tietokantaan, niin sovellus suorittaa alla olevan "post(...)" funktion, joka saa myös paremetreinä "request" ja "response" muuttujat käyttöönsä.
userRouter.post('/', async (request, response) => { // Funktion "post(...)" sisällä hyödynnetään myös "async/await" metodia!
  const getValues = request.body // Alustetaan muuttuja "getValues", joka on yhtä kuin "request.body". Pyynnön kautta tuleva data (request.body) tallennetaan "väliaikaisesti" muuttujan "getValues" alle.

  // Jos alla oleva if-ehto toteutuu, niin suoritetaan {...} sisällä olevat funktiot eli, jos muuttujan "getValues.username" puuttuu
  // tai muuttujan pituus (length) on joko yksi (1) tai kaksi (2), niin ehto toteutuu ja sovellus suorittaa alla olevan asian.
  if (!getValues.username || (getValues.username.length > 0 && getValues.username.length < 3)) { // Käyttäjätunnuksen validointi, ennen sen tallentamista tietokantaan.
    return response.status(400).json({ errorMessage: 'Adding new user to the database was unsuccessful. Minimum length for username (3) characters, please try again! :)' })
  }

  // Jos alla oleva if-ehto toteutuu, niin suoritetaan {...} sisällä olevat funktiot eli, jos muuttujan "getValues.password" puuttuu
  // tai muuttujan pituus (length) on joko yksi (1) tai kaksi (2), niin ehto toteutuu ja sovellus suorittaa alla olevan asian.
  if (!getValues.password || (getValues.password.length > 0 && getValues.password.length < 3)) { // Salasanan validointi, ennen sen tallentamista tietokantaan.
    return response.status(400).json({ errorMessage: 'Adding new user to the database was unsuccessful. Minimum length for password is (3) characters, please try again! :)' })
  } else {

    // Jos molemmat if-ehdot eivät toteudu (eli käyttäjätunnuksen ja salasanan validointi menee onnistuneesti läpi), niin sovellus
    // suorittaa alla olevat asiat ja, koska muuttujien validointi tapahtuu alussa, niin tämän avulla sovellus "periaatteessa"
    // suorittaa kyseisen "post(...)" pyynnön nopeammin loppuun, koska ei tarvitse tehdä erikseen alla olevia funktioita! :)

    const saltRounds = 10 // Alustetaan muuttuja "saltRounds", joka on yhtä kuin "10".
    // Alustetaan muuttuja "passwordHash", joka suorittaa alla olevan funktion. Kun haluamme luoda uuden käyttäjän esim. Postmanin kautta,
    // niin me esim. annamme seuraavan arvon Body:n sisään => password: "randompassword" ja funktio vastaanottaa kyseisen arvon pyynnön kautta (request.body.password)
    // ja muuttaa sen "hash" muotoon eli tietokantaan jää "talteen" täysin erilainen arvo mitä me alunperin annettiin. Muuttujan "saltRounds" avulla määritellään, että
    // kuinka paljon aikaa tarvitaan yhden (1) BCrypt-hashin laskemiseen. Mitä korkeampi tuo kyseinen luku on, niin sitä enemmän sekoituskierroksia tehdään yhteensä,
    // joka tarkoittaa sitä että menee myös enemmän aikaa funktion suorittamiseen.
    const passwordHash = await bcrypt.hash(getValues.password, saltRounds) // Kun funktio on suoritettu (await), niin muuttuja saa arvon käytettäväksi ja sovellus siirtyy eteenpäin.

    // Olemme myös alussa alustaneet "User" muuttujan (erillinen moduuli) ja sen avulla määritellään mitä rakennetta data noudattaa,
    // missä muodossa se tallennetaan ja minkä kokoelman alle kyseinen data tallennetaan. Moduulin lopusta löytyy funktio => "mongoose.model('User', userData)".
    const userValue = new User({ // Alustetaan muuttuja "userValue", joka saa alla olevat objektit "username" ja "name" käyttöönsä sekä muuttujan "passwordHash" arvon.
      username: getValues.username, // eli "userValue.username" on yhtä kuin "getValues.username".
      name: getValues.name, // eli "userValue.name" on yhtä kuin "getValues.name".
      passwordHash // eli "userValue.passwordHash".
    })

    const savedUser = await userValue.save() // Alustetaan muuttuja "savedUser", joka suorittaa kyseisen funktion eli tallennetaan muuttujan "userValue" data tietokantaan eli => "blogilista.users".
    response.json(savedUser) // Palautetaan "savedUser" muuttujan data takaisin JSON-objektina.
  }
})

// Kun suoritetaan pyyntö osoitteeseen "http://localhost:3001/api/users" ja halutaan nähdä nykyiset käyttäjätunnukset tietokannasta, niin sovellus suorittaa alla olevan "get(...)" funktion, joka saa myös paremetreinä "request" ja "response" muuttujat käyttöönsä.
userRouter.get('/', async (request, response) => { // Funktion "get(...)" sisällä hyödynnetään myös "async/await" metodia!
  // Alustetaan muuttuja "getValues", joka hyödyntää "await" funktiota eli muuttuja odottaa kunnes => "Blog.find({}).populate(...)" on suoritettu ja palauttaa takaisin vastauksen.
  const getValues = await User.find({}).populate('content', { title: 1, author: 1, url: 1, likes: 1 }) // Siis "content" on objektin arvo, minkä sisälle tulee => "Blog.title", "Blog.author", "Blog.url" sekä "Blog.likes" muuttujien arvot.

  // Yllä oleva funktio tarkoittaa sitä, että kun me haetaan tietokannasta kaikki nykyiset arvot "../api/users" osalta, niin me vielä
  // lisäämme "content" objektin sisään {...} sisällä olevat (Blog moduulin kautta tulevat objektit) arvot, jotka viittaavat tähän kyseisen
  // "getValues" muuttujan arvon kanssa (id:n kautta kohdistuvat oikein siis). Tämän avulla me voidaan päätellä, kun me avataan tietokannan
  // kautta tulevat arvot, niin jokaisen arvon (array) osalta me nähdään "content" objektin sisältä, että mitä blogin arvoja tämä kyseinen
  // käyttäjätunnus on luonut. Tätä oli aika vaikea hahmottaa, niin tähän kannattaa panostaa aika paljon aikaa, että ymmärtää kunnolla! :)

  response.json(getValues.map(showResults => showResults.toJSON())) // Palautetaan "getValues" muuttujan data takaisin JSON-objektina.
})

module.exports = userRouter // Viedään kyseinen muuttuja "userRouter" sovelluksen käytettäväksi erillisenä moduulina.
