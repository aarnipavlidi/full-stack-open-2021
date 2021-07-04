// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React, { useState } from 'react' // Otetaan käyttöön "react" niminen kirjasto sekä "useState" funktiot sovellusta varten.
import { useQuery, useLazyQuery } from '@apollo/client' // Sovellus ottaa käyttöön kyseiset funktiot "@apollo/client" kirjaston kautta.
import { CURRENT_USER, ALL_BOOKS } from '../queries' // Sovellus ottaa käyttöön kyseiset funktiot "queries.js" tiedostosta.

// Alustetaan komponetti "RecommendedBooks", joka suorittaa {...} sisällä olevat asiat aina,
// kun kyseiseen komponenttiin tehdään viittaus. Komponentti saa myös parametrin arvoksi =>
// "showRecommendedBooks" ja "getClient" muuttujien arvot.
const RecommendedBooks = ({ showRecommendedBooks, getClient }) => {

  // Alustetaan muuttuja "currentUser", joka suorittaa kyseisen queryn eli
  // "CURRENT_USER":in. Queryn data haetaan erikseen välimuistista, koska
  // olemme ottaneet käyttöön "fetchPolicy":n parametrin. Kun käyttäjä
  // kirjautuu sisään, niin "CURRENT_USER":in kautta tuleva data siirtyy
  // välimuistiin talteen ja tämä kyseinen muuttuja "currentUser" poimii
  // datan käytettäväksi tämän komponentin osalta.
  const currentUser = useQuery(CURRENT_USER, {
    fetchPolicy: "cache-only"
  })

  // Alustetaan muuttuja "currentBooks", joka suorittaa kyseisen funktion eli
  // muuttuja hakee "ALL_BOOKS" nimisen queryn erikseen välimuistista käytettäväksi
  // muuttujan alle. Kun käyttäjä saapuu sovellukseen (ensimmäistä kertaa) ja kirjautuu
  // ulos sovelluksesta, niin välimuistista löytyy aina kaikkien kirjojen data
  // tietokannasta erikseen. Ei tarvitse erikseen "murehtia" mistään renderöinti
  // erroreista yms. tosin tämä ei välttämättä ole kaikkein "paras ratkaisu",
  // kun halutaan filtteröidä tietyt kirjat, joiden "genre" objekti täsmää sen
  // hetkisen kirjautuneen käyttäjän kanssa. Yritin pitkään taistella tämän tehtävän
  // eli "8.20 Lempigenren kirjat" ja toteuttaa "ALL_BOOKS" query => "args"
  // muuttujan kanssa. Tämä oli aiheuttanut jatkuvasti renderöinti erroreja :(
  const currentBooks = getClient.readQuery({
    query: ALL_BOOKS
  })

  // Alustetaan muuttuja "filterBooks", joka suorittaa {...} sisällä olevat asiat aina,
  // kun kyseiseen funktioon tehdään viittaus. Funktio saa myös käyttöönsä parametrin
  // arvoksi => "getResults" sekä "getIndex" muuttujien arvot. Funktion tarkoituksena
  // on siis hakea välimuistista olevat kirjat (currentBooks) ja filtteröidä "ei halutut"
  // arvot niin, että jokainen arvo mikä näkyy takaisin käyttäjälle, niin kyseistä arvosta
  // löytyy "genres" objektin arvo, josta löytyy => sen hetkisen käyttäjän "favoriteGenre"
  // objektin arvo. Jos kyseinen ehto ei toteudu, niin ei palauteta mitään => "return null".
  const filterBooks = (getResults, getIndex) => {
    // Jos kyseinen ehto totetuu, niin funktio suorittaa {...} sisällä olevat asiat, muussa tapauksessa ei palauteta mitään.
    if (getResults.genres.map(results => results.toLowerCase()).includes(currentUser.data.me.favoriteGenre.toLowerCase()) === true ) {
      return (
        <tr key={getResults.id}>
          <th scope='row'>{getIndex + 1}</th>
          <td>{getResults.title}</td>
          <td>{getResults.author.name}</td>
          <td>{getResults.published}</td>
        </tr>
      )
    }
    return null // Jos yllä oleva if-ehto ei toteudu, niin ei palauteta mitään.
  }

  // Jos alla oleva if-ehto toteutuu eli muuttuja "showRecommendedBooks" ei toteudu niin, että
  // "page on yhtä kuin RecommendedBooks" sekä "token on yhtä kuin null", niin komponentti ei
  // renderöi mitään takaisin käyttäjälle näkyviin.
  if (!showRecommendedBooks) {
    return null
  }

  // Jos kysenen if-ehto toteutuu eli "currentUser" muuttujan queryn hakeminen on vielä kesken eli
  // "loading", niin komponetti suorittaa {...} sisällä olevat asiat takaisin käyttäjälle näkyviin.
  if (currentUser.loading) {
    return (
      <div className='container mt-3 text-center'>
        <div className='spinner-border' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </div>
      </div>
    )
  }

  // Muussa tapauksessa komponetti renderöi (...) sisällä olevat asiat takaisin käyttäjälle näkyviin.
  return (
    <div className='container mt-3'>
      <div>
        <h2>Welcome back {currentUser.data.me.username}, your favorite genre is {currentUser.data.me.favoriteGenre}.</h2>
        <p>Here is the list of all available books based on your favorite genre:</p>
      </div>
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
            {currentBooks.allBooks.map((results, index) =>
              filterBooks(results, index)
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// Viedään (export) alla oleva komponentti (RecommendedBooks) sovelluksen käytettäväksi, jotta esim. "App.js" tiedosto pystyy suorittamaan kyseiset funktiot.
export default RecommendedBooks
