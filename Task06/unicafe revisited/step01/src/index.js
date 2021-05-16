// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react'; // Sovellus ottaa "react" nimisen kirjaston käyttöönsä.
import ReactDOM from 'react-dom' // Sovellus ottaa "react-dom" nimisen kirjaston käyttöönsä.
import { createStore } from 'redux' // Sovellus ottaa "createStore" funktion käyttöönsä => "redux" kirjaston kautta.
import reducer from './reducer' // Alustetaan muuttuja "reducer", joka hyödyntää "reducer.js" tiedoston sisältöä sovelluksen aikana.

// Alustetaan muuttuja "store", joka hyödyntää => "createStore()" funktiota.
const store = createStore(reducer) // Funktio käyttää parametrinä "reducer" muuttujan arvoa, lisää funktiosta löytyy täältä: https://redux.js.org/api/createstore

const App = () => { // Sovellus alkaa tästä...

  const buttonGood = () => { // Alustetaan muuttuja "buttonGood", joka suorittaa {...} olevat asiat kun muuttujaan tehdään viittaus.
    // Kun funktioon tehdään viittaus, niin alla olevan "dispatch(...)" funktion avulla suoritetaan => "reducer.js" tiedostossa oleva if-ehto.
    store.dispatch({
      type: 'GOOD',
    })
  }

  // Sovellus renderöi (...) sisällä olevat asiat käyttäjälle näkyviin.
  return (
    <div>
      <button onClick={buttonGood}>good</button>
      <button>neutral</button>
      <button>bad</button>
      <button>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>neutral</div>
      <div>bad</div>
    </div>
  )
} // Sovellus loppuu tähän...

const renderApp = () => { // Alustetaan muuttuja "renderApp", jonka avulla renderöidään sovelluksen sisältö => "index.html" tiedostoon => elementin sisälle, jonka id:n arvo on "root".
  ReactDOM.render(<App />, document.getElementById('root'))
}

// Alla olevan "subscribe(...)" funktion avulla sovellus "kuuntelee", jos tapahtuu muutoksia sovelluksen
// aikana. Mikäli tapahtuu, niin ne muutokset renderöidään takaisin käyttäjälle näkyviin.
renderApp()
store.subscribe(renderApp)
