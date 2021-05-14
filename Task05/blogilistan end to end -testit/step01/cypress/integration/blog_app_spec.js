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
    cy.visit('http://localhost:3000')
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
})
