// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please send me email at me@aarnipavlidi.fi!


import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => { // Alustetaan "Header" komponentti, joka hyödyntää "props" ominaisuutta.
  return ( // Kun komponettia hyödynnetään, niin se palauttaa alla olevan tekstin takaisin käyttäjälle ja korvaa "coursename" annetulla muuttujan arvolla.
    <div>
      <h1>Welcome to study the {props.coursename} course! :)</h1>
    </div>
  )
}

const Content = (props) => { // Alustetaan "Content" komponentti, joka hyödyntää "props" ominaisuutta.
  return ( // Kun komponenttia hyödynnetään, niin se palauttaa alla olevan tekstin takaisin käyttäjälle ja korvaa "section" annetulla muuttujan arvolla.
    <div>
      <p>We have the following sections available to choose from: {props.section}</p>
    </div>
  )
}

const Total = (props) => { // Alustetaan "Total" komponentti, joka hyödyntää "props" ominaisuutta.
  return ( // Kun komponettia hyödynnetään, niin se palauttaa alla olevan tekstin takaisin käyttäjälle ja korvaa "tasks" annetulla muuttujan arvolla.
    <div>
      <p>There are total of {props.tasks} different exercises on the course!</p>
    </div>
  )
}

const App = () => {
  const course = { // Alustetaan muuttuja nimeltään "course" ja annetaan sille alla olevat arvot.
    name: 'Half Stack application development', // Tämän rakenne on -> course.name
    parts: [ // Tämän rakenne on -> course.parts
      {
        name: 'Fundamentals of React', // Tämän rakenne on -> course.parts[0].name
        exercises: 10 // Tämän rakenne on -> course.parts[0].exercises
      },
      {
        name: 'Using props to pass data', // Tämän rakanne on -> course.parts[1].name
        exercises: 7 // Tämän rakanne on -> course.parts[1].exercises
      },
      {
        name: 'State of a component', // Tämän rakanne on -> course.parts[2].name
        exercises: 14 // Tämän rakanne on -> course.parts[2].exercises
      }
    ]
  }

  // Luodaan muuttuja nimeltään "listParts", joka käyttää "map" funktiota. Ideana on käydä kaikki arvot läpi (yllä olevan "course" muuttujan arvot) ja järjestää ne järkevään muotoon käyttäjälle.
  // Koska "parts" sisällä on enemmän dataa saatavilla, niin käytämme tässä tapauksessa "course.parts.map" ja se käy kaikki arvot läpi (value.name + value.exercises) ja laittaa ne järjestykseen.
  const listParts = course.parts.map(value => (
    <li>{value.name} and it has total of {value.exercises}</li>
  ))

  // Luodaan muuttuja nimeltään "totalParts", joka laskee kaikki tehtävät yhteen ja näyttää lopullisen summan käyttäjälle.
  const totalParts = course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises

    // Tämän alla tapahtuu tekstin palautus (return) käyttäjälle näkyviin.
    return (
      <div>
        <Header coursename={course.name} />
        <Content section=<ul>{listParts}</ul> />
        <Total tasks={totalParts} />
      </div>
    )
  }

ReactDOM.render(<App />, document.getElementById('root'))
