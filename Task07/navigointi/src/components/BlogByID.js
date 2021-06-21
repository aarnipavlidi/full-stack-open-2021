// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react' // Sovellus ottaa "react" nimisen kirjaston käyttöönsä.
import { useDispatch } from 'react-redux' // Komponentti ottaa "useDispatch" funktion käyttöönsä => "react-redux" kirjaston kautta.
import { useParams } from 'react-router-dom' // Otetaan myös käyttöön "useParams()" funktio sovelluksen käytettäväksi. Lisää funktiosta löytyy täältä: https://reactrouter.com/web/api/Hooks/useparams

import { likeValueButton, deleteValueButton } from '../reducers/blogReducer' // Komponentti ottaa "createNewValue" ja "deleteValueButton" funktiot käyttöönsä, joka sijaitsee => "blogReducer.js" tiedostossa.
import { showNotificationSuccess, showNotificationError, hideNotification } from '../reducers/notificationReducer' // Komponentti ottaa "showNotificationSuccess", "showNotificationError" ja "hideNotification" funktiot käyttöönsä, joka sijaitsee => "notificationReducer.js" tiedostossa.

// Alustetaan komponentti "BlogByID", joka suorittaa {...} sisällä olevat asiat aina,
// kun kyseiseen komponenttiin tehdään viittaus. Komponentti saa myös käyttöönsä
// muuttujat "getCurrnetBlogs" ja "getCurrentUser" parametrin arvoksi.
const BlogByID = ({ getCurrentBlogs, getCurrentUser }) => {

  // Alustetaan muuttuja "dispatch", joka suorittaa "useDispatch()" funktion. Tämän avulla sovellus
  // pystyy tekemään muutoksia "storeen" tallennettuihin taulukon arvoihin. Lisää tästä täältä: https://react-redux.js.org/api/hooks#usedispatch
  const dispatch = useDispatch()

  const updateValues = (getCurrentValue) => { // Alustetaan muuttuja "updateValues", joka suorittaa {...} sisällä olevat asiat.
    event.preventDefault() // The event.preventDefault() method stops the default action of an element from happening.

    dispatch(likeValueButton(getCurrentValue)) // Sovellus suorittaa funktion "likeValueButton(...)", joka saa parametrin "getCurrentValue" muuttujan arvon.
    dispatch(showNotificationSuccess(`You have voted for ${getCurrentValue.title}. Thank you for voting! :)`)) // Sovellus suorittaa funktion "showNotificationSuccess(...)", joka saa parametrin "getCurrentValue.content" muuttujan arvon.))
    setTimeout(() => { // Ajastin, joka muuttaa {...} sisällä olevien muuttujien arvot takaisin alkuperäiseen arvoon eli "null".
      console.log('Notification is now hidden from the user! :)') // Tulostetaan kyseinen teksti konsoliin näkyviin.
      dispatch(hideNotification()) // Sovellus suorittaa funktion "hideNotification()", joka piilottaa "popup" viestin pois näkyviltä.
    }, 3000) // Yllä olevat funktiot suoritetaan 3. sek kuluttua.
  }

  const deleteValues = (getCurrentValue) => { // Alustetaan muuttuja "deleteValues", joka suorittaa {...} sisällä olevat asiat.
    event.preventDefault() // The event.preventDefault() method stops the default action of an element from happening.
    // Jos käyttäjä haluaa poistaa tietyn blogin tietokannasta, niin sovellus tekee viittauksen tähän funktioon eli "deleteValues" ja
    // yrittää suorittaa "try{...}" sisällä olevat asiat. Jos sen aikana tulee virheitä, niin siirrytään => "catch(...)" funktion pariin.
    try {
      if (window.confirm(`Are you sure you want to delete ${getCurrentValue.title} from the database?`)) {
        dispatch(deleteValueButton(getCurrentValue.id)) // Sovellus suorittaa funktion "deleteValueButton(...)", joka saa parametrin "getCurrentValue.id" muuttujan arvon.
        dispatch(showNotificationSuccess(`You have successfully deleted ${getCurrentValue.title} from the database! :)`)) // Sovellus suorittaa funktion "showNotificationSuccess(...)", joka saa parametrin "getCurrentValue.content" muuttujan arvon.))
        setTimeout(() => { // Ajastin, joka muuttaa {...} sisällä olevien muuttujien arvot takaisin alkuperäiseen arvoon eli "null".
          console.log('Notification is now hidden from the user! :)') // Tulostetaan kyseinen teksti konsoliin näkyviin.
          dispatch(hideNotification()) // Sovellus suorittaa funktion "hideNotification()", joka piilottaa "popup" viestin pois näkyviltä.
        }, 3000) // Yllä olevat funktiot suoritetaan 3. sek kuluttua.
      }
    } catch (error) { // Mikäli tulee virheitä, niin catch(...) funktion avulla suoritetaan {...} sisällä olevat asiat.
      dispatch(showNotificationError(`There was a problem deleting ${getCurrentValue.title} from the database. Please try again later! :)`))
      setTimeout(() => { // Ajastin, joka muuttaa {...} sisällä olevien muuttujien arvot takaisin alkuperäiseen arvoon eli "null".
        console.log('Notification is now hidden from the user! :)') // Tulostetaan kyseinen teksti konsoliin näkyviin.
        dispatch(hideNotification()) // Sovellus suorittaa funktion "hideNotification()", joka piilottaa "popup" viestin pois näkyviltä.
      }, 3000) // Yllä olevat funktiot suoritetaan 3. sek kuluttua.
    }
  }

  const getCurrentBlogID = useParams().id // Alustetaan muuttuja "getCurrentBlogID, joka on yhtä kuin "useParams().id" muuttujan arvo.

  // Alustetaan muuttuja "getCurrentBlogData", joka on yhtä kuin kyseinen funktio.
  // Muuttuja etsii siis "getCurrentBlogs" arvosta id:n objektin arvon, joka on yhtä
  // kuin "getCurrentBlogID" muuttujan kanssa. Jos käyttäjä klikkaa sovelluksessa
  // käyttäjää, jonka id:n arvo on esim. "609a60df12b0752498de41df", niin tämä
  // muuttuja saa taulukon, joka viittaa kyseiseen id:n arvoon. Mukana tulee siis
  // "likes", "title", "author", "url", "user" sekä "id" objektien arvot!
  const getCurrentBlogData = getCurrentBlogs.find(results => results.id === getCurrentBlogID)

  // Jos "getCurrnetBlogData" on tyhjä, niin komponentti renderöi {...} sisällä olevat asiat takaisin käyttäjälle.
  if (!getCurrentBlogData) {
    return (
      <div className='container'>
        <h3>There was a problem, while searching data from current blog! :(</h3>
      </div>
    )
  }

  // Jos alla oleva if-ehto toteutuu, eli "getCurrentUser.username" on yhtä kuin
  // "getCurrentBlogData.user.username" muuttujan kanssa, niin komponentti renderöi
  // {...} sisällä olevat asiat. Olemme luoneet tämän sen takia, että varmistetaan
  // että blogin alkuperäinen käyttäjä (joka on luonut sen alunperin tietokantaan),
  // niin pystyy ainoastaan poistamaan kyseisen arvon tietokannasta.
  if (getCurrentUser.username === getCurrentBlogData.user.username) {
    return (
      <div className='container'>
        <h3>{getCurrentBlogData.title}</h3>
        <div>
          <ul className='list-group'>
            <li className='list-group-item'>{getCurrentBlogData.url}</li>
            <li className='list-group-item'>has total of {getCurrentBlogData.likes} likes!</li>
            <li className='list-group-item'>is added by {getCurrentBlogData.author}</li>
          </ul>
        </div>
        <div className='mt-3 d-flex justify-content-start'>
          <button type='button' className='btn btn-secondary me-3' onClick={() => updateValues(getCurrentBlogData)}>Give a like!</button>
          <button type='button' className='btn btn-secondary' onClick={() => deleteValues(getCurrentBlogData)}>Delete blog?</button>
        </div>
      </div>
    )
  }

  // Muussa tapauksessa, jos mikään yllä olevista if-ehdoista ei toteudu, niin komponentti
  // renderöi (...) sisällä olevat asiat takaisin käyttäjälle näkyviin.
  return (
    <div className='container'>
      <h3>{getCurrentBlogData.title}</h3>
      <div>
        <ul className='list-group'>
          <li className='list-group-item'>{getCurrentBlogData.url}</li>
          <li className='list-group-item'>has total of {getCurrentBlogData.likes}</li>
          <li className='list-group-item'>is added by {getCurrentBlogData.author}</li>
        </ul>
      </div>
      <div className='mt-3 d-flex justify-content-start'>
        <button type='button' className='btn btn-secondary me-3' onClick={() => updateValues(getCurrentBlogData)}>Give a like!</button>
      </div>
    </div>
  )
}

// Viedään (export) alla oleva komponentti (BlogByID) sovelluksen käytettäväksi, jotta esim. "App.js" tiedosto pystyy suorittamaan kyseiset funktiot.
export default BlogByID
