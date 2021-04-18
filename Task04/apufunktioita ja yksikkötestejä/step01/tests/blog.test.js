// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

const testForListHelper = require('../utils/list_helper.js') // Alustetaan muuttuja "testForListHelper", joka hyödyntää "list_helper.js" (erillinen moduuli) tiedostoa eli => "../utils/list_helper.js"

// Funktion "test()" avulla suoritetaan {...} sisällä olevat asiat. Muista, että "list_helper.js" moduulissa parametrin "randomVariable" arvo on yhtä kuin "blogs" muuttujan arvo.
test('Variable called "dummy" returns value of one', () => { // Tulostetaan kyseinen teksti terminaaliin näkyviin, kun testiä suoritetaan.
  const blogs = [] // Alustetaan muuttuja "blogs", joka on yhtä kuin taulukko eli "[]".

  const showResult = testForListHelper.dummy(blogs) // Alustetaan muuttuja "showResult", joka on yhtä kuin kyseinen funktio.
  expect(showResult).toBe(1) // Mikäli "showResult" muuttujan arvo on yhtä kuin yksi (1), niin testi menee onnistuneesti läpi. Muussa tapauksessa testi epäonnistuu ja tulee erroria terminaaliin näkyviin!
})
