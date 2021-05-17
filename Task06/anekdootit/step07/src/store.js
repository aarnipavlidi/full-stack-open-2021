// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import { createStore } from 'redux' // Sovellus ottaa "createStore" funktion käyttöönsä => "redux" kirjaston kautta.
import { composeWithDevTools } from 'redux-devtools-extension' // Sovellus ottaa "composeWithDevTools" funktion käyttöönsä => "redux-devtools-extension" kirjaston kautta.
import reducer from './reducers/anecdoteReducer' // Alustetaan muuttuja "reducer", joka hyödyntää "anecdoteReducer.js" tiedoston sisältöä sovelluksen aikana.

// Alustetaan muuttuja "store", joka hyödyntää => "createStore()" funktiota. Funktio käyttää
// parametrinä "reducer" muuttujan arvoa, lisää funktiosta löytyy täältä: https://redux.js.org/api/createstore
// Muuttuja ottaa myös käyttöönsä "composeWithDevTools()" funktion, jonka avulla voidaan
// seurata sovelluksen "store" tilaa ja sen muuttavia actioneja Chromen konsolin kautta.
const store = createStore(reducer, composeWithDevTools())

// Viedään (export) alla oleva muuttuja (store) sovelluksen käytettäväksi, jotta esim. "App.js" tiedosto pystyy suorittamaan kyseiset funktiot.
export default store
