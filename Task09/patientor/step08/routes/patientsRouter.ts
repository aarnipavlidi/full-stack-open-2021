// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import express from 'express'; // Tuodaan "express" funktio sovelluksen käytettäväksi "express" nimisestä kirjastosta.
import patientsService from '../src/services/patientsService'; // Alustetaan muuttuja "patientsService", joka hyödyntää "patientsService.ts" tiedoston sisältöä sovelluksen aikana.

// Alustetaan muuttuja "toNewPatientEntry", joka hyödyntää "utils.ts" tiedoston sisältöä sovelluksen
// aikana. Muuttujan tarkoituksena on siis tarkistaa, että kun käyttäjä yrittää lisätä uuden arvon
// (Patient) tietokantaan, niin varmistetaan (validointi), että jokainen kenttä on oikeassa muodossa
// eli "string" sekä arvo löytyy eli objektin arvo ei saa puuttua. Jos arvon lisääminen epäonnistuu,
// niin palautetaan takaisin viesti "error.message" muuttujan avulla, että minkä takia epäonnistui!
import toNewPatientEntry from '../src/utils';

// Alustetaan muuttuja "checkEntryValidation", joka hyödyntää "entry-validation" tiedoston sisältöä sovelluksen
// aikana. Muuttujan tarkoituksena on siis tarkistaa, että kun käyttäjä yrittää lisätä uuden arvon potilaan
// "entries" objektin alle, niin varmistetaan (validointi), että jokainen kenttä on oikeassa muodossa. Jos
// arvon lisääminen epäonnistuu, niin palautetaan takaisin käyttäjälle viesti "error.message" muuttujan avulla!
import checkEntryValidation from '../src/entry-validation';

// Alustetaan muuttuja "router", joka suorittaa kyseisen funktion.
// Funktion avulla luodaan uusi "router" objekti, jonka avulla
// sovellus pystyy käsittelemään palvelimeeen kohdistettua
// erilaisia pyyntöjä käyttäjän osalta.
const router = express.Router(); // Lisää tietoa löytyy täältä: https://expressjs.com/en/guide/routing.html

// Kun käyttäjä suorittaa pyynnön osoitteeseen "http://localhost:3001/api/patients",
// niin sovellus suorittaa {...} sisällä olevat asiat ja palauttaa takaisin käyttäjälle
// "patients.json" tiedoston datan. Kun alla oleva funktio "getAllPatients(...)" on
// suoritettu, niin se palauttaa takaisin datan, joka näytetään käyttäjälle.
router.get('/', (_request, response) => {
  response.json(patientsService.getAllPatients());
});

// Kun käyttäjä suorittaa pyyynnön esim. osoitteeseen "http://localhost:3001/api/patients/random_id",
// niin sovellus suorittaa {...} sisällä olevat asiat ja palauttaa takaisin arvon missä käyttäjän
// antama id:n arvo täsmää "patients.json" datan kanssa. Muussa tapauksessa pyyntöön palautetaan
// "404" koodi käyttäjälle takaisin.
router.get('/:id', (request, response) => {
  // Alustetaan muuttuja "showPatient", joka suorittaa kyseisen funktion eli
  // "getPatientsById(...)" funktio saa parametrin arvoksi käyttäjän tekemän
  // pyynnön kautta tuleva => "request.params.id" muuttujan arvo.
  const showPatient = patientsService.getPatientsById(String(request.params.id));

  // Jos "showPatient" palauttaa datan, eli löytyy "matchi" tietokannasta,
  // niin suoritetaan {...} sisällä oleva asia ja muussa tapauksessa, jos
  // ei löydy data, niin suoritetaan "else" funktio ja sen sisällä oleva asia.
  if (showPatient) {
    response.send(showPatient);
  } else {
    response.sendStatus(404);
  }
});

// Kun käyttäjä haluaa lisätä uuden arvon (Patient) tietokantaan, niin sovellus suorittaa
// {...} sisällä olevat asiat. Ensin siis tarkistetaan "toNewPatientEntry(...)" funktion
// avulla, että onko pyynnön kautta tuleva (request.body) data "oikeassa muodossa" eli
// suoritetaan validointi, jos validointi onnistuu, niin suoritetaan sen jälkeen funktio
// "addPatientDatabase(...)" eli lisätään käyttäjän lisäämä uusi arvo tietokantaan talteen
// ja palautetaan takaisin lisätty arvo näkyviin käyttäjälle. Muussa tapauksessa, jos
// funktion aikana tulee virheitä, niin suoritetaan "catch" funktion {...} sisällä oleva
// asia, jonka kautta kerrotaan käyttäjälle (error.message), että miksi epäonnistui.
router.post('/', (request, response) => {
  try { // Ensin siis suoritetaan "try" osuus, ja jos epäonnistuu, niin siirrytään => "catch" funktion osuuteen.
    const checkPatientEntry = toNewPatientEntry(request.body); // Alustetaan muuttuja "checkPatientEntry", joka suorittaa kyseisen funktion.
    const newPatientValue = patientsService.addPatientDatabase(checkPatientEntry); // Alustetaan muuttuja "newPatientValue", joka suorittaa kyseisen funktion.
    response.json(newPatientValue); // Palautetaan takaisin "json" muodossa "newPatientValue" data käyttäjälle näkyviin.
  } catch (error) { // Jos funktion aikana tulee virheitä, niin suoritetaan {...} sisällä olevat asiat.
    response.status(400).send(error.message); // Palautetaan pyyntöön "400" statuskoodilla sekä lähetetään "error.message" muuttujan data käyttäjälle näkyviin.
  }
});

// Kun käyttäjä haluaa lisätä uuden arvon (Patient.entries) tietokantaan, niin sovellus suorittaa
// {...} sisällä olevat asiat. Ensin otetaan talteen pyynnön kautta tulevan "reques.params.id"
// muuttujan arvo ja muutetaan (tai varmistetaan), että on varmasti "string" muodossa. Tämän
// jälkeen suoritetaan pyynnön kautta tuleva data => validoinnin kautta eli "checkEntryValidation(..)"
// funktion avulla. Jos validointi onnistuu, niin tallennetaan käyttäjän lisäämä uusi arvo tietokantaan
// sen hetkisen potilaan "entries" objektin alle. Tämän jälkeen palautetaan takaisin lisätty arvo
// käyttäjälle näkyviin. Jos "try" funktion osuuden aikana tulee virheitä, niin suoritetaan
// "catch" funktio osuus ja palautetaan takaisin "400" statuskoodi sekä viesti "error.message".
router.post('/:id/entries', (request, response) => {
  
  const getCurrentPatientID = String(request.params.id); // Alustetaan "getCurrentPatientID", joka suorittaa kyseisen funktion.

  try { // Ensin yritetään suorittaa "try" {...} sisällä olevat asiat, jos tulee virheitä niin siirrytään "catch" funtion pariin.
    const checkPatientNewEntry = checkEntryValidation(request.body); // Alustetaan "checkPatientNewEntry", joka suorittaa validoinnin "request.body":n datalla.
    // Alustetaan "newPatientEntryValue", joka suorittaa "addPatientEntryDatabase(..)" funktion
    // eli tallennetaan uusi arvo tietokantaan talteen. Funktio saa myös käyttöönsä "checkPatientEntry"
    // "getCurrentPatientID" muuttujan arvot, näiden avulla voidaan siirtää uusi data "oikean potilaan"
    // tietoihin => "entries" objektin alle.
    const newPatientEntryValue = patientsService.addPatientEntryDatabase(checkPatientNewEntry, getCurrentPatientID);
    response.json(newPatientEntryValue); // Palautetaan takaisin "newPatientEntryValue" data käyttäjälle näkyviin.
  } catch (error) { // Jos tulee virheitä, niin suoritetaan {...} sisällä olevat asiat.
    response.status(400).send(error.message);
  }
});

// Viedään (export) alla oleva muuttuja (router) sovelluksen käytettäväksi, jotta esim. "index.ts" tiedosto pystyy suorittamaan kyseiset funktiot.
export default router;
