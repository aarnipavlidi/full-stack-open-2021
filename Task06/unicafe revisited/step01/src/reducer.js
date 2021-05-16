// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

const originalState = { // Alustetaan muuttuja "originalState", joka saa käyttöönsä {...} sisällä olevat objektit.
  good: 0, // eli "originalState.good " on yhtä kuin 0.
  neutral: 0, // eli "originalState.neutral " on yhtä kuin 0.
  bad: 0 // eli "originalState.bad " on yhtä kuin 0.
}

// Alustetaan muuttuja "counterReducer", joka suorittaa {...} sisällä olevat asiat. Muuttuja saa myös käyttöönsä parametrien => "state" ja "action" arvot.
const counterReducer = (state = originalState, action) => {
  // Kun käyttäjä painaa jotain painiketta, niin alla oleva teksti tulostuu
  // konsoliin näkyviin, jonka perään tulee vielä muuttujan objektin arvo.
  console.log('User has clicked the following button:', action.type)

  // Jos alla oleva if-ehto toteutuu, niin suoritetaan {...} sisällä olevat asiat,
  // eli luodaan kopio sen hetkisestä "state" muuttujan arvosta ja lisätään
  // objektiin "good" => sen hetkisen objektin arvo + 1. Lopuksi funktio
  // suorittaa => "return state" eli sovellukseen näytetään sen hetkinen arvo.
  if (action.type === 'GOOD') {
    return {
      ...state,
      good: state.good + 1
    }
  }

  // Jos alla oleva if-ehto toteutuu, niin suoritetaan {...} sisällä olevat asiat,
  // eli luodaan kopio sen hetkisestä "state" muuttujan arvosta ja lisätään
  // objektiin "neutral" => sen hetkisen objektin arvo + 1. Lopuksi funktio
  // suorittaa => "return state" eli sovellukseen näytetään sen hetkinen arvo.
  if (action.type === 'NEUTRAL') {
    return {
      ...state,
      neutral: state.neutral + 1
    }
  }

  // Jos alla oleva if-ehto toteutuu, niin suoritetaan {...} sisällä olevat asiat,
  // eli luodaan kopio sen hetkisestä "state" muuttujan arvosta ja lisätään
  // objektiin "bad" => sen hetkisen objektin arvo + 1. Lopuksi funktio
  // suorittaa => "return state" eli sovellukseen näytetään sen hetkinen arvo.
  if (action.type === 'BAD') {
    return {
      ...state,
      bad: state.bad + 1
    }
  }

  // Jos alla oleva if-ehto toteutuu, niin suoritetaan {...} sisällä olevat asiat,
  // eli palautetaan takaisin käyttäjälle näkyviin muuttujan "originalState"
  // arvot objektien kanssa eli alkuperäinen tila missä muuttuja => "state"
  // oli, kun käyttäjä saapui sovellukseen ensimmäisen kerran.
  if (action.type === 'RESET') {
    return originalState
  }

  return state
}

// Viedään muuttujan "counterReducer" avulla tämän tiedoston sisältö käytettäväksi, jotta esim. "index.js" tiedosto pystyy hyödyntämään sovelluksen aikana.
export default counterReducer
