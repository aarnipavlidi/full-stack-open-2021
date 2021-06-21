// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react' // Sovellus ottaa "react" nimisen kirjaston käyttöönsä.
import { Link } from 'react-router-dom' // Alustetaan komponentti "Link", joka hyödyntää "react-router-dom" kirjastoa sovelluksen aikana.

// Alustetaan komponentti "Blog", joka suorittaa {...} sisällä olevat asiat aina,
// kun kyseiseen komponenttiin tehdään viittaus. Komponentti saa myös käyttöönsä
// "getBlogValues" muuttujan parametrin arvoksi. Muuttujasta löytyy kaikki sen
// hetkiset blogin arvot tietokannasta.
const Blog = ({ getBlogValues }) => {

  // Komponentti renderöi (...) sisällä olevat asiat takaisin käyttäjälle näkyviin.
  // Kun käyttäjä klikkaa tiettyä blogia, niin sovellus ohjaa klikatun blogin
  // tietoihin ja renderöi "BlogByID":in komponentin näkyviin käyttäjälle.
  return (
    <div className='container mt-3'>
      <ul className='list-group'>
        <li className='list-group-item'>
          <Link to={`/blogs/${getBlogValues.id}`}>{getBlogValues.title}</Link>
        </li>
      </ul>
    </div>
  )
}

// Viedään (export) alla oleva komponentti (Blog) sovelluksen käytettäväksi, jotta esim. "App.js" tiedosto pystyy suorittamaan kyseiset funktiot.
export default Blog
