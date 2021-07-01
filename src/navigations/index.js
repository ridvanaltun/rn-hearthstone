import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Screens from '../screens';
import {SearchButton} from '../components';

const Stack = createStackNavigator();

const initialRouteName = 'Loading';

export default function () {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRouteName}>
        <Stack.Screen
          name="Loading"
          component={Screens.LoadingScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={Screens.HomeScreen}
          options={{
            headerLeft: null,
            title: 'Mechanics',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerRight: () => <SearchButton />,
          }}
        />
        <Stack.Screen
          name="CardSearch"
          component={Screens.CardSearchScreen}
          options={{
            title: 'Card Search',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="MechanicCards"
          component={Screens.MechanicCardsScreen}
          options={({route}) => ({
            title: route.params.mechanicName,
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
