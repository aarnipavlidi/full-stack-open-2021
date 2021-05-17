// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react'; // Sovellus ottaa "react" nimisen kirjaston käyttöönsä.

import AnecdoteForm from './components/AnecdoteForm' // Sovellus hyödyntää "AnecdoteForm" (AnecdoteForm.js) nimistä komponenttia, joka sijaitsee => "./components/AnecdoteForm".
import AnecdoteList from './components/AnecdoteList' // Sovellus hyödyntää "AnecdoteList" (AnecdoteList.js) nimistä komponenttia, joka sijaitsee => "./components/AnecdoteList".
import Notification from './components/Notification' // Sovellus hyödyntää "Notification" (Notification.js) nimistä komponenttia, joka sijaitsee => "./components/Notification".

const App = () => { // Sovellus alkaa tästä...

  // Sovellus renderöi (...) sisällä olevat asiat käyttäjälle näkyviin.
  return (
    <div>
      <Notification />
      <h1>Anecdotes</h1>
      <AnecdoteForm />
      <AnecdoteList />
    </div>
  )
} // Sovellus loppuu tähän...

// Viedään (export) alla oleva komponentti (App) sovelluksen käytettäväksi, jotta esim. "index.js" tiedosto pystyy suorittamaan kyseiset funktiot.
export default App
