// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import { State } from "./state";
import { Patient } from "../types";
import { Diagnosis } from "../types"; // Lisätty "9.21: patientor, step6" tehtävää varten kyseinen funktio, jotta voidaan näyttää "diagnosis" data sovelluksen aikana.

// Tehtävää "9.18: patientor, step3" varten lisätty alla olevat kolme (3)
// erilaista funktiota eli "setPatientList", "setPatientPersonalList" sekä
// "addPatientToList". Jokainen funktia saa parametrin arvoksi => "getData"
// muuttujan arvon, jolle annetaan oma tyyppi eli joko "Patient[]" tai
// "Patient". Kun käyttäjä siis suorittaa jonkin toiminnon esim. lisää uuden
// potilaan tietokantaan, niin sitä kautta tuleva data siirtyy parametrin
// alle, joka noudattaa sille annettua tyypin rakennetta. Huomataan myös, että
// kun funktiota suoritetaan, niin se on yhteyksissä "Action" tyyppiin ja mikä
// on taas yhteyksissä reduceriin. Miten minä olen tämän osuuden ymmärtänyt,
// niin sovellukselle pitää kertoa, että kun kyseinen funktio (esim. "setPatientList")
// suoritetaan, niin "mitä pitäisi" tehdä kyseiselle datalle. Ilman tuota ": Action"
// osuutta, niin reducer ei tietäisi, että "SET_PATIENT_LIST" tyypin kohdalla on
// ilmestynyt dataa, jota pitäisi näyttää takaisin käyttäjälle. Olemme myös muokannut
// jokaisen tyypin osalta objektin arvoa => "payloader" => hiemen "parempaan" objektin
// nimeen, että pystymme erottamaan jokaisen tyypin datan hieman paremmin muista.

export const setPatientList = (getData: Patient[]): Action => {
  return {
    type: 'SET_PATIENT_LIST',
    showAllPatients: getData
  };
};

export const setPatientPersonalList = (getData: Patient): Action => {
  return {
    type: 'GET_PATIENT_PERSONAL_DATA',
    showSpecificPatient: getData
  };
};

export const addPatientToList = (getData: Patient): Action => {
  return {
    type: 'ADD_PATIENT',
    newPatient: getData
  };
};

// Lisätty "9.21: patientor, step6" tehtävää varten alla oleva funktio, joka
// suoritetaan aina kun kyseiseen funktioon tehdään viittaus eli aina kun
// käyttäjä siirtyy ensimmäistä kertaa tietyn potilaan tietoihin, niin sovellus
// suorittaa kyseisen funktion => "dispatch(...)" funktion avulla. Tämän jälkeen
// "stateen" tallentuu data minkä juuri saatiin palvelimen kautta. Funktio saa
// parametrin arvoksi "getData", joka noudattaa => "Diagnosis[]" tyyppiä.
export const setDiagnosesList = (getData: Diagnosis[]): Action => {
  return {
    type: 'GET_DIAGNOSES_DATA',
    showAllDiagnoses: getData
  };
};

// "9.17: patientor, step2" tehtävää varten tehdyt muokkaukset:
// Muokattu alle olevaa "Action" tyyppiä niin, että lisätty
// uusi "action" nimeltään "GET_PATIENT_PERSONAL_DATA", jonka
// data noudattaa "Patient" tyyppiä (eli potilaan kaikki
// mahdollset objektien arvot mitä potilaalla voi olla).

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      showAllPatients: Patient[]; // "9.18: patientor, step3" tehtävä edit => muokattu objektin arvo "payloader" kyseisen objektin arvoon.
    }
  | {
      type: "GET_PATIENT_PERSONAL_DATA";
      showSpecificPatient: Patient; // "9.18: patientor, step3" tehtävä edit => muokattu objektin arvo "payloader" kyseisen objektin arvoon.
    }
  | {
      type: "ADD_PATIENT";
      newPatient: Patient; // "9.18: patientor, step3" tehtävä edit => muokattu objektin arvo "payloader" kyseisen objektin arvoon.
    }
  | {
      type: "GET_DIAGNOSES_DATA"; // Lisätty kyseinen objekti => "9.21: patientor, step6" tehtävää varten.
      showAllDiagnoses: Diagnosis[]; // Lisätty kyseinen objekti => "9.21: patientor, step6" tehtävää varten.
    };


export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.showAllPatients.reduce( // "9.18: patientor, step3" tehtävä edit => muokattu objektin arvo "payloader" kyseisen objektin arvoon.
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    // "9.17: patientor, step2" tehtävää varten tehdyt muokkaukset:
    // Lisätty "GET_PATIENT_PERSONAL_DATA" tyypille oma "case", joka
    // käytännössä tekee "saman asian" kuin alla oleva "ADD_PATIENT"
    // paitsi, että sen sijaan, että lisätään uusi arvo "patients"
    // objektin "stateen", niin me lisäämme sen "personalPatientData"
    // objektin alle. Näin pystytään pitämään kaksi (2) erillistä
    // "statea" erillään toisistaan.
    case "GET_PATIENT_PERSONAL_DATA":
      return {
        ...state,
        personalPatientData: {
          ...state.personalPatientData,
          [action.showSpecificPatient.id]: action.showSpecificPatient // "9.18: patientor, step3" tehtävä edit => muokattu objektin arvo "payloader" kyseisen objektin arvoon.
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.newPatient.id]: action.newPatient // "9.18: patientor, step3" tehtävä edit => muokattu objektin arvo "payloader" kyseisen objektin arvoon.
        }
      };
    // Lisätty "9.21: patientor, step6" tehtävää varten alla oleva "case" eli
    // "GET_DIAGNOSES_DATA", joka toimii samalla periaattella kuin yllä oleva
    // "SET_PATIENT_LIST". Ainoa ero on vain ainoastaan, että palvelimen kautta
    // tuleva data tallennetaan "stateen" => "diagnosisData" objektin alle.
    case "GET_DIAGNOSES_DATA":
      return {
        ...state,
        diagnosisData: {
          ...action.showAllDiagnoses.reduce(
            (memo, values) => ({ ...memo, [values.code]: values }),
            {}
          ),
          ...state.diagnosisData
        }
      };
    default:
      return state;
  }
};
