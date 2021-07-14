// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react'; // Otetaan käyttöön "react" niminen kirjasto sovelluksen käytettäväksi.
import { CoursePart } from '../App'; // Tuodaan "CoursePart" tyyppi ("type CoursePart") sovelluksen käytettäväksi.

// Alustetaan "Part" niminen komponentti, joka suorittaa {...} sisällä olevat asiat aina,
// kun kyseiseen komponenttiin tehdään viittaus. Komponentti saa myös käyttöönsä parametrin
// arvoksi => "getValues" muuttujan arvon ja asetetaan kyseiselle muuttujalle tyyppi, joka
// noudattaa "CoursePart" tyypin rakennetta. Tämä tarkoittaa sitä, että jos esim.
// komponentin viittauksen yhteydessä "getValues.type" on yhtä kuin => "groupProject",
// niin "CoursePart" tyyppi odottaa, että ainoastaan neljä (4) objektin arvoa on käytettävissä
// eli "name", "exerciseCount", "groupProjectCount" ja "type". Jos haluaisimme käyttää
// esim. "description" tai "exerciseSubmissionLink" objektin arvoa, niin tulisi erroria!
const Part = ({ getValues }: { getValues: CoursePart }) => {

  // Jos kyseinen if-ehto toteutuu, eli "getValues.type" on yhtä kuin "normal",
  // niin komponentti renderöi {...} sisällä olevat asiat takaisin käyttäjälle
  // näkyviin. Muussa tapauksessa ei renderöi mitään "null" käyttäjälle.
  if (getValues.type === "normal") {
    return (
      <div>
        <h2>Course name: {getValues.name}</h2>
        <p>Has total of {getValues.exerciseCount} different exercises!</p>
        <p>Course description: {getValues.description}</p>
      </div>
    );
  }

  // Jos kyseinen if-ehto toteutuu, eli "getValues.type" on yhtä kuin "groupProject",
  // niin komponentti renderöi {...} sisällä olevat asiat takaisin käyttäjälle
  // näkyviin. Muussa tapauksessa ei renderöi mitään "null" käyttäjälle.
  if (getValues.type === "groupProject") {
    return (
      <div>
        <h2>Course name: {getValues.name}</h2>
        <p>Has total of {getValues.exerciseCount} different exercises!</p>
        <p>Group project count: {getValues.groupProjectCount}</p>
      </div>
    );
  }

  // Jos kyseinen if-ehto toteutuu, eli "getValues.type" on yhtä kuin "submission",
  // niin komponentti renderöi {...} sisällä olevat asiat takaisin käyttäjälle
  // näkyviin. Muussa tapauksessa ei renderöi mitään "null" käyttäjälle.
  if (getValues.type === "submission") {
    return (
      <div>
        <h2>Course name: {getValues.name}</h2>
        <p>Has total of {getValues.exerciseCount} different exercises!</p>
        <p>Course description: {getValues.description}</p>
        <p>Course submission link: {getValues.exerciseSubmissionLink}</p>
      </div>
    );
  }

  // Jos kyseinen if-ehto toteutuu, eli "getValues.type" on yhtä kuin "special",
  // niin komponentti renderöi {...} sisällä olevat asiat takaisin käyttäjälle
  // näkyviin. Muussa tapauksessa ei renderöi mitään "null" käyttäjälle.
  if (getValues.type === "special") {
    return (
      <div>
        <h2>Course name: {getValues.name}</h2>
        <p>Has total of {getValues.exerciseCount} different exercises!</p>
        <p>Course description: {getValues.description}</p>
        <p>Requirement for the course: {getValues.requirements}</p>
      </div>
    )
  }

  return null; // Jos mikään ehto ei toteudu, niin palautetaan takaisin "null" arvo käyttäjälle.
};

// Viedään (export) alla oleva komponentti (Part) sovelluksen käytettäväksi, jotta esim. "index.tsx" tiedosto pystyy suorittamaan kyseiset funktiot.
export default Part;
