/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import type {Node} from 'react';
import {LogBox} from 'react-native';
import AppNavigator from './src/navigations';
import AppContextProvider from './src/context/AppContext';
import codePush from 'react-native-code-push';
import _ from 'lodash';

const App: () => Node = () => {
  // hide warnings
  useEffect(() => {
    // Ignore yellow box warnings
    LogBox.ignoreLogs(['Animated: `useNativeDriver` was not specified.']);
    // Ignore console log warnings
    const _console = _.clone(console);
    console.warn = message => {
      if (message.indexOf('useNativeDriver') <= -1) {
        _console.warn(message);
      }
    };
  }, []);
  return (
    <AppContextProvider>
      <AppNavigator />
    </AppContextProvider>
  );
};

export default codePush(App);
