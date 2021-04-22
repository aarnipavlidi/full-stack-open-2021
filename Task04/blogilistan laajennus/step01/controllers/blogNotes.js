// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

// Alustetaan muuttuja "express", joka hyödyntää "express" kirjastoa sovelluksessa.
const blogRouter = require('express').Router() // Kyseinen muuttuja hyödyntää myös "Router()" funktiota, jonka tarkoituksena on luoda uusi reititinobjekti sovelluksen käytettäväksi. Lisää tietoa funktion käytöstä löytyy @ https://www.geeksforgeeks.org/express-js-express-router-function/
const Blog = require('../models/blogModel') // Alustetaan muuttuja "Blog", joka hyödyntää "blogModel.js" (erillinen moduuli) tiedostoa eli => "../models/blogModel.js".

// Kun suoritetaan pyyntö osoitteeseen "http://localhost:3000/api/blogs" ja halutaan nähdä kaikki tietokannan arvot, niin sovellus suorittaa alla olevan "get(...)" funktion, joka saa myös parametreinä "request" ja "response" muuttujat käyttöönsä.
blogRouter.get('/', async (request, response) => { // Funktion "get(...)" sisällä hyödynnetään myös "async/await" metodia!
  // Alustetaan muuttuja "getValues", joka hyödyntää "await" funktiota eli muuttuja odottaa kunnes => "Blog.find({})" on suoritettu ja palauttaa takaisin vastauksen.
  const getValues = await Blog.find({}) // Kun "getValues" muuttuja saa arvon käytettäväksi, niin suoritetaan alla olevat funktiot.
  response.json(getValues.map(showResults => showResults.toJSON())) // Palautetaan "getValues" muuttujan data takaisin JSON-objektina.
})

// Kun suoritetaan pyyntö osoitteeseen "http://localhost:3000/api/blogs" ja halutaan lisätä uusi arvo tietokantaan, niin sovellus suorittaa alla olevan "post(...)" funktion, joka saa myös parametreinä "request" ja "response" muuttujat käyttöönsä.
blogRouter.post('/', async (request, response) => { // Funktion "post(...)" sisällä hyödynnetään myös "async/await" metodia!
  const getValues = new Blog(request.body) // Alustetaan muuttuja "getValues", joka on yhtä kuin kyseinen funktio. Pyynnön kautta tuleva data (request.body) tallennetaan "väliaikaisesti" muuttujan "getValues" alle.
  // Alustetaan muuttuja "savedValue", joka hyödyntää "await" funktiota eli muuttuja odottaa kunnes => "await getValues.save()" on suoritettu ja palauttaa takaisin vastauksen.
  const savedValue = await getValues.save() // Kun "savedValue" muuttuja saa arvon käytettäväksi, niin suoritetaan alla oleva funktio.
  response.json(savedValue.toJSON()) // Palautetaan "savedValue" muuttujan data takaisin JSON-objektina.
})

// Kun suoritetaan pyyntö osoitteeseen "http://localhost:3000/api/blogs/:id" ja halutaan poistaa tietty arvo (id:n mukaisesti) tietokannasta, niin sovellus suorittaa alla olevan "delete(...)" funktion, joka saa myös parametreinä "request" ja "response" muuttujat käyttöönsä.
blogRouter.delete('/:id', async (request, response) => { // Funktion "delete(...)" sisällä hyödynnetään myös "async/await" metodia!
  // Funktion "findByIdAndRemove(...)" avulla etsitään tietokannasta "id" objektin arvo, joka täsmää pyynnön kautta tulevan "id":n arvon kanssa.
  // Jos esim. Postmanin kautta halutaan poistaa tietty arvo tietokannasta niin siirrymme esim. osoitteeseen => "http://localhost:3000/api/blogs/60819a687fdec7527cbfb723",
  // joka tarkoittaa sitä, että "request.params.id" muuttuja on yhtä kuin => "60819a687fdec7527cbfb723".
  await Blog.findByIdAndRemove(request.params.id) // Suoritetaan kyseinen funktio, jonka jälkeen suoritetaan alla oleva funktio.
  response.status(204).end() // Palautetaan takaisin "204 (No Content)":in statuskoodi, jonka jälkeen suljetaan "response" muuttujan prosessi käyttämällä "end()" funktiota.
})

module.exports = blogRouter // Viedään kyseinen muuttuja "blogRouter" sovelluksen käytettäväksi erillisenä moduulina.
