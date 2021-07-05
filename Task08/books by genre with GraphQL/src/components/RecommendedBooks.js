// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React, { useState, useEffect } from 'react' // Otetaan käyttöön "react" niminen kirjasto sekä "useState" funktiot sovellusta varten.
import { useQuery, useLazyQuery } from '@apollo/client' // Sovellus ottaa käyttöön kyseiset funktiot "@apollo/client" kirjaston kautta.
import { CURRENT_USER, RECOMMENDED_BOOKS } from '../queries' // Sovellus ottaa käyttöön kyseiset funktiot "queries.js" tiedostosta.

// Alustetaan komponetti "RecommendedBooks", joka suorittaa {...} sisällä olevat asiat aina,
// kun kyseiseen komponenttiin tehdään viittaus. Komponentti saa myös parametrin arvoksi =>
// "showRecommendedBooks" ja "getClient" muuttujien arvot.
const RecommendedBooks = ({ showRecommendedBooks, getClient }) => {

  // Alustetaan muuttuja "currentUserData" tilaan, joka saa oletuksena arvon => "null".
  // Muuttujaa käytetään kolmeen (3) eri tarkoitukseen kun komponenttia suoritetaan:
  //
  // 1) "useEffect(...)" hookin sisällä eli kun käyttäjä kirjautuu onnistuneesti
  // sovellukseen, niin => "currentUser.data" sisällä ilmestyy dataa, mikä aiheuttaa
  // ketjureaktion jonka kautta suoritetaan kyseinen funktio ja muutetaan nykyisen
  // muuttujan tilaa => "currentUser.data.me" sisällä olevalla datalla.
  //
  // 2) Mikäli "currentUserData" (statessa) tapahtuu muutoksia sovelluksen aikana,
  // niin suoritetaan toinen "useEffect(...)" funktio, jonka myötä suoritetaan sen
  // sisällä oleva "currentBooks(...)" funktio, jolle annetaan parametrin arvoksi
  // sen hetkinen "currentGenre" arvo.
  //
  // 3) Muuttuja "currentGenre" ottaa jatkuvasti arvon nykyisestä "statesta" eli
  // "currentUserData" ja, jos arvo on "null", niin annetaan arvoksi => '', koska
  // queryn pitää "onnistua läpi", jos me annettaisiin arvoksi esim. "null", niin
  // query epäonnistuisi ja sovellus sitä kautta kaatuisi! :(
  const [currentUserData, setCurrentUserData] = useState(null)

  // Alustetaan muuttuja "currentGenre", joka suorittaa kyseisen ehdon ja palauttaa
  // takaisin sen hetkisen arvon kumpi toteutuu renderöinnin yhteydessä. Me tiedämme
  // aina sen, että state (currentUserData) on oletuksena arvoa "null" eli aina kun
  // käyttäjä saapuu sovellukseen ensimmäistä kertaa ja, jos "RECOMMENDED_BOOKS"
  // query ei löydä mitään arvoa tietokannasta, niin se palauttaa muuttujan arvon =>
  // "currentUser.data.me" on yhtä kuin => "null". Ja taas jos query onnistuu, niin
  // me tiedämme, että statesta löytyy objektin arvo => "favoriteGenre".
  const currentGenre = currentUserData === null ? '' : currentUserData.favoriteGenre

  // Alustetaan muuttuja "currentUser", joka suorittaa kyseisen queryn eli
  // "CURRENT_USER":in. Queryn data haetaan erikseen välimuistista, koska
  // olemme ottaneet käyttöön "fetchPolicy":n parametrin. Kun käyttäjä
  // kirjautuu sisään, niin "CURRENT_USER":in kautta tuleva data siirtyy
  // välimuistiin talteen ja tämä kyseinen muuttuja "currentUser" poimii
  // datan käytettäväksi tämän komponentin osalta.
  const currentUser = useQuery(CURRENT_USER, {
    fetchPolicy: "cache-only"
  })

  // Alustetaan muuttujat [ currentBooks, response ], joka suorittaa kyseisen queryn
  // eli "RECOMMENDED_BOOKS". Aina kun komponentti viittaa kyseiseen funktioon =>
  // "currentBooks", niin suoritetaan query ja "response" muuttuja palauttaa takaisin
  // datan takaisin käyttäjälle näkyviin. Olemme myös ottaneet käyttöön "fetchPolicy"
  // parametrin arvon => "no-cache" eli, kun querya suoritetaan, niin sen hetkistä
  // dataa ei tallenneta erikseen välimuistiin. Sovelluksessa ei tällä hetkellä ole
  // esim. mahdollisuutta muuttaa käyttäjätunnuksen genreä (ainoastaan tietokannasta
  // käsin pystyy), niin tämän avulla varmistetaan, että aina kun käyttäjä kirjautuu
  // sisään, niin saadaan "viimeisin" tieto käyttäjätunnuksen lempigenrestä.
  const [currentBooks, response] = useLazyQuery(RECOMMENDED_BOOKS, {
    fetchPolicy: 'no-cache'
  })

  // Komponentti suorittaa kyseisen "useEffect(...)" funktion aina,
  // kun tapahtuu muutoksia "currentUser.data" muuttujan osalta.
  // Ylhäällä on selitetty tarkemmin tämän funktion käyttötarkoitusta.
  useEffect(() => {
    // Jos ehto totetuu, niin suoritetaan {...} sisällä olevat asiat.
    if (currentUser.data) {
      setCurrentUserData(currentUser.data.me) // Muutetaan "currentUserData" muuttujan tilaa kyseiseen muuttujan arvoon eli => "currentUser.data.me".
    }
  }, [currentUser.data]) // Suoritetaan funktio vain jos "currentUser.data" osalta tapahtuu muutoksia.

  // Komponentti suorittaa kyseisen "useEffect(...)" funktion aina,
  // kun tapahtuu muutoksia "currentUser.data" muuttujan osalta.
  // Ylhäällä on selitetty tarkemmin tämän funktion käyttötarkoitusta.
  useEffect(() => {
    // Suoritetaan "currentBooks(...)" funktio, joka saa "variables" parametrin
    // arvon käytettäväksi queryä varten, joka suorittaa sen hetkisellä
    // "currentGenre" muuttujan arvolla!
    currentBooks({
      variables: { nameToSearch: currentGenre }
    })
  }, [currentUserData]) // Suoritetaan funktio vain jos "currentUserData" osalta tapahtuu muutoksia.

  // Jos alla oleva if-ehto toteutuu eli muuttuja "showRecommendedBooks" ei toteudu niin, että
  // "page on yhtä kuin RecommendedBooks" sekä "token on yhtä kuin null", niin komponentti ei
  // renderöi mitään takaisin käyttäjälle näkyviin.
  if (!showRecommendedBooks) {
    return null
  }

  // Jos kysenen if-ehto toteutuu eli "currentUser" tai "response" muuttujan queryn hakeminen on vielä
  // kesken eli "loading", niin komponetti suorittaa {...} sisällä olevat asiat takaisin käyttäjälle näkyviin.
  if (currentUser.loading || response.loading) {
    return (
      <div className='container mt-3 text-center'>
        <div className='spinner-border' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </div>
      </div>
    )
  }

  // Muussa tapauksessa komponetti renderöi (...) sisällä olevat asiat takaisin käyttäjälle näkyviin.
  return (
    <div className='container mt-3'>
      <div>
        <h2>Welcome back {currentUserData.username}, your favorite genre is {currentUserData.favoriteGenre}.</h2>
        <p>Here is the list of all available books based on your favorite genre:</p>
      </div>
      <div className='container mt-3'>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Book</th>
              <th scope='col'>Author</th>
              <th scope='col'>Published</th>
            </tr>
          </thead>
          <tbody>
            {response.data.allBooks.map((results, index) =>
              <tr key={results.id}>
                <th scope='row'>{index + 1}</th>
                <td>{results.title}</td>
                <td>{results.author.name}</td>
                <td>{results.published}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// Viedään (export) alla oleva komponentti (RecommendedBooks) sovelluksen käytettäväksi, jotta esim. "App.js" tiedosto pystyy suorittamaan kyseiset funktiot.
export default RecommendedBooks
