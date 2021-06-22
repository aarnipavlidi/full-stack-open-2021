// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react' // Sovellus ottaa "react" nimisen kirjaston käyttöönsä.
import { useSelector } from 'react-redux' // Komponentti ottaa "useSelector" funktion käyttöönsä => "react-redux" kirjaston kautta.

const Notification = () => { // Alustetaan "Notification" niminen komponentti, joka suorittaa {...} sisällä olevat asiat.
  // Alustetaan muuttuja "getNotificationContent", joka suorittaa "useSelector(...)" funkion. Tämän avulla päästään
  // käsiksi "storeen" tallennettuun taulukon arvoihin. Lisää tästä täältä: https://react-redux.js.org/api/hooks#useselector
  // Ota myös huomioon, että käytämme alla olevan funktion sisällä => "state.message",
  // koska olemme asettaneet aikaisemmin storeen (store.js) kyseisen objektin arvon.
  const getNotificationContent = useSelector(state => state.message)

  // Jos alla oleva if-ehto totetuu eli "getNotificationContent" on yhtä kuin => "null", niin komponentti renderöi {..} sisällä olevan asian.
  if (getNotificationContent === null) {
    return null
  }

  // Jos alla oleva if-ehto totetuuu eli "getNotificationContent.status" on yhtä kuin
  // => "success" sekä "getNotificationContent.message" on epätosi kuin => "null" niin
  // komponentti renderöi {...} sisällä olevat asiat.
  if (getNotificationContent.status === 'success' && getNotificationContent.message !== null) {
    return (
      <div className='alert alert-success container'>
        {getNotificationContent.message}
      </div>
    )
  }

  // Jos alla oleva if-ehto totetuuu eli "getNotificationContent.status" on yhtä kuin
  // => "error" sekä "getNotificationContent.message" on epätosi kuin => "null" niin
  // komponentti renderöi {...} sisällä olevat asiat.
  if (getNotificationContent.status === 'error' && getNotificationContent.message !== null) {
    return (
      <div className='alert alert-danger container'>
        {getNotificationContent.message}
      </div>
    )
  }
}

// Viedään (export) alla oleva komponentti (Notification) sovelluksen käytettäväksi, jotta esim. "App.js" tiedosto pystyy suorittamaan kyseiset funktiot.
export default Notification
