// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from "react"; // Tuodaan "React" niminen kirjasto sovelluksen käytettäväksi.
import { Container } from "semantic-ui-react"; // Tuodaan kyseiset tyylit "semantic-ui-react" kirjaston kautta sovelluksen käytettäväksi.
import { Diagnosis, Entry } from "../types"; // Tuodaan "Diagnosis" ja "Entry" nimiset tyypit => "types.ts" tiedostosta sovelluksen käytettäväksi.
import '../style.css'; // Tuodaan "custom css" kyseisen tiedoston kautta sovelluksen käytettäväksi.

// Tehtävää "9.22: patientor, step7" varten lisätty uusi komponentti "OccupationalHealthcare",
// joka renderöi potilaan mahdolliset "entries" objektin tiedot takaisin käyttäjälle näkyviin.
// Muuten koodi on täysin samanlainen kuin edellisessä tehtävässä (step6) paitsi, että
// nyt lisätty "Container" elementti, lisätty uusi tyyli "custom-container" ja muokattu
// hieman "entry-css" tyyliluokkaa. Komponentti saa myös käyttöönsä "getValues" muuttujan
// arvon parametrin arvoksi, jolle annetaan "Entry" tyyppi sekä "diagnosisData" parametrin
// arvon, jolle annetaan => "Diagnosis[]" tyypiksi.
const OccupationalHealthcare = ({ getValues, diagnosisData }: { getValues: Entry, diagnosisData: Diagnosis[] }) => {

  // Tehtävää "9.21: patientor, step6" varten lisätty alla oleva funktio eli "getCurrentCodeName",
  // joka suorittaa {...} sisällä olevat asiat aina kun kyseiseen funktioon tehdään viittaus.
  // Funktio saa myös käyttöönsä parametrin arvon "getCurrentCode" (string), joka tulee, kun renderöidään
  // potilaan tiedot näkyviin käyttäjälle. Kun funktio palauttaa takaisin arvon, niin arvon täytyy olla
  // joko "string" tai => "name" objekti "Diagnosis" tyypistä. Funktio siis hakee parametrin avulla
  // statesta => "diagnosisData" taulukosta arvon, jonka "code" objekti täsmää sen hetkisen parametrin
  // arvon kanssa. Tämän jälkeen "response" muuttuja saa käyttöönsä arvon, josta löytyy sen "code"
  // objektin arvon liitoksissa olevat muut objektien arvot.
  const getCurrentCodeName = (getCurrentCode: string): Diagnosis["name"] | string => {
    const response: Diagnosis | undefined = Object.values(diagnosisData).find(results => results.code === getCurrentCode); // Alustetaan muuttuja "response", joka suorittaa kyseisen funktion.
    // Jos "response" muuttuja palauttaa "false" (epätosi) eli ei löydy dataa,
    // koska emme voi olettaa, että jokaiselle potilaalle suunnattu koodi löytyy
    // meidän tietokannasta entuudestaan, niin siinä tapauksessa palautetaan
    // takaisin käyttäjälle alla oleva teksti (string).
    if (!response) {
      return "Could not find explanation for this code! :(";
    }

    // Muussa tapauksessa, jos "response" muuttujan alle ilmestyy dataa, niin
    // palautetaan takaisin käyttäjälle (...) sisällä oleva asia eli
    // "response.name" muuttuja mikä viittaa siis => "Diagnosis["name"]" tyyppiin.
    return (
      response.name
    );
  };

  if (getValues.type === "OccupationalHealthcare" && !getValues.diagnosisCodes) {
    return (
      <Container className="custom-container">
        <div className='entry-css'>
          <p><b>{getValues.date}:</b> {getValues.description} <i className="fas fa-file-medical"></i></p>
          <p>No diagnosis codes for this entry! :(</p>
        </div>
      </Container>
    );
  }

  if (getValues.type === "OccupationalHealthcare" && getValues.diagnosisCodes) {
    return (
      <Container className="custom-container">
        <div className='entry-css'>
          <p><b>{getValues.date}:</b> {getValues.description} <i className="fas fa-file-medical"></i></p>
            <ul>
              {getValues.diagnosisCodes.map((results, index: number) =>
                <li key={index}><b>{results}:</b> {getCurrentCodeName(results)}</li>
              )}
            </ul>
        </div>
      </Container>
    );
  }

  return null; // Jos mikään yllä olevista ehdoista ei toteudu, niin ei renderöidä mitään takaisin käyttäjälle.
};

// Viedään (export) alla oleva komponentti (OccupationalHealthcare) sovelluksen käytettäväksi, jotta esim. "index.tsx" tiedosto pystyy suorittamaan kyseiset funktiot.
export default OccupationalHealthcare;
