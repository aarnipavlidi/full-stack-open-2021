import React, { useState } from 'react'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phonenumber: '040 123 456'}
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const inputTextName = "Add new persons name..." // Alustetaan muuuttuja, joka sijoittuu nimen lisäämisen input:iin (FormComponent => props).
  const inputTextNumber = "Add new persons phone number..." // Alustetaan muuttuja, joka sijoittuu numeron lisäämisen input:iin (FormComponent => props).

  // Kun käyttäjä lisää uudet tiedot luetteloon, niin se tekee alla olevan funktion (submitPerson) ja tallentaa tiedot "väliaikaisesti" "nameObject" muuttujan alle.
  // Muuttujan "nameObject" taulukko voi olla seuraavanlainen esim. nameObject[0] => {name, phonenumber, date, important, id} => {"Aarni Pavlidi", 050 123 456, "2021-02-10T19:31:07.280Z", true, 3}.
  const submitPerson = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      phonenumber: newNumber,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
      id: persons.length + 1,
    }

    // Mikäli käyttäjä yrittää lisätä nimen, joka löytyy jo taulukosta entuudestaan niin se tulostaa hälytyksen käyttäjälle tiedoksi (if => alert).
    // Mikäli käyttäjä lisää nimen, jota ei löydy taulukosta entuudestaan, niin se tulostaa uudet tiedot näkyviin käyttäjälle (else => setPersons(...)).
    if(persons.some(personsSearch => personsSearch.name === newName)) {
      alert(`${newName} has been already added on the phonebook. Please add different name!`)
    } else {
      setPersons(persons.concat(nameObject)) // Muuttujasssa "persons" on jo 2 erilaista arvoa taulukossa, niin me lisäämme taulukkoon aina uuden arvon nykyisten jatkoksi, käyttämällä concat() funktiota.
      setNewName('') // Kun sivu suorittaa tämän funktion (submitPerson), niin se tyhjentää kyseisen muuttujan taulukon. Mikäli tätä ei olisi, niin se arvo minkä käyttäjä antaa input:iin jäisi ns. "roikkumaan" näkyviin.
      setNewNumber('') // Kun sivu suorittaa tämän funktion (submitPerson), niin se tyhjentää kyseisen muuttujan taulukon. Mikäli tätä ei olisi, niin se arvo minkä käyttäjä antaa input:iin jäisi ns. "roikkumaan" näkyviin.
    }
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
      <form onSubmit={submitPerson}>
        <div>
          <input
            value={newName}
            onChange={handleNameChange}
            placeholder={inputTextName}
          />
        </div>
        <div>
          <input
            value={newNumber}
            onChange={handleNumberChange}
            placeholder={inputTextNumber}
          />
        </div>
        <button type="submit">add</button>
      </form>
      <h2>Numbers</h2>
        <ul>
          {persons.map(searchPersons =>
            <Persons key={searchPersons.name} personsProps={searchPersons} />
          )}
        </ul>
    </div>
  )
}

export default App
