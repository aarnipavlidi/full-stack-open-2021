// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import express from 'express'; // Tuodaan "express" funktio sovelluksen käytettäväksi "express" nimisestä kirjastosta.
const app = express(); // Alustetaan muuttuja "app", joka suorittaa kyseisen funktion.

// Sovellus suorittaa kyseisen funktion, jotta voimme käsitellä esim. "POST" tyyppisiä
// pyyntöjä ja sitä kautta käsitellä pyynnön kautta tulevaa dataa eli "request.body".
app.use(express.json()); // Lisää funktiosta löytyy: https://expressjs.com/en/5x/api.html#express.json

// Kun suoritetaan pyyntö osoitteeseen => "http://localhost:3003/ping",
// niin sovellus suorittaa {...} sisällä olevat asiat ja palauttaa
// käyttäjälle "Hello Full Stack!" tekstin näkyviin. Olemme myös
// muuttaneet parametrin "req" => "_req", koska emme toistaiseksi käytä
// kyseistä paramatria, koska muuten tulisi erroria!
app.get('/api/ping', (_req, response) => {
  response.header('Access-Control-Allow-Origin', '*');
  console.log('Someone just pinged to this url!')
  return response.send({ message: "I am working! :)"}); // Lähettää kyseisen tekstin takaisin käyttäjälle näkyviin.
});

const PORT = 3003; // Alustetaan muuttuja "PORT", joka on yhtä kuin kyseinen arvo.

// Luodaan serveri portille "3003" ja tulostetaan {...} sisällä oleva teksti terminaaliin näkyviin.
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
