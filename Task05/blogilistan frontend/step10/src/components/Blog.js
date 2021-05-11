// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React, { useState } from 'react' // Sovellus ottaa "react" nimisen kirjaston käyttöönsä, joka myös hyödyntää "useState" funktiota.

// Alustetaan "Blog" niminen muuttuja (komponentti), joka renderöi {...} sisällä olevat, kun siihen tehdään viittaus.
// Komponentti hyödyntää myös "propsina" muuttujan "value" arvoa. Kun kyseinen komponentti renderöidään sovellukseen,
// niin "propsin" arvo => "value" on yhtä kuin => "Blogs" ("results" on muuttujan arvo "map()" funktion takia).

const Blog = ({ value, updateBlogLikes, currentUser, deleteCurrentValue }) => {
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
    boxShadow: `rgb(128,128,128) 0px 5px 15px`
  }

  // Kun käyttäjä painaa "more info" painiketta, niin sovellus renderöi käyttäjälle => "<div style={showRest}" elementin takaisin. Tämä johtuu
  // siitä, että muuttujan "blogValues" tilaa muutetaan arvoon => "true" joten alla oleva if-ehto toteutuu eli näytetään => '' arvo.
  const showRest = { display: blogValues ? '' : 'none' } // Alustetaan muuttuja "showRest", joka noudattaa {...} sisällä olevaa CSS-määrittelyä.

  // Kun käyttäjä painaa "less info" painiketta, niin sovellus renderöi käyttäjälle => "<div style={hideRest}" elementin takaisin. Tämä johtuu
  // siitä, että muuttujan "blogValues" tilaa muutetaan arvoon => "false" joten alla oleva if-ehto ei toteudu eli näytetään => '' arvo.
  const hideRest = { display: blogValues ? 'none' : '' } // Alustetaan muuttuja "hideRest", joka noudattaa {...} sisällä olevaa CSS-määrittelyä.

  const updateValues = (event) => { // Alustetaan muuttuja "updateValues", joka suorittaa {...} sisällä olevat asiat.
    event.preventDefault() // The event.preventDefault() method stops the default action of an element from happening.
    // Kun käyttäjä haluaa päivittää tietyn blogin arvoa eli tässä tapauksessa halutaan lisätä uusi tykkäys kyseiseen
    // blogiin, niin sovellus suorittaa "updateValues" funktion. Alla oleva funktio eli "updateBlogLikes()" saa alla
    // olevien objektien arvot käyttöönsä, jonka kautta => "App.js" tiedostossa sijaitseva muuttujan arvon "updateBlogValue"
    // tietää, että minkä id:n arvoa päivitetään sekä minkä objektin arvoa muokataan. Muista, että olemme myös erikseen
    // luoneet tälle komponentille oman "propsin" eli => "updateBlogLikes()" on yhtä kuin => "updateBlogValue".
    updateBlogLikes({
      id: value.id,
      likes: value.likes + 1
    })
  }

  // Alustetaan muuttuja "deletelog", joka suorittaa {...} sisällä olevat asiat. Kun käyttäjä haluaa poistaa kyseisen blogin
  // arvon tietokannasta, niin sovellus suorittaa tämän funktion. Komponentille olemme luoneet "propsin" eli =>
  // "deleteCurrentValue()", joka tarkoittaa kun funktiota suoritetaan, niin sen hetkiset arvot => "value.title" sekä
  // "value.id" tallentuvat kyseisen muuttujan alle. Muuttujaa käytetään "App.js" tiedostossa sijaitsevan funktion =>
  // "deleteBlogValue" kohdalla. Koska funktio saa parametrin arvon => "currentContent", niin se tarkoittaa että se
  // on yhtä kuin "deleteCurrentValue" muuttujan arvo.
  const deleteBlog = (event) => {
    event.preventDefault() // The event.preventDefault() method stops the default action of an element from happening.
    deleteCurrentValue({
      title: value.title, // siis "deleteCurrentValue.title" on yhtä kuin "value.title"
      id: value.id // siis "deleteCurrentValue.id" on yhtä kuin "value.id"
    })
  }

  // Sovellus renderöi alla olevan asian, jos kyseinen if-ehto toteutuu eli "currentUser.username" on yhtä kuin "value.user.username".
  // Jos nykyinen käyttäjä, joka on kirjautunut sisään, niin on blogin alkuperäinen luoja, niin sovellus renderöi painikkeen, jotta
  // pystyy tarvittaessa poistamaan sen. Muussa tapauksessa renderöidään sama asia, mutta ilman painiketta. Ota myös huomioon, että
  // "currentUser" (propsi) viittaa => "userInfo" muuttujaan ja "value" (propsi) viittaa => "results" muuttujaan.
  if (currentUser.username === value.user.username) {
    return (
      <div style={blogStyle} className='blogs'>
        <div style={showRest}>
          <p>{value.title} <button onClick={() => setBlogValues(false)}>less info</button></p>
          <p>is made by author called: {value.author}</p>
          <p>and blog is located at {value.url}</p>
          <p>which has total of {value.likes} likes! <button onClick={updateValues}>Give a like!</button></p>
          <button onClick={deleteBlog}>Remove</button>
        </div>
        <div style={hideRest}>
          <p>{value.title} <button onClick={() => setBlogValues(true)}>more info</button></p>
        </div>
      </div>
    )
  }

  return (
    <div style={blogStyle} className='blogs'>
      <div style={showRest}>
        <p>{value.title} <button onClick={() => setBlogValues(false)}>less info</button></p>
        <p>is made by author called: {value.author}</p>
        <p>and blog is located at {value.url}</p>
        <p>which has total of {value.likes} likes! <button onClick={updateValues}>Give a like!</button></p>
      </div>
      <div style={hideRest}>
        <p>{value.title} <button onClick={() => setBlogValues(true)}>more info</button></p>
      </div>
    </div>
  )
}

// Viedään (export) alla oleva komponentti (Blog) sovelluksen käytettäväksi, jotta esim. "App.js" tiedosto pystyy suorittamaan kyseiset funktiot.
export default Blog
