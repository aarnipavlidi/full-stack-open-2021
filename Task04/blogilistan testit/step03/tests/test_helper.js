// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

const Blog = require('../models/blogModel') // Alustetaan muuttuja "Blog", joka hyödyntää "blogModel.js" (erillinen moduuli) tiedostoa eli => "../models/blogModel.js".

// Alustetaan muuttuja "defaultValues", joka saa taulukon sisälle kaksi (2) erilaista arvoa.
// Kun testiä suoritetaan (blog_api.test.js), niin tähän muuttujaan viitataan ja sen arvoja käytetään testin suorittamiseen.
// Tämän avulla voidaan varmistaa se, että aina kun suoritetaan uusi testi, niin "lähtökohta" on samanlainen.
const defaultValues = [
  {
    title: 'blogilistan testit | step 3', // "defaultValues[0].title"
    author: 'Aarni Pavlidi', // "defaultValues[0].author"
    url: 'aarnipavlidi.fi', // "defaultValues[0].url"
    likes: '3' // "defaultValues[0].likes"
  },
  {
    title: 'blogilistan testit | step 3', // "defaultValues[1].title"
    author: 'Pavlidi Aarni', // "defaultValues[1].author"
    url: 'pavlidiaarni.fi', // "defaultValues[1].url"
    likes: '30' // "defaultValues[1].likes"
  }
]

// Alustetaan muuttuja "blogsInDatabase", joka suorittaa {...} sisällä olevat asiat.
// Kun testiä suoritetaan (blog_api.test.js) ja testin aikana yritetään lisätä uutta arvoa tietokantaan,
// niin testi hakee tämän funktion eli => "blogsInDatabase" ja suorittaa kaikki alla olevat asiat.
const blogsInDatabase = async () => { // Muuttuja hyödyntää myös "async/await" metodia!
  // Alustetaan muuttuja "getCurrentValues", joka odottaa (await) kunnes => "Blog.find({})" on suoritettu ja palauttaa takaisin vastauksen.
  const getCurrentValues = await Blog.find({}) // Kun "getCurrentValues" muuttuja saa arvon käytettäväksi, niin suoritetaan alla oleva funktio.
  return getCurrentValues.map(result => result.toJSON()) // Palauttaa takaisin "getCurrentValues" muuttujan avulla kaikki arvot näkyviin JSON-objektina.
}

module.exports = { // Viedään kyseiset muuttujat "defaultValues" ja "blogsInDatabase" sovelluksen käytettäväksi erillisenä moduulina.
  defaultValues, blogsInDatabase
}
