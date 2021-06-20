// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react' // Komponentti ottaa "react" nimisen kirjaston käyttöönsä.
import { useDispatch } from 'react-redux' // Komponentti ottaa "useDispatch" funktion käyttöönsä => "react-redux" kirjaston kautta.
import PropTypes from 'prop-types' // Sovellus ottaa "prop-types" nimisen kirjanston käyttöönsä.

import { createNewValue } from '../reducers/blogReducer' // Komponentti ottaa "createNewValue" funktion käyttöönsä, joka sijaitsee => "blogReducer.js" tiedostossa.
import { showNotificationSuccess, hideNotification } from '../reducers/notificationReducer' // Komponentti ottaa "showNotificationSuccess", "showNotificationError" ja "hideNotification" funktiot käyttöönsä, joka sijaitsee => "notificationReducer.js" tiedostossa.

// Alustetaan "BlogForm" niminen muuttuja (komponentti), joka renderöi {...} sisällä olevat, kun siihen tehdään viittaus.
// Komponentti myös hyödyntää "propsina" alla olevan muuttujan arvoa eli, kun komponenttia renderöidään sovelluksessa,
// niin "createBlogValue" on yhtä kuin => "addBlogValue" (App.js) muuttujan arvo.
const BlogForm = () => {
  // Alustetaan muuttuja "dispatch", joka suorittaa "useDispatch()" funktion. Tämän avulla sovellus
  // pystyy tekemään muutoksia "storeen" tallennettuihin  taulukon arvoihin. Lisää tästä täältä: https://react-redux.js.org/api/hooks#usedispatch
  const dispatch = useDispatch()

  // Alustetaan muuttuja "addBlogValue", joka suorittaa {...} sisällä olevat asiat,
  // aina kun kyseiseen funktioon tehdään viittaus eli aina kun, käyttäjä klikkaa
  // painiketta, niin suoritetaan kyseinen funktio ja lopuksi viedään tiedot
  // eteenpäin => "createNewValue(...)" funktiota varten, jotta uusi arvo näkyy sivulla.
  const addBlogValue = (event) => {
    event.preventDefault() // The event.preventDefault() method stops the default action of an element from happening.

    // Alustetaan muuttuja "getBlogContent", joka saa käyttöönsä alla olevat objektien arvot
    // käyttöönsä. Kun käyttäjä lisää uuden arvon tietokantaan, niin sen hetkiset arvot siis
    // sijoittuvat objekteihin eli => "title", "author" ja "url".
    const getBlogContent = {
      title: event.target.blogTitle.value,
      author: event.target.blogAuthor.value,
      url: event.target.blogURL.value
    }

    event.target.blogTitle.value = '' // Sovellus tyhjentää kyseisen input:in arvon, sen jälkeen kun yllä oleva muuttuja on saanut arvon.
    event.target.blogAuthor.value = '' // Sovellus tyhjentää kyseisen input:in arvon, sen jälkeen kun yllä oleva muuttuja on saanut arvon.
    event.target.blogURL.value = '' // Sovellus tyhjentää kyseisen input:in arvon, sen jälkeen kun yllä oleva muuttuja on saanut arvon.

    dispatch(createNewValue(getBlogContent))  // Sovellus suorittaa funktion "createNewValue(...)", joka saa parametrin "getBlogContent" muuttujan arvon.
    console.log('Notification for adding new content, is now visible! :)') // Tulostetaan kyseinen teksti konsoliin näkyviin.
    dispatch(showNotificationSuccess(`You have now successfully added ${getBlogContent.title} to the database! :)`)) // Sovellus suorittaa funktion "showNotificationSuccess(...)", joka saa kyseisen tekstin parametrin arvoksi.
    setTimeout(() => { // Ajastin, joka muuttaa {...} sisällä olevien muuttujien arvot takaisin alkuperäiseen arvoon eli "null".
      console.log('Notification is now hidden from the user! :)') // Tulostetaan kyseinen teksti konsoliin näkyviin.
      dispatch(hideNotification()) // Sovellus suorittaa funktion "hideNotification()", joka piilottaa "popup" viestin pois näkyviltä.
    }, 3000) // Yllä olevat funktiot suoritetaan 3. sek kuluttua.
  }

  // Komponentti "BlogForm" renderöi (...) sisällä olevat asiat takaisin sovelluksessa.
  return (
    <div>
      <h1>Create a new blog: </h1>
      <form onSubmit={addBlogValue}>
        <div>
          Title:
          <input
            id="titleForTest"
            type="text"
            name='blogTitle'
            placeholder="Add new blog title here..."
          />
        </div>
        <div>
          Author:
          <input
            id="authorForTest"
            type="text"
            name='blogAuthor'
            placeholder="Add new blog author here..."
          />
        </div>
        <div>
          URL:
          <input
            id="urlForTest"
            type="text"
            name='blogURL'
            placeholder="Add new blog url here..."
          />
        </div>
        <button id='submit-blog-button' type="submit">Add new blog</button>
      </form>
    </div>
  )
}

// Määritellään "BlogForm" komponentille alla oleville objekteille "PropTypet". Tämän avulla voidaan
// varmistaa, että nämä kyseiset "propsit" on alustettu sovelluksessa (App.js) ja, että ne on
// noudattaa tiettyä datan muotoa, esim. => muuttuja "addBlogValue" on funktio.
BlogForm.propTypes = {
  addBlogValue: PropTypes.func,
}

// Viedään (export) alla oleva komponentti (BlogForm) sovelluksen käytettäväksi, jotta esim. "App.js" tiedosto pystyy suorittamaan kyseiset funktiot.
export default BlogForm
