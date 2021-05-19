// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import { createStore, combineReducers, applyMiddleware } from 'redux' // Sovellus ottaa "createStore", "combineReducers" ja "applyMiddleware" funktiot käyttöönsä => "redux" kirjaston kautta.
import thunk from 'redux-thunk' // Alustetaan muuttuja "thunk", joka hyödyntää "redux-thunk" kirjaston sisältöä sovelluksen aikana.
import { composeWithDevTools } from 'redux-devtools-extension' // Sovellus ottaa "composeWithDevTools" funktion käyttöönsä => "redux-devtools-extension" kirjaston kautta.

import anecdoteReducer from './reducers/anecdoteReducer' // Alustetaan muuttuja "anecdoteReducer", joka hyödyntää "anecdoteReducer.js" tiedoston sisältöä sovelluksen aikana.
import notificationReducer from './reducers/notificationReducer' // Alustetaan muuttuja "notificationReducer", joka hyödyntää "notificationReducer.js" tiedoston sisältöä sovelluksen aikana.
import filterReducer from './reducers/filterReducer' // Alustetaan muuttuja "filterReducer", joka hyödyntää "filterReducer.js" tiedoston sisältöä sovelluksen aikana.

// Alustetaan muuttuja "reducer", joka hyödyntää "combineReducers(...)" funktiota,
// kyseisen funktion avulla voidaan yhdistää kolme (3) nykyistä reduceria eli tässä
// tapauksessa yhdistämme "anecdoteReducer", "notificationReducer" sekä "filterReducer"
// arvot yhteen. Kun sovellus renderöidään, niin konsoliin (redux-devtools) ilmestyy
// myös kolme (3) objektia eli => "values", "message" ja "filter".
const reducer = combineReducers({
  values: anecdoteReducer,
  message: notificationReducer,
  filter: filterReducer
})

// Alustetaan muuttuja "store", joka hyödyntää => "createStore()" funktiota. Funktio käyttää
// parametrinä "reducer" muuttujan arvoa, lisää funktiosta löytyy täältä: https://redux.js.org/api/createstore
// Muuttuja ottaa myös käyttöönsä "composeWithDevTools()" funktion, jonka avulla voidaan
// seurata sovelluksen "store" tilaa ja sen muuttavia actioneja Chromen konsolin kautta.
// Olemme muokanneet koodia tehtävää => "6.15 anekdootit ja backend, step3" varten ja lisänneet
// funktion => "applyMiddleware(...)", jonka sisältä löytyy parametrin "thunk" arvo. Funktion
// tarkoituksena on toimia niin, että sovellus pystyy luomaan asynkronisia action creatoreja.
// Ensin siis odotetaan x asian valmistumista (await), jonka jälkeen suoritetaan "dispatch()" funktio.
const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

// Viedään (export) alla oleva muuttuja (store) sovelluksen käytettäväksi, jotta esim. "App.js" tiedosto pystyy suorittamaan kyseiset funktiot.
export default store
