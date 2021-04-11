const mongoose = require("mongoose") // Alustetaan muuttuja "mongoose", joka hyödyntää "mongoose" kirjastoa tämän sovelluksen osalta.

// Mikäli kirjoitat terminaalin esim. ainoastaan ==> "node mongo.js" niin alla oleva if-ehto toteutuu, miksi? Koska sen pituus on yhteensä kaksi (2) eli "node mongo.js" on yhtä kuin "process.argv[0] process.argv[1]".
if (process.argv.length < 3) { // Mikäli "process.argv.length" on vähemmän kuin kolme (3), niin suoritetaan {...} sisällä olevat asiat.
  console.log(`You just typed to the terminal command, which length is total of ${process.argv.length}!`) // Mikäli if-ehto toteutuu, niin kyseinen teksti ja muuttujan (process.argv.length) arvo tulostuu terminaaliin näkyviin.
  console.log("You have given wrong password, please try again! :)") // Mikäli if-ehto toteutuu, niin kyseinen teksti tulostuu terminaalin näkyviin.
  process.exit(1) // Kun yllä olevat tekstit on tulostettu näkyviin terminaalin, niin suljetaan sovellus "process.exit(1)" funktion avulla. Lisää infoa tästä @ https://nodejs.org/api/process.html#process_process_exit_code
}

// Tämän tehtävän osalta, lisäämme dataa MongoDB:n tietokantaan Node.js:n terminaalin kautta eli, jos haluaisimme lisätä uuden henkilön, niin se tapahtuisi seuraavalla tavalla:
// node mongo.js randompassword "Aarni Pavlidi" "010 123 123" ja tämä on yhtä kuin ==> process.argv[0] process.argv[1] process.argv[2] process.argv[3] process.argv[4]
// Käytännössä tämä sovellus (mongo.js) poimii nämä kyseiset arvot terminaalista ja yhdistää ne sen kyseisen muuttujan kanssa esim. "process.argv[2] = password"
const username = "your_username_here" // Alustetaan muuttuja "username", joka saa arvoksi kyseisen tekstin.
const password = process.argv[2] // Alustetaan muuttuja "password", joka on yhtä kuin "process.argv[2]".

const clusterName = "your_clustername_here" // Alustetaan muuttuja "clusterName", joka saa arvoksi kyseisen tekstin.
const databaseName = "your_databasename_here" // Alustetaan muuttuja "databaseName", joka saa arvoksi kyseisen tekstin.

const database = `mongodb+srv://${username}:${password}@${clusterName}.i21mx.mongodb.net/${databaseName}?retryWrites=true&w=majority` // Alustetaan muuttuja "database", joka saa arvoksi kyseisen tekstin sekä muuttujien (username, password, clusterName, databaseName) arvot!

mongoose.connect(database, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }) // Kyseisen funktion "mongoose.connect(...)" avulla voidaan yhdistää tietokantaan (MongoDB). Lisää infoa tästä @ https://mongoosejs.com/docs/connections.html

const mongoFrame = new mongoose.Schema({ // Alustetaan muuttuja "mongoFrame", joka määrittelee miten me tallennetaan (missä rungossa) ne puhelinluettelon tietokantaan.
  name: String, // Tietokannan kokoelmasta löytyy "name" muuttuja => puhelinluettelo.persons.name
  number: String // Tietokonnan kokoelmasta löytyy "number" muuttuja => puhelinluettelo.persons.number
})

// Alustetaan muuttuja "PostData", joka on yhtä kuin "mongoose.model(...)" funktio. Ota huomioon, jos "persons" olisi esim. "Aarni" niin data siirtyisi "aarnis" nimisen kokoelman alle.
// Tämä tarkoittaa siis sitä, että on poikkeuksia eli datan siirron yhteydessä MongoDB muuttaa kaikki kirjaimet pieneksi ja laittaa loppuun "s" kirjaimen.
// Alla oleva funktio saa siis arvot "persons" ja muuttujan "mongoFrame" arvon.
const PostData = mongoose.model("persons", mongoFrame)

if (process.argv.length === 3) { // Jos kyseinen if-ehto toteutuu eli, jos "process.argv.length" on yhtä kuin kolme (3), niin suoritetaan {...} sisällä olevat asiat.
  // Mikäli emme halua lisätä mitään uutta dataa tietokantaan eli käytetään terminaalissa esim. komentoa => "node mongo.js randompassword", niin sovellus suorittaa alla olevan funktion ja tulostaa terminaalin näkyviin datan, mikä sijaitsee jo tietokannassa!
  PostData.find({}).then(showResult => { // Muuttuja "PostData" on yhtä kuin "puhelinluettelo.persons" kokoelman kanssa eli "find()" funktio etsii sen sisältä kaikki arvot ja palauttaa ne takaisin "showResult" muuttujan alle.
    console.log("Phonebook has currently following persons listed:") // Tulostaa terminaaliin näkyviin kyseisen tekstin.
    showResult.forEach(person => { // Mikäli "showResult" muuttujan sisällä on esim. kaksi (2) arvoa, niin suoritetaan "forEach(person => {...})" funktio molemmille erikseen.
      console.log(person.name, person.number) // Tulostaa terminaaliin näkyviin "person.name" ja "person.number" muuttujien arvot, esim. => "Aarni Pavlidi 010 123 123"
    })
    console.log("Nothing new has been added to the database! :)") // Tulostaa terminaaliin näkyviin kyseisen tekstin, sen jälkeen kun "forEach()" funktio on suoritettu loppuun!
    mongoose.connection.close() // Kyseinen funktio "mongoose.connection.close()" sulkee yhteyden sovelluksen ja tietokannan välillä. Jos tätä ei olisi, niin ohjelman suoritus jää niin sanotusti "roikkumaan"!
  })
}

// Tämän tehtävän osalta, lisäämme dataa MongoDB:n tietokantaan Node.js:n terminaalin kautta eli, jos haluaisimme lisätä uuden henkilön, niin se tapahtuisi seuraavalla tavalla:
// node mongo.js randompassword "Aarni Pavlidi" "010 123 123" ja tämä on yhtä kuin ==> process.argv[0] process.argv[1] process.argv[2] process.argv[3] process.argv[4]
// Käytännössä tämä sovellus (mongo.js) poimii nämä kyseiset arvot terminaalista ja yhdistää ne sen kyseisen muuttujan kanssa esim. "process.argv[2] = password"
const nameConsole = process.argv[3] // Alustetaan muuttuja "nameConsole", joka on yhtä kuin "process.argv[3]".
const numberConsole = process.argv[4] // Alustetaan muuttuja "numberConsole", joka on yhtä kuin "process.argv[4]"

const fetchData = new PostData({ // Alustetaan muuttuja "fetchData", joka hyödyntää muuttujan "PostData" funktiota eli tässä käytetään "mongoFrame" muuttujan skeemaa (Schema), jossa "name" ja "number" saa arvoksi alle olevien (nameConsole, numberConsole) muuttujien arvot!
  name: nameConsole, // eli "name: String" => "name: nameConsole" ja arvot siirtyvät "persons" kokoelman alle => puhelinluettelo.persons
  number: numberConsole // eli "number: String" => "number: numberConsole" ja arvot siirtyvät "persons" kokoelman alle => puhelinluettelo.persons
})

if (process.argv.length > 4) { // Jos kyseinen if-ehto toteutuu eli, jos "process.argv.length" on enemmän kuin neljä (4), niin suoritetaan {...} sisällä olevat asiat.
  fetchData.save().then(response => { // Tallennetaan "fetchData" muuttujan sisällä oleva data tietokantaan eli => puhelinluettelo.persons kokoelman alle. Lisää infoa tästä funktiosta @ https://www.w3resource.com/mongodb/shell-methods/collection/db-collection-save.php
    console.log(`You have successfully added ${response.name} to the database! :)`) // Tulostaa terminaalin kyseisen tekstin ja muuttujan "response.name" arvon, kun data on siirretty onnistuneesti tietokantaan!
    // Jos haluaisin lisätä esim. "Aarni Pavlidi" henkilön tietokantaan, niin terminaalin tulostuisi => "You have successfully added Aarni Pavlidi to the database! :)"
    mongoose.connection.close() // Kyseinen funktio "mongoose.connection.close()" sulkee yhteyden sovelluksen ja tietokannan välillä. Jos tätä ei olisi, niin ohjelman suoritus jää niin sanotusti "roikkumaan"!
  })
}
