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

// Alustetaan muuttuja "CREATE_NEW_BOOK", joka suorittaa alla olevan mutaation, kun kyseiseen muuttujaan
// tehdään viittaus eli, aina kun käyttäjä haluaa lisätä uuden kirjan tietokantaan, niin kyseinen
// funktio suoritetaan. Kun funktio on suoritettu, niin käyttäjälle tulee takaisin data, josta löytyy
// "title", "author" sekä "published" objektien arvot.
export const CREATE_NEW_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: String!, $genres: [String!]) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title
      author
      published
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
