// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import patientsData from '../../data/patients.json'; // Alustetaan muuttuja "patientsData", joka hyödyntää "patients.json" tiedoston sisältöä sovelluksen aikana.
import { Patient } from '../types/appTypes'; // Tuodaan "Patient" funktio sovelluksen käytettäväksi, joka sijaitsee "appTypes.ts" tiedostossa.

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
const getAllPatients = (): Omit<Patient, 'ssn'>[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
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
const addPatientDatabase = ( name: string, dateOfBirth: string, ssn: string, gender: string, occupation: string ): Patient => {
  const newPatientValue = {
    id: uuidv4(),
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
  }
  patientsData.push(newPatientValue); // Funktion "push(...)" avulla lisätään "patientsData" muuttujan taulukon perään uusi data eli => "newPatientValue".
  return newPatientValue; // Funktio palauttaa takaisin käyttäjälle "newPatientValue" muuttujan datan.
};

// Viedään (export) alla oleva muuttujat (getAllPatients) sovelluksen käytettäväksi, jotta esim. "index.ts" tiedosto pystyy suorittamaan kyseiset funktiot.
export default {
  getAllPatients,
  getPatientsById,
  addPatientDatabase
}
