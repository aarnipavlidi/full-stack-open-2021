// Alustetaan funktio "calculateBmi", joka suorittaa {...} sisällä olevat asiat aina,
// kun kyseiseen funktioon tehdään viittaus. Funktio saa käyttöönsä parametrin arvot
// "a" sekä "b" ja molemmat ovat tyyppiä "number". Kun funktio on suoritettu, niin
// funktio odottaa, että palautetaan takaisin terminaaliin "string" tyyppinen arvo.
// Laskuri noudattaa https://www.foreverclub.fi/mita-painoindeksi-paljastaa/
// sivun tarjoamaa painoindeksin luokittelua.
const calculateBmi = (a: number, b: number) : string => {

  const result = b / ((a / 100) * (a / 100)) // Alustetaan muuttuja "result", joka laskee kyseisen laskutoimituksen (BMI).

  // Jos tietty ehto täyttyy, niin palautetaan takaisin terminaaliin
  // sitä vastaava teksti. Tämän harjoituksen osalta, koska suoritamme
  // "calculateBmi(...)" funktion alhaalla, niin tulostetaan terminaaliin
  // "Normal (healthy weight)" teksti takaisin.
  if (result >= 0 && result < 15 ) {
    return 'Sickly underweight'
  } else if (result >= 15 && result < 18) {
    return 'Significant underweight'
  } else if (result >= 18 && result < 19) {
    return 'Slight underweight'
  } else if (result >= 19 && result < 25) {
    return 'Normal (healthy weight)'
  } else if (result >= 25 && result < 30) {
    return 'Slight overweight'
  } else if (result >= 30 && result < 35) {
    return 'Significant overweight'
  } else if (result >= 35 && result < 40) {
    return 'Severe overweight'
  } else if (result > 40) {
    return 'Sickly overweight'
  }
}

// Yritetään ensin suorittaa "try" osuus, ja jos sen aikana tulee
// virheitä, niin siirrytään "catch" osuuden pariin.
try {
  console.log(calculateBmi(180, 74)) // Suoritetaan kyseinen funktio annetuilla parametrin arvoilla.
} catch (error) {
  console.log('Something went wrong, please try again!') // Tulostetaan kyseinen teksti terminaaliin näkyviin, jos tulee virheitä.
}
