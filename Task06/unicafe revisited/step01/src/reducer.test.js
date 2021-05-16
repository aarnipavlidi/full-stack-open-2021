// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import deepFreeze from 'deep-freeze' // Alustetaan muuttuja "deepFreeze", joka hyödyntää "deep-freeze" kirjaston sisältöä sovelluksen aikana.
import counterReducer from './reducer' // Alustetaan muuttuja "counterReducer", joka hyödyntää "reducer.js" tiedoston sisältöä sovelluksen aikana.

describe('unicafe reducer testing', () => {
  const originalState = { // Alustetaan muuttuja "originalState", joka saa käyttöönsä {...} sisällä olevat objektit.
    good: 0, // eli "originalState.good " on yhtä kuin 0.
    neutral: 0, // eli "originalState.neutral " on yhtä kuin 0.
    bad: 0 // eli "originalState.bad " on yhtä kuin 0.
  }

  // Alla olevan testin tarkoitus on varmistaa, että sovellus palauttaa
  // alkuperäisen tilan aina kun käyttäjä saapuu ensimmäisen kerran sovellukseen.
  test('should return a proper initial state when called with undefined state', () => {
    const state = {} // Alustetaan muuttuja "state", joka arvoksi tyhjän taulukon.
    const action = { // Alustetaan muuttuja "action", joka saa {...} sisällä olevan objektin arvon.
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action) // Alustetaan muuttuja "newState", joka suorittaa "counterReducer(...)" funktion.
    expect(newState).toEqual(originalState) // Testi odottaa, että muuttuja "newState", on yhtä kuin muuttujan "originalState" arvon kanssa.
  })

  // Alla olevan testin tarkoitus on varmistaa, että sovellus renderöi oikean
  // luvun takaisin käyttäjälle näkyviin, kun käyttäjä on klikannut painiketta.
  test('Testing if "good button" value gets incremented', () => {
    const action = { // Alustetaan muuttuja "action", joka saa {...} sisällä olevan objektin arvon.
      type: 'GOOD'
    }
    const state = originalState // Alustetaan muuttuja "state", joka on yhtä kuin => "originalState" muuttujan arvo.

    deepFreeze(state) // Funktion "deepFreeze()" avulla varmistetaan testin aikana, että "reducer" ei muuta parametrin storen tilaa.
    const newState = counterReducer(state, action) // Alustetaan muuttuja "newState", joka suorittaa "counterReducer(...)" funktion.
    expect(newState).toEqual({ // Testi odottaa, että muuttujan "newState" objektit ovat yhtä kuin alla olevien arvot.
      good: 1,
      neutral: 0,
      bad: 0
    })
  })

  // Alla olevan testin tarkoitus on varmistaa, että sovellus renderöi oikean
  // luvun takaisin käyttäjälle näkyviin, kun käyttäjä on klikannut painiketta.
  test('Testing if "neutral button" value gets incremented', () => {
    const action = { // Alustetaan muuttuja "action", joka saa {...} sisällä olevan objektin arvon.
      type: 'NEUTRAL'
    }
    const state = originalState // Alustetaan muuttuja "state", joka on yhtä kuin => "originalState" muuttujan arvo.

    deepFreeze(state) // Funktion "deepFreeze()" avulla varmistetaan testin aikana, että "reducer" ei muuta parametrin storen tilaa.
    const newState = counterReducer(state, action) // Alustetaan muuttuja "newState", joka suorittaa "counterReducer(...)" funktion.
    expect(newState).toEqual({ // Testi odottaa, että muuttujan "newState" objektit ovat yhtä kuin alla olevien arvot.
      good: 0,
      neutral: 1,
      bad: 0
    })
  })

  // Alla olevan testin tarkoitus on varmistaa, että sovellus renderöi oikean
  // luvun takaisin käyttäjälle näkyviin, kun käyttäjä on klikannut painiketta.
  test('Testing if "bad button" value gets incremented', () => {
    const action = { // Alustetaan muuttuja "action", joka saa {...} sisällä olevan objektin arvon.
      type: 'BAD'
    }
    const state = originalState // Alustetaan muuttuja "state", joka on yhtä kuin => "originalState" muuttujan arvo.

    deepFreeze(state) // Funktion "deepFreeze()" avulla varmistetaan testin aikana, että "reducer" ei muuta parametrin storen tilaa.
    const newState = counterReducer(state, action) // Alustetaan muuttuja "newState", joka suorittaa "counterReducer(...)" funktion.
    expect(newState).toEqual({ // Testi odottaa, että muuttujan "newState" objektit ovat yhtä kuin alla olevien arvot.
      good: 0,
      neutral: 0,
      bad: 1
    })
  })

  // Alla olevan testin tarkoitus on varmistaa, että sovellus renderöi takaisin
  // alkuperäiset arvot (originalState), kun käyttäjä klikkaa "reset" painiketta.
  test('Testing if "reset button" changes all the current values to original state', () => {
    const action = { // Alustetaan muuttuja "action", joka saa {...} sisällä olevan objektin arvon.
      type: 'RESET'
    }
    const state = originalState // Alustetaan muuttuja "state", joka on yhtä kuin => "originalState" muuttujan arvo.

    deepFreeze(state) // Funktion "deepFreeze()" avulla varmistetaan testin aikana, että "reducer" ei muuta parametrin storen tilaa.
    const newState = counterReducer(state, action) // Alustetaan muuttuja "newState", joka suorittaa "counterReducer(...)" funktion.
    expect(newState).toEqual(originalState) // Testi odottaa, että muuttuja "newState", on yhtä kuin muuttujan "originalState" arvon kanssa.
  })
})
