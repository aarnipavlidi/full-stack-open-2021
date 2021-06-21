// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react' // Sovellus ottaa "react" nimisen kirjaston käyttöönsä, joka myös hyödyntää "useState" funktiota.
import '@testing-library/jest-dom/extend-expect' // Sovellus ottaa kyseisen kirjaston käyttöönsä testin suorittamista varten.
import { render, fireEvent } from '@testing-library/react' // Sovellus ottaa kyseiset funktiot eli "render()" ja "fireEvent()" käyttöönsä testin suorittamista varten.
import Blog from './Blog' // Sovellus hyödyntää "Blog" (Blog.js) nimistä komponenttia, joka sijaitsee => "./Blog".

const usernameForTesting = { // Alustetaan muuttuja "usernameForTesting", joka saa "username" objektin käyttöönsä.
  username: 'username'
}

test('Testing, if component renders only blogs title and author values for the user!', () => { // Testi suorittaa {...} sisällä olevat asiat.
  const content = { // Alustetaan muuttuja "content", joka saa alla olevat objektit käyttöönsä.
    title: 'blogilistan testit', // eli content.title on yhtä kuin kyseinen arvo.
    author: 'Aarni Pavlidi', // eli content.author on yhtä kuin kyseinen arvo.
    url: 'fullstackopen.com', // eli content.url on yhtä kuin kyseinen arvo.
    likes: '10', // eli content.likes on yhtä kuin kyseinen arvo.
    user: {
      username: 'I am different username!' // eli content.user.username on yhtä kuin kyseinen arvo.
    },
  }

  // Alustetaan muuttuja "component", joka renderöi (...) sisällä olevat asiat. Komponentissa tarvitaan myös kahta (2)
  // erilaista propsia eli "currentUser" sekä "value". Jos näitä ei olisi, niin testi epäonnistuisi! Tämä siis tarkoittaa,
  // että "usernameForTesting" on yhtä kuin "currentUser" ja "content" on yhtä kuin "value".
  const component = render(
    <Blog currentUser={usernameForTesting} value={content} />
  )

  // Alustetaan muuttuja "lessButton", joka etsii renderöidystä sisällöstä (component)
  // tekstin, joka on yhtä kuin => "less info".
  const lessButton = component.getByText(
    'less info'
  )

  // Alustetaan muuttuja "likeButton", joka etsii renderöidystä sisällöstä (component)
  // tekstin, joka on yhtä kuin => "Give a like!".
  const likeButton = component.getByText(
    'Give a like!'
  )

  // Alustetaan muuttuja "moreButton", joka etsii renderöidystä sisällöstä (component)
  // tekstin, joka on yhtä kuin => "more info".
  const moreButton = component.getByText(
    'more info'
  )

  expect(lessButton).not.toBeVisible() // Testi olettaa siis, että kyseisen muuttujan (lessButton) arvo on piilotettuna renderöidystä sisällöstä.
  expect(likeButton).not.toBeVisible() // Testi olettaa siis, että kyseisen muuttujan (likeButton) arvo on piilotettuna renderöidystä sisällöstä.
  expect(moreButton).toBeVisible() // Testi olettaa siis, että kyseisen muuttujan (moreButton) arvo on näkyvissä renderöidyssä sisällössä.

})

test('Testing, if component renders rest of the content for the user after pressing the button!', async () => { // Testi suorittaa {...} sisällä olevat asiat.
  const content = { // Alustetaan muuttuja "content", joka saa alla olevat objektit käyttöönsä.
    title: 'blogilistan testit', // eli content.title on yhtä kuin kyseinen arvo.
    author: 'Aarni Pavlidi', // eli content.author on yhtä kuin kyseinen arvo.
    url: 'fullstackopen.com', // eli content.url on yhtä kuin kyseinen arvo.
    likes: '10', // eli content.likes on yhtä kuin kyseinen arvo.
    user: {
      username: 'I am different username!' // eli content.user.username on yhtä kuin kyseinen arvo.
    },
  }

  // Alustetaan muuttuja "component", joka renderöi (...) sisällä olevat asiat. Komponentissa tarvitaan myös kahta (2)
  // erilaista propsia eli "currentUser", "value" ja "buttonShowContent". Jos näitä ei olisi, niin testi epäonnistuisi!
  // Tämä siis tarkoittaa, että "usernameForTesting" on yhtä kuin "currentUser" ja "content" on yhtä kuin "value".
  const component = render(
    <Blog currentUser={usernameForTesting} value={content} buttonShowContent={() => setBlogValues(true)} />
  )

  const hideButton = component.getByText('less info') // Alustetaan muuttuja "hideButton", joka etsii renderöidystä sisällöstä (component) tekstin, joka on yhtä kuin => "less info".
  const showButton = component.getByText('more info') // Alustetaan muuttuja "showButton", joka etsii renderöidystä sisällöstä (component) tekstin, joka on yhtä kuin => "more info".

  // Testi suorittaa "fireEvent" funktion avulla painikkeen klikkauksen eli käytännössä haetaan muuttujan
  // eli "showButton" arvo ("more info") ja suoritetaan sen painikkeen kohdalla => "onClick" funktio.
  // Kyseinen funktio on viitattu "buttonShowContent" (props) eli se suorittaa => "setBlogValues(true)".
  // Tämä aiheuttaa renderöinnissä muutoksen, joka näyttää kaikki blogin arvot takaisin käyttäjälle.
  await fireEvent.click(showButton)

  expect(hideButton).toBeVisible() // Testi olettaa siis, että kyseisen muuttujan (hideButton) arvo on näkyvissä renderöidyssä sisällössä.
  expect(showButton).not.toBeVisible() // Testi olettaa siis, että kyseisen muuttujan (showButton) arvo on piilotettuna renderöidystä sisällöstä.

})

test('Testing, when user presses "like" button twice, then those clicks will be registered on the system!', async () => { // Testi suorittaa {...} sisällä olevat asiat.
  const mockHandler = jest.fn() // Alustetaan muuttuja "mockHandler", joka hyödyntää Jestin avulla määriteltyä "mock" funktiota. Lisää tietoa löytyy täältä: https://jestjs.io/docs/mock-functions

  // Alustetaan muuttuja "component", joka renderöi (...) sisällä olevat asiat.
  // Testin tarkoituksena on siis tarkistaa, että kun käyttäjä antaa blogin arvolle
  // tykkäyksen, niin varmistetaan, että painiketta on painettu x määrän verran.
  const component = render(
    <button onClick={mockHandler}>Give a like!</button>
  )

  const button = component.getByText('Give a like!') // Alustetaan muuttuja "button", joka etsii renderöidystä sisällöstä (component) tekstin, joka on yhtä kuin => "Give a like!".
  await fireEvent.click(button) // Suoritetaan kyseinen funktio eli klikataan painiketta kerran.
  await fireEvent.click(button) // Suoritetaan kyseinen funktio eli klikataan painiketta kerran.
  expect(mockHandler.mock.calls).toHaveLength(2) // Testi olettaa siis, että kyseistä muuttujaa "mockHandler" on klikattu kaksi (2) kertaa.

})
