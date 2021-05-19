// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react'; // Komponentti ottaa "react" nimisen kirjaston käyttöönsä.
import { useDispatch } from 'react-redux' // Komponentti ottaa "useDispatch" funktion käyttöönsä => "react-redux" kirjaston kautta.

import { changeFilterValue } from '../reducers/filterReducer' // Komponentti ottaa "changeFilterValue" funktion käyttöönsä, joka sijaitsee => "filterReducer.js" tiedostossa.

const Filter = () => { // Alustetaan "Filter" niminen komponentti, joka suorittaa {...} sisällä olevat asiat.
  // Alustetaan muuttuja "dispatch", joka suorittaa "useDispatch()" funktion. Tämän avulla sovellus
  // pystyy tekemään muutoksia "storeen" tallennettuihin  taulukon arvoihin. Lisää tästä täältä: https://react-redux.js.org/api/hooks#usedispatch
  const dispatch = useDispatch()

  const handleFilterInput = (event) => { // Alustetaan muuttuja "handleFilterInput", joka suorittaa {...} sisällä olevat asiat aina kun kyseiseen funktioon tehdään viittaus.
    // Muuttuja "event.target.value", tarkoittaa siis sitä, että kaikki
    // minkä käyttäjä kirjoittaa input:iin, niin sen hetkinen arvo
    // tallentuu kyseisen muuttujan alle eli "getCurrentFilterValue".
    const getCurrentFilterValue = event.target.value // Alustetaan muuttuja "getCurrentFilterValue", joka on yhtä kuin "event.target.value"
    dispatch(changeFilterValue(getCurrentFilterValue)) // Sovellus suorittaa funktion "changeFilterValue(...)", joka saa parametrin "getCurrentFilterValue" muuttujan arvon.
  }

  const style = { // Alustetaan muuttuja "style", joka saa käyttöönsä {...} sisällä olevien objektien arvot.
    marginBottom: 10
  }

  // Komponentti renderöi käyttäjälle näkyviin (...) sisällä olevat asiat.
  return (
    <div style={style}>
      <div>Filter: <input onChange={handleFilterInput} /></div>
    </div>
  )
}

// Viedään (export) alla oleva komponentti (Filter) sovelluksen käytettäväksi, jotta esim. "App.js" tiedosto pystyy suorittamaan kyseiset funktiot.
export default Filter
