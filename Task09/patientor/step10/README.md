## 9.24: patientor, step9

For this exercise in order to add new entry to the database and not to have any problems
with types, I had to some changes on "backend" site => "patientsService.ts" file. I had
to make sure that once new value has been saved to the database, function will return
data which supports "Patient" type. We are doing this, because now "frontend" side
is expecting when we dispatch data into "state" that data is same type.

1) Change "addPatientEntryDatabase" function into this:

```javascript

const addPatientEntryDatabase = ( newEntry: Entry, currentPatientID: string ): Patient => {

  const showCurrentPatientData = patientsData.find(results => results.id === currentPatientID);

  const newPatientEntryValue = {
    id: uuidv4(),
    ...newEntry
  };

  if (!showCurrentPatientData) {
    throw new Error('Could not find patient data from the database, please try again!');
  };

  showCurrentPatientData.entries.push(newPatientEntryValue);
  return showCurrentPatientData;
};

```

As we can see we now returning "showCurrentPatientData" variable data, which has "Patient"
type. This way we are now able to handle data into "dispatch(...)" function properly!
