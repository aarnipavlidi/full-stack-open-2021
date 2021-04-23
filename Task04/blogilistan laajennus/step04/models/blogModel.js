// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

const mongoose = require('mongoose') // Alustetaan muuttuja "mongoose", joka hyödyntää "mongoose" kirjastoa sovelluksessa.

const blogData = mongoose.Schema({ // Alustetaan muuttuja "blogData", joka hyödyntää "mongoose.Schema({...})" funktiota. Sen avulla määritellään miten me tallennetaan (missä rungossa) data tietokantaan.
  title: { // Tietokannasta löytyy "title" objekti, joka hyödyntää {...} sisällä olevia asetuksia.
    type: String, // Annetaan "title" objektille tyypiksi "String" datatyyppi.
    required: true // Kun suoritetaan esim. POST-pyyntö, niin kyseistä objektia vaaditaan, jotta voidaan suorittaa pyyntö onnistuneesti tietokantaan, muuten tulee erroria!
  },
  author: String, // Tietokannasta löytyy "author" objekti, joka käyttää "String" datatyyppiä.
  url : { // Tietokannasta löytyy "url" objekti, joka hyödyntää {...} sisällä olevia asetuksia.
    type: String, // Annetaan "url" objektille tyypiksi "String" datatyyppi.
    required: true // Kun suoritetaan esim. POST-pyyntö, niin kyseistä objektia vaaditaan, jotta voidaan suorittaa pyyntö onnistuneesti tietokantaan, muuten tulee erroria!
  },
  likes: {  // Tietokannasta löytyy "likes" objekti, joka hyödyntää {...} sisällä olevia asetuksia.
    type: Number, // Annetaan "likes" objektille tyypiksi "Number" datatyyppi.
    default: '0' // Annetaan "likes" objektille oletusarvo nolla (0) eli jos, esim. POST-pyynnön aikana puuttuu kyseinen arvo niin sovellus antaa oletuksena arvon nolla (0)!
  },
  user: { // Tietokannasta löytyy myös vielä "user" objekti, joka hyödyntää {...} sisällä olevia asetuksia.
    type: mongoose.Schema.Types.ObjectId, // Annetaan "user" objektille tyypiksi MongoDB:n kautta tuleva "ObjectId".
    ref: 'User' // Tämä tarkoittaa, että yllä oleva "ObjectId" viittaa "User"-tyyppisiin dokumentteihin (Collection).
  }
})

blogData.set('toJSON', { // Tämän avulla voidaan määritellä missä "muodossa" sovellus näyttää JSON datan (tietokannasta tulevan datan eli MongoDB:stä) sivulla.
  transform: (document, returnedObject) => { // "transform" funktion avulla voidaan tehdä muutoksia dataan, ennen palauttamista takaisin käyttäjälle.
    returnedObject.id = returnedObject._id.toString() // Alustetaan muuttuja "returnedObject.id", joka on yhtä kuin "returnedObject._id.toString()".
    delete returnedObject._id // Poistetaan ("piilotetaan" tietokannasta tuleva data) => "blogilista.blogs" tietokannan sisällä oleva "_id" objekti.
    delete returnedObject.__v // Poistetaan ("piilotetaan" tietokannasta tuleva data) => "blogilista.blogs" tietokannan sisällä oleva "__v" objekti.
  }
})

// Muuttujan "blogData" data tallennetaan siis tietokantaan => "blogilista" ja kokoelman "blogs" alle!
module.exports = mongoose.model('Blog', blogData) // Viedään kyseinen funktio "mongoose.model('Blog', blogData)" sovelluksen käytettäväksi erillisenä moduulina.
