// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

// Alustetaan muuttuja "filterReducer", joka suorittaa {...} sisällä olevat asiat. Muuttuja saa myös käyttöönsä parametrien => "state" ja "action" arvot.
const filterReducer = (state = '', action) => {

  // Jos alla oleva if-ehto toteutuu, niin sovellus suorittaa {...} sisällä olevat asiat,
  // eli aina kun käyttäjä kirjoittaa jotain filterin input:in arvoon, niin alla oleva
  // ehto toteutuu, joten funktio palauttaa takaisin => "action.filterValue". Tämä
  // tarkoittaa sitä, että "action.fiterValue" on yhtä kuin "filter" objekti (store).
  if (action.type === 'FILTER_INPUT_VALUE') {
    return action.filterValue
  }

  return state
}

// Viedään muuttujan "changeFilterValue" sisältö käytettäväksi, jotta esim. "index.js"
// tiedosto pystyy hyödyntämään sovelluksen aikana. Aina kun kyseiseen funktioon
// tehdään viittaus, niin sovellus tekee {...} sisällä olevat asiat. Funktio saa
// myös käyttöönsä parametrin "getCurrentFilterValue" value eli aina kun käyttäjä
// kirjoittaa jotain filtterin input:in arvoon, niin sen hetkinen arvo tallentuu
// tämän parametrin alle, jonka jälkeen se tallentuu storessa sijaitsevaan
// ("store.js" tiedostossa) => "filter" objektin alle.
export const changeFilterValue = (getCurrentFilterValue) => {
  return {
    type: 'FILTER_INPUT_VALUE',
    filterValue: getCurrentFilterValue
  }
}

// Viedään muuttujan "reducer" avulla tämän tiedoston sisältö käytettäväksi, jotta esim. "index.js" tiedosto pystyy hyödyntämään sovelluksen aikana.
export default filterReducer
