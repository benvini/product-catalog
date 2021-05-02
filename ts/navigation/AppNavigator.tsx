import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import ProductsNavigator from './ProductsNavigator';

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <ProductsNavigator/>
    </NavigationContainer>
  );
};

export default AppNavigator;
