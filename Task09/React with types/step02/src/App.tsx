// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react'; // Otetaan käyttöön "react" niminen kirjasto sovelluksen käytettäväksi.

import Header from './Components/Header'; // Alustetaan "Header" (Header.tsx) niminen komponentti sovelluksen käytettäväksi.
import Content from './Components/Content'; // Alustetaan "Content" (Content.tsx) niminen komponentti sovelluksen käytettäväksi.
import Total from './Components/Total'; // Alustetaan "Total" (Total.tsx) niminen komponentti sovelluksen käytettäväksi.

export interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

export interface CourseNormalPart extends CourseDescriptionPart {
  type: "normal";
}

export interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

export interface CourseSubmissionPart extends CourseDescriptionPart {
  type: "submission";
  exerciseSubmissionLink: string;
}

export interface CourseSpecialPart extends CourseDescriptionPart {
  type: "special";
  requirements: Array<string>;
}

export interface CourseDescriptionPart extends CoursePartBase {
  description: string;
}

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;


// Kun "App" komponenttiin tehdään viittaus, niin se suorittaa {...} sisällä olevat asiat
// ja renderöi takaisin => "return (...)" sisällä olevat asiat käyttäjälle näkyviin.
const App = () => {
  const courseName = "Half Stack application development"; // Alustetaan muuttuja "courseName", joka saa kyseisen tekstin arvoksi.
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
