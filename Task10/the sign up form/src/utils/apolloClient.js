// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import Constants from 'expo-constants'; // Otetaan käyttöön "Constants" komponentti => "expo-constants" kirjaston kautta sovelluksen käytettäväksi.
import { setContext } from '@apollo/client/link/context'; // Alustetaan "setContext" funktio, joka hyödyntää kyseisen kirjaston sisältöä sovelluksen aikana.

const httpLink = createHttpLink({
  // Tehtävää varten "Exercise 10.12: environment variables" varten lisätty tiedostoon
  // "app.config.js" uusi objektin arvo "extra", jonka sisältä löytyy "server" arvo,
  // joka on yhtä kuin => "process.env.APOLLO_URI". Ja kyseiseen arvoon pääsemme
  // käsiksi käyttämällä "Constants" funktiota ja => "manifest.extra.server".
  uri: Constants.manifest.extra.server,
});

// Alustetaan "createApolloClient" muuttuja, joka suorittaa {...} sisällä olevat asiat aina,
// kun kyseiseen funktioon tehdään viittaus. Funktiolle annetaan myös parametrin "authStorage" arvo.
const createApolloClient = (authStorage) => {
  const authLink = setContext(async (_, { headers }) => {
    try {
      const accessToken = await authStorage.getAccessToken();
      return {
        headers: {
          ...headers,
          authorization: accessToken ? `Bearer ${accessToken}` : '',
        },
      };
    } catch (e) {
      console.log(e);
      return {
        headers,
      };
    }
  });
  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};

// Viedään (export) alla oleva muuttuja (createApolloClient) sovelluksen käytettäväksi, jotta esim. "App.js" tiedosto pystyy suorittamaan kyseiset funktiot.
export default createApolloClient;
