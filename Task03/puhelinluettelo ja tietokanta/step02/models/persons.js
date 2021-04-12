// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

const mongoose = require("mongoose") // Alustetaan muuttuja "mongoose", joka hyödyntää "mongoose" kirjastoa tämän sovelluksen osalta.

const database = process.env.MONGODB_URI // Alustetaan muuttuja "database" joka on yhtä kuin "process.env.MongoBD_URI". Arvo haetaan erikseen ".env" tiedostosta.

console.log("Trying to connect to the following database ==>", database) // Tulostaa terminaaliin kyseisen tekstin näkyviin, jonka perään tulee vielä "database" muuttujan arvo.

mongoose.connect(database, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }) // Kyseisen funktion "mongoose.connect(...)" avulla voidaan yhdistää tietokantaan (MongoDB). Lisää infoa tästä @ https://mongoosejs.com/docs/connections.html
 .then(result => { // Jos tietokantaan yhdistäminen onnistui, niin suoritetaan ".then()" funktio ja alla oleva asia.
   console.log("Connected to the database successfully!") // Tulostaa terminaaliin kyseisen tekstin näkyviin.
 })
 .catch((error) => { // Mikäli tulee virheitä, kun yritetään yhdistää tietokantaan, niin suoritetaan ".catch()" funktio ja alla oleva asia.
   console.log("There was problem while trying connect to the database:", error.message) // Tulostaa terminaaliin kyseisen tekstin näkyviin, jonka perään tulee vielä "error.message" muuttujan arvo.
 })

 const mongoFrame = new mongoose.Schema({ // Alustetaan muuttuja "mongoFrame", joka määrittelee miten me tallennetaan (missä rungossa) ne puhelinluettelon tietokantaan.
   name: String, // Tietokannan kokoelmasta löytyy "name" muuttuja => puhelinluettelo.persons.name
   number: String // Tietokonnan kokoelmasta löytyy "number" muuttuja => puhelinluettelo.persons.number
 })

 mongoFrame.set("toJSON", { // Tämän avulla voidaan määritellä missä "muodossa" sovellus näyttää JSON datan (tietokannsta tulevan datan eli MongoDB:stä) sivulla.
   transform: (document, returnedObject) => { // "transform" funktion avulla voidaan tehdä muutoksia dataan, ennen palauttamista takaisin käyttäjälle.
     returnedObject.id = returnedObject._id.toString() // Alustetaan muuttuja "returnedObject.id", joka on yhtä kuin "returnedObject._id.toString()".
     delete returnedObject._id // Poistetaan ("piilotetaan" tietokannasta tuleva data) => "puhelinluettelo.persons" tietokannan sisällä oleva "_id" objekti.
     delete returnedObject.__v // Poistetaan ("piilotetaan" tietokannasta tuleva data) => "puhelinluettelo.persons" tietokannan sisällä oleva "__v" objekti.
   }
 })

 // Alustetaan "mongoose.model(...)" niminen funktio. Ota huomioon, jos "persons" olisi esim. "Aarni" niin data siirtyisi "aarnis" nimisen kokoelman alle.
 // Tämä tarkoittaa siis sitä, että on poikkeuksia eli datan siirron yhteydessä MongoDB muuttaa kaikki kirjaimet pieneksi ja laittaa loppuun "s" kirjaimen.
 // Alla oleva funktio saa siis arvot "persons" ja muuttujan "mongoFrame" arvon.
 module.exports = mongoose.model("persons", mongoFrame) // Viedään (export) kyseinen funktio käytettäväksi sovelluksen "index.js" tiedostossa.
