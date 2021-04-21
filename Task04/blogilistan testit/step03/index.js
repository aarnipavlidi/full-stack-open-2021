// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

const app = require('./app') // Alustetaan muuttuja "app", joka hyödyntää "app.js" (erillinen moduuli) tiedostoa eli => "./app.js".
const http = require('http') // Alustetaan muuttuja "http", joka hyödyntää "http" kirjastoa sovelluksessa. Kyseinen kirjasto löytyy GitHubista @ https://github.com/nodejs/node/blob/v15.14.0/lib/http.js

const config = require('./utils/config') // Alustetaan muuttuja "config", joka hyödyntää "config.js" (erillinen moduuli) tiedostoa eli => "./utils/config.js".
const logger = require('./utils/logger') // Alustetaan muuttuja "logger", joka hyödyntää "logger.js" (erillinen moduuli) tiedostoa eli => "./utils/logger.js".

const server = http.createServer(app) // Alustetaan muuttuja "server", joka hyödyntää "http.createServer()" funktiota. Funktio muuttaa tietokoneen HTTP-palvelimeksi. Lisää tietoa funktion käytöstä löytyy @ https://www.w3schools.com/nodejs/met_http_createserver.asp

server.listen(config.PORT, () => { // Funktion "listen()" tarkoituksena on sitoa ja kuunnella yhteyksiä määritellyn isännän sekä portin kanssa.
  logger.showInfo(`Server is running on the following port: ${config.PORT}`) // Tulostaa kyseisen tekstin terminaaliin näkyviin, joka saa lopuksi vielä muuttujan "config.PORT" arvon.
})
