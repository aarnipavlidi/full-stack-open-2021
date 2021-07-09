// Alustetaan funktio "calculateBmi", joka suorittaa {...} sisällä olevat asiat aina,
// kun kyseiseen funktioon tehdään viittaus. Funktio saa käyttöönsä parametrin arvot
// "a" sekä "b" ja molemmat ovat tyyppiä "number". Kun funktio on suoritettu, niin
// funktio odottaa, että palautetaan takaisin terminaaliin "string" tyyppinen arvo.
// Laskuri noudattaa https://www.foreverclub.fi/mita-painoindeksi-paljastaa/
// sivun tarjoamaa painoindeksin luokittelua.
export const calculateBmi = (a: number, b: number) : string => {

  const result = b / ((a / 100) * (a / 100)); // Alustetaan muuttuja "result", joka laskee kyseisen laskutoimituksen (BMI).

  // Jos tietty ehto täyttyy, niin palautetaan takaisin terminaaliin
  // sitä vastaava teksti. Tämän harjoituksen osalta, koska suoritamme
  // "calculateBmi(...)" funktion alhaalla, niin tulostetaan terminaaliin
  // "Normal (healthy weight)" teksti takaisin.
  if (result >= 0 && result < 15 ) {
    return 'Sickly underweight';
  }
  if (result >= 15 && result < 18) {
    return 'Significant underweight';
  }

  if (result >= 18 && result < 19) {
    return 'Slight underweight';
  }

  if (result >= 19 && result < 25) {
    return 'Normal (healthy weight)';
  }

  if (result >= 25 && result < 30) {
    return 'Slight overweight';
  }

  if (result >= 30 && result < 35) {
    return 'Significant overweight';
  }

  if (result >= 35 && result < 40) {
    return 'Severe overweight';
  }
  if (result > 40) {
    return 'Sickly overweight';
  } else {
    return 'Something went wrong, please try again!';
  }
};

// Terminaaliin voidaan kirjoittaa => esim. "npm run bmi 190 91", mikä on sama asia kuin
// => "npm run bmi "process.argv[2]" "process.argv[3]".

// Alustetaan muuttuja "getHeight", joka on yhtä kuin terminaalissa annettu arvo => "process.argv[2]".
// Muuttuja noudattaa tyyppiä "number". Suoritetaan myös "Number(...)" funktio muuttujan osalta.
const getHeight = Number(process.argv[2]);
// Alustetaan muuttuja "getWeigth", joka on yhtä kuin terminaalissa annettu arvo => "process.argv[3]".
// Muuttuja noudattaa tyyppiä "number". Suoritetaan myös "Number(...)" funktio muuttujan osalta.
const getWeigth = Number(process.argv[3]);

// Yritetään ensin suorittaa "try" osuus, ja jos sen aikana tulee
// virheitä, niin siirrytään "catch" osuuden pariin.
try {
  calculateBmi(getHeight, getWeigth); // Suoritetaan kyseinen funktio annetuilla parametrin arvoilla.
} catch (error) {
  console.log(error);
}
