// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import loginService from '../services/login' // Alustetaan muuttuja "loginService", joka hyödyntää "login.js" (erillinen moduuli) tiedostoa eli => "./services/login.js".
import blogsService from '../services/blogs' // Alustetaan muuttuja "blogsService", joka hyödyntää "blogs.js" (erillinen moduuli) tiedostoa eli => "./services/blogs.js".

// Alustetaan muuttuja "blogReducer", joka suorittaa {...} sisällä olevat asiat. Muuttuja saa myös käyttöönsä parametrien => "state" ja "action" arvot.
const userReducer = (state = null, action) => {

  // Jos alla oleva if-ehto toteutuu, niin sovellus suorittaa {...} sisällä
  // olevan asian ja palauttaa käyttäjälle "user" objektiin "action.data" arvon.
  if (action.type === 'CURRENT_USER_NOT_LOGGED') {
    return action.data
  }

  // Jos alla oleva if-ehto toteutuu, niin sovellus suorittaa {...} sisällä
  // olevan asian ja palauttaa käyttäjälle "user" objektiin "action.data" arvon.
  if (action.type === 'CURRENT_USER_LOGGED') {
    return action.data
  }

  // Jos alla oleva if-ehto toteutuu, niin sovellus suorittaa {...} sisällä
  // olevan asian ja palauttaa käyttäjälle "user" objektiin "action.data" arvon.
  if (action.type === 'CURRENT_USER_LOGGED_OUT') {
    return action.data
  }

  return state
}

// Alustetaan muuttuja "currentUserNotLogged", joka suorittaa {...} sisällä olevat
// asiat aina kun kyseiseen funktioon tehdään viittaus. Funktio saa myös käyttöönsä
// parametriksi "username" ja "password" muuttujien arvot. Aina kun käyttäjä haluaa
// kirjautua sisään, eikä ole entuudestaan kirjautunut sisään (eli "local storage")
// on tyhjä niin kyseinen funktio suoritetaan.
export const currentUserNotLogged = (username, password) => {
  return async dispatch => {
    const response = await loginService.login({
      username, password
    })
    window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(response)) // Alustetaan local storageen muuttuja (key) eli "loggedBlogAppUser", joka saa arvoksi muuttujan "response" datan JSON-muodossa.
    await blogsService.setTokenValue(response.token) // Funktio suorittaa kyseisen funktion, kunnes siirtyy eteenpäin (await) alla olevaan kohtaan.
    dispatch({
      type: 'CURRENT_USER_NOT_LOGGED',
      data: response
    })
  }
}

// Alustetaan muuttuja "currentUserLogged", joka suorittaa {...} sisällä olevat
// asiat aina kun kyseiseen funktion tehdään viittaus. Funktio saa myös käyttöönsä
// parametriksi "checkingUserStatus" muuttujan arvon. Jos käyttäjä on jo kirjautunut
// sovellukseen sisään ja tulee myöhemmin uudestaan (esim. selaimen päivittämisen
// jälkeen), niin kyseinen funktio suoritetaan.
export const currentUserLogged = (checkingUserStatus) => {
  return async dispatch => {
    await blogsService.setTokenValue(checkingUserStatus.token) // Funktio suorittaa kyseisen funktion, kunnes siirtyy eteenpäin (await) alla olevaan kohtaan.
    dispatch({
      type: 'CURRENT_USER_LOGGED',
      data: checkingUserStatus
    })
  }
}

// Alustetaan muuttuja "currentUserLoggedOut", joka suorittaa {...} sisällä olevat
// asiat aina kun kyseiseen funktioon tehdään viittaus. Aina kun käyttäjä haluaa
// kirjautua ulos sovellukesta, niin sovellus suorittaa kyseisen funktion.
export const currentUserLoggedOut = () => {
  return {
    type: 'CURRENT_USER_LOGGED_OUT',
    data: null
  }
}

// Viedään muuttujan "userReducer" avulla tämän tiedoston sisältö käytettäväksi, jotta esim. "index.js" tiedosto pystyy hyödyntämään sovelluksen aikana.
export default userReducer
