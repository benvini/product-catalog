import React from 'react';
import { useColorScheme } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';

import AppNavigator from './ts/navigation/AppNavigator';
import { loadTheme } from './ts/shared/theme';
import store from './ts/store/store';

const App = () => {
  const colorScheme = useColorScheme();  
  const theme = loadTheme(colorScheme || 'light');

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <AppNavigator/>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
