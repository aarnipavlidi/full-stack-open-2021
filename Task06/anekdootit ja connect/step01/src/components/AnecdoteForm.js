// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react'; // Komponentti ottaa "react" nimisen kirjaston käyttöönsä.
import { useDispatch } from 'react-redux' // Komponentti ottaa "useDispatch" funktion käyttöönsä => "react-redux" kirjaston kautta.

import { createNewValue } from '../reducers/anecdoteReducer' // Komponentti ottaa "createNewValue" funktion käyttöönsä, joka sijaitsee => "anecdoteReducer.js" tiedostossa.
import { showNotificationMessage } from '../reducers/notificationReducer' // Komponentti ottaa "showNotificationMessage" funktion käyttöönsä, joka sijaitsee => "anecdoteReducer.js" tiedostossa.

const AnecdoteForm = () => { // Alustetaan "AnecdoteForm" niminen komponentti, joka suorittaa {...} sisällä olevat asiat.
  // Alustetaan muuttuja "dispatch", joka suorittaa "useDispatch()" funktion. Tämän avulla sovellus
  // pystyy tekemään muutoksia "storeen" tallennettuihin  taulukon arvoihin. Lisää tästä täältä: https://react-redux.js.org/api/hooks#usedispatch
  const dispatch = useDispatch()

  // Alustetaan muuttuja "addValue", joka suorittaa {...} sisällä olevat asiat,
  // aina kun kyseiseen funktioon tehdään viittaus eli aina kun, käyttäjä klikkaa
  // painiketta, niin suoritetaan kyseinen funktio ja lopuksi viedään tiedot
  // eteenpäin => "createNewValue(...)" funktiota varten, jotta uusi arvo näkyy sivulla.
  // Muuttuja "addValue" myös suorittaa funktion => "showNotificationMessage(...)",
  // joka saa käyttöönsä kaksi (2) erilaista parametrin arvoa sovelluksen käytettäväksi.
  const addValue = async (event) => {
    event.preventDefault() // The event.preventDefault() method stops the default action of an element from happening.
    // Ota myös huomioon, että alla olevan input:in => "name" arvo on yhtä kuin "newText", jos sitä ei olisi tai on väärä, niin tulee erroria! :)
    const getContent = event.target.newText.value // Alustetaan muuttuja "getContent", joka saa sen hetkisen arvon, minkä käyttäjä laittaa => input:in arvoksi.
    event.target.newText.value = '' // Sovellus tyhjentää kyseisen input:in arvon, sen jälkeen kun yllä oleva muuttuja on saanut arvon.
    dispatch(createNewValue(getContent)) // Sovellus suorittaa funktion "createNewValue(...)", joka saa parametrin "getContent" muuttujan arvon.
    dispatch(showNotificationMessage(`You have added ${getContent} to the database. Thank you for adding!`, 10)) // Sovellus suorittaa funktion "showNotificationMessage(...)", joka saa parametrin "getContent" muuttujan arvon.
  }

  // Komponentti renderöi käyttäjälle näkyviin (...) sisällä olevat asiat.
  return (
    <div>
      <form onSubmit={addValue}>
        <input name='newText' />
        <button type='submit'>Add new text</button>
      </form>
    </div>
  )
}

// Viedään (export) alla oleva komponentti (AnecdoteForm) sovelluksen käytettäväksi, jotta esim. "App.js" tiedosto pystyy suorittamaan kyseiset funktiot.
export default AnecdoteForm
