// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React, { useState, useEffect } from 'react' // Sovellus ottaa "react" nimisen kirjaston käyttöönsä, joka myös hyödyntää "useState" ja "useEffect" funktioita.

import Blog from './components/Blog' // Sovellus hyödyntää "Blog" (Blog.js) nimistä komponenttia, joka sijaitsee => "./components/Blog".
import Notification from './components/Notification' // Sovellus hyödyntää "Notification" (Notification.js) nimistä komponenttia, joka sijaitsee => "./components/Notification".
import BlogForm from './components/BlogForm' // Sovellus hyödyntää "BlogForm" (BlogForm.js) nimistä komponenttia, joka sijaitsee => "./components/BlogForm".

import blogService from './services/blogs' // Alustetaan muuttuja "blogService", joka hyödyntää "blogs.js" (erillinen moduuli) tiedostoa eli => "./services/blogs.js".
import loginService from './services/login' // Alustetaan muuttuja "loginService", joka hyödyntää "login.js" (erillinen moduuli) tiedostoa eli => "./services/login.js".

import { useDispatch, useSelector } from 'react-redux' // Komponentti ottaa "useDispatch" ja "useSelector" funktiot käyttöönsä => "react-redux" kirjaston kautta.

import { showNotificationSuccess, showNotificationError, hideNotification } from './reducers/notificationReducer' // Komponentti ottaa "showNotificationSuccess", "showNotificationError" ja "hideNotification" funktiot käyttöönsä, joka sijaitsee => "notificationReducer.js" tiedostossa.
import { showValuesFromDatabase } from './reducers/blogReducer.js' // Komponentti ottaa "showValuesFromDatabase" funktion käyttöönsä, joka sijaitsee => "blogReducer.js" tiedostossa.

const App = () => { // Sovellus alkaa tästä...
  // Alustetaan muuttuja "dispatch", joka suorittaa "useDispatch()" funktion. Tämän avulla sovellus
  // pystyy tekemään muutoksia "storeen" tallennettuihin taulukon arvoihin. Lisää tästä täältä: https://react-redux.js.org/api/hooks#usedispatch
  const dispatch = useDispatch()

  // Alustetaan muuttuja "blogs", joka suorittaa "useSelector(...)" funkion. Tämän avulla päästään
  // käsiksi "storeen" tallennettuun taulukon arvoihin. Lisää tästä täältä: https://react-redux.js.org/api/hooks#useselector
  // Ota myös huomioon, että käytämme alla olevan funktion sisällä => "state.values",
  // koska olemme asettaneet aikaisemmin storeen (store.js) kyseisen objektin arvon.
  const blogs = useSelector(state => state.values)

  const [userInfo, setUserInfo] = useState(null) // Tämän muuttujan alle tulee kirjautuneen käyttäjän nimen arvo, joka tulee erikseen tietokannasta.
  const [username, setUsername] = useState('') // Tämän muuttujan alle tulee sen hetkisen käyttäjän käyttäjätunnus, kun yritetään kirjautua sisään sovellukseen.
  const [password, setPassword] = useState('') // Tämän muuttujan alle tulee sen hetkisen käyttäjän käyttäjätunnus, kun yritetään kirjautua sisään sovellukseen.

  // Kun käyttäjä on kirjautunut sisään, niin tämä muuttuja määrittää sen, että näkyykö käyttäjälle uuden blogin lisäyslomake vai ei. Jos muuttujan "blogFormVisible"
  // arvo on => "false", niin lomaketta ei näy erikseen käyttäjälle ja mikäli arvo on => "true", niin lomake tulee näkyviin, jotta käyttäjä voi lisätä uuden arvon.
  const [blogFormVisible, setBlogFormVisible] = useState(false) // Muuttuja on oletuksena arvoa "false", eli lomaketta ei oletuksena renderöidä käyttäjälle näkyviin.

  useEffect(() => { // Sovellus hyödyntää "useEffect(...)" funktiota ja suorittaa kyseisen funktion vain kerran eli haetaan halutut arvot erikseen tietokannasta.
    // Kun käyttäjä saapuu sovellukseen, niin sovellus suorittaa => "dispatch(...)" funktion,
    // joka sijaitsee => "blogReducer.js" tiedostossa. Kyseinen funktio aiheuttaa sovelluksen
    // aikana "ketjureaktion" eli sen jälkeen suoritetaan => "getAllBlogValues(...)" funktio,
    // joka sijaitsee => "services/blogs.js" tiedostossa. Funktio palauttaa takaisin pyyntöön
    // "response.data" muuttujan avulla, jonka avulla renderöidään tietokannan arvot käyttäjälle.
    dispatch(showValuesFromDatabase())
  }, []) // Jos [] puuttuu, niin kyseistä funktiota suoritetaan lopullisesti ja sitä me emme halua, koska meille riittää, että haetaan tietokannasta tiedot vain kerran! :)

  useEffect(() => { // Sovellus hyödyntää "useEffect(...)" funktiota ja suorittaa kyseisen funktion vain kerran eli haetaan halutut arvot erikseen local storagesta.
    const checkUserStatus = window.localStorage.getItem('loggedBlogAppUser') // Alustetaan muuttuja "checkUserStatus", joka yrittää hakea local storagesta "key" arvon => "loggedBlogAppUser".
    if (checkUserStatus) { // Jos if-ehto toteutuu, eli local storagesta löytyy "key" arvo, joka on yhtä kuin => "loggedBlogAppUser", niin suoritetaan {...} sisällä olevat asiat.
      const userValue = JSON.parse(checkUserStatus) // Alustetaan muuttuja "userValue", joka suorittaa kyseisen funktion eli parsitaan local storagesta tuleva data takaisin JavaScript-olioksi.
      setUserInfo(userValue) // Muuttujan "userInfo" tilaa muutetaan "userValue" muuttujan datalla.
      blogService.setTokenValue(userValue.token) // Suoritetaan "blogs.js" tiedostossa oleva "setTokenValue" funktio, jossa muuttuja "userValue.token" sijoittuu => "getTokenValue" muuttujan arvoon.
      console.log(userValue)
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
      dispatch(showNotificationError('You tried to login with either wrong username or password, please try again! :)')) // Sovellus suorittaa funktion "showNotificationError(...)", joka saa kyseisen tekstin parametrin arvoksi.
      setTimeout(() => { // Ajastin, joka muuttaa {...} sisällä olevien muuttujien arvot takaisin alkuperäiseen arvoon eli "null".
        console.log('Notification is now hidden from the user! :)') // Tulostetaan kyseinen teksti konsoliin näkyviin.
        dispatch(hideNotification()) // Sovellus suorittaa funktion "hideNotification()", joka piilottaa "popup" viestin pois näkyviltä.
      }, 3000) // Yllä olevat funktiot suoritetaan 3. sek kuluttua.
    }
  }

  // Alustetaan muuttuja "handleLogout", joka suorittaa {...} sisällä olevat asiat,
  // eli aina kun käyttäjä haluaa kirjautua ulos sovelluksesta, niin kyseinen
  // funktio suoritetaan. Käyttäjä palaa funktion suorittamisen jälkeen takaisin etusivulle.
  const handleLogout = () => {
    dispatch(showNotificationSuccess(`You have now successfully signed out from the app. Welcome back again ${userInfo.name}! :)`)) // Sovellus suorittaa funktion "showNotificationSuccess(...)", joka saa kyseisen tekstin parametrin arvoksi.
    setUserInfo(null) // Muuttujan "userInfo" tilaa muutetaan arvoon => "null".
    window.localStorage.clear() // Funktion suorittamisen aikana tyhjennetään myös samalla local storagesta kaikki arvot.
    setTimeout(() => { // Ajastin, joka muuttaa {...} sisällä olevien muuttujien arvot takaisin alkuperäiseen arvoon eli "null".
      console.log('Notification is now hidden from the user! :)') // Tulostetaan kyseinen teksti konsoliin näkyviin.
      dispatch(hideNotification()) // Sovellus suorittaa funktion "hideNotification()", joka piilottaa "popup" viestin pois näkyviltä.
    }, 3000) // Yllä olevat funktiot suoritetaan 3. sek kuluttua.
  }

  // Alustetaan muuttuja "loginForm", joka renderöi (...) sisällä olevat asiat eli aina kun käyttäjä ei ole kirjautunut sisään, niin "loginForm" renderöidään käyttäjälle.
  // Kun käyttäjä painaa "login" painiketta (eli submittaa tiedot eteenpäin), niin sovellus suorittaa "handleLogin" funktion.
  const loginForm = () => (
    <div>
      <form onSubmit={handleLogin}>
        <div id='elementUsername'>
          Username:
          <input
            id='inputUsername'
            type="text"
            value={username} // Kun käyttäjä painaa "login" painiketta (eli submittaa tiedot eteenpäin), niin sen hetkinen arvo tallennetaan "username" muuttujan alle.
            name="Username"
            placeholder="Add your username here..."
            onChange={({ target }) => setUsername(target.value)} // Aina kun käyttäjä kirjoittaa jotain "username" input:iin, niin sen hetkinen arvo tallennetaan käyttämällä => "setUsername" funktiota.
          />
        </div>
        <div id='elementPassword'>
          Password:
          <input
            id='inputPassword'
            type="password"
            value={password} // Kun käyttäjä painaa "login" painiketta (eli submittaa tiedot eteenpäin), niin sen hetkinen arvo tallennetaan "password" muuttujan alle.
            name="Password"
            placeholder="Add your password here..."
            onChange={({ target }) => setPassword(target.value)} // Aina kun käyttäjä kirjoittaa jotain "password" input:iin, niin sen hetkinen arvo tallennetaan käyttämällä => "setPassword" funktiota.
          />
        </div>
        <button id='login-button' type="submit">login</button>
      </form>
    </div>
  )

  // Alustetaan muuttuja "blogForm", joka renderöi {...} sisällä olevat asiat eli aina kun käyttäjä on kirjautunut sisään, niin "blogForm" renderöidään käyttäjälle.
  const blogForm = () => {
    // Alla olevat muuttujat noudattavat siis if-ehtoa eli, jos muuttuja "blogFormVisible" on arvoa
    // "true", niin renderöidään => "<div style={showBlogForm}>...</div>" elementti ja, jos muuttuja
    // on arvoa "false", niin sovellus renderöi => "<div style={hideBlogForm}>...</div>" elementin.
    const showBlogForm = { display: blogFormVisible ? '' : 'none' } // Alustetaan muuttuja "showBlogForm", joka noudattaa {...} sisällä olevaa CSS-määrittelyä.
    const hideBlogForm = { display: blogFormVisible ? 'none' : '' } // Alustetaan muuttuja "hideBlogForm", joka noudattaa {...} sisällä olevaa CSS-määrittelyä.

    // Kun sovellus tekee viittauksen kyseiseen funktioon eli => "blogForm()", niin funktio renderöi (...)
    // sisällä olevat asiat takaisin, joka hyödyntää yllä olevien muuttujien arvoa. Kun sovellus renderöi
    // takaisin tietokannasta tulevat arvot ("blogs" muuttujan kautta), niin me järjestämme arvot niin,
    // että ne näkyvät käyttäjälle suuruusjärjestyksessä "likes" objektin arvon mukaan. Ensin siis käytetään
    // "sort()" funktiota, jonka jälkeen luodaan uusi taulukko "map()" funktion avulla, ja lopuksi renderöidään
    // arvot takaisin käyttäjälle näiden kahden funktioiden avulla.
    return (
      <div>
        <p>Welcome to the application {userInfo.name}, you are now logged in to the bloglist! :) <button id='logout-button' onClick={handleLogout}>Logout</button></p>
        <div style={hideBlogForm}>
          <button id='create-blog-button' onClick={() => setBlogFormVisible(true)}>Create new blog</button>
        </div>
        <div style={showBlogForm}>
          <BlogForm />
          <button onClick={() => setBlogFormVisible(false)}>Cancel</button>
        </div>
        <div id="blogValues">
          {blogs.sort((a, b) => b.likes - a.likes).map(results =>
            <Blog key={results.id} value={results} currentUser={userInfo} />
          )}
        </div>
      </div>
    )
  }

  // Sovellus renderöi (...) sisällä olevat asiat takaisin käyttäjälle. Jos käyttäjä ei ole kirjautnut sisään, niin
  // sovellus renderöi => "Welcome to Bloglist, please log in! :)" tekstin ja suorittaa "loginForm()" funktion.
  // Mikäli käyttäjä on jo kirjautunut sisään, niin renderöidään => "Bloglist" teksti ja suoritetaan "blogForm()"
  // funktio. Notification komponentti renderöidään näkyviin ilman if-ehtoja, joka ilmestyy näkyviin vain, jos
  // sovelluksen aikana tulee esim. virheitä kirjautumisen yhteydessä yms.
  return (
    <div className='blogs'>
      {userInfo === null ? <div><h1>Welcome to Bloglist, please log in! :)</h1></div> : <div><h1>Bloglist</h1></div>}
      <Notification />
      {userInfo === null ? loginForm() : blogForm()}
    </div>
  )
} // Sovellus loppuu tähän...

export default App
