import express from 'express'; // Tuodaan "express" funktio sovelluksen käytettäväksi "express" nimisestä kirjastosta.
const app = express(); // Alustetaan muuttuja "app", joka suorittaa kyseisen funktion.

// Kun suoritetaan pyyntö osoitteeseen => "http://localhost:3003/hello",
// niin sovellus suorittaa {...} sisällä olevat asiat ja palauttaa
// käyttäjälle "Hello Full Stack!" tekstin näkyviin. Olemme myös
// muuttaneet parametrin "req" => "_req", koska emme toistaiseksi käytä
// kyseistä paramatria, koska muuten tulisi erroria!
app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!'); // Lähettää kyseisen tekstin takaisin käyttäjälle näkyviin.
});

const PORT = 3003; // Alustetaan muuttuja "PORT", joka on yhtä kuin kyseinen arvo.

// Luodaan serveri portille "3003" ja tulostetaan {...} sisällä oleva teksti terminaaliin näkyviin.
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
