// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React, { useEffect, useState } from 'react' // Sovellus ottaa käyttöön "react" kirjaston sekä mahdollistetaan "useEffect" ja "useState" funktioiden käyttö sovelluksessa.
// Alustetaan komponentti "BrowserRouter", joka nimetään uudestaan (as:in avaulla). Komponentti hyödyntää "react-router-dom" kirjastoa sovelluksen aikana.
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom"

const MenuList = () => { // Alustetaan komponentti "MenuList", joka suorittaa {...} sisällä olevat asiat.
  const styleCSS = { // Alustetaan muuttuja "styleCSS", joka saa {...} sisällä olevan objektin arvon.
    paddingRight: 5
  }
  // Komponentti renderöi (...) sisällä olevat asiat, kun kyseiseen komponenttiin tehdään viittaus.
  // Ota myös huomioon, että aina kun käyttäjä klikkaa sovelluksessa tiettyä
  // linkkiä => esim. "About", niin osoitekentälle tulee => "to" arvo eli
  // tässä tapauksessa => http://localhost:3000/about
  return (
    <div>
      <Link style={styleCSS} to='/'>Anecdotes</Link>
      <Link style={styleCSS} to='/create'>Create new value</Link>
      <Link style={styleCSS} to='/about'>About</Link>
    </div>
  )
}

// Alustetaan komponentti "AnecdoteList", joka renderöi (...) sisällä olevat
// asiat takaisin käyttäjälle, kun siihen tehdään viittaus. Komponentti
// saa käyttöönsä parametrinä myös "anecdotes" muuttujan arvon.
const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => <li key={anecdote.id} >{anecdote.content}</li>)}
    </ul>
  </div>
)

// Alustetaan komponentti "About", joka renderöi (...) sisällä olevat
// asiat takaisin käyttäjälle, kun siihen tehdään viittaus.
const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

// Alustetaan komponentti "About", joka renderöi (...) sisällä olevat
// asiat takaisin käyttäjälle, kun siihen tehdään viittaus.
const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => { // Alustetaan komponentti "CreateNew", joka suorittaa {...} sisällä olevat asiat.
  const [content, setContent] = useState('') // Alustetaan muuttuja "content" tilaan, joka saa oletuksena arvon => ''. Muuttujan tilaa muutetaan "setContent" funktion avulla.
  const [author, setAuthor] = useState('') // Alustetaan muuttuja "author" tilaan, joka saa oletuksena arvon => ''. Muuttujan tilaa muutetaan "setAuthor" funktion avulla.
  const [info, setInfo] = useState('') // Alustetaan muuttuja "info" tilaan, joka saa oletuksena arvon => ''. Muuttujan tilaa muutetaan "setInfo" funktion avulla.


  const handleSubmit = (event) => { // Alustetaan muuttuja "handleSubmit", joka suorittaa {...} sisällä olevat asiat, aina kun kyseiseen funktioon tehdään viittaus.
    event.preventDefault() // The event.preventDefault() method stops the default action of an element from happening.
    // Aina kun käyttäjä haluaa lisätä uuden arvon tietokantaan, niin kyseinen funktio
    // suoritetaan. Alla oleva funktio eli "createNewValue(...)" saa funktion suorittamiseen
    // muuttujien => "content", "author" ja "info" arvot käyttöönsä.
    props.createNewValue({
      content,
      author,
      info,
      votes: 0
    })
  }

  // Komponentti renderöi (...) sisällä olevat asiat, kun kyseiseen komponenttiin tehdään viittaus.
  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' value={content} onChange={(event) => setContent(event.target.value)} />
        </div>
        <div>
          author
          <input name='author' value={author} onChange={(event) => setAuthor(event.target.value)} />
        </div>
        <div>
          url for more info
          <input name='info' value={info} onChange={(event)=> setInfo(event.target.value)} />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

const App = () => { // Alustetaan komponentti "App", joka suorittaa {...} sisällä olevat asiat.
  const [anecdotes, setAnecdotes] = useState([ // Alustetaan muuttuja "anecdotes" tilaan, joka saa oletuksena alla olevan taulukon arvot. Muuttujan tilaa muutetaan "setAnecdotes" funktion avulla.
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState('') // Alustetaan muuttuja "notification" tilaan, joka saa oletuksena arvon => ''. Muuttujan tilaa muutetaan "setNotification" funktion avulla.

  const createNewValue = (getNewValueData) => { // Alustetaan muuttuja "createNewValue", joka suorittaa {...} sisällä olevat asiat, aina kun kyseiseen funktioon tehdään viittaus.
    getNewValueData.id = (Math.random() * 10000).toFixed(0) // Aina kun lisätään uusi arvo tietokantaaan, niin generoidaan "random" id:n arvo => "getNewValueData.id" muuttujan arvolle.
    setAnecdotes(anecdotes.concat(getNewValueData)) // Muutetaan "anecdotes" tilaa lisäämällä "anecdotes" muuttujaan => "getNewValueData" data.
  }

  // Alustetaan muuttuja "anecdoteById", joka suorittaa alla olevan funktion, aina kun kyseiseen muuttujaan tehdään viittaus.
  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  // Alustetaan muuttuja "vote", joka suorittaa {...} sisällä olevat asiat, aina kun kyseiseen muuttujaan tehdään viittaus.
  const vote = (id) => {
    const anecdote = anecdoteById(id) // Alustetaan muuttuja "anecdote", joka on yhtä kuin kyseinen funktio + parametrin "id" arvo.

    // Alustetaan muuttuja "voted", joka suorittaa {...} sisällä olevat asiat, aina kun kyseiseen muuttujaan tehdään viittaus.
    // Aina kun kyseinen funktio suoritetaan, niin sen hetkinen arvo (id:n mukaan)
    // muokataan niin, että => "votes" objektin arvoon lisätään + 1.
    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    setAnecdotes(anecdotes.map(results => results.id === id ? voted : results)) // Muutetaan "anecdotes" tilataa suorittamalla kyseinen funktio.
  }

  // Komponentti eli (App) renderöi (...) sisällä olevat asiat, kun kyseiseen komponenttiin tehdään viittaus.
  // Ota myös huomioon, että kaikki mitkä ovat "Router" komponentin ulkopuolella,
  // niin näkyvät aina käyttäjälle eli niitä ei renderöidä ikinä pois näkyvistä.
  return (
    <div>
      <h1>Software anecdotes</h1>

      <Router>
        <MenuList />
        <Switch>
          <Route path='/create'>
            <CreateNew createNewValue={createNewValue} />
          </Route>
          <Route path='/about'>
            <About />
          </Route>
          <Route path='/'>
            <AnecdoteList anecdotes={anecdotes} />
          </Route>
        </Switch>
      </Router>

      <Footer />
    </div>
  )
}

// Viedään (export) alla oleva komponentti (App) sovelluksen käytettäväksi, jotta esim. "index.js" tiedosto pystyy suorittamaan kyseiset funktiot.
export default App
