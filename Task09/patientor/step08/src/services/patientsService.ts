// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import patientsData from '../../data/patients'; // Alustetaan muuttuja "patientsData", joka hyödyntää "patients.ts" tiedoston sisältöä sovelluksen aikana.
import { Patient, PatientWithoutId, Entry } from '../types/appTypes'; // Tuodaan "Patient", "PatientWithoutId" ja "Entry" funktiot sovelluksen käytettäväksi, joka sijaitsee "appTypes.ts" tiedostossa.

const { v4: uuidv4 } = require('uuid'); // Alustetaan muuttuja "uuidv4", joka hyödyntää "uuid" nimisen kirjaston sisältöä sovelluksen aikana.

// Alustetaan muuttuja "getAllPatients", joka suorittaa {...} sisällä olevat
// asiat aina, kun kyseiseen funktioon tehdään viittaus (esim. kun käyttäjä
// saapuu etusivulle), niin palvelimeen tehdään pyyntö, joka kohdistuu tähän
// funktioon. Funktio palauttaa takaisin käyttäjälle datan, jonka se poimii
// "patients.json" tiedostosta ja "piilottaa" ainoastaan yhden objektin arvon
// eli => "snn" pois käyttäjän näkymästä. Ota huomioon, että vaikka me piilotamme
// "Omit" funktion avulla kyseisen objektin tyypin, niin meidän kuitenkin täytyy
// erikseen vielä kertoa sovellukselle, että mitä dataa me haluamme palauttaa
// (return) takaisin käyttäjälle näkyiin. Jos esim. käyttäysimme ainoastaan
// => "return patientsData" tämän "Omit" funktion kanssa, niin siitä huolimatta
// jokainen objektin arvo näkyisi takaisin käyttäjälle ja sitä emme halua! :)
// Muokattua alla olevaa koodia ("9.16: patientor, step1" tehtävän takia), niin
// että kun käyttäjä haluaa nähdä kaikki potilaan arvot tietokannasta, niin me
// piilotamme "ssn" lisäksi myös "entries" objektin arvon pois näkyvistä!
const getAllPatients = (): Omit<Patient, 'ssn' | 'entries' >[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

// Alustetaan muuttuja "getPatientsById", joka suorittaa {...} sisällä olevat asiat aina,
// kun kyseiseen funktioon tehdään viittaus. Ota myös huomioon, että olemme ottaneet
// käyttöön "undefined" tyypin, koska kun funktiota suoritetaan, niin emme voi olettaa
// että kun käyttäjä tekee pyynnön, niin kyseinen käyttäjä tekee "oikealla id:n arvolla"
// pyynnön ja löytyisi arvo tietokannasta. Jos funktion suorittamisen aikana ei löydy
// arvoa, niin se "searchPatient" palauttaa takaisin "undefined", mutta muussa tapauksessa
// jos löytyy arvo tietokannasta, niin se noudattaa "Patient" tyypin rakennetta.
const getPatientsById = (id: string): Patient | undefined => {
  const searchPatient = patientsData.find(results => results.id === id); // Alustetaan muuttuja "searchPatient", joka suorittaa kyseisen funktion.
  return searchPatient; // Funktio palauttaa takaisin "searchPatient" datan näkyviin käyttäjälle.
};

// Alustetaan muuttuja "addPatientDatabase", joka suorittaa {...} sisällä olevat aina,
// kun kyseiseen funktioon tehdään viittaus. Funktio saa myös (...) sisällä olevat
// parametrien arvot, jotka noudattavat niille annettua tyypin arvoa. Ota myös huomioon,
// kun uusi arvo lisätään tietokantaan, niin käyttäjä ei anna uudelle arvolle "id" objektin
// arvoa, vaan palvelin huolehtii siitä ja sen takia olemme lisänneet alas "id: uuidv4()",
// joka generoi "randomin" id:n arvon, joka toimii "string" tyyppinä ja sitä me haluamme
// koska "Patient" tyyppi odottaa, että "id":n objektin arvo on sama tyyppi!
const addPatientDatabase = ( newEntry: PatientWithoutId ): Patient => {
  const newPatientValue = {
    id: uuidv4(),
    // Asetetaan "entries" objekti, joka saa arvoksi tyhjän taulukon. Me teemme
    // tämän, koska "PatientWithoutId" tyypistä ei löydy kyseistä objektin arvoa
    // ja, koska "addPatientDatabase" funktio odottaa vastauksena, että uudesta
    // arvosta löytyy kyseinen objektin arvo, niin me lisäämme sen itse! :)
    entries: [],
    ...newEntry
  };

  patientsData.push(newPatientValue); // Funktion "push(...)" avulla lisätään "patientsData" muuttujan taulukon perään uusi data eli => "newPatientValue".
  return newPatientValue; // Funktio palauttaa takaisin käyttäjälle "newPatientValue" muuttujan datan.
};

// Alustetaan muuttuja "addPatientEntryDatabase", joka suorittaa {...} sisällä olevat asiat aina,
// kun kyseiseen funktioon tehdään viittaus. Funktio saa parametrin arvoksi "newEntry" muuttujan,
// joka sisältää käyttäjän tekemän pyynnön kautta tulevan datan (request.body) sekä "currentPatientID"
// muuttujan, joka kertoo että mihin potilaan id:n arvoon haluaa käyttäjä lisätä uuden arvon "entries"
// objektin alle. Funktio hakee tietokannasta arvon, jonka "id" objektin arvo täsmää "currentPatientID"
// muuttujan kanssa. Tämän jälkeen me voidaan lisätä uusi arvo tietokantaan talteen "push" funktion
// avulla, jonka jälkeen palautetaan takaisin juuri lisätty arvo "newPatientEntryValue" käyttäjälle
// näkyviin. Pyynnön kautta ei tule "id" arvoa, uudelle "entries" arvolle, joten me hoidamme sen
// erikseen "uuidv4(...)" funktion avulla.
const addPatientEntryDatabase = ( newEntry: Entry, currentPatientID: string ): Entry => {

  const showCurrentPatientData = patientsData.find(results => results.id === currentPatientID); // Alustetaan "showCurrentPatientData" muuttuja, joka suorittaa kyseisen funktion.

  const newPatientEntryValue = { // Alustetaan "newPatientEntryValue", joka saa käyttöönsä {...} sisällä olevat arvot.
    id: uuidv4(),
    ...newEntry
  };

  // Jos sovellus ei löydä "currentPatientID" arvon avulla täsmäävää arvoa tietokannasta
  // niin palautetaan takaisin "error" ja kyseinen viesti takaisin käyttäjälle näkyviin.
  if (!showCurrentPatientData) {
    throw new Error('Could not find patient data from the database, please try again!');
  };

  showCurrentPatientData.entries.push(newPatientEntryValue); // Tallennetaan "newPatientEntryValue" data tietokantaan "entries" objektin alle.
  return newPatientEntryValue; // Palautetaan takaisin "newPatientEntryValue" data käyttäjälle näkyviin.
};

// Viedään (export) alla oleva muuttujat sovelluksen käytettäväksi, jotta esim. "index.ts" tiedosto pystyy suorittamaan kyseiset funktiot.
export default {
  getAllPatients,
  getPatientsById,
  addPatientDatabase,
  addPatientEntryDatabase
}
