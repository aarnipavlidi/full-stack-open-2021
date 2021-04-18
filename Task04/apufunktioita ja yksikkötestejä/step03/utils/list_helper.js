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

module.exports = { // Viedään kyseiset muuttujat "dummy", "totalLikes" ja "favoriteBlog" erillisenä moduulina testiä varten.
  dummy,
  totalLikes,
  favoriteBlog
}
