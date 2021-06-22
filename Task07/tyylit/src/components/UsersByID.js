// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React, { useState, useEffect } from 'react' // Sovellus ottaa "react" nimisen kirjaston käyttöönsä, joka myös hyödyntää "useState" funktiota.
import { useParams } from 'react-router-dom' // // Otetaan myös käyttöön "useParams()" funktio sovelluksen käytettäväksi. Lisää funktiosta löytyy täältä: https://reactrouter.com/web/api/Hooks/useparams
import usersService from '../services/users' // Alustetaan muuttuja "usersService", joka hyödyntää "users.js" (erillinen moduuli) tiedostoa eli => "./services/users.js".

// Alustetaan komponentti "UsersByID", joka suorittaa {...} sisällä olevat asiat aina,
// kun kyseiseen komponenttiin tehdään viittaus. Komponentin ideana on toimia niin,
// että aina kun käyttäjä klikkaa tiettyä käyttäjää (haluaa saada lisää infoa), niin
// kyseinen komponentti suoritetaan ja näytetään sen hetkisen käyttäjän tiedot!
const UsersByID = () => {

  const [currentUser, setCurrentUser] = useState([]) // Alustetaan muuttuja "currentUser", joka oletuksena arvoksi tyhjän taulukon.

  const getCurrentID = useParams().id // Alustetaan muuttuja "getCurrentID", joka on yhtä kuin "useParams().id" muuttujan arvo.

  // Kun komponenttiin tehdään viittaus, niin sovellus suorittaa alla olevan "useEffect(...)"
  // funktion eli hakee tiedot tietokannasta ja siirtää datan "currentUser" muuttujan alle.
  useEffect(async () => {
    const response = await usersService.getUsersFromDatabase() // Alustetaan muuttuja "response", joka suorittaa kyseisen funktion kunnes siirtyy eteenpäin.
    setCurrentUser(response) // Muutetaan "currentUser" muuttujan tilaa lisämäällä "response" muuttujan data.
    console.log(response) // Tulostetaan konsoliin "response" muuttujan arvo takaisin käyttäjälle näkyviin.
  }, []) // Funktio suoritetaan vain kerran "[]" avulla, jos tätä ei olisi niin funktio suorittaisi "loputtomasti".

  // Alustetaan muuttuja "getCurrentUserData", joka on yhtä kuin kyseinen funktio.
  // Muuttuja etsii siis "currentUser" arvosta id:n objektin arvon, joka on yhtä
  // kuin "getCurrentID" muuttujan kanssa. Jos käyttäjä klikkaa sovelluksessa
  // käyttäjää, jonka id:n arvo on esim. "609a60df12b0752498de41df", niin tämä
  // muuttuja saa taulukon, joka viittaa kyseiseen id:n arvoon. Mukana tulee siis
  // "content", "username", "name" sekä "id" objektien arvot!
  const getCurrentUserData = currentUser.find(results => results.id === getCurrentID)

  // Alustetaan muuttuja "showBlogs", joka renderöi käyttäjälle {...} sisällä
  // olevat asiat takaisin, sen mukaan mikä alla oleva if-ehto toteutuu.
  const showBlogs = () => {

    // Jos alla oleva if-ehto toteutuu, niin muuttuja renderöi {...} sisällä olevat asiat.
    if (getCurrentUserData.content.length === 0) {
      return (
        <div className='container'>
          <ul className='list-group'>
            <li className='list-group-item'>Following user has not posted any blogs to the database! :(</li>
          </ul>
        </div>
      )
    }

    // Jos alla oleva if-ehto toteutuu, niin muuttuja renderöi {...} sisällä olevat asiat.
    if (getCurrentUserData.content.length > 0) {
      return (
        <div className='container'>
          <ul className='list-group'>
            {getCurrentUserData.content.map(results =>
              <li key={results.id} className='list-group-item'>{results.title}</li>
            )}
          </ul>
        </div>
      )
    }
  }

  // Jos muuttuja "getCurrentUserData" on tyhjä, niin komponentti renderöi {...} sisällä olevat asiat.
  if (!getCurrentUserData) {
    return (
      <div className='container'>
        <h3>There was a problem, while searching data from current user! :(</h3>
      </div>
    )
  }

  // Muussa tapauksessa komponentti renderöi (...) sisällä olevat asiat, josta löytyy vielä
  // "showBlogs()" funktio, jonka kautta löytyy kaksi (2) if-ehtoa, jotka renderöi dynaamisesti.
  return (
    <div className='container'>
      <h3>{getCurrentUserData.name} has added following blogs to the database:</h3>
      <div>
        {showBlogs()}
      </div>
    </div>
  )
}

// Viedään (export) alla oleva komponentti (UsersByID) sovelluksen käytettäväksi, jotta esim. "App.js" tiedosto pystyy suorittamaan kyseiset funktiot.
export default UsersByID
