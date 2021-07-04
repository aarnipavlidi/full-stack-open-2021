// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react' // Otetaan käyttöön "react" niminen kirjasto sovellusta varten.

// Alustetaan "Notification" komponetti, joka suorittaa {...} sisällä olevat asiat, kun siihen tehtään
// vittaus. Komponentti saa myös käyttöönsä "getCurrentNotification" parametrin arvon.
const Notification = ({ getCurrentNotification }) => {

  // Jos alla oleva if-ehto toteutuu, eli "getCurrentNotification.length"
  // on yhtä kuin nolla (0), niin komponentti renderöi {...} sisällä
  // olevat asiat takaisin käyttäjälle näkyviin.
  if (getCurrentNotification.length === 0) {
    return null
  }

  // Jos alla oleva if-ehto toteutuu, eli "getCurrentNotification[0].status"
  // on yhtä kuin => "true" muuttujan arvo, niin komponetti renderöi {...}
  // sisällä olevat asiat takaisin käyttäjälle näkyviin.
  if (getCurrentNotification[0].status === true) {
    return (
      <div className='alert alert-success container'>
        {getCurrentNotification[0].message}
      </div>
    )
  }

  // Jos alla oleva if-ehto toteutuu, eli "getCurrentNotification[0].status"
  // on yhtä kuin => "false" muuttujan arvo, niin komponetti renderöi {...}
  // sisällä olevat asiat takaisin käyttäjälle näkyviin.
  if (getCurrentNotification[0].status === false) {
    return (
      <div className='alert alert-danger container'>
        {getCurrentNotification[0].message}
      </div>
    )
  }
}

// Viedään (export) alla oleva komponentti (Notification) sovelluksen käytettäväksi, jotta esim. "App.js" tiedosto pystyy suorittamaan kyseiset funktiot.
export default Notification
