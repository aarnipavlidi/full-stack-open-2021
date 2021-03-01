import React from 'react'

const Persons = ({ personsProps }) => {
  return (
    <li>Name: {personsProps.name}, {personsProps.phonenumber} (phone number)</li>
  )
}

export default Persons
