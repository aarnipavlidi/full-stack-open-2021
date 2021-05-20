// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react'; // Komponentti ottaa "react" nimisen kirjaston käyttöönsä.
import { connect } from 'react-redux' // Komponentti ottaa "connect" funktion käyttöönsä => "react-redux" kirjaston kautta.

import { changeFilterValue } from '../reducers/filterReducer' // Komponentti ottaa "changeFilterValue" funktion käyttöönsä, joka sijaitsee => "filterReducer.js" tiedostossa.

const Filter = (props) => { // Alustetaan "Filter" niminen komponentti, joka suorittaa {...} sisällä olevat asiat.

  const style = { // Alustetaan muuttuja "style", joka saa käyttöönsä {...} sisällä olevien objektien arvot.
    marginBottom: 10
  }

  // Komponentti renderöi käyttäjälle näkyviin (...) sisällä olevat asiat. Aina kun
  // käyttäjä kirjoittaa jotain input:in arvoon, niin sovellus suorittaa funktion =>
  // "changeFilterValue(...)" props sekä "mapStateToProps(...)" muuttujan avulla.
  return (
    <div style={style}>
      <div>Filter: <input onChange={ (event) => props.changeFilterValue(event.target.value)} /></div>
    </div>
  )
}

// Alustetaan muuttuja "mapStateToProps", joka suorittaa {...} sisällä olevat asiat.
// Muuttuja palauttaa meille takaisin datan, mikä sijaitsee storessa "filter"
// objektin alla. Funktio käyttää myös parametrinä "state" muuttujan arvoa.
// Lisää infoa funktiosta => https://react-redux.js.org/using-react-redux/connect-mapstate#defining-mapstatetoprops
const mapStateToProps = (state) => {
  return {
    filter: state.filter
  }
}

// Alustetaan muuttuja "mapDispatchToProps", joka suorittaa {...} sisällä olevat asiat.
// Muuttujan avulla komponentti voi suorittaa "changeFilterValue(...)" actionin eli
// dispatchaa ja siirtyy suorittamaan sen sisältöä => "filterReducer.js" tiedostossa.
// Nyt meillä on pelkästään => "props.changeFilterValue(...)" ja aikaisemmissa
// tehtävissä kyseinen funktio oli muotoa => "dispatch(changeFilterValue(...))".
const mapDispatchToProps = {
  changeFilterValue,
}

// Alustetaan muuttuja "ConnectedFilter", jonka avulla kyseinen komponentti
// eli "Filter" yhdistetään storen datan kanssa => "mapStateToProps()"
// muuttujan avulla. Tämä tarkoittaa sitä, että muuttuja "props.filter"
// on yhtä kuin => "state.filter". Jos tätä alla olevaa muuttujaa ei olisi,
// niin sovellus ei pystyisi renderöimään storessa olevaa dataa takaisin näkyviin.
const ConnectedFilter = connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter)

// Viedään (export) alla oleva komponentti (ConnectedFilter) sovelluksen käytettäväksi, jotta esim. "App.js" tiedosto pystyy suorittamaan kyseiset funktiot.
export default ConnectedFilter
