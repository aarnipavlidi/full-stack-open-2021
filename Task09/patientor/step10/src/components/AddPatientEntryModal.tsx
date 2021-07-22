// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from "react"; // Tuodaan "React" niminen kirjasto sovelluksen käytettäväksi.
import { Modal, Segment } from "semantic-ui-react"; // Tuodaan kyseiset tyylit "semantic-ui-react" kirjaston kautta sovelluksen käytettäväksi.

import EntryPatientForm from './EntryPatientForm';
import { Entry } from "../types";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: Entry) => void;
  error?: string;
}

const AddPatientEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <EntryPatientForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);

// Viedään (export) alla oleva komponentti (AddPatientEntryModal) sovelluksen käytettäväksi, jotta esim. "index.ts" tiedosto pystyy suorittamaan kyseiset funktiot.
export default AddPatientEntryModal;
