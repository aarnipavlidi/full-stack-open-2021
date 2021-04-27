// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react' // Sovellus ottaa "react" nimisen kirjaston käyttöönsä.

// Alustetaan "Blog" niminen muuttuja (komponentti), joka renderöi (...) sisällä olevat, kun siihen tehdään viittaus.
// Komponentti hyödyntää myös "propsina" muuttujan "value" arvoa. Kun kyseinen komponentti renderöidään sovellukseen,
// niin "propsin" arvo => "value" on yhtä kuin => "Blogs" ("results" on muuttujan arvo "map()" funktion takia).
const Blog = ({value}) => (
  <div>
    <p>Following blog is called: <b>{value.title}</b> is made by <b>{value.author}</b> and it has total of <b>{value.likes}</b> likes! :)</p>
  </div>
)

// Viedään (export) alla oleva komponentti (Blog) sovelluksen käytettäväksi, jotta esim. "App.js" tiedosto pystyy suorittamaan kyseiset funktiot.
export default Blog
