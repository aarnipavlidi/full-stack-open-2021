// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

const jwt = require('jsonwebtoken') // Alustetaan muuttuja "jwt", joka hyödyntää "jsonwebtoken" nimistä kirjastoa sovelluksen aikana.
const bcrypt = require('bcrypt') // Alustetaan muuttuja "bcrypt", joka hyödyntää "bcrypt" nimistä kirjastoa sovelluksen aikana.

const loginRouter = require('express').Router() // Kyseinen muuttuja hyödyntää myös "Router()" funktiota, jonka tarkoituksena on luoda uusi reititinobjekti sovelluksen käytettäväksi. Lisää tietoa funktion käytöstä löytyy @ https://www.geeksforgeeks.org/express-js-express-router-function/
const User = require('../models/user') // Alustetaan muuttuja "User", joka hyödyntää "user.js" (erillinen moduuli) tiedostoa eli => "../models/user.js".

// Kun suoritetaan pyyntö osoitteeseen "http://localhost:3000/api/login", niin sovellus suorittaa alla olevan "post(...)" funktion, joka saa myös parametreinä "request" ja "response" muuttujat käyttöönsä.
// Alla olevan funktion ideana on tarkistaa, että onko kyseistä x käyttäjätunnusta olemmassa tietokannassa ja, jos on niin tarkistetaan, että onko kyseisen käyttäjätunnuksen salasana oikein kirjoitettu.
loginRouter.post('/', async (request, response) => {
  const getValues = request.body // Alustetaan muuttuja "getValues", joka on yhtä kuin "request.body" muuttujan arvo. Aina kun funktiota suoritetaan, niin pyynnön mukana tulee data => "request.body".

  // Alustetaan muuttuja "user", joka suorittaa alla olevan funktion, odottaa vastausta (await) ja siirtyy sovelluksessa eteenpäin.
  const user = await User.findOne({ username: getValues.username })
  // Alustetaan muuttuja "passwordCorrect", joka suorittaa alla olevan "Conditional (ternary) operator" funktion eli,
  // jos "user" on yhtä kuin "null" (eli ei löydy käyttäjätunnusta tietokannasta), niin palautetaan ehto => "? false"
  // ja mikäli ehto ei toteudu eli löytyy vastaava käyttäjätunnus, niin palautetaan ehto => ": await....", jonka
  // jälkeen suoritetaan kyseinen funktio.
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(getValues.password, user.passwordHash)

  if (!(user && passwordCorrect)) { // Jos kyseinen if-ehto totetuu, eli joko käyttäjätunnus tai salasana on väärä/puuttuu, niin suoritetaan {...} sisällä olevat asiat.
    return response.status(401).json({ // Palautetaan pyyntöön takaisin "401 Unauthorized":in statuskoodi sekä alla olevan objektin arvo käyttäjälle.
      errorMessage: 'You typed either wrong username or password, please try again! :)' // Objekti "errorMessage" saa arvoksi kyseisen tekstin, joka näkyy selaimen tai Postmanin kautta.
    })
  }

  const userForToken = { // Alustetaan muuttuja "userForToken", joka saa käyttöönsä alla olevat objektit eli => "username" sekä "id".
    username: user.username, // eli "userForToken.username" on yhtä kuin "user.username".
    id: user._id, // eli "userForToken.id" on yhtä kuin "user._id".
  }

  // Alustetaan muuttuja "token", joka suorittaa alla olevan funktion => "jwt.sign(...)". Funktion avulla me suoritetaan muuttujan
  // "userForToken" data digitaalisesti allekirjoitetussa muodossa ja tämän mahdollistaa ympäristönmuuttuja => "process.env.SECRET".
  // Muista lisätä kyseinen muuttuja erikseen => ".env" tiedostoon eli => "SECRET=your_secret_password_here"! :)
  const token = jwt.sign(userForToken, process.env.SECRET)

  response // Jos käyttäjätunnus ja salasana on molemmat oikein (eli löytyy vastaavat tiedot tietokannasta), niin palautetaan pyyntöön takaisin "200 OK":n statuskoodi.
    .status(200) // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/200
    .send({ token, username: user.username, name: user.name }) // Palautetaan pyyntöön kyseisten muuttujien arvot takaisin käyttäjälle.
})

module.exports = loginRouter // Viedään kyseinen muuttuja "loginRouter" sovelluksen käytettäväksi erillisenä moduulina.
