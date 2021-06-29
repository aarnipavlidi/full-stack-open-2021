// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

require('dotenv').config() // Sovellus ottaa käyttöön "dotenv" kirjaston, jotta voidaan tuoda erilaisia muuttujia => ".env" tiedostosta.
const { ApolloServer, UserInputError, gql } = require('apollo-server') // Alustetaan muuttujat "ApolloServer", "UserInputError" sekä "gql", jotka hyödyntävät "apollo-server":in kirjastoa sovelluksessa.
const mongoose = require('mongoose') // Alustetetaan muuttuja "mongoose", joka ottaa käyttöönsä "mongoose" nimisen kirjaston sovellusta varten.
const { v4: uuid } = require('uuid') // Alustetaan muuttuja "uuid", joka hyödyntää "uuid" nimistä kirjastoa. Tämän avulla voidaan lisätä "random" id:n arvo, kun esim. halutaan lisätä uusi arvo tietokantaan.

const Authors = require('./models/authors') // Alustetaan muuttuja "Authors", joka ottaa käyttöön "authors.js" tiedoston sisällön sovellusta varten.
const Books = require('./models/books') // Alustetaan muuttuja "Books", joka ottaa käyttöön "books.js" tiedoston sisällön sovellusta varten.

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

let authors = [ // Alustetaan muuttuja "authors", joka saa käyttöönsä [...] sisällä olevan taulukon arvot.
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  {
    name: 'Joshua Kerievsky',
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: 'Sandi Metz',
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

let books = [ // Alustetaan muuttuja "books", joka saa käyttöönsä [...] sisällä olevan taulukon arvot.
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

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

  type AuthorNameWithBookCount {
    name: String!
    born: Int
    id: String!
    bookCount: Int!
  }

  type Query {
    authorsCount: Int!
    booksCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [AuthorNameWithBookCount!]!
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
  }
`

// Alustetaan muuttuja "resolvers", joka sisältää palvelimen "resolverit". Tämän avulla määritellään, että miten GraphQL-kyselyihin vastataan.
// Lisää tästä löytyy: https://www.apollographql.com/docs/apollo-server/data/resolvers/#resolver-map
const resolvers = {
  Query: {
    authorsCount: () => authors.length, // Kun suoritetaan "authorsCount" query, niin sovellus laskee "authors" muuttujan pituuden ja palauttaa arvon takaisin käyttäjälle.
    booksCount: () => books.length, // Kun suoritetaan "booksCount" query, niin sovellus laskee "books" muuttujan pituuden ja palauttaa arvon takaisin käyttälle.
    allBooks: (root, args) => { // Alustetaan "allBooks" query, joka suorittaa {...} sisällä olevat asiat, kun kyseiseen queryyn tehdään viittaus.

      // Jos alla oleva if-ehto toteutuu eli, jos käyttäjä laittaa parametrin arvoksi
      // ainoastaan "genre: ...", niin sovellus suorittaa {...} sisällä olevat asiat
      // ja palauttaa takaisin käyttäjälle funktion suorittamisen jälkeisen arvon.
      // Muuttuja "args.genre" on yhtä kuin => käyttäjän kirjoittama "genre: ..."
      if (args.genre !== undefined && args.author === undefined) {
        return books.filter(results => results.genres.includes(args.genre))
      }

      // Jos alla oleva if-ehto toteutuu eli, jos käyttäjä laittaa parametrin arvoksi
      // ainoastaan "author: ...", niin sovellus suorittaa {...} sisällä olevat asiat
      // ja palauttaa takaisin käyttäjälle funktion suorittamisen jälkeisen arvon.
      // Muuttuja "args.author" on yhtä kuin => käyttäjän kirjoittama "author: ..."
      if (args.genre === undefined && args.author !== undefined) {
        return books.filter(results => results.author === args.author)
      }

      // Jos alla oleva if-ehto toteutuu eli, jos käyttäjä laittaa molemmat parametrin
      // arvot queryn suorittamista varten eli "args.genre" sekä "args.author", niin
      // suorittaa {...} sisällä olevat asiat ja palauttaa takaisin käyttäjälle
      // funktion suorittamisen jälkeisen arvon.
      if (args.genre !== undefined && args.author !== undefined) {

        // Alustetaan muuttuja, joka suorittaa {...} sisällä olevat asiat aina,
        // kun kyseiseen funktioon tehdään viittaus. Funktio luo siis uuden taulukon
        // "filter(...)" funktion avulla ja palauttaa takaisin käyttäjälle uuden arvon,
        // jonka täytyy täyttää kaksi (2) erilaista ehtoa. Muuttujan "results.genres"
        // täytyy sisältää "args.genre" muuttujan arvon sekä "results.author" muuttujan
        // täytyy olla yhtä kuin => "args.author" muuttujan arvo!
        const searchAuhorWithMatchingGenre = books.filter(results => {
          return results.genres.includes(args.genre) && results.author === args.author
        })
        return searchAuhorWithMatchingGenre // Palauttaa kyseisen muuttujan arvon takaisin käyttäjälle, jos if-ehto toteutuu.

        // Muussa tapauksessa, jos mikään yllä olevista if-ehdoista ei toteudu, niin
        // suoritetaan {...} sisällä oleva asia ja palautetaan "books" muuttujan arvo
        // takaisin käyttäjälle.
      } else {
        return books
      }
    },

    // Kun suoritetaan "allAuthors" query, niin sovellus etsii "authors" muuttujasta "map(...)"
    // funktion avulla kaikki arvot mistä löytyy "name" objekti. Tämän avulla voidaan luoda
    // uusi taulukko "filter(...)" funktion avulla, jossa etsitään jokainen arvo, joka on yhtä
    // kuin "name" muuttujan arvon kanssa sekä lasketaan (length:in avulla) lopuksi, että kuinka
    // monta kertaa kyseinen nimi ilmestyy taulukossa yhteensä. Lopuksi palautetaan arvot takaisin
    // => "AuthorNameWithBookCount" tyyppiä varten, jotta dataa voidaan näyttää käyttäjälle. Ota myös
    // huomioon, että alla olevan muuttujan => "const bookCount" täytyy olla sama mitä olemme ylä
    // olevalle tyypille alustaneet. Jos muuttuja olisi eri, niin tulisi erroria! :)
    allAuthors: () => authors.map(({ name, born, id }) => {
      const bookCount = books.filter(results => results.author === name).length // Alustetaan muuttuja "bookCount", joka on yhtä kuin kyseinen funktion arvo.
      return {
        name,
        born,
        id,
        bookCount
      }
    })
  },
  Mutation: {
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
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },

    // Alustetaan "addBook" mutaatio, jonka tarkoituksena on lisätä aina uus kirjan arvo
    // tietokantaan talteen, kun kyseiseen funktioon tehdään viittaus.
    addBook: async (root, args) => {
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

      // Sovellus ensin yrittää suorittaa => "try {...}" sisällä olevat asiat, jos
      // sen aikana tulee virheitä, niin suoritetaan => "catch" funktio.
      try {
        await newBook.save() // Tallennetaan "newBook" muuttujan data tietokantaan.
        return newBook // Kun mutaatio on suoritettu, niin funktio palauttaa takaisin "newBook" muuttujan datan käyttäjälle näkyviin.
      } catch (error) { // Jos mutaation suorittamisessa tulee virheitä, niin suoritetaan {...} sisällä olevat asiat.
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },

    // Kun suoritetaan "editAuthor" mutaatio eli, kun käyttäjä haluaa muokata tietyn
    // kirjailijan syntymävuotta, niin ensin tarkistetaan (checkingAuthorValue), että
    // löytyykö tietokannasta kirjailijaa, joka on yhtä kuin käyttäjän antama parametrin
    // arvo eli => "args.name". Jos löytyy, niin sovellus muokkaa uuden arvon tietokantaan
    // ja palauttaa takaisin käyttäjälle muokatun arvon. Muussa tapauksessa, jos ei
    // tietokannasta löydy arvoa, niin palautetaan automaattisesti "null" arvo takaisin.
    editAuthor: (root, args) => {
      const checkingAuthorValue = authors.find(results => results.name === args.name) // Alustetaan muuttuja "checkingAuthorValue", joka suorittaa siis kyseisen funktion.

      // Jos alla oleva if-ehto toteutuu, eli muuttuja "checkingAuthorValue" on tyhjä, niin sovellus suorittaa {...} sisällä olevan asiat.
      if (!checkingAuthorValue) {
        return null // Palautetaan takaisin käyttäjälle muuttujan arvo "null".
      } else { // Muussa tapauksessa suoritetaan "else" funktio ja {...} sisällä olevat asiat.

        // Alustetaan muuttuja "updateAuthorValue", joka siis luo kopion "checkingAuthorValue" muuttujan arvosta
        // sekä muokkaa "born" objektin arvoa lisäämällä siihen "args.setBornTo" muuttujan arvon.
        const updateAuthorValue = { ...checkingAuthorValue, born: args.born }

        // Muuttuja "authors" on yhtä kuin kyseinen funktio eli luodaan uusi taulukko "map(...)" funktion
        // avulla ja, jos ehto toteutuu eli "results.name" on yhtä kuin "args.name" muuttujan arvo, niin
        // kyseistä arvoa muokataan => "updateAuthorValue" muuttujan arvoon ja muussa tapauksessa saa
        // alkuperäisen muuttujan arvon => "results".
        authors = authors.map(results => results.name === args.name ? updateAuthorValue : results)

        return updateAuthorValue // Palautetaan takaisin käyttäjälle "updateAuthorValue" muuttujan arvo.
      }
    }
  }
}

// Alustetaan muuttuja "server", joka suorittaa kyseisen funktion, jossa
// käytetään parametreinä "typeDefs" sekä "resolvers" muuttujia.
const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => { // Luo serverin portille 4000, jonka jälkeen tulostaa terminaaliin alla olevan tekstin takaisin käyttäjälle näkyviin.
  console.log(`Server ready at ${url}`)
})
