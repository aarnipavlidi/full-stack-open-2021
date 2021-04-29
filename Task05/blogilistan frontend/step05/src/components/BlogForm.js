// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react' // Sovellus ottaa "react" nimisen kirjaston käyttöönsä.

// Alustetaan "BlogForm" niminen muuttuja (komponentti), joka renderöi (...) sisällä olevat, kun siihen tehdään viittaus.
// Komponetti myös hyödyntää "propsina" alla olevien muuttujien arvoja eli, kun komponenttia renderöidään sovelluksessa,
// niin esim. "handleSubmit" on yhtä kuin => "addBlogValue" muuttujan arvo.
const BlogForm = ({
  handleSubmit,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  blogTitle,
  blogAuthor,
  blogURL,
  handleUserLogout
}) => {
  return (
    <div>
      <h1>Crete a new blog: </h1>
      <form onSubmit={handleSubmit}>
        <div>
          Title
            <input
            type="text"
            value={blogTitle} // Kun käyttäjä lisää uuden blogin tietokantaan, niin tämän input:in arvoa käytetään, kun sovellus suorittaa "addBlogValue" funktion. Muista, että kyseinen muuttuja on "props" eli => "blogTitle" on yhtä kuin "newBlogTitle".
            placeholder="Add new blog title here..."
            onChange={handleTitleChange} // Aina kun kyseisen inputin kohdalla tapahtuu muutosta (eli käyttäjä kirjoittaa tai poistaa jotain), niin funktio "handleTitleChange" suoritetaan eli sovellus suorittaa => "{({ target }) => setNewBlogTitle(target.value)}"
            />
        </div>
        <div>
          Author:
            <input
            type="text"
            value={blogAuthor} // Kun käyttäjä lisää uuden blogin tietokantaan, niin tämän input:in arvoa käytetään, kun sovellus suorittaa "addBlogValue" funktion. Muista, että kyseinen muuttuja on "props" eli => "blogAuthor" on yhtä kuin "newBlogAuthor".
            placeholder="Add new blog author here..."
            onChange={handleAuthorChange} // Aina kun kyseisen inputin kohdalla tapahtuu muutosta (eli käyttäjä kirjoittaa tai poistaa jotain), niin funktio "handleAuthorChange" suoritetaan eli sovellus suorittaa => "{({ target }) => setNewBlogAuthor(target.value)}"
            />
        </div>
        <div>
          URL:
            <input
            type="text"
            value={blogURL} // Kun käyttäjä lisää uuden blogin tietokantaan, niin tämän input:in arvoa käytetään, kun sovellus suorittaa "addBlogValue" funktion. Muista, että kyseinen muuttuja on "props" eli => "blogURL" on yhtä kuin "newBlogURL".
            placeholder="Add new blog url here..."
            onChange={handleUrlChange} // Aina kun kyseisen inputin kohdalla tapahtuu muutosta (eli käyttäjä kirjoittaa tai poistaa jotain), niin funktio "handleUrlChange" suoritetaan eli sovellus suorittaa => "{({ target }) => setNewBlogURL(target.value)}"
            />
        </div>
        <button type="submit">Add new blog</button>
      </form>
    </div>
  )
}

// Viedään (export) alla oleva komponentti (BlogForm) sovelluksen käytettäväksi, jotta esim. "App.js" tiedosto pystyy suorittamaan kyseiset funktiot.
export default BlogForm
