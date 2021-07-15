// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from "react"; // Tuodaan "React" niminen kirjasto sovelluksen käytettäväksi.
import axios from "axios"; // Tuodaan "axios" niminen kirjasto sovelluksen käytettäväksi.
import { useParams } from "react-router-dom"; // Tuodaan "useParams" niminen funktio => "react-router-dom" nimisen kirjaston kautta sovelluksen käytettäväksi.

import { apiBaseUrl } from "../constants"; // Tuodaan "apiBaseUrl" niminen muuttuja => "constants.ts" nimisen tiedoston kautta sovelluksen käytettäväksi.
// Lisätty alla oleva "setPatientPersonalList" funktio sovelluksen käytettäväksi "9.18: patientor, step3" tehtävää varten.
import { useStateValue, setPatientPersonalList } from "../state"; // Tuodaan "useStateValue" niminen muuttuja => "state.tsx" nimisen tiedoston kautta sovelluksen käytettäväksi.
import { Patient } from '../types'; // Tuodaan "Patient" niminen tyyppi => "types.ts" nimisen tiedoston kautta sovelluksen käytettäväksi.

import { Container } from "semantic-ui-react"; // Tuodaan kyseiset tyylit "semantic-ui-react" kirjaston kautta sovelluksen käytettäväksi.

// Alustetaan "PatientFullData" niminen komponentti, joka suorittaa {...} sisällä olevat asiat aina,
// kun kyseiseen komponenttii tehdään viittaus. Komponentin ideana on siis renderöidä käyttäjälle
// tietyn potilaan (patient) tiedot omassa näkymässään, missä ei näy muiden potilaiden tietoja vaan
// ainoastaan "klikatun" potilaan tiedot. Tiedot haetaan erikseen tietokannasta palvelimen puolelta
// "useEffect(...)" funktion avulla ja tallennetaan "stateen" => "personalPatientData" objektin alle.
// Olemme siis luoneet erillisen objektin arvon stateen, ja emme koske tai muuta "patient" objektin
// tilaa, mistä löytyy kaikki potilaiden tiedot. Ota myös huomioon, että "useEffect(...)" funktio
// suorittaa aina, kun tapahtuu muutoksia "id" muuttujan kanssa eli aina kun käyttäjä klikkaa tiettyä
// potilasta, niin funktio suoritetaan. Mikäli "statesta" eli => "personalPatientData" objektin arvosta
// löytyy jo dataa, mikä vastaa "klikatun" potilaan => "id":n objektin arvoa, niin emme hae uudestaan
// erikseen palvelimesta dataa, vaan tiedot renderöidään "staten" kautta takaisin käyttäjälle näkyviin.
const PatientFullData = () => {

  const [{personalPatientData}, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>(); // Alustetaan muuttuja "id", joka suorittaa kyseisen funktion.

  // Alustetaan muuttuja "currentPatientData", joka saa tyypiksi joko "Patient" tai "undefined" ja
  // se suorittaa kyseisen funktion eli se hakee "personalPatientData" muuttujasta arvon, jonka objektin
  // arvo => "id" vastaa klikatun potilaan objektin arvoa => "useParams(...)" ja palauttaa takaisin datan.
  const currentPatientData: Patient | undefined = Object.values(personalPatientData).find(results => results.id === id);

  // Alustetaan muuttuja "checkingPatientData", joka saa tyypiksi "boolean" eli joko "true" tai "false" ja
  // se suorittaa kyseisen funktion eli me tarkistetaan, että löytyykö "statesta" => "personalPatientData"
  // muuttujasta jo dataa, joka täsmää klikatun potilaan "id" arvoa. Tätä hyödynnetään "useEffect(...)"
  // funktiossa, jotta varmistetaan että emme tee "turhia" pyyntöä palvelimeen, jos dataa jo löytyy! :)
  const checkingPatientData: boolean = Object.values(personalPatientData).some(results => results.id === id);

  // Alustetaan "useEffect(...)" funktio, joka suorittaa {...} sisällä olevat asiat aina,
  // kun tapahtuu muutoksia "id" muuttujan osalta eli aina, kun käyttäjä "klikkaa"
  // tiettyä potilasta, niin kyseinen funktio suoritetaan ja palautetaan takaisin data.
  React.useEffect(() => {
    const getPatientPersonalData = async () => {
      try { // Ensin yritetään suorittaa "try" osuus, jos sen aikana tulee virheitä, niin sovellus suorittaa "catch" osuuden.
        // Jos muuttuja "checkingPatientData" on yhtä kuin "true", niin ei tehdä mitään "useEffect(...)"
        // funktion osalta. Muussa tapauksesa siirrytään "else" pariin ja suoritetaan {...} sisällä olevat asiat.
        if (checkingPatientData === true) {
          return null;
        } else { // Jos yllä oleva ehto ei toteudu, niin suoritetaan {...} sisällä oleva asia.
          // Alustetaan kyseinen muuttuja, joka suorittaa kyseisen funktion. Kun funktio palauttaa
          // takaisin datan, niin se siirtyy "patientPersonalDataFromDatabase" muuttujan alle,
          // jonka avulla voidaan suorittaa "dispatch(...)" funktio eli suoritetaan "GET_PATIENT_PERSONAL_DATA"
          // tyyppinen "dispatch", joka siirtää datan "stateen" oman objektin alle.
          const { data: patientPersonalDataFromDatabase } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
          // Tehtävää "9.18: patientor, step3" varten muokattu alla olevaa koodia niin,
          // että nyt suoritetaan "dispatch(...)" funktio => "setPatientPersonalList" funktion
          // avulla, joka saa parametrin arvoksi => "patientPersonalDataFromDatabase".
          dispatch(setPatientPersonalList(patientPersonalDataFromDatabase));
        }
      } catch (error) { // Jos yllä olevan osuuden aikana tulee virheitä, niin suoritetaan "catch" osuus.
        console.log(error); // Tulostetaan mahdollinen virhe takaisin konsoliin näkyviin käyttäjälle.
      }
    };
    void getPatientPersonalData();
  }, [id]); // Kyseinen "useEffect(...)" funktio suoritetaan aina, kun tapahtuu muutoksia "id" muuttujan osalta.

  // Jos "currentPatientData" on "false" (epätosi), niin ei renderöidä mitään takaisin käyttäjälle.
  if (!currentPatientData) {
    return null;
  }

  // Muussa tapauksesa komponentti renderöi (...) sisällä olevat asiat takaisin käyttäjälle näkyviin.
  return (
    <div>
      <Container textAlign="left">
          <div key={currentPatientData.id}>
            <h2>Patient name is: {currentPatientData.name} ({currentPatientData.gender})</h2>
            <h4>SSN: {currentPatientData.ssn}</h4>
            <h4>Occupation: {currentPatientData.occupation}</h4>
            <h5>Patient ID: {currentPatientData.id}</h5>
          </div>
      </Container>
    </div>
  );
};

// Viedään (export) alla oleva komponentti (PatientFullData) sovelluksen käytettäväksi, jotta esim. "index.ts" tiedosto pystyy suorittamaan kyseiset funktiot.
export default PatientFullData;
