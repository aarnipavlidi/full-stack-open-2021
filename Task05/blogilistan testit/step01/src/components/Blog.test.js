// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react' // Sovellus ottaa "react" nimisen kirjaston käyttöönsä testin suorittamista varten.
import '@testing-library/jest-dom/extend-expect' // Sovellus ottaa kyseisen kirjaston käyttöönsä testin suorittamista varten.
import { render } from '@testing-library/react' // Sovellus ottaa kyseisen funktion eli "render()" käyttöönsä testin suorittamista varten.
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
