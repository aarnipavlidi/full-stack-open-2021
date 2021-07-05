// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React, { useState } from 'react' // Otetaan käyttöön "react" niminen kirjasto sekä "useState" funktio sovellusta varten.
import { useMutation } from '@apollo/client' // Sovellus ottaa käyttöön kyseiset funktiot "@apollo/client" kirjaston kautta.
import { ALL_AUTHORS, ALL_BOOKS, CREATE_NEW_BOOK } from '../queries' // Sovellus ottaa käyttöön kyseiset funktiot "queries.js" tiedostosta.

// Alustetaan "NewBook" komponetti, joka suorittaa {...} sisällä olevat asiat, kun siihen tehtään vittaus.
// Komponentti saa myös käyttöönsä "showNewBook", "setNotification" sekä "updateRecommendedBooks" parametrin arvot.
const NewBook = ({ showNewBook, setNotification, updateRecommendedBooks }) => {
  const [title, setTitle] = useState('') // Alustetaan muuttuja "title" tilaan, joka saa oletuksena arvon => ''.
  const [author, setAuthor] = useState('') // Alustetaan muuttuja "author" tilaan, joka saa oletuksena arvon => ''.
  const [published, setPublished] = useState('') // Alustetaan muuttuja "published" tilaan, joka saa oletuksena arvon => ''.
  const [genre, setGenre] = useState('') // Alustetaan muuttuja "genre" tilaan, joka saa oletuksena arvon => ''.
  const [genres, setGenres] = useState([]) // Alustetaan muuttuja "genres" tilaan, joka saa oletuksena tyhjän taulukon arvon.

  // Alustetaan muuttuja "createBook", joka suorittaa kyseisen funktion/mutaation eli,
  // kun käyttäjä luo uuden arvon tietokantaan, niin suoritetaan "CREATE_NEW_BOOK"
  // mutaatio ja lopuksi vielä "päivitetään" sekä kirjojen että kirjailijoiden
  // tietokanta, jotta viimeisin/uusin arvo on päivitetty käyttäjälle. Ota myös
  // huomioon, että alhaalla on erikseen luotu "createBook(...)", jonka sisälle
  // alustettu muuttujien arvot. Näiden avulla nämä arvot sijoittuvat =>
  // mutaation suorittamista varten, jotta "oikeat" arvot tallentuvat tietokantaan.
  const [ createBook ] = useMutation(CREATE_NEW_BOOK, {
    refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }],
    onError: (error) => { // Jos kirjautumisen aikana tulee ongelmia, niin suoritetaan {...} sisällä olevat asiat.
      setNotification({ // Suoritetaan "setNotification(...)" funktio, joka saa käyttöönsä kyseiset objektien arvot.
        message: error.message,
        status: false
      })
    }
 })

  // Mikäli if-ehto toteutuu eli => "showNewBook" ei ole yhtä kuin => "add" arvo, niin sovellus suorittaa {...} sisällä olevan asian.
  if (!showNewBook) {
    return null
  }

  // Alustetaan muuttuja "submitBook", joka suorittaa {...} sisällä olevat asiat aina,
  // kun kyseiseen funktioon tehdään viittaus.
  const submitBook = async (event) => {
    event.preventDefault() // The event.preventDefault() method stops the default action of an element from happening.
    // Kun funktioon tehdään viittaus (submitBook), niin ensin yritetään suorittaa "try {...}" sisällä
    // olevat asiat. Jos sen aikana tulee virheitä, niin suoritetaan "catch {...}" sisällä olevat asiat.
    try {
      // Suoritetaan "createBook(...)" funktio, joka saa käyttöönsä alla olevat muuttujat.
      createBook({
        variables: {
          title, // eli "title" siirtyy => "$title" arvoon (CREATE_NEW_BOOK:in mutaatio).
          published, // eli "published" siirtyy => "$published" arvoon (CREATE_NEW_BOOK:in mutaatio).
          author, // eli "author" siirtyy => "$author" arvoon (CREATE_NEW_BOOK:in mutaatio).
          genres // eli "genres" siirtyy => "$genres" arvoon (CREATE_NEW_BOOK:in mutaatio).
        }
      })
      // Suoritetaan "updateRecommendedBooks(...)" funktio aina kun käyttäjä lisännyt uuden
      // kirjan onnistuneesti tietokantaan. Funktio ottaa kyseisen tekstin ja muuttaa "App.js"
      // tiedostossa olevaa "update" muuttujan tilaa. Muuttuja saa oletuksena aina arvon "null"
      // ja mikäli sovelluksen aikana kyseisessä muuttujassa tapahtuu muutoksia, niin suoritetaan
      // => "RecommendedBooks.js" tiedossa oleva => "useEffect(...)" funktio, mikä päivittää
      // kirjautuneelle käyttäjälle suunnatut kirjat "genren" mukaisesti!
      updateRecommendedBooks('Updating recommended books for current user! :)')
      setNotification({ // Suoritetaan "setNotification(...)" funktio, joka saa käyttöönsä kyseiset objektien arvot.
        message: `You have successfully added new book called ${title} to the database! :)`,
        status: true
      })
    } catch (error) { // Jos funktion aikana tulee virheitä, niin suoritetaan {...} sisällä olevat asiat.
      setNotification({ // Suoritetaan "setNotification(...)" funktio, joka saa käyttöönsä kyseiset objektien arvot.
        message: error.message,
        status: false
      })
    } // Catch:in funktio loppuu tähän.
    setTitle('') // Kun uusi arvo on lisätty tietokantaan, niin tyhjennetään muuttujan arvo takaisin alkuperäiseen tilaan.
    setPublished('') // Kun uusi arvo on lisätty tietokantaan, niin tyhjennetään muuttujan arvo takaisin alkuperäiseen tilaan.
    setAuthor('') // Kun uusi arvo on lisätty tietokantaan, niin tyhjennetään muuttujan arvo takaisin alkuperäiseen tilaan.
    setGenres([]) // Kun uusi arvo on lisätty tietokantaan, niin tyhjennetään muuttujan arvo takaisin alkuperäiseen tilaan.
    setGenre('') // Kun uusi arvo on lisätty tietokantaan, niin tyhjennetään muuttujan arvo takaisin alkuperäiseen tilaan.
  }

  // Alustetaan muuttuja "addGenre", joka suorittaa {...} sisällä olevat asiat aina,
  // kun kyseiseen funktioon tehdään viittaus. Funktion tarkoituksena on toimia niin,
  // että jos käyttäjä haluaa lisätä useamman arvon (genre) muuttujan alle, niin tämän
  // avulla lisätään kaikki arvot samaan taulukkoon. Muista, että olemme aikaisemmin
  // alustaneet kirjojen tietokannan niin, että "genres" objektista löytyy taulukko eli
  //    genres: [
  //      ensimmmäinen arvo,
  //      toinen arvo,
  //      kolmas arvo
  //     ]
  // Tämän avulla saadaan useampi genren arvo saman objektin alle, jos käyttäjä lisää.
  const addGenre = () => {
    setGenres(genres.concat(genre)) // Muutetaan "genres" muuttujan tilaa lisäämällä nykyisen "genre" muuttujan datan "genres" muuttujan perään.
    setGenre('') // Kun uusi genren arvo on lisätty "talteen", niin tyhjennetään muuttujan arvo takaisin alkuperäiseen tilaan.
  }

  // Komponentti "NewBook" renderöi (...) sisällä olevat asiat takaisin käyttäjälle näkyviin.
  return (
    <div className='container mt-3'>
      <form onSubmit={submitBook}>
        <div className='mb-3'>
          <label for='FormInputOne' className='form-label'>Title:</label>
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            className='form-control'
            id='FormInputOne'
            placeholder='Add new book title here...'
          />
        </div>
        <div className='mb-3'>
          <label for='FormInputTwo' className='form-label'>Author:</label>
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            className='form-control'
            id='FormInputTwo'
            placeholder='Add new book author here...'
          />
        </div>
        <div className='mb-3'>
          <label for='FormInputThree' className='form-label'>Published:</label>
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(target.valueAsNumber)}
            className='form-control'
            id='FormInputThree'
            placeholder='Add new book published year here...'
          />
        </div>
        <div className='mb-3'>
          <label for='FormInputFour' className='form-label'>Genre:</label>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
            className='form-control'
            id='FormInputFour'
            placeholder='Add new book genre here...'
          />
          <button className='btn btn-sm btn-outline-secondary mt-2' onClick={addGenre} type='button'>Add new genre</button>
        </div>
        <div className='mt-3'>
          {genres.length === 0 ? null : <p>Current genres added: {genres.join(' ')}</p>}
        </div>
        <div className='text-center'>
          {genres.length === 0
            ? <button className='btn btn-sm btn-outline-secondary' disabled type='submit'>Add genre for a book</button>
            : <button className='btn btn-sm btn-outline-secondary' type='submit'>Create a new book</button>
          }
        </div>
      </form>
    </div>
  )
}

// Viedään (export) alla oleva komponentti (NewBook) sovelluksen käytettäväksi, jotta esim. "App.js" tiedosto pystyy suorittamaan kyseiset funktiot.
export default NewBook
