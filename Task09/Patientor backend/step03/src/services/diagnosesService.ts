// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import diagnosesData from '../../data/diagnoses.json'; // Alustetaan muuttuja "diagnosesData", joka hyödyntää "diagnoses.json" tiedoston sisältöä sovelluksen aikana.
import { DiagnosesEntry } from '../types/appTypes'; // Tuodaan "DiagnosesEntry" funktio sovelluksen käytettäväksi, joka sijaitsee "appTypes.ts" tiedostossa.

// Alustetaan muuttuja "showDiagnoses", joka noudattaa kyseistä tyyppiä eli
// "Array<DiagnosesEntry>" (interface), josta siis löytyy kolme (3) erilaista
// objektin arvoa => "code", "name" sekä "latin". Muuttujan "diagnosesData"
// sisällä oleva data siis saa käyttöönsä kyseisen tyypin rakenteen, kun
// palautetaan data takaisin käyttäjälle näkyviin.
const showDiagnoses: Array<DiagnosesEntry> = diagnosesData;

// Alustetaan muuttuja "getAllDiagnoses", joka suorittaa {...}
// sisällä olevat asiat, kun kyseiseen funktioon tehdään viittaus.
const getAllDiagnoses = (): Array<DiagnosesEntry> => {
  return showDiagnoses;
};

// Viedään (export) alla oleva muuttujat (getAllDiagnoses) sovelluksen käytettäväksi, jotta esim. "index.ts" tiedosto pystyy suorittamaan kyseiset funktiot.
export default {
  getAllDiagnoses
}
