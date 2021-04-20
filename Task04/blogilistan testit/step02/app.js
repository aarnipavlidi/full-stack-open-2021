// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

const express = require('express') // Alustetaan muuttuja "express", joka hyödyntää "express" kirjastoa sovelluksessa.
const app = express() // Alustetaan muuttuja "app", jonka tarkoituksena on luoda kyseisen funktion avulla uusi applikaatio sovelluksen käytettäväksi.

const cors = require('cors') // Alustetaan muuttuja "cors", joka hyödyntää "cors" kirjastoa sovelluksessa.
const blogRouter = require('./controllers/blogNotes') // Alustetaan muuttuja "blogRouter", joka hyödyntää "blogNotes.js" (erillinen moduuli) tiedostoa eli => "./controllers/blogNotes.js".

const config = require('./utils/config') // Alustetaan muuttuja "config", joka hyödyntää "config.js" (erillinen moduuli) tiedostoa eli => "./utils/config.js".
const logger = require('./utils/logger') // Alustetaan muuttuja "logger", joka hyödyntää "logger.js" (erillinen moduuli) tiedostoa eli => "./utils/logger.js".
const middleware = require('./utils/middleware') // Alustetaan muuttuja "middleware", joka hyödyntää "middleware.js" (erillinen moduuli) tiedostoa eli => "./utils/middleware.js".

const mongoose = require('mongoose') // Alustetaan muuttuja "mongoose", joka hyödyntää "mongoose" kirjastoa sovelluksessa.

logger.showInfo('connecting to', config.MONGODB_URI) // Tulostaa kyseisen tekstin terminaaliin näkyviin, joka saa lopuksi vielä muuttujan "config.MONGODB_URI" arvon.

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }) // Funktion "mongoose.connect(...)" avulla yhdistetään tietokantaan (MongoDB). Lisää tietoa funktion käytöstä löytyy @ https://mongoosejs.com/docs/connections.html
  .then(() => { // Kun tietokantaan on yhdistetty, niin suoritetaan {...} sisällä oleva asia.
    logger.showInfo('Connected to the MongoDB successfully! :)') // Tulostaa kyseisen tekstin terminaaliin näkyviin.
  }) // Mikäli tulee ongelmia tietokannan yhdistämisen aikana, niin sovellus suorittaa "catch()" funktion.
  .catch((error) => { // Funktio suorittaa {...} sisällä olevat asiat, jos tulee virheitä tietokannan yhdistämisen aikana.
    logger.showError('There was a following problem while trying connect to the MongoDB:', error.message) // Tulostaa kyseisen tekstin terminaaliin näkyviin, joka saa lopuksi vielä muuttujan "error.message" arvon.
    logger.showInfo('Please try connnect to the MongoDB again! :)') // Tulostaa kyseisen tekstin terminaaliin näkyviin.
  })

app.use(cors()) // Sovellus käyttää kyseistä "middlewarea" (cors) ja tämän avulla sallitaan muista origineista tulevat pyynnöt (request) tähän sovellukseen.

app.use(express.static('build')) // Sovellus käyttää kyseistä "middlewarea" (express.static()) ja tämän avulla sovellus palvelee staattisia tiedostoja "build" kansion sisältä. Lisää tietoa funktion käytöstä löytyy @ https://www.geeksforgeeks.org/express-js-express-static-function/
app.use(express.json()) // Sovellus käyttää kyseistä "middlewarea" (express.json()) ja tämän avulla sovellus jäsentää saapuvat pyynnöt (request) JSON:in avulla. Lisää tietoa funktion käytöstä löytyy @ http://expressjs.com/en/api.html#express.json

app.use(middleware.requestLogger) // Aina kun sovellus suorittaa pyynnön palvelimelle, niin tämä funktio eli "middleware.requestLogger" suoritetaan.
app.use('/api/blogs', blogRouter) // Jos sovelluksen pyyntö tapahtuu osoitteeseen "http://localhost:3001/api/blogs", niin otetaan käyttöön "blogRouter" muuttujana toimiva routeri. Mikäli pyyntö tapahtuu "väärään" osoitteeseen, niin sovellus suorittaa alla olevan funktion eli "middleware.unknownEndpoint".
app.use(middleware.unknownEndpoint) // Aina kun sovellus suorittaa pyynnön palvelimelle ja sen hetkistä osoitetta (esim. "http://localhost:3001/api/Aarni") ei ole olemassa palvelimella, niin tämä funktio eli "middleware.unknownEndpoint" suoritetaan.
app.use(middleware.errorHandler) // Aina kun sovellus suorittaa pyynnön palvelimelle ja sen yhteydessä tulee "virheitä", niin tämä funktio eli "middleware.errorHandler" suoritetaan.

module.exports = app // Viedään kyseinen muuttuja "app" sovelluksen käytettäväksi erillisenä moduulina.
