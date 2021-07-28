// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react'; // Otetaan käyttöön "react" niminen kirjasto sovelluksen käytettäväksi.
import Main from './src/components/Main'; // Tuodaan "Main" (Main.jsx) niminen komponentti sovelluksen käytettäväksi.

// Alustetaan "App" niminen komponetti, joka suorittaa {...} sisällä olevat asiat aina,
// kun kyseiseen komponenttiin tehdään viittaus.
const App = () => {
  return <Main />;
};

// Viedään (export) alla oleva komponentti (App) sovelluksen käytettäväksi, jotta esim. "App.js" tiedosto pystyy suorittamaan kyseiset funktiot.
export default App;
