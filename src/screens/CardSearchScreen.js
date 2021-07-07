import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import axios from 'axios';
import {FlipCard} from '../components';
import {SearchCard} from '../api';

const CardSearchScreen = ({navigation}) => {
  const [searchedCards, setSearchedCards] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errorText, setErrorText] = useState('');
  const [lastSearchCancelSource, setLastSearchCancelSource] = useState(null);

  useEffect(() => {
    return () => {
      // prevent memory leak, cancel asynchronous tasks
      if (lastSearchCancelSource) {
        lastSearchCancelSource.cancel(
          'Operation canceled because component will unmount.',
        );
      }
    };
  });

  const handleSearch = txt => {
    setSearchText(txt);
    setIsLoading(true);
    setError(null);
    let newSearchCancelSource = null;

    // don't pass if no text given
    if (txt === '') {
      setSearchedCards([]);
      setIsLoading(false);

      // abort latest request
      if (lastSearchCancelSource) {
        lastSearchCancelSource.cancel('Empty search string, cancel search.');
        setLastSearchCancelSource(null);
      }

      return;
    }

    // to prevent multiple fetch
    if (lastSearchCancelSource) {
      lastSearchCancelSource.cancel('Operation canceled by the user.');
    }

    // create a new cancel source to use next request
    newSearchCancelSource = axios.CancelToken.source();
    setLastSearchCancelSource(newSearchCancelSource);

    SearchCard(txt, newSearchCancelSource)
      .then(cards => {
        setSearchedCards(cards);
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
        setErrorText(err.message);
        setError(err);
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
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errorText}</Text>
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
  },
});

export default CardSearchScreen;
