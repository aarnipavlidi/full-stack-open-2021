// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

const mongoose = require('mongoose') // Alustetaan muuttuja "mongoose", joka hyödyntää "mongoose" kirjastoa sovelluksessa.
const uniqueValidator = require("mongoose-unique-validator") // Alustetaan muuttuja "uniqueValidator", joka hyödyntää "mongoose-unique-validator" kirjastoa tämän sovelluksen osalta.

const userData = mongoose.Schema({ // Alustetaan muuttuja "userData", joka hyödyntää "mongoose.Schema({...})" funktiota. Sen avulla määritellään miten me tallennetaan (missä rungossa) data tietokantaan.
  username: { // Tietokannasta löytyy "username" objekti, joka hyödyntää {...} sisällä olevia asetuksia.
    type: String, // Annetaan "username" objektille tyypiksi "String" datatyyppi.
    unique: true // Jotta voidaan suorittaa esim. POST-pyyntö onnistuneesti, niin kyseistä objektin arvoa ei saa löytyä entuudestaan tietokannasta, muuten tulee erroria!
  },
  name: String, // Tietokannasta löytyy "name" objekti, joka käyttää "String" datatyyppiä.
  passwordHash: String, // Tietokannasta löytyy "passwordHash" objekti, joka käyttää "String" datatyyppiä.
  content: [ // Tietokannasta löytyy "content" objekti, joka hyödyntää {...} sisällä olevia asetuksia.
    {
      type: mongoose.Schema.Types.ObjectId, // Annetaan "content" objektille tyypiksi MongoDB:n kautta tuleva "ObjectId".
      ref: 'Blog' // Tämä tarkoittaa, että yllä oleva "ObjectId" viittaa "Blog"-tyyppisiin dokumentteihin (Collection).
    }
  ]
})

// Muuttuja "userData" hyödyntää "uniqueValidator" muuttujan sisällä olevaa kirjastoa sovelluksen suorittamiseen.
userData.plugin(uniqueValidator) // Jos tämä puuttuu, niin tulee seuraavanlaista virhettä näkyviin => "MongoError: E11000 duplicate key error collection..."
userData.set('toJSON', { // Tämän avulla voidaan määritellä missä "muodossa" sovellus näyttää JSON datan (tietokannasta tulevan datan eli MongoDB:stä) sivulla.
  transform: (document, returnedObject) => { // "transform" funktion avulla voidaan tehdä muutoksia dataan, ennen palauttamista takaisin käyttäjälle.
    returnedObject.id = returnedObject._id.toString() // Alustetaan muuttuja "returnedObject.id", joka on yhtä kuin "returnedObject._id.toString()".
    delete returnedObject._id // Poistetaan ("piilotetaan" tietokannasta tuleva data) => "blogilista.blogs" tietokannan sisällä oleva "_id" objekti.
    delete returnedObject.__v // Poistetaan ("piilotetaan" tietokannasta tuleva data) => "blogilista.blogs" tietokannan sisällä oleva "__v" objekti.
    // Jos alla olevaa funktiota ei olisi, niin käyttäjän salasana (Hash-muodossa oleva) näkyisi, jos suorittaisimme esim. GET-pyynnön
    // osoitteeseen => "http://localhost:3001/api/users" ja tätä me emme tietysti halua (turvallisuuden kannalta) vai mitä?! :)
    delete returnedObject.passwordHash // Poistetaan ("piilotetaan" tietokannasta tuleva data) => "blogilista.blogs" tietokannan sisällä oleva "passwordHash" objekti.
  }
})

// Muuttujan "userData" data tallennetaan siis tietokantaan => "blogilista" ja kokoelman "users" alle!
module.exports = mongoose.model('User', userData) // Viedään kyseinen funktio "mongoose.model('User', userData)" sovelluksen käytettäväksi erillisenä moduulina.
