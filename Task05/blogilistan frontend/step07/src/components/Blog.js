// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React, { useState } from 'react' // Sovellus ottaa "react" nimisen kirjaston käyttöönsä, joka myös hyödyntää "useState" funktiota.

// Alustetaan "Blog" niminen muuttuja (komponentti), joka renderöi {...} sisällä olevat, kun siihen tehdään viittaus.
// Komponentti hyödyntää myös "propsina" muuttujan "value" arvoa. Kun kyseinen komponentti renderöidään sovellukseen,
// niin "propsin" arvo => "value" on yhtä kuin => "Blogs" ("results" on muuttujan arvo "map()" funktion takia).

const Blog = ({value}) => {
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

    // Komponentti "Blog" renderöi (...) sisällä olevat asiat takaisin sovelluksessa.
    return (
      <div style={blogStyle} className='blogs'>
        <div style={showRest}>
          <p>{value.title} <button onClick={() => setBlogValues(false)}>less info</button></p>
          <p>is made by author called: {value.author}</p>
          <p>and blog is located at {value.url}</p>
          <p>which has total of {value.likes} likes! <button>Give a like!</button></p>
          </div>
        <div style={hideRest}>
          <p>{value.title} <button onClick={() => setBlogValues(true)}>more info</button></p>
        </div>
      </div>
    )
  }

// Viedään (export) alla oleva komponentti (Blog) sovelluksen käytettäväksi, jotta esim. "App.js" tiedosto pystyy suorittamaan kyseiset funktiot.
export default Blog
