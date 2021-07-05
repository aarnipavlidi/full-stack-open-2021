// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

require('dotenv').config() // Sovellus ottaa käyttöön "dotenv" kirjaston, jotta voidaan tuoda erilaisia muuttujia => ".env" tiedostosta.
const { ApolloServer, UserInputError, AuthenticationError, gql } = require('apollo-server') // Alustetaan muuttujat "ApolloServer", "UserInputError", "AuthenticationError" sekä "gql", jotka hyödyntävät "apollo-server":in kirjastoa sovelluksessa.

const { PubSub } = require('apollo-server') // Alustetaan muuttujat "PubSub", jotka hyödyntävät "apollo-server":in kirjastoa sovelluksessa.
// Lisää tietoa "PubSub" funktiosta löytyy täältä: https://www.apollographql.com/docs/graphql-subscriptions/setup/#setup
const pubsub = new PubSub() // Alustetaan muuttuja "pubsub", joka suorittaa kyseisen funktion kun kyseiseen muuttujaan tehdään viittaus.

const mongoose = require('mongoose') // Alustetetaan muuttuja "mongoose", joka ottaa käyttöönsä "mongoose" nimisen kirjaston sovellusta varten.
const { v4: uuid } = require('uuid') // Alustetaan muuttuja "uuid", joka hyödyntää "uuid" nimistä kirjastoa. Tämän avulla voidaan lisätä "random" id:n arvo, kun esim. halutaan lisätä uusi arvo tietokantaan.

const jwt = require('jsonwebtoken') // Alustetaan muuttuja "jwt", joka hyödyntää "jsonwebtoken" nimistä kirjastoa. Tämän avulla me voidaan validoita "oikea" käyttäjätunnus sekä tarjota tokenin arvo.
const JWT_SECRET = process.env.SECRET_KEY // Alustetaan muuttuja "JWT_SECRET", joka on yhtä kuin kyseisen muuttujan arvo. Tätä muuttujaa tarvitaan esim. "jwt.sign(...)" funktiossa.

const Authors = require('./models/authors') // Alustetaan muuttuja "Authors", joka ottaa käyttöön "authors.js" tiedoston sisällön sovellusta varten.
const Books = require('./models/books') // Alustetaan muuttuja "Books", joka ottaa käyttöön "books.js" tiedoston sisällön sovellusta varten.
const Users = require('./models/users') // Alustetaan muuttuja "Users", joka ottaa käyttöön "users.js" tiedoston sisällön sovellusta varten.

// Alustetaan muuttuja "database", joka on yhtä kuin kyseisen muuttujan arvo eli,
// "MONGODB_URI". Muista, että olemme erikseen luoneet ".env" nimisen tiedoston
// projektin juureen, josta löytyy erikseen kyseisen muuttujan arvo.
const database = process.env.MONGODB_URI
console.log('Connecting to following server:', database) // Tulostetaan kyseinen arvo takaisin konsoliin näkyviin.

// Funktion "mongoose.connect(...)" avulla yhdistetään tietokantaan (MongoDB). Lisää tietoa funktion käytöstä löytyy @ https://mongoosejs.com/docs/connections.html
mongoose.connect(database, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => { // Kun palvelimeen on yhdistetty, niin suoritetaan {...} sisällä olevat asiat.
    console.log('Connected successfully to the MongoDB! :)') // Tulostetaan kyseinen arvo takaisin konsoliin näkyviin.
  })
  .catch((error) => { // Jos palvelimeen yhdistämisessä tulee ongelmia, niin suoritetaan "catch(...)" funktio ja sitä kautta {...} sisällä olevat asiat.
    console.log('There was a problem while trying connect to the MongoDB! Error was following:', error.message) // Tulostetaan kyseinen arvo takaisin konsoliin näkyviin.
  })

// Alustetaan muuttuja "typeDefs", joka sisältää sovelluksen käyttämän GraphQL-skeeman. Lisää tästä löytyy: https://graphql.org/learn/schema/
const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    born: Int!
    id: ID!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type AuthorNameWithBookCount {
    name: String!
    born: Int!
    bookCount: Int!
  }

  type Query {
    authorsCount: Int!
    booksCount: Int!
    allBooks(genres: String): [Book!]!
    allAuthors: [AuthorNameWithBookCount!]!
    me: User
  }

  type Mutation {
    addAuthor(
      name: String!
      born: Int!
    ): Author
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      born: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`

// Alustetaan muuttuja "resolvers", joka sisältää palvelimen "resolverit". Tämän avulla määritellään, että miten GraphQL-kyselyihin vastataan.
// Lisää tästä löytyy: https://www.apollographql.com/docs/apollo-server/data/resolvers/#resolver-map
const resolvers = {
  Query: {
    // Kun suoritetaan "me" query, niin sovellus siis palauttaa takaisin datan, joka on kirjautunut
    // "sisään sovellukseen". Ota myös huomioon, että jotta query voi näyttää dataa, niin pitää
    // erikseen laittaa "HTTP HEADERS":iin => "Authorization" objektille arvo, joka alkaa =>
    // kirjaimilla "bearer...". Muussa tapuksessa tulee dataksi "null".
    me: (root, args, context) => {
      // Palautetaan alla oleva asia takaisin käyttäjälle, ja muuttujasta
      // "currentUserLogged" löytyy siis sen hetkisen kirjautuneen käyttäjän
      // data, josta löytyy objektien => "username", "favoriteGenre" sekä
      // "id" arvot. Kun queryä suoritetaan voidaan päättää mitä dataa
      // näytetään "lopullisesti" käyttäjälle takaisin.
      return context.currentUserLogged
    },

    // Kun suoritetaan "authorsCount" query niin sovellus laskee, että kuinka monta arvoa on yhteensä "authors" kokoelmassa ja palauttaa yhteenlasketun arvon takaisin käyttäjälle.
    authorsCount: () => Authors.collection.countDocuments(), // Lisää funktiosta: https://docs.mongodb.com/manual/reference/method/db.collection.countDocuments/
    // Kun suoritetaan "booksCount" query niin sovellus laskee, että kuinka monta arvoa on yhteensä "books" kokoelmassa ja palauttaa yhteenlasketun arvon takaisin käyttäjälle.
    booksCount: () => Books.collection.countDocuments(), // Lisää funktiosta: https://docs.mongodb.com/manual/reference/method/db.collection.countDocuments/

    // Kun suoritetaan "allBooks" query, niin sovellus etsii "books" kokoelmasta jokaisen arvon
    // ja palauttaa takaisin käyttäjälle näkyviin. Ota myös huomioon, että jokaisella arvolta
    // löytyy "authors" niminen objekti, joka on "linkitetty" toisen eli "authors" kokoelman
    // kanssa yhteen. Tämän vuoksi, käytämme "populate(...)" funktiota, jotta kaikki data näkyy.
    allBooks: (root, args) => {
      // Jos alla oleva if-ehto toteutuu, eli jos "args.genres" on yhtä kuin
      // "undefined" muuttujan arvo, niin suoritetaan {...} sisällä olevat asiat.
      // Käyttäjälle on siis mahdollisuus suorittaa "allBooks" query ilman parametrin
      // arvoa sekä parametrin kanssa. Olemme ottaneet sen huomioon tässä! :)
      if (args.genres === undefined) {
        return Books.find().populate('author').exec()
      } else { // Jos yllä oleva ehto ei toteudu, niin suoritetaan siinä tapauksessa {...} sisällä olevat asiat.
        return Books.find({ genres: args.genres }).populate('author').exec()
      }
    },

    // Kun suoritetaan "allAuthors" query, niin sovellus etsii "authors" kokoelmasta jokaisen arvon
    // ja palauttaa takaisin käyttäjälle näkyviin. Vastauksen kyseiseen queryyn olen saanut:
    // https://stackoverflow.com/questions/52505585/count-id-occurrences-in-other-collection
    allAuthors: (root, args) => {
      // Query siis suorittaa => "Authors.aggregate([...])" funktion ja palauttaa sitä kautta tulevan datan takaisin käyttäjlle.
      return Authors.aggregate([
        {
          $lookup: {
            from: "books", // Verrataan siis "authors" kokoelman dataa => "books" kokoelman dataan.
            // Luodaan muuttuja nimeltään "authorValueID", joka on yhtä kuin "_id" objektin arvo
            // "authors" kokoelmassa eli, jokainen "uniikki" kirjailijan oma id:n arvo siirretään
            // kyseisen muuttujan alle, jota hyödynnetään myöhemmin.
            let : { authorValueID: "$_id" },
            // Alla olevan "pipeline":in on tarkoitus toimia niin, että me verrataan siis
            // kahden eri kokoelman välillä olevaa dataa, eli koska me tiedämme, että jokaisella
            // kirjailijalla on oma "uniikki" id:n arvo ja, koska jokaisella kirjan arvolla löytyy
            // "authors" objektin arvo => viittaa kirjailin id:n arvoo, niin tämän pohjalta me voimme
            // vertailla kahden eri arvon välillä! Funktio siis tarkistaa/laskee, että kuinka monta
            // kertaa kirjailijan id:n arvo (authorValueID) ilmestyy => "books" kokoelman objektissa
            // "author". Kun se on suoritettu, niin data siirtyy "bookCount" objektin alle.
            pipeline: [
              { $match: { $expr: { $eq: [ "$$authorValueID", "$author" ] } } },
              { $count: "count" }
            ],
            as: "bookCount" // Tämän voi muuttaa, jos tyypissä => "AuthorNameWithBookCount" löytyy eri objektin nimi kuin => "bookCount".
          }
        },
        { // Kun query (allAuthors) on suoritettu, niin käyttäjälle palautetaan {...} sisällä
          // oleva data takaisin. Hyödynnämme myös "$ifNull" funktiota, koska emme voi olettaa
          // että jokaisella kirjailijalle (mitkä on lisätty tietokantaan), niin on lisätty
          // "oma kirja" tietokantaan erikseen. Tämän vuoksi, jos tietyllä kirjailijalla ei ole
          // lisätty tietokantaan omaa kirjaa, niin se saa oletuksena on arvon "null", mutta
          // me annetaan sen sijaan oletuksena arvon => nolla (0).
          $project: {
            "_id": 1,
            "name": 1,
            "born": 1,
            "bookCount": {$ifNull: [{ $arrayElemAt: [ "$bookCount.count", 0 ]}, 0]} // Muuta siis viimeistä lukua, minkä haluat antaa kirjailijalle, jos yhtään kirjaa ei ole lisätty!
          }
        }
      ])
    }
  },

  Mutation: {
    // Alustetaan "createUser" mutaatio, jonka tarkoituksena on siis lisätä aina uusi arvo (käyttäjä)
    // tietokantaan => "users" kokoelman alle. Jotta mutaatio onnistuu, niin funktio myös tarvitsee
    // kaksi (2) parametrin arvoa eli => "args.username" sekä "args.favoriteGenre". Nämä arvot sitten
    // sijoitetaan "new Users({...})" sisälle ja tallennetaan arvot tietokantaan!
    createUser: async (root, args) => {
      // Alustetaan muuttuja "User", joka on yhtä kuin kyseinen funktio. Muuttuja
      // siis sijoittaa parametrin kautta tulevan "args" muuttujan datan eteenpäin =>
      // "Users" muuttujaan, joka noudattaa kyseisen muuttujan rakennetta.
      const newUser = new Users({
        username: args.username, // eli "newUser.username" on yhtä kuin => "args.username" muuttujan arvo.
        favoriteGenre: args.favoriteGenre // eli "newUser.favoriteGenre" on yhtä kuin => "args.favoriteGenre" muuttujan arvo.
      })

      // Sovellus ensin yrittää suorittaa => "try {...}" sisällä olevat asiat, jos
      // sen aikana tulee virheitä, niin suoritetaan => "catch" funktio.
      try {
        await newUser.save() // Tallennetaan "newUser" muuttujan data tietokantaan.
        return newUser // Kun mutaatio on suoritettu, niin funktio palauttaa takaisin "newUser" muuttujan datan käyttäjälle näkyviin.
      } catch (error) { // Jos mutaation suorittamisessa tulee virheitä, niin suoritetaan {...} sisällä olevat asiat.
        console.log(error.message) // Tulostaa terminaaliin myös näkuviin virheen arvon eli "error.message".
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },

    // Alustetaan muuttuja "login" mutaatio, jonka tarkoituksena on siis tarkistaa, että henkilö joka
    // yrittää kirjautua sisään, niin kirjautuu "oikeilla" tunnuksilla. Ensin siis tarkistetaan, että
    // löytyykö ylipäätään sellaista käyttäjänimeä tietokannasta minkä käyttäjä on antanut parametrin
    // arvoksi ja vielä tarkistetaan, että salasana on oikein. Ota huomioon, että jokaisella käyttäjällä
    // on sama salasana ("ThisIsYourPassword") harjoitusta => "8.16 käyttäjä ja kirjautuminen" varten.
    login: async (root, args) => {
      // Alustetaan muuttuja "findCurrentUsername", joka suorittaa kyseisen funktion eli
      // kun käyttäjä suorittaa "login" mutaation ja antaa parametrin arvoksi => "args.username",
      // niin kyseisen arvon avulla me voidaan etsiä tietokannasta "users" kokoelman alta, että
      // löytyykö kyseistä arvoa, jonka objekti on yhtä kuin kyseisen parametrin arvo.
      const findCurrentUsername = await Users.findOne({ username: args.username })

      // Jos alla oleva if-ehto toteutuu, eli jos "findCurrentUsername" muuttuja on arvoa "false"
      // (eli, jos tietokannasta ei löytynyt arvoa mikä täsmää sen arvon kanssa, millä yritetään
      // kirjautua sisään) tai, jos "args.password" ei ole yhtä kuin => "ThisIsYourPassword", niin
      // suoritetaan {...} sisällä olevat asiat.
      if (!findCurrentUsername || args.password !== 'ThisIsYourPassword') {
        throw new UserInputError('You tried to login with wrong credentials. Please try again! :)')
      } else { // Muussa tapauksessa, jos yllä oleva if-ehto ei toteudu, niin suoritetaan {...} sisällä olevat asiat.
        const tokenForUser = { // Alustetaan muuttuja "tokenForUser", joka saa käyttöönsä {...} sisällä olevien objektien arvot.
          username: findCurrentUsername.username,
          id: findCurrentUsername._id
        }
        // Palautetaan takaisin käyttäjälle "value" objekti, joka siis palauttaa sen hetkisen kirjautuneen käyttäjän oman "token":in arvon.
        return {
          value: jwt.sign(tokenForUser, JWT_SECRET)
        }
      }
    },

    // Tehtävää "8.13: Tietokanta, osa 1" varten pitää luoda myös "addAuthor" mutaatio,
    // jotta voimme lisätä uuden kirjan tietokantaan. Tämä johtuu siitä, koska olemme
    // luoneet kirjojen rakenteelle ("models/books.js") seuraavan kohdan:
    //    author: {
    //      type: mongoose.Schema.Types.ObjectId,
    //      ref: 'Author'
    //    }
    // Tämä siis tarkoittaa sitä, että "author" objektille pitää löytyä jo entuudestaan
    // oleva kirjailijan arvo tietokannasta eli "authors" kokoelmasta. Kun uusi kirjailija
    // on lisätty talteen tietokantaan, niin kyseisen arvon id:n objektin avulla pystytään
    // rakentamaan (ref: 'Author') yhteys kahden (2) eri kokoelman välillä.

    // Alustetaan "addAuthor" mutaatio, jonka tarkoituksena on lisätä aina uusi kirjailija
    // tietokantaan talteen, kun kyseiseen funktioon tehdään viittaus.
    addAuthor: async (root, args) => {
      // Alustetaan muuttuja "newAuthor", joka on yhtä kuin kyseinen funktio. Muuttuja
      // siis sijoittaa parametrin kautta tulevan "args" muuttujan datan eteenpäin =>
      // "Authors" muuttujaan, joka noudattaa kyseisen muuttujan rakennetta.
      const newAuthor = new Authors({ ...args })

      // Sovellus ensin yrittää suorittaa => "try {...}" sisällä olevat asiat, jos
      // sen aikana tulee virheitä, niin suoritetaan => "catch" funktio.
      try {
        await newAuthor.save() // Tallennetaan "newAuthor" muuttujan data tietokantaan.
        return newAuthor // Kun mutaatio on suoritettu, niin funktio palauttaa takaisin "newAuthor" muuttujan datan käyttäjälle näkyviin.
      } catch (error) { // Jos mutaation suorittamisessa tulee virheitä, niin suoritetaan {...} sisällä olevat asiat.
        console.log(error.message) // Tulostaa terminaaliin myös näkyviin virheen arvon eli "error.message".
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },

    // Alustetaan "addBook" mutaatio, jonka tarkoituksena on lisätä aina uus kirjan arvo
    // tietokantaan talteen, kun kyseiseen funktioon tehdään viittaus.
    addBook: async (root, args, context) => {
      // Alustetaan muuttuja "getCurrentAuthorData", joka suorittaa kyseisen
      // funktion. Muuttujan tarkoitus on siis toimia niin, että kun käyttäjä
      // suorittaa mutaation ja sille annetaan => "author" objektille oma =>
      // String! arvo (eli pakollinen/vaadittava arvo), niin tämän avulla me
      // voidaan etsiä, että löytyykö tietokannasta (authors:in kokoelmasta)
      // jo entuudestaan kirjailijaa, jonka "name" objektin arvo on yhtä kuin
      // "args.author" muuttujan arvon kanssa. Tämän harjoituksen osalta, nyt
      // oletamme, että kun käyttäjä haluaa lisätä uuden kirjan, niin käyttäjä
      // laittaa "oikean" kirjailijan nimen, niin sitä kautta ei tule mitään
      // validointi yms. ongelmia, kun suoritetaan mutaatio! :)
      const getCurrentAuthorData = await Authors.findOne({ name: args.author })

      // Ota myös huomioon, että "getCurrentAuthorData" muuttujan data voi olla esim. seuraavassa muodossa:
      //      getCurrentAuthorData = {
      //        _id: 60db20e715f2496fbcfdcb15,
      //        name: "Aarni Pavlidi",
      //        born: 2021
      //      }
      // Kuten huomataan, että kyseistä muuttujaa käytetään, kun luodaan uusi arvo
      // tietokantaan. Muuttujan avulla voidaan siis yhdistää kaksi eri kokoelmaa
      // "_id":in objektin arvon avulla sekä muuttujalla on myös toinen tarkoitus.
      // Kun mutaatio on suoritettu, niin funktio palauttaa takaisin "newBook"
      // muuttujan datan eikö vain? Eli kun se palauttaa datan, niin se palauttaa
      // seuraavaa kohtaa => "authors: Author!" ja olemme erikseen luoneet tyypin
      // nimeltään "type Author", jonka sisältä pitää löytyä seuraavat asiat:
      //    type Author {
      //      name: String!
      //      born: Int!
      //      id: ID!
      // Kuten tästä voi päätellä, niin "getCurrentAuthorData" muuttujan sisällä
      // olevien objektien data siirretään kyseiseen tyypin "Author" alle ja
      // näytetään takaisin käyttäjälle kun mutaatio on suoritettu! :)

      // Alustetaan muuttuja "newBook", joka on yhtä kuin kyseinen funktio. Muuttuja
      // siis sijoittaa parametrin kautta tulevan "args" muuttujan datan eteenpäin =>
      // "Books" muuttujaan, joka noudattaa kyseisen muuttujan rakennetta.
      const newBook = new Books({
        title: args.title,
        published: args.published,
        author: getCurrentAuthorData,
        genres: args.genres
      })

      // Alustetaan "getCurrentUser", joka on yhtä kuin "context.currentUserLogged" eli
      // kun käyttäjä yrittää lisätä uuden arvon (kirjan) tietokantaan, niin tarkistetaan,
      // että onko sen hetkinen käyttäjä "verifoitu". Jos lisäämisen yhteydessä tuleva
      // "Authorization" (HTTP HEADERS) arvo, on väärä tai puuttuu yms. niin muuttuja
      // saa arvon "null" (eli "false" alla olevaa if-ehtoa varten).
      const getCurrentUser = context.currentUserLogged

      // Jos alla oleva if-ehto toteutuu eli, jos "getCurrentUser" on arvoa "false", niin
      // suoritetaan {...} sisällä olevat asiat ja tulostetaan kyseinen teksti käyttäjälle.
      if (!getCurrentUser) {
        throw new AuthenticationError('You are not authenticated to add new book to the database! :)')
      }

      // Sovellus ensin yrittää suorittaa => "try {...}" sisällä olevat asiat, jos
      // sen aikana tulee virheitä, niin suoritetaan => "catch" funktio.
      try {
        await newBook.save() // Tallennetaan "newBook" muuttujan data tietokantaan.
      } catch (error) { // Jos mutaation suorittamisessa tulee virheitä, niin suoritetaan {...} sisällä olevat asiat.
        console.log(error.message) // Tulostaa terminaaliin myös näkyviin virheen arvon eli "error.message".
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      // Sovellus siis suorittaa tyypistä "Subscription" => "bookAdded" objektin
      // johon sijoitetaan "newbook" muuttujan data, joka noudattaa "Book" tyypin
      // rakennetta. Funktion "publish(...)" avulla, kun lisätään uusi arvo tietokantaan
      // niin siitä julkaistaan tieto nimellä "BOOK_ADDED", jonka kautta sitten palautetaan
      // juuri lisätty data takasin nille jotka "kuuntelevat" (listening).
      pubsub.publish('BOOK_ADDED', { bookAdded: newBook })
      return newBook // Kun mutaatio on suoritettu, niin funktio palauttaa takaisin "newBook" muuttujan datan käyttäjälle näkyviin.
    },

    // Kun suoritetaan "editAuthor" mutaatio eli, kun käyttäjä haluaa muokata tietyn
    // kirjailijan syntymävuotta, niin ensin tarkistetaan (checkingAuthorValue), että
    // löytyykö tietokannasta kirjailijaa, joka on yhtä kuin käyttäjän antama parametrin
    // arvo eli => "args.name". Jos löytyy, niin sovellus muokkaa uuden arvon tietokantaan
    // ja palauttaa takaisin käyttäjälle muokatun arvon.
    editAuthor: async (root, args, context) => {
      // Alustetaan muuttuja "checkingAuthorValue", joka suorittaa kyseisen funktion eli
      // etsii "authors" kokoelmasta arvon, josta löytyy objekti, joka on yhtä kuin
      // parametrin "args.name" muuttujan arvo.
      const checkingAuthorValue = await Authors.findOne({ name: args.name })
      checkingAuthorValue.born = args.born // Muuttuja "checkingAuthorValue.born" saa arvoksi "args.born" muuttujan arvon.

      // Alustetaan "getCurrentUser", joka on yhtä kuin "context.currentUserLogged" eli
      // kun käyttäjä yrittää muoka tietyn kirjailijan arvoa tietokantaan, niin tarkistetaan,
      // että onko sen hetkinen käyttäjä "verifoitu". Jos lisäämisen yhteydessä tuleva
      // "Authorization" (HTTP HEADERS) arvo, on väärä tai puuttuu yms. niin muuttuja
      // saa arvon "null" (eli "false" alla olevaa if-ehtoa varten).
      const getCurrentUser = context.currentUserLogged

      // Jos alla oleva if-ehto toteutuu eli, jos "getCurrentUser" on arvoa "false", niin
      // suoritetaan {...} sisällä olevat asiat ja tulostetaan kyseinen teksti käyttäjälle.
      if (!getCurrentUser) {
        throw new AuthenticationError('You are not authenticated to change following authors information to the database! :)')
      }

      // Sovellus ensin yrittää suorittaa => "try {...}" sisällä olevat asiat, jos
      // sen aikana tulee virheitä, niin suoritetaan => "catch" funktio.
      try {
        await checkingAuthorValue.save() // Tallennetaan "checkingAuthorValue" muuttujan data tietokantaan.
        return checkingAuthorValue // Kun mutaatio on suoritettu, niin funktio palauttaa takaisin "checkingAuthorValue" muuttujan datan käyttäjälle näkyviin.
      } catch (error) { // Jos mutaation suorittamisessa tulee virheitä, niin suoritetaan {...} sisällä olevat asiat.
        console.log(error.message) // Tulostaa terminaaliin myös näkyviin virheen arvon eli "error.message".
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    }
  },
  // Alustetaan "Subscription", joka suorittaa {...} sisällä olevia asioita, kun
  // jokin niistä toteutuu eli, jos esim. "BOOK_ADDED" niminen tilaus julkaistaan
  // niin data näkyy "bookAdded" objektin alla.
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

// Alustetaan muuttuja "server", joka suorittaa kyseisen funktion, jossa
// käytetään parametreinä "typeDefs" sekä "resolvers" muuttujia.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // "context" muuttujaa hyödynnetään siis kaikissa resolvereissä (missä sitä halutaan/
  // tarvitaan käyttää) kolmantena parametrin arvona eli (root, args, context). Kun
  // kyseiseen parametriin tehdään viittaus resolverin kautta, niin sovellus suorittaa {...}
  // sisällä olevat asiat. Parametri palauttaa sitten takaisin "currentUserLogged" muuttujan,
  // jonka sisältä löytyy sen hetkisen kirjautuneen käyttäjän tiedot.
  context: async ({ req }) => {
    // Alustetaan muuttuja "auth", joka suorittaa kyseisen funktion eli, jos
    // muuttuja "auth" on yhtä kuin => "request", niin arvolle annetaan muuttujan
    // "request.headers.authorization" arvo ja muussa tapauksessa annetaan "null".
    const auth = req ? req.headers.authorization : null
    // Jos alla oleva if-ehto toteutuu eli, jos "auth" muuttuja sekä
    // "auth" (pienillä kirjaimilla) alkaa kirjaimilla "bearer ", niin
    // suoritetaan {...} sisällä olevat asiat ja palautetaan takaisin
    // muuttujan "currentUserLogged" data käyttäjälle näkyviin.
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET) // Alustetaan muuttuja "decodedToken", joka suorittaa kyseisen funktion.
      // Alustetaan muuttuja "currentUserLogged", joka siis etsii tietokannasta "users"
      // kokoelman alta, että löytyykö arvoa, jonka id:n arvo on yhtä kuin kyseisen
      // muuttujan => "decodedToken.id" arvo.
      const currentUserLogged = await Users.findById(decodedToken.id)
      return {
        currentUserLogged
      }
    }
  }
})

// Luo serverin portille 4000, jonka jälkeen tulostaa terminaaliin alla olevan tekstin takaisin käyttäjälle näkyviin.
// Muuttujan "subscriptionsUrl" avulla palvelin kuuntelee subscriptioneita osoitteesssa => "localhost:4000/graphql".
server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`) // Tulostaa kyseisen tekstin näkyviin terminaaliin.
  console.log(`Subscriptions ready at ${subscriptionsUrl}`) // Tulostaa kyseisen tekstin näkyviin terminaaliin.
})
