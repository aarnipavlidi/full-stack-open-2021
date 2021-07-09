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
const calculateExercises = (getValues: Array<string>): Result | string => {

  // Jos kyseiset if-ehdot (3 kpl) toteutuvat, niin siirrytään alla olevaan "catch" funktion
  // pariin ja tulostetaan kyseiset tekstit takaisin käyttäjälle näkyviin.
  if (getValues.length === 2) throw new Error('You have not given daily target hour, please try again!');
  if (getValues.length === 3) throw new Error('You gave only daily target hour, please try again!');
  if (getValues.length > 10) throw new Error('You have reached maximum training days for a week, please try again!');

  // Alustetaan muuttuja "getDailyHours", joka suorittaa kyseisen funktion, eli
  // me tiedämme kun käyttäjä suorittaa funktion esim. seuraavassa muodossa =>
  // "npm run exercise", niin siinä jo on kaksi (2) erilaista arvoa "process.argv"
  // muuttujan sisällä, jotka ovat "run" sekä "exercise". Me myös tiedämme, että
  // ensimmäinen arvo minkä käyttäjä antaa on hänen antama päivän tavoite tuntien
  // osalta eli => "getDailyTarget", joten tästä voimme päätellä, että haluamme luoda
  // uuden taulukon, luomalla kopion vanhasta taulukosta (getValues), johon tulee
  // ainoastaan käyttäjän antamat tunnit jokaisen päivän kohdalta.
  const getDailyHours = getValues.slice(3);

  // Alustetaan muuttuja "getDailyTarget", joka muuttaa käyttäjän antaman arvon
  // teksti muodosta => numeroon eli esim. "10" muuttuu => 10.
  const getDailyTarget = Number(getValues[2]);

  // Alustetaan muuttuja "dailyHoursNumbers", joka siis muuttaa "getDailyHours"
  // taulukosta jokaisen arvon "string" muodosta => numeroksi.
  const dailyHoursNumbers = getDailyHours.map((results) => Number(results));

  const averageHours = dailyHoursNumbers.reduce((a, b) => a + b, 0) / dailyHoursNumbers.length; // Alustetaan muuttuja "averageHours", joka suorittaa kyseisen funktion.
  const whenTraining = dailyHoursNumbers.filter(results => results !== 0).length; // Alustetaan muuttuja "whenTraining", joka suorittaa kyseisen funktion.

  // Jos alla oleva if-ehto toteutuu eli "getDailyTarget" sekä "averageHours" muuttujat
  // eivät ole muodossa "NaN" sekä "averageHours" on yhtä suuri tai pienempi kuin
  // "getDailyTarget" muuttujan arvo, niin funktio palauttaa takaisin {...} sisällä
  // olevat asiat käyttäjälle näkyviin. Muussa tapauksessa suoritetaan "else" funktio.
  if (!isNaN(getDailyTarget) && !isNaN(averageHours) && averageHours <= getDailyTarget) {
    return {
      periodLength: getDailyHours.length,
      trainingDays: whenTraining,
      success: false,
      rating: 2,
      ratingDescription: 'Not too bad, but could do better!',
      target: getDailyTarget,
      average: averageHours
    };
  }

  // Jos alla oleva if-ehto toteutuu eli "getDailyTarget" sekä "averageHours" muuttujat
  // eivät ole muodossa "NaN" sekä "getDailyTarget" ja "averageHours" muuttujien erotus
  // on suurempi tai yhtä suuri kuin 1, niin funktio palauttaa takaisin {...} sisällä
  // olevat asiat käyttäjälle näkyviin. Muussa tapauksessa suoritetaan "else" fuktio.
  if (!isNaN(getDailyTarget) && !isNaN(averageHours) && (getDailyTarget - averageHours) >= 1) {
    return {
      periodLength: getDailyHours.length,
      trainingDays: whenTraining,
      success: false,
      rating: 1,
      ratingDescription: 'You are slacking, you need to start working out more!',
      target: getDailyTarget,
      average: averageHours
    };
  }

  // Jos alla oleva if-ehto toteutuu eli "getDailyTarget" sekä "averageHours" muuttujat
  // eivät ole muodossa "NaN" sekä "averageHours" muuttuja on suurempi kuin "getDailyTarget"
  // muuttujan arvo, niin funktio palauttaa takaisin {...} sisällä olevat asiat käyttäjälle
  // näkyviin. Muussa tapauksessa suoritetaan "else" funktio.
  if (!isNaN(getDailyTarget) && !isNaN(averageHours) && averageHours > getDailyTarget) {
    return {
      periodLength: getDailyHours.length,
      trainingDays: whenTraining,
      success: true,
      rating: 3,
      ratingDescription: 'Very good job, keep it up!',
      target: getDailyTarget,
      average: averageHours
    };
  } else {
    throw new Error('You gave values which were not numbers, please try again!');
  }
};

// Yritetään ensin suorittaa "try" osuus, ja jos sen aikana tulee
// virheitä, niin siirrytään "catch" osuuden pariin.
try {
  console.log(calculateExercises(process.argv)); // Suoritetaan kyseinen funktio annetuilla parametrin arvoilla.
} catch (error) {
  console.log(error); // Tulostetaan kyseinen teksti terminaaliin näkyviin, jos tulee virheitä.
}
