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
