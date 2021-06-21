// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React, { useState, useEffect } from 'react' // Sovellus ottaa "react" nimisen kirjaston käyttöönsä, joka myös hyödyntää "useState" funktiota.
import usersService from '../services/users' // Alustetaan muuttuja "usersService", joka hyödyntää "users.js" (erillinen moduuli) tiedostoa eli => "./services/users.js".

// Alustetaan komponentti "Users", joka suorittaa {...} sisällä olevat asiat aina,
// kun kyseiseen komponenttiin tehdään viittaus. Komponentti hakee siis sen hetkiset
// tiedot (käyttäjät) tietokannasta ja palauttaa "datan" takaisin käyttäjälle
// näkyviin. Tiedot näkyvät taulukossa, missä on erikseen eritelty erilaisia tietoja.
const Users = () => {
  const [users, setUsers] = useState([]) // Alustetaan muuttuja "users" tilaan, joka saa oletuksena arvoksi tyhjän taulukon.

  // Kun komponenttiin tehdään viittaus, niin sovellus suorittaa alla olevan "useEffect(...)"
  // funktion eli hakee tiedot tietokannasta ja siirtää datan "users" muuttujan alle.
  useEffect(async () => {
    const response = await usersService.getUsersFromDatabase() // Alustetaan muuttuja "response", joka suorittaa kyseisen funktion kunnes siirtyy eteenpäin.
    setUsers(response) // Muutetaan "users" muuttujan tilaa lisämäällä "response" muuttujan data.
    console.log(response) // Tulostetaan konsoliin "response" muuttujan arvo takaisin käyttäjälle näkyviin.
  }, []) // Funktio suoritetaan vain kerran "[]" avulla, jos tätä ei olisi niin funktio suorittaisi "loputtomasti".

  // Komponentti renderöi (...) sisällä olevat asiat takaisin käyttäjälle.
  return (
    <table className='table table-striped container'>
      <thead>
        <tr>
          <th scope='col'>#</th>
          <th scope='col'>Henkilö</th>
          <th scope='col'>Käyttäjätunnus</th>
          <th scope='col'>Blogien määrä</th>
          <th scope='col'>ID</th>
        </tr>
      </thead>
      <tbody>
        {users.map((results, index) =>
          <tr key={results.id}>
            <th scope='row'>{index + 1}</th>
            <td>{results.name}</td>
            <td>{results.username}</td>
            <td>{results.content.length}</td>
            <td>{results.id}</td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

// Viedään (export) alla oleva komponentti (Users) sovelluksen käytettäväksi, jotta esim. "App.js" tiedosto pystyy suorittamaan kyseiset funktiot.
export default Users
