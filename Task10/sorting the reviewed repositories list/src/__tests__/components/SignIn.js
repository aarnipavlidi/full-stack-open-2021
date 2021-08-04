// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react'; // Otetaan käyttöön "react" niminen kirjasto sovelluksen käytettäväksi.
import { Formik } from 'formik'; // Otetaan käyttöön kyseiset komponentit "formik" kirjaston kautta sovelluksen käytettäväksi.
import FormikTextInput from '../../components/FormikTextInput'; // Otetaan käyttöön "FormikTextInput" komponentti (FormikTextInput.jsx) sovelluksen käytettäväksi.
import { Text, View, Pressable } from 'react-native'; // Otetaan käyttöön kyseiset komponentit "react-native" kirjaston kautta sovelluksen käytettäväksi.
import { render, fireEvent, waitFor } from '@testing-library/react-native'; // Otetaan käyttöön kyseiset funktiot "@testing-library/react-native" kirjaston kautta sovelluksen käytettäväksi.

// Alustetaan "RenderFormik" komponentti, joka suorittaa {...} sisällä olevat
// asiat aina, kun kyseiseen komponenttiin tehdään viittaus.
const RenderFormik = ({ onSubmit }) => {
  // Alustetaan "initialValues" muuttuja, joka saa {...} sisällä olevat objektien arvot käyttöönsä.
  const initialValues = {
    username: '',
    password: ''
  };
  // Komponentti renderöi (...) sisällä olevat asiat takaisin käyttäjälle.
  return (
    <View>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ handleSubmit }) => <LoginForm onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
};

// Alustetaan "LoginForm" komponentti, joka suorittaa {...} sisällä olevat asiat
// aina, kun kyseiseen komponenttiin tehdään viittaus.
const LoginForm = ({ onSubmit }) => {
  // Komponentti renderöi (...) sisällä olevat asiat takaisin käyttäjälle.
  return (
    <View>
      <FormikTextInput testID="usernameField" name="username" placeholder="Enter your username..." />
      <FormikTextInput testID="passwordField" name="password" placeholder="Enter your password..." />
      <Pressable testID="submitButton" onPress={onSubmit}>
        <Text>LOG IN</Text>
      </Pressable>
    </View>
  );
};

// Testin tarkoitus on tarkistaa, että kun käyttäjä täyttää molemmat kentät ja klikkaa "submit"
// painiketta, niin varmistetaan että molemmat kentät on täytetty sekä painiketta klikattu kerran.
describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      const onSubmit = jest.fn(); // Alustetaan "onSubmit" muuttuja, joka suorittaa kyseisen funktion.
      // Alustetaan "getByTestId" funktio, ja renderöidään kyseinen komponentti
      // takaisin, kun suoritetaan testiä. Komponentti hyödyntää "onSubmit"
      // muuttujaa eli, kun testin aikana "käyttäjä" klikkaa painiketta, niin
      // se suorittaa tämän funktion eli => "jest.fn(...)" funktion.
      const { getByTestId } = render(<RenderFormik onSubmit={onSubmit} />);

      // Testi etsii "getByTestId(...)" funktion avulla elementin, jonka "testID"
      // parametrin arvo vastaa funktiolle annetun parametrin arvo ja vaihtaa arvon
      // alkuperäisestä arvosta uuteen => "aarni" + "password". Tämän jälkeen
      // etsitään painike, jonka id:n arvo on "submitButton" ja klikataan sitä.
      fireEvent.changeText(getByTestId('usernameField'), 'aarni');
      fireEvent.changeText(getByTestId('passwordField'), 'password');
      fireEvent.press(getByTestId('submitButton'));

      // Testi myös olettaa, että kyseistä painiketta on painettu kerran ja, että
      // painikkeen klikkauksen yhteydessä molempien kenttien arvot täsmäävät.
      // Funktion "waitFor(...)" avulla voidaan odottaa alla olevia "expect(...)"
      // funktioita. Mikäli ne eivät toteudu tiettyyn aikaan menneessä, niin
      // testi heittää takaisin erroria eli testi epäonnistuu.
      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: 'aarni',
          password: 'password'
        });
      });
    });
  });
});
