// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import express from 'express'; // Tuodaan "express" funktio sovelluksen käytettäväksi "express" nimisestä kirjastosta.
import diagnosesService from '../src/services/diagnosesService'; // Alustetaan muuttuja "diagnosesService", joka hyödyntää "diagnosesService.ts" tiedoston sisältöä sovelluksen aikana.

// Alustetaan muuttuja "router", joka suorittaa kyseisen funktion.
// Funktion avulla luodaan uusi "router" objekti, jonka avulla
// sovellus pystyy käsittelemään palvelimeeen kohdistettua
// erilaisia pyyntöjä käyttäjän osalta.
const router = express.Router(); // Lisää tietoa löytyy täältä: https://expressjs.com/en/guide/routing.html

// Kun käyttäjä suorittaa pyynnön osoitteeseen "http://localhost:3001/api/diagnoses",
// niin sovellus suorittaa {...} sisällä olevat asiat ja palauttaa takaisin käyttäjälle
// "diagnoses.json" tiedoston datan. Kun alla oleva funktio "getAllDiagnoses(...)" on
// suoritettu, niin se palauttaa takaisin datan, joka näytetään käyttäjälle.
router.get('/', (_request, response) => {
  response.json(diagnosesService.getAllDiagnoses());
});

// Viedään (export) alla oleva muuttuja (router) sovelluksen käytettäväksi, jotta esim. "index.ts" tiedosto pystyy suorittamaan kyseiset funktiot.
export default router;
