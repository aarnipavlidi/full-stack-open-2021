import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import Constants from 'expo-constants'; // Otetaan käyttöön "Constants" komponentti => "expo-constants" kirjaston kautta sovelluksen käytettäväksi.

const httpLink = createHttpLink({
  // Tehtävää varten "Exercise 10.12: environment variables" varten lisätty tiedostoon
  // "app.config.js" uusi objektin arvo "extra", jonka sisältä löytyy "server" arvo,
  // joka on yhtä kuin => "process.env.APOLLO_URI". Ja kyseiseen arvoon pääsemme
  // käsiksi käyttämällä "Constants" funktiota ja => "manifest.extra.server".
  uri: Constants.manifest.extra.server,
});

const createApolloClient = () => {
  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
