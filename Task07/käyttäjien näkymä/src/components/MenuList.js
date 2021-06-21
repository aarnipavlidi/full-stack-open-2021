// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react' // Sovellus ottaa "react" nimisen kirjaston käyttöönsä.
import { Link } from 'react-router-dom' // Alustetaan komponentti "Link", joka hyödyntää "react-router-dom" kirjastoa sovelluksen aikana.

// Alustetaan komponentti "MenuList", joka suorittaa {...} sisällä olevat asiat, kun kyseiseen
// komponenttiin tehdään viittaus. Komponentti siis renderöi "navbar":in, jonka avulla käyttäjä
// pystyy siirtymään tiettyyn osoitteeseen (esim. => '/users'), jonka kautta sovellus renderöi
// takaisin sitä vastaavan sisällön takaisin käyttäjälle.
const MenuList = () => {

  const styleCSS = { // Alustetaan muuttuja "styleCSS", joka saa käyttöönsä alla olevat objektien arvot.
    paddingRight: 5
  }

  // Komponentti renderöi (...) sisällä olevat asiat takaisin käyttäjälle. Kun
  // käyttäjä klikkaa "Blogs" linkkiä, niin sovellus ohjautuu etusivulle ja
  // kun käyttäjä klikkaa "Users" linkkiä, niin sovellus ohjautuu "/users"
  // sivulle, mistä löytyy eriteltynä jokainen käyttäjätunnus (tietokannasta).
  return (
    <div>
      <Link style={styleCSS} to='/'>Blogs</Link>
      <Link style={styleCSS} to='/users'>Users</Link>
    </div>
  )
}

// Viedään (export) alla oleva komponentti (MenuList) sovelluksen käytettäväksi, jotta esim. "App.js" tiedosto pystyy suorittamaan kyseiset funktiot.
export default MenuList
