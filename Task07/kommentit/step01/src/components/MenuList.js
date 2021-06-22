// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react' // Sovellus ottaa "react" nimisen kirjaston käyttöönsä.
import { Link } from 'react-router-dom' // Alustetaan komponentti "Link", joka hyödyntää "react-router-dom" kirjastoa sovelluksen aikana.

// Alustetaan komponentti "MenuList", joka suorittaa {...} sisällä olevat asiat, kun kyseiseen
// komponenttiin tehdään viittaus. Komponentti siis renderöi "navbar":in, jonka avulla käyttäjä
// pystyy siirtymään tiettyyn osoitteeseen (esim. => '/users'), jonka kautta sovellus renderöi
// takaisin sitä vastaavan sisällön takaisin käyttäjälle.
const MenuList = () => {

  // Komponentti renderöi (...) sisällä olevat asiat takaisin käyttäjälle. Kun
  // käyttäjä klikkaa "Blogs" linkkiä, niin sovellus ohjautuu etusivulle ja
  // kun käyttäjä klikkaa "Users" linkkiä, niin sovellus ohjautuu "/users"
  // sivulle, mistä löytyy eriteltynä jokainen käyttäjätunnus (tietokannasta).
  return (
    <div className='container'>
      <nav className='navbar navbar-light bg-light'>
        <form className='container-fluid justify-content-center'>
          <button className="btn btn-sm btn-outline-secondary me-2" type="button">
            <Link className='navbar-links' to='/'>Blogs</Link>
          </button>
          <button className="btn btn-sm btn-outline-secondary" type="button">
            <Link className='navbar-links' to='/users'>Users</Link>
          </button>
        </form>
      </nav>
    </div>
  )
}

// Viedään (export) alla oleva komponentti (MenuList) sovelluksen käytettäväksi, jotta esim. "App.js" tiedosto pystyy suorittamaan kyseiset funktiot.
export default MenuList
