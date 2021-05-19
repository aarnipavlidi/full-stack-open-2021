// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react'; // Komponentti ottaa "react" nimisen kirjaston käyttöönsä.
import { useDispatch } from 'react-redux' // Komponentti ottaa "useDispatch" funktion käyttöönsä => "react-redux" kirjaston kautta.

import { createNewValue } from '../reducers/anecdoteReducer' // Komponentti ottaa "createNewValue" funktion käyttöönsä, joka sijaitsee => "anecdoteReducer.js" tiedostossa.
import { showNotificationAdded, hideNotification } from '../reducers/notificationReducer' // Komponentti ottaa "showNotificationAdded" ja "hideNotification" funktiot käyttöönsä, joka sijaitsee => "anecdoteReducer.js" tiedostossa.

import anecdotesService from '../services/anecdotes' // Alustetaan muuttuja "anecdotesService", joka hyödyntää "anecdotes.js" (erillinen moduuli) tiedostoa eli => "./services/anecdotes.js".

const AnecdoteForm = () => { // Alustetaan "AnecdoteForm" niminen komponentti, joka suorittaa {...} sisällä olevat asiat.
  // Alustetaan muuttuja "dispatch", joka suorittaa "useDispatch()" funktion. Tämän avulla sovellus
  // pystyy tekemään muutoksia "storeen" tallennettuihin  taulukon arvoihin. Lisää tästä täältä: https://react-redux.js.org/api/hooks#usedispatch
  const dispatch = useDispatch()

  // Alustetaan muuttuja "addValue", joka suorittaa {...} sisällä olevat asiat,
  // aina kun kyseiseen funktioon tehdään viittaus eli aina kun, käyttäjä klikkaa
  // painiketta, niin suoritetaan kyseinen funktio ja lopuksi viedään tiedot
  // eteenpäin => "createNewValue(...)" funktiota varten, jotta uusi arvo näkyy sivulla.
  const addValue = async (event) => {
    event.preventDefault() // The event.preventDefault() method stops the default action of an element from happening.
    // Ota myös huomioon, että alla olevan input:in => "name" arvo on yhtä kuin "newText", jos sitä ei olisi tai on väärä, niin tulee erroria! :)
    const getContent = event.target.newText.value // Alustetaan muuttuja "getContent", joka saa sen hetkisen arvon, minkä käyttäjä laittaa => input:in arvoksi.
    event.target.newText.value = '' // Sovellus tyhjentää kyseisen input:in arvon, sen jälkeen kun yllä oleva muuttuja on saanut arvon.
    // Alustetaan muuttuja "getValueDatabase", joka suorittaa alla olevan funktion. Kun käyttäjä
    // luo uuden arvon, niin se arvo tallennetaan tietokantaan ja kun se on suoritettu loppuun
    // (await:in takia), niin muuttujan => "getValueDatabase" avulla me suoritetaan "dispatch(...)"
    // funktio ja renderöidään takaisin käyttäjälle näkyviin juuri luotu arvo!
    const getValueDatabase = await anecdotesService.createNewValueDatabase(getContent)
    dispatch(createNewValue(getValueDatabase)) // Sovellus suorittaa funktion "createNewValue(...)", joka saa parametrin "getValueDatabase" muuttujan arvon.
    console.log('Notification for adding new content, is now visible! :)') // Tulostetaan kyseinen teksti konsoliin näkyviin.
    dispatch(showNotificationAdded(getContent)) // Sovellus suorittaa funktion "showNotificationAdded(...)", joka saa parametrin "getContent" muuttujan arvon.
    setTimeout(() => { // Kun käyttäjä lisää uuden arvon, niin kyseinen funktio odottaa 5 sek. ja tämän jälkeen suoritetaan {...} sisällä oleva asia.
      console.log('Notification is now hidden from the user! :)') // Tulostetaan kyseinen teksti konsoliin näkyviin.
      dispatch(hideNotification()) // Sovellus suorittaa funktion "hideNotification()", joka piilottaa "popup" viestin pois näkyviltä.
    }, 5000)
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
