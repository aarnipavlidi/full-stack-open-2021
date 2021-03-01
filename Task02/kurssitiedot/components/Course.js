// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please send me email at me@aarnipavlidi.fi!

import React from 'react' // Moduulin React "import"


const Course = (props) => { // Komponentin "Course" aloitus.
  return (
    <div>
      <h1>Web development curriculum</h1>
      <h2>{props.course[0].name}</h2>  {/* // Etsii muuttujasta "course" sijainnilta [0] => "name":n arvon ja tulostaa sen käyttäjälle näkyviin. */}
        <div>
          <ul>
          // Käytetään map() funktiota ja ideana on tässä se, että me siirrytään ensin => course => course[0] => parts ja etsitään jokainen arvo sen sisältä, jonka jälkeen tulostetaan halutut arvot takaisin käyttäjälle.
            {props.course[0].parts.map(kurssi =>
              <li key={kurssi.id}> // Annetaan jokaiselle riville oma uniikki arvo käyttämällä reactin tarjoamaa "key" ominaisuutta. Me tiedetään, että taulukon sisällä jokaisella on oma uniikki "id" arvo, niin käytetään sitä tässä tapauksessa.
                {kurssi.name}: {kurssi.exercises} // Etsii taulukosta arvot kohdista "name" sekä "exercises" ja tulostaa ne näkyviin käyttäjälle.
                </li>
              )}
          </ul>
        </div>
          <div> // Käytetään reduce() funktiota, jotta voidaan suorittaa haluttu laskutoimitus. Siirrytään ensin taulukossa oikealla sijainnille, jonka jälkeen etsitään jokainen arvo "exercises" kohdasta ja lasketaan ne yhteen ja tulostetaan arvo takaisin käyttäjälle.
            <p>There is total of {props.course[0].parts.reduce((a,b) => a =  a + b.exercises , 0)} different exercises in this course!</p>
          </div>
          <div>
            <h2>{props.course[1].name}</h2> // Etsii muuttujasta "course" sijainnilta [1] => "name":n arvon ja tulostaa sen käyttäjälle näkyviin.
            <div>
              <ul> // Käytetään map() funktiota ja ideana on tässä se, että me siirrytään ensin => course => course[1] => parts ja etsitään jokainen arvo sen sisältä, jonka jälkeen tulostetaan halutut arvot takaisin käyttäjälle.
                {props.course[1].parts.map(kurssi =>
                  <li key={kurssi.id}> // Annetaan jokaiselle riville oma uniikki arvo käyttämällä reactin tarjoamaa "key" ominaisuutta. Me tiedetään, että taulukon sisällä jokaisella on oma uniikki "id" arvo, niin käytetään sitä tässä tapauksessa.
                    {kurssi.name}: {kurssi.exercises}  // Etsii taulukosta arvot kohdista "name" sekä "exercises" ja tulostaa ne näkyviin käyttäjälle.
                  </li>
                )}
              </ul>
            </div>
          </div>
            <div> // Käytetään reduce() funktiota, jotta voidaan suorittaa haluttu laskutoimitus. Siirrytään ensin taulukossa oikealla sijainnille, jonka jälkeen etsitään jokainen arvo "exercises" kohdasta ja lasketaan ne yhteen ja tulostetaan arvo takaisin käyttäjälle.
              <p>There is total of {props.course[1].parts.reduce((a,b) => a = a + b.exercises , 0)} different exercises in this course!</p>
            </div>
      </div>
  )
} // Komponentin "Course" lopetus.

export default Course // Komponentin "Course" export.
