// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

const mongoose = require('mongoose') // Alustetaan muuttuja "mongoose", joka hyödyntää "mongoose" kirjastoa sovelluksessa.
const supertest = require('supertest') // Alustetaan muuttuja "supertest", joka hyödyntää "supertest" kirjastoa sovelluksessa.

const app = require('../app') // Alustetaan muuttuja "app", joka hyödyntää "app.js" (erillinen moduuli) tiedostoa eli => "../app.js".
const api = supertest(app) // Alustetaan muuttuja "api", jonka avulla voidaan suorittaa "supertest" funktion avulla HTTP-pyyntöjä backendiin (muuttujan "app" kautta).

// Käytetään "test(...)" funktiota, joka suorittaa {...} sisällä olevat asiat. Testi myös hyödyntää "async/await" metodia!
test('Checking, if there is only one (1) value only at the database!', async() => { // Tulostetaan kyseinen teksti terminaaliin näkyviin, kun testiä suoritetaan.
  // Alustetaan muuttuja "response", joka hyödyntää "await" funktiota eli muuttuja odottaa kunnes => "api.get('/api/blogs')" on suoritettu ja palauttaa takaisin vastauksen.
  const response = await api.get('/api/blogs') // Kun "response" muuttuja saa arvon käytettäväksi, niin suoritetaan alla oleva funktio.
  expect(response.body).toHaveLength(1) // Mikäli "response.body" muuttujan arvo (length) on yhtä kuin yksi (1), niin testi menee onnistuneesti läpi. Muussa tapauksessa testi epäonnistuu ja tulee erroria terminaaliin näkyviin!
})

afterAll(() => { // Käytetään "afterAll(...)" funktiota, joka suorittaa {...} sisällä olevan asian.
  mongoose.connection.close() // Kun kaikki testit on suoritettu, niin kyseinen funktio katkaisee MongoDB:n tietokantayhteyden.
})
