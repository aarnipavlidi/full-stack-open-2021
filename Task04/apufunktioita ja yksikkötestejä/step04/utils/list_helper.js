// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

const dummy = (randomVariable) => { // Alustetaan muuttuja "dummy", kyseinen funktio ottaa myös käyttöönsä parametrin "randomVariable" arvon. Muuttujan arvon voi vaihtaa mihin tahansa halutessaan!
  const wrongLength = "Blogs length is more than zero :(" // Alustetaan muuttuja "wrongLength", joka saa arvoksi kyseisen tekstin.

  // Miten alla oleva funktio käytännössä toimii, niin olemme toisessa tiedostossa eli "blog.test.js" alustaneet muuttujan => "const blogs = []",
  // niin tämä tarkoittaa sitä, kun testi suoritetaan terminaalin kautta niin "randomVariable" muuttuja vaihtuu "blogs" muuttujan arvoon.
  return randomVariable.length === 0 // Jos randomVariable (blogs) muuttujan arvon pituus on yhtä kuin nolla (0), niin palautetaan arvo yksi (1). Muussa tapauksessa palautetaan muuttujan "wrongLength" arvo takaisin.
    ? 1 // Jos yllä oleva ehto toteutuu, niin palautetaan kyseinen arvo takaisin.
    : wrongLength // Jos yllä oleva ehto ei toteudu, niin palautetaan kyseisen muuttujan arvo takaisin.
}

const totalLikes = (randomVariable) => { // Alustetaan muuttuja "totalLikes", kyseinen funktio ottaa myös käyttöönsä parametrin "randomVariable" arvon. Muuttujan arvon voi vaihtaa mihin tahansa halutessaan!

  // Miten alla oleva funktio käytännössä toimii, niin olemme toisessa tiedostossa eli "blog.test.js" alustaneet muuttujan => "const blogValues = [...]",
  // niin tämä tarkoittaa sitä, kun testi suoritetaan terminaalin kautta niin "randomVariable" muuttuja vaihtuu "blogValues" muuttujan arvoon.
  // Testi suorittaa alla olevan funktion eli haetaan taulukosta "blogValues" kaikki arvot "likes" objektista, jonka jälkeen suoritetaan "reduce()" funktio.
  // "acc" (Accumulator) on funktiosta aiemmin palautettu kertynyt arvo tai alkuperäinen arvo sekä "curVal" (Current Value) näyttää elementin sen hetkisen arvon.
  return randomVariable.map(a => a.likes).reduce((acc, curVal) => acc + curVal) // Lisää funktion käytöstä löytyy @ https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
}

const favoriteBlog = (randomVariable) => { // Alustetaan muuttuja "favoriteBlog", kyseinen funktio ottaa myös käyttöönsä parametrin "randomVariable" arvon. Muuttujan arvon voi vaihtaa mihin tahansa halutessaan!

  // Muuttuja "getLikes" saa taulukon => [2, 7, 4] arvot käyttöönsä.
  const getLikes = randomVariable.map(a => a.likes) // Alustetaan muuttuja "getLikes", joka hyödyntää "map()" funktiota. Sen avulla haetaan "blogValues" taulukosta kaikki "likes" objektien arvot ja luodaan uusi taulukko "getLikes" muuttujan alle.
  // Muuttuja "getIndex" saa arvon [1] käyttöönsä.
  const getIndex = getLikes.indexOf(Math.max(...getLikes)) // Alustetaan muuttuja "getIndex", joka hakee muuttujasta "getLikes" korkeimman arvon ja palauttaa sen hetkisen index:in arvon takaisin.

  return randomVariable[getIndex] // Palautetaan kyseisen muuttujan "randomVariable[getIndex]" arvo, kun testiä suoritetaan.
}

const mostBlogs = (randomVariable) => { // Alustetaan muuttuja "mostBlogs", kyseinen funktio ottaa myös käyttöönsä parametrin "randomVariable" arvon. Muuttujan arvon voi vaihtaa mihin tahansa halutessaan!

  // Muuttuja "getAuthors" saa taulukon => ['Michael Chan', 'Edsger W. Dijkstra', 'Edsger W. Dijkstra'] arvot käyttöönsä.
  const getAuthors = randomVariable.map(a => a.author) // Alustetaan muuttuja "getAuthors", joka hyödyntää "map()" funktiota. Sen avulla haetaan "blogValues" taulukosta kaikki "author" objektien arvot ja luodaan uusi taulukko "getAuthors" muuttujan alle.

  let itemsMap = {} // Alustetaan muuttuja "itemsMap", joka toimii uutena tyhjänä taulukkona. Tämän muuttujan alle kerätään uudet arvot, jonne ilmestyy x henkilön nimi ja kuinka monta kertaa kyseinen henkilö löytyy "getAuthors" taulukosta.
  let authorValue = 0 // Alustetaan muuttuja "authorValue", joka saa väliaikaisesti arvon nolla (0).
  let authorCount = 0 // Alustetaan muuttuja "authorCount", joka saa väliaikaisesti arvon nolla (0).

  for (let author of getAuthors) { // Käytetään "for" funktiota, joka suorittaa yhteensä kolme (3) kierrosta, koska muuttujassa "getAuthors" on myös kolme (3) elementtiä.
    if (itemsMap[author] == null) { // Jos if-ehto toteutuu eli "itemsMap[author]" on yhtä kuin "null", niin suoritetaan {...} sisällä oleva asia.
      itemsMap[author] = 1 // Muuttuja "itemsMap[author]" saa arvoksi yksi (1).
    } else { // Jos if-ehto ei toteudu eli "itemsMap[author]" on muuta kuin "null", niin suoritetaan {...} sisällä oleva asia.
      itemsMap[author]++ // Muuttuja "itemsMap[author]" saa arvoksi sen nykyisen arvon + 1.
    }

    // Muuttuja "itemsMap[author]" kertoo meille sen, että kuinka monta kertaa x arvo ilmestyy taulukon sisällä.
    // Jos käytetään => console.log(itemsMap[author]), niin ensimmäinen kierros näyttää tältä => "1"

    // Muuttuja "itemsMap" näyttää meille sen kyseisen henkilön nimen, jonka perään tulee vielä luku, että kuinka monta kertaa se on ilmestynyt taulukon sisällä.
    // Jos käytetään => console.log(itemsMap), niin ensimmäinen kierros näyttää tältä => { 'Michael Chan': 1 }

    // Jos if-ehto toteutuu eli muuttuja => "itemsMap[author]" on suurempi kuin "authorCount" muuttujan arvo, niin suoritetaan {...} sisällä olevat asiat.
    if (itemsMap[author] > authorCount) {
      // Ensimmäisessä kierroksessa (for loop funktio), muuttujat saavat seuraavat arvot:
      // "itemsMap" on yhtä kuin { 'Michael Chan': 1 }
      // "itemsMap[author]" on yhtä kuin "1"
      // "authorCount" on yhtä kuin "0"
      authorValue = author // Muuttuja "authorValue" saa sen hetkisen "author" muuttujan arvon.
      authorCount = itemsMap[author] // Muuttuja "authorCount" saa sen hetkisen "itemsMap[author]" muuttujan arvon.
    }
  }

  const newValue = { // Alustetaan muuttuja "newValue", joka saa "author" ja "blogs" objektit käyttöönsä.
    author: authorValue, // eli "newValue.author" on yhtä kuin "authorValue".
    blogs: authorCount // eli "newValue.blogs" on yhtä kuin "authorCount".
  }

  return newValue // Palautetaan kyseisen muuttujan "newValue" arvo, kun testiä suoritetaan.
}

module.exports = { // Viedään kyseiset muuttujat "dummy", "totalLikes", "favoriteBlog" ja "mostBlogs" erillisenä moduulina testiä varten.
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}
