// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3
//
// Ennen jokaisen uuden testin alkua eli => "it(...)", niin suoritetaan => "beforeEach()" funktio,
// jossa yhdistetään alla olevaan osoitteeseen. Olemme backendin puolella alustaneet muuttujan
// "testRouter", joka tyhjentää tietokannasta sen hetkiset blogin sekä käyttäjän arvot.
//
//    const testRouter = require('express').Router()
//    const Blog = require('../models/blogModel')
//    const User = require('../models/user')
//
//    testRouter.post('/reset', async (request, response) => {
//      await Blog.deleteMany({})
//      await User.deleteMany({})
//
//      response.status(204).end()
//    })
//
//    module.exports = testRouter
//
// Muista, että olemme aikaisemmissa tehtävissä luoneet tietokantaan (MongoDB) erillisen
// tietokannan erilaisia testejä varten eli meidän tapauksessa alla oleva funktio poistaa
// tiedot => "blogilista-test" kokoelmasta!

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    // Alla olevan muuttujan idea on se, että aina kun sovellus siirtyy uuden testin pariin,
    // niin ensin poistetaan nykyiset arvot tietokannasta, jonka jälkeen luodaan tyhjään
    // tietokantaan uusi käyttäjätunnus. Tämän avulla varmistetaan se, että jokainen testi
    // aloittaa samasta lähtöpisteestä eli ovat ns. vertailukelpoisia tarpeen vaatiessa.
    const newUser = { // Alustetaan muuttuja "newUser", joka saa käyttöönsä {...} sisällä olevat objektit.
      name: 'Aarni Pavlidi', // eli "newUser.name" on yhtä kuin kyseinen teksti.
      username: 'usernameForTesting', // eli "newUser.username" on yhtä kuin kyseinen teksti.
      password: 'passwordForTesting' // eli "newUser.password" on yhtä kuin kyseinen teksti.
    }
    cy.request('POST', 'http://localhost:3003/api/users', newUser) // Luodaan tietokantaan uusi käyttäjätunnus "newUser" muuttujan tiedoilla.
    cy.visit('http://localhost:3000') // Testi siirtyy kyseiseen osoitteeseen.
  })

  // ALla olevan testin tarkoituksena on siis tarkistaa, että ennen kuin käyttäjä
  // kirjautuu sisään, niin kirjautumislomakkeesta löytyy oletusarvot. Testi hakee
  // elementin annetulla id:n arvolla sekä varmistaa, että kyseinen elementti
  // sisältää annetun arvon esim. 'Username' tai 'Password'.
  it('Testing, if login form is shown as default', function() {
    cy.contains('Welcome to Bloglist, please log in! :)')
    cy.get('#elementUsername').contains('Username')
    cy.get('#elementPassword').contains('Password')
    cy.get('#login-button').contains('login')
  })

  describe('Login', function() {
    // Alla olevan testin tarkoituksena on siis tarkistaa, että kun käyttäjä kirjautuu
    // sovellukseen "oikeilla" tunnuksilla, niin kirjautuminen onnistuu ja käyttäjälle
    // ilmestyy teksti, josta myös löytyy kirjautuneen käyttäjän nimi.
    it('Testing, if logging to the app with right credentials is successful', function() {
      cy.get('#inputUsername').type('usernameForTesting') // Etsitään elementtiä, jonka id:n arvo on "inputUsername" ja annetaan arvoksi kyseinen teksti.
      cy.get('#inputPassword').type('passwordForTesting') // Etsitään elementtiä, jonka id:n arvo on "inputPassword" ja annetaan arvoksi kyseinen teksti.
      cy.get('#login-button').click() // Etsitään elementtiä, jonka id:n arvo on "login-button" ja klikataan painiketta.

      cy.contains('Welcome to the application Aarni Pavlidi, you are now logged in to the bloglist! :) ') // Kun käyttäjä on kirjautunut sisään onnistuneesti, niin kyseinen teksti pitäisi näkyä käyttäjälle.
    })

    // ALla olevan testin tarkoituna on siis tarkistaa, että kun käyttäjä kirjautuu
    // sovellukseen "väärillä" tunnuksilla, niin kirjautuminen epäonnistuu ja käyttäjälle
    // ilmestyy "notifikaatio" (error), josta löytyy tietyt tyyliluokat (css).
    it('Testing, if logging to the app with wrong credentials is unsuccessful', function() {
      cy.get('#inputUsername').type('wrongUsername') // Etsitään elementtiä, jonka id:n arvo on "inputUsername" ja annetaan arvoksi kyseinen teksti.
      cy.get('#inputPassword').type('wrongPassword') // Etsitään elementtiä, jonka id:n arvo on "inputPassword" ja annetaan arvoksi kyseinen teksti.
      cy.get('#login-button').click() // Etsitään elementtiä, jonka id:n arvo on "login-button" ja klikataan painiketta.

      // Testi etsii siis elementtiä, jonka tyyliluokka (class / className) on => "error" ja
      // varmistetaan, että kyseinen elementti on näkyvillä ja elementiltä löytyy kaksi (2)
      // tyyliluokkaa eli "color" sekä "background-color" alla olevillä väreillä.
      cy.get('.error').should('be.visible')
      cy.get('.error').should('have.css', 'color', 'rgb(103, 46, 46)')
      cy.get('.error').should('have.css', 'background-color', 'rgb(205, 92, 92)')
    })
  })

  describe('When user is logged in', function() {
    // Alla olevan testin tarkoituksena on siis tarkistaa, että kun käyttäjä kirjautuu
    // sovellukseen "oikeilla" tunnuksilla, niin kirjautuminen onnistuu ja käyttäjälle
    // ilmestyy teksti, josta myös löytyy kirjautuneen käyttäjän nimi. Tämän jälkeen
    // varmistetaan, että kun käyttäjä haluaa lisätä uuden blogin tietokantaan, niin
    // se ilmestyy (renderöidään) käyttäjälle näkyviin lisäämisen jälkeen.
    it('Testing, if user adding new blog value to the database is successful', function() {
      cy.get('#inputUsername').type('usernameForTesting') // Etsitään elementtiä, jonka id:n arvo on "inputUsername" ja annetaan arvoksi kyseinen teksti.
      cy.get('#inputPassword').type('passwordForTesting') // Etsitään elementtiä, jonka id:n arvo on "inputPassword" ja annetaan arvoksi kyseinen teksti.
      cy.get('#login-button').click() // Etsitään elementtiä, jonka id:n arvo on "login-button" ja klikataan painiketta.

      cy.contains('Welcome to the application Aarni Pavlidi, you are now logged in to the bloglist! :) ') // Kun käyttäjä on kirjautunut sisään onnistuneesti, niin kyseinen teksti pitäisi näkyä käyttäjälle.

      cy.get('#create-blog-button').click() // Etsitään elementtiä, jonka id:n arvo on "create-blog-button" ja klikataan painiketta.
      cy.contains('Create a new blog:') // Varmistetaan, että kyseinen teksti näkyy käyttäjälle, sen jälkeen kun on klikattu yllä olevaa painiketta.

      cy.get('#titleForTest').type('blogilistan end to end -testit') // Etsitään elementtiä, jonka id:n arvo on "titleForTest" ja annetaan arvoksi kyseinen teksti.
      cy.get('#authorForTest').type('Aarni Pavlidi') // Etsitään elementtiä, jonka id:n arvo on "authorForTest" ja annetaan arvoksi kyseinen teksti.
      cy.get('#urlForTest').type('fullstackopen.com') // Etsitään elementtiä, jonka id:n arvo on "urlForTest" ja annetaan arvoksi kyseinen teksti.

      cy.get('#submit-blog-button').click() // Etsitään elementtiä, jonka id:n arvo on "submit-blog-button" ja klikataan painiketta.
      cy.get('.success').should('be.visible') // Etsitään elementtiä, jonka tyyliluokka (class / className) on => "success" ja varmistetaan, että kyseinen elementti on näkyvillä.
      cy.contains('blogilistan end to end -testit by Aarni Pavlidi').should('be.visible') // Varmistetaan, että kyseinen teksti näkyy käyttäjälle, sen jälkeen kun on klikattu yllä olevaa painiketta.
    })
  })
})
