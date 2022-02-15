import {StatusBar as ExpoStatusBar} from 'expo-status-bar';
import {Navigation} from './src/infrastructure/navigation';
import React, {useState, useEffect} from 'react';
import {ThemeProvider} from 'styled-components/native';

import {theme} from './src/infrastructure/theme';
import {Text} from 'react-native';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {AuthenticationContextProvider} from './src/services/authentication/authentication.context';

import {TutorialContextProvider} from './src/services/tutorial/tutorial.context';
const paperTheme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#90bae1',
    secondary: '#b0d3f0',
    accent: '#35495e',
  },
};
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
export default function App() {
  return (
    <>
      <PaperProvider theme={paperTheme}>
        <ThemeProvider theme={theme}>
          <AuthenticationContextProvider>
            <TutorialContextProvider>
              <Navigation />
            </TutorialContextProvider>
          </AuthenticationContextProvider>
        </ThemeProvider>
        <ExpoStatusBar style="auto" />
      </PaperProvider>
    </>
  );
}
