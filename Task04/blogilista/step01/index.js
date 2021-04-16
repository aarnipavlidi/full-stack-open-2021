// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

const http = require('http') // Alustetaan muuttuja "http", joka hyödyntää "http" kirjastoa sovelluksessa. Kyseinen kirjasto löytyy GitHubista @ https://github.com/nodejs/node/blob/v15.14.0/lib/http.js
const express = require('express') // Alustetaan muuttuja "express", joka hyödyntää "express" kirjastoa sovelluksessa.
const program = express() // Alustetaan muuttuja "program", jonka tarkoituksena on luoda kyseisen funktion avulla uusi applikaatio sovelluksen käytettäväksi.
const cors = require('cors') // Alustetaan muuttuja "cors", joka hyödyntää "cors" kirjastoa sovelluksessa.
const mongoose = require('mongoose') // Alustetaan muuttuja "mongoose", joka hyödyntää "mongoose" kirjastoa sovelluksessa.

const blogData = mongoose.Schema({ // Alustetaan muuttuja "blogData", joka hyödyntää "mongoose.Schema({...})" funktiota. Sen avulla määritellään miten me tallennetaan (missä rungossa) data tietokantaan.
  title: String, // Tietokannasta löytyy "title" objekti, joka käyttää "String" datatyyppiä.
  author: String, // Tietokannasta löytyy "author" objekti, joka käyttää "String" datatyyppiä.
  url: String, // Tietokannasta löytyy "url" objekti, joka käyttää "String" datatyyppiä.
  likes: Number // Tietokannasta löytyy myös vielä "likes" objekti, joka käyttää "Number" datatyyppiä.
})

// Alustetaan "Blog" niminen muuttuja, joka käyttää "mongoose.model(...)" funktiota. Kyseinen funktio on ensisijainen työkalu vuorovaikutuksessa MongoDB:n kanssa.
// Tämä tarkoittaa sitä, että aina kun "Blog" muuttujaa hyödynnetään sovelluksen aikana, niin sovellus viittaa "Blog" (eli blogs) kokoelmaan, joka hyödyntää "blogData" muuttujan rakennetta.
const Blog = mongoose.model('Blog', blogData) // Data tallentuu "blogilista" tietokannan alle ja saa kokoelman (collection) nimeksi => "blogs". Lisää tietoa funktion käytöstä löytyy @ https://mongoosejs.com/docs/api/model.html#model_Model

const database = 'your_database_url_here' // Alustetaan muuttuja "database", joka saa arvoksi kyseisen tekstin.
mongoose.connect(database, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }) // Funktion "mongoose.connect(...)" avulla yhdistetään tietokantaan (MongoDB). Lisää tietoa funktion käytöstä löytyy @ https://mongoosejs.com/docs/connections.html

program.use(cors()) // Sovellus käyttää kyseistä "middlewarea" (cors) ja tämän avulla sallitaan muista origineista tulevat pyynnöt (request) tähän sovellukseen.
program.use(express.json()) // Sovellus käyttää kyseistä "middlewarea" (express.json()) ja tämän avulla sovellus jäsentää saapuvat pyynnöt (request) JSON:in avulla. Lisää tietoa funktion käytöstä löytyy @ http://expressjs.com/en/api.html#express.json

// Kun suoritetaan pyyntö osoitteeseen "http://localhost:3000/api/blogs" ja halutaan nähdä kaikki tietokannan arvot, niin sovellus suorittaa alla olevan "get(...)" funktion, joka saa myös parametreinä "request" ja "response" muuttujat käyttöönsä.
program.get('/api/blogs', (request, response) => {
  Blog // Käytetään funktion sisällä "Blog" muuttujan arvoa.
    .find({}) // Haetaan kaikki arvot tietokannasta eli => "blogilista.blogs".
    .then(showResults => { // Jonka jälkeen palautetaan arvot takaisin käyttäjälle näkyviin selaimeen "showResults" muuttujan avulla.
      response.json(showResults) // Palautetaan "showResults" muuttujan data takaisin JSON-objektina.
    })
})

// Kun suoritetaan pyyntö osoitteeseen "http://localhost:3000/api/blogs" ja halutaan lisätä uusi arvo tietokantaan, niin sovellus suorittaa alla olevan "post(...)" funktion, joka saa myös parametreinä "request" ja "response" muuttujat käyttöönsä.
program.post('/api/blogs', (request, response) => {
  const getValues = new Blog(request.body) // Alustetaan muuttuja "getValues", joka on yhtä kuin kyseinen funktio. Pyynnön kautta tuleva data (request.body) tallennetaan "väliaikaisesti" muuttujan "getValues" alle.

  getValues // Muuttuja "getValues" vastaanottaa pyynnön kautta tulevan datan eli "request.body", jonka jälkeen suoritetaan alla olevat funktiot.
    .save() // Funktion avulla tallennetaan "getValues" muuttujan data tietokantaan eli => "blogilista.blogs" sisälle.
    .then(savedValue => { // Jonka jälkeen palautetaan tallennettu arvo takaisin käyttäjälle näkyviin selaiameen "savedValue" muuttujan avulla.
      response.status(201).json(savedValue) // Palautetaan "201 Crated":in statuskoodi sekä muuttujan data eli "savedValue" takaisin JSON-objektina.
    })
})

const PORT = 3000 // Alustetaan muuttuja "PORT", joka on yhtä kuin "3000" eli sovellus saa käyttöönsä kyseisen portin arvon.
program.listen(PORT, () => { // Funktion "listen()" tarkoituksena on sitoa ja kuunnella yhteyksiä määritellyn isännän sekä portin kanssa.
  console.log(`Server is running on the following port: ${PORT}`) // Tulostaa kyseisen tekstin terminaaliin näkyviin, joka saa lopuksi myös "PORT" muuttujan arvon.
})
