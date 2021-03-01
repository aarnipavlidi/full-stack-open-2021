// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please send me email at me@aarnipavlidi.fi!

import React from 'react' // Moduulin "import"
import ReactDOM from 'react-dom' // Moduulin "import"
import Course from './components/Course' // Moduulin "import" kyseisestä kansiosta ja "Course" on .js muodossa


const App = () => { // Komponentin "App" aloitus.
  const courses = [ // Alustetaan muuttuja "courses" ja annetaan sille omat arvot. Muuttujassa on kaksi erilaista arvoa [0, 1], jonka sisällä on enemmän arvoja. Se pitää ottaa huomioon, kun halutaan taulukkoa käsitellä oikein.
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]


  return ( // Renderöi alla olevat asiat takaisin käyttäjälle näkyviin.
    <div> // Alustetaan Course komponentti, joka on viitattu muuttujaan => courses.
      <Course course={courses} />
    </div>
  )
} // Komponentin "App" lopetus.

ReactDOM.render(<App />, document.getElementById('root'))
