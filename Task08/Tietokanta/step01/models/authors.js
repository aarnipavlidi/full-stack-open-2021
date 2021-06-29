// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

const mongoose = require('mongoose') // Alustetetaan muuttuja "mongoose", joka ottaa käyttöönsä "mongoose" nimisen kirjaston sovellusta varten.
const uniqueValidator = require('mongoose-unique-validator') // Alustetetaan muuttuja "uniqueValidator", joka ottaa käyttöönsä "mongoose-unique-validator" nimisen kirjaston sovellusta varten.

// Alustetetaan muuttuja "schema", joka suorittaa kyseisen funktion eli aina,
// kun halutaan lisätä uusi arvo (Author) tietokantaan, niin arvon lisääminen
// noudattaa alla olevaa rakennetta. Muuttujan "uniqueValidator" avulla myös
// varmistetaan (validointi), että jokainen objekti täyttää niille annetut
// "säännöt/ehdot". Arvot tallentuvat "Authors" kokoelman alle.
const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 5
  },
  born: {
    type: Number,
  },
})

schema.plugin(uniqueValidator) // Muuttuja "schema" hyödyntää "uniqueValidator" muuttujan kautta tulee validointia, kun halutaan tallentaa uusi arvo tietokantaan.
// Kun kyseiseen muuttujaan tehdään viittaus eli tallennetaan uusi arvo tietokantaan, niin arvo tallentuu => "authors" kokoelman alle.
module.exports = mongoose.model('Author', schema)  // Viedään kyseinen funktio "mongoose.model('Author', schema)" sovelluksen käytettäväksi erillisenä moduulina.
