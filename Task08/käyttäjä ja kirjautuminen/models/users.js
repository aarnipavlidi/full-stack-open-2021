// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

const mongoose = require('mongoose') // Alustetetaan muuttuja "mongoose", joka ottaa käyttöönsä "mongoose" nimisen kirjaston sovellusta varten.
const uniqueValidator = require('mongoose-unique-validator') // Alustetetaan muuttuja "uniqueValidator", joka ottaa käyttöönsä "mongoose-unique-validator" nimisen kirjaston sovellusta varten.

// Alustetetaan muuttuja "schema", joka suorittaa kyseisen funktion eli aina,
// kun halutaan lisätä uusi arvo (User) tietokantaan, niin arvon lisääminen
// noudattaa alla olevaa rakennetta. Muuttujan "uniqueValidator" avulla myös
// varmistetaan (validointi), että jokainen objekti täyttää niille annetut
// "säännöt/ehdot". Arvot tallentuvat "Users" kokoelman alle.
const schema = new mongoose.Schema({
  username: {
    type: String, // Kun lisätään uusi arvo tietokantaan, niin "username" objektin täytyy olla tyyppiä => "String".
    required: true, // Objekti ei saa olla tyhjä, kun lisätään uusi arvo tietokantaan.
    unique: true, // Jos käyttäjä yritää lisätä uuden arvon, josta löytyy jo samanalainen objektin arvo tietokannasta, niin tulee erroria!
    minlength: 5 // Arvon täytyy olla vähintään viisi (5) merkkiä pitkä.
  },
  favoriteGenre: {
    type: String, // Kun lisätään uusi arvo tietokantaan, niin "favoriteGenre" objektin täytyy olla tyyppiä => "String".
    required: true, // Objekti ei saa olla tyhjä, kun lisätään uusi arvo tietokantaan.
    minlength: 3 // Arvon täytyy olla vähintään kolme (3) merkkiä pitkä.
  },
})

schema.plugin(uniqueValidator) // Muuttuja "schema" hyödyntää "uniqueValidator" muuttujan kautta tulee validointia, kun halutaan tallentaa uusi arvo tietokantaan.
// Kun kyseiseen muuttujaan tehdään viittaus eli tallennetaan uusi arvo tietokantaan, niin arvo tallentuu => "users" kokoelman alle.
module.exports = mongoose.model('User', schema)  // Viedään kyseinen funktio "mongoose.model('User', schema)" sovelluksen käytettäväksi erillisenä moduulina.
