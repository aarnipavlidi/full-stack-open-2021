// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import { gql } from '@apollo/client' // Sovellus ottaa käyttöön kyseiset funktiot "@apollo/client" kirjaston kautta.

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
