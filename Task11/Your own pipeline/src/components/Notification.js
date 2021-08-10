// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react' // Komponentti ottaa "react" nimisen kirjaston käyttöönsä.
import { connect } from 'react-redux' // Komponentti ottaa "connect" funktion käyttöönsä => "react-redux" kirjaston kautta.

const Notification = (props) => { // Alustetaan "Notification" niminen komponentti, joka suorittaa {...} sisällä olevat asiat.

  const style = { // Alustetaan muuttuja "style", joka saa käyttöönsä {...} sisällä olevien objektien arvot.
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const notificationToShow = () => { // Alustetaan muuttuja "notificationToShow(...)", joka suorittaa {...} sisällä olevat asiat.
    // Jos alla oleva if-ehto toteutuu, eli "props.message" muuttuja on
    // yhtä kuin => "null", niin renderöidään takaisin arvo => "null".
    if (props.message === null) {
      return null
    }

    // Jos alla oleva if-ehto toteutuu, eli "props.message" muuttuja on
    // epätosi kuin => "null", niin renderöidään takaisin (...) sisällä
    // olevat asiat. Elementti <h3> saa sen hetkisen "props.message" arvon.
    if (props.message !== null ) {
      return (
        <div style={style}>
          <h3>{props.message}</h3>
        </div>
      )
    }
  }

  // Komponentti renderöi (...) sisällä olevan funktion takaisin käyttäjälle.
  return (
    <div>
      {notificationToShow()}
    </div>
  )
}

// Alustetaan muuttuja "mapStateToProps", joka suorittaa {...} sisällä olevat asiat.
// Muuttuja palauttaa meille takaisin datan, mikä sijaitsee storessa "message"
// objektin alla. Funktio käyttää myös parametrinä "state" muuttujan arvoa.
// Lisää infoa funktiosta => https://react-redux.js.org/using-react-redux/connect-mapstate#defining-mapstatetoprops
const mapStateToProps = (state) => {
  return {
    message: state.message
  }
}

// Alustetaan muuttuja "ConnectedNotification", jonka avulla kyseinen komponentti
// eli "Notification" yhdistetään storen datan kanssa => "mapStateToProps()"
// muuttujan avulla. Tämä tarkoittaa sitä, että muuttuja "props.message"
// on yhtä kuin => "state.message". Jos tätä alla olevaa muuttujaa ei olisi,
// niin sovellus ei pystyisi renderöimään storessa olevaa dataa takaisin näkyviin.
const ConnectedNotification = connect(mapStateToProps)(Notification)

// Viedään (export) alla oleva komponentti (ConnectedNotification) sovelluksen käytettäväksi, jotta esim. "App.js" tiedosto pystyy suorittamaan kyseiset funktiot.
export default ConnectedNotification
