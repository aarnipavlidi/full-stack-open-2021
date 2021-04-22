// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

const mongoose = require('mongoose') // Alustetaan muuttuja "mongoose", joka hyödyntää "mongoose" kirjastoa sovelluksessa.
const supertest = require('supertest') // Alustetaan muuttuja "supertest", joka hyödyntää "supertest" kirjastoa sovelluksessa.

const helper = require('./test_helper')
const app = require('../app') // Alustetaan muuttuja "app", joka hyödyntää "app.js" (erillinen moduuli) tiedostoa eli => "../app.js".
const api = supertest(app) // Alustetaan muuttuja "api", jonka avulla voidaan suorittaa "supertest" funktion avulla HTTP-pyyntöjä backendiin (muuttujan "app" kautta).

const Blog = require('../models/blogModel') // Alustetaan muuttuja "Blog", joka hyödyntää "blogModel.js" (erillinen moduuli) tiedostoa eli => "../models/blogModel.js".

// Hyödynnetään "beforeEach()" funktiota, jonka tarkoituksena on suorittaa {...} sisällä olevat asiat aina testin alussa.
// Tämä tarkoittaa sitä, että aina kun kirjoitetaan terminaaliin esim. => "npm run test", niin "beforeEach()" suoritetaan,
// ennen siirtymistä ensimmäiseen "test()" funktion pariin eli ennen jokaista testiä alla olevat funktiot suoritetaan!
beforeEach(async () => {
  await Blog.deleteMany({}) // Poistetaan kaikki arvot tietokannasta, kunnes siirrytään seuraavaan kohtaan.

  let newBlogValue = new Blog(helper.defaultValues[0]) // Alustetaan muuttuja "newBlogValue", joka on yhtä kuin "helper.defaultValues[0]" (taulukko sijaitsee "test_helper.js" tiedostossa).
  await newBlogValue.save() // Tallennetaan muuttujan "newBlogValue" arvo tietokantaan, kunnes siirrytään seuraavaan kohtaan.

  newBlogValue = new Blog(helper.defaultValues[1]) // Kun aikaisemman muuttujan arvo on tallennettu tietokantaan, niin sama muuttuja saa arvon "helper.defaultValues[1]".
  await newBlogValue.save() // Tallennetaan muuttujan "newBlogValue" arvo tietokantaan, kunnes siirrytään seuraavaan kohtaan.
})

// Käytetään "test(...)" funktiota, joka suorittaa {...} sisällä olevat asiat. Testi myös hyödyntää "async/await" metodia!
test('Checking, if there is only two (2) value only at the database! :)', async() => { // Tulostetaan kyseinen teksti terminaaliin näkyviin, kun testiä suoritetaan.
  // Alustetaan muuttuja "response", joka hyödyntää "await" funktiota eli muuttuja odottaa kunnes => "api.get('/api/blogs')" on suoritettu ja palauttaa takaisin vastauksen.
  const response = await api.get('/api/blogs') // Kun "response" muuttuja saa arvon käytettäväksi, niin suoritetaan alla oleva funktio.
  expect(response.body).toHaveLength(helper.defaultValues.length) // Mikäli "response.body" muuttujan arvo (length) on yhtä kuin kaksi (2), niin testi menee onnistuneesti läpi. Muussa tapauksessa testi epäonnistuu ja tulee erroria terminaaliin näkyviin!
})

// Käytetään "test(...)" funktiota, joka suorittaa {...} sisällä olevat asiat. Testi myös hyödyntää "async/await" metodia!
test('Checking, if first value has object called "id" at the database! :)', async() => { // Tulostetaan kyseinen teksti terminaaliin näkyviin, kun testiä suoritetaan.
  // Alustetaan muuttuja "response", joka hyödyntää "await" funktiota eli muuttuja odottaa kunnes => "api.get('/api/blogs')" on suoritettu ja palauttaa takaisin vastauksen.
  const response = await api.get('/api/blogs') // Kun "response" muuttuja saa arvon käytettäväksi, niin suoritetaan alla oleva funktio.
  // Ota myös huomioon, että alla oleva funktio toimii "oikealla tavalla", koska me oletetaan, että kun luodaan uusi tietokanta (testaamista varten),
  // niin kyseinen tietokanta käyttää samaa nimeä kokoelman osalta (Collection) eli => "blogilista-test.blogs". Tämän takia ei tarvitse erikseen muuttaa koodia,
  // vaan hyödynnetään tiedostosta => "../models/blogMode.js" koodia ja kuten huomataan, niin riviltä 21 löytyy seuraava funktio => "mongoose.model('Blog', blogData)".
  // Ensimmäinen parametri (Blog) määrittää mihin (tai mitä) kokoelmaa käytetään ja toinen parametri (blogData) määrittää missä rakenteessa "data" tulee takaisin tietokannasta.
  expect(response.body[0].id).toBeDefined() // Mikäli "response.body[0].id" niminen objekti löytyy (täsmää) tietokannasta, niin testi menee onnistuneesti läpi. Muussa tapauksessa testi epäonnistuu ja tulee erroria terminaaliin näkyviin!
})

// Käytetään "test(...)" funktiota, joka suorittaa {...} sisällä olevat asiat. Testi myös hyödyntää "async/await" metodia!
test('Checking, if new value has been added to the database! :)', async() => { // Tulostetaan kyseinen teksti terminaaliin näkyviin, kun testiä suoritetaan.

  const newValue = { // Alustetaan muuttuja "newValue", joka saa käyttöönsä alla olevat objektit.
    title: 'New title added via test', // newValue.title on yhtä kuin kyseinen teksti.
    author: 'New author added via test', // newValue.author on yhtä kuin kyseinen teksti.
    url: 'New url added via test', // newValue.url on yhtä kuin kyseinen teksti.
    likes: '300' // newValue.likes on yhtä kuin kyseinen numero.
  }

  await api // Testi pysähtyy "väliaikaisesti" kunnes on suorittanut kaikki neljä (4) olevaa asiaa ja siirtyy eteenpäin koodissa.
    .post('/api/blogs') // POST-pyyntö ohjautuu osoitteeseen => "http://localhost:3001/api/blogs"
    .send(newValue) // Lähetetään osoitteeseen muuttujan "newValue" arvot.
    .expect(200) // Testi olettaa, että vastauksena saadaan "200 OK":n statuskoodi. Jos saamme muun arvon kuin kyseisen, niin testi epäonnistuu!
    .expect('Content-Type', /application\/json/) // Testi olettaa, että vastauksena "Content-Type" on muodossa => "JSON". Jos tämä ei toteudu, niin testi epäonnistuu!

  // Alustetaan muuttuja "valuesAfter", joka odottaa (await) kunnes => "helper.blogsInDatabase()" on suoritettu ja palauttaa takaisin vastauksen.
  // Ota myös huomioon, että olemme aikaisemmin alustaneet muuttujan "helper", joka hyödyntää "test_helper.js" tiedostoa, mistä löytyy funktio => "blogsInDatabase()".
  const valuesAfter = await helper.blogsInDatabase() // Kun "valuesAfter" muuttuja saa arvon käytettäväksi, niin suoritetaan alla oleva funktio.
  expect(valuesAfter).toHaveLength(helper.defaultValues.length + 1) // Testi olettaa, että muuttujan "valuesAfter" arvon pituus (length) on lisääntynyt yhdellä (1).

  const findAddedTitle = valuesAfter.map(result => result.title) // Alustetaan muuttuja "findAddedTitle", joka on yhtä kuin kyseinen funktio eli haetaan kaikki "title" nimiset objektit tietokannasta ja palautetaan takaisin muuttujan alle.
  expect(findAddedTitle).toContain('New title added via test') // Testi olettaa, että muuttujan "findAddedTitle" arvosta (eli näyttää kaikki "title" objektit tietokannasta) löytyy kyseinen teksti.
  // Jos molemmat "expect()" funktiot toteutuvat oletetusti, niin testi menee onnistuneesti läpi. Muussa tapauksessa testi epäonnistuu ja tulee erroria terminaaliin näkyviin!
})

// Käytetään "test(...)" funktiota, joka suorittaa {...} sisällä olevat asiat. Testi myös hyödyntää "async/await" metodia!
test('Checking, if "likes" object was missing value, so it gets automatically default value :)', async() => { // Tulostetaan kyseinen teksti terminaaliin näkyviin, kun testiä suoritetaan.

  const newValue = { // Alustetaan muuttuja "newValue", joka saa käyttöönsä alla olevat objektit.
    title: 'New title added via test', // newValue.title on yhtä kuin kyseinen teksti.
    author: 'New author added via test', // newValue.author on yhtä kuin kyseinen teksti.
    url: 'New url added via test' // newValue.url on yhtä kuin kyseinen teksti.
    // Aikaisemmassa testissä , meillä oli tässä kohdassa vielä "likes", mutta tämän testin osalta,
    // täytyy toimia niin, että kun suoritetaan testi ja lisätään uusi arvo tietokantaan, niin "likes" objekti saa
    // oletuksena arvon nolla (0), koska se puuttuu tästä! :)
  }

  await api // Testi pysähtyy "väliaikaisesti" kunnes on suorittanut kaikki neljä (4) olevaa asiaa ja siirtyy eteenpäin koodissa.
    .post('/api/blogs') // POST-pyyntö ohjautuu osoitteeseen => "http://localhost:3001/api/blogs"
    .send(newValue) // Lähetetään osoitteeseen muuttujan "newValue" arvot.
    .expect(200) // Testi olettaa, että vastauksena saadaan "200 OK":n statuskoodi. Jos saamme muun arvon kuin kyseisen, niin testi epäonnistuu!
    .expect('Content-Type', /application\/json/) // Testi olettaa, että vastauksena "Content-Type" on muodossa => "JSON". Jos tämä ei toteudu, niin testi epäonnistuu!

  // Alustetaan muuttuja "valuesAfter", joka odottaa (await) kunnes => "helper.blogsInDatabase()" on suoritettu ja palauttaa takaisin vastauksen.
  // Ota myös huomioon, että olemme aikaisemmin alustaneet muuttujan "helper", joka hyödyntää "test_helper.js" tiedostoa, mistä löytyy funktio => "blogsInDatabase()".
  const valuesAfter = await helper.blogsInDatabase() // Kun "valuesAfter" muuttuja saa arvon käytettäväksi, niin suoritetaan alla oleva funktio.
  // Tässä testissä muuttuja "valuesAfter.length - 1" saa arvon kaksi (2), koska tietokannasta löytyy tässä kohtaa kolme (3) erilaista arvoa.
  expect(valuesAfter[valuesAfter.length - 1].likes).toBe(0) // Testi olettaa, että muuttuja "valuesAfter[valuesAfter.length - 1].likes" on yhtä kuin nolla (0). Jos funktio toteutuu oletetusti, niin testi menee onnistuneesti läpi. Muussa tapauksessa testi epäonnistuu ja tulee erroria terminaaliin näkyviin!
})

// Käytetään "test(...)" funktiota, joka suorittaa {...} sisällä olevat asiat. Testi myös hyödyntää "async/await" metodia!
test('Checking, if new value which we tried to add to the database, gets rejected by the server! :)', async() => { // Tulostetaan kyseinen teksti terminaaliin näkyviin, kun testiä suoritetaan.

  const newValue = { // Alustetaan muuttuja "newValue", joka saa käyttöönsä alla olevan objektin.
    author: 'Aarni Pavlidi' // newValue.author on yhtä kuin kyseinen teksti.
  }

  await api // Testi pysähtyy "väliaikaisesti" kunnes on suorittanut kaikki kolme (3) olevaa asiaa ja siirtyy eteenpäin koodissa.
    .post('/api/blogs') // POST-pyyntö ohjautuu osoitteeseen => "http://localhost:3001/api/blogs"
    .send(newValue) // Lähetetään osoitteeseen muuttujan "newValue" arvot.
    .expect(400) // Testi olettaa, että vastauksena saadaan "400 Bad Request":n statuskoodi. Jos saamme muun arvon kuin kyseisen, niin testi epäonnistuu!

  // Alustetaan muuttuja "valuesAfter", joka odottaa (await) kunnes => "helper.blogsInDatabase()" on suoritettu ja palauttaa takaisin vastauksen.
  // Ota myös huomioon, että olemme aikaisemmin alustaneet muuttujan "helper", joka hyödyntää "test_helper.js" tiedostoa, mistä löytyy funktio => "blogsInDatabase()".
  const valuesAfter = await helper.blogsInDatabase() // Kun "valuesAfter" muuttuja saa arvon käytettäväksi, niin suoritetaan alla oleva funktio.
  // Siis testin ideana on varmistaa, kun "yritetään" lisätä uutta arvoa mistä puuttuu tietyt objektit, niin pyyntö ei mene läpi (400 Bad Request) ja, että tietokannan pituus (length) pysyy samanlaisena.
  expect(valuesAfter).toHaveLength(helper.defaultValues.length) // Testi olettaa, että muuttuja "valuesAfter" on yhtä kuin "helper.defaultValues.length" muuttujan arvo. Jos funktio toteutuu oletetusti, niin testi menee onnistuneesti läpi. Muussa tapauksessa testi epäonnistuu ja tulee erroria terminaaliin näkyviin!
})

afterAll(() => { // Käytetään "afterAll(...)" funktiota, joka suorittaa {...} sisällä olevan asian.
  mongoose.connection.close() // Kun kaikki testit on suoritettu, niin kyseinen funktio katkaisee MongoDB:n tietokantayhteyden.
})
