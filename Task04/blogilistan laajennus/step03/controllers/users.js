// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

const bcrypt = require('bcrypt') // Alustetaan muuttuja "bcrypt", joka hyödyntää "bcrypt" kirjastoa sovelluksessa.
const userRouter = require('express').Router() // Kyseinen muuttuja hyödyntää myös "Router()" funktiota, jonka tarkoituksena on luoda uusi reititinobjekti sovelluksen käytettäväksi. Lisää tietoa funktion käytöstä löytyy @ https://www.geeksforgeeks.org/express-js-express-router-function/
const User = require('../models/user') // Alustetaan muuttuja "User", joka hyödyntää "user.js" (erillinen moduuli) tiedostoa eli => "../models/user.js".

// Kun suoritetaan pyyntö osoitteeseen "http://localhost:3001/api/users" ja halutaan lisätä uusi käyttäjätunnus tietokantaan, niin sovellus suorittaa alla olevan "post(...)" funktion, joka saa myös paremetreinä "request" ja "response" muuttujat käyttöönsä.
userRouter.post('/', async (request, response) => { // Funktion "post(...)" sisällä hyödynnetään myös "async/await" metodia!
  const getValues = request.body // Alustetaan muuttuja "getValues", joka on yhtä kuin "request.body". Pyynnön kautta tuleva data (request.body) tallennetaan "väliaikaisesti" muuttujan "getValues" alle.

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
})

// Kun suoritetaan pyyntö osoitteeseen "http://localhost:3001/api/users" ja halutaan nähdä nykyiset käyttäjätunnukset tietokannasta, niin sovellus suorittaa alla olevan "get(...)" funktion, joka saa myös paremetreinä "request" ja "response" muuttujat käyttöönsä.
userRouter.get('/', async (request, response) => { // Funktion "get(...)" sisällä hyödynnetään myös "async/await" metodia!
  const getValues = await User.find({}) // Alustetaan muuttuja "getValues", joka hyödyntää "await" funktiota eli muuttuja odottaa kunnes => "User.find({})" on suoritettu ja palauttaa takaisin vastauksen.
  response.json(getValues.map(showResults => showResults.toJSON())) // Palautetaan "getValues" muuttujan data takaisin JSON-objektina.
})

module.exports = userRouter // Viedään kyseinen muuttuja "userRouter" sovelluksen käytettäväksi erillisenä moduulina.
