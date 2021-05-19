// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

// Alustetaan muuttuja "notificationReducer", joka suorittaa {...} sisällä olevat asiat. Muuttuja saa myös käyttöönsä parametrien => "state" ja "action" arvot.
const notificationReducer = (state = null, action) => {

  // Jos alla oleva if-ehto toteutuu, niin sovellus suorittaa {...} sisällä olevat asiat eli,
  // aina kun käyttäjä äänestää tiettyä arvoa, niin alla oleva funktio palauttaa storeen, jossa
  // objektin arvo "message" saa käyttöönsä => "userVoted" sisällä olevan datan.
  if (action.type === 'SHOW_NOTIFICATION_VOTED') {
    return action.userVoted
  }

  // Jos alla oleva if-ehto toteutuu, niin sovellus suorittaa {...} sisällä olevat asiat eli,
  // aina kun käyttäjä lisää uuden arvon, niin alla oleva funktio palauttaa storeen, jossa
  // objektin arvo "message" saa käyttöönsä => "userAdded" sisällä olevan datan.
  if (action.type === 'SHOW_NOTIFICATION_ADDED') {
    return action.userAdded
  }

  // Jos alla oleva if-ehto totetuu, niin sovellus suorittaa {...} sisällä olevat asiat eli,
  // aina kun käyttäjä joko lisää uuden arvon tai äänestää tiettyä arvoa, niin tämä kyseinen
  // funktio suoritetaan (setTimeout(...) kautta) eli juuri renderöity "notifikaatio viesti"
  // piilotetaan käyttäjältä. Tämä johtuu siitä, koska "hideNotification" on yhtä kuin "null".
  if (action.type === 'HIDE_NOTIFICATION') {
    return action.hideNotification
  }

  return state
}

// Viedään muuttujan "showNotificationVoted" sisältö käytettäväksi, jotta esim. "index.js"
// tiedosto pystyy hyödyntämään sovelluksen aikana. Aina kun kyseiseen funktioon
// tehdään viittaus, niin sovellus tekee {...} sisällä olevat asiat. Kun funktio on
// suoritettu niin storesta löytyy objektien "message" sekä "status" arvot.
export const showNotificationVoted = (getVotedContent) => {
  return {
    type: 'SHOW_NOTIFICATION_VOTED',
    userVoted: {
      message: getVotedContent,
      status: 'voted'
    }
  }
}

// Viedään muuttujan "showNotificationAdded" sisältö käytettäväksi, jotta esim. "index.js"
// tiedosto pystyy hyödyntämään sovelluksen aikana. Aina kun kyseiseen funktioon
// tehdään viittaus, niin sovellus tekee {...} sisällä olevat asiat. Kun funktio on
// suoritettu niin storesta löytyy objektien "message" sekä "status" arvot.
export const showNotificationAdded = (getAddedContent) => {
  return {
    type: 'SHOW_NOTIFICATION_ADDED',
    userAdded: {
      message: getAddedContent,
      status: 'added'
    }
  }
}

// Viedään muuttujan "hideNotification" sisältö käytettäväksi, jotta esim. "index.js"
// tiedosto pystyy hyödyntämään sovelluksen aikana. Aina kun kyseiseen funktioon
// tehdään viittaus, niin sovellus tekee {...} sisällä olevat asiat.
export const hideNotification = () => {
  return {
    type: 'HIDE_NOTIFICATION',
    hideNotification: null
  }
}

// Viedään muuttujan "notificationReducer" avulla tämän tiedoston sisältö käytettäväksi, jotta esim. "index.js" tiedosto pystyy hyödyntämään sovelluksen aikana.
export default notificationReducer
