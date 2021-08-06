// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react'; // Otetaan käyttöön "react" niminen kirjasto sovelluksen käytettäväksi.
import { Platform, View, Pressable, Text, StyleSheet } from 'react-native'; // Otetaan käyttöön kyseiset komponentit "react-native" kirjaston kautta sovelluksen käytettäväksi.
import { useHistory } from 'react-router-native'; // Otetaan käyttöön "useHistory" funktio, joka hyödyntää "react-router-native" kirjaston sisältöä sovelluksen aikana.

import styling from '../styling'; // Alustetaan "styling" niminen muuttuja, jonka avulla sovellus ottaa erillisen tyylitiedoston (styling.js) käyttöönsä.
import FormikTextInput from './FormikTextInput'; // Otetaan käyttöön "FormikTextInput" komponentti (FormikTextInput.jsx) sovelluksen käytettäväksi.

import { Formik } from 'formik'; // Otetaan käyttöön kyseiset komponentit "formik" kirjaston kautta sovelluksen käytettäväksi.
import * as yup from 'yup' // Alustetaan muuttuja "yup", joka hyödyntää "yup" kirjaston sisältöä sovelluksen aikana.

import useCreateNewReview from '../hooks/useCreateNewReview'; // Alustetaan "useCreateNewReview" niminen muuttuja, joka hyödyntää "useSignIn.js" tiedoston sisältöä.

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

// Alustetaan "ReviewForm" komponentti, joka suorittaa {...} sisällä olevat asiat
// aina, kun kyseiseen komponenttiin tehdään viittaus. Komponentti siis renderöi
// jokaisen vaadittavan kentän, kun käyttäjä haluaa lisätä uuden arvostelun tietylle
// "repository":n arvolle. Kun käyttäjä lisää tiedot eli "submittaa", niin komponetti
// suorittaa => "CreateReview" komponentissa sijaitsevan "onSubmit" funktion näiden
// kenttien avulla mitkä käyttäjä on laittanut sillä hetkellä, kun submittaa tiedot.
const ReviewForm = ({ onSubmit }) => {

  // Komponentti renderöi (...) sisällä olevat asiat takaisin käyttäjälle näkyviin.
  return (
    <View style={inputContainer.container}>
      <FormikTextInput name="ownerName" placeholder="Enter repository owner name..." />
      <FormikTextInput name="repositoryName" placeholder="Enter repository name..." />
      <FormikTextInput name="rating" placeholder="Enter repository rating..." />
      <FormikTextInput name="text" placeholder="Enter repository review..." multiline={true} />
      <Pressable style={inputContainer.buttonContent} onPress={onSubmit}>
        <Text style={inputContainer.buttonContentText}>Create a review</Text>
      </Pressable>
    </View>
  );
};

// Alustetaan "initialValues" muuttuja, joka saa käyttöönsä {...}
// sisällä olevat objektien arvot eli kun komponenttia renderöidään
// käyttäjälle näkyviin, niin "Formik" komponentti saa oletuksena
// nämä arvot, jokaisen kentän osalta.
const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: ''
};

// Alustetaan "reviewFormValidationSchema", joka suorittaa jokaisen kentän
// osalta validoinnin. Kaikissa kentissä täytyy olla arvo, paitsi "text"
// objektin osalta. Jos jokin arvo ei täytä niille asetettuja ehtoja,
// niin renderöidään sitä vastaava "virhe" kyseisellä tekstin arvolla
// takaisin käyttäjälle näkyviin. Jos esim. käyttäjä antaa "rating"
// kentälle arvon "150", niin "Maximum rating for repository is 100."
// teksti ilmestyy takaisin kentän alapuolelle.
const reviewFormValidationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .required('Repository owner name is required.'),
  repositoryName: yup
    .string()
    .required('Repository name is required.'),
  rating: yup
    .number()
    .typeError('Only numbers are accepted for rating.')
    .min(0, 'Minimum rating for repository is 0.')
    .max(100, 'Maximum rating for repository is 100.')
    .required('Rating is required.'),
  text: yup
    .string()
});

// Alustetaan "CreateReview" komponentti, joka suorittaa {...} sisällä olevat asiat
// aina, kun kyseiseen komponenttiin tehdään viittaus. Komponentti renderöi takaisin
// "Formik" ja "ReviewForm" komponentin ja mahdollistaa uuden arvostelun lisäämisen
// palvelimeen => "onSubmit" funktion avulla, jonka kautta suoritetaan "createReview(...)"
// funktio, joka tulee erikseen hookista eli => "useCreateNewReview(...)".
const CreateReview = () => {

  const history = useHistory(); // Alustetaan "history" muuttuja, joka suorittaa kyseisen funktion.
  const [createReview] = useCreateNewReview(); // Alustetaan kyseinen funktio, joka hyödyntää "useCreateNewReview(...)" hookkia tämän komponentin osalta.

  // Alustetaan "onSubmit" funktio, joka suorittaa {...} sisällä olevat asiat aina,
  // kun kyseiseen funktioon tehdään viittaus. Funktio saa parametrin arvoksi "values",
  // jotka tulevat käyttäjän antamista arvoista eli => "ReviewForm" komponentin kautta.
  // Näiden avulla voidaan suorittaa "createReview(...)" funktio, joka palauttaa takaisin
  // datan => "data" muuttujan alle, jos mutaation suorittaminen onnistuu. Muussa tapuksessa
  // suoritetaan "catch" osuus ja tulostetaan konsoliin "error" muuttujan arvo.
  const onSubmit = async (values) => {

    const { ownerName, repositoryName, rating, text } = values; // Alustetaan {...} sisällä olevat muuttujat, jotka ovat yhtä kuin "values" muuttujan arvo.

    // Ensin yritetään suorittaa "try" {...} sisällä olevat asiat,
    // jos sen aikana tulee virheitä, niin funktio suorittaa "catch"
    // osuuden ja suorittaa {...} sisällä olevat asiat.
    try {
      const { data } = await createReview({ ownerName, repositoryName, rating, text });
      // Jos käyttäjä onnistuu lisäämään uuden arvostelun, niin sovellus
      // ohjaa käyttäjän siihen "repository":n arvoon, mille käyttäjä
      // on antanut arvostelun eli "repositoryName" kenttä määrittää
      // sen, että mihin arvoon sovellus siirtyy, ja jotta me pystymme
      // siirtämään käyttäjän "oikealle" arvolle, niin mutaatio palauttaa
      // takaisin "repositoryId" objektin arvon mitä me käytämme tässä! :)
      history.push(`/${data.createReview.repositoryId}`);
    } catch (error) {
      console.log(error);
    }
  };

  // Komponentti renderöi (...) sisällä olevat asiat takaisin käyttäjälle näkyviin.
  return (
    <View style={container.container}>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={reviewFormValidationSchema}>
        {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
};

// Viedään (export) alla oleva komponentti (CreateReview) sovelluksen käytettäväksi, jotta esim. "App.js" tiedosto pystyy suorittamaan kyseiset funktiot.
export default CreateReview;
