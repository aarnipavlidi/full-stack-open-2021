// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React, { createContext, useContext, useReducer } from "react";
import { Patient } from "../types";
import { Diagnosis } from "../types"; // Lisätty "9.21: patientor, step6" tehtävää varten kyseinen funktio, jotta voidaan näyttää "diagnosis" data sovelluksen aikana.

import { Action } from "./reducer";

export type State = {
  patients: { [id: string]: Patient };
  personalPatientData: { [id: string]: Patient }; // Lisätty "stateen" uusi objektin arvo => "personalPatientData".
  diagnosisData: { [code: string]: Diagnosis }; // Lisätty "9.21: patientor, step6" tehtävää varten kyseinen objekti "statea" varten.
};

const initialState: State = {
  patients: {},
  personalPatientData: {}, // Lisätty "stateen" uusi objektin arvo => "personalPatientData".
  diagnosisData: {} // Lisätty "9.21: patientor, step6" tehtävää varten kyseinen objekti "statea" varten.
};

export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState
]);

type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};

export const StateProvider: React.FC<StateProviderProps> = ({
  reducer,
  children
}: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};
export const useStateValue = () => useContext(StateContext);
