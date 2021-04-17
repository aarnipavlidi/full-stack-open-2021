// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

// As early as posssible in your application, require and configure dotenv. More information about it @ https://www.npmjs.com/package/dotenv
require("dotenv").config() // Alustetaan "dotenv" kirjaston hyödyntämistä tässä sovelluksessa. Tämän avulla haetaan kaikki muuttujien arvot ".env" tiedostosta ja palautetaan takaisin sovelluksen käytettäväksi.

let PORT = process.env.PORT // Alustetaan muuttuja "PORT", joka on yhtä kuin "process.env.PORT". Sovellus hakee arvon erikseen ".env" tiedostosta.
let MONGODB_URI = process.env.MONGODB_URI // Alustetaan muuttuja "MONGODB_URI", joka on yhtä kuin "process.env.MONGODB_URI". Sovellus hakee arvon erikseen ".env" tiedostosta.

module.exports = { // Viedään kyseiset muuttujat "MONGODB_URI" ja "PORT" sovelluksen käytettäväksi erillisenä moduulina.
  MONGODB_URI,
  PORT
}
