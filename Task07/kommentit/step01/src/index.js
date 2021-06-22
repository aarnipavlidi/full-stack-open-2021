// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react' // Sovellus ottaa "react" nimisen kirjaston käyttöönsä.
import ReactDOM from 'react-dom' // Sovellus ottaa "react-dom" nimisen kirjaston käyttöönsä.

import { Provider } from 'react-redux' // Sovellus ottaa "Provider" komponentin käyttöönsä => "react-redux" kirjaston kautta.
import App from './App' // Sovellus ottaa "App.js" tiedoston sisällön käyttöönsä.
import './index.css' // Sovellus ottaa "index.css" (tyylitiedosto) tiedoston sisällön käyttöönsä.

import store from './store' // Alustetaan muuttuja "store", joka ottaa "store.js" tiedoston sisällön käyttöönsä.

// Sovellus renderöi käyttäjälle alla olevat komponentit näkyviin, joiden sisältö
// siirtyvät => "index.html" tiedostoon => elementin sisälle, jonka id:n arvo on "root".
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
