// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

// Alustetaan muuttuja "express", joka hyödyntää "express" kirjastoa sovelluksessa.
const blogRouter = require('express').Router() // Kyseinen muuttuja hyödyntää myös "Router()" funktiota, jonka tarkoituksena on luoda uusi reititinobjekti sovelluksen käytettäväksi. Lisää tietoa funktion käytöstä löytyy @ https://www.geeksforgeeks.org/express-js-express-router-function/
const Blog = require('../models/blogModel') // Alustetaan muuttuja "Blog", joka hyödyntää "blogModel.js" (erillinen moduuli) tiedostoa eli => "../models/blogModel.js".

// Kun suoritetaan pyyntö osoitteeseen "http://localhost:3000/api/blogs" ja halutaan nähdä kaikki tietokannan arvot, niin sovellus suorittaa alla olevan "get(...)" funktion, joka saa myös parametreinä "request" ja "response" muuttujat käyttöönsä.
blogRouter.get('/', (request, response) => {
  Blog // Käytetään funktion sisällä "Blog" muuttujan arvoa.
    .find({}) // Haetaan kaikki arvot tietokannasta eli => "blogilista.blogs".
    .then(showResults => { // Jonka jälkeen palautetaan arvot takaisin käyttäjälle näkyviin selaimeen "showResults" muuttujan avulla.
      response.json(showResults) // Palautetaan "showResults" muuttujan data takaisin JSON-objektina.
    })
})

// Kun suoritetaan pyyntö osoitteeseen "http://localhost:3000/api/blogs" ja halutaan lisätä uusi arvo tietokantaan, niin sovellus suorittaa alla olevan "post(...)" funktion, joka saa myös parametreinä "request" ja "response" muuttujat käyttöönsä.
blogRouter.post('/', (request, response) => {
  const getValues = new Blog(request.body) // Alustetaan muuttuja "getValues", joka on yhtä kuin kyseinen funktio. Pyynnön kautta tuleva data (request.body) tallennetaan "väliaikaisesti" muuttujan "getValues" alle.

  getValues // Muuttuja "getValues" vastaanottaa pyynnön kautta tulevan datan eli "request.body", jonka jälkeen suoritetaan alla olevat funktiot.
    .save() // Funktion avulla tallennetaan "getValues" muuttujan data tietokantaan eli => "blogilista.blogs" sisälle.
    .then(savedValue => { // Jonka jälkeen palautetaan tallennettu arvo takaisin käyttäjälle näkyviin selaiameen "savedValue" muuttujan avulla.
      response.status(201).json(savedValue) // Palautetaan "201 Crated":in statuskoodi sekä muuttujan data eli "savedValue" takaisin JSON-objektina.
    })
})

module.exports = blogRouter // Viedään kyseinen muuttuja "blogRouter" sovelluksen käytettäväksi erillisenä moduulina.
