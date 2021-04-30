 import React from 'react';
 import {useColorScheme} from 'react-native';
 import {ThemeProvider} from 'styled-components/native';
 import {NavigationContainer} from '@react-navigation/native';
 import {loadTheme} from './ts/shared/theme';
 import MainScreen from './ts/screens/MainScreen/components/MainScreen';

 const App = () => {
  const colorScheme = useColorScheme();
  const theme = loadTheme(colorScheme || 'light');

   return (
    <ThemeProvider theme={theme}>
    <NavigationContainer>
      <MainScreen />
    </NavigationContainer>
  </ThemeProvider>
   );
 };

 export default App;
