// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React, { useState } from 'react' // Sovellus ottaa "react" nimisen kirjaston käyttöönsä, joka myös hyödyntää "useState" funktiota.
import { useDispatch } from 'react-redux' // Komponentti ottaa "useDispatch" funktion käyttöönsä => "react-redux" kirjaston kautta.
import PropTypes from 'prop-types' // Sovellus ottaa "prop-types" nimisen kirjanston käyttöönsä.

import { likeValueButton, deleteValueButton } from '../reducers/blogReducer' // Komponentti ottaa "createNewValue" ja "deleteValueButton" funktiot käyttöönsä, joka sijaitsee => "blogReducer.js" tiedostossa.
import { showNotificationSuccess, showNotificationError, hideNotification } from '../reducers/notificationReducer' // Komponentti ottaa "showNotificationSuccess", "showNotificationError" ja "hideNotification" funktiot käyttöönsä, joka sijaitsee => "notificationReducer.js" tiedostossa.

// Alustetaan "Blog" niminen muuttuja (komponentti), joka renderöi {...} sisällä olevat, kun siihen tehdään viittaus.
// Komponentti hyödyntää myös "propsina" muuttujan "value" arvoa. Kun kyseinen komponentti renderöidään sovellukseen,
// niin "propsin" arvo => "value" on yhtä kuin => "Blogs" ("results" on muuttujan arvo "map()" funktion takia).

const Blog = ({ value, currentUser }) => {
  // Jokainen tietokannassa oleva arvo, näkyy sivulla omassa komponentissa ja sitä kautta alla olevan muuttujan avulla omassa tilassa eli,
  // jos tietokannasta löytyy 3 erilaista arvoa, niin sivulle renderöidään kolme (3) komponenttia ja jokainen on omassa tilassa. Tämä
  // tarkoittaa sitä, että kun käyttäjä haluaa nähdä lisää tietoja tietysti blogista, niin sen kyseisen komponentin tilaa muutetaan
  // ainoastaan. Muuttujan arvo voi olla ainoastaan joko "false" tai "true". Jokaisen komponentin osalta muuttuja on oletuksena arvoa "false".
  const [blogValues, setBlogValues] = useState(false)

  const blogStyle = { // Alustetaan muuttuja "blogStyle", joka hyödyntää alla olevia asetuksia (css), kun komponentti renderöidään.
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    borderColor: '#778899',
    marginBottom: 5,
    backgroundColor: '#dcdcdc',
    boxShadow: 'rgb(128,128,128) 0px 5px 15px'
  }

  // Kun käyttäjä painaa "more info" painiketta, niin sovellus renderöi käyttäjälle => "<div style={showRest}" elementin takaisin. Tämä johtuu
  // siitä, että muuttujan "blogValues" tilaa muutetaan arvoon => "true" joten alla oleva if-ehto toteutuu eli näytetään => '' arvo.
  const showRest = { display: blogValues ? '' : 'none' } // Alustetaan muuttuja "showRest", joka noudattaa {...} sisällä olevaa CSS-määrittelyä.

  // Kun käyttäjä painaa "less info" painiketta, niin sovellus renderöi käyttäjälle => "<div style={hideRest}" elementin takaisin. Tämä johtuu
  // siitä, että muuttujan "blogValues" tilaa muutetaan arvoon => "false" joten alla oleva if-ehto ei toteudu eli näytetään => '' arvo.
  const hideRest = { display: blogValues ? 'none' : '' } // Alustetaan muuttuja "hideRest", joka noudattaa {...} sisällä olevaa CSS-määrittelyä.

  // Alustetaan muuttuja "dispatch", joka suorittaa "useDispatch()" funktion. Tämän avulla sovellus
  // pystyy tekemään muutoksia "storeen" tallennettuihin  taulukon arvoihin. Lisää tästä täältä: https://react-redux.js.org/api/hooks#usedispatch
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

  const buttonShowContent = () => { // Alustetaan muuttuja "buttonShowContent", joka suorittaa {...} sisällä olevat asiat, kun kyseiseen funktioon tehdään viittaus.
    setBlogValues(true) // Muutetaan muuttujan "blogValues" tilaa, jossa nykyinen arvo muutetaan arvoon => "true".
  }

  const buttonHideContent = () => { // Alustetaan muuttuja "buttonHideContent", joka suorittaa {...} sisällä olevat asiat, kun kyseiseen funktioon tehdään viittaus.
    setBlogValues(false) // Muutetaan muuttujan "blogValues" tilaa, jossa nykyinen arvo muutetaan arvoon => "false".
  }

  // Sovellus renderöi alla olevan asian, jos kyseinen if-ehto toteutuu eli "currentUser.username" on yhtä kuin "value.user.username".
  // Jos nykyinen käyttäjä, joka on kirjautunut sisään, niin on blogin alkuperäinen luoja, niin sovellus renderöi painikkeen, jotta
  // pystyy tarvittaessa poistamaan sen. Muussa tapauksessa renderöidään sama asia, mutta ilman painiketta. Ota myös huomioon, että
  // "currentUser" (propsi) viittaa => "userInfo" muuttujaan ja "value" (propsi) viittaa => "results" muuttujaan.
  if (currentUser.username === value.user.username) {
    return (
      <div style={blogStyle}>
        <div style={showRest}>
          <p>{value.title} <button onClick={buttonHideContent}>less info</button></p>
          <p>is made by author called: {value.author}</p>
          <p>and blog is located at {value.url}</p>
          <p>which has total of {value.likes} likes! <button onClick={() => updateValues(value)}>Give a like!</button></p>
          <button onClick={() => deleteValues(value)}>Remove</button>
        </div>
        <div style={hideRest}>
          <p>{value.title} <button onClick={buttonShowContent}>more info</button></p>
        </div>
      </div>
    )
  }

  return (
    <div style={blogStyle} className='blogs'>
      <div style={showRest}>
        <p>{value.title} <button onClick={buttonHideContent}>less info</button></p>
        <p>is made by author called: {value.author}</p>
        <p>and blog is located at {value.url}</p>
        <p id={value.title}>which has total of {value.likes} likes! <button onClick={updateValues}>Give a like!</button></p>
      </div>
      <div style={hideRest}>
        <p>{value.title} by {value.author} <button onClick={buttonShowContent}>more info</button></p>
      </div>
    </div>
  )
}

// Määritellään "Blog" komponentille alla oleville objekteille "PropTypet". Tämän avulla voidaan
// varmistaa, että nämä kyseiset "propsit" on alustettu sovelluksessa (App.js) ja, että ne on
// noudattaa tiettyä datan muotoa, esim. => muuttuja "updateBlogLikes" on funktio.
Blog.propTypes = {
  value: PropTypes.object.isRequired,
  updateBlogLikes: PropTypes.func,
  currentUser: PropTypes.object.isRequired,
  deleteCurrentValue: PropTypes.func
}

// Viedään (export) alla oleva komponentti (Blog) sovelluksen käytettäväksi, jotta esim. "App.js" tiedosto pystyy suorittamaan kyseiset funktiot.
export default Blog
