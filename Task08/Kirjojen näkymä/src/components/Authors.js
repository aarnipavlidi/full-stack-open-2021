// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react' // Otetaan käyttöön "react" niminen kirjasto sovellusta varten.
import { gql, useQuery } from '@apollo/client' // Sovellus ottaa käyttään kyseiset funktiot "@apollo/client" kirjaston kautta.

// Alustetaan muuttuja "ALL_AUTHORS", joka suorittaa alla olevat queryt, kun kyseiseen muuttujaan tehdään
// viittaus eli, jos käyttäjä suorittaa "allAuthors" queryn, niin käyttäjälle tulee takaisin data, josta
// löytyy "name", "born", "bookCount" sekä "id" objektien arvot.
const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`

// Alustetaan "Authors" komponetti, joka suorittaa {...} sisällä olevat asiat, kun siihen tehtään
// vittaus. Komponentti saa myös käyttöönsä "props" parametrin arvon.
const Authors = (props) => {

  const authors = useQuery(ALL_AUTHORS) // Alustetaan muuttuja "authors", joka on yhtä kuin kyseinen funktio.

  // Mikäli if-ehto toteutuu eli => "props.show" ei ole yhtä kuin => "authors" arvo, niin sovellus suorittaa {...} sisällä olevan asian.
  if (!props.show) {
    return null
  }

  // Jos if-ehto toteutuu eli "authors" muuttujan kautta tuleva data vielä "lataa" palvelimesta
  // (käyttäjä ei näe vielä dataa), niin sovellus suorittaa {...} sisällä olevat asiat.
  if (authors.loading) {
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
            <th scope='col'>Name</th>
            <th scope='col'>Born</th>
            <th scope='col'>Books</th>
          </tr>
        </thead>
        <tbody>
          {authors.data.allAuthors.map((results, index) =>
            <tr key={results.id}>
              <th scope='row'>{index + 1}</th>
              <td>{results.name}</td>
              <td>{results.born}</td>
              <td>{results.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

// Viedään (export) alla oleva komponentti (Authors) sovelluksen käytettäväksi, jotta esim. "App.js" tiedosto pystyy suorittamaan kyseiset funktiot.
export default Authors
