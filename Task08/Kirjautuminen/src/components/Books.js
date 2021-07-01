// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react' // Otetaan käyttöön "react" niminen kirjasto sovellusta varten.
import { useQuery } from '@apollo/client' // Sovellus ottaa käyttöön kyseiset funktiot "@apollo/client" kirjaston kautta.
import { ALL_BOOKS } from '../queries' // Sovellus ottaa käyttöön kyseiset funktiot "queries.js" tiedostosta.

// Alustetaan "Books" komponetti, joka suorittaa {...} sisällä olevat asiat, kun siihen tehtään
// vittaus. Komponentti saa myös käyttöönsä "props" parametrin arvon.
const Books = (props) => {

  const books = useQuery(ALL_BOOKS) // Alustetaan muuttuja "books", joka on yhtä kuin kyseinen funktio.

  // Mikäli if-ehto toteutuu eli => "props.show" ei ole yhtä kuin => "books" arvo, niin sovellus suorittaa {...} sisällä olevan asian.
  if (!props.show) {
    return null
  }

  // Jos if-ehto toteutuu eli "books" muuttujan kautta tuleva data vielä "lataa" palvelimesta
  // (käyttäjä ei näe vielä dataa), niin sovellus suorittaa {...} sisällä olevat asiat.
  if (books.loading) {
    return (
      <div className='container mt-3 text-center'>
        <div className='spinner-border' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </div>
      </div>
    )
  }

  // Muussa tapauksessa, jos mikään if-ehto ei toteudu, niin sovellus renderöi (...) sisällä olevat asiat takaisin käyttäjälle näkyviin.
  return (
    <div className='container mt-3'>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Book</th>
            <th scope='col'>Author</th>
            <th scope='col'>Published</th>
          </tr>
        </thead>
        <tbody>
          {books.data.allBooks.map((results, index) =>
            <tr key={results.id}>
              <th scope='row'>{index + 1}</th>
              <td>{results.title}</td>
              <td>{results.author.name}</td>
              <td>{results.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

// Viedään (export) alla oleva komponentti (Books) sovelluksen käytettäväksi, jotta esim. "App.js" tiedosto pystyy suorittamaan kyseiset funktiot.
export default Books
