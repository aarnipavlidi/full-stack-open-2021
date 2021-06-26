// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

const { ApolloServer, gql } = require('apollo-server') // Alustetaan muuttujat "ApolloServer" sekä "gql", jotka hyödyntävät "apollo-server":in kirjastoa sovelluksessa.

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
// Muuttujasta "books" löytyy objekti => "genres", josta löytyy taulukko [...], niin tämän vuoksi olemme alustaneet
// alla olevalle tyypille => "Books.genres" => [String!]. Jos tätä ei olisi, niin queryn aikana tulisi erroria!
const typeDefs = gql`
  type Book {
    title: String!
    author: String!
    published: String!
    genres: [
      String!
    ]
  }

  type AuthorNameWithBookCount {
    name: String!
    bookCount: String!
  }

  type Query {
    authorsCount: Int!
    booksCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [AuthorNameWithBookCount!]!
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
    allAuthors: () => authors.map(({ name }) => {
      const bookCount = books.filter(results => results.author === name).length // Alustetaan muuttuja "bookCount", joka on yhtä kuin kyseinen funktion arvo.
      return {
        name,
        bookCount
      }
    })
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
