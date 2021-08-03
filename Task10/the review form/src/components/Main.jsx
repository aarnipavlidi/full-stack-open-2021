// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react'; // Otetaan käyttöön "react" niminen kirjasto sovelluksen käytettäväksi.
// Lisätty "Exercise 10.19: the single repository view" tehtävää varten "useParams" funktio.
import { Route, Switch, Redirect, useParams } from 'react-router-native'; // Otetaan kyseiset komponentit käyttöön "react-router-native" kirjaston kautta sovelluksen käytettäväksi.
import Constants from 'expo-constants'; // Otetaan käyttöön "Constants" komponentti => "expo-constants" kirjaston kautta sovelluksen käytettäväksi.
import { Text, StyleSheet, View } from 'react-native'; // Otetaan käyttöön kyseiset komponentit "react-native" kirjaston kautta sovelluksen käytettäväksi.

import RepositoryList from './RepositoryList'; // Tuodaan "RepositoryList" (RepositoryList.jsx) niminen komponentti sovelluksen käytettäväksi.
import RepositoryListByID from './RepositoryListByID'; // Tuodaan "RepositoryListByID" (RepositoryListByID.jsx) niminen komponentti sovelluksen käytettäväksi.
import AppBar from './AppBar'; // Tuodaan "AppBar" (AppBar.jsx) niminen komponentti sovelluksen käytettäväksi.
import SignIn from './SignIn'; // Tuodaaan "SignIn" (SignIn.jsx) niminen komponentti sovelluksen käytettäväksi.
import CreateReview from './CreateReview'; // Tuodaan "CreateReview" (CreateReview.jsx) niminen komponentti sovelluksen käytettäväksi.

// Alustetaan "styles" niminen muuttuja, joka suorittaa kyseisen funktion,
// jonka kautta se saa käyttöönsä {...} sisällä olevat tyylien arvot.
const styles = StyleSheet.create({
  appBackground: {
    backgroundColor: '#e1e4e8',
    flexGrow: 1,
    flexShrink: 1
  },
});

// Alustetaan "Main" niminen komponentti, joka suorittaa {...} sisällä olevat asiat
// aina, kun kyseiseen komponenttiin tehdään viittaus.
const Main = () => {

  // Komponentti renderöi (...) sisällä olevat asiat takaisin käyttäjälle näkyviin.
  // Kun käyttäjä klikkaa tiettyä linkkiä esim. "Create a review", niin sovellus
  // ohjaa käyttäjän => "/CreateReview" osoitteeseen, minkä kautta siihen vastaava
  // komponentti renderöidään takaisin käyttäjälle eli => "<CreateReview />".
  return (
    <View style={styles.appBackground}>
      <AppBar />
      <Switch>
        <Route path="/login" exact>
          <SignIn />
        </Route>
        <Route path="/CreateReview" exact>
          <CreateReview />
        </Route>
        <Route path="/" exact>
          <RepositoryList />
        </Route>
        <Route path="/:id" exact>
          <RepositoryListByID />
        </Route>
        <Redirect to="/" />
      </Switch>
    </View>
  );
};

// Viedään (export) alla oleva komponentti (Main) sovelluksen käytettäväksi, jotta esim. "App.js" tiedosto pystyy suorittamaan kyseiset funktiot.
export default Main;
