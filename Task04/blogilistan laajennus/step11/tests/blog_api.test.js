// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

// I made some changes for the code, because of task => "4.23*: blogilistan laajennus, step11". There was problem adding new values,
// because it was missing authentication with token. I did some googling and took inspiration from following site =>
// https://www.rithmschool.com/courses/intermediate-node-express/api-tests-with-jest, keep in mind you can't just copy it and it would
// suddenly work. If you compare sites code and mine, there is little bit of difference! :)

const mongoose = require('mongoose') // Alustetaan muuttuja "mongoose", joka hyödyntää "mongoose" kirjastoa sovelluksessa.
const supertest = require('supertest') // Alustetaan muuttuja "supertest", joka hyödyntää "supertest" kirjastoa sovelluksessa.

const helper = require('./test_helper') // Alustetaan muuttuja "helper", joka hyödyntää "test_helper.js" tiedoston funktioita, kun testiä suoritetaan.
const app = require('../app') // Alustetaan muuttuja "app", joka hyödyntää "app.js" (erillinen moduuli) tiedostoa eli => "../app.js".
const api = supertest(app) // Alustetaan muuttuja "api", jonka avulla voidaan suorittaa "supertest" funktion avulla HTTP-pyyntöjä backendiin (muuttujan "app" kautta).

const jwt = require('jsonwebtoken') // Alustetaan muuttuja "jwt", joka hyödyntää "jsonwebtoken" nimistä kirjastoa sovelluksen aikana.
const bcrypt = require('bcrypt') // Alustetaan muuttuja "bcrypt", joka hyödyntää "bcrypt" nimistä kirjastoa sovelluksen aikana.

const Blog = require('../models/blogModel') // Alustetaan muuttuja "Blog", joka hyödyntää "blogModel.js" (erillinen moduuli) tiedostoa eli => "../models/blogModel.js".
const User = require('../models/user') // Alustetaan muuttuja "User", joka hyödyntää "user.js" (erillinen moduuli) tiedostoa eli => "../models/user.js".

let auth = {} // Alustetaan muuttuja "auth", jonka sisälle saadaan sovelluksen testaamisen aikana objektien "token" sekä "id" arvon.
let newSavedUser // Alustetaan muuttuja "newSavedUser", joka saa objektien "username" ja "name" arvot sekä muuttujan "passwordHash" arvon.

// Suoritetaan "beforeAll(...)" funktio, joka suoritetaan ainostaan kerran ennen testien suorittamista, eli aina kun tehdään uusi testi,
// niin tämä funktio suoritetaan. Funktion tarkoituksena, on "siivota" tietokanta käyttäjätunnuksien osalta, jonka jälkeen luodaan uusi
// käyttäjätunnus ja tallenetaan se tietokantaan. Muista, että nämä alla olevat testit tehdään erilliseen "testi tietokantaan"! :)
beforeAll(async () => {
  await User.deleteMany({}) // Suoritetaan kyseinen funktio, kunnes siirrytään (await) seuraavaan kohtaan eli poistetaan kaikki käyttäjätunnukset tietokannasta.

  const getValues = { // Alustetaan muuttuja "getValues", joka saa alla olevat objektit käyttöönsä.
    username: "usernamefortesting", // eli "getValues.username" on yhtä kuin kyseinen teksti.
    name: "Aarni Pavlidi", // eli "getValues.name" on yhtä kuin kyseinen teksti.
    password: "passwordfortesting" // eli "getValues.password" on yhtä kuin kyseinen teksti.
  }

  const saltRounds = 10 // Alustetaan muuttuja "saltRounds", joka on yhtä kuin "10".
  // Alustetaan muuttuja "passwordHash", joka suorittaa alla olevan funktion. Kun haluamme luoda uuden käyttäjän esim. Postmanin kautta,
  // niin me esim. annamme seuraavan arvon Body:n sisään => password: "randompassword" ja funktio vastaanottaa kyseisen arvon pyynnön kautta (request.body.password)
  // ja muuttaa sen "hash" muotoon eli tietokantaan jää "talteen" täysin erilainen arvo mitä me alunperin annettiin. Muuttujan "saltRounds" avulla määritellään, että
  // kuinka paljon aikaa tarvitaan yhden (1) BCrypt-hashin laskemiseen. Mitä korkeampi tuo kyseinen luku on, niin sitä enemmän sekoituskierroksia tehdään yhteensä,
  // joka tarkoittaa sitä että menee myös enemmän aikaa funktion suorittamiseen.
  const passwordHash = await bcrypt.hash(getValues.password, saltRounds) // Kun funktio on suoritettu (await), niin muuttuja saa arvon käytettäväksi ja sovellus siirtyy eteenpäin.

  // Olemme myös alussa alustaneet "User" muuttujan (erillinen moduuli) ja sen avulla määritellään mitä rakennetta data noudattaa,
  // missä muodossa se tallennetaan ja minkä kokoelman alle kyseinen data tallennetaan. Moduulin lopusta löytyy funktio => "mongoose.model('User', userData)".
  const userValue = new User({ // Alustetaan muuttuja "userValue", joka saa alla olevat objektit "username" ja "name" käyttöönsä sekä muuttujan "passwordHash" arvon.
    username: getValues.username, // eli "userValue.username" on yhtä kuin "getValues.username".
    name: getValues.name, // eli "userValue.name" on yhtä kuin "getValues.name".
    passwordHash // eli "userValue.passwordHash".
  })

  newSavedUser = await userValue.save() // Alustetaan muuttuja "newSavedUser", joka suorittaa kyseisen funktion eli tallennetaan muuttujan "userValue" data tietokantaan eli => "blogilista-test.users".
})

// Hyödynnetään "beforeEach()" funktiota, jonka tarkoituksena on suorittaa {...} sisällä olevat asiat aina testin alussa.
// Tämä tarkoittaa sitä, että aina kun kirjoitetaan terminaaliin esim. => "npm run test", niin "beforeEach()" suoritetaan,
// ennen siirtymistä ensimmäiseen "test()" funktion pariin eli ennen jokaista testiä alla olevat funktiot suoritetaan!
beforeEach(async () => {
  await Blog.deleteMany({}) // Poistetaan kaikki arvot tietokannasta, kunnes siirrytään seuraavaan kohtaan.

  let newBlogValue = new Blog(helper.defaultValues[0]) // Alustetaan muuttuja "newBlogValue", joka on yhtä kuin "helper.defaultValues[0]" (taulukko sijaitsee "test_helper.js" tiedostossa).
  await newBlogValue.save() // Tallennetaan muuttujan "newBlogValue" arvo tietokantaan, kunnes siirrytään seuraavaan kohtaan.

  newBlogValue = new Blog(helper.defaultValues[1]) // Kun aikaisemman muuttujan arvo on tallennettu tietokantaan, niin sama muuttuja saa arvon "helper.defaultValues[1]".
  await newBlogValue.save() // Tallennetaan muuttujan "newBlogValue" arvo tietokantaan, kunnes siirrytään seuraavaan kohtaan.

  const response = await api // Testi pysähtyy "väliaikaisesti" kunnes on suorittanut kaikki kaksi (2) olevaa asiaa ja siirtyy eteenpäin koodissa.
    .post('/api/login') // POST-pyyntö ohjautuu osoitteeseen => "http://localhost:3001/api/login".
    .send({ // Lähetetään osoitteeseen alla olevien objektien "username" ja "password" arvot.
      username: "usernamefortesting",
      password: "passwordfortesting"
    })

  auth.token = response.body.token // Muuttujan "auth" => objektin arvo "token" on yhtä kuin => "response.body.token".
  auth.id = jwt.verify(auth.token, process.env.SECRET).id // Muuttujan "auth" => objektin arvo "id" on yhtä kuin funktion "jwt.verify(auth.token, process.env.SECRET).id" tulos.
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
    .set('Authorization', `Bearer ${auth.token}`) // Kuten olemme Postmanin kautta erikseen laittaneet => Headers => "Authorization" kohdalle erikseen arvon, joka alkaa tekstillä "bearer", niin testin osalta pitää myös tehdä samoin.
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
    .set('Authorization', `Bearer ${auth.token}`) // Kuten olemme Postmanin kautta erikseen laittaneet => Headers => "Authorization" kohdalle erikseen arvon, joka alkaa tekstillä "bearer", niin testin osalta pitää myös tehdä samoin.
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
    .set('Authorization', `Bearer ${auth.token}`) // Kuten olemme Postmanin kautta erikseen laittaneet => Headers => "Authorization" kohdalle erikseen arvon, joka alkaa tekstillä "bearer", niin testin osalta pitää myös tehdä samoin.
    .send(newValue) // Lähetetään osoitteeseen muuttujan "newValue" arvot.
    .expect(400) // Testi olettaa, että vastauksena saadaan "400 Bad Request":n statuskoodi. Jos saamme muun arvon kuin kyseisen, niin testi epäonnistuu!

  // Alustetaan muuttuja "valuesAfter", joka odottaa (await) kunnes => "helper.blogsInDatabase()" on suoritettu ja palauttaa takaisin vastauksen.
  // Ota myös huomioon, että olemme aikaisemmin alustaneet muuttujan "helper", joka hyödyntää "test_helper.js" tiedostoa, mistä löytyy funktio => "blogsInDatabase()".
  const valuesAfter = await helper.blogsInDatabase() // Kun "valuesAfter" muuttuja saa arvon käytettäväksi, niin suoritetaan alla oleva funktio.
  // Siis testin ideana on varmistaa, kun "yritetään" lisätä uutta arvoa mistä puuttuu tietyt objektit, niin pyyntö ei mene läpi (400 Bad Request) ja, että tietokannan pituus (length) pysyy samanlaisena.
  expect(valuesAfter).toHaveLength(helper.defaultValues.length) // Testi olettaa, että muuttuja "valuesAfter" on yhtä kuin "helper.defaultValues.length" muuttujan arvo. Jos funktio toteutuu oletetusti, niin testi menee onnistuneesti läpi. Muussa tapauksessa testi epäonnistuu ja tulee erroria terminaaliin näkyviin!
})

// Käytetään "test(...)" funktiota, joka suorittaa {...} sisällä olevat asiat. Testi myös hyödyntää "async/await" metodia!
test('Checking, if new value gets rejected by the server, because token was missing! :)', async() => { // Tulostetaan kyseinen teksti terminaaliin näkyviin, kun testiä suoritetaan.

  const missingToken = ""

  const newValue = { // Alustetaan muuttuja "newValue", joka saa käyttöönsä alla olevat objektit.
    title: 'New title added via test', // newValue.title on yhtä kuin kyseinen teksti.
    author: 'New author added via test', // newValue.author on yhtä kuin kyseinen teksti.
    url: 'New url added via test', // newValue.url on yhtä kuin kyseinen teksti.
    likes: '300' // newValue.likes on yhtä kuin kyseinen numero.
  }

  await api // Testi pysähtyy "väliaikaisesti" kunnes on suorittanut kaikki neljä (4) olevaa asiaa ja siirtyy eteenpäin koodissa.
    .post('/api/blogs') // POST-pyyntö ohjautuu osoitteeseen => "http://localhost:3001/api/blogs"
    .set('Authorization', `Bearer ${missingToken}`) // Kuten olemme Postmanin kautta erikseen laittaneet => Headers => "Authorization" kohdalle erikseen arvon, joka alkaa tekstillä "bearer", niin testin osalta pitää myös tehdä samoin.
    .send(newValue) // Lähetetään osoitteeseen muuttujan "newValue" arvot.
    .expect(401) // Testi olettaa, että vastauksena saadaan "200 OK":n statuskoodi. Jos saamme muun arvon kuin kyseisen, niin testi epäonnistuu!
    .expect('Content-Type', /application\/json/) // Testi olettaa, että vastauksena "Content-Type" on muodossa => "JSON". Jos tämä ei toteudu, niin testi epäonnistuu!

  // Alustetaan muuttuja "valuesAfter", joka odottaa (await) kunnes => "helper.blogsInDatabase()" on suoritettu ja palauttaa takaisin vastauksen.
  // Ota myös huomioon, että olemme aikaisemmin alustaneet muuttujan "helper", joka hyödyntää "test_helper.js" tiedostoa, mistä löytyy funktio => "blogsInDatabase()".
  const valuesAfter = await helper.blogsInDatabase() // Kun "valuesAfter" muuttuja saa arvon käytettäväksi, niin suoritetaan alla oleva funktio.
  expect(valuesAfter).toHaveLength(helper.defaultValues.length) // Testi olettaa, että muuttujan "valuesAfter" arvon pituus (length) on pysynyt samanlaisena. Jos funktio toteutuu oletetusti, niin testi menee onnistuneesti läpi. Muussa tapauksessa testi epäonnistuu ja tulee erroria terminaaliin näkyviin!
})

afterAll(() => { // Käytetään "afterAll(...)" funktiota, joka suorittaa {...} sisällä olevan asian.
  mongoose.connection.close() // Kun kaikki testit on suoritettu, niin kyseinen funktio katkaisee MongoDB:n tietokantayhteyden.
})
