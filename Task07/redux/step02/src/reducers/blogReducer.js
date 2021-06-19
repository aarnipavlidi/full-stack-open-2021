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

// Viedään muuttujan "blogReducer" avulla tämän tiedoston sisältö käytettäväksi, jotta esim. "index.js" tiedosto pystyy hyödyntämään sovelluksen aikana.
export default blogReducer
