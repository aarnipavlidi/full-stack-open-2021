// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React, { useState, useEffect } from 'react' // Sovellus ottaa "react" nimisen kirjaston käyttöönsä, joka myös hyödyntää "useState" ja "useEffect" funktioita.
import Blog from './components/Blog' // Sovellus hyädyntää "Blog" (Blog.js) nimistä komponenttia, joka sijaitsee => "./components/Blog"

import blogService from './services/blogs' // Alustetaan muuttuja "blogService", joka hyödyntää "blogs.js" (erillinen moduuli) tiedostoa eli => "./services/blogs.js".
import loginService from './services/login' // Alustetaan muuttuja "loginService", joka hyödyntää "login.js" (erillinen moduuli) tiedostoa eli => "./services/login.js".

const App = () => { // Sovellus alkaa tästä...
  // Alustetaan muuttuja "blogs" tilaan, joka saa oletuksena arvon => "[]" eli tyhjän taulukon. Jos haluamme muuttaa tilan arvoa, niin käytämme funktiota => "setBlogs".
  const [blogs, setBlogs] = useState([]) // Tämän muuttujan alle tulee kaikki blogin arvot, jotkat tulevat erikseen tietokannasta.

  // Alustetaan muuttuja "userInfo" tilaan, joka saa oletuksena arvon => "[]" eli tyhjän taulukon. Jos haluamme muuttaa tilan arvoa, niin käytämme funktiota => "setUserName".
  const [userInfo, setUserInfo] = useState(null) // Tämän muuttujan alle tulee kirjautuneen käyttäjän nimen arvo, joka tulee erikseen tietokannasta.

  // Alustetaan muuttuja "errorMessage", joka saa oletuksena arvon => "null". Jos haluamme muuttaa tilan arvoa, niin käytämme funktiota => "setErrorMessage".
  const [errorMessage, setErrorMessage] = useState(null) // Tämän muuttujan alle tulee mahdolliset virheet (esim. jos yritetään kirjautua sisään väärällä tunnuksella), jotka tulevat sovelluksen aikana.

  // Alustetaan muuttuja "username", joka saa oletuksena arvon => ''. Jos haluamme muuttaa tilan arvoa, niin käytämme funktiota => "setUsername".
  const [username, setUsername] = useState('') // Tämän muuttujan alle tulee sen hetkisen käyttäjän käyttäjätunnus, kun yritetään kirjautua sisään sovellukseen.

  // Alustetaan muuttuja "password", joka saa oletuksena arvon => ''. Jos haluamme muuttaa tilan arvoa, niin käytämme funktiota => "setPassword".
  const [password, setPassword] = useState('') // Tämän muuttujan alle tulee sen hetkisen käyttäjän käyttäjätunnus, kun yritetään kirjautua sisään sovellukseen.

  useEffect(() => { // Sovellus hyödyntää "useEffect(...)" funktiota ja suorittaa kyseisen funktion vain kerran eli haetaan halutut arvot erikseen tietokannasta.
    const getBlogValues = async () => { // Alustetaan muuttuja "getBlogValues", joka suorittaa {...} sisällä olevat asiat.
      const response = await blogService.getAllBlogValues() // Alustetaan muuttuja "response", joka suorittaa kyseisen funktion. Sovellus jatkaa eteenpäin vasta (await) kunnes "response" muuttuja saanut arvon takaisin.
      setBlogs(response) // Muuttujan "blogs" tilaa muutetaan "response" muuttujan datalla.
      console.log('I have now changed "blogs" variable state, by getting data from "response" variable! :)') // Tulostaa konsoliin kyseisen tekstin näkyviin käyttäjälle.
    }
    getBlogValues() // Suoritetaan "getBlogValues()" funktio.
  }, []) // Jos [] puuttuu, niin kyseistä funktiota suoritetaan lopullisesti ja sitä me emme halua, koska meille riittää, että haetaan tietokannasta tiedot vain kerran! :)

  useEffect(() => { // Sovellus hyödyntää "useEffect(...)" funktiota ja suorittaa kyseisen funktion vain kerran eli haetaan halutut arvot erikseen local storagesta.
    const checkUserStatus = window.localStorage.getItem('loggedBlogAppUser') // Alustetaan muuttuja "checkUserStatus", joka yrittää hakea local storagesta "key" arvon => "loggedBlogAppUser".
    if (checkUserStatus) { // Jos if-ehto toteutuu, eli local storagesta löytyy "key" arvo, joka on yhtä kuin => "loggedBlogAppUser", niin suoritetaan {...} sisällä olevat asiat.
      const userValue = JSON.parse(checkUserStatus) // Alustetaan muuttuja "userValue", joka suorittaa kyseisen funktion eli parsitaan local storagesta tuleva data takaisin JavaScript-olioksi.
      setUserInfo(userValue) // Muuttujan "userInfo" tilaa muutetaan "userValue" muuttujan datalla.
      blogService.setTokenValue(userValue.token) // Suoritetaan "blogs.js" tiedostossa oleva "setTokenValue" funktio, jossa muuttuja "userValue.token" sijoittuu => "getTokenValue" muuttujan arvoon.
    }
  }, []) // Jos [] puuttuu, niin kyseistä funktiota suoritetaan lopullisesti ja sitä me emme halua, koska meille riittää, että haetaan tarvittavat tiedot local storagesta vain kerran! :)

  // Alustetaan muuttuja "handleLogin", joka suorittaa {...} sisällä olevat asiat,
  // eli aina kun käyttäjä kirjautuu sisään painamalla "login" painiketta, niin kyseinen funktio suoritetaan.
  const handleLogin = async (event) => {
    event.preventDefault() // The event.preventDefault() method stops the default action of an element from happening.
    console.log('You are trying to log in with following credentials', username, password) // Tulostaa konsoliin kyseisen tekstin näkyviin käyttäjälle.

    try { // Kun funktiota "handleLogin" suoritetaan, niin sovellus suorittaa "try" {...} sisällä olevat asiat ja, jos se aiheuttaa virheitä niin siirrytään => "catch(...)" funktion pariin.
      const userValue = await loginService.login({ // Alustetaan muuttuja "userValue", joka suorittaa kyseisen funktion. Sovellus jatkaa eteenpäin vasta (await) kunnes "userValue" muuttuja saanut arvon takaisin.
        username, password,
      })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(userValue)) // Alustetaan local storageen muuttuja (key) eli "loggedBlogAppUser", joka saa arvoksi muuttujan "userValue" datan JSON-muodossa.
      blogService.setTokenValue(userValue.token) // Suoritetaan "blogs.js" tiedostossa oleva "setTokenValue" funktio, jossa muuttuja "userValue.token" sijoittuu => "getTokenValue" muuttujan arvoon.
      setUserInfo(userValue) // Muuttujan "userInfo" tilaa muutetaan "userValue" muuttujan datalla.
      setUsername('') // Muuttujan "username" tilaa muutetaan tyhjentämällä sen hetkinen arvo kyseiseen arvoon.
      setPassword('') // Muuttujan "password" tilaa muutetaan tyhjentämällä sen hetkinen arvo kyseiseen arvoon.
    } catch (error) { // Mikäli tulee virheitä, niin catch(...) funktion avulla suoritetaan {...} sisällä olevat asiat.
      console.error(error) // Tulostaa konsoliin kyseisen muuttujan arvon näkyviin käyttäjälle.
      setErrorMessage('You tried to login with either wrong username or password, please try again! :)') // Muuttujan "errorMessage" tilaa muutetaan kyseisen tekstin arvoon.
      setTimeout(() => { // Ajastin, joka muuttaa muuttujan "errorMessage" arvon => "null", kun on kulunut 5 sek. yhteensä.
        setErrorMessage(null) // Muuttujan "errorMessage" tilaa muutetaan arvoon => "null".
      }, 5000)
    }
  }

  // Alustetaan muuttuja "handleLogout", joka suorittaa {...} sisällä olevat asiat,
  // eli aina kun käyttäjä haluaa kirjautua ulos sovelluksesta, niin kyseinen
  // funktio suoritetaan. Käyttäjä palaa funktion suorittamisen jälkeen takaisin etusivulle.
  const handleLogout = () => {
    console.log(`You have now successfully signed out from the app. Welcome back again ${userInfo.name}! :)`) // Tulostaa konsoliin kyseisen tekstin näkyviin käyttäjälle.
    setUserInfo(null) // Muuttujan "userInfo" tilaa muutetaan arvoon => "null".
    window.localStorage.clear() // Funktion suorittamisen aikana tyhjennetään myös samalla local storagesta kaikki arvot.
  }

  // Alustetaan muuttuja "loginForm", joka renderöi (...) sisällä olevat asiat eli aina kun käyttäjä ei ole kirjautunut sisään, niin "loginForm" renderöidään käyttäjälle.
  // Kun käyttäjä painaa "login" painiketta (eli submittaa tiedot eteenpäin), niin sovellus suorittaa "handleLogin" funktion.
  const loginForm = () => (
    <div>
      <h1>Welcome to Bloglist, please log in! :)</h1>
        <form onSubmit={handleLogin}>
          <div>
            Username:
              <input
              type="text"
              value={username} // Kun käyttäjä painaa "login" painiketta (eli submittaa tiedot eteenpäin), niin sen hetkinen arvo tallennetaan "username" muuttujan alle.
              name="Username"
              placeholder="Add your username here..."
              onChange={({ target }) => setUsername(target.value)} // Aina kun käyttäjä kirjoittaa jotain "username" input:iin, niin sen hetkinen arvo tallennetaan käyttämällä => "setUsername" funktiota.
              />
          </div>
          <div>
            Password:
              <input
              type="password"
              value={password} // Kun käyttäjä painaa "login" painiketta (eli submittaa tiedot eteenpäin), niin sen hetkinen arvo tallennetaan "password" muuttujan alle.
              name="Password"
              placeholder="Add your password here..."
              onChange={({ target }) => setPassword(target.value)} // Aina kun käyttäjä kirjoittaa jotain "password" input:iin, niin sen hetkinen arvo tallennetaan käyttämällä => "setPassword" funktiota.
              />
          </div>
          <button type="submit">login</button>
        </form>
    </div>
  )

  // Alustetaan muuttuja "showBlogs", joka renderöi (...) sisällä olevat asiat eli aina kun käyttäjä on kirjautunut sisään, niin "showBlogs" renderöidään käyttäjälle.
  // Muuttujan "userInfo" sisältä löytyy sen hetkisen kirjautuneen henkilön nimi (name), käyttäjätunnus (username) sekä tokenin (token) arvo.
  // Kun käyttäjä painaa painiketta ("onClick"), niin painike suorittaa "handleLogout" funktion.
  const showBlogs = () => (
    <div>
      <h1>Bloglist</h1>
      <p>Welcome to the application {userInfo.name}, you are now logged in to the bloglist! :) <button onClick={handleLogout}>Logout</button></p>
      {blogs.map(results =>
        <Blog key={results.id} value={results} />
      )}
    </div>
  )

  // Sovellus renderöi (...) sisällä olevat asiat näkyviin käyttäjälle. Jos käyttäjä (userToken) ei ole kirjautunut sisään eli muuttuja on arvoa "null",
  // niin suoritetaan => "loginForm()" funktio ja renderöidään sen tulos takaisin käyttäjälle. Jos käyttäjä (userToken) on kirjautunut sisään eli
  // muuttuja on saanut "userValue" muuttujan datan, niin sovellus suorittaa => "showBlogs()" funktion ja renderöidään sen tulos takaisin käyttäjälle! :)
  return (
    <div>
      {userInfo === null ? loginForm() : showBlogs()}
    </div>
  )
} // Sovellus loppuu tähän...

export default App
