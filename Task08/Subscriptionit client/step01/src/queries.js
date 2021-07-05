// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import { gql } from '@apollo/client' // Sovellus ottaa käyttöön kyseiset funktiot "@apollo/client" kirjaston kautta.

// Alustetaan muuttuja "BOOKS_DETAILS", joka siis hyödyntää "Book" rakennetta, jonka
// olemme erikseen alustaneet backendin puolella. Tätä muuttujaa voidaan siis käyttää,
// jos halutaan yksinkertaistaa (tiivistää) tiettyjä funktioita. Esim. alla olevassa
// muuttujassa => "BOOK_ADDED" käytetään tätä, koska kun kyseinen subscription on
// suoritettu, niin "bookAdded" haluaa näyttää datan takaisin, joka noudattaa siis
// "Book":in rakenneta eli => "...BookDetails" on yhtä kuin => "Book".
const BOOKS_DETAILS = gql`
  fragment BookDetails on Book {
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
`

// Alustetaan muuttuja "BOOK_ADDED", joka suorittaa kyseisen subscriptionin, kun kyseiseen muuttujaan
// tehdään viittaus eli aina kun lisätään uusi arvo (kirja) tietokantaan, niin kyseinen muuttuja
// suoritetaan ja palauttaa "bookAdded" datan, joka hyödyntää "BOOKS_DETAILS" kautta tulevaa fragmenttia.
export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  
${BOOKS_DETAILS}
`

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
  query showAllBooks {
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

// Alustetaan muuttuja "RECOMMENDED_BOOKS", joka suorittaa alla olevan queryn, kun kyseiseen muuttujaan tehdään
// viittaus. Funktion tarkoituksena on toimia niin, että se näyttää tietokannasta kaikki ne arvot, joiden
// "genres" objektista löytyy samanlainen arvo, joka täsmää sen hetkisen kirjautuneen käyttäjän "favoriteGenre"
// objektin kanssa. Tehtävässä "8.20 Lempigenren kirjat" ei erikseen mainittu, että pitäisi käyttää kyseistä
// queryä, mutta ajattelin ennen harjoituksen tekemistä että tämän avulla saisi "vähemmän liikennettä"
// palvelimeen, jos tietokannasta löytyisi esim. 1000 erilaista arvoa ja tarvitsee filtteröidä "ei halutut"
// arvot kyselystä ja palauttaa "oikea data" takaisin. Yritin pitkään taistella tämän kanssa ilman, että tulee
// mitään erroria yms. Nyt toistaiseksi tätä tehtävää varten käyttäjälle suunnanut kirjat haetaan "ALL_BOOKS"
// queryn kautta ja filtteröidään "ei halutut" arvot pois => "if (...)" ehdolla ja palautetaan data takaisin.
export const RECOMMENDED_BOOKS = gql`
  query showBooksFavoriteGenre($nameToSearch: String!) {
    allBooks(genres: $nameToSearch) {
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

// Alustetaan muuttuja "CURRENT_USER", joka suorittaa alla olevan queryn, kun kyseiseen muuttujaan
// tehdään viittaus eli, kun käyttäjä on kirjautunut sisään ja haluaa nähdä erikseen tietokannasta
// olevat kirjat joiden "genre" objekti täsmää kirjautuneen käyttäjän => "favoriteGenre" objektin
// kanssa. Query siis palauttaa takaisin datan, josta löytyy käyttäjän => "username", "favoriteGenre"
// sekä "id" objektit. Näiden avulla sovellus pystyy näyttämään halutut asiat takaisin käyttäjälle.
export const CURRENT_USER = gql`
  query {
    me {
      username
      favoriteGenre
      id
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
