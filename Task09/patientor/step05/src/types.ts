// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

// Alustetaan "Entry" niminen interface, joka saa käyttöönsä {...}
// sisällä olevat objektien arvot. Nyt tehtävää "9.16: patientor, step1"
// varten me ei aseta mitään objekteja erikseen kyseiselle interfacelle
// vaan annetaan sen toistaiseksi olla tyhjänä. Voisin kuvitella,
// että myöhemmin tehtävissä me annetaan erilaisia objektian arvoa
// tähän, jotka näkyvät sitten erikseen "Patient" interfacessa
// => "entries" taulukon muodossa.
export interface BaseEntry {
  id: string;
  date: string;
  type: string;
  specialist: string;
  description: string;
}

// Tehtävää "9.19: patientor, step4" varten muokattu yllä olevaa interface "BaseEntry" niin,
// että annettu jokainen objektin arvo, joka löytyy jokaisesta eri tyypistä (alla olevat 3
// eri tyyppiä) eli => "OccupationalHealthcare", "Hospital" sekä "HealthCheck". Tämä siis tarkoittaa,
// että mitä yhteistä jokaiselta tyypiltä löytyy, kun katsoo tämän hetken dataa => "patients.ts".
// Tämän jälkeen olemme alustaneet, jokaiselle tyypille oman interfacen, joka saa käyttöönsä {...}
// sisällä olevat objektien arvot ja niille annetut tyypit (esim. string tai number jne.), joka
// liitetään yhteen "BaseEntry" interfacen kanssa => "extends" funktion avulla. Ota myös huomioon,
// että toistaiseksi potilaiden datasta, niin jokaiselta "OccupationalHealthcare" tyypiltä ei löydy
// "diagnosisCodes" tai "sickLeave" objektin arvoa ja tämän takia olemme antaneet "?" merkin kyseiselle
// objektin arvolle. Ilman sitä tulisi erroria! :)

// Alustetaan "OccupationalHealthCareEntry" niminen inteface, joka saa käyttöönsä
// {...} sisällä olevat objektien arvot, jonka lisäksi saa käyttöönsä "BaseEntry"
// kautta tulevat objektien arvot tämän lisäksi käyttöönsä.
export interface OccupationalHealthCareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  diagnosisCodes?: Array<string>;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

// Alustetaan "HospitalEntry" niminen inteface, joka saa käyttöönsä
// {...} sisällä olevat objektien arvot, jonka lisäksi saa käyttöönsä "BaseEntry"
// kautta tulevat objektien arvot tämän lisäksi käyttöönsä.
export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  diagnosisCodes: Array<string>;
  discharge: {
    date: string;
    criteria: string;
  };
}

// Alustetaan "HealthCheckEntry" niminen inteface, joka saa käyttöönsä
// {...} sisällä olevat objektien arvot, jonka lisäksi saa käyttöönsä "BaseEntry"
// kautta tulevat objektien arvot tämän lisäksi käyttöönsä.
export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: number;
}

// Alustetaan "Entry" niminen tyyppi, joka yhdistää kyseiset (Union metodi) interfacet yhteen,
// jota hyödynnetään potilaan "entries" objektin kohdalla => "entries: Entry[]".
export type Entry = OccupationalHealthCareEntry | HospitalEntry | HealthCheckEntry;

// Alustetaan "Patient" niminen interface, joka saa käyttöönsä {...}
// sisällä olevat objektien arvot. Haluamme myös "piilottaa" objektin
// "ssn" arvon ja sen me teemme erikseen "patietsService.ts" tiedostossa.
// Muokattu alla olevaa "Patient" interface niin, että annettu "entries"
// niminen objekti joka näyttää taulukon sisällä olevaa dataan. Kyseinen
// objekti näkyy ainoastaan, kun mennään tietyn potilaan "id":n arvon
// mukaan eli, jos halutaan nähdä kaikki potilaat, niin kyseistä objektia
// ei näy erikseen käyttäjälle näkyviin.
export interface Patient {
  id: string;
  name: string;
  dateOfBirth?: string;
  ssn?: string;
  gender: string;
  occupation: string;
  entries: Entry[];
}
