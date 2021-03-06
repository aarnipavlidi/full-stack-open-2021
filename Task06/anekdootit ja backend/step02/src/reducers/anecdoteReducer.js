// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

// Alustetaan muuttuja "reducer", joka suorittaa {...} sisällä olevat asiat. Muuttuja saa myös käyttöönsä parametrien => "state" ja "action" arvot.
const reducer = (state = [], action) => {
  // Kun käyttäjä painaa jotain painiketta, niin alla oleva teksti tulostuu
  // konsoliin näkyviin, jonka perään tulee vielä muuttujan objektin arvo.
  console.log('User has given new like to the following id:', action.data)

  // Jos alla oleva if-ehto toteutuu, niin sovellus suorittaa {...} sisällä olevat asiat.
  // Kun käyttäjä saapuu sovellukseen, niin kyseiseen funktioon eli "showValuesFromDatabase",
  // joka palauttaa takaisin => "type: SHOW_ALL_VALUES" sekä => "data: values".
  if (action.type === 'SHOW_ALL_VALUES') {
    return action.data
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
      votes: getMatchingID.votes + 1
    }

    // Sovellus renderöi alla olevan funktion tuloksen takaisin käyttäjälle, eli luodaan uusi
    // taulukko "map()" funktion avulla. Jos "results.id on epätosi muuttujan "getCurrentID"
    // kanssa (eli sen hetkisen klikatun painikkeen kanssa), niin uuteen taulukkoon tulee
    // alkuperäisen muuttujan arvot. Muussa tapauksessa renderöidään "updateValue" arvot.
    return state.map(results =>
      results.id !== getCurrentID ? results : updateValue)
  }

  // Jos alla oleva if-ehto toteutuu, niin sovellus suorittaa {...} sisällä olevat asiat.
  // renderöidään takaisin, siis hetkisen "state" muuttujan taulukko => luomalla kopio
  // siitä, jonka perään tulee käyttäjän lisämää uusi arvo näkyviin sivulle.
  if (action.type === 'ADD_NEW_CONTENT') {
    return [...state, action.response]
  }

  return state
}

// Viedään muuttujan "showValuesFromDatabase" sisältö käytettäväksi, jotta esim. "index.js"
// tiedosto pystyy hyödyntämään sovelluksen aikana. Aina kun kyseiseen funktioon
// tehdään viittaus, niin sovellus tekee {...} sisällä olevat asiat.
export const showValuesFromDatabase = (values) => {
  return {
    type: 'SHOW_ALL_VALUES',
    data: values
  }
}

// Viedään muuttujan "likeValueButton" sisältö käytettäväksi, jotta esim. "index.js"
// tiedosto pystyy hyödyntämään sovelluksen aikana. Aina kun kyseiseen funktioon
// tehdään viittaus, niin sovellus tekee {...} sisällä olevat asiat.
export const likeValueButton = (id) => {
  return {
    type: 'ADD_NEW_LIKE',
    data: { id }
  }
}

// Viedään muuttujan "createNewValue" sisältö käytettäväksi, jotta esim. "index.js"
// tiedosto pystyy hyödyntämään sovelluksen aikana. Aina kun kyseiseen funktioon
// tehdään viittaus, niin sovellus tekee {...} sisällä olevat asiat. Ota huomioon,
// että kyseisen parametrin sisältä löytyy kaksi (2) objektia eli => "content" ja
// "votes". Aikaisemmissa tehtävissä käytimme manuaalista id:n arvo generointia,
// mutta koska olemme ottaneet käyttöön backendin, niin se generoi id:n puolestamme.
export const createNewValue = (fetchValueFromDatabase) => {
  return {
    type: 'ADD_NEW_CONTENT',
    response: fetchValueFromDatabase
  }
}

// Viedään muuttujan "reducer" avulla tämän tiedoston sisältö käytettäväksi, jotta esim. "index.js" tiedosto pystyy hyödyntämään sovelluksen aikana.
export default reducer
