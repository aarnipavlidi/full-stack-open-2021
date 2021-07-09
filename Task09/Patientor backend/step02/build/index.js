"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express")); // Tuodaan "express" funktio sovelluksen käytettäväksi "express" nimisestä kirjastosta.
var app = express_1.default(); // Alustetaan muuttuja "app", joka suorittaa kyseisen funktion.
// Sovellus suorittaa kyseisen funktion, jotta voimme käsitellä esim. "POST" tyyppisiä
// pyyntöjä ja sitä kautta käsitellä pyynnön kautta tulevaa dataa eli "request.body".
app.use(express_1.default.json()); // Lisää funktiosta löytyy: https://expressjs.com/en/5x/api.html#express.json
// Kun suoritetaan pyyntö osoitteeseen => "http://localhost:3003/ping",
// niin sovellus suorittaa {...} sisällä olevat asiat ja palauttaa
// käyttäjälle "Hello Full Stack!" tekstin näkyviin. Olemme myös
// muuttaneet parametrin "req" => "_req", koska emme toistaiseksi käytä
// kyseistä paramatria, koska muuten tulisi erroria!
app.get('/ping', function (_req, response) {
    console.log('Someone just pinged to this url!');
    response.send('Hello Full Stack!'); // Lähettää kyseisen tekstin takaisin käyttäjälle näkyviin.
});
var PORT = 3003; // Alustetaan muuttuja "PORT", joka on yhtä kuin kyseinen arvo.
// Luodaan serveri portille "3003" ja tulostetaan {...} sisällä oleva teksti terminaaliin näkyviin.
app.listen(PORT, function () {
    console.log("Server running on port: " + PORT);
});
