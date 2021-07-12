// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react'; // Otetaan käyttöön "react" niminen kirjasto sovelluksen käytettäväksi.

// Alustetaan "ContentProps" niminen interface, joka saa käyttöönsä
// {...} sisällä olevien objektien arvot.
interface ContentProps {
  name: string;
  exerciseCount: number;
}

// Alustetaan "ContentDataProps" niminen interface, joka saa käyttöönsä
// {...} sisällä olevan "data" objektin arvo, joka saa "Array<ContentProps">
// tyypin eli, kun me renderöimme komponentin => "Content", niin me annetaan
// propsin arvoksi kyseisen interfacen. Propsin => "data" arvosta löytyy myös
// "name" ja "exerciseCount" objektien arvot renderöintiä varten.
interface ContentDataProps {
  data: Array<ContentProps>
}

// Alustetaan "Total" niminen komponentti, joka suorittaa {...} sisällä olevat asiat
// aina kun kyseiseen komponenttiin tehdään viittaus. Komponentti saa myös käyttöönsä
// parametrin arvoksi => "props" muuttujan arvon. Komponentti siis hakee erikseen
// "App.js" tiedostosta datan "courseParts" muuttujasta ja laskee, että kuinka
// monta erilaista tehtävää löytyy yhteensä ja renderöi lopuksi arvon näkyviin.
const Total = (props: ContentDataProps) => {

  return <div><p>Number of different exercises{" "}
    {props.data.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p></div>
  };

// Viedään (export) alla oleva komponentti (Total) sovelluksen käytettäväksi, jotta esim. "index.tsx" tiedosto pystyy suorittamaan kyseiset funktiot.
export default Total;
