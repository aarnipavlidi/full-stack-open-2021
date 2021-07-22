// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from "react"; // Tuodaan "React" niminen kirjasto sovelluksen käytettäväksi.
import axios from "axios"; // Tuodaan "axios" niminen kirjasto sovelluksen käytettäväksi.
import { useParams } from "react-router-dom"; // Tuodaan "useParams" niminen funktio => "react-router-dom" nimisen kirjaston kautta sovelluksen käytettäväksi.

import { apiBaseUrl } from "../constants"; // Tuodaan "apiBaseUrl" niminen muuttuja => "constants.ts" nimisen tiedoston kautta sovelluksen käytettäväksi.
// Lisätty alla oleva "setPatientPersonalList" funktio sovelluksen käytettäväksi "9.18: patientor, step3" tehtävää varten.
// Lisätty alla oleva "setDiagnosesList" funktio sovelluksen käytettäväksi "9.21: patientor, step6" tehtävää varten.
// Lisätty alla oleva "addPatientEntryTolist" funktio sovelluksen käytettäväksi "9.24: patientor, step9" tehtävää varten.
import { useStateValue, setPatientPersonalList, setDiagnosesList, addPatientEntryTolist } from "../state"; // Tuodaan "useStateValue" niminen muuttuja => "state.tsx" nimisen tiedoston kautta sovelluksen käytettäväksi.
import { Patient, Diagnosis } from '../types'; // Tuodaan "Patient" niminen tyyppi => "types.ts" nimisen tiedoston kautta sovelluksen käytettäväksi.

// Tuodaan alla olevat komponentit "../src/components/..." lähteestä sovelluksen käytettäväksi.
import OccupationalHealthcare from './OccupationalHealthcare'; // Luotu uusi komponentti "9.22: patientor, step7" tehtävää varten.
import Hospital from './Hospital'; // Luotu uusi komponentti "9.22: patientor, step7" tehtävää varten.
import HealthCheck from './HealthCheck'; // Luotu uusi komponentti "9.22: patientor, step7" tehtävää varten.
import AddPatientEntryModal from './AddPatientEntryModal'; // Luotu uusi komponentti "9.24: patientor, step9" tehtävää varten.

import { Container, Button } from "semantic-ui-react"; // Tuodaan kyseiset tyylit "semantic-ui-react" kirjaston kautta sovelluksen käytettäväksi.
import '../style.css'; // Tuodaan "custom css" kyseisen tiedoston kautta sovelluksen käytettäväksi.

import { Entry } from "../types"; // Lisätty "Entry" tyyppi "9.24: patientor, step9" tehtävää varten.

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

  // Lisätty "modalOpen" muuttuja "9.24: patientor, step9" tehtävää varten, joka
  // alustetaan "stateen". Muuttujan avulla sovellus määrittää, että onko uuden
  // "entry" arvon formi piilossa vai näkyvissä. Oletuksena se on piilossa eli
  // muuttuja saa arvon "false". Mikäli käyttäjä haluaa lisätä uuden arvon
  // niin muuttuja saa arvon => "true" => "setModalOpen(true)". Myös aina
  // kun käyttäjä on lisännyt uuden arvon tietokantaan, niin sovellus sulkee
  // "modalin" pois näkyvistä käyttäjältä.
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  // Alustetaan "error" muuttuja "9.24: patientor, step9" tehtävää varten, joka
  // alustetaan "stateen". Muuttujan avulla sovellus pystyy näyttämään, jos uuden
  // arvon lisäämisen aikana, tietty kenttä puuttuu (validoinnin kautta). Sovellus
  // renderöi kentän ala puolelle tekstin => "Field is required".
  const [error, setError] = React.useState<string | undefined>();

  // Alustetaan "openModal" muuttuja "9.24: patientor, step9" tehtävää varten, joka
  // suorittaa kyseisen funktion aina kun kyseiseen funktioon tehdään viittaus.
  const openModal = (): void => setModalOpen(true);
  // Alustetaan "closeModal" muuttuja "9.24: patientor, step9" tehtävää varten, joka
  // suorittaa {...} sisällä olevat asiat aina kun kyseiseen funktioon tehdään viittaus.
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  // Alustetaan "submitNewEntry" niminen muuttuja, joka suorittaa {...} sisällä olevat
  // asiat aina, kun kyseiseen funktioon tehdään viittaus. Funktio saa käyttöönsä myös
  // parametrin arvon "values", jolla annetaan tyypiksi "Entry". Muuttuja siis sisältää
  // käyttäjän lisäämän uuden "entryn" datan, jonka kautta viittaa kyseiseen funktioon.
  // Funktio lisätty "9.24: patientor, step9" tehtävää varten, jotta pystymme lisäämään
  // käyttäjän antaman uuden "entryn" arvon tietokantaan talteen.
  const submitNewEntry = async (values: Entry) => {

    // Alustetaan "getCurrentPatientID" muuttuja, joka on yhtä kuin "id" muuttujan arvo.
    // Tämän avulla varmistetaan, että kun lisätään uusi arvo tietokantaan, niin se sijoittuu
    // "oikean" potilaan tietoihin.
    const getCurrentPatientID = id;

    try { // Funktio yrittää suorittaa "try" osuuden, jos {...} sisällä tulee virheitä, niin siirrytään "catch" funktion pariin.
      const { data: newPatientEntry } = await axios.post<Patient>(`${apiBaseUrl}/patients/${getCurrentPatientID}/entries`,values);
      dispatch(addPatientEntryTolist(newPatientEntry));
      closeModal();
    } catch (error) { // Jos funktion suorittamisen aikana tulee virheitä, niin suoritetaan {...} sisällä olevat asiat.
      console.error(error.response?.data || 'Unknown Error'); // Tulostaa joko muuttujan tai tekstin arvon takaisin konsoliin näkyviin.
      setError(error.response?.data?.error || 'Unknown error'); // Muutetaan "error" muuttujan tilaa kyseisellä muuttujan tai tekstin arvolla.
    }
  };

  const [{personalPatientData}, dispatch] = useStateValue();
  // Lisätty alla oleva funktio "9.21: patientor, step6" tehtävää varten, jotta
  // pääsemme käsiksi uuteen objektin arvoon "diagnosisData" minkä olemme luoneet
  // juuri stateen tätä tehtävää varten.
  const [{ diagnosisData }] = useStateValue();

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

  // Lisätty "9.21: patientor, step6" tehtävää varten uusi "useEffect(...)" funktio, jonka
  // tarkoitus on hakea erikseen palvelimesta sen hetkinen "diagnoses" data ja tallentaa
  // se "stateen" => "diagnosisData" objektin alle. Funktio aina suoritetaan, kun tapahtuu
  // muutoksia "id" muuttujan osalta ja olemme vielä lisänneet "if-ehdon", että jos "statesta"
  // löytyy jo entuudestaan data (toistaiseksi meidän ei tarvitse hakea uudestaan tai päivittää)
  // niin funktiota ei suoriteta loppuun vaan palautetaan takaisin "null" arvo. Muussa tapauksessa
  // hakee tiedot palvelimelta, tallentaa kyseisen datan => "diagnosesDataFromDatabase" muuttujan
  // alle ja suorittaa "dispatch(...)" funktion, joka saa parametrin arvoksi kyseisen muuttujan arvon.
   React.useEffect(() => {
    const getDiagnosesData = async () => {
      try {
        // Olemme asettaneet kyseisen if-ehdon näin, koska aina kun käyttäjä
        // saapuu sovellukseen ensimmistä kertaa, niin kyseinen objekti
        // "diagnosisData" kuitenkin löytyy, mutta sen sisällä ei ole dataa
        // eli se aina oletuksena => "lenght" on yhtä kuin nolla (0).
        if (Object.values(diagnosisData).length !== 0) {
          return null;
        } else {
          const { data: diagnosesDataFromDatabase } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
          dispatch(setDiagnosesList(diagnosesDataFromDatabase));
        }
      } catch (error) { // Jos yllä olevan osuuden aikana tulee virheitä, niin suoritetaan "catch" osuus.
        console.log(error); // Tulostetaan mahdollinen virhe takaisin konsoliin näkyviin käyttäjälle.
      }
    };
    void getDiagnosesData();
  }, [id]); // Kyseinen "useEffect(...)" funktio suoritetaan aina, kun tapahtuu muutoksia "id" muuttujan osalta.

  // Alustetaan muuttuja "assertNever", joka suorittaa {...} sisällä olevat asiat
  // aina kun kyseiseen funktioon tehdään viittaus. Funktion tarkoituksena on siis
  // toimia niin, että kun komponenttia renderöidään ja jos sen aikana tulee
  // arvoa mitä sovellus ei osannut odottaa (unexpected value), niin tämä
  // funktio suoritetaan, joka palauttaa takaisin (...) sisällä olevan asian.
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  // Jos "currentPatientData" on "false" (epätosi), niin ei renderöidä mitään takaisin käyttäjälle.
  if (!currentPatientData) {
    return null;
  }

  // Jos "currentPatientData" datasta löytyy "entries" objekti, jonka sisällä on dataa sekä
  // kyseisen objektin pituus ei ole yhtä kuin => nolla (0), niin sovellus suorittaa {...}
  // sisällä olevat asiat ja renderöi takaisin käyttäjälle datan. Sovellus ottaa myös huomioon
  // objektin sisällä olevan "type" objektin arvon ja renderöi takaisin siihen viittavaan tyypin
  // liittyvät (tai saatavilla olevat objektien arvot) takaisin käyttäjälle näkyviin. Tämä siis
  // tarkoittaa, että olemme jokaiselle tyypille alustaneet oman "case":n funktion, joka renderöi
  // aina tietyn asian takaisin jos sen hetkisen potilaan "entries => type" on tiettyä arvoa.
  if (currentPatientData.entries && currentPatientData.entries.length !== 0) {
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
        <Container className='custom-css'>
          <div>
            <h2>Patient entries:</h2>
              {currentPatientData.entries.map(value => {
                switch (value.type) {
                  case "OccupationalHealthcare": // Jos potilaan "entries.type" on yhtä kuin kyseinen arvo, niin suoritetaan alla olevat asiat.
                    // Muokattu kyseisen "casen" koodia tehtävää "9.22: patientor, step7" varten, niin
                    // että lisätty uusi komponentti, joka tekee saman asian kuin edellisessä tehtävässä
                    // alustettu koodi sekä siirretty tarvittavat funktiot komponentin koodiin!
                    return <OccupationalHealthcare diagnosisData={Object.values(diagnosisData)} getValues={value} />;
                  case "Hospital": // Jos potilaan "entries.type" on yhtä kuin kyseinen arvo, niin suoritetaan alla olevat asiat.
                    // Muokattu kyseisen "casen" koodia tehtävää "9.22: patientor, step7" varten, niin
                    // että lisätty uusi komponentti, joka tekee saman asian kuin edellisessä tehtävässä
                    // alustettu koodi sekä siirretty tarvittavat funktiot komponentin koodiin!
                    return <Hospital diagnosisData={Object.values(diagnosisData)} getValues={value} />;
                  case "HealthCheck": // Jos potilaan "entries.type" on yhtä kuin kyseinen arvo, niin suoritetaan alla olevat asiat.
                    // Muokattu kyseisen "casen" koodia tehtävää "9.22: patientor, step7" varten, niin
                    // että lisätty uusi komponentti, joka tekee saman asian kuin edellisessä tehtävässä
                    // alustettu koodi sekä siirretty tarvittavat funktiot komponentin koodiin!
                    return <HealthCheck getValues={value} />;
                  default: // Lisätty "9.22: patientor, step7" tehtävää varten "default" osuus, joka palauttaa kyseisen funktion.
                    return assertNever(value); // Funktio saa parametrin arvoksi sen hetkisen "value" muuttujan arvon.
                  }
                })}
          </div>
        </Container>
        <AddPatientEntryModal modalOpen={modalOpen} onClose={closeModal} onSubmit={submitNewEntry} />
        <Container className="entry-button">
          <Button onClick={() => openModal()}>New Entry</Button>
        </Container>
      </div>
    );
  }
  
  // Lisätty ylös olevaan if-ehtoon sekä alla olevaan (...) renderöintiin "9.24: patientor, step9" tehtävää
  // varten komponentti eli "AddPatientEntryModal", "Container" elementti sekä "Button" elementti. Näiden avulla
  // sovellus renderöi takaisin käyttäjälle painikkeen, joka näyttää takaisin lomakkeen, jonka kautta käyttäjällä
  // on mahdollisuus lisätä uusi "entry" arvo tietokantaan talteen.

  // Muussa tapauksessa komponentti renderöi (...) sisällä olevat asiat takaisin käyttäjälle näkyviin.
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
      <AddPatientEntryModal modalOpen={modalOpen} onClose={closeModal} onSubmit={submitNewEntry} error={error} />
      <Container className="entry-button">
        <Button onClick={() => openModal()}>New Entry</Button>
      </Container>
    </div>
  );
};

// Viedään (export) alla oleva komponentti (PatientFullData) sovelluksen käytettäväksi, jotta esim. "index.ts" tiedosto pystyy suorittamaan kyseiset funktiot.
export default PatientFullData;
