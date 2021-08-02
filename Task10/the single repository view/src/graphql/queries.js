// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import { gql } from '@apollo/client' // Sovellus ottaa käyttöön kyseiset funktiot "@apollo/client" kirjaston kautta.

// Alustetaan "GET_ALL_REPOSITORIES" niminen query, joka suorittaa alla olevan queryn
// aina, kun kyseiseen queryyn tehdään viittaus. Query palauttaa takaisin palvelimen
// kautta tulevan datan, josta löytyy jokainen "repositories" arvo.
export const GET_ALL_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          id
          fullName
          description
          language
          stargazersCount
          forksCount
          reviewCount
          ratingAverage
          ownerAvatarUrl
        }
      }
    }
  }
`

// Alustetaan "GET_CURRENT_REPOSITORY" niminen query, joka suorittaa alla olevan
// queryn aina, kun kyseiseen queryyn tehdään viittaus. Queryn toiminta on täysin
// samanlainen kuin yllä oleva (GET_ALL_REPOSITORIES), mutta sen sijaan että me
// haetaan kaikki arvot palvelimesta, niin me haetaan vain yksi "repositoryID"
// objektin avulla, joka siirretään => "id" objektin argumentiksi.
export const GET_CURRENT_REPOSITORY = gql`
  query showCurrentRepository($repositoryID: ID!) {
    repository(id: $repositoryID) {
      id
      fullName
      url
      description
      language
      stargazersCount
      forksCount
      reviewCount
      ratingAverage
      ownerAvatarUrl
    }
  }
`

// Alustetaan "GET_CURRENT_USER_DATA" niminen query, joka suorittaa alla olevan queryn
// aina, kun kyseiseen queryyn tehdään viittaus. Query palauttaa takaisin palvelimen
// kautta tulevan data, josta löytyy sen hetkinen kirjatunut käyttäjä.
export const GET_CURRENT_USER_DATA = gql`
  query {
    authorizedUser {
      id
      username
    }
  }
`
