// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import { PatientWithoutId, PatientGender } from './types/appTypes' // Tuodaan "PatientWithoutId" ja "PatientGender" funktiot sovelluksen käytettäväksi, joka sijaitsee "appTypes.ts" tiedostossa.

// Alustetaan muuttuja "checkIfString", joka suorittaa {...} sisällä olevat asiat aina,
// kun kyseiseen funktioon tehdään viittaus. Funktion tarkoituksena on siis tarkistaa,
// että onko parametrin arvo "text" tyyppiä "string", sillä hetkellä kun kyseiseen
// funktioon tehdään viittaus (eli kun yritetään lisätä uusi arvo tietokantaan).
const checkIfString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

// Alustetaan muuttuja "checkIfGender", joka suorittaa {...} sisällä olevat asiat aina,
// kun kyseiseen funktioon tehdään viittaus. Funktion tarkoituksena on siis tarkistaa,
// että löytyykö parametrin arvo => "param" => "PatientGender" (enum) tyypistä. Eli
// olemme aikaisemmin alustaneet kyseisen tyypin, jolle annettu kolme (3) erilaista
// objektin arvoa: "other", "male" sekä "female". Tämä siis tarkoittaa sitä, kun
// käyttäjä lisää uuden arvon tietokantaan, niin "gender" objektin arvo täytyy olla
// jokin näistä kolmesta, koska muussa tapauksessa tulee validointivirhe!
const checkIfGender = (param: any): param is PatientGender => {
  return Object.values(PatientGender).includes(param);
};

// Alustetaan muuttuja "parseNameValue", joka suorittaa {...} sisällä olevat asiat aina,
// kun kyseiseen funktioon tehdään viittaus. Jos "name" parametrin arvo puuttuu tai
// "checkIfString(...)" funktio palauttaa takaisin "false" (epätosi) eli parametrin
// validointi epäonnistui, niin palautetaan takaisin käyttäjälle alla oleva teksti
// näkyviin (error.message) muuttujan alle. Muussa tapauksessa palautetaan data takaisin.
const parseNameValue = (name: unknown): string => {
  if (!name || !checkIfString(name)) {
    throw new Error('Name object is either incorrect or missing value, please try again!');
  }

  return name;
};

// Alustetaan muuttuja "parseDateOfBirthValue", joka suorittaa {...} sisällä olevat asiat aina,
// kun kyseiseen funktioon tehdään viittaus. Jos "dateOfBirth" parametrin arvo puuttuu tai
// "checkIfString(...)" funktio palauttaa takaisin "false" (epätosi) eli parametrin
// validointi epäonnistui, niin palautetaan takaisin käyttäjälle alla oleva teksti
// näkyviin (error.message) muuttujan alle. Muussa tapauksessa palautetaan data takaisin.
const parseDateOfBirthValue = (dateOfBirth: unknown): string => {
  if (!dateOfBirth || !checkIfString(dateOfBirth)) {
    throw new Error('DateOfBirth object is either incorrect or missing value, please try again!')
  }

  return dateOfBirth;
};

// Alustetaan muuttuja "parseSsnValue", joka suorittaa {...} sisällä olevat asiat aina,
// kun kyseiseen funktioon tehdään viittaus. Jos "ssn" parametrin arvo puuttuu tai
// "checkIfString(...)" funktio palauttaa takaisin "false" (epätosi) eli parametrin
// validointi epäonnistui, niin palautetaan takaisin käyttäjälle alla oleva teksti
// näkyviin (error.message) muuttujan alle. Muussa tapauksessa palautetaan data takaisin.
const parseSsnValue = (ssn: unknown): string => {
  if (!ssn || !checkIfString(ssn)) {
    throw new Error('Ssn object is either incorrect or missing value, please try again!')
  }

  return ssn;
};

// Alustetaan muuttuja "parseGenderValue", joka suorittaa {...} sisällä olevat asiat aina,
// kun kyseiseen funktioon tehdään viittaus. Jos "gender" parametrin arvo puuttuu tai
// "checkIfGender" tai "checkIfString" funktiot palauttaa takaisin "false" (epätosi) eli
// parametrin validointi epäonnistui, niin palautetaan takaisin käyttäjälle alla oleva teksti
// näkyviin (error.message) muuttujan alle. Muussa tapauksessa palautetaan data takaisin.
const parseGenderValue = (gender: unknown): PatientGender => {
  if (!gender || !checkIfGender(gender) || !checkIfString(gender)) {
    throw new Error('Gender object is either incorrect or missing value, please try again!')
  }

  return gender;
};

// Alustetaan muuttuja "parseOcupationValue", joka suorittaa {...} sisällä olevat asiat aina,
// kun kyseiseen funktioon tehdään viittaus. Jos "occupation" parametrin arvo puuttuu tai
// "checkIfString(...)" funktio palauttaa takaisin "false" (epätosi) eli parametrin
// validointi epäonnistui, niin palautetaan takaisin käyttäjälle alla oleva teksti
// näkyviin (error.message) muuttujan alle. Muussa tapauksessa palautetaan data takaisin.
const parseOcupationValue = (occupation: unknown): string => {
  if (!occupation || !checkIfString(occupation)) {
    throw new Error('Occupation object is either incorrect or missing value, please try again!')
  }

  return occupation;
};

// Alustetaan "Fields" niminen tyyppi, joka saa käyttöösä {...} sisällä olevat objektien arvot ja niiden liittyvät tyypin arvot.
type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown };

// Alustetaan muuttuja "toNewPatientEntry", joka suorittaa {...} sisällä olevat asiat aina,
// kun kyseiseen funktioon tehdään viittaus. Funktio saa käyttöönsä (...) sisällä olevat
// muuttujan arvot parametrin arvoksi, jotka noudattavat "Fields" muuttujan tyyppejä. Muuttuja
// "patientEntry" tarkistaa jokaisen objektin osalta, että sen kohdalla oleva parametrin arvo
// onnistuu validoinnin osalta, jonka jälkeen palautetaan takaisin "patientEntry" muuttujan
// data, joka noudattaa "PatientWithoutId" muuttujan tyyppiä. Palvelin generoi siis "id"
// objektin arvon puolestamme, kun lisätään uusi arvo tietokantaan.
const toNewPatientEntry = ({ name, dateOfBirth, ssn, gender, occupation } : Fields): PatientWithoutId => {

  const patientEntry: PatientWithoutId = {
    name: parseNameValue(name),
    dateOfBirth: parseDateOfBirthValue(dateOfBirth),
    ssn: parseSsnValue(ssn),
    gender: parseGenderValue(gender),
    occupation: parseOcupationValue(occupation)
  };

  return patientEntry;
};

// Viedään (export) alla oleva muuttujat (toNewPatientEntry) sovelluksen käytettäväksi, jotta esim. "index.ts" tiedosto pystyy suorittamaan kyseiset funktiot.
export default toNewPatientEntry;
