// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react'; // Otetaan käyttöön "react" niminen kirjasto sovelluksen käytettäväksi.
import { Platform, View, Pressable, Text, StyleSheet } from 'react-native'; // Otetaan käyttöön kyseiset komponentit "react-native" kirjaston kautta sovelluksen käytettäväksi.
import { useHistory } from 'react-router-native'; // Otetaan käyttöön "useHistory" funktio, joka hyödyntää "react-router-native" kirjaston sisältöä sovelluksen aikana.

import styling from '../styling'; // Alustetaan "styling" niminen muuttuja, jonka avulla sovellus ottaa erillisen tyylitiedoston (styling.js) käyttöönsä.
import FormikTextInput from './FormikTextInput'; // Otetaan käyttöön "FormikTextInput" komponentti (FormikTextInput.jsx) sovelluksen käytettäväksi.

import { Formik } from 'formik'; // Otetaan käyttöön kyseiset komponentit "formik" kirjaston kautta sovelluksen käytettäväksi.
import * as yup from 'yup' // Alustetaan muuttuja "yup", joka hyödyntää "yup" kirjaston sisältöä sovelluksen aikana.

import useCreateNewUser from '../hooks/useCreateNewUser'; // Alustetaan "useCreateNewUser" niminen muuttuja, joka hyödyntää "useCreateNewUser.js" tiedoston sisältöä.
import useSignIn from '../hooks/useSignIn'; // Alustetaan "useSignIn" niminen muuttuja, joka hyödyntää "useSignIn.js" tiedoston sisältöä.

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

// Alustetaan "initialValues" muuttuja, joka saa käyttöönsä {...} sisällä
// olevat objektien arvot eli, kun komponenttia renderöidään niin "Formik"
// lomake saa oletuksena kyseiset arvot käyttöönsä. Ota huomioon, että
// kun käyttäjä "submittaa" tiedot eli luo uuden käyttäjän, niin objektia
// "passwordConfirm" emme lähetä erikseen eteenpäin, vaan sen tarkoitus
// on ainoastaan varmistaa, että salasana on "oikea", siinä mielessä
// että käyttäjä muistaa varmasti, että minkä salasanan hän on laittanut.
// Toistaiseksi tehtävää "Exercise 10.22: the sign up form" varten meillä
// ei ole systeemiä, missä käyttäjällä on mahdollisuus palauttaa salasana,
// mikäli hän ei muista sitä jostain syystä.
const initialValues = {
  username: '',
  password: '',
  passwordConfirm: ''
};

// Alustetaan "createUserFormValidationSchema" muuttuja, joka suorittaa kyseisen
// funktion eli, kun käyttäjä täyttää lomakkeen kenttiä => "CreateUserForm"
// komponentissa, niin sovellus suorittaa samaan aikaan validointia. Jos jonkin
// lomakkeen kentistä ei täytä tiettyä ehtoja, niin sovellus palauttaa sitä
// vastaavan ehdon "error" tekstin takaisin käyttäjälle kentän alapuolelle.
// Jos esim. molemmat salasanat eivät vastaa toisiaan, niin funktio renderöi
// "Passwords do not match." tekstin kentän alapuolelle.
const createUserFormValidationSchema = yup.object().shape({
  username: yup
    .string()
    .min(1, 'Minimum length for username is 1 characters.')
    .max(30, 'Maximum length for username is 30 characters.')
    .required('Username is required.'),
  password: yup
    .string()
    .min(5, 'Minimum length for password is 5 characters.')
    .max(50, 'Maximum length for password is 50 characters.')
    .required('Password is required.'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords do not match.')
    .required('Password confirm is required.')
});

// Alustetaan "CreateUserForm" komponentti, joka suorittaa {...} sisällä olevat
// asiat aina, kun kyseiseen komponenttiin tehdään viittaus. Komponentti siis
// renderöi takaisin käyttäjälle lomakkeen, mihin käyttäjä voi täyttää kentät
// jotta pystyy luomaan uuden käyttäjän sovellukseen. Kun jokainen kenttä on
// täytetty, niin "submit" painikkeen kautta suoritetaan => "CreateUser"
// komponentissa sijaitse "onSubmit" funktio eli suoritetaan mutaatio,
// jotta voidaan luoda uusi käyttäjä palvelimeen talteen.
const CreateUserForm = ({ onSubmit }) => {

  // Komponentti renderöi (...) sisällä olevat asiat takaisin käyttäjälle.
  return (
    <View style={inputContainer.container}>
      <FormikTextInput name="username" placeholder="Enter your username..." />
      <FormikTextInput name="password" placeholder="Enter your password..." secureTextEntry={true} />
      <FormikTextInput name="passwordConfirm" placeholder="Enter your password again..." secureTextEntry={true} />
      <Pressable style={inputContainer.buttonContent} onPress={onSubmit}>
        <Text style={inputContainer.buttonContentText}>Sign Up</Text>
      </Pressable>
    </View>
  );
};

// Alustetaan "CreateUser" komponentti, joka suorittaa {...} sisällä olevat asiat aina,
// kun kyseiseen komponenttiin tehdään viittaus. Komponentti mahdollistaa siis uuden
// käyttäjän lisäämisen palvelimeen, kun suoritetaan "onSubmit" funktio, jonka kautta
// "username" ja "password" muuttujien avulla suoritetaan mutaatio, joka sijaitsee
// "signUp(...)" hookissa. Jos mutaatio onnistuu, niin suoritetaan "if-ehto" eli
// sovellus kirjautuu sisään automaattisesti, juuri luodulla käyttäjätunnuksella,
// koska me voidaan olettaa, että jos käyttäjän luominen onnistui, niin me voidaan
// käyttää "samoja tunnuksia" (eli muuttujien arvoja) kun kirjaudutaan sisään.
// Tämän jälkeen sovellus ohjaa käyttäjän takaisin etusivulle eli => "push('/')".
// Jos tämän aikana tulee virheitä, niin "onSubmit" funktio suorittaa "catch"
// osuuden ja palauttaa takaisin "error" muuttujan datan konsoliin näkyviin.
const CreateUser = () => {

  const history = useHistory(); // Alustetaan "history" muuttuja, joka suorittaa kyseisen funktion.

  const [signUp] = useCreateNewUser(); // Alustetaan kyseinen funktio, joka hyödyntää "useCreateNewUser(...)" hookkia tämän komponentin osalta.
  const [signIn] = useSignIn(); // Alustetaan kyseinen funktio, joka hyödyntää "useSignIn(...)" hookkia tämän komponentin osalta.

  // Alustetaan "onSubmit" funktio, joka suorittaa {...} sisällä olevat asiat
  // aina, kun kyseiseen funktioon tehdään viittaus.
  const onSubmit = async (values) => {

    const { username, password } = values; // Alustetaan muuttujat "username" ja "password", jotka ovat yhtä kuin "values" muuttujan arvo.

    // Ensin yritetään suorittaa "try" osuus {...} sisällä olevat asiat,
    // jos sen aikana jokin kohta epäonnistuu (eli tulee virheitä), niin
    // funktio suorittaa "catch" osuuden ja suoritaa {...} sisällä olevat
    // asiat. Muussa tapauksessa suoritetaan molempien hookkien kautta
    // tulevat mutaatiot ja sovellus siirtää käyttäjän takaisin etusivulle.
    try {
      // Alustetaan "data" muuttuja, jonka kautta suoritetaan "signUp(...)"
      // hookissa sijaitse mutaatio, eli jos mutaatio onnistuu, niin se palauttaa
      // takaisin datan, johon me pääsemme käsiksi "data" muuttujan arvolla.
      const { data } = await signUp({ username, password });

      // Jos "data" muuttujasta löytyy dataa eli käyttäjän lisääminen palvelimeen
      // on onnistunut, niin sovellus kirjautuu sisään samoilla muuttujan arvoilla,
      // millä me aikaisemmin luotiin kyseinen käyttäjätunnus eli suoritetaan
      // "signIn(...)" hookissa sijaitseva mutaatio ja odotetaan kunnes se on
      // suoritettu, jonka jälkeen siirretään käyttäjä etusivulle takaisin.
      if (data) {
        await signIn({ username, password });
        history.push('/');
      };
    } catch (error) { // Jos "try" osuuden aikana tulee virheitä, niin suoritetaan {...} sisällä olevat asiat.
      console.log(error); // Tulostetaan "error" muuttujan data takaisin konsoliin näkyviin.
    }
  };

  // Komponentti renderöi (...) sisällä olevat asiat takaisin käyttäjälle näkyviin.
  return (
    <View style={container.container}>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={createUserFormValidationSchema}>
        {({ handleSubmit }) => <CreateUserForm onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
};

// Viedään (export) alla oleva komponentti (CreateUser) sovelluksen käytettäväksi, jotta esim. "App.js" tiedosto pystyy suorittamaan kyseiset funktiot.
export default CreateUser;
