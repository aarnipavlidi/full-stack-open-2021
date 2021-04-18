// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

const testForListHelper = require('../utils/list_helper.js') // Alustetaan muuttuja "testForListHelper", joka hyödyntää "list_helper.js" (erillinen moduuli) tiedostoa eli => "../utils/list_helper.js"

// Funktion "test()" avulla suoritetaan {...} sisällä olevat asiat. Muista, että "list_helper.js" moduulissa parametrin "randomVariable" arvo on yhtä kuin "blogs" muuttujan arvo.
test('Variable called "dummy" returns value of one', () => { // Tulostetaan kyseinen teksti terminaaliin näkyviin, kun testiä suoritetaan.
  const blogs = [] // Alustetaan muuttuja "blogs", joka on yhtä kuin taulukko eli "[]".

  const showResult = testForListHelper.dummy(blogs) // Alustetaan muuttuja "showResult", joka on yhtä kuin kyseinen funktio.
  expect(showResult).toBe(1) // Mikäli "showResult" muuttujan arvo on yhtä kuin yksi (1), niin testi menee onnistuneesti läpi. Muussa tapauksessa testi epäonnistuu ja tulee erroria terminaaliin näkyviin!
})

describe('Calculate total of likes:', () => { // Luodaan alla olevalle testille oma "describe-lohko", joka tulostaa kyseisen tekstin terminaalin näkyviin, jonka jälkeen suorittaa testin.
  const blogValues = [ // Alustetaan muuttuja "blogValues", joka on yhtä kuin taulukon sisällä olevat arvot.
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 2,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 2,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 1,
      __v: 0
    }
  ]

  // Funktion "test()" avulla suoritetaan {...} sisällä olevat asiat. Muista, että "list_helper.js" moduulissa parametrin "randomVariable" arvo on yhtä kuin "blogValues" muuttujan arvo.
  test('Show total of likes from the Blog:', () => { // Tulostetaan kyseinen teksti terminaaliin näkyviin, kun testiä suoritetaan.

    const showTotal = testForListHelper.totalLikes(blogValues) // Alustetaan muuttuja "showTotal", joka on yhtä kuin kyseinen funktio.
    expect(showTotal).toBe(5) // Mikäli "showTotal" muuttujan arvo on yhtä kuin viisi (5), niin testi menee onnistuneesti läpi. Muussa tapauksessa testi epäonnistuu ja tulee erroria terminaaliin näkyviin!
  })
})
