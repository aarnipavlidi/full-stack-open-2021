// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react'; // Otetaan käyttöön "react" niminen kirjasto sovelluksen käytettäväksi.
import Part from './Part'; // Tuodaan "Part" komponentti (Part.tsx) sovelluksen käytettäväksi.
import { CoursePart } from '../App'; // Tuodaan "CoursePart" tyyppi ("type CoursePart") sovelluksen käytettäväksi.

// Alustetaan muuttuja "assertNever", joka suorittaa {...} sisällä olevat asiat
// aina kun kyseiseen funktioon tehdään viittaus. Funktion tarkoituksena on siis
// toimia niin, että kun komponenttia renderöidään ja jos sen aikana tulee
// arvoa mitä sovellus ei osannut odottaa (unexpected value), niin tämä
// funktio suoritetaan, joka palauttaa takaisin (...) sisällä olevan asian.
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

// Alustetaan "Content" niminen komponentti, joka suorittaa {...} sisällä olevat asiat
// aina kun kyseiseen komponenttiin tehdään viittaus. Komponentti saa myös käyttöönsä
// parametrin arvoksi "data" muuttujan arvon, jolle annetaan tyypiksi "CoursePart[]".
// Tämä tarkoittaa sitä, että kun komponentti renderöidään käyttäjälle näkyviin, niin
// se hakee erikseen "tietokannasta" taulukollisen erilaisia arvoa, joille annetaan
// tietyt objektien arvot, jos ne ovat "saatavilla", kun "type" objektin arvo on
// tiettyä tekstiä => esim. "groupProject". Käytämme alhaalla siis "switch case"
// metodia, ja jokaisen "case":n kohdalla => muuttujalle "value" tulee saatavaksi
// erilaisia objektin arvoa käytettäväksi. Nämä objektin arvot lopulta "Part"
// komponentti renderöi takaisin käyttäjälle näkyviin.
const Content = ({ data }: { data: CoursePart[] }) => {
  // Alustetaan muuttuja "showContent", joka suorittaa kyseisen asian aina,
  // kun muuttujaan tehdään viittaus. Muuttuja hakee siis taulukollisen erilaisia
  // arvoja "tietokannasta" (data) ja käytetään "map(...)" funktiota, joka määrittää
  // "value" muuttujan avulla, että jos "type" objekti on tiettyä arvoa, niin
  // palautetaan sen kohdalla oleva "Part" komponentti, muussa tapauksessa siirrytään
  // seuraavaan "case" funktion pariin.
  const showContent = data.map(value => {
    switch (value.type) {
      case "normal":
        return <Part getValues={value} />;
      case "groupProject":
        return <Part getValues={value} />;
      case "submission":
        return <Part getValues={value} />;
       case "special":
        return <Part getValues={value} />;
      default:
        return assertNever(value);
      }
    });

    return (
      <div>
        {showContent}
      </div>
    )
};

// Viedään (export) alla oleva komponentti (Content) sovelluksen käytettäväksi, jotta esim. "index.tsx" tiedosto pystyy suorittamaan kyseiset funktiot.
export default Content;
