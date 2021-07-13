// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react'; // Otetaan käyttöön "react" niminen kirjasto sovelluksen käytettäväksi.

// Alustetaan "HeaderProps" niminen interface, joka saa käyttöönsä
// {...} sisällä olevan objektin arvon.
interface HeaderProps {
  name: string;
}

// Alustetaan "Header" niminen komponentti, joka suorittaa {...} sisällä olevat asiat
// aina kun kyseiseen komponenttiin tehdään viittaus. Komponentti saa myös käyttöönsä
// parametrin arvoksi => "props" muuttujan arvon. Komponentti siis hakee erikseen
// "App.js" tiedostosta arvon "courseName" muuttujasta ja renderöi sen takaisin
// käyttäjälle näkyviin => "props.name" muuttujan avulla.
const Header = (props: HeaderProps) => {

  return <div><h1>{props.name}</h1></div>
};

// Viedään (export) alla oleva komponentti (Header) sovelluksen käytettäväksi, jotta esim. "index.tsx" tiedosto pystyy suorittamaan kyseiset funktiot.
export default Header;
