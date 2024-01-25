/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,

} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import Dashboard from './src/screens/Dashboard';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainNavigator from './src/assets/navigation/MainNavigation';
const Stack = createNativeStackNavigator();



function App() {


  return (
    <>
    <StatusBar translucent={true} backgroundColor={'transparent'} />
       <NavigationContainer>
        <MainNavigator/>
      </NavigationContainer> 
      </>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
