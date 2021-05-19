// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react'; // Komponentti ottaa "react" nimisen kirjaston käyttöönsä.
import { useSelector, useDispatch } from 'react-redux' // Komponentti ottaa "useSelector" ja "useDispatch" funktiot käyttöönsä => "react-redux" kirjaston kautta.
import { likeValueButton } from '../reducers/anecdoteReducer' // Komponentti ottaa "likeValueButton" funktion käyttöönsä, joka sijaitsee => "anecdoteReducer.js" tiedostossa.

import { showNotificationVoted, hideNotification } from '../reducers/notificationReducer' // Komponentti ottaa "showNotificationVoted" ja "hideNotification" funktiot käyttöönsä, joka sijaitsee => "notificationReducer.js" tiedostossa.

const AnecdoteList = () => { // Alustetaan "AnecdoteList" niminen komponentti, joka suorittaa {...} sisällä olevat asiat.
  // Alustetaan muuttuja "anecdotes", joka suorittaa "useSelector(...)" funkion. Tämän avulla päästään
  // käsiksi "storeen" tallennettuun taulukon arvoihin. Lisää tästä täältä: https://react-redux.js.org/api/hooks#useselector
  // Ota myös huomioon, että käytämme alla olevan funktion sisällä => "state.values",
  // koska olemme asettaneet aikaisemmin storeen (store.js) kyseisen objektin arvon.
  const anecdotes = useSelector(state => state.values)
  // Alustetaan muuttuja "dispatch", joka suorittaa "useDispatch()" funktion. Tämän avulla sovellus
  // pystyy tekemään muutoksia "storeen" tallennettuihin  taulukon arvoihin. Lisää tästä täältä: https://react-redux.js.org/api/hooks#usedispatch
  const dispatch = useDispatch()

  // Alustetaan muuttuja "voteButton", joka suorittaa {...} sisällä olevat asiat aina kun kyseiseen
  // funktioon tehdään viittaus. Funktio saa myös käyttöönsä parametrien => "getClickedID" sekä
  // "getClickedContent" arvot. Ota huomioon, että "getClickedID" on yhtä kuin => "results.id"
  // ja "getClickedContent" on yhtä kuin => "results.content". Funktion tarkoituksena on toimia
  // niin, että aina kun käyttäjä äänestää tiettyä tekstiä, niin funktio suorittaa kaksi (2)
  // => "dispatch(...)" funktiota ja lopuksi 5 sek. kuluttua viimeisen funktion.
  const voteButton = (getClickedID, getClickedContent) => {
    dispatch(likeValueButton(getClickedID)) // Sovellus suorittaa funktion "likeValueButton(...)", joka saa parametrin "id" muuttujan arvon.
    dispatch(showNotificationVoted(getClickedContent)) // Sovellus suorittaa funktion "showNotificationVoted(...)", joka saa parametrin "getContent" muuttujan arvon.
    console.log('Notification for voting specific content, is now visible! :)') // Tulostetaan kyseinen teksti konsoliin näkyviin.
    setTimeout(() => { // Kun käyttäjä äänestää tiettyä arvoa, niin kyseinen funktio odottaa 5 sek. ja tämän jälkeen suoritetaan {...} sisällä oleva asia.
      console.log('Notification is now hidden from the user! :)') // Tulostetaan kyseinen teksti konsoliin näkyviin.
      dispatch(hideNotification()) // Sovellus suorittaa funktion "hideNotification()", joka piilottaa "popup" viestin pois näkyviltä.
    }, 5000)
  }

  // Tehtävää: "6.5*: anekdootit, step3" varten, olemme muokanneet koodia hieman, niin että
  // sovellus renderöi arvot äänten ("votes" objektin) mukaisessa suuruusjärjestyksessä.
  // Funtion "sort(...)" sisältä löytyy paremetrit => "a" sekä "b", missä "a" tarkoittaa
  // ensimmäistä elementtiä vertailua varten ja "b" toista elementtiä vertailua varten.
  // Kun "vertailu" on luotu, niin luodaan sen pohjalta uusi taulukko "map(...)" funktion
  // avulla, joka renderöi käyttäjälle näkyviin sen hetkiset arvot suuruusjärjestyksessä.

  const getFilterValueFromStore = useSelector(state => state.filter) // Alustetaan muuttuja "getFilterValueFromStore", joka on yhtä kuin "storessa" sijaitsevan => "filter" objektin arvo.

  // Tehtävää: "6.12* paremmat anekdootit, step10" varten, olemme muokanneet koodia hieman,
  // niin että sovellus renderöi lukemat sen mukaan, mitä input:in arvoksi käyttäjä laittaa.
  // Olemme alustaneet sitä varten muuttujan "getFilterValueFromStore", joka on oletuksena
  // arvoa '' eli sovellus renderöi kaikki nykyiset arvot näkyviin käyttäjälle. Jos käyttäjä
  // kirjoittaa jotain input:iin, niin sen hetkinen arvo näkyy storessa => "filter" objektissa.
  // Haluamme filtteröidä arvot "content" objektin mukaan ja varmistamme, että kyseisen objektin
  // arvot muutetaan pieniksi kirjaimiksi "toLowerCase()" funktion avulla sekä teemme tämän myös
  // input:in arvon suhteen. Me teemme tämän sen takia, koska emme voi olettaa haluaako käyttäjä
  // kirjoittaa inputtiin joko pienillä tai isoilla kirjaimilla! :)

  // Komponentti renderöi käyttäjälle näkyviin (...) sisällä olevat asiat.
  return (
    <div>
      {anecdotes.filter(filterValue => filterValue.content.toLowerCase().includes(getFilterValueFromStore.toLowerCase())).sort((a, b) => b.votes - a.votes).map(results =>
        <div key={results.id}>
          <div>
            <h2>{results.content}</h2>
          </div>
          <div>
            <p>Content has been voted for total of {results.votes} times <button onClick={() => voteButton(results.id, results.content)}>vote</button></p>
          </div>
        </div>
      )}
    </div>
  )
}

// Viedään (export) alla oleva komponentti (AnecdoteList) sovelluksen käytettäväksi, jotta esim. "App.js" tiedosto pystyy suorittamaan kyseiset funktiot.
export default AnecdoteList
