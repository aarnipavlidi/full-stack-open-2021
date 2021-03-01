import React from 'react'

const Course = (props) => {
  return (
    <div>
      <h1>Web development curriculum</h1>
      <h2>{props.course[0].name}</h2>
        <div>
          <ul>
            {props.course[0].parts.map(kurssi =>
              <li key={kurssi.id}>
                {kurssi.name}: {kurssi.exercises}
                </li>
              )}
          </ul>
        </div>
          <div>
            <p>There is total of {props.course[0].parts.reduce((a,b) => a =  a + b.exercises , 0)} different exercises in this course!</p>
          </div>
          <div>
            <h2>{props.course[1].name}</h2>
            <div>
              <ul>
                {props.course[1].parts.map(kurssi =>
                  <li key={kurssi.id}>
                    {kurssi.name}: {kurssi.exercises}
                  </li>
                )}
              </ul>
            </div>
          </div>
            <div>
              <p>There is total of {props.course[1].parts.reduce((a,b) => a = a + b.exercises , 0)} different exercises in this course!</p>
            </div>
      </div>
  )
}

export default Course
