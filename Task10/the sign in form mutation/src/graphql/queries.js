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
