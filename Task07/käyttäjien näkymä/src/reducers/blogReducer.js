// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import blogsService from '../services/blogs' // Alustetaan muuttuja "blogsService", joka hyödyntää "blogs.js" (erillinen moduuli) tiedostoa eli => "./services/blogs.js".

// Alustetaan muuttuja "blogReducer", joka suorittaa {...} sisällä olevat asiat. Muuttuja saa myös käyttöönsä parametrien => "state" ja "action" arvot.
const blogReducer = (state = [], action) => {

  // Jos alla oleva if-ehto toteutuu, niin sovellus suorittaa {...} sisällä olevat asiat.
  // Kun käyttäjä saapuu sovellukseen, niin kyseiseen funktioon eli "showValuesFromDatabase",
  // joka palauttaa takaisin => "type: SHOW_ALL_VALUES" sekä => "data: values".
  if (action.type === 'SHOW_ALL_VALUES') {
    return action.data
  }

  // Jos alla oleva if-ehto toteutuu, niin sovellus suorittaa {...} sisällä olevat asiat.
  // renderöidään takaisin, siis hetkisen "state" muuttujan taulukko => luomalla kopio
  // siitä, jonka perään tulee käyttäjän lisämää uusi arvo näkyviin sivulle.
  if (action.type === 'ADD_NEW_CONTENT') {
    return [...state, action.data]
  }

  // Jos alla oleva if-ehto toteutuu, niin sovellus suorittaa {...} sisällä olevat asiat.
  if (action.type === 'ADD_NEW_LIKE') {
    const getCurrentID = action.data.id // Alustetaan muuttuja "getCurrentID", joka on yhtä kuin "action.data.id" muuttujan arvo.

    // Alustetaan muuttuja "getMatchingID", joka suorittaa alla olevan funktion. Tarkoituksena
    // on siis etsiä "state" muuttujasta (taulukosta) "id" objektin arvo, joka on yhtä kuin
    // "getCurrentID" muuttujan kanssa. Funktio palauttaa taulukon, jonka sisältä löytyy
    // kolme (3) objektia eli => [content: xxx, id: xxx, votes: xxx].
    const getMatchingID = state.find(results => results.id === getCurrentID)

    // Alustetaan muuttuja "updateValue", joka suorittaa {...} sisällä olevat asiat. Luodaan
    // kopio sen hetkisestä "getMatchingID" muuttujan arvosta ja lisätään objektiin "votes"
    // => sen hetkisen objektin arvo eli => "getMatchingID.votes" sekä lisätään + 1.
    const updateValue = {
      ...getMatchingID,
      likes: getMatchingID.likes + 1
    }

    // Sovellus renderöi alla olevan funktion tuloksen takaisin käyttäjälle, eli luodaan uusi
    // taulukko "map()" funktion avulla. Jos "results.id on epätosi muuttujan "getCurrentID"
    // kanssa (eli sen hetkisen klikatun painikkeen kanssa), niin uuteen taulukkoon tulee
    // alkuperäisen muuttujan arvot. Muussa tapauksessa renderöidään "updateValue" arvot.
    return state.map(results =>
      results.id !== getCurrentID ? results : updateValue)
  }

  // Jos alla oleva if-ehto toteutuu, niin sovellus suorittaa {...} sisällä olevat asiat.
  // Aina kun käyttäjä haluaa poistaa tietyn arvon tietokannasta, niin alla oleva ehto
  // toteutuu, jonka jälkeen suoritetaan {...} sisällä olevat funktiot.
  if (action.type === 'DELETE_BLOG_VALUE') {
    const getCurrentID = action.id // Alustetaan muuttuja "getCurrentID", joka on yhtä kuin muuttujan "action.id" arvo.

    // Sovellus renderöi alla olevan funktion tuloksen takaisin käyttäjälle, eli luodaan uusi
    // taulukko "filter()" funktion avulla. Jos filtteröinnin ehto toteutuu eli "results.id"
    // on epätosi kuin => "getCurrentID" muuttujan kanssa, niin se renderöidään näkyviin
    // takaisin käyttäjälle ja muut "poistetaan" näkyvistä.
    return state.filter(results =>
      results.id !== getCurrentID)
  }

  return state
}

// Viedään muuttujan "showValuesFromDatabase" sisältö käytettäväksi, jotta esim. "index.js"
// tiedosto pystyy hyödyntämään sovelluksen aikana. Aina kun kyseiseen funktioon
// tehdään viittaus, niin sovellus tekee {...} sisällä olevat asiat. Alustetaan myös
// muuttuja "response", joka suorittaa  sen rivillä olevan funktion (await...), jonka
// jälkeen suoritetaan vasta => "dispatch(...)" funktio.
export const showValuesFromDatabase = () => {
  return async dispatch => {
    const response = await blogsService.getAllBlogValues()
    dispatch({
      type: 'SHOW_ALL_VALUES',
      data: response
    })
  }
}

// Viedään muuttujan "createNewValue" sisältö käytettäväksi, jotta esim. "index.js"
// tiedosto pystyy hyödyntämään sovelluksen aikana. Aina kun kyseiseen funktioon
// tehdään viittaus, niin sovellus tekee {...} sisällä olevat asiat. Ota huomioon,
// että kyseisen parametrin sisältä löytyy kolme (3) objektia eli => "title", "author"
// ja "url". Aikaisemmissa tehtävissä käytimme manuaalista id:n arvo generointia,
// mutta koska olemme ottaneet käyttöön backendin, niin se generoi id:n puolestamme.
export const createNewValue = (getValueContent) => {
  return async dispatch => {
    const response = await blogsService.createNewBlogValue(getValueContent)
    dispatch({
      type: 'ADD_NEW_CONTENT',
      data: response
    })
  }
}

// Viedään muuttujan "likeValueButton" sisältö käytettäväksi, jotta esim. "index.js"
// tiedosto pystyy hyödyntämään sovelluksen aikana. Aina kun kyseiseen funktioon
// tehdään viittaus, niin sovellus tekee {...} sisällä olevat asiat.
export const likeValueButton = (getCurrentValue) => {
  return async dispatch => {
    const response = await blogsService.updateBlogValue(getCurrentValue)
    dispatch({
      type: 'ADD_NEW_LIKE',
      data: response
    })
  }
}

// Viedään muuttujan "deleteValueButton" sisältö käytettäväksi, jotta esim. "index.js"
// tiedosto pystyy hyödyntämään sovelluksen aikana. Aina kun kyseiseen funktioon
// tehdään viittaus, niin sovellus tekee {...} sisällä olevat asiat.
export const deleteValueButton = (getCurrentValueID) => {
  return async dispatch => {
    const response = await blogsService.removeBlogValue(getCurrentValueID)
    dispatch({
      type: 'DELETE_BLOG_VALUE',
      data: response,
      id: getCurrentValueID
    })
  }
}


// Viedään muuttujan "blogReducer" avulla tämän tiedoston sisältö käytettäväksi, jotta esim. "index.js" tiedosto pystyy hyödyntämään sovelluksen aikana.
export default blogReducer
