import React, {useEffect, useContext} from 'react';
import axios from 'axios';
import {StyleSheet, View, Text, ActivityIndicator} from 'react-native';
import {AppContext} from '../context/AppContext';
import {Theme, Enums} from '../constants';

const LoadingScreen = ({navigation}) => {
  const {setCardsWithMechanics} = useContext(AppContext);
  const getUniqueMechanicsFrom = function (data) {
    let uniqueMechanicsNames = [];

    data.forEach(item => {
      item.mechanics.forEach(mechanic => {
        if (uniqueMechanicsNames.includes(mechanic.name) === false) {
          uniqueMechanicsNames.push(mechanic.name);
        }
      });
    });

    return uniqueMechanicsNames;
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      axios({
        method: 'GET',
        url: `https://${Enums.SECRETS.RAPIDAPI_HOST}/cards`,
        headers: {
          'x-rapidapi-key': Enums.SECRETS.RAPIDAPI_KEY,
          'x-rapidapi-host': Enums.SECRETS.RAPIDAPI_HOST,
        },
      })
        .then(response => {
          // returns response body as json object
          return response.data;
        })
        .then(json => {
          // eleminate cards type
          const cardsPool = Object.values(json);

          // remove empty arrays which coming from empty card types
          const reducer = (acc, currValue) => acc.concat(currValue);
          const cards = cardsPool.reduce(reducer, []);

          return cards;
        })
        .then(cards => {
          // returns cards which has mechanics
          return cards.filter(card => !!card.mechanics);
        })
        .then(cardsWithMechanics => {
          setCardsWithMechanics(cardsWithMechanics);
          return getUniqueMechanicsFrom(cardsWithMechanics);
        })
        .then(mechanicsNames => {
          navigation.push('Home', {mechanicsNames});
        })
        .catch(error => console.error(error));
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation, setCardsWithMechanics]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size={150} color={Theme.COLORS.WHITE} />
      <Text style={styles.txtLoading}>Mechanics are loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.COLORS.TINT_BLUE,
  },
  txtLoading: {
    marginTop: 24,
    fontSize: 24,
    color: Theme.COLORS.WHITE,
  },
});

export default LoadingScreen;
