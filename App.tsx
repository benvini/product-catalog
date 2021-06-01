import React, {useEffect, useState} from 'react';
import {useColorScheme} from 'react-native';
import {ThemeProvider} from 'styled-components/native';
import {Provider} from 'react-redux';
import {loadLocale} from './ts/shared/utils/locale';
import {getLocales} from 'react-native-localize';

import AppNavigator from './ts/navigation/AppNavigator';
import {loadTheme} from './ts/shared/theme';
import store from './ts/store/store';

const App = () => {
  const colorScheme = useColorScheme();
  const [isLoading, setIsLoading] = useState(true);
  const [{languageCode, isRTL}] = getLocales();
  const theme = loadTheme(colorScheme || 'light', isRTL);

  useEffect(() => {
    (async () => {
      loadLocale(languageCode);
      setIsLoading(false);
    })();
  }, [languageCode]);

  if (isLoading) {
    return null;
  }

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <AppNavigator />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
