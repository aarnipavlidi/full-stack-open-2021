// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import { gql } from '@apollo/client' // Sovellus ottaa käyttöön kyseiset funktiot "@apollo/client" kirjaston kautta.

// Alustetaan "CREATE_NEW_USER" niminen mutaatio, joka suorittaa alla olevan mutaation.
// Kun käyttäjä haluaa rekisteröityä sovellukseen, niin kyseinen mutaatio suoritetaan
// "newUserData" objektin avulla, johon sijoitetaan lomakkeen kautta tulevat "username"
// ja "password" muuttujien arvot. Mutaatio hyödyntää "CreateUserInput" tyyppiä, joka
// odottaa siis kaksi (2) erilaista arvoa eli "username" sekä "password". Molemmat
// arvot ovat pakollisia ja molempien täytyy olla "String" muodossa. Jos mutaation
// suorittaminen onnistuu, niin se palauttaa takaisin datan, josta löytyy "id",
// "username" sekä "createdAt" objektien arvot, joita voidaan hyödyntää tarvittaessa!
export const CREATE_NEW_USER = gql`
  mutation createNewUser($newUserData: CreateUserInput) {
    createUser(user: $newUserData) {
      id
      username
      createdAt
    }
  }
`

// Alustetaan "USER_LOGIN" niminen mutaatio, joka suorittaa alla olevan mutaation. Mutaatio
// siis hakee sillä hetkellä, kun käyttäjä yrittää kirjautua sisään sovellukseen, niin
// palauttaa takaisin sen hetkisen kirjautuneen käyttäjän "accessToken" arvon. Mutaatio
// hyödyntää "AuthorizeInput" tyyppiä, josta löytyy "username" ja "password" sekä molemmat
// ovat "String" tyyppiä. Kun suoritamme tämän mutaation "useSignIn" hookissa, niin objektin
// arvo eli "userLoginData" hyödyntää tätä kyseistä input:in tyyppiä. Kun mutaatio on
// suoritettu loppuun, niin se palauttaa takaisin "accessToken" arvon sovelluksen käytettäväksi.
export const USER_LOGIN = gql`
  mutation getUserCredentials($userLoginData: AuthorizeInput) {
    authorize(credentials: $userLoginData) {
      accessToken
    }
  }
`

// Alustetaan "CREATE_NEW_REVIEW" niminen mutaatio, joka suorittaa alla olevan mutaation.
// Kun käyttäjä haluaa lisätä uuden arvostelun tietylle "repository":n arvolle, niin kyseinen
// mutaatio suoritetaan. Mutaatio hyödyntää "CreateReviewInput" tyyppiä, joka odottaa että
// kun lisätään uutta arvoa niin sieltä löytyy neljä (4) erilaista objektin arvoa eli:
//
// 1) "repositoryName" (string) + pakollinen arvo.
// 2) "ownerName" (string) + pakollinen arvo.
// 3) "rating" (number) + pakollinen arvo.
// 4) "text" (string) + valinnainen arvo.
//
// Näiden avulla voidaan suorittaa mutaatio onnistuneesti ja nämä objektien arvot
// sijoitetaan "newReviewData" objektin alle, kun suoritetaan createNewReview(...)
// funktio, joka sijaitsee siis => "useCreateNewReview.js" hookissa. Kun mutaatio
// on suoritettu loppuun, niin meille riittää toistaiseksi tämän hetkiselle tehtävälle
// eli "Exercise 10.21: the review form", että se palauttaa takaisin "repositoryId"
// objektin arvon. Tämän avulla sovellus osaa ohjata kyseiseen "repository":n arvoon
// mille käyttäjä on juuri luonut uuden arvostelun.
export const CREATE_NEW_REVIEW = gql`
  mutation createNewReview($newReviewData: CreateReviewInput) {
    createReview(review: $newReviewData) {
      repositoryId
    }
  }
`
