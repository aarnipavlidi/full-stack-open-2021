// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

const logger = require('./logger') // Alustetaan muuttuja "logger", joka hyödyntää "logger.js" (erillinen moduuli) tiedostoa eli => "./logger.js".
const jwt = require('jsonwebtoken') // Alustetaan muuttuja "jwt", joka hyödyntää "jsonwebtoken" nimistä kirjastoa sovelluksen aikana.
const User = require('../models/user') // Alustetaan muuttuja "User", joka hyödyntää "user.js" (erillinen moduuli) tiedostoa eli => "../models/user.js".

// Alustetaan muuttuja "requestLogger", joka saa käyttöönsä parametrien "request", "response" ja "next" arvot.
const requestLogger = (request, response, next) => { // Aina kun sovellus suorittaa pyynnön palvelimelle, niin terminaaliin tulostuu {...} sisällä olevat asiat.
  logger.showInfo('Method:', request.method) // Tulostaa kyseisen tekstin terminaaliin näkyviin, joka saa lopuksi "request.method" muuttujan arvon.
  logger.showInfo('Path:  ', request.path) // Tulostaa kyseisen tekstin terminaaliin näkyviin, joka saa lopuksi "request.path" muuttujan arvon.
  logger.showInfo('Body:  ', request.body) // Tulostaa kyseisen tekstin terminaaliin näkyviin, joka saa lopuksi "request.body" muuttujan arvon.
  logger.showInfo('---') // Tulostaa kyseisen tekstin terminaaliin näkyviin, jonka jälkeen suoritetaan alla oleva "next()" funktio.
  next() // Kyseinen funktio tarkoittaa sitä, että jos esim. sovelluksen pyyntö tulee väärään osoitteeseen (http://localhost:3001/api/Aarni), niin sovellus siirtyy tässä tapauksessa "tokenExtractor" funktioon.
}

// Aina kun sovellukseen suoritetaan pyyntö, niin alla oleva funktio "tokenExtractor" suoritetaan, funktion
// tarkoituksena on tarkistaa pyynnön kautta, että tuleeko sieltä "Authorization" arvoa ja tarkistaa, että
// kyseinen arvo alkaa tekstillä => "bearer ....". Jos nämä ehdot eivät toteudu, niin palautetaan pyyntöön
// "401 Unauthorized":in statuskoodilla sekä "errorMessage" objektin arvolla takaisin käyttäjälle.
const tokenExtractor = (request, response, next) => { // Alustetaan muuttuja "tokenExtractor", joka saa käyttöönsä parametrien "request", "response", ja "next" arvot.
  const getTokenValue = request.get('authorization') // Alustetaan muuttuja "getTokenValue", joka on yhtä kuin kyseinen funktio.

  if (getTokenValue && getTokenValue.toLowerCase().startsWith('bearer ')) { // Jos kyseinen if-ehto toteutuu, niin suoritetaan {...} sisällä oleva asia. Muussa tapauksessa suoritetaan "else" funktio.
    const token = getTokenValue.substring(7) // Alustetaan muuttuja "token", joka on yhtä kuin kyseinen funktio.
    const decodedToken = jwt.verify(token, process.env.SECRET) // Alustetaan muuttuja "decodedToken", joka suorittaa kyseisen funktion. Muista, että olemme erikseen luoneet ".env" tiedostoon ympäristömuuttujan => "SECRET" ja annettu sille oma arvo.
    // Muuttujan "decodedToken" sisältä löytyy objektit => "username" ja "id", joten sen avulla palvelin pystyy päättelemään, että kuka on tehnyt kyseisen pyynnön.
    // Tämä tarkoittaa sitä, kun esim. luodaan uusi arvo tietokantaan (uusi blogin arvo), niin siihen kyseiseen arvoon osataan kohdistaa oikea käyttäjätunnus yms. arvot.
    request.token = decodedToken.iat // Muuttuja "request.token" on yhtä kuin kyseinen funktio.
    request.id = decodedToken.id // Muuttuja "request.id" on yhtä kuin kyseinen funktio.
  } else { // Jos yllä oleva if-ehto ei toteudu, niin suoritetaan alla oleva funktio.
    return response.status(401).send({ errorMessage: 'You are either missing an Authorization key or value itself is wrong, please try again! :)'}) // Palautetaan pyyntöön takaisin "401 Unauthorized":in statuskoodi sekä kyseisen objektin arvo käyttäjälle.
  }
  next() // Sovellus suorittaa "next()" funktion sen jälkeen, kun jompikumpi yllä olevista funktioista on suoritettu ja siirtyy seuraavan funktion pariin. Jos tätä ei olisi, niin sovellus jäisi "roikkumaan".
}

const userExtractor = async (request, response, next) => { // Alustetaan muuttuja "userExtractor", joka saa käyttöönsä parametrien "request", "response", ja "next" arvot.
  // Jos alla oleva if-ehto toteutuu, niin suoritetaan {...} sisällä olevat asiat ja siirrytään eteenpäin sovelluksessa => "next()" funktion avulla.
  if (!request.token || !request.id) {
    return response.status(401).send({ errorMessage: 'You are either missing an Authorization key or value itself is wrong, please try again! :)'}) // Palautetaan pyyntöön takaisin "401 Unauthorized":in statuskoodi sekä kyseisen objektin arvo käyttäjälle.
  } else { // Jos yllä oleva if-ehto ei toteudu, niin suoritetaan {...} sisällä olevat asiat, jonka jälkeen siirrytään eteenpäin sovelluksessa => "next()" funktion avulla.
    const getUser = await User.findById(request.id) // Alustetaan muuttuja "getUser", joka suorittaa kyseisen funktion. Sovellus odottaa (await) kunnes funktio palauttaa arvon takaisin muuttujan "getUser" alle.
    request.user = getUser.name // Muuttuja "request.user" on yhtä kuin kyseinen funktio.
  }
  next() // Sovellus suorittaa "next()" funktion sen jälkeen, kun jompikumpi yllä olevista funktioista on suoritettu ja siirtyy seuraavan funktion pariin. Jos tätä ei olisi, niin sovellus jäisi "roikkumaan".
}

// Alustetaan muuttuja "unknownEndpoint", joka saa käyttöönsä parametrien "request" ja "response" arvot.
const unknownEndpoint = (request, response) => { // Aina kun sovellus suorittaa pyynnön palvelimelle ja sen hetkistä osoitetta (esim. "http://localhost:3001/api/Aarni") ei ole olemassa palvelimella, niin suoritetaan {...} sisällä olevat asiat.
  response.status(404).send({ errorMessage: 'unknown endpoint'}) // Palauttaa "400 Bad Request":in käyttäjälle sekä kyseisen tekstin näkyviin selaimen tai Postmanin kautta.
  logger.showInfo('You tried to access url, which doesnt exist on the server. Please try again! :)') // Tulostaa kyseisen tekstin terminaaliin näkyviin.
}

// Alustetaan muuttuja "errorHandler" (virheidenkäsittelymiddleware), joka saa neljä (4) erilaista parametriä käytettäväksi.
const errorHandler = (error, request, response, next) => { // Mikäli pyyntöjen aikana tulee "virheitä", niin sovellus suorittaa "errorHandler" funktion.
  logger.showInfo(`Current error name is following: ${error.name}`) // Tulostaa kyseisen tekstin terminaaliin näkyviin, joka saa lopuksi "error.name" muuttujan arvon.
  logger.showError(error.message) // Tulostaa kyseisen "error.message" muuttujan arvon terminaaliin näkyviin.

  if (error.name === 'CastError' && error.kind === 'ObjectId') { // Jos if-ehto toteutuu, niin suoritetaan {...} sisällä oleva asia eli palautetaan "400 Bad Request":in sekä alla olevan tekstin näkyviin selaimen tai Postmanin kautta.
    logger.showInfo('There was a problem with "CastError" and "ObjectId", please try again! :) ') // Tulostaa kyseisen tekstin terminaaliin näkyviin.
    return response.status(400).send({ errorMessage: 'malformatted id' })
  } else if (error.name === 'ValidationError') { // Jos edellinen if-ehto ei toteudu, mutta tämä if-ehto toteutuu, niin suoritetaan {...} sisällä oleva asiat eli palautetaan "400 Bad Request":in sekä alla olevan muuttujan "error.message" arvon näkyviin selaimen tai Postmanin kautta.
    logger.showInfo('There was a problem with "ValidationError", please try again! :)') // Tulostaa kyseisen tekstin terminaaliin näkyviin.
    return response.status(400).json({ errorMessage: error.message })
  } else if (error.name === 'JsonWebTokenError') { // Jos edellinen if-ehto ei toteudu, mutta tämä if-ehto toteutuu, niin suoritetaan {...} sisällä oleva asiat eli palautetaan "400 Bad Request":in sekä alla olevan muuttujan "error.message" arvon näkyviin selaimen tai Postmanin kautta.
    logger.showInfo('There was a problem with your token while trying to add new value to the database, please try again! :)') // Tulostaa kyseisen tekstin terminaaliin näkyviin.
    return response.status(400).json({ errorMessage: 'Invalid token, please try again! :)'})
  }

  next(error) // Jos mikään if-ehto ei toteudu, niin "errorHandler" muuttuja suorittaa tämän kyseisen funktion eli "next(error)" ja tulostaa terminaaliin errorin näkyviin käyttäjälle.
}

module.exports = { // Viedään kyseiset muuttujat "requestLogger", "tokenExtractor", "userExtractor", "unknownEndpoint" ja "errorHandler" sovelluksen käytettäväksi erillisenä moduulina.
  requestLogger,
  tokenExtractor,
  userExtractor,
  unknownEndpoint,
  errorHandler
}
