// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React, { useState, useEffect } from 'react'; // Otetaan käyttöön "react" niminen kirjasto sovelluksen käytettäväksi.
import { Link } from 'react-router-native'; // Otetaan kyseiset komponentit käyttöön "react-router-native" kirjaston kautta sovelluksen käytettäväksi.
import Constants from 'expo-constants'; // Otetaan käyttöön "Constants" komponentti => "expo-constants" kirjaston kautta sovelluksen käytettäväksi.
import { Platform, Text, StyleSheet, ScrollView, View, Pressable } from 'react-native'; // Otetaan käyttöön kyseiset komponentit "react-native" kirjaston kautta sovelluksen käytettäväksi.

// https://www.apollographql.com/docs/react/api/react/hooks/#useapolloclient
import { useApolloClient } from '@apollo/client'; // Otetaan käyttöön "useApolloClient" funktio kyseisen kirjaston kautta sovelluksen ajaksi.
import { useQuery } from '@apollo/client' // Sovellus ottaa käyttöön kyseiset funktiot "@apollo/client" kirjaston kautta.
import { GET_CURRENT_USER_DATA } from '../graphql/queries'; // Otetaan kyseiset queryt sovelluksen käytettäväksi "queries.js" tiedoston kautta.
import useAuthStorage from '../hooks/useAuthStorage'; // Alustetaan "useAuthStorage" funktio, joka hyödyntää "useAuthStorage.js" tiedoston sisältöä sovelluksen aikana.

import styling from '../styling'; // Alustetaan "styling" niminen muuttuja, jonka avulla sovellus ottaa erillisen tyylitiedoston (styling.js) käyttöönsä.

// Alustetaan "styles" niminen muuttuja, joka suorittaa kyseisen funktion,
// jonka kautta se saa käyttöönsä {...} sisällä olevat tyylien arvot.
const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingBottom: Constants.statusBarHeight,
    backgroundColor: styling.appBarContainer.backgroundColor,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  containerTitle: {
    marginTop: 25,
    marginLeft: 10,
    fontFamily: Platform.select({
      android: styling.fonts.android,
      ios: styling.fonts.ios,
      default: styling.fonts.default
    }),
    fontSize: styling.appBarContainerTitle.titleBody,
    fontWeight: styling.appBarContainerTitle.titleWeight,
    color: styling.appBarContainerTitle.titleColor
  }
});

// Alustetaan "CheckUserStatus" niminen komponentti, joka suorittaa {...} sisällä olevat
// asiat, aina kun kyseiseen komponenttiin tehdään viittaus. Komponentin ideana on siis
// tarkistaa, "checkCurrentUser" (query) muuttujan avulla, että jos käyttäjä on kirjautunut
// sisään, niin renderöidään eri painike (Logout) ja muussa tapuksessa renderöidään
// "normaali" painike, eli "Login" painike. Hyödynnämme tässä myös "useEffect(...)"
// funktiota, joka aina suoritetaan kun tapahtuu muutoksia "checkCurrentUser.data"
// muuttujan osalta, jonka kautta muutetaan "currentUser" muuttujan tilaa käyttämällä
// "setCurrentUser" funktiota, johon siirretään "authorizedUser" objektin data.
const CheckUserStatus = () => {

  // Alla olevan muuttujan avulla pääsemme käsiksi välimuistissa olevaan
  // dataan ja vaikuttamaan siihen esim. poistamalla tiettyjä asioita yms.
  const client = useApolloClient(); // Alustetaan "client" muuttuja, joka suorittaa kyseisen funktion.
  const authStorage = useAuthStorage(); // Alustetaan "authStorage" muuttuja, joka suorittaa kyseisen funktion.

  const checkCurrentUser = useQuery(GET_CURRENT_USER_DATA); // Alustetaan "checkCurrentUser" muuttuja, joka suorittaa kyseisen queryn.
  const [currentUser, setCurrentUser] = useState(null); // Alustetaan "currentUser" muuttuja tilaan, joka saa oletuksena arvon "null".

  // Komponentti suorittaa kyseisen "useEffect(...)" funktion aina, kun
  // tapahtuu muutoksia "checkCurrentUser.data" muuttujan osalta.
  useEffect(() => {
    if (checkCurrentUser.data) {
      setCurrentUser(checkCurrentUser.data.authorizedUser); // Muutetaan "currentUser" muuttujan arvo => "checkCurrentUser.data.authorizedUser" arvoon.
    }
  }, [checkCurrentUser.data]);

  // Alustetaan "handleUserLogout" muuttuja, joka suorittaa {...} sisällä olevat asiat
  // aina, kun kyseiseen funktioon tehdään viittaus. Funktion avulla varmistetaan, että
  // aina kun kirjautunut käyttäjä haluaa kirjautua ulos, niin poistetaan sekä
  // välimuistista (cache) että local storagesta kirjautuneen käyttäjän data pois.
  const handleUserLogout = async () => {
    await authStorage.removeAccessToken(); // Suoritetaan "authStorage.js" tiedostossa oleva => "removeAccessToken(...)" funktio.
    setCurrentUser(null); // Muutetaan "currentUser" muuttujan tilaa alkuperäiseen arvoon eli "null".
    // Alla oleva funktio siis poistaa kaiken datan välimuistista (cache)
    // ja suorittaa uudestaan kaikki "aktiiviset" queryt eli tässä tapauksessa
    // hakee kaikki "repositories" arvot palvelimesta ja näyttää ne takaisin
    // käyttäjälle näkyviin. Tämän avulla voidaan siis varmistaa, että sen
    // hetkisen kirjautuneen käyttäjän data ei jää välimuistiin "roikkumaan".
    client.resetStore();
  };

  // Jos "currentUser" muuttuja on muuta kuin arvoa "null", niin komponentti renderöi
  // (...) sisällä olevat asiat takaisin käyttäjälle näkyviin.
  if (currentUser !== null) {
    return (
      <View style={{flexDirection: 'row'}}>
        <Pressable>
          <Link to="/CreateReview">
            <Text style={styles.containerTitle}>Create a review</Text>
          </Link>
        </Pressable>
        <Pressable>
          <Link to="/">
            <Text onPress={handleUserLogout} style={styles.containerTitle}>Logout</Text>
          </Link>
        </Pressable>
      </View>
    );
  };

  // Muussa tapauksessa komponentti renderöi (...) sisällä olevat asiat takaisin käyttäjälle näkyviin.
  return (
    <View style={{flexDirection: 'row'}}>
      <Pressable>
        <Link to="/login">
          <Text style={styles.containerTitle}>Login</Text>
        </Link>
      </Pressable>
      <Pressable>
        <Link to="/CreateUser">
          <Text style={styles.containerTitle}>Sign Up</Text>
        </Link>
      </Pressable>
    </View>
  );
};

// Alustetaan "AppBar" niminen komponentti, joka suorittaa {...} sisällä olevat asiat
// aina kun kyseiseen komponenttiin tehdään viittaus. Tehtävää "Exercise 10.7: scrollable app bar"
// varten lisätty alla olevaan koodiin "ScrollView" komponentti, tämän avulla jos lisäämme
// myöhemmin "liikaa linkkejä", niin käyttäjällä on mahdollisuus "scrollata" sivuttain,
// jotta näkee kaikki muut linkit. Ilman tätä linkit jäisivät näytön ulkopuolelle ja sitä
// kautta ei olisi käyttäjällä mahdollisuutta esim. kirjautua ulos yms. Muutettu tehtävää
// "Exercise 10.16: sign out" varten alla olevaa koodia niin, että "CheckUserStatus" komponentti
// renderöi joko "Login" tai "Logout" tekstin sen perusteella, että onko sen hetkinen
// käyttäjä kirjautunut sovellukseen vai ei.
const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Pressable onPress={() => console.log('Repositories text was clicked!')}>
          <Link to="/">
            <Text style={styles.containerTitle}>Repositories</Text>
          </Link>
        </Pressable>
        <CheckUserStatus />
      </ScrollView>
    </View>
  );
};

// Viedään (export) alla oleva komponentti (AppBar) sovelluksen käytettäväksi, jotta esim. "App.js" tiedosto pystyy suorittamaan kyseiset funktiot.
export default AppBar;
