// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React, { useState } from 'react' // Otetaan käyttöön "react" niminen kirjasto sekä "useState" funktiot sovellusta varten.

import Authors from './components/Authors' // Otetaan käyttöön "Authors" (Authors.js) niminen komponetti, joka sijaitsee => "./components/Authors.js".
import Books from './components/Books' // Otetaan käyttöön "Books" (Books.js) niminen komponetti, joka sijaitsee => "./components/Books.js".
import RecommendedBooks from './components/RecommendedBooks' // Otetaan käyttöön "RecommendedBooks" (RecommendedBooks.js) niminen komponentti, joka sijaitsee => "./components/RecommendedBooks.js".
import NewBook from './components/NewBook' // Otetaan käyttöön "NewBook" (NewBook.js) niminen komponetti, joka sijaitsee => "./components/NewBook.js".
import Notification from './components/Notification' // Otetaan käyttöön "Notification" (Notification.js) niminen komponentti, joka sijaitsee => "./components/Notification.js".
import UserLogin from './components/UserLogin' // Otetaan käyttöön "UserLogin" (UserLogin.js) niminen komponentti, joka sijaitsee => "./components/UserLogin.js".

import { useApolloClient } from '@apollo/client' // Sovellus ottaa käyttöön kyseiset funktiot "@apollo/client" kirjaston kautta.

const App = () => { // Sovellus alkaa tästä...
  const [page, setPage] = useState('authors') // Alustetaan muuttuja "page" tilaan, joka saa oletuksena arvon "authors" aina kun käyttäjä saapuu sovellukseen ensimmäistä kertaa.
  const [token, setToken] = useState(null) // Alustetaan muuttuja "token" tilaan, joka saa oletuksena arvon => "null".
  const [currentNotification, setCurrentNotification] = useState([]) // Alustetaan muuttuja "currentNotification" tilaan, joka saa oletuksena tyhjän taulukon arvon.

  // Alustetaan muuttuja "client", joka suorittaa "useApolloClient()" hookin.
  const client = useApolloClient() // Lisää tästä löytyy: https://www.apollographql.com/docs/react/api/react/hooks/#useapolloclient

  // Alustetaan muuttuja "updateNotification", joka suorittaa {...} sisällä olevat asiat aina,
  // kun kyseiseen funktioon tehdään viittaus. Muuttuja saa myös käyttöönsä "content" muuttujan
  // parametrin arvoksi. Parametristä löytyy sekä "message" että "status" objektien arvot.
  const updateNotification = (content) => {
    setCurrentNotification([content]) // Muutetaan "currentNotification" muuttujan arvo => "content" muuttujan dataan.
    setTimeout(() => { // Ajastin, joka muuttaa {...} sisällä olevien muuttujien arvot takaisin alkuperäiseen arvoon eli "[]".
      setCurrentNotification([]) // Muutetaan "currentNotification" muuttujan arvo => tyhjään taulukkoon.
    }, 5000) // Yllä olevat funktiot suoritetaan 5. sek kuluttua.
  }

  // Alustetaan muuttuja "userLogout", joka suorittaa {...} sisällä olevat asiat aina,
  // kun kyseiseen funktioon tehdään viittaus. Aina kun käyttäjä haluaa kirjautua ulos
  // sovelluksesta, niin kyseinen funktio suoritetaan.
  const userLogout = () => {
    setPage('authors') // Muutetaan "page" muuttujan tilaa vaihtamalla se alkuperäiseen (etusivulle) tilaan eli arvoon => "null".
    setToken(null) // Muutetaan "token" muuttujan tilaa vaihtamalla alkuperäiseen tilaan eli arvoon => "null".
    localStorage.clear() // Tyhjennetään "Local Storage":ssa oleva data eli "current-user-token" objekti.
    // Kun käyttäjä kirjautuu ulos, niin suoritetaan myös "resetStore()" funktio.
    // Funktion avulla siis nollataan välimuisti (cache) nykyisen käyttäjän osalta.
    client.resetStore() // Lisää tästä löytyy: https://www.apollographql.com/docs/react/api/core/ApolloClient/#ApolloClient.resetStore
    updateNotification({ // Kun käyttäjä kirjautuu ulos, niin suoritetaan myös "updateNotification(...)", joka saa käyttöönsä alla olevat objektien arvot.
      message: 'You have successfully logged out from the app. Welcome back again! :)',
      status: true
    })
  }

  // Komponentti renderöi (...) sisällä olevat asiat takaisin käyttäjälle.
  return (
    <div className='container custom-font'>
      <div>
        <nav className='navbar navbar-light mt-3'>
          <form className='container-fluid justify-content-center'>
            <button className='btn btn-sm btn-outline-secondary me-2' type='button' onClick={() => setPage('authors')}>Authors</button>
            <button className='btn btn-sm btn-outline-secondary me-2' type='button' onClick={() => setPage('books')}>Books</button>
            {token === null
              ? null
              : <button className='btn btn-sm btn-outline-secondary me-2' type='button' onClick={() => setPage('RecommendedBooks')}>Recommended books</button>}
            {token === null
              ? <button className='btn btn-sm btn-secondary' type='button' onClick={() => setPage('login')}>Login</button>
              : <button className='btn btn-sm btn-outline-secondary me-2' type='button' onClick={() => setPage('add')}>Add new book</button>}
            {token === null
              ? null
              : <button className='btn btn-sm btn-secondary' type='button' onClick={userLogout}>Logout</button>}
          </form>
        </nav>
      </div>

      <Notification getCurrentNotification={currentNotification} />

      <Authors showAuthors={page === 'authors'} tokenStatus={token} setNotification={updateNotification} />
      <Books show={page === 'books'} />
      <RecommendedBooks showRecommendedBooks={page === 'RecommendedBooks' && token !== null} getClient={client} />
      <NewBook showNewBook={page === 'add' && token !== null} setNotification={updateNotification} />
      <UserLogin showLogin={page === 'login' && token === null} setToken={setToken} setPage={setPage} setNotification={updateNotification} />
    </div>
  ) // Sovelluksen renderöinti loppuu tähän...
} // Sovellus loppuu tähän...

// Viedään (export) alla oleva komponentti (App) sovelluksen käytettäväksi, jotta esim. "index.js" tiedosto pystyy suorittamaan kyseiset funktiot.
export default App
