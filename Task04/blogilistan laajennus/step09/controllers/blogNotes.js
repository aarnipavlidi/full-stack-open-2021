// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

// Alustetaan muuttuja "express", joka hyödyntää "express" kirjastoa sovelluksessa.
const blogRouter = require('express').Router() // Kyseinen muuttuja hyödyntää myös "Router()" funktiota, jonka tarkoituksena on luoda uusi reititinobjekti sovelluksen käytettäväksi. Lisää tietoa funktion käytöstä löytyy @ https://www.geeksforgeeks.org/express-js-express-router-function/
const Blog = require('../models/blogModel') // Alustetaan muuttuja "Blog", joka hyödyntää "blogModel.js" (erillinen moduuli) tiedostoa eli => "../models/blogModel.js".
const User = require('../models/user') // Alustetaan muuttuja "User", joka hyödyntää "user.js" (erillinen moduuli) tiedostoa eli => "../models/user.js".

const jwt = require('jsonwebtoken') // Alustetaan muuttuja "jwt", joka hyödyntää "jsonwebtoken" nimistä kirjastoa sovelluksen aikana.

// Kun suoritetaan pyyntö osoitteeseen "http://localhost:3000/api/blogs" ja halutaan nähdä kaikki tietokannan arvot, niin sovellus suorittaa alla olevan "get(...)" funktion, joka saa myös parametreinä "request" ja "response" muuttujat käyttöönsä.
blogRouter.get('/', async (request, response) => { // Funktion "get(...)" sisällä hyödynnetään myös "async/await" metodia!
  // Alustetaan muuttuja "getValues", joka hyödyntää "await" funktiota eli muuttuja odottaa kunnes => "Blog.find({}).populate(...)" on suoritettu ja palauttaa takaisin vastauksen.
  const getValues = await Blog.find({}).populate('user', { username: 1, name: 1 }) // Siis "user" on objektin arvo, minkä sisälle tulee => "User.username" sekä "User.name" muuttujien arvon.

  // Yllä oleva funktio tarkoittaa sitä, että kun me haetaan tietokannasta kaikki nykyiset arvot "../api/blogs" osalta, niin me vielä
  // lisäämme "user" objektin sisään {...} sisällä olevat (User moduulin kautta tulevat objektit) arvot, jotka viittaavat tähän kyseisen
  // "getValues" muuttujan arvon kanssa (id:n kautta kohdistuvat oikein siis). Tämän avulla me voidaan päätellä, kun me avataan tietokannan
  // kautta tulevat arvot, niin jokaisen arvon (array) osalta me nähdään "user" objektin sisältä, että mikä käyttäjätunnus on luonut tämän
  // kyseisen arvon. Tätä oli aika vaikea hahmottaa, niin tähän kannattaa panostaa aika paljon aikaa, että ymmärtää kunnolla! :)

  response.json(getValues.map(showResults => showResults.toJSON())) // Palautetaan "getValues" muuttujan data takaisin JSON-objektina.
})

// Kun suoritetaan pyyntö osoitteeseen "http://localhost:3000/api/blogs" ja halutaan lisätä uusi arvo tietokantaan, niin sovellus suorittaa alla olevan "post(...)" funktion, joka saa myös parametreinä "request" ja "response" muuttujat käyttöönsä.
blogRouter.post('/', async (request, response) => { // Funktion "post(...)" sisällä hyödynnetään myös "async/await" metodia!
  const getValues = request.body // Alustetaan muuttuja "getValues", joka on yhtä kuin kyseinen funktio. Pyynnön kautta tuleva data (request.body) tallennetaan "väliaikaisesti" muuttujan "getValues" alle.
  // Muuttujan "request.token" tarkistaminen tapahtuu => "middleware.js" tiedostossa => muuttujan "tokenExtractor" osalta.
  const decodedToken = jwt.verify(request.token, process.env.SECRET) // Alustetaan muuttuja "decodedToken", joka suorittaa kyseisen funktion. Muista, että olemme erikseen luoneet ".env" tiedostoon ympäristömuuttujan => "SECRET" ja annettu sille oma arvo.
  // Muuttujan "decodedToken" sisältä löytyy objektit => "username" ja "id", joten sen avulla palvelin pystyy päättelemään, että kuka on tehnyt kyseisen pyynnön.
  // Tämä tarkoittaa sitä, kun luodaan uusi arvo tietokantaan (uusi blogin arvo), niin siihen kyseiseen arvoon osataan kohdistaa oikea käyttäjätunnus yms. arvot.
  if (!request.token || !decodedToken.id) { // Jos kyseinen if-ehto toteutuu, niin suoritetaan {...} sisällä oleva asia. Muussa tapauksessa sovellus jatkaa eteenpäin.
  return response.status(401).json({ errorMessage: 'Your token is either missing or is invalid, please try again! :)' }) // Palautetaan pyyntöön takaisin "401 Unauthorized":in statuskoodi sekä kyseisen objektin arvo käyttäjälle.
}

// ALla oleva muuttuja, siis etsii tietokannasta => "blogilista.users" käyttäjätunnusta, jonka "id":n arvo on yhtä kuin =>" decodedToken.id":n arvo.
const getUser = await User.findById(decodedToken.id) // Alustetaan muuttuja "getUser", joka suorittaa kyseisen funktion. Sovellus jatkaa eteenpäin vasta (await:in takia) kunnes funktio palauttanut arvon takaisin muuttujan alle.

// Alustetaan muuttuja "newValue", joka luo uuden arvon tietokantaan hyödyntämällä "Blog" moduulin kautta tulevaa rakennetta ("mongoose.model('Blog', blogData)"). Muuttuja saa myös alla olevat objektit käyttöönsä.
const newValue = new Blog({
  title: getValues.title, // eli "newValue.title" on yhtä kuin => "getValues.title":n arvo.
  author: getValues.author, // eli "newValue.author" on yhtä kuin => "getValues.author":n arvo.
  url: getValues.url, // eli "newValue.url" on yhtä kuin => "getValues.url":n arvo.
  likes: getValues.likes, // eli "newValue.likes" on yhtä kuin => "getValues.likes":n arvo.
  user: getUser._id // eli "newValue.user" on yhtä kuin => "getUser._id":n arvo.
  // Siis "getUser._id" on yhtä kuin "6083f77d22506c8144bda77e" (leikisti luotu käyttäjätunnuksen id:n arvo), mikä tarkoittaa "user" objekti saa kyseisen arvon.
})

// Alustetaan muuttuja "savedValue", joka hyödyntää "await" funktiota eli muuttuja odottaa kunnes => "await newValue.save()" on suoritettu ja palauttaa takaisin vastauksen.
const savedValue = await newValue.save() // Kun "savedValue" muuttuja saa arvon käytettäväksi, niin suoritetaan alla oleva funktio.
// Kun olemme luoneet uuden arvon tietokantaan (eli => "blogilista.blogs") ja tallentaneet sen yllä olevan funktion avulla, niin me otetaan talteen sen kyseisen luodun
// uuden arvon "_id":n objektin arvon ja siirretään se "getUser.content" objektin sisälle käyttämällä "concat()" funktiota.
getUser.content = getUser.content.concat(savedValue._id)
await getUser.save() // Suoritetaan kyseinen funktio "await getUser.save()", jonka jälkeen suoritetaan alla oleva funktio.
// Tämä siis tarkoittaa sitä, että sanotaan leikisti, että meillä on tietokannassa vain yksi käyttäjätunnus (ja me tiedetään sen kyseisen käyttäjätunnuksen "id" objektin arvo),
// niin aina kun me halutaan luoda uusi "blogin" arvo tietokantaan, niin sen yhteydessä sen uuden arvon luotu "_id" objektin arvo tallennetaan samaan aikaan käyttäjätunnuksen "content"
// objekin sisälle. Kun me mennään osoitteeseen => "http://localhost:3001/api/users", niin meidän pitäisi nähdä, että tämä yksi (1) käyttäjätunnus on luonut tietyn verran "blogeja" ja
// ne näkyvät "content" objektin sisällä eriteltynä. Jos kyseinen käyttäjätunnus on luonut vaikka kaksi (2) erilaista "blogin" arvoa, niin meillä on on "content[0]" ja "content[1]".
response.json(savedValue.toJSON()) // Palautetaan "savedValue" muuttujan data takaisin JSON-objektina.
})

// Kun suoritetaan pyyntö osoitteeseen "http://localhost:3000/api/blogs/:id" ja halutaan päivittää "likes" objektin arvoa tietokantaan, niin sovellus suorittaa alla olevan "put(...)" funktion, joka saa myös parametreinä "request" ja "response" muuttujat käyttöönsä.
blogRouter.put('/:id', async (request, response) => { // Funktion "put(...)" sisällä hyödynnetään myös "async/await" metodia!
  const getValues = request.body // Alustetaan muuttuja "getValues", joka on yhtä kuin "request.body". Pyynnön kautta tuleva data (request.body) tallennetaan "väliaikaisesti" muuttujan "getValues" alle.

  const getLikes = { // Alustetaan muuttuja "getLikes", joka saa alla olevan "likes" objektin käyttöönsä.
    likes: getValues.likes // eli "getLikes.likes" on yhtä kuin "getValues.likes" muuttujan arvon.
  }

  // Funktion "findByIdAndUpdate(...)" avulla etsitään tietokannasta "id" objektin arvo, joka täsmää pyynnön kautta tulevan "id":n arvon kanssa.
  // Jos esim. Postmanin kautta halutaan päivittää tietty arvo tietokannasta niin siirrymme esim. osoitteeseen => "http://localhost:3000/api/blogs/60819a687fdec7527cbfb723",
  // joka tarkoittaa sitä, että "request.params.id" muuttuja on yhtä kuin => "60819a687fdec7527cbfb723".
  // Parametrin "{ new: true }" avulla saamme muuttuneen olion palautetuksi kutsujalle ja muuttujan "getLikes" avulla me päivitämme ainoastaan kyseisestä "id":n arvosta => "likes" objektin arvon!
  const updatedValue = await Blog.findByIdAndUpdate(request.params.id, getLikes, { new: true }) // Alustetaan muuttuja "updatedValue", joka odottaa vastausta (await) kyseisestä funktiosta, kunnes siirrytään alla olevaan kohtaan.
  response.json(updatedValue.toJSON()) // Palautetaan "updatedValue" muuttujan data takaisin JSON-objektina.
})

// Kun suoritetaan pyyntö osoitteeseen "http://localhost:3000/api/blogs/:id" ja halutaan poistaa tietty arvo (id:n mukaisesti) tietokannasta, niin sovellus suorittaa alla olevan "delete(...)" funktion, joka saa myös parametreinä "request" ja "response" muuttujat käyttöönsä.
blogRouter.delete('/:id', async (request, response) => { // Funktion "delete(...)" sisällä hyödynnetään myös "async/await" metodia!
  const getValues = await Blog.findById(request.params.id) // Alustetaan muuttuja "getValues", joka suorittaa kyseisen funktion, ja sovellus odottaa (await), kunnes funktio palauttanut arvon takaisin.
  // Muuttujan "request.token" tarkistaminen tapahtuu => "middleware.js" tiedostossa => muuttujan "tokenExtractor" osalta.
  const decodedToken = jwt.verify(request.token, process.env.SECRET) // Alustetaan muuttuja "decodedToken", joka suorittaa kyseisen funktion. Muista, että olemme erikseen luoneet ".env" tiedostoon ympäristömuuttujan => "SECRET" ja annettu sille oma arvo.

  // Muuttujan "decodedToken" sisältä löytyy objektit => "username" ja "id", joten sen avulla palvelin pystyy päättelemään, että kuka on tehnyt kyseisen pyynnön.
  // Siis kun sovellukseen tehdään pyyntö ja sen mukana tulee (esim. Postmanin kautta) "Authorization key", niin muuttujan "decodedToken" avulla tarkistetaan,
  // että kuka tämän pyynnön on tehnyt. Jos tietokannasta löytyy jo entuudestaan käyttäjätunnus joka kohdistuu tähän kyseisen pyynnön kautta tulevaan
  // "token" arvoon, niin palautetaan arvo takaisin muuttujan alle. Nyt voidaan suorittaa alla oleva if-ehto, jossa tarkistetaan että muuttujan arvo
  // "getValues.user" (missä "user" on objektin arvo), niin kyseisen "id" on yhtä kuin => "decodedToken.id":n arvo. Tämän avulla voidaan tarkistaa, että
  // pyynnön tekijä, joka haluaa poistaa arvon, niin on tämän kyseisen "getValues" arvon alkuperäinen tekijä.

  if (!request.token || !decodedToken.id) { // Jos kyseinen if-ehto toteutuu, niin suoritetaan {...} sisällä oleva asia. Muussa tapauksessa sovellus jatkaa eteenpäin.
    return response.status(401).json({ errorMessage: 'Your token is either missing or is invalid, please try again! :)' }) // Palautetaan pyyntöön takaisin "401 Unauthorized":in statuskoodi sekä kyseisen objektin arvo käyttäjälle.
  }

  if (getValues.user.toString() === decodedToken.id.toString()) { // Jos kyseinen if-ehto toteutuu, niin suoritetaan {...} sisällä olevat asiat. Muussa tapauksessa sovellus jatkaa eteenpäin.
    // Funktion "findByIdAndRemove(...)" avulla etsitään tietokannasta "id" objektin arvo, joka täsmää pyynnön kautta tulevan "id":n arvon kanssa.
    // Jos esim. Postmanin kautta halutaan poistaa tietty arvo tietokannasta niin siirrymme esim. osoitteeseen => "http://localhost:3000/api/blogs/60819a687fdec7527cbfb723",
    // joka tarkoittaa sitä, että "request.params.id" muuttuja on yhtä kuin => "60819a687fdec7527cbfb723".
    await Blog.findByIdAndRemove(request.params.id) // Suoritetaan kyseinen funktio, jonka jälkeen suoritetaan alla oleva funktio.
    response.status(204).end() // Palautetaan takaisin "204 (No Content)":in statuskoodi, jonka jälkeen suljetaan "response" muuttujan prosessi käyttämällä "end()" funktiota.
  } else { // Jos yllä olevat if-ehdot eivät toteudu, niin suoritetaan alla oleva funktio.
    return response.status(401).json({ errorMessage: 'Deleting value from the database was unsuccessful, please try again! :)' }) // Palautetaan pyyntöön takaisin "401 Unauthorized":in statuskoodi sekä kyseisen objektin arvo käyttäjälle.
  }
})

module.exports = blogRouter // Viedään kyseinen muuttuja "blogRouter" sovelluksen käytettäväksi erillisenä moduulina.
