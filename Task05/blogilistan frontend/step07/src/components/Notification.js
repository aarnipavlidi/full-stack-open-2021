// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react' // Sovellus ottaa "react" nimisen kirjaston käyttöönsä.

// Alustetaan "Notification" niminen muuttuja (komponentti), joka renderöi {...} sisällä olevat asiat,
// kun siihen tehdään viittaus. Komponentti hyödyntää myös "propsina" muuttujien "message" ja "checkStatus"
// arvoa. Kun kyseinen komponentti renderöidään sovellukseen, niin "propsin" arvo => "message" on yhtä
// kuin => "statusMessage" sekä "checkStatus" on yhtä kuin => "status".
//
// Komponentti renderöi alla olevat asiat if-ehtojen mukaisesti, eli jos mikään if-ehto ei toteudu,
// niin renderöidään "null" (eli ei mitään). Jos jompi kumpi ehto toteutuu, niin renderöidään
// asianmukainen viesti, joka käyttää kyseistä tyyliä eli "error" tai "success".
const Notification = ({ message, checkStatus }) => {

  if (message != null && checkStatus === false) {
    return (
      <div className="error">
        {message}
      </div>
    )
  }

  if (message != null && checkStatus === true) {
    return (
      <div className="success">
        {message}
      </div>
    )
  }

  return null
}

// Viedään (export) alla oleva komponentti (Notification) sovelluksen käytettäväksi, jotta esim. "App.js" tiedosto pystyy suorittamaan kyseiset funktiot.
export default Notification
