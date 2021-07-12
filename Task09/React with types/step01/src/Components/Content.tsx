// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react'; // Otetaan käyttöön "react" niminen kirjasto sovelluksen käytettäväksi.
// Funktion avulla voidaan generoida "random" id:n arvoja, jokaiselle omalla arvolle kun renderöidään arvot käyttäjälle näkyviin.
import { uuid } from 'uuidv4'; // Otetaan käyttöön "uuid" funktio kyseisestä kirjastosta => "uuidv4" sovelluksen käytettäväksi.

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

// Alustetaan "Content" niminen komponentti, joka suorittaa {...} sisällä olevat asiat
// aina kun kyseiseen komponenttiin tehdään viittaus. Komponentti saa myös käyttöönsä
// parametrin arvoksi => "props" muuttujan arvon. Komponentti siis hakee erikseen
// "App.js" tiedostosta arvot "courseParts" muuttujasta ja renderöi jokaisen arvon
// omalle rivilleen, johon tulee "name" sekä "exerciseCount" objektien arvot.
const Content = (props: ContentDataProps) => {

  return <div>{props.data.map(results =>
    <div key={uuid()}>
      <p>Course called: <b>{results.name}</b> has total of <b>{results.exerciseCount}</b> different exercises!</p>
    </div>
  )}</div>
};

// Viedään (export) alla oleva komponentti (Content) sovelluksen käytettäväksi, jotta esim. "index.tsx" tiedosto pystyy suorittamaan kyseiset funktiot.
export default Content;
