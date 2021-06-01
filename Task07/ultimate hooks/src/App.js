// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React, { useState } from 'react' // Sovellus ottaa käyttöön "react" kirjaston sekä mahdollistetaan "useState" funktion käyttö sovelluksessa.
import { useField, useResource } from './hooks' // Sovellus hyödyntää "useField(...)" ja "useResource(...)" funktioita, joka sijaitsee => "./hooks" tiedostossa.

const App = () => { // Sovellus alkaa tästä...
  const content = useField('text') // Alustetaan muuttuja "content" omaan tilaan, joka hyödyntää => "useField(...)" funktiota.
  const name = useField('text') // Alustetaan muuttuja "name" omaan tilaan, joka hyödyntää => "useField(...)" funktiota.
  const number = useField('text') // Alustetaan muuttuja "number" omaan tilaan, joka hyödyntää => "useField(...)" funktiota.

  // Alustetaan "notes" omaan tilaan, joka hyödyntää => "useResource(...)" funktiota,
  // jossa alla oleva osoite on yhtä kuin parametrin "getDatabase" arvo. Muuttujan
  // "notes" alla löytyy tietokannan sisällä olevat arvot ja "noteService" muuttujan
  // avulla me voimme lisätä uuden arvon tietokantaan näkyviin.
  const [notes, noteService] = useResource('http://localhost:3005/notes')

  // Alustetaan "persons" omaan tilaan, joka hyödyntää => "useResource(...)" funktiota,
  // jossa alla oleva osoite on yhtä kuin parametrin "getDatabase" arvo. Muuttujan
  // "persons" alla löytyy tietokannan sisällä olevat arvot ja "personService" muuttujan
  // avulla me voimme lisätä uuden arvon tietokantaan näkyviin.
  const [persons, personService] = useResource('http://localhost:3005/persons')

  // Alustetaan muuttuja "handleNoteSubmit", joka suorittaa {...} sisällä olevat asiat aina,
  // kun kyseiseen funktioon tehdään viittaus. Kun käyttäjä siis haluaa lisätä uuden
  // arvon tietokantaan, niin käyttäjän antaman arvon (input:in kenttään) avulla
  // suoritetaan "noteService(...)" funktio ja lopuksi tyhjennetään input:in kenttä.
  const handleNoteSubmit = (event) => {
    event.preventDefault() // The event.preventDefault() method stops the default action of an element from happening.
    noteService({ content: content.value }) // Lisätään ({...}) sisällä oleva objektin arvo tietokantaan => "noteService" funktion avulla.
    content.resetValue() // Tyhjennetään input:in kentän arvo, suorittamalla kyseinen funktio.
  }

  // Alustetaan muuttuja "handlePersonSubmit", joka suorittaa {...} sisällä olevat asiat aina,
  // kun kyseiseen funktioon tehdään viittaus. Kun käyttäjä siis haluaa lisätä uuden
  // arvon tietokantaan, niin käyttäjän antaman arvon (input:in kenttään) avulla
  // suoritetaan "personService(...)" funktio ja lopuksi tyhjennetään input:in kenttä.
  const handlePersonSubmit = (event) => {
    event.preventDefault() // The event.preventDefault() method stops the default action of an element from happening.
    personService({ name: name.value, number: number.value}) // Lisätään ({...}) sisällä olevien objektin arvot tietokantaan => "personService" funktion avulla.
    name.resetValue() // Tyhjennetään input:in kentän arvo, suorittamalla kyseinen funktio.
    number.resetValue() // Tyhjennetään input:in kentän arvo, suorittamalla kyseinen funktio.
  }

  // Komponentti renderöi (...) sisällä olevat asiat takaisin käyttäjälle näkyviin.
  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br/>
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
} // Sovellus loppuu tähän...

// Viedään (export) alla oleva komponentti (App) sovelluksen käytettäväksi, jotta esim. "index.js" tiedosto pystyy suorittamaan kyseiset funktiot.
export default App
