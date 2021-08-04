// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react'; // Otetaan käyttöön "react" niminen kirjasto sovelluksen käytettäväksi.
import { FlatList, Text, View } from 'react-native'; // Otetaan käyttöön kyseiset komponentit "react-native" kirjaston kautta sovelluksen käytettäväksi.
import { render } from '@testing-library/react-native'; // Otetaan käyttöön kyseiset funktiot "@testing-library/react-native" kirjaston kautta sovelluksen käytettäväksi.

// Alustetaan "ItemSeparator" niminen komponentti, joka suorittaa (...) sisällä olevat
// asiat aina, kun kyseiseen komponenttiin tehdään viittaus. Komponentti saa myös
// käyttöönsä ({...}) sisällä olevat parametrien arvot. Nämä viittaavaat "repositories"
// muuttujan kautta tulevan datan objektien arvoihin, jonka kautta "RepositoryItem"
// komponentti pystyy renderöidään jokaisen "uniikin arvon" omalle "laatikolle".
const ItemSeparator = ({ fullName, description, language, forksCount, stargazersCount, ratingAverage, reviewCount }) => (
  <View>
    <Text>{fullName}</Text>
    <Text>{description}</Text>
    <Text>{language}</Text>
    <Text>{stargazersCount}</Text>
    <Text>{forksCount}</Text>
    <Text>{reviewCount}</Text>
    <Text>{ratingAverage}</Text>
  </View>
);

// Alustetaan "RepositoryItem" niminen komponentti, joka suorittaa {...} sisällä olevat asiat aina,
// kun kyseiseen komponenttiin tehdään viittaus. Komponentin ideana on siis renderöidä jokainen arvo
// "repositories" muuttujan kautta tulevasta datasta takaisin käyttäjälle näkyviin. Komponentti
// "ItemSeparator" määrittää tyylin, jokaiselle eri arvolle, jonka kautta tämä komponentti pääsee
// käsiksi "item" parametrin avulla.
const RepositoryItem = ({ item }) => {
  return (
    <View testID="checkRenderedData">
      <Text>{item.fullName}</Text>
      <Text>{item.description}</Text>
      <Text>{item.language}</Text>
      <Text>{item.stargazersCount}</Text>
      <Text>{item.forksCount}</Text>
      <Text>{item.reviewCount}</Text>
      <Text>{item.ratingAverage}</Text>
    </View>
  );
};

// Alustetaan "RenderRepositoryList" komponentti, joka suorittaa {...}
// sisällä olevat asiat aina, kun kyseiseen komponenttiin tehdään viittaus.
const RenderRepositoryList = ({ repositories }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={RepositoryItem}
      />
    );
  };

  // Testin avulla tarkistetaan, että kun renderöidään "RenderRepositoryList" komponentti, niin
  // varmistetaan, että sen kautta tuleva data on oikean pituinen sekä arvoista löytyy oikeat arvot.
  describe('RepositoryList', () => {
    describe('RepositoryListContainer', () => {
      it('renders repository information correctly', () => {
        const repositories = {
          totalCount: 8,
          pageInfo: {
            hasNextPage: true,
            endCursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
            startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          edges: [
            {
              node: {
                id: 'jaredpalmer.formik',
                fullName: 'jaredpalmer/formik',
                description: 'Build forms in React, without the tears',
                language: 'TypeScript',
                forksCount: 1619,
                stargazersCount: 21856,
                ratingAverage: 88,
                reviewCount: 3,
                ownerAvatarUrl:
                  'https://avatars2.githubusercontent.com/u/4060187?v=4',
              },
              cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
            },
            {
              node: {
                id: 'async-library.react-async',
                fullName: 'async-library/react-async',
                description: 'Flexible promise-based React data loader',
                language: 'JavaScript',
                forksCount: 69,
                stargazersCount: 1760,
                ratingAverage: 72,
                reviewCount: 3,
                ownerAvatarUrl:
                  'https://avatars1.githubusercontent.com/u/54310907?v=4',
              },
              cursor:
                'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
            },
          ],
        };

        // Alustetaan "getAllByTestId" funktio, ja renderöidään kyseinen komponentti
        // takaisin, kun suoritetaan testiä. Komponentti hyödyntää "repositories"
        // muuttujan kautta tulevaa dataa, muiden komponenttien osalta.
        const { getAllByTestId } = render(<RenderRepositoryList repositories={repositories}/>);

        // Alustetaan muuttuja "checkData", joka hakee rendöidystä komponentista elementin,
        // jonka id:n arvo on yhtä kuin => "checkRenderedData".
        const checkData = getAllByTestId('checkRenderedData');

        expect(checkData).toHaveLength(2); // Tarkistetaan, että "checkData" muuttujan pituus on yhtä kuin kaksi (2).

        // Tarkistetaan, että ensimmäisestä elementistä => "<View>...</View>" löytyy alla
        // olevat tekstit. Jos kyseisiä arvoja ei löydy, niin testi epäonnistuu.
        expect(checkData[0]).toHaveTextContent('jaredpalmer/formik');
        expect(checkData[0]).toHaveTextContent('Build forms in React, without the tears');
        expect(checkData[0]).toHaveTextContent('TypeScript');

        // Tarkistetaan, että toisesta elementistä => "<View>...</View>" löytyy alla
        // olevat tekstit. Jos kyseisiä arvoja ei löydy, niin testi epäonnistuu.
        expect(checkData[1]).toHaveTextContent('async-library/react-async');
        expect(checkData[1]).toHaveTextContent('Flexible promise-based React data loader');
        expect(checkData[1]).toHaveTextContent('JavaScript');
      });
    });
  });
