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
  Text,
  View,

} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';


import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainNavigator from './src/assets/navigation/MainNavigation';
import WebView from 'react-native-webview';
const Stack = createNativeStackNavigator();



function App() {
  // const videoUrl = 'https://www.artmostfair.online/iframe/vod/b7afe08b198ce4e24ed73fff160c0be7/5fc4a3dd-a2c7-4313-b383-737a31a3f00d';

  return (
    <>
    <StatusBar translucent={true} backgroundColor={'transparent'} />
       <NavigationContainer>
        <MainNavigator/>
      </NavigationContainer> 
        {/* <View style={{flex:1}}>
          <Text>Hello</Text>
      <WebView
        source={{ uri: videoUrl }}
        allowsFullscreenVideo={true}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
    </View> */}
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
