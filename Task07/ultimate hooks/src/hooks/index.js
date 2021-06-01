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
  // aina, kun kyseiseen funktioon tehdään viittaus.
  const onChange = (event) => {
    setValue(event.target.value)
  }

  // Alustetaan muuttuja "resetValue", joka suorittaa {...} sisällä olevan
  // asian aina, kun kyseiseen funktioon tehdään viittaus.
  const resetValue = () => {
    setValue('') // Muutetaan "value" muuttujan arvo => alkuperäiseen arvoon/tilaan eli => ''.
  }

  // Viedään alla olevat muuttujat käytettäväksi sovelluksen käytettäväksi, jotta esim. "App.js" tiedosto pääsee käsiksi alla oleviin funktioihin.
  return {
    type,
    value,
    onChange,
    resetValue
  }
}

// Alustetaan muuttuja "useResource", joka suorittaa {...} sisällä olevat asiat aina,
// kyseiseen funktioon tehdään viittaus. Funktio toimii "custom-hookkina" ja, koska
// meillä on tietokannasta kaksi (2) erilaista arvoa eli "notes" sekä "persons",
// niin alustetaan molemmat "omaan tilaan" eli sovelluksessa käytetään =>
// "useResource(...)", missä (...) sisällä oleva arvo on yhtä kuin => "getDatabase".
// Käytämme myös "useEffect(...)" funktiota, jossa lopussa on "[getDatabase]"
// parametri, tämän avulla me haetaan halutut arvot tietokannasta vain kerran,
// kun käyttäjä saapuu sovellukseen ensimmäistä kertaa.
export const useResource = (getDatabase) => {
  const [resources, setResources] = useState([]) // Alustetaan muuttuja "resources" tilaan, joka saa oletuksena tyhjän taulukon [] arvon.

  // Alustetaan "useEffect(...)" funktio, joka suorittaa {...} sisällä olevat asiat vain kerran (aina kun käyttäjä saapuu sovellukseen ensimmäistä kertaa).
  useEffect(async () => {
    const response = await axios.get(getDatabase) // Alustetaan muuttuja "response", joka suorittaa kyseisen funktion.
    setResources(response.data) // Muutetaan "resources" tilaa kyseisen muuttujan => "response.data" arvoon.
  }, [getDatabase])

  // Alustetaan muuttuja "createNewValue", joka suorittaa {...} sisällä olevat asiat,
  // aina kun kyseiseen funktioon tehdään viittaus eli aina, kun käyttäjä haluaa
  // lisätä uuden arvon tietokantaan, niin kyseinen funktio suoritetaan. Parametri
  // "newValue" saa käyttäjän lisäämän arvon (input kentästä) käyttöönsä, jonka
  // avulla lisätään se tietokantaan ja varmistetaan, että se kohdistuu "oikeaan"
  // tietokantaan => "getDatabase" parametrin avulla.
  const createNewValue = async (newValue) => {
    const response = await axios.post(getDatabase, newValue) // Alustetaan muuttuja "response", joka suorittaa kyseisen funktion.
    setResources(resources.concat(response.data)) // Muutetaan "resources" tilaa yhdistämällä "resources" muuttujan nykyinen arvo => "response.data" muuttujan datan kanssa.
  }

  // Viedään alla olevat muuttujat käytettäväksi sovelluksen käytettäväksi, jotta esim. "App.js" tiedosto pääsee käsiksi alla oleviin funktioihin.
  return [
    resources, createNewValue
  ]
}
