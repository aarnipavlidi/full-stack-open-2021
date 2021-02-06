import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const giveGood = () => setGood(good + 1)
  const giveNeutral = () => setNeutral(neutral + 1)
  const giveBad = () => setBad(bad + 1)


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
          <p>Good feedback has been given for total of {good} times!</p>
          <p>Neutral feedback has been given for total of {neutral} times!</p>
          <p>Bad feedback has been given for total of {bad} times!</p>
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
