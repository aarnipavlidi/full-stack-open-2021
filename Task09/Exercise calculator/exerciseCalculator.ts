// Alustetaan muuttuja "weeklyHours", joka siis hyödyntää tyyppiä
// "Array<number>" eli muuttaja saa taulukon, joka on täynnä numeroita.
const weeklyHours: Array<number> = [0, 1, 2, 3, 4, 5, 6]
const dailyHourTarget = 2 // Alustetaan muuttuja "dailyHourTarget", joka saa kyseisen arvon.

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
// parametrien "hours" sekä "target" muuttujat funktion suorittamista varten.
const calculateExercises = (hours: Array<number>, target: number) : Result => {

    const averageHours = hours.reduce((a, b) => a + b, 0) / hours.length // Alustetaan muuttuja "averageHours", joka suorittaa kyseisen funktion.
    const training = hours.filter(results => results !== 0).length // Alustetaan muuttuja "training", joka suorittaa kyseisen funktion.

    // Jos alla oleva if-ehto toteutuu, niin palautetaan {...} sisällä olevat asiat takaisin käyttäjälle.
    if (averageHours <= target) {
      return {
        periodLength: hours.length,
        trainingDays: training,
        success: false,
        rating: 2,
        ratingDescription: 'Not too bad, but could do better!',
        target: target,
        average: averageHours
      }
    }

    // Jos alla oelva if-ehto toteutuu, niin palautetaan {...} sisällä olevat asiat takaisin käyttäjälle.
    if ((target - averageHours) >= 1) {
      return {
        periodLength: hours.length,
        trainingDays: training,
        success: false,
        rating: 1,
        ratingDescription: 'You are slacking, you need to start working out more!',
        target: target,
        average: averageHours
      }
    }

    // Jos mikään yllä olevista ehdoista ei toteudu, niin palautetaan {...} sisällä olevat asiat takaisin käyttäjälle.
    return {
      periodLength: hours.length,
      trainingDays: training,
      success: true,
      rating: 3,
      ratingDescription: 'Very good job, keep it up!',
      target: target,
      average: averageHours
    }
  }

// Yritetään ensin suorittaa "try" osuus, ja jos sen aikana tulee
// virheitä, niin siirrytään "catch" osuuden pariin.
try {
  console.log(calculateExercises(weeklyHours, dailyHourTarget)) // Suoritetaan kyseinen funktio annetuilla parametrin arvoilla.
} catch (error) {
  console.log('Something went wrong, please try again!') // Tulostetaan kyseinen teksti terminaaliin näkyviin, jos tulee virheitä.
}
