// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import { gql } from '@apollo/client' // Sovellus ottaa käyttöön kyseiset funktiot "@apollo/client" kirjaston kautta.

// Alustetaan muuttuja "ALL_AUTHORS", joka suorittaa alla olevan queryn, kun kyseiseen muuttujaan tehdään
// viittaus eli, jos käyttäjä suorittaa "allAuthors" queryn, niin käyttäjälle tulee takaisin data, josta
// löytyy "name", "born", "bookCount" sekä "id" objektien arvot.
export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

// Alustetaan muuttuja "ALL_BOOKS", joka suorittaa alla olevan queryn, kun kyseiseen muuttujaan tehdään
// viittaus eli, jos käyttäjä suorittaa "allBooks" queryn, niin käyttäjälle tulee takaisin data, josta
// löytyy "title", "author", "author", "published", "genres" sekä "id" objektien arvot.
export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author {
        name
        born
        id
      }
      published
      genres
      id
    }
  }
`

// Alustetaan muuttuja "USER_LOGIN", joka suorittaa alla olevan mutaation, kun kyseiseen muuttujaan
// tehdään viittaus eli, aina kun käyttäjä yrittää kirjautua sisään (eli sovellukselle on renderöity
// "UserLogin" komponentti), niin kyseinen funktio suoritetaan. Komponentista löytyy siis erikseen
// "getUserCredentials", jonka sisälle asetetaan parametrien arvot mitkä se "poimii" sen hetkisestä
// käyttäjätunnuksen sekä salasanan arvosta. Näiden avulla sitten suoritetaan lopuksi "login" mutaatio
// minkä olemme erikseen luoneet backendin puolelle, jossa siis "username" objekti saa muuttujan arvon
// => "$username" ja "password" objekti saa muuttujan arvon => "$password". Mutaatio palauttaa sitten
// takaisin tokenin arvon, joka on sijoitettu "value" objektin alle.
export const USER_LOGIN = gql`
  mutation getUserCredentials($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

// Alustetaan muuttuja "CREATE_NEW_BOOK", joka suorittaa alla olevan mutaation, kun kyseiseen muuttujaan
// tehdään viittaus eli, aina kun käyttäjä haluaa lisätä uuden kirjan tietokantaan, niin kyseinen
// funktio suoritetaan. Kun funktio on suoritettu, niin käyttäjälle tulee takaisin data, josta löytyy
// "title", "published", "author" sekä "genres" objektien arvot.
export const CREATE_NEW_BOOK = gql`
  mutation createBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
    addBook(
      title: $title,
      published: $published,
      author: $author,
      genres: $genres
    ) {
      title
      published
      author {
        name
        born
        id
      }
      genres
      id
    }
  }
`

// Alustetaan muuttuja "UPDATE_AUTHOR_YEAR", joka suorittaa alla olevan mutaation, kun kyseiseen muuttujaan
// tehdään viittaus eli, aina kun käyttäjä haluaa päivittää tietyn kirjailijan syntymävuotta, niin kyseinen
// funktio suoritetaan. Kun funktio on suoritettu, niin käyttäjälle tulee takaisin data, josta löytyy
// "name" sekä "born" objektien arvot.
export const UPDATE_AUTHOR_YEAR = gql`
  mutation updateAuthorYear($name: String!, $born: Int!) {
    editAuthor(
      name: $name,
      born: $born
    ) {
      name
      born
    }
  }
`
