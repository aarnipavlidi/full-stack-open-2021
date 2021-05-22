// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import { useState } from 'react' // Sovellus ottaa "useState" funktion käyttöönsä => "react" nimisen kirjaston kautta.

// Alustetaan muuttuja "useCreateValue", joka suorittaa {...} sisällä olevat asiat,
// aina kun kyseiseen funktioon tehdään viittaus. Funktio toimii "custom-hookkina".
// Muuttuja myös hyödyntää parametrinä "newValueType" arvoa, jonka avulla määritellään
// sovelluksessa input:in jokaisen oma tekstityyppi (type) esim. => "text".
export const useCreateValue = (newValueType) => {
  // Alustetaan muuttuja "newValue" tilaan, joka saa oletuksena arvon ''. Jos tilaa
  // halutaan muuttaa, niin käytetään "setNewValue" funktiota. Koska meillä on tällä
  // hetkellä kolme (3) erilaista input:in kenttää, kun käyttäjä haluaa luoda uuden
  // arvon tietokantaan, niin jokainen niistä on omassa tilassa (state). Jos me haluamme
  // päästä käsiksi tilan sen hetkiseen arvoon, niin me käytämme seuraavaa eli =>
  // "var.newValue", missä "var" käyttää "useCreateValue(...)" funktiota.
  const [newValue, setNewValue] = useState('')

  // Alustetaan muuttuja "handleChange", joka suorittaa {...} sisällä olevat asiat,
  // aina kun kyseiseen funktioon tehdään viittaus eli aina kun käyttäjä kirjoittaa
  // jotain inputtiin, niin sen hetkinen arvo tallennetaan "newValue" muuttujan
  // alle. Ota myös huomioon, että jokainen input:in arvo saa oman "staten".
  const handleChange = (event) => {
    setNewValue(event.target.value)
  }

  // Viedään alla olevat muuttujat käytettäväksi sovelluksen käytettäväksi, jotta esim. "App.js" tiedosto pääsee käsiksi alla oleviin funktioihin.
  return {
    newValueType,
    newValue,
    handleChange
  }
}
