// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React, { useState } from 'react' // Otetaan käyttöön "react" niminen kirjasto sekä "useState" funktio sovellusta varten.
import { useQuery } from '@apollo/client' // Sovellus ottaa käyttöön kyseiset funktiot "@apollo/client" kirjaston kautta.
import { ALL_BOOKS } from '../queries' // Sovellus ottaa käyttöön kyseiset funktiot "queries.js" tiedostosta.

// Alustetaan "Books" komponetti, joka suorittaa {...} sisällä olevat asiat, kun siihen tehtään
// vittaus. Komponentti saa myös käyttöönsä "props" parametrin arvon.
const Books = (props) => {

  // ALla olevan muuttujan tarkoituksena on toimia niin, että aina kun käyttäjä saapuu "ensimmäistä"
  // kertaa sovellukseen, niin käyttäjälle näytetään kaikki kirjat tietokannasta. Jos käyttäjä haluaa
  // filtteröidä tietyn genren mukaan, niin sovellus suorittaa "setCurrentGenre" funktion ja muuttaa
  // muuttujan eli "currentGenre" tilaa haluttuun genren tekstiin. Muuttuja siis saa oletuksena
  // arvon => "all_genres" aina kun sovellus käynnistetään ja renderöidään sivu käyttäjälle.
  const [currentGenre, setCurrentGenre] = useState('all_genres')

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

  // Alustetaan muuttuja "getUniqueGenres", joka hakee siis tietokannasta (books:in kokoelmasta), jokaisesta arvosta
  // "genres" objektin ja luo niille uuden taulukon, niin että ainoastaan "uniikit" arvot näkyvät uudessa taulukkossa.
  // Jos esim. tietokannasta löytyy "React" niminen genre useamman kerran, niin kyseinen arvo listataan uuteen taulukkoon
  // vain kerran! Tämä on luotu sitä varten, että voimme luoda jokaista "uniikkia" genreä varten oman painikkeen, jotta
  // käyttäjä voi sovelluksen käyttämisen aikana filtteröidä kirjan listaa sitä mukaan mitä genreä käyttäjä haluaa nähdä.
  const getUniqueGenres = books.data.allBooks.map(results => results.genres).reduce((previous, current) => previous.concat(current), []).filter((item, index, result) => result.indexOf(item) === index)

  // Alustetaan "showBooks" muuttuja, joka suorittaa {...} sisällä olevat asiat aina,
  // kun kyseiseen funktioon tehdään viittaus. Kun komponentti renderöidään takaisin
  // käyttäjälle, niin oletuksena kaikki arvot (tietokannasta) näkyvät takaisin käyttäjälle
  // ja sen avulla kun funkiota suoritetaan, niin se saa kaksi (2) parametrin arvoa eli
  // "results" sekä "index". Näiden avulla pystytään sitten renderöidään halutut asiat
  // takaisin, jos tietty if-ehto täyttyy. Tämän harjoituksen osalta meidän tietokannasta
  // löytyy viisi (5) erilaista arvoa, mikä taas tarkoittaa sitä että sovellus suorittaa
  // kyseiset if-ehdot viisi kertaa myös ja tarkistaa, että toteutuuko tietty if-ehto vai ei.
  const showBooks = (getResults, getIndex) => {

    // Jos alla oleva if-ehto toteutuu eli, jos muuttuja "currentGenre" on yhtä kuin
    // "all_genres", niin suoritetaan {...} sisällä olevat asiat, jokaisen "getResults"
    // arvon osalta. Koska muuttuja on oletukana aina "all_genres", niin aina kun
    // käyttäjä saapuu sovellukseen ensimmäistä kertaa, niin tämä suoritetaan.
    if (currentGenre === 'all_genres') {
      return (
        <tr key={getResults.id}>
          <th scope='row'>{getIndex + 1}</th>
          <td>{getResults.title}</td>
          <td>{getResults.author.name}</td>
          <td>{getResults.published}</td>
        </tr>
      )
    }

    // Jos alla oleva if-ehto toteutuu eli, jos sen hetkisellä arvolla (getResults) löytyy
    // objektista "genres" arvo, joka on yhtä kuin => "currentGenre" muuttujan kanssa, niin
    // funktio suorittaa {...} sisällä olevat asiat takaisin käyttäjälle näkyviin.
    if (getResults.genres.map(results => results.toLowerCase()).includes(currentGenre) === true ) {
      return (
        <tr key={getResults.id}>
          <th scope='row'>{getIndex + 1}</th>
          <td>{getResults.title}</td>
          <td>{getResults.author.name}</td>
          <td>{getResults.published}</td>
        </tr>
      )
    }

    // Jos mikään yllä oleva if-ehto ei toteudu, niin funktio ei renderöi (null) mitään takaisin.
    return null
  }

  // Alustetaan muuttuja "showGenreButtons", joka suorittaa {...} sisällä olevat asiat aina,
  // kun kyseiseen funktioon tehdään viittaus. Funktion tarkoituksena on siis renderöidä
  // kirjalistan alle jokaiselle "uniikille" genrelle oma painike, jotta käyttäjällä on
  // mahdollisuus filtteröidä haluttu arvo pois sen hetkisestä listasta. Olemme myös lisänneet
  // koodiin if-ehdon, että jos "getResults" muuttuja on yhtä kuin => "currentGenre" muuttujan
  // arvo, niin renderöidään sama painike (kuin normaalisti) paitsi, että painikkeen tyyliin
  // tulee muutos => "...outline...". Tämän avulla käyttäjä pystyy erottamaan, että mitä
  // genreä tällä hetkellä näytetään käyttäjälle! :)
  const showGenreButtons = (getResults, getIndex) => {
    // Jos alla oleva if-ehto toteutuu, niin funktio suorittaa {...} sisällä olevat asiat.
    if (getResults.toLowerCase() === currentGenre) {
      return (
        <button key={getIndex} type='button' className='btn btn-outline-secondary btn-sm mt-2 me-2' value={getResults.toLowerCase()} onClick={({ target }) => setCurrentGenre(target.value)}>{getResults.toLowerCase()}</button>
      )
    } else { // Muussa tapauksessa, jos yllä oleva if-ehto ei toteudu, niin suoritetaan {...} sisällä olevat asiat.
      return (
        <button key={getIndex} type='button' className='btn btn-secondary btn-sm mt-2 me-2' value={getResults.toLowerCase()} onClick={({ target }) => setCurrentGenre(target.value)}>{getResults.toLowerCase()}</button>
      )
    }
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
            showBooks(results, index)
          )}
        </tbody>
      </table>
      <div className='container mt-3'>
        {getUniqueGenres.map((results, index) =>
          showGenreButtons(results, index)
        )}
        <button type='button' className='btn btn-outline-secondary btn-sm mt-2' value='all_genres' onClick={({ target }) => setCurrentGenre(target.value)}>all genres</button>
      </div>
    </div>
  )
}

// Viedään (export) alla oleva komponentti (Books) sovelluksen käytettäväksi, jotta esim. "App.js" tiedosto pystyy suorittamaan kyseiset funktiot.
export default Books
