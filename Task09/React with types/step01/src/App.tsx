// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react'; // Otetaan käyttöön "react" niminen kirjasto sovelluksen käytettäväksi.

import Header from './Components/Header'; // Alustetaan "Header" (Header.tsx) niminen komponentti sovelluksen käytettäväksi.
import Content from './Components/Content'; // Alustetaan "Content" (Content.tsx) niminen komponentti sovelluksen käytettäväksi.
import Total from './Components/Total'; // Alustetaan "Total" (Total.tsx) niminen komponentti sovelluksen käytettäväksi.

// Kun "App" komponenttiin tehdään viittaus, niin se suorittaa {...} sisällä olevat asiat
// ja renderöi takaisin => "return (...)" sisällä olevat asiat käyttäjälle näkyviin.
const App = () => {
  const courseName = "Half Stack application development"; // Alustetaan muuttuja "courseName", joka saa kyseisen tekstin arvoksi.
  const courseParts = [ // Alustetaan muuttuja "courseParts", joka saa arvoksi => [...] taulukon erilaisia arvoja.
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  // Renderöidään (...) sisällä olevat asiat takaisin käyttäjälle näkyviin.
  return (
    <div>
      <Header name={courseName} />
      <Content data={courseParts} />
      <Total data={courseParts} />
    </div>
  );
};

// Viedään (export) alla oleva komponentti (App) sovelluksen käytettäväksi, jotta esim. "index.tsx" tiedosto pystyy suorittamaan kyseiset funktiot.
export default App;
