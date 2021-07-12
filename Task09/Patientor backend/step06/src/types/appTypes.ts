// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

// Alustetaan "Diagnose" niminen interface, joka saa käyttöönsä
// {...} sisällä olevat objektien arvot. Ota huomioon, että "latin"
// objektin arvo on "vapaaehtoinen", koska datasta eli "diagnoses.json"
// puuttuu joistakin arvoista kyseinen objekti kokonaan!
export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

// Alustetaan "Patient" niminen interface, joka saa käyttöönsä {...}
// sisällä olevat objektien arvot. Haluamme myös "piilottaa" objektin
// "ssn" arvon ja sen me teemme erikseen "patietsService.ts" tiedostossa.
export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}

// Alustetaan "PatientWithoutId" niminen tyyppi, joka on siis yhtä kuin
// "Patient" muuttujan interface, mutta ainoastaan "id" objektin arvo
// on otettu pois käytöstä. Olemme tämän luoneet sitä varten, kun käyttäjä
// lisää uuden arvon (Patient) tietokantaan, niin käyttäjä ei itse aseta
// id:n objektin arvoa, vaan me annetaan palvelimen hoitaa sen generoinnin.
export type PatientWithoutId = Omit<Patient, 'id'>;

// Alustetaan "PatientGender" niminen enum, jonka tarkoituksena on siis
// tarkistaa, että kun käyttäjä haluaa lisätä uuden arvon (Patient)
// tietokantaan talteen, niin "gender" objektissa voi olla ainoastaan
// nämä kolme (3) alla olevaa vaihtoehtoa. Enum tyyppi on kätevä siinä
// mielessä, jos me tiedämme (tai pystymme ennustamaan), että mitä arvoa
// käyttäjä saattaa laittaa kun lisää uuden arvon. Lisää tietoa tästä
// tyypistä: https://www.typescriptlang.org/docs/handbook/enums.html
export enum PatientGender {
  Other = 'other',
  Male = 'male',
  Female = 'female',
}
