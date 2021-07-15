// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import { State } from "./state";
import { Patient } from "../types";

// "9.17: patientor, step2" tehtävää varten tehdyt muokkaukset:
// Muokattu alle olevaa "Action" tyyppiä niin, että lisätty
// uusi "action" nimeltään "GET_PATIENT_PERSONAL_DATA", jonka
// data noudattaa "Patient" tyyppiä (eli potilaan kaikki
// mahdollset objektien arvot mitä potilaalla voi olla).

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "GET_PATIENT_PERSONAL_DATA";
      payload: Patient;
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
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
          [action.payload.id]: action.payload
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    default:
      return state;
  }
};
