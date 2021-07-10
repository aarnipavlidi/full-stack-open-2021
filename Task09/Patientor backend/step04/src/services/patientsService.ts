// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import patientsData from '../../data/patients.json'; // Alustetaan muuttuja "patientsData", joka hyödyntää "patients.json" tiedoston sisältöä sovelluksen aikana.
import { Patient } from '../types/appTypes'; // Tuodaan "Patient" funktio sovelluksen käytettäväksi, joka sijaitsee "appTypes.ts" tiedostossa.

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

// Viedään (export) alla oleva muuttujat (getAllPatients) sovelluksen käytettäväksi, jotta esim. "index.ts" tiedosto pystyy suorittamaan kyseiset funktiot.
export default {
  getAllPatients
}
