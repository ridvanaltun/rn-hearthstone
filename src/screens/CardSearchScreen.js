import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {Enums} from '../constants';
import {FlipCard} from '../components';

const CardSearchScreen = ({navigation}) => {
  const [searchedCards, setSearchedCards] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errorText, setErrorText] = useState('');

  const handleSearch = txt => {
    setSearchText(txt);
    setIsLoading(true);
    setError(null);

    fetch(`https://${Enums.SECRETS.RAPIDAPI_HOST}/cards/search/${txt}`, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': Enums.SECRETS.RAPIDAPI_KEY,
        'x-rapidapi-host': Enums.SECRETS.RAPIDAPI_HOST,
      },
    })
      .then(response => {
        // check request errors
        if (response.status === 404) {
          throw new Error('No card found!');
        } else if (response.status !== 200) {
          throw new Error('Promise chain cancelled');
        }

        return response;
      })
      .then(response => response.json())
      .then(json =>
        Object.values(json).reduce(
          (accumulator, currValue) => accumulator.concat(currValue),
          [],
        ),
      )
      .then(cards => {
        setSearchedCards(cards);
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
        setErrorText(err.message);
        setError(err);
        console.error(err);
      });
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={80} color="black" />
          <Text style={styles.txtLoading}>Cards loading...</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 18}}>{errorText}</Text>
        </View>
      );
    }

    return (
      <View>
        <FlatList
          data={searchedCards}
          initialNumToRender={4}
          windowSize={6}
          onEndReachedThreshold={0.5}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({item, index}) => <FlipCard card={item} />}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={queryText => handleSearch(queryText)}
        value={searchText}
      />
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    alignItems: 'center',
  },
  input: {
    padding: 10,
    width: '80%',
    borderWidth: 1,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtLoading: {
    marginTop: 24,
    fontSize: 18,
  },
});

export default CardSearchScreen;
