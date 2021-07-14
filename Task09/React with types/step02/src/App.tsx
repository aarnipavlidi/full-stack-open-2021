// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react'; // Otetaan käyttöön "react" niminen kirjasto sovelluksen käytettäväksi.

import Header from './Components/Header'; // Alustetaan "Header" (Header.tsx) niminen komponentti sovelluksen käytettäväksi.
import Content from './Components/Content'; // Alustetaan "Content" (Content.tsx) niminen komponentti sovelluksen käytettäväksi.
import Total from './Components/Total'; // Alustetaan "Total" (Total.tsx) niminen komponentti sovelluksen käytettäväksi.

// Alustetaan "CoursePartBase" niminen interface, joka saa käyttöönsä {...}
// sisällä olevat objektien arvot ja niiden tyypit.
export interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

// Alustetaan "CourseNormalPart" niminen interface, joka saa käyttöönsä
// {...} sisällä olevan objektin arvot ja sen tyypin sekä sen lisäksi
// saa käyttöönsä "CourseDescriptionPart" kautta tulevan "description"
// objektin arvon. Tämä tarkoittaa sitä, jos tietokannan "type" arvo
// on "normal", niin kyseiselle arvolla tulee käyttöön => "name",
// "exerciseCount", "type" sekä "description" objektien arvot.
export interface CourseNormalPart extends CourseDescriptionPart {
  type: "normal";
}

// Alustetaan "CourseProjectPart" niminen interface, joka saa käyttöönsä
// {...} sisällä olevan objektin arvot ja sen tyypin sekä sen lisäksi saa
// käyttöönsä "CoursePartBase" interface:n kautta tulevat objektien arvot
// käyttöönsä. Tämä tarkoittaa sitä, jos tietokannan "type" arvo on muotoa
// "groupProject", niin kyseiselle arvolle tulee käyttöön => "name", "exerciseCount",
// "type" sekä "groupProjectCount" objektien arvot käyttöönsä.
export interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

// Alustetaan "CourseSubmissionPart" niminen interface, joka saa käyttöönsä
// {...} sisällä olevan objektin arvot ja sen tyypin sekä sen lisäksi saa käyttöönsä
// "CourseDescriptionPart" kautta tulevan "description" objektin arvon. Tämä
// tarkoittaa sitä, jos tietokannan "type" arvo on "submission", niin kyseiselle
// arvolle tulee käyttöön => "name", "exerciseCount", "type", "exerciseSubmissionLink"
// sekä "description" objektien arvot käyttöönsä.
export interface CourseSubmissionPart extends CourseDescriptionPart {
  type: "submission";
  exerciseSubmissionLink: string;
}

// Alustetaan "CourseSpecialPart" niminen interface, joka saa käyttöönsä
// {...} sisällä olevan objektin arvot ja sen tyypin sekä sen lisäksi saa käyttöönsä
// "CourseDescriptionPart" kautta tulevan "description" objektin arvon. Tämä
// tarkoittaa sitä, jos tietokannan "type" arvo on "special", niin kyseiselle
// arvolle tulee käyttöön => "name", "exerciseCount", "type", "requirements"
// sekä "description" objektien arvot käyttöönsä.
export interface CourseSpecialPart extends CourseDescriptionPart {
  type: "special";
  requirements: Array<string>;
}

// Alustetaan "CourseDescriptionPart" niminen interface, joka saa käyttöönsä
// {...} sisällä olevan objektin arvot ja sen tyypin. Tämän lisäksi interface
// saa käyttöönsä "CoursePartBase" interfacen kautta tulevat objektien arvot
// eli => "name", "exerciseCount", "type" sekä "description" arvot ovat
// käytettävissä kyseisen interfacen alla.
export interface CourseDescriptionPart extends CoursePartBase {
  description: string;
}

// Alustetaan muuttuja "CoursePart", joka yhdistää kyseiset muuttujat (interface) yhteen "Union" metodin avulla.
export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;

// Kun "App" komponenttiin tehdään viittaus, niin se suorittaa {...} sisällä olevat asiat
// ja renderöi takaisin => "return (...)" sisällä olevat asiat käyttäjälle näkyviin.
const App = () => {
  const courseName = "Half Stack application development"; // Alustetaan muuttuja "courseName", joka saa kyseisen tekstin arvoksi.
  // Alustetaan muuttuja "courseParts", joka saa käyttöönsä [...] sisällä
  // olevat arvot käyttöönsä ja muuttuja asetetaan tyypiksi "CoursePart[]".
  const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is the leisured course part",
    type: "normal"
  },
  {
    name: "Advanced",
    exerciseCount: 7,
    description: "This is the harded course part",
    type: "normal"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
    type: "groupProject"
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
    type: "submission"
  },
  {
    name: "Backend development",
    exerciseCount: 21,
    description: "Typing the backend",
    requirements: ["nodejs", "jest"],
    type: "special"
  }
]

  // Renderöidään (...) sisällä olevat asiat takaisin käyttäjälle näkyviin.
  return (
    <div>
      <Header name={courseName} />
      <Content data={courseParts} />
      <Total data={courseParts} />
    </div>
  );
};

// Viedään (export) alla oleva komponentti (App) sovelluksen käytettäväksi, jotta esim. "index.tsx" tiedosto pystyy suorittamaan kyseiset funktiot.
export default App;
