// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React, { useState } from 'react' // Sovellus ottaa käyttöön "react" kirjaston sekä mahdollistetaan "useState" funktion käyttö sovelluksessa.
import Country from './components/Country' // Sovellus hyödyntää "Counry" (Country.js) nimistä komponenttia, joka sijaitsee => "./components/Country".
import { useField, useCountry } from './hooks' // Sovellus hyödyntää "useField(...)" ja "useCountry(...)" funktioita, joka sijaitsee => "./hooks" tiedostossa.

const App = () => { // Sovellus alkaa tästä...
  const customHookInput = useField('text') // Alustetaan muuttuja "customHookInput" omaan tilaan, joka hyödyntää => "useField(...)" funktiota.

  const [countryNameValue, setCountryNameValue] = useState('') // Alustetaan muuttuja "countryNameValue" tilaa, joka saa oletuksena arvon => ''.
  const customHookCountry = useCountry(countryNameValue) // Alustetaan muuttuja "customHookCountry" omaan tilaan, joka hyödyntää => "useCountry(...)" funktiota.

  const submitInputValue = (event) => { // Alustetaan muuttuja "submitInputValue", joka suorittaa {...} sisällä olevat asiat, aina kun kyseiseen funktioon tehdään viittaus.
    // Aina kun käyttäjä kirjoittaa jotain input:in kenttään ja klikkaa "find" painiketta,
    // niin sovellus tallentaa sen hetkisen arvon "countryNameValue" muuttujan alle eli
    // => "customHookInput.value" on yhtä kuin => "countryNameValue".
    event.preventDefault() // The event.preventDefault() method stops the default action of an element from happening.
    setCountryNameValue(customHookInput.value) // Muutetaan "countryNameValue" muuttujan tilaa kyseiseen => "customHookInput.value" muuttujan arvoon.
  }

  // Sovellus renderöi (...) sisällä olevat asiat takaisin käyttäjälle.
  return (
    <div>
      <form onSubmit={submitInputValue}>
        <input type={customHookInput.type} value={customHookInput.value} onChange={customHookInput.onChange} />
        <button>find</button>
      </form>
      <Country getCurrentCountry={customHookCountry} />
    </div>
  )
} // Sovellus loppuu tähän...

// Viedään (export) alla oleva komponentti (App) sovelluksen käytettäväksi, jotta esim. "index.js" tiedosto pystyy suorittamaan kyseiset funktiot.
export default App
