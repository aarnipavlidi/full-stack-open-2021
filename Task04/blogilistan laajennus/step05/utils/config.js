// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

// As early as posssible in your application, require and configure dotenv. More information about it @ https://www.npmjs.com/package/dotenv
require("dotenv").config() // Alustetaan "dotenv" kirjaston hyödyntämistä tässä sovelluksessa. Tämän avulla haetaan kaikki muuttujien arvot ".env" tiedostosta ja palautetaan takaisin sovelluksen käytettäväksi.

const PORT = process.env.PORT // Alustetaan muuttuja "PORT", joka on yhtä kuin "process.env.PORT". Sovellus hakee arvon erikseen ".env" tiedostosta.

// Alustetaan muuttuja "MONGODB_URI", joka käyttää "Conditional (ternary) operator" nimistä funktiota. Lisää funktion käytöstä löytyy @ https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
// Käytännössä se tarkoittaa sitä, että jos käytämme terminaalissa esim. komentoa => "npm run test", niin ehto toteutuu ja muuttuja saa arvon => "process.env.TEST_MONGODB_URI"
// ja muussa tapauksessa, kun käytämme erilaista komentoa terminaalissa, niin ehto ei toteudu, joten muuttuja saa arvon => "process.env.MONGODB_URI".
// Ota myös huomioon, että olemme erikseen luoneet ".env" tiedostoon uuden muuttujan eli sieltä löytyy nyt => "MONGODB_URI" sekä "TEST_MONGODB_URI" ja molemmat käyttävät eri tietokantaa.
const MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

module.exports = { // Viedään kyseiset muuttujat "MONGODB_URI" ja "PORT" sovelluksen käytettäväksi erillisenä moduulina.
  MONGODB_URI,
  PORT
}
