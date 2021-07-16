// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Lisätty "Link" funktio "react-router-dom" kirjastosta, jotta voidaan antaa jokaiselle potilaalle linkki, joka johtaa omalle sivulle.
import { Container, Table, Button } from "semantic-ui-react";

import { PatientFormValues } from "../AddPatientModal/AddPatientForm";
import AddPatientModal from "../AddPatientModal";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import HealthRatingBar from "../components/HealthRatingBar";
import { useStateValue, addPatientToList } from "../state"; // Lisätty "addPatientToList" funktio sovelluksen käytettäväksi "9.18: patientor, step3" tehtävää varten.

const PatientListPage = () => {
  const [{ patients }, dispatch] = useStateValue();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewPatient = async (values: PatientFormValues) => {
    try {
      const { data: newPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients`,
        values
      );
      // Tehtävää "9.18: patientor, step3" varten muokattu alla olevaa koodia niin,
      // että nyt suoritetaan "dispatch(...)" funktio => "addPatientToList" funktion
      // avulla, joka saa parametrin arvoksi => "newPatient".
      dispatch(addPatientToList(newPatient));
      closeModal();
    } catch (e) {
      console.error(e.response?.data || 'Unknown Error');
      setError(e.response?.data?.error || 'Unknown error');
    }
  };

  // "9.17: patientor, step2" tehtävää varten tehdyt muokkaukset:
  // Muokattu alla olevaa "return" osuutta niin, että potilaan
  // nimeä varten lisätty "<Link>...</Link>" elementti. Kun
  // käyttäjä klikkaa tietyn potilaan nimeä, niin se ohjaa
  // kyseisen potilaan omalle sivulle "id":n arvon avulla.
  // Kun käyttäjä klikkaa potilasta, niin samassa yhteydessä
  // haetaan tiedot erikseen tietokannasta, joka näyttää sitten
  // takaisin datan käyttäjälle. Tämän ominaisuuden "PatientFullData"
  // niminen komponentti hoitaa puolestamme.

  return (
    <div className="App">
      <Container textAlign="center">
        <h3>Patient list</h3>
      </Container>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Gender</Table.HeaderCell>
            <Table.HeaderCell>Occupation</Table.HeaderCell>
            <Table.HeaderCell>Health Rating</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {Object.values(patients).map((patient: Patient) => (
            <Table.Row key={patient.id}>
              <Table.Cell>
                <Link to={`/patient/${patient.id}`}>
                  {patient.name}
                </Link>
              </Table.Cell>
              <Table.Cell>{patient.gender}</Table.Cell>
              <Table.Cell>{patient.occupation}</Table.Cell>
              <Table.Cell>
                <HealthRatingBar showText={false} rating={1} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <AddPatientModal
        modalOpen={modalOpen}
        onSubmit={submitNewPatient}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Patient</Button>
    </div>
  );
};

export default PatientListPage;
