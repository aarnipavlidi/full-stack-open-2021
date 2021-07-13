// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react'; // Otetaan käyttöön "react" niminen kirjasto sovelluksen käytettäväksi.

import { CoursePart } from '../App';

const Part = ({ getValues }: { getValues: CoursePart }) => {

  if (getValues.type === "normal") {
    return (
      <div>
        <h2>Course name: {getValues.name}</h2>
        <p>Has total of {getValues.exerciseCount} different exercises!</p>
        <p>Course description: {getValues.description}</p>
      </div>
    );
  }

  if (getValues.type === "groupProject") {
    return (
      <div>
        <h2>Course name: {getValues.name}</h2>
        <p>Has total of {getValues.exerciseCount} different exercises!</p>
        <p>Group project count: {getValues.groupProjectCount}</p>
      </div>
    );
  }

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

  return null;

};



// Viedään (export) alla oleva komponentti (Part) sovelluksen käytettäväksi, jotta esim. "index.tsx" tiedosto pystyy suorittamaan kyseiset funktiot.
export default Part;
