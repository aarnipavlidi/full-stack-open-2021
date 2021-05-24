// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React, { useEffect, useState } from 'react' // Sovellus ottaa käyttöön "react" kirjaston sekä mahdollistetaan "useEffect" ja "useState" funktioiden käyttö sovelluksessa.
import axios from 'axios' // Sovellus ottaa "axios" nimisen kirjaston käyttöönsä.

// Alustetaan muuttuja "useField", joka suorittaa {...} sisällä olevat asiat,
// aina kun kyseiseen funktioon tehdään viittaus eli aina kun käyttäjä
// kirjoittaa jotain input:in kentään, niin muutetaan "value" muuttujan
// tilaa. Funktio saa myös käyttöönsä parametrin "type" arvon.
export const useField = (type) => {
  const [value, setValue] = useState('') // Alustetaan muuttuja "value" tilaan, joka saa oletuksena arvon => ''.

  // Alustetaan muuttuja "onChange", joka suorittaa {...} sisällä olevat asiat
  // aina, kun kyseiseen funktioon tehdään viittaus. Tässä tehtävässä sitä
  // käytetään "App.js" tiedostossa => <input> elementissä, missä "onChange"
  // arvo on yhtä kuin => "customHookInput.onChange" (eli "useField.onChange").
  const onChange = (event) => {
    setValue(event.target.value) // Muutetaan "value" muuttujan tilaa, vaihtamalla kyseiseen muuttujan arvoon eli => "event.target.value".
  }

  // Viedään alla olevat muuttujat käytettäväksi sovelluksen käytettäväksi, jotta esim. "App.js" tiedosto pääsee käsiksi alla oleviin funktioihin.
  return {
    type,
    value,
    onChange
  }
}

// Alustetaan muuttuja "useCountry", joka suorittaa {...} sisällä olevat asiat,
// aina kun kyseiseen funktioon tehdään viittaus eli aina kun käyttäjä hakee
// tiettyä arvoa (find painikkeen avulla), niin "getCurrentValue" parametrin
// arvo muuttuu, jonka ansiosta suoritetaan alla oleva => "useEffect(...)".
export const useCountry = (getCurrentValue) => {
  const [countryValue, setCountryValue] = useState('') // Alustetaan muuttuja "countryValue" tilaan, joka saa oletuksena arvon => ''.

  useEffect(() => {
    // Jos alla oleva if-ehto toteutuu eli => "getCurrentValue" muuttujan arvo on tyhjä, niin ei palauteta mitään.
    if (!getCurrentValue) return

    // Muussa tapauksessa suoritetaan {...} sisällä oleva, joka hyödyntää => "try - catch" metodia.
    // Jos alla olevan funktion (fetchData) aikana tulee virheitä, niin sovellus siirtyy =>
    // "catch(...)" kohtaan ja suorittaa {...} sisällä olevan asian. Molemmissa kohdissa me kuitenkin
    // Muutetaan "countryValue" muuttujan tilaa ja palautetaan takaisin (return countryValue) sovelluksen
    // => "App.js" tiedoston käytettäväksi. Olemme myös lopuksi asettaneet => [getCurrentValue] parametrin
    // arvon eli aina kun kyseinen arvo muuttuu, niin suoritetaan => "fetchData()" funktion. Muussa tapauksessa
    // ei tehdä/renderöidä mitään. Tämä tarkoittaa sitä, että oletuksena kun käyttäjä saapuu sovellukseen
    // ensimmäistä kertaa, niin tätä kyseistä funktiota ei suoriteta!
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://restcountries.eu/rest/v2/name/${getCurrentValue}?fullText=true`)
        setCountryValue(response.data[0]) // Muutetaan "countryValue" muuttujan tilaa, vaihtamalla kyseisen muuttujan arvoon eli => "response.data[0]".
      } catch (error) { // Jos "response" muuttujan aikana tulee virheitä, niin suoritetaan {...} sisällä oleva asia.
        setCountryValue(error.message) // Muutetaan "countryValue" muuttujan tilaa, vaihtamalla kyseiseen muuttujan arvoon eli => "error.message".
      }
    }
    fetchData() // Suoritetaan kyseisen funktio aina, kun "getCurrentValue" muuttujan arvo muuttuu.
  }, [getCurrentValue])

  // Viedään alla olevat muuttujat käytettäväksi sovelluksen käytettäväksi, jotta esim. "App.js" tiedosto pääsee käsiksi alla oleviin funktioihin.
  return countryValue
}
