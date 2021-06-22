// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react' // Sovellus ottaa "react" nimisen kirjaston käyttöönsä, joka myös hyödyntää "useState" funktiota.
import '@testing-library/jest-dom/extend-expect' // Sovellus ottaa kyseisen kirjaston käyttöönsä testin suorittamista varten.
import { render, fireEvent } from '@testing-library/react' // Sovellus ottaa kyseiset funktiot eli "render()" ja "fireEvent()" käyttöönsä testin suorittamista varten.
import BlogForm from './BlogForm' // Sovellus hyödyntää "BlogForm" (BlogForm.js) nimistä komponenttia, joka sijaitsee => "./BlogForm".

test('Testing, if form calls the event handler it received as props with the right details when a new blog is created!', () => { // Testi suorittaa {...} sisällä olevat asiat.

  const createBlogValueTest = jest.fn() // Alustetaan muuttuja "createBlogValueTest", joka hyödyntää Jestin avulla määriteltyä "mock" funktiota. Lisää tietoa löytyy täältä: https://jestjs.io/docs/mock-functions

  // Alustetaan muuttuja "component", joka renderöi (...) sisällä olevat asiat.
  const component = render(
    <BlogForm createBlogValue={createBlogValueTest} />
  )

  const inputTitle = component.container.querySelector('#titleForTest') // Alustetaan muuttuja "inputTitle", joka etsii elementin renderöidystä sisällöstä, jonka id:n arvo on yhtä kuin "titleForTest".
  const inputAuthor = component.container.querySelector('#authorForTest') // Alustetaan muuttuja "inputAuthor", joka etsii elementin renderöidystä sisällöstä, jonka id:n arvo on yhtä kuin "authorForTest".
  const inputURL = component.container.querySelector('#urlForTest') // Alustetaan muuttuja "inputURL", joka etsii elementin renderöidystä sisällöstä, jonka id:n arvo on yhtä kuin "urlForTest".

  // Alustetaan muuttuja "form", joka etsii renderöidystä sisällöstä => <form> elementin eli tässä tapauksessa
  // kun alla olevaan muuttujaan tehdään viittaus, niin testi suorittaa kohdan => "<form onSubmit={addBlogValue}>".
  // Jonka jälkeen suoritetaan "addBlogValue" funktio, jonka sisältä löytyy myös => "createBlogValue" funktio.
  // Tätä varten olemme alussa luoneet "mock" funktion tämän alla olevan muuttujan käsittelyä varten.
  const form = component.container.querySelector('form')

  // Kyseisen input:in arvo (title) saa arvoksi alla olevan tekstin. Inputista löytyy
  // "value" objekti, joka on yhtä kuin {newBlogTitle} eli => "value={inputTitle}".
  fireEvent.change(inputTitle, {
    target: { value: 'blogilistan testit, step4'}
  })

  // Kyseisen input:in arvo (title) saa arvoksi alla olevan tekstin. Inputista löytyy
  // "value" objekti, joka on yhtä kuin {newBlogAuthor} eli => "value={inputAuthor}".
  fireEvent.change(inputAuthor, {
    target: { value: 'Aarni Pavlidi'}
  })

  // Kyseisen input:in arvo (url) saa arvoksi alla olevan tekstin. Inputista löytyy
  // "value" objekti, joka on yhtä kuin {newBlogURL} eli => "value={inputURL}".
  fireEvent.change(inputURL, {
    target: { value: 'fullstackopen.com'}
  })

  fireEvent.submit(form) // Testi luo uuden blogin arvon yllä olevien arvojen avulla.

  expect(createBlogValueTest.mock.calls).toHaveLength(1) // Testi olettaa, että kyseistä funktiota "createBlogValueTest" on suoritettu (submit) ainoastaan kerran.
  expect(createBlogValueTest.mock.calls[0][0].title).toBe('blogilistan testit, step4') // Testi olettaa, että uuden blogin objektin arvo => "title" on yhtä kuin kyseinen teksti.
  expect(createBlogValueTest.mock.calls[0][0].author).toBe('Aarni Pavlidi') // Testi olettaa, että uuden blogin objektin arvo => "author" on yhtä kuin kyseinen teksti.
  expect(createBlogValueTest.mock.calls[0][0].url).toBe('fullstackopen.com') // Testi olettaa, että uuden blogin objektin arvo => "url" on yhtä kuin kyseinen teksti.

})
