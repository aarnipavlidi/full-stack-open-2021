// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

// Alustetaan muuttuja "notificationReducer", joka suorittaa {...} sisällä olevat asiat. Muuttuja saa myös käyttöönsä parametrien => "state" ja "action" arvot.
const notificationReducer = (state = 'AARNI', action) => {

  // Jos alla oleva if-ehto toteutuu, niin sovellus suorittaa {...} sisällä olevat asiat.
  if (action.type === 'NOTIFICATION_MESSAGE') {
    return action.notification
  }

  return state
}

// Viedään muuttujan "notificationChange" sisältö käytettäväksi, jotta esim. "index.js"
// tiedosto pystyy hyödyntämään sovelluksen aikana. Aina kun kyseiseen funktioon
// tehdään viittaus, niin sovellus tekee {...} sisällä olevat asiat.
export const notificationChange = (notification) => {
  return {
    type: 'NOTIFICATION_MESSAGE',
    notification,
  }
}

// Viedään muuttujan "notificationReducer" avulla tämän tiedoston sisältö käytettäväksi, jotta esim. "index.js" tiedosto pystyy hyödyntämään sovelluksen aikana.
export default notificationReducer
