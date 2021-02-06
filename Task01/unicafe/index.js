import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        <p>Anna palautetta ensin, niin pääset tilastojen pariin!</p>
      </div>
    )
  }

  return (
    <div>
      Kiitoksia palautteen antamisesta!
    </div>
  )
}

const Button = ({ onClick, text}) => (
  <button onClick={onClick}>{text}</button>
)

const StatisticLine = (props) => <tr><td>{props.text}</td><td>{props.value}</td></tr>

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState([])

  const [total, setTotal] = useState(0)

  const [average, setAverage] = useState(0)
  const [averageTotal, setAverageTotal] = useState(0)

  const [percentage, setPercentage] = useState(0)

  const giveGood = () => {
    setAll(allClicks.concat('Good'))
    setGood(good + 1)
    setTotal(total + 1)

    setAverage(average + 1)
    setAverageTotal(average / total)

    setPercentage(good / total * 100)
  }

  const giveNeutral = () => {
    setAll(allClicks.concat('Neutral'))
    setNeutral(neutral + 1)
    setTotal(total + 1)

    setAverage(average + 0)
    setAverageTotal(average / total)

    setPercentage(good / total * 100)
  }

  const giveBad = () => {
    setAll(allClicks.concat('Bad'))
    setBad(bad + 1)
    setTotal(total + 1)

    setAverage(average - 1)
    setAverageTotal(average / total)

    setPercentage(good / total * 100)
  }

  return (
    <div>
      <div>
        <h1>Give feedback! :)</h1>
        <Button onClick={giveGood} text="good" />
        <Button onClick={giveNeutral} text="neutral" />
        <Button onClick={giveBad} text="bad" />
      </div>

      <div>
        <h1>Statistics! :)</h1>
            <Statistics allClicks={allClicks} />
            <table>
              <tbody>
                  <StatisticLine value={good} text="Good value:" />
                  <StatisticLine value={neutral} text="Neutral value:" />
                  <StatisticLine value={bad} text="Bad value:" />
                  <StatisticLine value={total} text="Total value:" />
                  <StatisticLine value={averageTotal} text="Average value:" />
                  <StatisticLine value={percentage} text="Percentage value:" />
              </tbody>
            </table>
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
