// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react'; // Otetaan käyttöön "react" niminen kirjasto sovelluksen käytettäväksi.

import Part from './Part';
import { CoursePart } from '../App';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};


// Alustetaan "Content" niminen komponentti, joka suorittaa {...} sisällä olevat asiat
// aina kun kyseiseen komponenttiin tehdään viittaus. Komponentti saa myös käyttöönsä
// parametrin arvoksi => "props" muuttujan arvon. Komponentti siis hakee erikseen
// "App.js" tiedostosta arvot "courseParts" muuttujasta ja renderöi jokaisen arvon
// omalle rivilleen, johon tulee "name" sekä "exerciseCount" objektien arvot.
const Content = ({ data }: { data: CoursePart[] }) => {

  const aarni = data.map(value => {
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
        {aarni}
      </div>
    )

};

// Viedään (export) alla oleva komponentti (Content) sovelluksen käytettäväksi, jotta esim. "index.tsx" tiedosto pystyy suorittamaan kyseiset funktiot.
export default Content;
