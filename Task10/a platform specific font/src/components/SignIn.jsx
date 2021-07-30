// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react'; // Otetaan käyttöön "react" niminen kirjasto sovelluksen käytettäväksi.
import { Platform, View, Pressable, Text, StyleSheet } from 'react-native'; // Otetaan käyttöön kyseiset komponentit "react-native" kirjaston kautta sovelluksen käytettäväksi.

import styling from '../styling'; // Alustetaan "styling" niminen muuttuja, jonka avulla sovellus ottaa erillisen tyylitiedoston (styling.js) käyttöönsä.
import FormikTextInput from './FormikTextInput'; // Otetaan käyttöön "FormikTextInput" komponentti (FormikTextInput.jsx) sovelluksen käytettäväksi.

import { Formik } from 'formik'; // Otetaan käyttöön kyseiset komponentit "formik" kirjaston kautta sovelluksen käytettäväksi.
import * as yup from 'yup' // Alustetaan muuttuja "yup", joka hyödyntää "yup" kirjaston sisältöä sovelluksen aikana.

// Alustetaan "container" niminen muuttuja, joka suorittaa kyseisen funktion,
// jonka kautta se saa käyttöönsä {...} sisällä olevat tyylien arvot.
const container = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    backgroundColor: 'white',
    height: '100%'
  }
});

// Alustetaan "inputContainer" niminen muuttuja, joka suorittaa kyseisen funktion,
// jonka kautta se saa käyttöönsä {...} sisällä olevat tyylien arvot.
const inputContainer = StyleSheet.create({
  container: {
    marginTop: 5,
    alignItems: 'center',
  },
  buttonContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '81%',
    marginTop: 15,
    height: 40,
    backgroundColor: '#808080',
    borderWidth: 3,
    borderColor: '#989898'
  },
  buttonContentText: {
    marginTop: 5,
    color: 'white',
    fontFamily: Platform.select({
      android: styling.fonts.android,
      ios: styling.fonts.ios,
      default: styling.fonts.default
    }),
  }
});

// Alustetaan "initialValues" muuttuja, joka saa käyttöönsä {...} sisällä olevat objektien arvot.
// Muuttujan tarkoitus on alustaa "oletusarvot", kun käyttäjä yrittää kirjautua sisään sovellukseen.
// Eli kun käyttäjä kirjoittaa "username" objektin osuudelle esim. "Aarni" niin tämä alla oleva
// objekti saa kyseisen arvon käyttöönsä, sama asia pätee myös "password" objektin osalta.
const initialValues = {
  username: '',
  password: ''
};

// Alustetaan muuttuja "loginFormValidationSchema", joka suorittaa kyseisen funktion eli
// kun käyttäjä yrittää kirjautua sisään sovellukseen, niin suoritetaan validointi sen
// yhteydessä ja, jos "username" tai "password" objekti ei täytä alla olevia ehtoja,
// niin lomake (Formik) ilmoittaa siitä käyttäjälle erikseen.
const loginFormValidationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required.'),
  password: yup
    .string()
    .required('Password is required.')
});

// Alustetaan "LoginForm" niminen komponentti, joka suorittaa {...} sisällä olevat asiat aina,
// kun kyseiseen komponenttiin tehdään viittaus. Komponentti siis renderöi takaisin käyttäjälle
// "username" ja "password" objekteille omat kentät (input) sekä mahdollisuuden kirjautua sisään
// painikkeen avulla. Tällä hetkellä (Exercise 10.8: the sign in form) painikkeen klikkaaminen ei
// varsinaisesti tee mitään vaan ainostaan tulostaa konsoliin sen hetkiset arvot näkyviin.
// Salasanan osalta olemme lisänneet "secureTextEntry" propsin, joka piilottaa käyttäjän antaman
// salasanan pois näkyvistä näytöltä eli esim. salasana "Aarni" muuttuu => "*****".
const LoginForm = ({ onSubmit }) => {

  // Komponentti "LoginForm" renderöi (...) sisällä olevat asait takaisin käyttäjälle
  // näkyviin. Koodia on muokattu niin, että siirretty lomakkeen tyylit (osittain)
  // => "TextInput" komponentin alle, jotta voimme palauttaa käyttäjälle "oikean"
  // tyylin riippuen siitä, että onko lomakkeen kenttä täytetty oikein vai väärin.
  return (
    <View style={inputContainer.container}>
      <FormikTextInput name="username" placeholder="Enter your username..." />
      <FormikTextInput name="password" placeholder="Enter your password..." secureTextEntry={true} />
      <Pressable style={inputContainer.buttonContent} onPress={onSubmit}>
        <Text style={inputContainer.buttonContentText}>LOG IN</Text>
      </Pressable>
    </View>
  );
};

// Alustetaan "SignIn" niminen komponentti, joka suorittaa {...} sisällä olevat asiat aina,
// kun kyseiseen komponenttiin tehdään viittaus. Kun käyttäjä haluaa kirjautua sisään
// sovellukseen, niin käyttäjälle renderöidään kyseisen komponentin näkymä, jonka
// kautta käyttäjä voi kirjautua sisään sovellukseen. "Main" komponentissa olemme
// lisänneet "<Route>...</Route>", jonka avulla sovellus osaa renderöidä "oikean"
// sisällön takaisin, riippuen siitä mitä painiketta (AppBar) käyttäjä on klikannut.
const SignIn = () => {
  // Alustetaan "onSubmit" niminen muuttuja, joka suorittaa {...} sisällä olevat
  // asiat aina kun kyseiseen funktioon tehdään viittaus.
  const onSubmit = (values) => {
    console.log(values);
  };

  // Komponentti renderöi (...) sisällä olevat asiat takaisin käyttäjälle näkyviin.
  return (
    <View style={container.container}>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={loginFormValidationSchema}>
          {({ handleSubmit }) => <LoginForm onSubmit={handleSubmit} />}
        </Formik>
    </View>
  );
};

// Viedään (export) alla oleva komponentti (SignIn) sovelluksen käytettäväksi, jotta esim. "App.js" tiedosto pystyy suorittamaan kyseiset funktiot.
export default SignIn;
