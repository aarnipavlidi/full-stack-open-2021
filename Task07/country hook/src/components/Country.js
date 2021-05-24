// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react' // Sovellus ottaa "react" nimisen kirjaston käyttöönsä.

// Alustetaan komponentti "Country", joka suorittaa {...} sisällä olevat asiat,
// aina kun kyseiseen komponenttiin tehdään viittaus. Komponentti myös hyödyntää
// parametrinä => "getCurrentCountry" muuttujan arvoa sovelluksen aikana.
const Country = ({ getCurrentCountry }) => {

  // Jos alla oleva if-ehto toteutuu eli "getCurrentCountry" on tyhjä, niin komponentti renderöi {...} sisällä olevan asian.
  if (!getCurrentCountry) {
    return null
  }

  // Jos alla oleva if-ehto toteutuu eli "getCurrentCountry" on yhtä kuin => "Request failed with status code 404", niin komponentti renderöi {...} sisällä olevat asiat.
  if (getCurrentCountry === 'Request failed with status code 404') {
    return (
      <div>
        <p>Couldn't find following country, please try again! :)</p>
      </div>
    )
  }

  // Muussa tapauksessa komponentti renderöi (...) sisällä olevat asiat takaisin käyttäjälle näkyviin.
  return (
    <div>
      <h3>{getCurrentCountry.name}</h3>
      <div>
        <p>Capital: {getCurrentCountry.capital}</p>
        <p>Population is currently: {getCurrentCountry.population}</p>
        <img src={getCurrentCountry.flag} height='100' alt={`flag of ${getCurrentCountry.name}`}/>
      </div>
    </div>
  )
}

// Viedään (export) alla oleva komponentti (Country) sovelluksen käytettäväksi, jotta esim. "App.js" tiedosto pystyy suorittamaan kyseiset funktiot.
export default Country
