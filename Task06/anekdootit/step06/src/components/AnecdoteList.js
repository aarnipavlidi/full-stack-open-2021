// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react'; // Komponentti ottaa "react" nimisen kirjaston käyttöönsä.
import { useSelector, useDispatch } from 'react-redux' // Komponentti ottaa "useSelector" ja "useDispatch" funktiot käyttöönsä => "react-redux" kirjaston kautta.
import { likeValueButton } from '../reducers/anecdoteReducer' // Komponentti ottaa "likeValueButton" funktion käyttöönsä, joka sijaitsee => "anecdoteReducer.js" tiedostossa.

const AnecdoteList = () => {
  // Alustetaan muuttuja "anecdotes", joka suorittaa "useSelector(...)" funkion. Tämän avulla päästään
  // käsiksi "storeen" tallennettuun taulukon arvoihin. Lisää tästä täältä: https://react-redux.js.org/api/hooks#useselector
  const anecdotes = useSelector(state => state)
  console.log(anecdotes.sort((a, b) => b.votes - a.votes))
  // Alustetaan muuttuja "dispatch", joka suorittaa "useDispatch()" funktion. Tämän avulla sovellus
  // pystyy tekemään muutoksia "storeen" tallennettuihin  taulukon arvoihin. Lisää tästä täältä: https://react-redux.js.org/api/hooks#usedispatch
  const dispatch = useDispatch()

  // Tehtävää: "6.5*: anekdootit, step3" varten, olemme muokanneet koodia hieman, niin että
  // sovellus renderöi arvot äänten ("votes" objektin) mukaisessa suuruusjärjestyksessä.
  // Funtion "sort(...)" sisältä löytyy paremetrit => "a" sekä "b", missä "a" tarkoittaa
  // ensimmäistä elementtiä vertailua varten ja "b" toista elementtiä vertailua varten.
  // Kun "vertailu" on luotu, niin luodaan sen pohjalta uusi taulukko "map(...)" funktion
  // avulla, joka renderöi käyttäjälle näkyviin sen hetkiset arvot suuruusjärjestyksessä.

  // Komponentti renderöi käyttäjälle näkyviin (...) sisällä olevat asiat.
  return (
    <div>
      {anecdotes.sort((a, b) => b.votes - a.votes).map(results =>
        <div key={results.id}>
          <div>
            <h2>{results.content}</h2>
          </div>
          <div>
            <p>Content has been voted for total of {results.votes} times <button onClick={() => dispatch(likeValueButton(results.id))}>vote</button></p>
          </div>
        </div>
      )}
    </div>
  )
}

// Viedään (export) alla oleva komponentti (AnecdoteList) sovelluksen käytettäväksi, jotta esim. "App.js" tiedosto pystyy suorittamaan kyseiset funktiot.
export default AnecdoteList
