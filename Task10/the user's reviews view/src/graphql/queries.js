// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import { gql } from '@apollo/client' // Sovellus ottaa käyttöön kyseiset funktiot "@apollo/client" kirjaston kautta.

// Alustetaan "GET_ALL_REPOSITORIES" niminen query, joka suorittaa alla olevan queryn
// aina, kun kyseiseen queryyn tehdään viittaus. Query palauttaa takaisin palvelimen
// kautta tulevan datan, josta löytyy jokainen "repositories" arvo.
//
// Muutettu alla olevaa queryä "GET_ALL_REPOSITORIES" tehtävää "Exercise 10.23: sorting the reviewed repositories list"
// varten niin, että sovellus suorittaa aina queryn kahdella (2) eri parametrin avulla eli "orderBySetting" sekä
// "orderDirectionSetting". Ensimmäinen vaihtoehto noudattaa "AllRepositoriesOrderBy" tyyppiä, missä vaihtoehtona
// on joko "CREATED_AT" tai "RATING_AVERAGE" sekä toinen vaihtoehto noudattaa "OrderDirection" tyyppiä missä
// vaihtoehtona on joko "DESC" tai "ASC". Oletuksena kun käyttäjä avaa sovelluksen ensimmäistä kertaa tai palaa
// takaisin näkymään missä on kaikki "repository":n arvot, niin query saa parametrin arvoksi "CREATED_AT" ja
// "DESC" eli näytetään käyttäjälle aina ensimmäisenä viimeisin/uusin arvostelu siihen "repository":n arvoon.
//
// Lisätty "Exercise 10.24: filtering the reviewed repositories list" tehtävää varten uusi parametin arvo eli
// "$filterInputValue", ja query odottaa että kyseessä on "String" tyyppi. Muuttujan arvo sijoitetaan objektin
// "searchKeyword" alle, jonka kautta queryn suorittamisen yhteydessä palautetaan ne arvot mitkä täsmäävät
// käyttäjän antaman hakukentän arvon kanssa. Oletuksena objektin arvo saa => '' eli se palauttaa kaikki
// "repository":n arvot takaisin käyttäjälle näkyviin sovelluksen etusivulle.
//
// Lisätty ""Exercise 10.25: infinite scrolling for the repository's reviews list" tehtävää
// varten "first" ja "after" argumenttien käyttäminen queryn osalta. Näiden toiminnallisuus
// selitetty tarkemmin "GET_CURRENT_REPOSITORY_REVIEWS" queryn osalta.
export const GET_ALL_REPOSITORIES = gql`
  query showAllRepositories($first: Int, $after: String, $orderBySetting: AllRepositoriesOrderBy, $orderDirectionSetting: OrderDirection, $filterInputValue: String) {
    repositories(first: $first, after: $after, orderBy: $orderBySetting, orderDirection: $orderDirectionSetting, searchKeyword: $filterInputValue) {
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
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
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

// Alustetaan "GET_CURRENT_REPOSITORY_REVIEWS" niminen query, joka suorittaa
// alla olevan queryn aina, kun kyseiseen queryyn tehdään viittaus. Query
// näyttää siis sen hetkisen klikatun "repository" arvon kaikki arvostelut.
// Jos sen hetkisellä arvolla ei ole annettu toistaiseksi mitään arvostelua,
// niin sovellus renderöi takaisin tyhjän taulukon. Tämän ominaisuus on
// toteutettu "RepositoryListByID" komponentissa.
//
// Muutettu "Exercise 10.25: infinite scrolling for the repository's reviews list"
// tehtävää varten alla olevaa queryä niin, että sille lisätty "first" ja "after"
// argumenttien käytön mahdollisuus. Objektin arvo "first" avulla voidaan määrittää,
// että kuinka monta arvoa halutaan näyttää takaisin käyttäjälle (palvelimen kautta
// tulevasta datasta) ja, kun sovellus haluaa näyttää lisää arvoja eli käyttäjä on
// päässyt viimeisen arvon kohdalle, niin objektin "after" avulla voidaan näyttää
// seuravaat arvot palvelimesta, jos niitä löytyy palvelimesta. Käytännössä tämä
// tarkoittaa sitä, että jos me halutaan esim. renderöidä kaksi (2) ensimmäistä
// arvoa niin => "pageInfo.startCursor" kertoo meille, että mikä on ensimmäisen
// arvon "cursor" objektin arvo ja "pageInfo.endCursor" kertoo meille että mikä
// on toisen "cursor" objektin arvo. (jokaiselta arvolta löytyy siis "cursor"
// objektin arvo). Tästä me voidaan päätellä, että jos palvelimesta vielä löytyy
// lisää näiden kahden (2) arvon jälkeen, niin "hasNextPage" on arvoa => "true",
// jonka jälkeen me sijoitetaan "after" objektin arvoon => "pageInfo.endCursor",
// tästä sovellus tietää, että mitä arvoa käyttäjälle on näytetty viimeisenä, jonka
// kautta varmistetaan että ei renderöidä "samanlaisia arvoja" takaisin.
export const GET_CURRENT_REPOSITORY_REVIEWS = gql`
  query showCurrentRepositoryReviews($repositoryID: ID!, $first: Int, $after: String) {
    repository(id: $repositoryID) {
      id
      fullName
      reviews(first: $first, after: $after) {
        totalCount
        edges {
          node {
            id
            text
            rating
            createdAt
            repositoryId
            user {
              id
              username
            }
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }
`

// Alustetaan "GET_CURRENT_USER_DATA" niminen query, joka suorittaa alla olevan queryn
// aina, kun kyseiseen queryyn tehdään viittaus. Query palauttaa takaisin palvelimen
// kautta tulevan data, josta löytyy sen hetkinen kirjatunut käyttäjä.
//
// Muutettu "Exercise 10.26: the user's reviews view" tehtävää varten alle olevaa
// queryä, niin että jos käyttäjä on kirjautunut sisään sovellukseen, niin sovellus
// hakee palvelimesta sen hetkisen kirjautuneen käyttäjän arvostelut "reviews"
// objektin sisältä ja näyttää ne takaisin käyttäjälle näkyviin. Oletuksena
// kun käyttäjä saapuu sovellukseen ensimmäistä kertaa eli etusivulle, niin objektin
// "includeReviews" arvo saa arvoksi => "false". Käytämme tässä siis joko "false"
// tai "true" metodia. Jos objektin arvo on yhtä kuin "true", niin query palauttaa
// "reviews" objektin datan takaisin.
export const GET_CURRENT_USER_DATA = gql`
  query getAuthorizedUser($includeReviews: Boolean!) {
    authorizedUser {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            id
            text
            rating
            createdAt
            repositoryId
            user {
              id
              username
            }
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }
`
