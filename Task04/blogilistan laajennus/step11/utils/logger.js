// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

// Alustetaan muuttuja "showInfo", joka saa käyttöönsä "...params" parametrin.
const showInfo = (...params) => { // Tämä tarkoittaa sitä, että aina kun kyseiseen muuttujaan "showInfo" viitataan, niin suoritetaan {...} sisällä oleva asia.
  // Terminaaliin tulostuu vain ainoastaan, jos alla oleva if-ehto toteutuu eli "process.env.NODE_ENV" muuttuja on epätosi kuin "test" arvo.
  if (process.env.NODE_ENV !== 'test') { // Jos käytämme terminaalissa esim. komentoa => "npm run test", niin alla olevaa funktiota ei suoriteta!
    console.log(...params) // Tulostaa kyseisen "...params" muuttujan arvon terminaaliin näkyviin.
  }
}

// Alustetaan muuttuja "showError", joka saa käyttöönstä "...params" parametrin.
const showError = (...params) => { // Tämä tarkoittaa sitä, että aina kun kyseiseen muuttujaan "showError" viitataan, niin suoritetaan {...} sisällä oleva asia.
  // Terminaaliin tulostuu vain ainoastaan, jos alla oleva if-ehto toteutuu eli "process.env.NODE_ENV" muuttuja on epätosi kuin "test" arvo.
  if (process.env.NODE_ENV !== 'test') { // Jos käytämme terminaalissa esim. komentoa => "npm run test", niin alla olevaa funktiota ei suoriteta!
    console.error(...params) // Tulostaa kyseisen "...params" muuttujan arvon terminaaliin näkyviin.
  }
}

module.exports = { // Viedään kyseiset muuttujat "showInfo" ja "showError" sovelluksen käytettäväksi erillisenä moduulina.
  showInfo, showError
}
