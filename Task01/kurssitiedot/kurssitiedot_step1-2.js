// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please send me email at me@aarnipavlidi.fi!


import React from 'react'
import ReactDOM from 'react-dom'


const Header = (props) => { // Alustetaan "Header" komponentti, joka hyödyntää "props" ominaisuutta.
  return ( // Kun komponenttia hyödynnetään, niin se palauttaa alla olevan tekstin takaisin käyttäjälle.
    <div>
      <h1>Welcome to study the {props.coursename} course! :)</h1>
    </div>
  )
}

const Part = (props) => { // Alustetaan "Part" komponentti, joka hyödyntää "props" ominaisuutta.
  return ( // Kun komponenttia hyödynnetään, niin se palauttaa alla olevan tekstin takaisin käyttäjälle.
    <div>
      <p>Section name is <b>{props.taskname}</b> and it has total of <b>{props.taskamount}</b> exercises. </p>
    </div>
  )
}

const Content = () => { // Alustetaan "Content" komponentti.
  return ( 
    <div>
      <Part taskname="Fundamentals of React" taskamount="10" />
      <Part taskname="Using props to pass data" taskamount="7" />
      <Part taskname="State of a component" taskamount="14" />
    </div>
  )
}

const Total = (props) => { // Alustetaan "Total" komponentti, joka hyödyntää "props" ominaisuutta.
  return ( // Kun komponenttia hyödynnetään, niin se palauttaa alla olevan tekstin takaisin käyttäjälle.
    <div>
      <p>The course has total of <b>{props.coursetotal}</b> different exercises.</p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development' // Alustetaan muuttuja ja annetaan oma arvo sille.

  const part1 = 'Fundamentals of React' // Alustetaan muuttuja ja annetaan oma arvo sille.
  const exercises1 = 10 // Alustetaan muuttuja ja annetaan oma arvo sille.

  const part2 = 'Using props to pass data' // Alustetaan muuttuja ja annetaan oma arvo sille.
  const exercises2 = 7 // Alustetaan muuttuja ja annetaan oma arvo sille.

  const part3 = 'State of a component' // Alustetaan muuttuja ja annetaan oma arvo sille.
  const exercises3 = 14 // Alustetaan muuttuja ja annetaan oma arvo sille.

// Tämän alla käytetään komponentteja mitä me alustettiin alussa ja näiden komponenttejen muuttujat (esim. "coursename") ottaa arvot muuttujista,
// joille on asetettu arvo jo entuudestaan eli "coursename" on yhtä kuin "course" (Half Stack application development).

  return (
    <div>
      <Header coursename={course} />
      <Content />
      <Total coursetotal={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
