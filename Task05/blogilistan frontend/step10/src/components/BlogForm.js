// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React, {useState} from 'react' // Sovellus ottaa "react" nimisen kirjaston käyttöönsä, joka myös hyödyntää "useState" funktiota.

// Alustetaan "BlogForm" niminen muuttuja (komponentti), joka renderöi {...} sisällä olevat, kun siihen tehdään viittaus.
// Komponentti myös hyödyntää "propsina" alla olevan muuttujan arvoa eli, kun komponenttia renderöidään sovelluksessa,
// niin "createBlogValue" on yhtä kuin => "addBlogValue" (App.js) muuttujan arvo.
const BlogForm = ({ createBlogValue }) => {

  const [newBlogTitle, setNewBlogTitle] = useState('') // Tämän muuttujan alle tulee sen hetkisen uuden blogin "Title" arvo, kun käyttäjä haluaa lisätä uuden arvon tietokantaan.
  const [newBlogAuthor, setNewBlogAuthor] = useState('') // Tämän muuttujan alle tulee sen hetkisen uuden blogin "Author" arvo, kun käyttäjä haluaa lisätä uuden arvon tietokantaan.
  const [newBlogURL, setNewBlogURL] = useState('') // Tämän muuttujan alle tulee sen hetkisen uuden blogin "URL" arvo, kun käyttäjä haluaa lisätä uuden arvon tietokantaan.

  const addBlogValue = (event) => { // Alustetaan muuttuja "addBlogValue", joka suorittaa {...} sisällä olevat asiat.
    event.preventDefault() // The event.preventDefault() method stops the default action of an element from happening.
    // Kun käyttäjä lisää uuden blogin arvon tietokantaan (button => submit), niin sovellus suorittaa "addBlogValue"
    // funktion ja samalla suorittaa "createBlogValue()" funktion eli => "addBlogValue()" (App.js) funktion.
    createBlogValue({
      title: newBlogTitle, // eli "createBlogValue.title" on yhtä kuin "newBlogTitle" muuttujan arvo.
      author: newBlogAuthor, // eli "createBlogValue.author" on yhtä kuin "newBlogAuthor" muuttujan arvo.
      url: newBlogURL // eli "createBlogValue.url" on yhtä kuin "newBlogURL" muuttujan arvo.
    })
    setNewBlogTitle('') // Muuttujan "newBlogTitle" tilaa muutetaan tyhjentämällä sen hetkinen arvo kyseiseen arvoon.
    setNewBlogAuthor('') // Muuttujan "newBlogAuthor" tilaa muutetaan tyhjentämällä sen hetkinen arvo kyseiseen arvoon.
    setNewBlogURL('') // Muuttujan "newBlogURL" tilaa muutetaan tyhjentämällä sen hetkinen arvo kyseiseen arvoon.
  }

  // Komponentti "BlogForm" renderöi (...) sisällä olevat asiat takaisin sovelluksessa.
  return (
    <div>
      <h1>Crete a new blog: </h1>
      <form onSubmit={addBlogValue}>
        <div>
          Title
            <input
            type="text"
            value={newBlogTitle} // Kun käyttäjä lisää uuden blogin tietokantaan, niin tämän input:in arvoa käytetään, kun sovellus suorittaa "addBlogValue" funktion.
            placeholder="Add new blog title here..."
            onChange={({ target }) => setNewBlogTitle(target.value)} // Aina kun kyseisen inputin kohdalla tapahtuu muutosta (eli käyttäjä kirjoittaa tai poistaa jotain), niin sovellus suorittaa => "{({ target }) => setNewBlogTitle(target.value)}".
            />
        </div>
        <div>
          Author:
            <input
            type="text"
            value={newBlogAuthor} // Kun käyttäjä lisää uuden blogin tietokantaan, niin tämän input:in arvoa käytetään, kun sovellus suorittaa "addBlogValue" funktion.
            placeholder="Add new blog author here..."
            onChange={({ target }) => setNewBlogAuthor(target.value)} // Aina kun kyseisen inputin kohdalla tapahtuu muutosta (eli käyttäjä kirjoittaa tai poistaa jotain), niin sovellus suorittaa => "{({ target }) => setNewBlogAuthor(target.value)}".
            />
        </div>
        <div>
          URL:
            <input
            type="text"
            value={newBlogURL} // Kun käyttäjä lisää uuden blogin tietokantaan, niin tämän input:in arvoa käytetään, kun sovellus suorittaa "addBlogValue" funktion.
            placeholder="Add new blog url here..."
            onChange={({ target }) => setNewBlogURL(target.value)} // Aina kun kyseisen inputin kohdalla tapahtuu muutosta (eli käyttäjä kirjoittaa tai poistaa jotain), niin sovellus suorittaa => "{({ target }) => setNewBlogURL(target.value)}" funktion.
            />
        </div>
        <button type="submit">Add new blog</button>
      </form>
    </div>
  )
}

// Viedään (export) alla oleva komponentti (BlogForm) sovelluksen käytettäväksi, jotta esim. "App.js" tiedosto pystyy suorittamaan kyseiset funktiot.
export default BlogForm
