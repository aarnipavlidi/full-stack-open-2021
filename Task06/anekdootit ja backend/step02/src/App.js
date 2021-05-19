// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React, { useEffect } from 'react'; // Sovellus ottaa "react" nimisen kirjaston käyttöönsä.

import anecdotesService from './services/anecdotes' // Alustetaan muuttuja "anecdotesService", joka hyödyntää "anecdotes.js" (erillinen moduuli) tiedostoa eli => "./services/anecdotes.js".
import { showValuesFromDatabase } from './reducers/anecdoteReducer' // Komponentti ottaa "showValuesFromDatabase" funktion käyttöönsä, joka sijaitsee => "anecdoteReducer.js" tiedostossa.
import { useDispatch } from 'react-redux' // Komponentti ottaa "useDispatch" funktion käyttöönsä => "react-redux" kirjaston kautta.

import AnecdoteForm from './components/AnecdoteForm' // Sovellus hyödyntää "AnecdoteForm" (AnecdoteForm.js) nimistä komponenttia, joka sijaitsee => "./components/AnecdoteForm".
import AnecdoteList from './components/AnecdoteList' // Sovellus hyödyntää "AnecdoteList" (AnecdoteList.js) nimistä komponenttia, joka sijaitsee => "./components/AnecdoteList".
import Notification from './components/Notification' // Sovellus hyödyntää "Notification" (Notification.js) nimistä komponenttia, joka sijaitsee => "./components/Notification".
import Filter from './components/Filter' // Sovellus hyödyntää "Filter" (Filter.js) nimistä komponenttia, joka sijaitsee => "./components/Filter".

const App = () => { // Sovellus alkaa tästä...
  // Alustetaan muuttuja "dispatch", joka suorittaa "useDispatch()" funktion. Tämän avulla sovellus
  // pystyy tekemään muutoksia "storeen" tallennettuihin  taulukon arvoihin. Lisää tästä täältä: https://react-redux.js.org/api/hooks#usedispatch
  const dispatch = useDispatch()

  useEffect(() => { // Sovellus hyödyntää "useEffect(...)" funktiota ja suorittaa kyseisen funktion vain kerran eli haetaan halutut arvot erikseen tietokannasta.
    // Haetaan kaikki nykyiset arvot tietokannasta "getValuesFromDatabase(...)" funktion avulla,
    // jonka jälkeen funktio palauttaa takaisin => "response.data":n, jonka avulla sovellus
    // hyödyntää "results" muuttujan kanssa eli suoritetaan "showValuesFromDatabase(...)"
    // funktio, joka saa käyttöönsä kyseisen parametrin arvon.
    anecdotesService
      .getValuesFromDatabase().then(results => dispatch(showValuesFromDatabase(results)))
  }, [])

  // Sovellus renderöi (...) sisällä olevat asiat käyttäjälle näkyviin.
  return (
    <div>
      <Notification />
      <h1>Anecdotes</h1>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
} // Sovellus loppuu tähän...

// Viedään (export) alla oleva komponentti (App) sovelluksen käytettäväksi, jotta esim. "index.js" tiedosto pystyy suorittamaan kyseiset funktiot.
export default App
