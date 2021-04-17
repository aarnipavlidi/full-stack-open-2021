// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

// Alustetaan muuttuja "showInfo", joka saa käyttöönsä "...params" parametrin.
const showInfo = (...params) => { // Tämä tarkoittaa sitä, että aina kun kyseiseen muuttujaan "showInfo" viitataan, niin suoritetaan {...} sisällä oleva asia.
  console.log(...params) // Tulostaa kyseisen "...params" muuttujan arvon terminaaliin näkyviin.
}

// Alustetaan muuttuja "showError", joka saa käyttöönstä "...params" parametrin.
const showError = (...params) => { // Tämä tarkoittaa sitä, että aina kun kyseiseen muuttujaan "showError" viitataan, niin suoritetaan {...} sisällä oleva asia.
  console.error(...params) // Tulostaa kyseisen "...params" muuttujan arvon terminaaliin näkyviin.
}

module.exports = { // Viedään kyseiset muuttujat "showInfo" ja "showError" sovelluksen käytettäväksi erillisenä moduulina.
  showInfo, showError
}
