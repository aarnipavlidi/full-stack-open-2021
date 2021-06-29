// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React, { useState } from 'react' // Otetaan käyttöön "react" niminen kirjasto sekä "useState" funktio sovellusta varten.
import Authors from './components/Authors' // Otetaan käyttöön "Authors" (Authors.js) niminen komponetti, joka sijaitsee => "./components/Authors.js".
import Books from './components/Books' // Otetaan käyttöön "Books" (Books.js) niminen komponetti, joka sijaitsee => "./components/Books.js".
import NewBook from './components/NewBook' // Otetaan käyttöön "NewBook" (NewBook.js) niminen komponetti, joka sijaitsee => "./components/NewBook.js".
import Notification from './components/Notification' // Otetaan käyttöön "Notification" (Notification.js) niminen komponentti, joka sijaitsee => "./components/Notification.js".

const App = () => { // Sovellus alkaa tästä...
  const [page, setPage] = useState('authors') // Alustetaan muuttuja "page" tilaan, joka saa oletuksena arvon "authors" aina kun käyttäjä saapuu sovellukseen ensimmäistä kertaa.

  const [currentNotification, setCurrentNotification] = useState([]) // Alustetaan muuttuja "currentNotification" tilaan, joka saa oletuksena tyhjän taulukon arvon.

  // Alustetaan muuttuja "updateNotification", joka suorittaa {...} sisällä olevat asiat aina,
  // kun kyseiseen funktioon tehdään viittaus. Muuttuja saa myös käyttöönsä "content" muuttujan
  // parametrin arvoksi. Parametristä löytyy sekä "message" että "status" objektien arvot.
  const updateNotification = (content) => {
    setCurrentNotification([content]) // Muutetaan "currentNotification" muuttujan arvo => "content" muuttujan dataan.
    setTimeout(() => { // Ajastin, joka muuttaa {...} sisällä olevien muuttujien arvot takaisin alkuperäiseen arvoon eli "[]".
      setCurrentNotification([]) // Muutetaan "currentNotification" muuttujan arvo => tyhjään taulukkoon.
    }, 5000) // Yllä olevat funktiot suoritetaan 5. sek kuluttua.
  }

  // Komponentti renderöi (...) sisällä olevat asiat takaisin käyttäjälle.
  return (
    <div className='container custom-font'>
      <div>
        <nav className='navbar navbar-light mt-3'>
          <form className='container-fluid justify-content-center'>
            <button className='btn btn-sm btn-outline-secondary me-2' type='button' onClick={() => setPage('authors')}>Authors</button>
            <button className='btn btn-sm btn-outline-secondary me-2' type='button' onClick={() => setPage('books')}>Books</button>
            <button className='btn btn-sm btn-outline-secondary' type='button' onClick={() => setPage('add')}>Add new book</button>
          </form>
        </nav>
      </div>

      <Notification getCurrentNotification={currentNotification} />

      <Authors showAuthors={page === 'authors'} setNotification={updateNotification} />
      <Books show={page === 'books'} />
      <NewBook showNewBook={page === 'add'} />
    </div>
  ) // Sovelluksen renderöinti loppuu tähän...
} // Sovellus loppuu tähän...

// Viedään (export) alla oleva komponentti (App) sovelluksen käytettäväksi, jotta esim. "index.js" tiedosto pystyy suorittamaan kyseiset funktiot.
export default App
