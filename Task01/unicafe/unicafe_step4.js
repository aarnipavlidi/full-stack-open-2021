import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = (props) => {
  if (props.value === 0) {
    return (
      <p>No feedback has been given yet! :)</p>
    )
  }

  return (
    <p>{props.text} {props.value}</p>
  )
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const [total, setAll] = useState(0)

  const [average, setAverage] = useState(0)
  const [averageTotal, setAverageTotal] = useState(0)

  const [percentage, setPercentage] = useState(0)

  const giveGood = () => {
    setGood(good + 1)
    setAll(total + 1)

    setAverage(average + 1)
    setAverageTotal(average / total)

    setPercentage(good / total * 100)
  }

  const giveNeutral = () => {
    setNeutral(neutral + 1)
    setAll(total + 1)

    setAverage(average + 0)
    setAverageTotal(average / total)

    setPercentage(good / total * 100)
  }

  const giveBad = () => {
    setBad(bad + 1)
    setAll(total + 1)

    setAverage(average - 1)
    setAverageTotal(average / total)

    setPercentage(good / total * 100)
  }

  return (
    <div>
      <div>
        <h1>Give feedback! :)</h1>
        <button onClick={giveGood}>good</button>
        <button onClick={giveNeutral}>neutral</button>
        <button onClick={giveBad}>bad</button>
      </div>

      <div>
        <h1>Statistics! :)</h1>
          <Statistics value={good} text="Good value:" />
          <Statistics value={neutral} text="Neutral value:" />
          <Statistics value={bad} text="Bad value:" />
          <Statistics value={total} text="Total value:" />
          <Statistics value={averageTotal} text="Average value:" />
          <Statistics value={percentage} text="Percentage value:" />
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
