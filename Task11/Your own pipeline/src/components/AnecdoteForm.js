// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react' // Komponentti ottaa "react" nimisen kirjaston käyttöönsä.
import { connect } from 'react-redux' // Komponentti ottaa "connect" funktion käyttöönsä => "react-redux" kirjaston kautta.

import { createNewValue } from '../reducers/anecdoteReducer' // Komponentti ottaa "createNewValue" funktion käyttöönsä, joka sijaitsee => "anecdoteReducer.js" tiedostossa.
import { showNotificationMessage } from '../reducers/notificationReducer' // Komponentti ottaa "showNotificationMessage" funktion käyttöönsä, joka sijaitsee => "anecdoteReducer.js" tiedostossa.

const AnecdoteForm = (props) => { // Alustetaan "AnecdoteForm" niminen komponentti, joka suorittaa {...} sisällä olevat asiat.
  // Alustetaan muuttuja "addValue", joka suorittaa {...} sisällä olevat asiat,
  // aina kun kyseiseen funktioon tehdään viittaus eli aina kun, käyttäjä klikkaa
  // painiketta, niin suoritetaan kyseinen funktio ja lopuksi viedään tiedot
  // eteenpäin => "createNewValue(...)" funktiota varten, jotta uusi arvo näkyy sivulla.
  // Muuttuja "addValue" myös suorittaa funktion => "showNotificationMessage(...)",
  // joka saa käyttöönsä kaksi (2) erilaista parametrin arvoa sovelluksen käytettäväksi.
  const addValue = async (event) => {
    event.preventDefault() // The event.preventDefault() method stops the default action of an element from happening.
    // Ota myös huomioon, että alla olevan input:in => "name" arvo on yhtä kuin "newText", jos sitä ei olisi tai on väärä, niin tulee erroria! :)
    const getContent = event.target.newText.value // Alustetaan muuttuja "getContent", joka saa sen hetkisen arvon, minkä käyttäjä laittaa => input:in arvoksi.
    event.target.newText.value = '' // Sovellus tyhjentää kyseisen input:in arvon, sen jälkeen kun yllä oleva muuttuja on saanut arvon.
    props.createNewValue(getContent) // Suoritetaan kyseinen funktio (dispatch(...)) props muuttujan sekä "mapDispatchToProps(...)" muuttujan avulla.
    props.showNotificationMessage(`You have added ${getContent} to the database. Thank you for adding!`, 10) // Suoritetaan kyseinen funktio (dispatch(...)) props muuttujan sekä "mapDispatchToProps(...)" muuttujan avulla.
  }

  // Komponentti renderöi käyttäjälle näkyviin (...) sisällä olevat asiat.
  return (
    <div>
      <form onSubmit={addValue}>
        <input id='inputValue' name='newText' />
        <button id='inputButton' type='submit'>Add new text</button>
      </form>
    </div>
  )
}

// Alustetaan muuttuja "mapStateToProps", joka suorittaa {...} sisällä olevat asiat.
// Muuttuja palauttaa meille takaisin datan, mikä sijaitsee storessa "filter"
// objektin alla. Funktio käyttää myös parametrinä "state" muuttujan arvoa.
// Lisää infoa funktiosta => https://react-redux.js.org/using-react-redux/connect-mapstate#defining-mapstatetoprops
const mapStateToProps = (state) => {
  return {
    values: state.values,
    message: state.message
  }
}

// Alustetaan muuttuja "mapDispatchToProps", joka suorittaa {...} sisällä olevat asiat.
// Muuttujan avulla komponentti voi suorittaa "createNewValue(...)" actionin eli
// dispatchaa ja siirtyy suorittamaan sen sisältöä => "anecdoteReducer.js" tiedostossa.
// Tämän lisäksi komponentti voi dispatchaa => "showNotificationMessage(...)" muuttujan
// ja suorittaa sen sisällön => "Notification.js" tiedostossa. Nyt molemmat muuttujat
// voidaan suorittaa => "props.funktio(parametri)" kautta, kun aikaisemmissa
// tehtävissä molemmat muuttujat suoritettiin => "dispatch(funktio(parametri))".
const mapDispatchToProps = {
  createNewValue,
  showNotificationMessage,
}

// Alustetaan muuttuja "ConnectedAnecdoteForm", jonka avulla kyseinen komponentti
// eli "AnecdoteForm" yhdistetään storen datan kanssa => "mapStateToProps()"
// muuttujan avulla. Tämä tarkoittaa sitä, että muuttuja "props.values/message"
// on yhtä kuin => "state.values/message". Jos tätä alla olevaa muuttujaa ei olisi,
// niin sovellus ei pystyisi renderöimään storessa olevaa dataa takaisin näkyviin.
const ConnectedAnecdoteForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteForm)

// Viedään (export) alla oleva komponentti (ConnectedAnecdoteForm) sovelluksen käytettäväksi, jotta esim. "App.js" tiedosto pystyy suorittamaan kyseiset funktiot.
export default ConnectedAnecdoteForm
