// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Button, Divider, Header, Container } from "semantic-ui-react";

import { apiBaseUrl } from "./constants";
import { useStateValue, setPatientList } from "./state"; // Lisätty "setPatientList" funktio sovelluksen käytettäväksi "9.18: patientor, step3" tehtävää varten.
import { Patient } from "./types";

import PatientListPage from "./PatientListPage";
import PatientFullData from "./components/PatientFullData"; // Luotu uusi komponentti "PatientFullData", joka tuodaan sovelluksen käytettäväksi.

const App = () => {
  const [, dispatch] = useStateValue();
  React.useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );
        // Tehtävää "9.18: patientor, step3" varten muokattu alla olevaa koodia niin,
        // että nyt suoritetaan "dispatch(...)" funktio => "setPatientList" funktion
        // avulla, joka saa parametrin arvoksi => "patientListFromApi".
        dispatch(setPatientList(patientListFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatientList();
  }, [dispatch]);

  // "9.17: patientor, step2" tehtävää varten tehdyt muokkaukset:
  // Muokattu alle olevaa "return" osuutta niin, että aina kun
  // käyttäjä klikkaa tiettyä potilasta, niin sovellus ohjautuu
  // osoitteeseen => "patient/:id" ja tämä aiheuttaa sen, että
  // sovellus renderöi takaisin "PatientFullData" komponentin
  // sisällön takaisin käyttäjälle näkyviin.

  return (
    <div className="App">
      <Router>
        <Container>
          <Header as="h1">Patientor</Header>
          <Button as={Link} to="/" primary>Home</Button>
          <Divider hidden />
          <Switch>
            <Route path="/patient/:id">
              <PatientFullData />
            </Route>
            <Route path="/">
              <PatientListPage />
            </Route>
          </Switch>
        </Container>
      </Router>
    </div>
  );
};

export default App;
