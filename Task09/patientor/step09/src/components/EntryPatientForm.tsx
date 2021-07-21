// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from "react"; // Tuodaan "React" niminen kirjasto sovelluksen käytettäväksi.

import { Grid, Button } from "semantic-ui-react"; // Tuodaan kyseiset elementit "semantic-ui-react" kirjaston kautta sovelluksen käytettäväksi.
import { Field, Formik, Form } from "formik"; // Tuodaan kyseiset elementit "formik" kirjaston kautta sovelluksen käytettäväksi.

// Tuodaan alla olevat muuttujat "FormField.tsx" tiedostosta sovelluksen käytettäväksi.
import { TextField, NumberField, SelectFieldEntry, DiagnosisSelection, EntryOption } from "../AddPatientModal/FormField";
import { EntryType, Entry } from "../types"; // Tuodaan kyseiset tyypit "types.ts" tiedostosta sovelluksen käytettäväksi.

import { useStateValue } from "../state"; // Tuodaan kyseinen funktio "state.tsx" tiedostosta sovelluksen käytettäväksi.

// Alustetaan "Props" niminen interface, joka saa käyttöönsä {...} sisällä olevat objektien arvot sekä niiden tyypit.
interface Props {
  // Kun käyttäjä lisää uuden arvon "entries" objektin alle, niin sen hetkiset
  // arvot sijoittuvat "values" parametriin, jotka saavat tyypiksi "Entry"
  // tyypin. Arvon lisääminen tietokantaan tapahtuu erikseen "PatientFullData"
  // tiedostossa => "submitNewEntry(...)" funktion avulla.
  onSubmit: (values: Entry) => void;
  onCancel: () => void; // Objektin "onCancel" perutaan arvon lisääminen ja piilotetaan "modal" pois näkyvistä.
}

// Alustetaan "EntryPatientForm" niminen komponentti, joka suorittaa {...} sisällä olevat asiat aina,
// kun kyseiseen komponenttiin tehdään viittaus. Komponentti saa käyttöönsä myös parametrin arvot
// "onSubmit" ja "onCancel", jotka molemmat saavat tyypiksi "Props". Komponentin idea on siis
// renderöidä "form" käyttäjälle näkyviin, kun hän haluaa lisätä uuden "entryn" sen hetkiselle
// potilaalle. Sovellus renderöi oletuksena kentät, jotka sopivat/täsmäävät "type" objektin eli
// "OccupationalHealthcare" kanssa. Jos käyttäjä haluaa vaihtaa "entryn" tyyppiä, niin sovellus
// renderöi takaisin ne kentät, jotka sopivat uuden tyypin kanssa. Tämän avulla varmistetaan, että
// kun käyttäjä lisää uuden arvon, niin data on yhteensopiva (backendin puolesta). Koodista myös
// löytyy muutamalle objektin arvolle (ei kaikille!) "lyhyttä" validointia, eli jos tietty arvo
// puuttuu formista, niin sovellus ilmoittaa siitä käyttäjälle. Tämän avulla varmistetaan, että
// "submit" painiketta ei voida "klikkaa" ennen kuin jokainen objektin arvo on "päässyt läpi"
// validoinnin osalta. Tämä tarkoittaa sitä, että jos esim. emme ole erikseen tehnyt validointia
// esim. "specialist" kentälle, niin käyttäjä pystyy lisäämään uuden arvon tietokantaan riippumatta
// siitä, että onko käyttäjä laittanut "specialist" kenttään arvoa vai ei. Tämä on hyvä muistaa!
export const EntryPatientForm = ({ onSubmit, onCancel }: Props) => {

  // Alustetaan "entryTypeOptions" niminen muuttuja, joka saa käyttöönsä [...] sisällä
  // olevat arvot. Jokaiselle "tyypille" annetaan siis kaksi (2) objektin arvoa eli
  // "value" sekä "label". Tämä on luotu, jotta "SelectFieldEntry" komponentti pystyy
  // renderöimään kaikki tyypin arvot takaisin käyttäjälle näkyviin.
  const entryTypeOptions: EntryOption[] = [
    { value: EntryType.OccupationalHealthcare, label: "OccupationalHealthcare"},
    { value: EntryType.Hospital, label: "Hospital"},
    { value: EntryType.HealthCheck, label: "HealthCheck"}
  ];

  // Alustetaan "diagnosisData" muuttuja, joka suorittaa kyseisen funktion. Tätä tarvitaan, jos
  // käyttäjä haluaa lisätä uuden "entryn" => "Hospital" tyypin alla ja siellä on erikseen
  // luotu "Diagnoses" kenttä. Kyseinen kenttä siis renderöi kaikki eri diagonoosit ja niiden
  // koodit takaisin. Arvot haetaan erikseen "statesta" => "diagnosisData" objektin alta.
  const [{ diagnosisData }] = useStateValue();

  // Komponentti "EntryPatientForm" renderöi (...) sisällä olevat asiat takaisin käyttäjälle näkyviin.
  // Olemme ottaneet myös käyttöön "switch - case" metodin, jonka avulla sovellus renderöi aina erilaiset
  // vaihtoehdot, jos "type" objektin arvo muuttuu käytön aikana.
  return (
    <Formik
      initialValues={{
        type: "OccupationalHealthcare",
        date: "",
        specialist: "",
        description: "",
        employerName: ""
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required"; // Alustetaan "requiredError" niminen muuttuja, joka saa kyseisen tekstin arvoksi.
        // Alustetaan "errors" niminen muuttuja, joka suorittaa kyseisen asiat eli
        //, jos uuden arvon lisäämisen aikana jokin kenttä puuttuu, niin "console.log"
        // funktio avulla seuraava asia tulostuisi ("date" objektin kenttä puuttuu):
        // ===> { date: "Field is required" };
        const errors: { [field: string]: string } = {};

        switch (values.type) {
          // Jos "values.type" on yhtä kuin => "OccupationalHealthcare",
          // niin sovellus saa käyttöönsä kyseiset if-ehtojen validoinnit.
          case "OccupationalHealthcare":
            if (!values.date) {
              errors.date = requiredError;
            }
            if (!values.specialist) {
              errors.specialist = requiredError;
            }
            if (!values.description) {
              errors.description = requiredError;
            }
            if (!values.employerName) {
              errors.employerName = requiredError;
            }
            break;
          // Jos "values.type" on yhtä kuin => "Hospital", niin sovellus
          // saa käyttöönsä kyseiset if-ehtojen validoinnit.
          case "Hospital":
            if (!values.date) {
              errors.date = requiredError;
            }
            if (!values.specialist) {
              errors.specialist = requiredError;
            }
            if (!values.description) {
              errors.description = requiredError;
            }
            if (!values.diagnosisCodes) {
              errors.diagnosisCodes = requiredError;
            }
            break;
          // Jos "values.type" on yhtä kuin => "HealthCheck", niin sovellus
          // saa käyttöönsä kyseiset if-ehtojen validoinnit.
          case "HealthCheck":
            if (!values.date) {
              errors.date = requiredError;
            }
            if (!values.specialist) {
              errors.specialist = requiredError;
            }
            if (!values.description) {
              errors.description = requiredError;
            }
            if (!values.healthCheckRating) {
              errors.healthCheckRating = requiredError;
            }
          }

          return errors;
      }}
      >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
      switch (values.type) {
        // Jos "values.type" on yhtä kuin => "OccupationalHealthcare", niin sovellus
        // renderöi (...) sisällä olevat asiat takaisin käyttäjälle näkyviin.
        case "OccupationalHealthcare":
          return (
            <Form className="form ui">
              <SelectFieldEntry
                label="Choose entry type"
                name="type"
                options={entryTypeOptions}
              />
              <Field
                label="Date"
                placeholder="Entry date here..."
                name="date"
                component={TextField}
              />
              <Field
                label="Specialist"
                placeholder="Entry specialist here..."
                name="specialist"
                component={TextField}
              />
              <Field
                label="Description"
                placeholder="Entry description here..."
                name="description"
                component={TextField}
              />
              <Field
                label="Employer name"
                placeholder="Entry employer name here..."
                name="employerName"
                component={TextField}
              />
              <Grid>
                <Grid.Column floated="left" width={5}>
                  <Button type="button" onClick={onCancel} color="red">Cancel</Button>
                </Grid.Column>
                <Grid.Column floated="right" width={5}>
                  <Button type="submit" floated="right" color="green" disabled={!dirty || !isValid}>Add new entry</Button>
                </Grid.Column>
              </Grid>
            </Form>
          );
        // Jos "values.type" on yhtä kuin => "Hospital", niin sovellus
        // renderöi (...) sisällä olevat asiat takaisin käyttäjälle näkyviin.
        // Ota myös huomioon, että olemme lisänneet kahteen (2) viimeiseen
        // kenttään ("name" parametri) eli => name="discharge.date" sekä
        // name="discharge.criteria". Näin varmistamme, että kun käyttäjä
        // lisää "Hospital" tyypille uuden arvon, niin nämä kyseiset kentät
        // sijoittuvat "discharge" objektin alle, kun tallennetaan arvo
        // tietokantaan talteen!
        case "Hospital":
          return (
            <Form className="form ui">
              <SelectFieldEntry
                label="Choose entry type"
                name="type"
                options={entryTypeOptions}
              />
              <Field
                label="Date"
                placeholder="Entry date here..."
                name="date"
                component={TextField}
              />
              <Field
                label="Specialist"
                placeholder="Entry specialist here..."
                name="specialist"
                component={TextField}
              />
              <Field
                label="Description"
                placeholder="Entry description here..."
                name="description"
                component={TextField}
              />
              <DiagnosisSelection
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                diagnoses={Object.values(diagnosisData)}
              />
              <Field
                label="Date for discharge"
                placeholder="Date for discharge here..."
                name="discharge.date"
                component={TextField}
              />
              <Field
                label="Criteria for discharge"
                placeholder="Criteria for discharge here..."
                name="discharge.criteria"
                component={TextField}
              />
              <Grid>
                <Grid.Column floated="left" width={5}>
                  <Button type="button" onClick={onCancel} color="red">Cancel</Button>
                </Grid.Column>
                <Grid.Column floated="right" width={5}>
                  <Button type="submit" floated="right" color="green" disabled={!dirty || !isValid}>Add new entry</Button>
                </Grid.Column>
              </Grid>
            </Form>
          );
        // Jos "values.type" on yhtä kuin => "HealthCheck", niin sovellus
        // renderöi (...) sisällä olevat asiat takaisin käyttäjälle näkyviin.
        case "HealthCheck":
          return (
            <Form className="form ui">
              <SelectFieldEntry
                label="Choose entry type"
                name="type"
                options={entryTypeOptions}
              />
              <Field
                label="Date"
                placeholder="Entry date here..."
                name="date"
                component={TextField}
              />
              <Field
                label="Specialist"
                placeholder="Entry specialist here..."
                name="specialist"
                component={TextField}
              />
              <Field
                label="Description"
                placeholder="Entry description here..."
                name="description"
                component={TextField}
              />
              <Field
                label="Health Check Rating"
                placeholder="Entry health check rating here..."
                name="healthCheckRating"
                component={NumberField}
                min={0}
                max={3}
              />
              <Grid>
                <Grid.Column floated="left" width={5}>
                  <Button type="button" onClick={onCancel} color="red">Cancel</Button>
                </Grid.Column>
                <Grid.Column floated="right" width={5}>
                  <Button type="submit" floated="right" color="green" disabled={!dirty || !isValid}>Add new entry</Button>
                </Grid.Column>
              </Grid>
            </Form>
          );
        }
      }}
      </Formik>
    );
  };

// Viedään (export) alla oleva komponentti (EntryPatientForm) sovelluksen käytettäväksi, jotta esim. "index.ts" tiedosto pystyy suorittamaan kyseiset funktiot.
export default EntryPatientForm;
