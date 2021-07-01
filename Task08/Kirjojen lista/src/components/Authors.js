// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React, { useState } from 'react' // Otetaan käyttöön "react" niminen kirjasto sekä "useState" funktio sovellusta varten.
import { useQuery, useMutation } from '@apollo/client' // Sovellus ottaa käyttöön kyseiset funktiot "@apollo/client" kirjaston kautta.
import { ALL_AUTHORS, UPDATE_AUTHOR_YEAR } from '../queries' // Sovellus ottaa käyttöön kyseiset funktiot "queries.js" tiedostosta.

// Alustetaan "Authors" komponetti, joka suorittaa {...} sisällä olevat asiat, kun siihen tehtään
// vittaus. Komponentti saa myös käyttöönsä "showAuthors" ja "setNotification" parametrien arvot.
const Authors = ({ showAuthors, setNotification }) => {
  const [name, setName] = useState('default_value') // Alustetaan muuttuja "name" tilaan, joka saa oletuksena arvon => 'default_value'.
  const [born, setBorn] = useState('') // Alustetaan muuttuja "born" tilaan, joka saa oletuksena arvon => ''.

  const authors = useQuery(ALL_AUTHORS) // Alustetaan muuttuja "authors", joka on yhtä kuin kyseinen funktio.

  // Alustetaan muuttuja "updateAuthorYear", joka suorittaa kyseisen funktion/mutaation eli,
  // kun käyttäjä luo uuden arvon tietokantaan, niin suoritetaan "UPDATE_AUTHOR_YEAR" mutaatio
  // ja lopuksi vielä "päivitetään" kirjailijoiden tietokanta. Ota myös huomioon, että alhaalla
  // on erikseen luotu "updateAuthorYear(...)", jonka sisälle alustettu muuttujien arvot. Näiden
  // avulla nämä arvot sijoittuvat => mutaation suorittamista varten, jotta kirjailijan syntymävuosi päivittyy.
  const [ updateAuthorYear ] = useMutation(UPDATE_AUTHOR_YEAR, {
    refetchQueries: [{ query: ALL_AUTHORS}]
  })

  // Alustetaan muuttuja "submitAuthor", joka suorittaa {...} sisällä olevat asiat aina,
  // kun kyseiseen funktioon tehdään viittaus. Funktion tarkoituksena on toimia siis niin,
  // että aina kun käyttäjä haluaa päivittää tietyn kirjailijan syntymävuotta, niin funktio
  // suoritetaan, jonka kautta => "updateAuthorYear(...)" funktio suoritetaan sen hetkisillä
  // muuttujien arvoilla (eli "name", "born") ja näiden avulla suoritetaan mutaatio loppuun.
  const submitAuthor = async (event) => {
    event.preventDefault() // The event.preventDefault() method stops the default action of an element from happening.
    // Alustetaan muuttuja "checkingAuthorValue", joka on yhtä kuin kyseinen funktio. Muuttujan tarkoituksena on tarkistaa,
    // että löytyykö tietokannasta samanlaista kirjailijaa, mitä käyttäjä yrittää päivittää. Olemme ottaneet myös käyttöön
    // "toLowerCase()" funktiot, jotta voidaan varmistaa että muuttujien vertailu keskenään on "vertailukelpoinen". Emme
    // voi olettaa, että kirjoittaako käyttäjä kirjailijan nimen isoilla vai pienillä kirjaimilla! :)
    const checkingAuthorValue = authors.data.allAuthors.some(results => results.name.toLowerCase() === name.toLowerCase())

    // Jos alla oleva if-ehto toteutuu, eli "checkingAuthorValue" on yhtä kuin "true", niin suoritetaan {...} sisällä olevat asiat.
    if (checkingAuthorValue === true) {
      // Suoritetaan "updateAuthorYear(...)" funktio, joka saa käyttöönsä alla olevat muuttujat.
      updateAuthorYear({
        variables: {
          name, // eli "name" siirtyy => "$name" arvoon (UPDATE_AUTHOR_YEAR:in mutaatio).
          born // eli "born" siirtyy => "$born" arvoon (UPDATE_AUTHOR_YEAR:in mutaatio).
        }
      })
      setName('default_value') // Kun uusi arvo on lisätty tietokantaan, niin tyhjennetään muuttujan arvo takaisin alkuperäiseen tilaan.
      setBorn('') // Kun uusi arvo on lisätty tietokantaan, niin tyhjennetään muuttujan arvo takaisin alkuperäiseen tilaan.
      setNotification({message: 'You have successfully updated authors birthyear! :)', status: true}) // Suoritetaan "setNotification(...)" funktio, joka saa käyttöönsä kyseiset objektien arvot.
    } else { // Jos yllä oleva if-ehto ei toteudu, niin funktio suorittaa {...} sisällä olevat asiat.
      setNotification({ // Suoritetaan "setNotification(...)" funktio, joka saa käyttöönsä kyseiset objektien arvot.
        message: 'You tried to update author, which does not exist on the database. Please try again later! :)',
        status: false
      })
      setName('default_value') // Kun uusi arvo on lisätty tietokantaan, niin tyhjennetään muuttujan arvo takaisin alkuperäiseen tilaan.
      setBorn('') // Kun uusi arvo on lisätty tietokantaan, niin tyhjennetään muuttujan arvo takaisin alkuperäiseen tilaan.
    }
  }

  // Alustetaan muuttuja "handleAuthorChange", joka suorittaa {...} sisällä olevat asiat aina,
  // kun kyseiseen funktioon tehdään viittaus. Siis aina kun käyttäjä valitsee tietyn kirjailijan
  // arvon <option value="...">...</option>, niin se tallennetaan "name" muuttujan alle.
  const handleAuthorChange = (event) => {
    console.log(event.target.value) // Tulostaa valitun kirjailijan arvon konsoliin näkyviin.
    setName(event.target.value) // Muutetaan "name" muuttujan tilaa => "event.target.value" muuttujan arvoon.
  }

  // Mikäli if-ehto toteutuu eli => "showAuthors" ei ole yhtä kuin => "authors" arvo, niin sovellus suorittaa {...} sisällä olevan asian.
  if (!showAuthors) {
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
      <div>
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
      <div className='container mt-3'>
        <h2 className='text-center'>Update authors birthyear</h2>
        <form onSubmit={submitAuthor}>
          <div className='mt-3 mb-3 col-sm-5'>
            <select className='form-select form-select-sm' aria-label="Select which author to update!" onChange={handleAuthorChange}>
              <option value="default_value">Choose which author you want to update!</option>
              {authors.data.allAuthors.map(results =>
                <option value={results.name}>{results.name}</option>
              )}
            </select>
          </div>
          <div className='mb-3 col-sm-5'>
            <label for='FormInputTwo' className='form-label'>Birthyear:</label>
            <input
              type='number'
              value={born}
              // Käytetään "valueAsNumber" funktiota, koska tämän avulla varmistetaan että arvo pysyy "Int" tyyppisenä mutaation suorittamista varten.
              onChange={({ target }) => setBorn(target.valueAsNumber)}
              className='form-control'
              id='FormInputTwo'
              placeholder='Type to which year you want to update...'
            />
          </div>
          {name === 'default_value'
            ? <button className='btn btn-sm btn-outline-secondary' disabled>Choose author first</button>
            : <button className='btn btn-sm btn-outline-secondary' type='submit'>Update authors birthyear</button>
          }
        </form>
      </div>
    </div>
  )
}

// Viedään (export) alla oleva komponentti (Authors) sovelluksen käytettäväksi, jotta esim. "App.js" tiedosto pystyy suorittamaan kyseiset funktiot.
export default Authors
