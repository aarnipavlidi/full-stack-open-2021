// Alustetaan "Result" niminen interface, joka siis määrittää mitä
// tyyppejä {...} sisällä olevat objektien arvot noudattavat.
// Kun funktio (calculateExercises) suoritetaan, niin se palauttaa
// takaisin arvoja (return {...}), jotka noudattavat tätä interfacea.
interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

// Alustetaan muuttuja "calculateExercises", joka suorittaa {...} sisällä olevat
// asiat aina, kun kyseiseen funktioon tehdään viittaus. Funktio saa myös käyttöönsä
// parametrin "getValues" arvon, joak siis toimii taulukkona, jonka sisältä löytyy
// erilaisia arvoja "string" (teksti) muodossa. Arvot tulevat kun käyttäjä suorittaa
// funktion terminaalin kautta ja antaa x arvot funktion suorittamista varten.
export const calculateExercises = (dailyTarget: number, dailyHours: Array<number>): Result | string => {

  // Jos kyseiset if-ehdot (2 kpl) toteutuvat, niin siirrytään alla olevaan "catch" funktion
  // pariin ja tulostetaan kyseiset tekstit takaisin käyttäjälle näkyviin.
  if (!dailyTarget && !dailyHours) throw new Error('You have not given value for either daily target or weekly hours, please try again!');
  if (dailyHours.length > 8) throw new Error('You have reached maximum training days for a week, please try again!');

  const averageHours = dailyHours.reduce((a, b) => a + b, 0) / dailyHours.length; // Alustetaan muuttuja "averageHours", joka suorittaa kyseisen funktion.
  const whenTraining = dailyHours.filter(results => results !== 0).length; // Alustetaan muuttuja "whenTraining", joka suorittaa kyseisen funktion.

  // Jos alla oleva if-ehto toteutuu eli "dailyTarget" sekä "averageHours" muuttujat
  // eivät ole muodossa "NaN" sekä "averageHours" on yhtä suuri tai pienempi kuin
  // "dailyTarget" muuttujan arvo, niin funktio palauttaa takaisin {...} sisällä
  // olevat asiat käyttäjälle näkyviin. Muussa tapauksessa suoritetaan "else" funktio.
  if (!isNaN(dailyTarget) && !isNaN(averageHours) && averageHours <= dailyTarget) {
    return {
      periodLength: dailyHours.length,
      trainingDays: whenTraining,
      success: false,
      rating: 2,
      ratingDescription: 'Not too bad, but could do better!',
      target: dailyTarget,
      average: averageHours
    };
  }

  // Jos alla oleva if-ehto toteutuu eli "dailyTarget" sekä "averageHours" muuttujat
  // eivät ole muodossa "NaN" sekä "dailyTarget" ja "averageHours" muuttujien erotus
  // on suurempi tai yhtä suuri kuin 1, niin funktio palauttaa takaisin {...} sisällä
  // olevat asiat käyttäjälle näkyviin. Muussa tapauksessa suoritetaan "else" fuktio.
  if (!isNaN(dailyTarget) && !isNaN(averageHours) && (dailyTarget - averageHours) >= 1) {
    return {
      periodLength: dailyHours.length,
      trainingDays: whenTraining,
      success: false,
      rating: 1,
      ratingDescription: 'You are slacking, you need to start working out more!',
      target: dailyTarget,
      average: averageHours
    };
  }

  // Jos alla oleva if-ehto toteutuu eli "dailyTarget" sekä "averageHours" muuttujat
  // eivät ole muodossa "NaN" sekä "averageHours" muuttuja on suurempi kuin "dailyTarget"
  // muuttujan arvo, niin funktio palauttaa takaisin {...} sisällä olevat asiat käyttäjälle
  // näkyviin. Muussa tapauksessa suoritetaan "else" funktio.
  if (!isNaN(dailyTarget) && !isNaN(averageHours) && averageHours > dailyTarget) {
    return {
      periodLength: dailyHours.length,
      trainingDays: whenTraining,
      success: true,
      rating: 3,
      ratingDescription: 'Very good job, keep it up!',
      target: dailyTarget,
      average: averageHours
    };
  } else {
    throw new Error('You gave values which were not numbers, please try again!');
  }
};

// Yritetään ensin suorittaa "try" osuus, ja jos sen aikana tulee
// virheitä, niin siirrytään "catch" osuuden pariin.
try {
  console.log('Performing function called "calculateExercises" now!'); // Suoritetaan kyseinen funktio annetuilla parametrin arvoilla.
} catch (error) {
  console.log(error); // Tulostetaan kyseinen teksti terminaaliin näkyviin, jos tulee virheitä.
}
