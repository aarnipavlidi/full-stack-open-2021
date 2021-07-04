// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React, { useState, useEffect } from 'react' // Otetaan käyttöön "react" niminen kirjasto sekä "useState" ja "useEffect" funktit sovellusta varten.
import { useMutation, useLazyQuery } from '@apollo/client' // Sovellus ottaa käyttöön kyseiset funktiot "@apollo/client" kirjaston kautta.
import { USER_LOGIN, CURRENT_USER } from '../queries' // Sovellus ottaa käyttöön kyseiset funktiot "queries.js" tiedostosta.

// Alustetaan komponetti "UserLogin", joka suorittaa {...} sisällä olevat asiat aina, kun
// sovellus viittaa kyseiseen komponenttiin. Komponentti saa myös käyttöönsä parametrina
// "setToken", "showLogin", "setPage" "setNotification" muuttujien arvot.
const UserLogin = ({ setToken, showLogin, setPage, setNotification }) => {

  const [currentUsername, setCurrentUsername] = useState('') // Alustetaan muuttuja "currentUsername" tilaan, joka saa oletuksena arvon => ''.
  const [currentPassword, setCurrentPassword] = useState('') // Alustetaan muuttuja "currentPassword" tilaan, joka saa oletuksena arvon => ''.

  // Alustetaan [ currentUser, result ] muuttujaat, joiden avulla suoritetaan alla oleva funktio.
  // Funktion tarkoituksena on toimia, niin että kun käyttäjä kirjautuu sisään onnistuneesti, niin
  // sen ansiosta suoritetaan alla oleva "useEffect(...)" funktio, jonka sisältä löytyy myös =>
  // "currentUser(...)" funktio. Tämän ansiosta, kun käyttäjä kirjautuu sisään, niin välimuistiin
  // tulee "väliaikaisesti" sen hetkisen kirjautuneen käyttäjän tiedot eli => "username",
  // "favoriteGenre" sekä "id" objektien arvot. Olemme myös ottaneet käyttöön "fetchPolicy"
  // parametrin arvon, koska haluamme että aina kun kyseinen query suoritetaan suoraan palvelimen
  // kautta. Emme siis tarkista, että onko välimuistissa jo entuudestaan dataa, koska kun käyttäjä
  // kirjautuu ulos niin samassa yhteydessä käyttäjän tiedot poistuvat välimuistista.
  const [currentUser, result] = useLazyQuery(CURRENT_USER, {
    fetchPolicy: "network-only"
  })

  // Alustetaan [ getUserCredentials, response ] muuttujat, joiden avulla suoritetaan alla oleva
  // funktio. Aina kun käyttäjä yrittää kirjautua sisään, niin "USER_LOGIN" mutaatio suoritetaan,
  // joka aiheuttaa sen, että suoritetaan => "mutation getUserCredentials(...)", jonka sisälle
  // sijoitetaan sen hetkiset arvot parametrin arvoksi. Mikäli mutaation suorittamisen aikana
  // tulee virheitä, niin suoritetaan "onError(...)" osuus, jonka myötä palautetaan takaisin
  // käyttäjälle data, josta löytyy "message" sekä "status" objektien arvot.
  const [ getUserCredentials, response ] = useMutation(USER_LOGIN, {
  onError: (error) => { // Jos kirjautumisen aikana tulee ongelmia, niin suoritetaan {...} sisällä olevat asiat.
    setNotification({ // Suoritetaan "setNotification(...)" funktio, joka saa käyttöönsä kyseiset objektien arvot.
      message: 'Wrong credentials, please try again! :)',
      status: false
    })
  }
})

  // Alustetaan "useEffect(...)" hook, jonka sovellus suorittaa aina, jos dataa
  // ilmestyy "response.data":n muuttujan alle. Kun käyttäjä yrittää kirjautua
  // sisään sovellukseen ja kirjautuu sisään onnistuneesti, niin mutaation eli
  // "USER_LOGIN" myötä => "response" muuttujalle ilmestyy "data" objekti, josta
  // löytyy tokenin arvo => "value" objektin alta.
  useEffect(() => {
    // Jos "response.data" muuttujan arvo ei ole tyhjä eli sieltä löyty dataa,
    // niin suoritetaan {...} sisällä olevat asiat.
    if (response.data) {
      const getTokenValue = response.data.login.value // Alustetaan muuttuja "getTokenValue", joka on yhtä kuin kyseisen muuttujan arvo.
      setToken(getTokenValue) // Suoritetaan "setToken(...)" funktio, joka saa parametrin arvoksi "getTokenValue" muuttujan arvon.
      localStorage.setItem('current-user-token', getTokenValue) // "Local Storage":een ilmestyy "current-user-token" objekti, joka saa arvoksi "getTokenValue" muuttujan arvon.
      setPage('authors') // Muutetaan "page" muuttujan tilaa vaihtamalla se alkuperäiseen (etusivulle) tilaan eli arvoon => "null".
      currentUser() // Kun käyttäjä on kirjautunut sisään onnistuneesti, niin suoritetaan kyseinen funktio.
      setNotification({ // Suoritetaan "setNotification(...)" funktio, joka saa käyttöönsä kyseiset objektien arvot.
        message: 'You have successfully logged in to the app. Welcome back! :)',
        status: true
      })
    }
  }, [response.data]) // Jos "[response.data]" puuttuisi, niin sovellus suorittaisi kyseisen hookin "loputtomasti" ja sitä emme halua! :)

  // Alustetaan muuttuja "submitLogin", joka suorittaa {...} sisällä olevat asiat aina,
  // kun kyseiseen funktioon tehdään viittaus. Funktion suorittamisen yhteydessä suoritetaan
  // myös "getUserCredentials" funktio, joka saa parametrin arvoksi sen hetkiset "currentUsername"
  // sekä "currentPassword" muuttujan arvot. Ota huomioon, kun sovellus suorittaa "USER_LOGIN"
  // mutaation, niin muuttuja => "currentUsername" siirtyy "$username" muuttujan alle sekä
  // muuttuja => "currentPassword" siirtyy "$password" muuttujan alle!
  const submitLogin = async (event) => {
    event.preventDefault() // The event.preventDefault() method stops the default action of an element from happening.
    const username = currentUsername // Alustetaan muuttuja "username", joka on yhtä kuin => "currentUsername".
    const password = currentPassword // Alustetaan muuttuja "password", joka on yhtä kuin => "currentPassword".
    getUserCredentials({ // Funktio saa objektin "variables" käyttöönsä, jonka sisältä löytyy kyseiset muuttujan arvot.
      variables: { username, password }
    })
  }

  // Jos alla oleva if-ehto toteutuu eli muuttuja "showLogin" ei toteudu niin, että
  // "page on yhtä kuin login" sekä "token on yhtä kuin null", niin komponentti ei
  // renderöi mitään takaisin käyttäjälle näkyviin.
  if (!showLogin) {
    return null
  }

  // Muussa tapauksessa, jos yllä oleva if-ehto ei toteudu, niin komponetti renderöi (...) sisällä olevat takaisin käyttäjälle näkyviin.
  return (
    <div className='container mt-2'>
      <h2 className='text-center'>Login</h2>
        <form onSubmit={submitLogin}>
          <div className='mb-3'>
            <label for='UsernameInput' className='form-label'>Username</label>
            <input
              type='text'
              className='form-control'
              id='UsernameInput'
              value={currentUsername}
              onChange={({ target }) => setCurrentUsername(target.value)}
            />
          </div>
          <div className='mb-3'>
            <label for='PasswordInput' className='form-label'>Password</label>
            <input
              type='password'
              className='form-control'
              id='PasswordInput'
              value={currentPassword}
              onChange={({ target }) => setCurrentPassword(target.value)}
            />
          </div>
          <button type='submit' className='btn btn-secondary'>Login</button>
        </form>
    </div>
  )
}

// Viedään (export) alla oleva komponentti (UserLogin) sovelluksen käytettäväksi, jotta esim. "App.js" tiedosto pystyy suorittamaan kyseiset funktiot.
export default UserLogin
