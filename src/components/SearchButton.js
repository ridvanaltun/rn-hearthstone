import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const SearchButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('CardSearch')}>
      <Text style={styles.searchText}>Search</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 15,
  },
  searchText: {},
});

export default SearchButton;
