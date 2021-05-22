// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React, { useEffect, useState } from 'react' // Sovellus ottaa käyttöön "react" kirjaston sekä mahdollistetaan "useEffect" ja "useState" funktioiden käyttö sovelluksessa.
// Alustetaan komponentti "BrowserRouter", joka nimetään uudestaan (as:in avaulla). Komponentti hyödyntää "react-router-dom" kirjastoa sovelluksen aikana.
// Otetaan myös käyttöön "useParams()" funktio sovelluksen käytettäväksi. Lisää funktiosta löytyy täältä: https://reactrouter.com/web/api/Hooks/useparams
// Otetaan myös käyttöön "useHistory()" funktio sovelluksen käytettäväksi. Lisää funktiosta löytyy täältä: https://reactrouter.com/web/api/Hooks/usehistory
import {
  BrowserRouter as Router,
  Switch, Route, Link,
  useParams, useHistory
} from "react-router-dom"

import Notification from './components/Notification' // Sovellus hyödyntää "Notification" (Notification.js) nimistä komponenttia, joka sijaitsee => "./components/Notification".
import { useCreateValue } from './hooks' // Sovellus hyödyntää "useCreateValue(...)" funktiota, joka sijaitsee => "./hooks" tiedostossa.

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
// saa käyttöönsä parametrinä myös "anecdotes" muuttujan arvon. Kun käyttäjä
// klikkaa tiettyä arvoa, niin se siirtyy esim. osoitteeseen => "/anecdotes/1".
const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(results =>
        <li key={results.id}>
          <Link to={`/anecdotes/${results.id}`}>{results.content}</Link>
        </li>
      )}
    </ul>
  </div>
)

// Alustetaan komponentti "AnecdoteListByID", joka suorittaa {...} sisällä olevat
// asiat takaisin käyttäjälle, kun siihen tehdään viittaus. Komponentti
// saa käyttöönsä parametrinä myös "getCurrentAnecdote" muuttujan arvon.
const AnecdoteListByID = ({ getCurrentAnecdote }) => {
  // Alustetaan muuttuja "getCurrentID", joka suorittaa alla olevan funktion eli
  // => "useParams().id". Kun käyttääjä klikkaa esim. tietokannan ensimmäistä
  // arvoa, niin muuttuja => "getCurrentID" saa arvoksi "1".
  const getCurrentID = useParams().id
  // Alustetaan muuttuja "response", joka suorittaa kyseisen funktion. Funktion
  // tarkoituksena on etsiä tietokannasta id:n objekti, joka on yhtä kuin muuttujan
  // "getCurrentID" arvon kanssa. Kun funktio on löytänyt kyseisen arvon, niin se
  // palauttaa takaisin "response" muuttujan alle arvon, jonka sisältä löytyy
  // "content", "author", "info", "votes" ja "id" objektien data.
  const response = getCurrentAnecdote.find(results => results.id === getCurrentID)

  // Komponentti renderöi (...) sisällä olevat asiat, kun kyseiseen komponenttiin tehdään viittaus.
  return (
    <div>
      <div>
        <h2>{response.content}</h2>
      </div>
      <div>
        <p>Current anecdotes has total of {response.votes} different votes!</p>
        <p>For more information regarding current anecdote, please check following link: <a href={response.info}>{response.info}</a></p>
      </div>
    </div>
  )

}

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
  const changeWebsite = useHistory() // Alustetaan muuttuja "changeWebsite", joka suorittaa kyseisen funktion eli "useHistory()".

  const handleSubmit = (event) => { // Alustetaan muuttuja "handleSubmit", joka suorittaa {...} sisällä olevat asiat, aina kun kyseiseen funktioon tehdään viittaus.
    event.preventDefault() // The event.preventDefault() method stops the default action of an element from happening.
    // Aina kun käyttäjä haluaa lisätä uuden arvon tietokantaan, niin kyseinen funktio
    // suoritetaan. Alla oleva funktio eli "createNewValue(...)" saa funktion suorittamiseen
    // alla olevat objektit, jossa arvoksi tulee kyseinen muuttuja esim. "getNewValueContent.newValue".
    props.createNewValue({
      content: getNewValueContent.newValue,
      author: getNewValueAuthor.newValue,
      info: getNewValueInfo.newValue,
      votes: 0
    })
    // Kun käyttäjä on luonut uuden arvon tietokantaan (onSubmit), niin sovellus siirtyy
    // osoitteeseen => http://localhost:3000/ (eli etusivulle), mikä aiheuttaa sen, että
    // komponentti "AnecdoteList" renderöidään takaisin näkyviin käyttäjälle.
    changeWebsite.push('/')
  }

  const getNewValueContent = useCreateValue('text') // Alustetaan muuttuja "getNewValueContent", joka suorittaa kyseisen funktion. Funktion parametri eli "newValueType" on yhtä kuin => "text".
  const getNewValueAuthor = useCreateValue('text') // Alustetaan muuttuja "getNewValueAuthor", joka suorittaa kyseisen funktion. Funktion parametri eli "newValueType" on yhtä kuin => "text".
  const getNewValueInfo = useCreateValue('text') // Alustetaan muuttuja "getNewValueInfo", joka suorittaa kyseisen funktion. Funktion parametri eli "newValueType" on yhtä kuin => "text".

  // Komponentti renderöi (...) sisällä olevat asiat, kun kyseiseen komponenttiin tehdään viittaus.
  return (
    <div>
      <h2>Create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Content:
          <input type={getNewValueContent.newValueType} value={getNewValueContent.newValue} onChange={getNewValueContent.handleChange} />
        </div>
        <div>
          Author:
          <input type={getNewValueAuthor.newValueType} value={getNewValueAuthor.newValue} onChange={getNewValueAuthor.handleChange} />
        </div>
        <div>
          Website for more info:
          <input type={getNewValueInfo.newValueType} value={getNewValueInfo.newValue} onChange={getNewValueInfo.handleChange} />
        </div>
        <button>Create</button>
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


  const [notificationMessage, setNotificationMessage] = useState(null) // Alustetaan muuttuja "notificationMessage" tilaan, joka saa oletuksena arvon => null. Muuttujan tilaa muutetaan "setNotificationMessage" funktion avulla.
  const [notificationStatus, setNotificationStatus] = useState(null) // Alustetaan muuttuja "notificationStatus" tillaan, joka saa oletuksena arvon => null. Muuttujan tilaa muutetaan "setNotificationStatus" funktion avulla.

  const createNewValue = (getNewValueData) => { // Alustetaan muuttuja "createNewValue", joka suorittaa {...} sisällä olevat asiat, aina kun kyseiseen funktioon tehdään viittaus.
    getNewValueData.id = (Math.random() * 10000).toFixed(0) // Aina kun lisätään uusi arvo tietokantaaan, niin generoidaan "random" id:n arvo => "getNewValueData.id" muuttujan arvolle.
    setAnecdotes(anecdotes.concat(getNewValueData)) // Muutetaan "anecdotes" tilaa lisäämällä "anecdotes" muuttujaan => "getNewValueData" data.
    setNotificationStatus(true) // Muutetaan "notificationStatus" tilaa vaihtamalla arvoon => "true".
    setNotificationMessage(`You have added anecdote called ${getNewValueData.content} successfully!`) // Muutetaan "notificationMessage" tilaa vaihtamalla kyseiseen tekstiin.
    setTimeout(() => { // Alustetaan ajastin, joka suorittaa {...} sisällä olevat asiat 10 sek. kuluttua siitä ajasta, kun käyttäjä on luonut uuden arvon tietokantaan.
      setNotificationStatus(null) // Muutetaan siis "notificationStatus" muuttujan tilaa alkuperäiseen arvoon eli => "null".
      setNotificationMessage(null) // Muutetaan siis "notificationMessage" muuttujan tilaa alkuperäiseen arvoon eli => "null".
    }, 10000)
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
  // Ota myös huomioon, että kaikki mitkä ovat "Router" komponentin ulkopuolella, niin näkyvät aina käyttäjälle
  // eli niitä ei renderöidä ikinä pois näkyvistä. Sovellus renderöi komponentti "Notification" sisällön
  // näkyviin tietyksi ajaksi silloin, kun käyttäjä on luonut uuden arvon tietokantaan talteen.
  return (
    <div>
      <h1>Software anecdotes</h1>

      <Router>
        <MenuList />
        <Notification message={notificationMessage} checkStatus={notificationStatus} />
        <Switch>
          <Route path='/anecdotes/:id'>
            <AnecdoteListByID getCurrentAnecdote={anecdotes} />
          </Route>
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
