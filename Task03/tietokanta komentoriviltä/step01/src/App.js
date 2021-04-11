// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React, { useState, useEffect } from 'react' // Otetaan "React" kirjaston sisältö käyttöön, joka myös hyödyntää "useState" ja "useEffect" funktioita.
import axios from 'axios' // Otetaan "Axios" kirjaston sisältö käyttöön.
import PersonsComponent from './components/Persons' // Tuodaan "PersonsComponent" komponentti käyttöön, joka sijaitsee kyseisellä sivulla.
import notesService from './services/notesPersons' // Alustetaan muuttuja "notesService", joka hyödyntää "notesPersons.js" moduulin sisältöä.

const InputComponent = (props) => {
  return (
    <div>
      <input
        value={props.valueProps}
        onChange={props.onChangeProps}
        placeholder={props.placeholderProps}
      />
    </div>
  )
}

const FormComponent = (props) => {
  return (
    <form onSubmit={props.onSubmitProps}>
      <div>
        <input
          value={props.nameValue}
          onChange={props.nameChange}
          placeholder={props.namePlace}
          />
      </div>
      <div>
        <input
          value={props.numberValue}
          onChange={props.numberChange}
          placeholder={props.numberPlace}
        />
      </div>
      <button type={props.typeProps}>Add</button>
    </form>
  )
}

// Luodaan komponentti "Notification", jonka sisälle luodaan kaksi (2) erilaista muuttujaa => "message" ja "checkStatus" käytettäväksi komponentin sisällä.
// Riviltä 212 löytyy => "<Notification message={statusMessage} checkStatus={status} />" ja kuten huomataan, niin nämä kaksi (2) muuttujaa on viitattu olemaan yhtä kuin x muuttujan kanssa.
// Jos näitä kahta (2) muuttujaa ei olisi laitettu esim. => "const Notification = () => {...}" niin alla oleva komponentti ei toimisi ollenkaan!
const Notification = ({ message, checkStatus }) => {
  if (message === null) { // Jos muuttuja "message" => {statusMessage} on arvoa "null" niin mitään ei renderöidä takaisin käyttäjälle.
    return null
  }

  if (message != null && checkStatus === false) { // Jos muuttuja "message" => {statusMessage} on epätosi arvon "null" kanssa ja muuttuja "checkStatus" => {status} on yhtä kuin "false", niin renderöidään alla oleva asia.
    return ( // Alla oleva <div>...</div> elementti hyödyntää .error tyyliä, jonka se poimii => index.css tiedostosta.
      <div className="error">
        {message}
      </div>
    )
  }

  else if (message != null && checkStatus === true) { // Jos muuttuja "message" => {statusMessage} on epätosi arvon "null" kanssa ja muuttuja "checkStatus" => {status} on yhtä kuin "true", niin renderöidään alla oleva asia.
    return ( // Alla oleva <div>...</div> elementti hyödyntää .success tyyliä, jonka se poimii => index.css tiedostosta.
      <div className="success">
        {message}
      </div>
    )
  }
}

const App = () => {
  const [persons, setPersons] = useState([]) // Alustetaan muuttuja "persons" tilaan, joka saa oletuksena arvon => [] eli tyhjän taulukon ja jos haluamme muuttaa tilan arvoa, niin käytämme funktiota => "setPersons".

  const [status, setStatus] = useState(true) // Alustetaan muuttuja "status" tilaan, joka saa oletuksena arvon "true" ja jos haluamme muuttaa tilan arvoa, niin käytämme funktiota => "setStatus".
  const [statusMessage, setStatusMessage] = useState(null) // Alustetaan muuttuja "statusMessage" tilaan, joka saa oletuksena arvon "null" ja jos haluamme muuttaa tilan arvoa, niin käytämme funktiota => "setStatusMessage".

  useEffect(() =>  {
    notesService // Käytetään muuttujan "notesService" moduulin sisältöä, josta löytyy muuttuja => "const getAllValues = () =>".
      .getAllValues() // Mikä tarkoittaa, että ensin tehdään kyseisen muuttujan funktiot, joka palauttaa takaisin datan (esim. => fetchValues.data) käytettäväksi.
      .then(showResults => { // Muuttuja "showResults" voi olla myös esim. "Aarni" eli .then(Aarni => ...).
        setPersons(showResults) // Tämän jälkeen muutetaan "persons" taulukon tilaa käyttämällä "setPersons" funktiota, joka hyödyntää muuttujan "showResults" arvoja. Ota huomioon, että kyseinen muuttuja voi olla mikä tahansa!
        console.log(showResults) // Tulostetaan konsoliin "showResults" muuttujan arvot.
        })
  }, []) // Käytämme funktion "useEffect" lopussa [], koska haluamme että kyseinen funktio renderöi sivulle vain kerran.

  const [filterName, setFilterName] = useState('') // Alustetaan muuttuja "filterName" tilaan, joka saa oletuksena arvon => '' ja jos haluamme muuttaa tilan arvoa, niin käytämme funktiota => "setFilterName".
  const [newName, setNewName] = useState('') // Alustetaan muuttuja "newName" tilaan, joka saa oletuksena arvon => '' ja jos haluamme muuttaa tilan arvoa, niin käytämme funktiota => "setNewName".
  const [newNumber, setNewNumber] = useState('') // Alustetaan muuttuja "newNumber" tilaan, joka saa oletuksena arvon => '' ja joa haluamme muuttaa tilan arvoa, niin käytämme funktiota => "setNewNumber".

  const inputTextFilter = "What do you want to filter?" // Alustetaan muuttuja, joka sijoittuu filtteröinnin input:iin (InputComponent => props).
  const inputTextName = "Add new persons name..." // Alustetaan muuuttuja, joka sijoittuu nimen lisäämisen input:iin (FormComponent => props).
  const inputTextNumber = "Add new persons phone number..." // Alustetaan muuttuja, joka sijoittuu numeron lisäämisen input:iin (FormComponent => props).

  // Kun käyttäjä lisää uudet tiedot luetteloon, niin se tekee alla olevan funktion (submitPerson) ja tallentaa tiedot "väliaikaisesti" "nameObject" muuttujan alle.
  // Muuttujan "nameObject" taulukko voi olla seuraavanlainen esim. nameObject[0] => {name, phonenumber, date, important, id} => {"Aarni Pavlidi", 050 123 456, "2021-02-10T19:31:07.280Z", true, 3}.
  const submitPerson = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
      id: persons.length + 1,
    }

    // Kun käyttäjä haluaa lisätä henkilön nimen niin se tallennetaan "väliaikaisesti" muuttujan "nameObject.name" alle ja muista, että kyseinen muuttuja on sama arvo kuin muuttuja "newName".
    // Kun käyttäjä haluaa lisätä henkilön nimen lisäksi puhelinnumeron, niin se tallennetaan "väliaikaisesti" muuttujan "nameObject.number" alla ja muista, että kyseinen muuttuja on sama arvo kuin muuttuja "newNumber".
    const findCurrentName = persons.find(findValue => findValue.name === nameObject.name) // Alustetaan muuttuja "findCurrentName", jossa etsitään taulukko (array), jonka "name" objekti täsmää käyttäjän antamalla arvolla eli "nameObject.name" tai "newName".
    const changeCurrentName = { ...findCurrentName, number: nameObject.number } // Alustetaan muuttuja "changeCurrentName", jossa tehdään muuttujan "findCurrentName" taulukosta kopio (Shallow copy) ja muutetaan kyseisen objektin "number" arvo käyttämällä käyttäjän antamaa arvoa eli "nameObject.number" tai "newNumber".

    // Mikäli käyttäjä yrittää lisätä nimen, joka löytyy jo taulukosta entuudestaan niin se tulostaa näyttöön hälytyksen (=> window.confirm(...)) ja ilmoittaa, että haluaako käyttäjä päivittää kyseisen nimen puhelinnumeron.
    // Mikäli käyttäjä lisää nimen, jota ei löydy taulukosta entuudestaan, niin se tulostaa uudet tiedot näkyviin käyttäjälle (else => setPersons(...)).
    if(persons.some(personsSearch => personsSearch.name === newName)) {
      if(window.confirm(`${nameObject.name} is already added to the records. Do you want to update the old number with a new one?`)) {
        notesService // Käytetään muuttujan "notesService" moduulin sisältöä, josta löytyy muuttuja => "const updateValue = (id, changeValue) =>".
          .updateValue(findCurrentName.id, changeCurrentName) // Jos findCurrentName.id  olisi esim. => "1" niin .updateValue() funktio siirtyy osoitteeseen => http://localhost:3001/persons/1 ja päivittää siellä kyseistä objektia eli tässä tapauksessa "number" arvoa.
          .then(response => { // Kun "updateValue()" funktio on suoritettu, niin se tallentaa kyseisen id:n sisällön väliaikaisesti muuttujan "response" alle eli jos käyttäisimme "console.log(response)" funktiota => .then(...) sisällä, niin saisimme päivitetyn taulukon arvon tulostettua konsolille.
            // Muutetaan "persons" muuttujan tilaa käyttämällä "map()" funktiota, joka luo meille uuden taulukon (creates a new array). Huomaat myös, että käytämmmä tässä "index" muuttujaa "map()" funktion sisällä eli jos taulukossa on 4 erilaista arvoa, niin "index" muuttuja voi olla seuraavat arvot => [0, 1, 2, 3].
            setPersons(persons.map((results, index) => results.id !== findCurrentName.id ? persons[index] : response)) // Jos taulukon sisällä oleva arvo => "results.id" ei täsmää (tai on epätosi) => muuttujan "findCurrentName.id":n kanssa, niin käytetään alkuperäisiä arvoja => "persons[index]" ja jos täsmää, niin käytetään muuttujan "response" arvoja ja vaihdetaan ne nykyisten arvojen kanssa.
            setFilterName('') // Mikäli käyttäjä hyväksyy "windown.confirm()" hälytyksen, niin se muuttaa "filterName" muuttujan alkuperäiseen tilaan eli tyhjentää sen hetkisen muuttujan arvon.
            setNewName('') // Mikäli käyttäjä hyväksyy "window.confirm()" hälytyksen, niin se muuttaa "newName" muuttujan alkuperäiseen tilaan eli tyhjentää sen hetkisen muuttujan arvon.
            setNewNumber('') // Mikäli käyttäjä hyväksyy "window.confirm()" hälytyksen, niin se muuttaa "newNumber" muuttujan alkuperäiseen tilaan eli tyhjentää sen hetkisen muuttujan arvon.
            setStatus(true) // Muutetaan "status" muuttujan arvoksi => "true". Tätä ei periaatteessa ei tarvitse olla tässä, koska jos henkilön päivittäminen epäonnistuu, niin siinä muutetaan sama muuttuja arvoon => "false" ja sen jälkeen takaisin arvoon "true", mutta tällä varmistetaan aina se, että henkilön päivittäminen renderöi oikean ilmoituksen takaisin käyttäjälle näkyviin.
            setStatusMessage(` You have updated ${nameObject.name} successfully on the phonebook! `) // Muutetaan "statusMessage" muuttujan arvo kyseiseen tekstiin. Muista, että kyseinen muuttuja on yhtä kuin {message} <=> "Notification" komponentin sisällä oleva muuttuja.
            setTimeout(() => { // Käytetään "setTimeOut()" funktiota, jotta saadaan ilmoitus poistumaan tietyn ajan päästä eli tässä tapauksessa ilmoitus poistuu näytöltä 2. sekunnin (eli 2000 ms) kuluttua.
              setStatusMessage(null) // Muutetaan "statusMessage" muuttujan arvoksi => "null". Muista, että kyseinen muuttuja on yhtä kuin {message} <=> "Notification" komponentin sisällä oleva muuttuja.
            }, 2000)
          })
          .catch(error => { // Mikäli tulee virheitä, kun yritetään päivittää puhelinluettelon henkilöä, niin ohjelma suorittaa {...} sisällä olevat asiat ja renderöi ne takaisin käyttäjälle näkyviin.
            setStatus(false) // Muutetaan "status" muuttujan arvoksi => "false". Muista, että kyseinen muuttuja on yhtä kuin {checkStatus} <=> "Notification" komponentin sisällä oleva muuttuja.
            setStatusMessage(` Updating ${nameObject.name} on the phonebook was unsuccessful. Please try again! :) `) // Muutetaan "statusMessage" muuttujan arvo kyseiseen tekstiin. Muista, että kyseinen muuttuja on yhtä kuin {message} <=> "Notification" komponentin sisällä oleva muuttuja.
            setTimeout(() => { // Käytetään "setTimeOut()" funktiota, jotta saadaan ilmoitus poistumaan tietyn ajan päästä eli tässä tapauksessa ilmoitus poistuu näytöltä 3. sekunnin (eli 3000 ms) kuluttua.
              setStatus(true) // Muutetaan "status" muuttuja oletusarvoon eli "true". Muista, että kyseinen muuttuja on yhtä kuin {checkStatus} <=> "Notification" komponentin sisällä oleva muuttuja.
              setStatusMessage(null) // Muutetaan "statusMessage" muuttujan arvoksi => "null". Muista, että kyseinen muuttuja on yhtä kuin {message} <=> "Notification" komponentin sisällä oleva muuttuja.
            }, 3000)
          })
        }
      } else { // Mikäli käyttäjän lisämää nimeä ei löydy luettelosta, niin lisätään arvot kyseisellä muuttujan arvolla (nameObject) kyseiseen sivuun, joka on .json muodossa.
        notesService // Käytetään muuttujan "notesService" moduulin sisältöä, josta löytyy muuttuja => "const createValue = (newValue) =>".
        .createValue(nameObject) // Päivitetään luetteloa käyttämällä muuttujan "nameObject" arvoa. Muuttujan sisältä löytyy arvot => name, number, date, important ja id.
        .then(newValue => { // Kun "createValue()" funktio on suoritettu, niin se tallentaa käyttäjän antamat arvot väliaikaisesti muuttujan "newValue" alle eli jos käyttäisimme "console.log(newValue)" funktiota => .then(...) sisällä, niin saisimme käyttäjän antamat arvot tulostettua konsoliin.
          setPersons(persons.concat(newValue)) // Muutetaan muuttujan "persons" tilaa käyttämällä "setPersons" funkiota ja funktion "concat" avulla me emme muutta komponentin alkuperäistä tilaa, vaan luodaan uusi taulukko!
          setFilterName('') // Kun sivu suorittaa tämän funktion (submitPerson), niin se tyhjentää kyseisen muuttujan taulukon. Mikäli tätä ei olisi, niin se arvo minkä käyttäjä antaa input:iin jäisi ns. "roikkumaan" näkyviin.
          setNewName('') // Kun sivu suorittaa tämän funktion (submitPerson), niin se tyhjentää kyseisen muuttujan taulukon. Mikäli tätä ei olisi, niin se arvo minkä käyttäjä antaa input:iin jäisi ns. "roikkumaan" näkyviin.
          setNewNumber('') // Kun sivu suorittaa tämän funktion (submitPerson), niin se tyhjentää kyseisen muuttujan taulukon. Mikäli tätä ei olisi, niin se arvo minkä käyttäjä antaa input:iin jäisi ns. "roikkumaan" näkyviin.
          setStatus(true) // Muutetaan "status" muuttujan arvoksi => "true". Tätä ei periaatteessa ei tarvitse olla tässä, koska jos henkilön lisääminen epäonnistuu, niin siinä muutetaan sama muuttuja arvoon => "false" ja sen jälkeen takaisin arvoon "true", mutta tällä varmistetaan aina se, että henkilön lisääminen renderöi oikean ilmoituksen takaisin käyttäjälle näkyviin.
          setStatusMessage(` You have added ${nameObject.name} successfully to the phonebook! `) // Muutetaan "statusMessage" muuttujan arvo kyseiseen tekstiin. Muista, että kyseinen muuttuja on yhtä kuin {message} <=> "Notification" komponentin sisällä oleva muuttuja.
          setTimeout(() => { // Käytetään "setTimeOut()" funktiota, jotta saadaan ilmoitus poistumaan tietyn ajan päästä eli tässä tapauksessa ilmoitus poistuu näytöltä 2. sekunnin (eli 2000 ms) kuluttua.
            setStatusMessage(null) // Muutetaan "statusMessage" muuttujan arvoksi => "null". Muista, että kyseinen muuttuja on yhtä kuin {message} <=> "Notification" komponentin sisällä oleva muuttuja.
          }, 2000)
        })
        .catch(error => { // Mikäli tulee virheitä, kun yritetään lisätä puhelinluetteloon uutta henkilöä, niin ohjelma suorittaa {...} sisällä olevat asiat ja renderöi ne takaisin käyttäjälle näkyviin.
          setStatus(false) // Muutetaan "status" muuttujan arvoksi => "false". Muista, että kyseinen muuttuja on yhtä kuin {checkStatus} <=> "Notification" komponentin sisällä oleva muuttuja.
          setStatusMessage(` Adding ${nameObject.name} to the phonebook was unsuccessful. Please try again! :) `) // Muutetaan "statusMessage" muuttujan arvo kyseiseen tekstiin. Muista, että kyseinen muuttuja on yhtä kuin {message} <=> "Notification" komponentin sisällä oleva muuttuja.
          setTimeout(() => { // Käytetään "setTimeOut()" funktiota, jotta saadaan ilmoitus poistumaan tietyn ajan päästä eli tässä tapauksessa ilmoitus poistuu näytöltä 3. sekunnin (eli 3000 ms) kuluttua.
            setStatus(true) // Muutetaan "status" muuttuja oletusarvoon eli "true". Muista, että kyseinen muuttuja on yhtä kuin {checkStatus} <=> "Notification" komponentin sisällä oleva muuttuja.
            setStatusMessage(null) // Muutetaan "statusMessage" muuttujan arvoksi => "null". Muista, että kyseinen muuttuja on yhtä kuin {message} <=> "Notification" komponentin sisällä oleva muuttuja.
          }, 3000)
        })
      }
    }

  // Input:sta (missä filtteröidään nimi) löytyy "value={filterName}", niin käytännössä tämä muuttuja tallentaa (=> setFilterName) kaiken mitä käyttäjä kirjoittaa.
  const handleFilterNameChange = (event) => {
    console.log(event.target.value) // = console.log(filterName) tulostaa saman asian ja ennen kuin käyttäjä kirjoittaa mitään input:iin, niin => filterName = ''.
    setFilterName(event.target.value) // Kun käyttäjä kirjoittaa arvon esim. "Aarni" niin funktio => setFilterName tallentaa sen arvon, joten filterName = Aarni.
  }

  // Input:sta (missä lisätään uusi nimi) löytyy "value={newName}", niin käytännössä tämä muuttuja tallentaa (=> setNewName) kaiken mitä käyttäjä kirjoittaa.
  const handleNameChange = (event) => {
    console.log(event.target.value) // = console.log(newName) tulostaa saman asian ja ennen kuin käyttäjä kirjoittaa mitään input:iin, niin => newName = ''.
    setNewName(event.target.value) // Kun käyttäjä kirjoittaa arvon esim. "Aarni Pavlidi" niin funktio => setNewName tallentaa sen arvon, joten newName = Aarni Pavlidi.
  }

  // Input:sta (missä lisätään uusi numero) löytyy "value={newNumber}", niin käytännössä tämä muuttuja tallentaa (=> setNewNumber) kaiken mitä käyttäjä kirjoittaa.
  const handleNumberChange = (event) => {
    console.log(event.target.value) // console.log(newNumber) tulostaa saman asian ja ennen kuin käyttäjä kirjoittaa mitään input:iin, niin => newNumber = ''.
    setNewNumber(event.target.value) // Kun käyttäjä kirjoittaa arvon esim. "123 456" niin funktio => setNewNumber tallentaa sen arvon, joten newNumber = 123 456.
  }

  // Alustetaan muuttuja "handePersonDelete" ja miten tämän muuttujan funktiota käytetään, niin jokaiselle puhelinluettelossa olevalla nimelle ilmestyy painike "delete" tietojen perään.
  // Tämä painike saa arvoksi sen rivin olevan taulukon id:n arvon eli jos "persons" muuttujan ensimmäinen id on "1" niin sen kyseisen rivin painike saa myös saman arvon.
  // Tämän painikkeen toiminnallisuus on toteutettu komponentin => "PersonsComponent" alla. Katso rivi 3. => import PersonsComponent from './components/Persons'.
  // Painike voi olla esim. seuraavanlainen => <button value="1">delete</button> (näin se voisi näkyä, jos tarkasteltaisiin painiketta sivun kautta!).
  const handlePersonDelete = (event) => {
    const buttonID = parseInt(event.target.value) // Alustetaan muuttuja "buttonID" ja me käytämme tässä "parseInt()" funktiota, koska haluamme päästä eroon => "..." eli funktion jälkeen "1" on 1.
    const getIndex = buttonID - 1 // Alustetaan muuttuja "getIndex" ja lasketaan sen arvo käyttämällä "buttonID" muuttujan arvoa - 1 ja saadaan vastaus.

    // Kun käyttäjä haluaa poistaa x tiedot luettelosta, niin näyttöön tulee hälytys (window.confirm), että haluaako käyttäjä varmasti poistaa kyseiset tiedot tietokannasta. Mikäli käyttäjä vahvistaa, niin se tekee alla olevat funktiot ja jos käyttäjä peruu, niin se ei tee mitään ja palaa takaisin.
    if (window.confirm(`Are you sure you want to delete ${persons[getIndex].name} from the records?`)) {
      notesService // Käytetään muuttujan "notesService" moduulin sisältöä, josta löytyy muuttuja => "const deleteValue = (id) =>".
        .deleteValue(event.target.value) // Suoritetaan deleteValue(...) funktio, joka poistaa kyseisen rivin tiedot eli funktio voi olla esim. => .deleteValue(1). Tämän takia me aikaisemmin käytettiin "parseInt()" funktiota, koska painikkeen alkuperäinen arvo eli => value="1" ei ole sama asia kuin pelkästään 1.
        .then(updatedList => { // Kun tiedot on poistettu tietokannasta, niin muutetaan "persons" muuttujan tilaa.
          setPersons(persons.filter(newlist => newlist.id !== buttonID)) // Käytetään "filter(...)" funktiota, joka luo uuden taulukon (creates a new array). Jos "persons.id" on epätosi muuttujan "buttonID" kanssa, niin se filtteröidään nykyisestä taulukosta ja siirretään uuteen taulukkoon. Jos "persons.id" täsmää muuttujan "buttonID" kanssa, niin sitä ei huomioida ollenkaan.
          setStatus(true) // Muutetaan "status" muuttujan arvoksi => "true". Tätä ei periaatteessa ei tarvitse olla tässä, koska jos henkilön poistaminen epäonnistuu, niin siinä muutetaan sama muuttuja arvoon => "false" ja sen jälkeen takaisin arvoon "true", mutta tällä varmistetaan aina se, että henkilön poistaminen renderöi oikean ilmoituksen takaisin käyttäjälle näkyviin.
          setStatusMessage(` You have deleted ${persons[getIndex].name} successfully from the phonebook! `) // Muutetaan "statusMessage" muuttujan arvo kyseiseen tekstiin. Muista, että kyseinen muuttuja on yhtä kuin {message} <=> "Notification" komponentin sisällä oleva muuttuja.
          setTimeout(() => { // Käytetään "setTimeOut()" funktiota, jotta saadaan ilmoitus poistumaan tietyn ajan päästä eli tässä tapauksessa ilmoitus poistuu näytöltä 2. sekunnin (eli 2000 ms) kuluttua.
            setStatusMessage(null) // Muutetaan "statusMessage" muuttujan arvoksi => "null". Muista, että kyseinen muuttuja on yhtä kuin {message} <=> "Notification" komponentin sisällä oleva muuttuja.
          }, 2000)
      })
      .catch(error => { // Mikäli tulee virheitä, kun yritetään poistaa henkilöä puhelinluettelosta, niin ohjelma suorittaa {...} sisällä olevat asiat ja renderöi ne takaisin käyttäjälle näkyviin.
        setStatus(false) // Muutetaan "status" muuttujan arvoksi => "false". Muista, että kyseinen muuttuja on yhtä kuin {checkStatus} <=> "Notification" komponentin sisällä oleva muuttuja.
        setStatusMessage(` Deleting ${persons[getIndex].name} from the phonebook was unsuccessful. Please try again! :) `) // Muutetaan "statusMessage" muuttujan arvo kyseiseen tekstiin. Muista, että kyseinen muuttuja on yhtä kuin {message} <=> "Notification" komponentin sisällä oleva muuttuja.
        setTimeout(() => { // Käytetään "setTimeOut()" funktiota, jotta saadaan ilmoitus poistumaan tietyn ajan päästä eli tässä tapauksessa ilmoitus poistuu näytöltä 3. sekunnin (eli 3000 ms) kuluttua.
          setStatus(true) // Muutetaan "status" muuttuja oletusarvoon eli "true". Muista, että kyseinen muuttuja on yhtä kuin {checkStatus} <=> "Notification" komponentin sisällä oleva muuttuja.
          setStatusMessage(null) // Muutetaan "statusMessage" muuttujan arvoksi => "null". Muista, että kyseinen muuttuja on yhtä kuin {message} <=> "Notification" komponentin sisällä oleva muuttuja.
        }, 3000)
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <Notification message={statusMessage} checkStatus={status} />
        <InputComponent valueProps={filterName} onChangeProps={handleFilterNameChange} placeholderProps={inputTextFilter} />
      <h2>Add new information to the phonebook!</h2>
        <FormComponent onSubmitProps={submitPerson} nameValue={newName} nameChange={handleNameChange} namePlace={inputTextName} numberValue={newNumber} numberChange={handleNumberChange} numberPlace={inputTextNumber} typeProps="submit" />
      <h2>Numbers</h2>
        <PersonsComponent personValue={persons} filterNameValue={filterName} deleteValue={handlePersonDelete} />
    </div>
  )
}

export default App
