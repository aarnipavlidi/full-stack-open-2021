// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

const mongoose = require('mongoose') // Alustetaan muuttuja "mongoose", joka hyödyntää "mongoose" kirjastoa sovelluksessa.

const blogData = mongoose.Schema({ // Alustetaan muuttuja "blogData", joka hyödyntää "mongoose.Schema({...})" funktiota. Sen avulla määritellään miten me tallennetaan (missä rungossa) data tietokantaan.
  title: String, // Tietokannasta löytyy "title" objekti, joka käyttää "String" datatyyppiä.
  author: String, // Tietokannasta löytyy "author" objekti, joka käyttää "String" datatyyppiä.
  url: String, // Tietokannasta löytyy "url" objekti, joka käyttää "String" datatyyppiä.
  likes: Number // Tietokannasta löytyy myös vielä "likes" objekti, joka käyttää "Number" datatyyppiä.
})

blogData.set('toJSON', { // Tämän avulla voidaan määritellä missä "muodossa" sovellus näyttää JSON datan (tietokannasta tulevan datan eli MongoDB:stä) sivulla.
  transform: (document, returnedObject) => { // "transform" funktion avulla voidaan tehdä muutoksia dataan, ennen palauttamista takaisin käyttäjälle.
    returnedObject.id = returnedObject._id.toString() // Alustetaan muuttuja "returnedObject.id", joka on yhtä kuin "returnedObject._id.toString()".
    delete returnedObject._id // Poistetaan ("piilotetaan" tietokannasta tuleva data) => "blogilista.blogs" tietokannan sisällä oleva "_id" objekti.
    delete returnedObject.__v // Poistetaan ("piilotetaan" tietokannasta tuleva data) => "blogilista.blogs" tietokannan sisällä oleva "__v" objekti.
  }
})

module.exports = mongoose.model('Blog', blogData) // Viedään kyseinen funktio "mongoose.model('Blog', blogData)" sovelluksen käytettäväksi erillisenä moduulina.
