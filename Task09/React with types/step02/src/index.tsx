// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react'; // Otetaan käyttöön "react" niminen kirjasto sovelluksen käytettäväksi.
import ReactDOM from "react-dom"; // Otetaan käyttöön "reac-dom" niminen kirjasto sovelluksen käytettäväksi.
import App from "./App"; // Otetaan käyttöön "App.js" niminen tiedosto sovelluksen käytettäväksi.

ReactDOM.render(<App />, document.getElementById("root")); // Renderöidään "App" komponentti => "root" nimiseen elementtiin, joka löytyy => "../public/index.html" tiedostosta.
