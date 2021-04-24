// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

const testForListHelper = require('../utils/list_helper.js') // Alustetaan muuttuja "testForListHelper", joka hyödyntää "list_helper.js" (erillinen moduuli) tiedostoa eli => "../utils/list_helper.js"

const blogValues = [ // Alustetaan muuttuja "blogValues", joka on yhtä kuin taulukon sisällä olevat arvot.
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 2,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 4,
    __v: 0
  }
]

// Muuttuja on luotu "favoriteBlog" (list_helper.js) funktion testaamista varten.
const blogValueFavorite = { // Alustetaan muuttuja "blogValueFavorite", joka on yhtä kuin taulukon sisällä olevat arvot. Tämä on luotu erikseen "toEqual()" funktiota varten, jotta voidaan vertailla tämän sekä "blogValues" taulukon arvoja.
  _id: "5a422aa71b54a676234d17f8",
  title: "Go To Statement Considered Harmful",
  author: "Edsger W. Dijkstra",
  url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
  likes: 7,
  __v: 0
}

// Muuttuja on luotu "mostBlogs" (list_helper.js) funktion testaamista varten.
const mostBlogsAuthor = { // Alustetaan muuttuja "mostBlogsAuthor", joka on yhtä kuin taulukon sisällä olevat arvot. Tämä on luotu erikseen "toEqual()" funktioita varten, jotta voidaan vertailla tämän sekä "blogValues" taulukon arvoja.
  author: "Edsger W. Dijkstra",
  blogs: 2
}

// Muuttuja on luotu "mostLikes" (list_helper.js) funktion testaamista varten.
const mostLikesAuthor = { // Alustetaan muuttuja "mostLikesAuthor", joka on yhtä kuin taulukon sisällä olevat arvot. Tämä on luotu erikseen "toEqual()" funktioita varten, jotta voidaan vertailla tämän sekä "blogValues" taulukon arvoja.
  author: "Edsger W. Dijkstra",
  likes: 11
}

// Funktion "test()" avulla suoritetaan {...} sisällä olevat asiat. Muista, että "list_helper.js" moduulissa parametrin "randomVariable" arvo on yhtä kuin "blogs" muuttujan arvo.
test('Variable called "dummy" returns value of one', () => { // Tulostetaan kyseinen teksti terminaaliin näkyviin, kun testiä suoritetaan.
  const blogs = [] // Alustetaan muuttuja "blogs", joka on yhtä kuin taulukko eli "[]".

  const showResult = testForListHelper.dummy(blogs) // Alustetaan muuttuja "showResult", joka on yhtä kuin kyseinen funktio.
  expect(showResult).toBe(1) // Mikäli "showResult" muuttujan arvo on yhtä kuin yksi (1), niin testi menee onnistuneesti läpi. Muussa tapauksessa testi epäonnistuu ja tulee erroria terminaaliin näkyviin!
})

describe('Show total of likes:', () => { // Luodaan alla olevalle testille oma "describe-lohko", joka tulostaa kyseisen tekstin terminaalin näkyviin, jonka jälkeen suorittaa testin.
  // Funktion "test()" avulla suoritetaan {...} sisällä olevat asiat. Muista, että "list_helper.js" moduulissa parametrin "randomVariable" arvo on yhtä kuin "blogValues" muuttujan arvo.
  test('Variable called "totalLikes" returns value of 13', () => { // Tulostetaan kyseinen teksti terminaaliin näkyviin, kun testiä suoritetaan.

    const showTotal = testForListHelper.totalLikes(blogValues) // Alustetaan muuttuja "showTotal", joka on yhtä kuin kyseinen funktio.
    expect(showTotal).toBe(13) // Mikäli "showTotal" muuttujan arvo on yhtä kuin (13), niin testi menee onnistuneesti läpi. Muussa tapauksessa testi epäonnistuu ja tulee erroria terminaaliin näkyviin!
  })
})

describe('Show favorite blog:', () => { // Luodaan alla olevalle testille ome "describe-lohko", joka tulostaa kyseisen tekstin terminaalin näkyviin, jonka jälkeen suorittaa testin.
  // Funktion "test()" avulla suoritetaan {...} sisällä olevat asiat. Muista, että "list_helper.js" moduulissa parametrin "randomVariable" arvo on yhtä kuin "blogValues" muuttujan arvo.
  test('Variable called "favoriteBlog" returns matching JSON array', () => { // Tulostetaan kyseinen teksti terminaaliin näkyviin, kun testiä suoritetaan.

    const showFavorite = testForListHelper.favoriteBlog(blogValues) // Alustetaan muuttuja "showFavorite", joka on yhtä kuin kyseinen funktio.
    expect(showFavorite).toEqual(blogValueFavorite) // Mikäli "showFavorite" muuttujan arvo on yhtä kuin (eli täsmää) "blogValueFavorite" taulukon kanssa, niin testi menee onnistuneesti läpi. Muussa tapauksessa testi epäonnistuu ja tulee erroria terminaaliin näkyviin!
  })
})

describe('Show most blogs:', () => { // Luodaan alla olevalle testille oma "describe-lohko", joka tulostaa kyseisen tekstin terminaalin näkyviin, jonka jälkeen suorittaa testin.
  // Funktion "test()" avulla suoritetaan {...} sisällä olevat asiat. Muista, että "list_helper.js" moduulissa parametrin "randomVariable" arvo on yhtä kuin "blogValues" muuttujan arvo.
  test('Variable called "mostBlogs" returns matching JSON array', () => { // Tulostetaan kyseinen teksti terminaalin näkyviin, kun testiä suoritetaan.

    const showMostBlogs = testForListHelper.mostBlogs(blogValues) // Alustetaan muuttuja "showMostBlogs", joka on yhtä kuin kyseinen funktio.
    expect(showMostBlogs).toEqual(mostBlogsAuthor) // Mikäli "showMostBlogs" muuttujan arvo on yhtä kuin (eli täsmää) "mostBlogsAuthor" taulukon kanssa, niin testi menee onnistuneesti läpi. Muussa tapauksessa testi epäonnistuu ja tulee erroria terminaaliin näkyviin!
  })
})

describe('Show most likes:', () => { // Luodaan alla olevalle testille oma "describe-lohko", joka tulostaa kyseisen tekstin terminaalin näkyviin, jonka jälkeen suorittaa testin.
  // Funktion "test()" avulla suoritetaan {...} sisällä olevat asiat. Muista, että "list_helper.js" moduulissa parametrin "randomVariable" arvo on yhtä kuin "blogValues" muuttujan arvo.
  test('Variable called "mostLikes" retuns matching JSON array', () => { // Tulostetaan kyseinen teksti terminaalin näkyviin, kun testiä suoritetaan.

    const showMostLikes = testForListHelper.mostLikes(blogValues) // Alustetaan muuttuja "showMostLikes", joka on yhtä kuin kyseinen funktio.
    expect(showMostLikes).toEqual(mostLikesAuthor) // Mikäli "showMostLikes" muuttujan arvo on yhtä kuin (eli täsmää) "mostBlogsAuthor" taulukon kanssa, niin testi menee onnistuneesti läpi. Muussa tapauksessa testi epäonnistuu ja tulee erroria terminaaliin näkyviin!
  })
})
