import express from 'express'; // Tuodaan "express" funktio sovelluksen käytettäväksi "express" nimisestä kirjastosta.
const app = express(); // Alustetaan muuttuja "app", joka suorittaa kyseisen funktion.

// Tehtävää "9.7 WebExercises" varten pitää ottaa kyseinen funktio käyttöön,
// jotta voimme käsitellä pyynnön kautta tulevaa dataa eli "request.body", minkä me teemme
// "Postmanin" kautta. Tehtävässä pitää siis suorittaa "HTTP POST" pyyntä kun suoritetaan
// tehtävään suunnattua funktiota eli => "calculateExercises(...)".
app.use(express.json()); // Lisää funktiosta löytyy: https://expressjs.com/en/5x/api.html#express.json

import { calculateBmi } from './bmiCalculator'; // Otetaan käyttöön "calculateBmi" funktio => "bmiCalculator.ts" tiedostosta.
import { calculateExercises } from './exerciseCalculator'; // Otetaan käyttöön "calculateExercises" funktio => "exerciseCalculator.ts" tiedostosta.

// Kun suoritetaan pyyntö osoitteeseen => "http://localhost:3003/hello",
// niin sovellus suorittaa {...} sisällä olevat asiat ja palauttaa
// käyttäjälle "Hello Full Stack!" tekstin näkyviin. Olemme myös
// muuttaneet parametrin "req" => "_req", koska emme toistaiseksi käytä
// kyseistä paramatria, koska muuten tulisi erroria!
app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!'); // Lähettää kyseisen tekstin takaisin käyttäjälle näkyviin.
});

// Kun suoritetaan pyyntö osoitteeseen => esim. "http://localhost:3003/bmi?height=180&weight=72",
// niin sovellus suorittaa {...} sisällä olevat asiat ja palauttaa käyttäjälle takaisin datan
// "json":in muodossa, josta löytyy molemmat objetit querystä eli "height" sekä "weight" ja
// "bmi" objekti, jonka arvo tulee => "calculateBmi(...)" funktion suorittamisesta.
app.get('/bmi', (request, response) => {

  // Alustetaan muuttuja "getHeightValue" sekä "getWeightValue", joka suorittaa kyseisen
  // funktion. Me tiedämme, että kun käyttäjä suorittaa pyynnön niin arvo on teksti (string)
  // muodossa, niin meidän täytyy muuttaa se ensin muotoon "number", jotta me voidaan
  // suorittaa "calculateBmi(...)" funktio onnistuneesti. Funktio siis odottaa, kahta (2)
  // erilaista parametrin arvoa, joiden molempien täytyy olla "number" tyypin muodossa!
  const getHeightValue = Number(request.query.height);
  const getWeightValue = Number(request.query.weight);

  // Alustetaan muuttuja "result", joka suorittaa kyseisen funktion kunnes siirtyy eteenpäin
  // sovelluksessa. Funktio palauttaa takaisin arvon "string" esim. "Normal (healthy weight)".
  const result = calculateBmi(getHeightValue, getWeightValue);

  // Alustetaan muuttuja "showResults", joka saa käyttöönsä {...} sisällä olevat objektien arvot.
  // Jos mikään alla oleva if-ehto ei toteudu, niin käyttänän pyyntöön palautetaan "showResults"
  // muuttuja, jonka objektien arvoihin sijoitetaan sen hetkiset arvot.
  const showResults = {
    weight: getWeightValue, // eli "showResults.weight" on yhtä kuin => "getWeightValue".
    height: getHeightValue, // eli "showResults.height" on yhtä kuin => "getHeightValue".
    bmi: result // eli "showResults.bmi" on yhtä kuin => "result".
  };

  // Jos alla oleva if-ehto toteutuu eli, jos jompi kumpi arvo puuttuu,
  // kun suoritetaan pyyntö, niin palautetaan takaisin {...} sisällä
  // olevat asiat takaisin käyttäjälle näkyviin.
  if (!getHeightValue || !getWeightValue) {
    return response.send({ error: 'malformatted parameters' });
  }

  // Jos alla oleva if-ehto toteutuu eli, jos jommman kumman muuttujan arvo
  // on muuta tyyppiä kuin "string", niin palautetaan takaisin {...} sisällä
  // olevat asiat takaisin käyttäjälle näkyviin.
  if (typeof(request.query.height) !== 'string' || typeof(request.query.weight) !== 'string') {
    return response.send({ error: 'malformatted parameters' });
  }

  return response.send(showResults); // Muussa tapauksessa palautetaan pyyntöön "showResults" muuttujan data.
});

// Kun suoritetaan "POST" pyyntö osoitteeseen => "http://localhost:3003/exercises", niin sovellus
// suorittaa {...} sisällä olevat asiat ja palauttaa takaisin käyttäjälle "calculateExercises(...)"
// funkton kautta tulevan datan näkyviin. Jos pyynnön aikana tulee mahdollisia virheitä, niin
// sovellus reagoi niin alla olevien if-ehtojen mukaisesti.
app.post('/exercises', (request, response) => {

  // Alustetaan muuttuja "getDailyHours", joka saa tyypiksi taulukollisen numeroita eli
  // "Array<number>" ja on yhtä kuin pyynnön kautta tulevan "daily_exercises" objektin arvo.
  const getDailyHours: Array<number> = request.body.daily_exercises;
  // Alustetaan muuttuja "getDailyTarget", joka saa tyypiksi "number" ja on yhtä kuin
  // pyynnön kautta tulevan "target" objektin arvo.
  const getDailyTarget: number = request.body.target;

  // Jos alla oleva if-ehto toteutuu, eli pyynnön kautta ei tule mitään dataa eli
  // molemmat objektit puuttuvat, niin palautetaan pyyntöön takaisin {...}
  // sisällä olevat asiat käyttäjälle näkyviin.
  if (!request.body) {
    return response.send({ error: "parameters missing" });
  }

  // Jos alla oleva if-ehto toteutuu, eli pyynnön aikana jompi kumpi objektien
  // arvoista puuttuu, niin palautetaan pyyntöön takaisin {...} sisällä olevat
  // asiat käyttäjälle näkyviin.
  if (!request.body.target || !request.body.daily_exercises) {
    return response.send({ error: "parameters missing" });
  }

  // Jos alla oleva if-ehto toteutuu, eli pyynnön aikana molemmat objektien arvot
  // löytyvät (löytyy siis dataa) sekä kyseisten objektien tyypit eivät vastaa "oikeaa"
  // eli "getDailyTarget" muuttujan tyyppi ei ole "number" eikä "getDailyHours" muuttujan
  // taulukon sisällä olevat arvot eivät ole "number" (tai jokin niistä arvoista on esim.
  // pelkästään "string"), niin palautetaan pyyntöön takaisin {...} sisällä olevat asiat.
  if (request.body.target && request.body.daily_exercises && typeof(getDailyTarget) !== 'number' || (getDailyHours.some(results => typeof(results) !== 'number') === true)) {
    return response.send({ error: "malformatted parameters" });
  } else { // Muussa tapauksessa, jos mikään ehdoista ei toteudu, niin suoritetaan {...} sisällä olevat asiat.
    // Alustetaan muuttuja "result" joka suorittaa kyseisen funktion annetuilla parametrin
    // arvoilla ja palauttaa funktion kautta tulevan datan takaisin "result" muuttujan alle.
    const result = calculateExercises(getDailyTarget, getDailyHours);
    return response.send(result); // Palautetaan pyyntöön takaisin "result" muuttujan datalla.
  }
});

const PORT = 3003; // Alustetaan muuttuja "PORT", joka on yhtä kuin kyseinen arvo.

// Luodaan serveri portille "3003" ja tulostetaan {...} sisällä oleva teksti terminaaliin näkyviin.
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
