// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React, { useState, useEffect } from 'react' // Otetaan "React" kirjaston sisältö käyttöön, joka myös hyödyntää "useState" ja "useEffect" funktioita.
import axios from 'axios' // Otetaan "Axios" kirjaston sisältö käyttöön.
import PersonsComponent from './components/Persons' // Tuodaan "PersonsComponent" komponentti käyttöön, joka sijaitsee kyseisellä sivulla.

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

const App = () => {
  const [persons, setPersons] = useState([]) // Alustetaan muuttuja "persons" tilaan, joka saa oletuksena arvon => [] eli tyhjän taulukon ja jos haluamme muuttaa tilan arvoa, niin käytämme funktiota => "setPersons".

  useEffect(() => {
    console.log('effectin aloitus ja komento => axios.get aloittaa datan hakemisen palvelimelta.')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('data saapuu takaisin palvelimelta ja tallentaa datan muuttujan sisään.')
        setPersons(response.data)
      })
  }, []) // Käytämme funktion "useEffect" lopussa [], koska haluamme että kyseinen funktio renderöi sivulle vain kerran.
  console.log('Puhelinluettelossa on nyt:', persons.length, 'erilaista riviä!')


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

    // Mikäli käyttäjä yrittää lisätä nimen, joka löytyy jo taulukosta entuudestaan niin se tulostaa hälytyksen käyttäjälle tiedoksi (if => alert).
    // Mikäli käyttäjä lisää nimen, jota ei löydy taulukosta entuudestaan, niin se tulostaa uudet tiedot näkyviin käyttäjälle (else => setPersons(...)).
    if(persons.some(personsSearch => personsSearch.name === newName)) {
      alert(`${newName} has been already added on the phonebook. Please add different name!`)
    } else {
      axios
        .post('http://localhost:3001/Persons', nameObject) // Mikäli käyttäjän lisämää nimeä ei löydy luettelosta, niin lisätään arvot kyseisellä muuttujan arvolla (nameObject) kyseiseen sivuun, joka on .json muodossa.
        .then(response => {
          setPersons(persons.concat(response.data)) // Muuttujassa "response" löytyy data mikä on funktion .post() sisällä. Hyödynnetään sitä ja lisätään "setPersons" tilassa olevien muiden puhelintietojen joukkoon. Funktion "concat" avulla me emme muutta komponentin alkuperäistä tilaa, vaan luodaan uusi taulukko!
          setNewName('') // Kun sivu suorittaa tämän funktion (submitPerson), niin se tyhjentää kyseisen muuttujan taulukon. Mikäli tätä ei olisi, niin se arvo minkä käyttäjä antaa input:iin jäisi ns. "roikkumaan" näkyviin.
          setNewNumber('') // Kun sivu suorittaa tämän funktion (submitPerson), niin se tyhjentää kyseisen muuttujan taulukon. Mikäli tätä ei olisi, niin se arvo minkä käyttäjä antaa input:iin jäisi ns. "roikkumaan" näkyviin.
          setFilterName('') // Kun sivu suorittaa tämän funktion (submitPerson), niin se tyhjentää kyseisen muuttujan taulukon. Mikäli tätä ei olisi, niin se arvo minkä käyttäjä antaa input:iin jäisi ns. "roikkumaan" näkyviin.
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

  return (
    <div>
      <h2>Phonebook</h2>
        <InputComponent valueProps={filterName} onChangeProps={handleFilterNameChange} placeholderProps={inputTextFilter} />
      <h2>Add new information to the phonebook!</h2>
        <FormComponent onSubmitProps={submitPerson} nameValue={newName} nameChange={handleNameChange} namePlace={inputTextName} numberValue={newNumber} numberChange={handleNumberChange} numberPlace={inputTextNumber} typeProps="submit" />
      <h2>Numbers</h2>
        <PersonsComponent personValue={persons} filterNameValue={filterName} />
    </div>
  )
}

export default App
