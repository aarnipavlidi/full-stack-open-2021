// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import { Entry } from "./types/appTypes"; // Tuodaan "Entry" niminen tyyppi => "appTypes.ts" tiedostosta sovelluksen käytettäväksi.

// Alustetaan "checkIfString" niminen muuttuja, joka siis tarkistaa kun kyseiseen
// funktioon tehdään viittaus, niin parametrin arvo on muotoa "string".
const checkIfString = (value: unknown): value is string => {
  return typeof value === 'string' || value instanceof String;
};

// Alustetaan "checkIfNumber" niminen muuttuja, joka siis tarkistaa kun kyseiseen
// funktioon tehdään viittaus, niin parametrin arvo on muotoa "number".
const checkIfNumber = (value: unknown): value is number => {
  return typeof value === 'number' || value instanceof Number;
};

// Alustetaan "checkIfArrayString" niminen muuttuja, joka siis tarkistaa kun kyseiseen
// funktioon tehdään viittaus, niin parametrin kautta tuleva arvo on muotoa "string"
// eli jokainen taulukon (array) sisällä oleva arvo on => "string" muodossa.
const checkIfArrayString = (value: unknown): value is string[] => {
  if (!Array.isArray(value)) {
    return false;
  }

  if (value.some((result) => typeof result !== 'string')) {
    return false;
  }

  return true;
};

// Alustetaan alla olevat funktiot ("type Fields" asti olevat), jotka siis
// suorittavat {...} sisällä olevat asiat aina kun kyseiseen funktioon tehdään
// viittaus. Funktiot saavat siis parametrin arvon "value", jolle annetaan
// oletuksena "unknown" tyyppi, ja funktio palauttaa takaisin "string" tyypin
// arvon. Funktio siis tarkistaa, kun yritetään lisätä uusi arvo (entries)
// tietokantaan talteen, niin että onko kyseistä arvoa olemassa (!value)
// sekä tarkistetaan, että kyseinen arvo on oikeassa muodossa. Funktiot
// siis käyttävät "checkIfString", "checkIfNumber" sekä "checkIfArrayString"
// funktioita ja niiden avulla voidaan tarkistaa, että parametrin kautta
// tuleva arvo täyttää "tietyt ehdot" ennen kuin voidaan tallentaa arvo
// tietokantaan talteen. Jos funktion suorittamisen aikana tulee virheitä,
// niin sovellus tulostaa "error" tekstin käyttäjälle näkyviin!
const parseDateValue = (value: unknown): string => {
  if (!value || !checkIfString(value)) {
    throw new Error('Date object is either incorrect or missing value, please try again!')
  }

  return value;
};

const parseSpecialistValue = (value: unknown): string => {
  if (!value || !checkIfString(value)) {
    throw new Error('Specialist object is either incorrect or missing value, please try again!')
  }

  return value;
};

const parseDescriptionValue = (value: unknown): string => {
  if (!value || !checkIfString(value)) {
    throw new Error('Description object is either incorrect or missing value, please try again!')
  }

  return value;
};

const parseEmployerNameValue = (value: unknown): string => {
  if (!value || !checkIfString(value)) {
    throw new Error('EmployerName object is either incorrect or missing value, please try again!')
  }

  return value;
};

const parseDiagnosisCodesValue = (value: unknown): Array<string> => {
  if (!value || !checkIfArrayString(value)) {
    throw new Error('Diagnosis codes object is either incorrect or missing value, please try again!')
  }

  return value;
};

const parseDischargeDateValue = (value: unknown): string => {
  if (!value || !checkIfString(value)) {
    throw new Error('Discharge (date) object is either incorrect or missing value, please try again!')
  }

  return value;
};

const parseDischargeCriteriaValue = (value: unknown): string => {
  if (!value || !checkIfString(value)) {
    throw new Error('Discharge (criteria) object is either incorrect or missing value, please try again!')
  }

  return value;
};

const parseHealthCheckRatingValue = (value: unknown): number => {
  if (!value || !checkIfNumber(value)) {
    throw new Error('HealthCheckRating object is either incorrect or missing value, please try again!')
  }

  return value;
};

// Alustetaan "Fields" niminen tyyppi, joka saa käyttöönsä {...} sisällä
// olevien objektien arvot. Jokaiselle objektin arvolle annetaan oletus-
// arvona "unknown" tyyppi, ja kyseistä tyyppiä hyödynnetään kun käyttäjä
// yrittää lisätä uuden arvon tietokantaan. Sovellus siis olettaa, että
// ainoastaan nämä kyseiset objektien arvot ovat saatavilla kun tehdään
// pyyntöä palvelmeen.
type Fields = {
  date: unknown,
  type: unknown,
  specialist: unknown,
  description: unknown,
  employerName: unknown,
  diagnosisCodes: unknown,
  sickLeave: {
    startDate: unknown,
    endDate: unknown
  },
  discharge: {
    date: unknown,
    criteria: unknown
  },
  healthCheckRating: unknown
};

// Alustetaan "checkEntryValidation" niminen muuttuja, joka suorittaa {...} sisällä olevat asiat aina,
// kun kyseiseen funktioon tehdään viittaus. Funktiolle annetaan parametrin arvoksi "getRequestBody"
// muuttujan arvo, joka saa "Fields" tyypin objektit käyttöönsä. Funktio palauttaa takaisin joko
// "Entry" tai "null" tyypin. Olemme ottaneet myös käyttöön "switch - case" metodin, koska tiedämme
// että parametrin kautta tuleva "type" objektin arvo voi olla ainoastaan kolmea (3) eri arvoa, niin
// funktio tarkistaa sen perusteella tietyt objektien arvot, jos "type" objektin arvo on => x arvoa.
// Tehtävän osalta "9.23: patientor, step8" tämä kyseinen funktio nyt olettaa, että kun käyttäjä
// yrittää lisätä esim. "Hospital" tyypin arvolle uuden arvon tietokantaan, niin sieltä löytyy
// tosiaan ne kaikki "vaadittavat" objektien arvot (pyynnön suorittamisen yhteydessä). Jos
// mikään "case" ei toteudu, niin palautetaan takaisin oletuksena "null" arvo.
const checkEntryValidation = (getRequestBody: Fields): Entry => {
  switch (getRequestBody.type) {
    case "OccupationalHealthcare":
      const entryOccupationalHealthcare: Entry = {
        date: parseDateValue(getRequestBody.date),
        type: "OccupationalHealthcare",
        specialist: parseSpecialistValue(getRequestBody.specialist),
        description: parseDescriptionValue(getRequestBody.description),
        employerName: parseEmployerNameValue(getRequestBody.employerName)
      };
      return entryOccupationalHealthcare;
    case "Hospital":
      const entryHospital: Entry = {
        date: parseDateValue(getRequestBody.date),
        type: "Hospital",
        specialist: parseSpecialistValue(getRequestBody.specialist),
        description: parseDescriptionValue(getRequestBody.description),
        diagnosisCodes: parseDiagnosisCodesValue(getRequestBody.diagnosisCodes),
        discharge: {
          date: parseDischargeDateValue(getRequestBody.discharge.date),
          criteria: parseDischargeCriteriaValue(getRequestBody.discharge.criteria)
        }
      };
      return entryHospital;
    case "HealthCheck":
      const entryHealthCheck: Entry = {
        date: parseDateValue(getRequestBody.date),
        type: "HealthCheck",
        specialist: parseSpecialistValue(getRequestBody.specialist),
        description: parseDescriptionValue(getRequestBody.description),
        healthCheckRating: parseHealthCheckRatingValue(getRequestBody.healthCheckRating)
      };
      return entryHealthCheck;
    default:
      throw new Error('You tried to add entry which "type" object does not exist in our database, please try again!');
    };
  };

// Viedään (export) alla oleva muuttujat (checkEntryValidation) sovelluksen käytettäväksi, jotta esim. "index.ts" tiedosto pystyy suorittamaan kyseiset funktiot.
export default checkEntryValidation;
