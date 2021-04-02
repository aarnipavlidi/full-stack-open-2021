// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react'

// Luodaan komponentti nimeltään "PersonsComponent", joka palauttaa alla olevan arvon return() sisältä takaisin App komponenttiin.
//
// props.personValue.filter(...) on sama asia kuin => persons.filter(...) ja "persons" muuttuja on alustettu App komponentissa.
// .includes(props.filterNameValue) on sama asia kuin => .includes(filterName) ja "filterName" muuttuja on alustettu App komponentissa.
//
// Meidän ei tarvitse käyttää muita propseja tässä komponentissa, koska kaikki muut muuttujat tulee "customina" eli vaikka niitä muuttaisi, niin koodi siitä huolimatta toimisi.
// <li key={b.name}> tarkoittaa, että jokaiselle riville mikä renderöitään (tai kun käyttäjä lisää uuden tiedon puhelinluetteloon) niin sille annetaan uniikki arvo (name).

const PersonsComponent = (props) => {
  return(
    <ul>
      {props.personValue.filter(a => a.name.toLowerCase().includes(props.filterNameValue.toLowerCase())).map(b =>
        <li key={b.name}>Name: {b.name}, {b.number} (phone number)</li> // {b.name} + {b.phonenumber} = hakee arvot muuttujasta "persons" ja näyttää "name" sekä "phonenumber" arvot käyttäjälle.
      )}
    </ul>
  )
}

export default PersonsComponent
