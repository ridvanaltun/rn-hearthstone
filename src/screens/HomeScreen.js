import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  BackHandler,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {Theme} from '../constants';

const HomeScreen = ({route, navigation}) => {
  const {mechanicsNames} = route.params;

  const backHandler = () => {
    // shut down the app
    BackHandler.exitApp();
    return true;
  };

  // back button handler
  useFocusEffect(() => {
    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      backHandler,
    );
    return () => subscription.remove();
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={mechanicsNames}
        renderItem={({item: mechanicName}) => {
          return (
            <TouchableOpacity
              style={styles.item}
              onPress={() => {
                navigation.navigate('MechanicCards', {mechanicName});
              }}>
              <Text style={styles.title}>{mechanicName}</Text>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item, index) => `${index}`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  item: {
    backgroundColor: Theme.COLORS.PINK,
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
  },
});

export default HomeScreen;
