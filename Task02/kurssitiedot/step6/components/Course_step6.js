import React from 'react'

const Course = (props) => {
  return (
    <div>
      <h1>Welcome to study {props.course.name} course 2021</h1>
      <div>
        <ul>
          {props.course.parts.map(kurssi =>
            <li key={kurssi.id}>
              {kurssi.name}: {kurssi.exercises}
            </li>
            )}
        </ul>
      </div>
    </div>
  )
}

export default Course
