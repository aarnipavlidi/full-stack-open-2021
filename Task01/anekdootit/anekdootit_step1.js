// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please send me email at me@aarnipavlidi.fi!

import React, { useState } from 'react' // Alustetaan kirjasto.
import ReactDOM from 'react-dom' // Alustetaan kirjasto.

const App = (props) => {
  // Pitää ottaa huomioon, että [selected] muuttuu aina jokaisen uuden renderöinnin jälkeen eli tässä tapauksessa aina kun painetaan painiketta (button), niin sivu latautuu uudestaan ja [selected] arvo muuttuu.
  // Kun sivu avataan ensimmäistä kertaa niin [selected] arvo on oletuksena aina [0] eli => selected = [0] ja se voi olla myös [1], [2], [3], [4] tai [5].
  const [selected, setSelected] = useState(0)

  const randomText = () => { // Alustetaan muuttuja, joka tekee alla olevan funktion -> "setSelected"
    setSelected(Math.floor(Math.random() * 6)) // Me tietedään, että meillä on 6 erilaista tekstiä (muuttujassa -> "anecdoates" niin tämän takia kerromme * 6. )
  }

  return (
    <div>
      <h1>{props.anecdotes[selected]}</h1> // Tulostaa tekstin muuttujasta "anecdotes" ja [selected] on oletuksena arvossa "0" eli kun sivu avataan ensimmäisen kerran, niin tulostuu => "If it hurts, do it more often" teksti näkyviin käyttäjälle.
      <button onClick={randomText}>Choose a next random text! :)</button> // Kun buttonia klikataan niin se tekee kyseisen funktion eli => "randomText"
    </div>
  )
}

// Alustetaan muuttuja "anecdotes" ja annetaan sille 6 erilaista arvoa omalle kohdalleen => [0, 1, 2, 3, 4, 5].
const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]


ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'))
