import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {AppContext} from '../context/AppContext';
import {Theme} from '../constants';
import {AllCards} from '../api';

const LoadingScreen = ({navigation}) => {
  const [errorMessage, setErrorMessage] = useState(null);
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
    // fetch all cards
    AllCards()
      .then(cardsWithMechanics => {
        setCardsWithMechanics(cardsWithMechanics);
        return getUniqueMechanicsFrom(cardsWithMechanics);
      })
      .then(mechanicsNames => {
        navigation.push('Home', {mechanicsNames});
      })
      .catch(error => {
        setErrorMessage(error.message || 'An error occured!');
      });
  }, [errorMessage, navigation, setCardsWithMechanics]);

  const _onRefreshPress = () => {
    setErrorMessage(null);
  };

  const renderError = () => {
    return (
      <>
        <Text>{errorMessage}</Text>
        <TouchableOpacity style={styles.button} onPress={_onRefreshPress}>
          <Text>Refresh</Text>
        </TouchableOpacity>
      </>
    );
  };

  const renderLoading = () => {
    return (
      <>
        <ActivityIndicator size={150} color={Theme.COLORS.WHITE} />
        <Text style={styles.txtLoading}>Mechanics are loading...</Text>
      </>
    );
  };

  return (
    <View style={styles.container}>
      {errorMessage ? renderError() : renderLoading()}
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
  button: {
    backgroundColor: Theme.COLORS.WHITE,
    padding: 10,
    marginTop: 20,
  },
});

export default LoadingScreen;
