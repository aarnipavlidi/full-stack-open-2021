// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

// Alustetaan muuttuja "notificationReducer", joka suorittaa {...} sisällä olevat asiat. Muuttuja saa myös käyttöönsä parametrien => "state" ja "action" arvot.
const notificationReducer = (state = null, action) => {

  // Jos alla oleva if-ehto toteutuu, niin sovellus suorittaa {...} sisällä olevat asiat eli,
  // aina kun käyttäjä äänestää tiettyä arvoa tai lisää uuden arvon tietokantaan, niin alla
  // oleva funktio palauttaa storeen => "action.notification":n datan => "message" objektille.
  if (action.type === 'SHOW_NOTIFICATION') {
    return action.notification
  }

  // Jos alla oleva if-ehto totetuu, niin sovellus suorittaa {...} sisällä olevat asiat eli,
  // aina kun käyttäjä joko lisää uuden arvon tai äänestää tiettyä arvoa, niin tämä kyseinen
  // funktio suoritetaan (setTimeout(...) kautta) eli juuri renderöity "notifikaatio viesti"
  // piilotetaan käyttäjältä. Tämä johtuu siitä, koska "notification" on yhtä kuin "null".
  if (action.type === 'HIDE_NOTIFICATION') {
    return action.notification
  }

  return state
}

let timeout // Alustetaan muuttuja "timeout" väliaikaisesti alla olevaa funktiota varten.

// Viedään muuttujan "showNotificationMessage" sisältö käytettäväksi, jotta esim. "index.js"
// tiedosto pystyy hyödyntämään sovelluksen aikana. Aina kun kyseiseen funktioon
// tehdään viittaus, niin sovellus tekee {...} sisällä olevat asiat. Ota myös huomioon,
// että funktio saa käyttöönsä kaksi (2) erilaista paremetrin arvoa eli => "notificationMessage"
// josta löytyy sen hetkinen viesti mikä halutaan renderöidä käyttäjälle näkyviin sekä
// => "notificationDuration", jonka avulla määritellään "setTimeout(...)" funktiota
// varten ajastin, että kuinka kauan "notifikaatio" on näkyvissä käyttäjälle.
export const showNotificationMessage = (notificationMessage, notificationDuration) => {
  // Tehtävää "6.21 anekdootit, loppuhuipennus" varten olemme muokanneet koodia niin,
  // että aina kun käyttäjä äänestää tiettyä tekstiä, niin sen hetkinen ajastin eli
  // "setTimeout(...)" funktio "resetoidaan". Tämän avulla varmistetaan sen, että
  // aina viimeisin (uusin) notifikaatio kestää alkuperäisen keston ajan. Funktio
  // on alustettu muuttujalle => timeout ja kyseinen muuttuja on alustettu
  // väliaikaisena muuttujana (let) funktion ulkopuolelle. Lisää tietoa funktiosta
  // löytyy täältä: https://www.w3schools.com/jsref/met_win_cleartimeout.asp
  return async dispatch => {
    clearTimeout(timeout)
    dispatch({
      type: 'SHOW_NOTIFICATION',
      notification: notificationMessage
    })
    timeout = setTimeout(() => {
      dispatch({
        type: 'HIDE_NOTIFICATION',
        notification: null
      })
    }, notificationDuration * 500)
  }
}

// Viedään muuttujan "notificationReducer" avulla tämän tiedoston sisältö käytettäväksi, jotta esim. "index.js" tiedosto pystyy hyödyntämään sovelluksen aikana.
export default notificationReducer
