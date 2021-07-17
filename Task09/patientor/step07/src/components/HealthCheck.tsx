// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from "react"; // Tuodaan "React" niminen kirjasto sovelluksen käytettäväksi.
import { Container } from "semantic-ui-react"; // Tuodaan kyseiset tyylit "semantic-ui-react" kirjaston kautta sovelluksen käytettäväksi.
import { Entry } from "../types"; // Tuodaan "Entry" niminen tyyppi => "types.ts" tiedostosta sovelluksen käytettäväksi.
import '../style.css'; // Tuodaan "custom css" kyseisen tiedoston kautta sovelluksen käytettäväksi.

// Tehtävää "9.22: patientor, step7" varten lisätty uusi komponentti "HealthCheck", joka
// renderöi potilaan mahdolliset "entries" objektin tiedot takaisin käyttäjälle näkyviin.
// Muuten koodi on täysin samanlainen kuin edellisessä tehtävässä (step6) paitsi, että
// nyt lisätty "Container" elementti, lisätty uusi tyyli "custom-container" ja muokattu
// hieman "entry-css" tyyliluokkaa. Komponentti saa myös käyttöönsä "getValues" muuttujan
// arvon parametrin arvoksi, jolle annetaan "Entry" tyyppi.
const HealthCheck = ({ getValues }: { getValues: Entry }) => {

  if (getValues.type === "HealthCheck") {
    return (
      <Container className="custom-container">
        <div className='entry-css'>
          <p><b>{getValues.date}:</b> {getValues.description} <i className="fas fa-heartbeat"></i></p>
          <p>No diagnosis codes for this entry! :(</p>
        </div>
      </Container>
    );
  }

  return null; // Jos yllä oleva ehto ei toteudu, niin ei renderöidä mitään takaisin käyttäjälle.
};

// Viedään (export) alla oleva komponentti (HealthCheck) sovelluksen käytettäväksi, jotta esim. "index.tsx" tiedosto pystyy suorittamaan kyseiset funktiot.
export default HealthCheck;
