import React from 'react';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import { Platform } from 'react-native';

import ProductDetailScreen from '../screens/ProductDetailScreen/ProductDetailScreen';
import { ProductsCatalogScreen } from '../screens/ProductsCatalogScreen/components';

const defaultNavOptions: StackNavigationOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? '#C2185B' : ''
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : '#C2185B',
  headerTitleStyle: {
    alignSelf: 'center'
  }
};

const opacityTransition: object = {
  gestureDirection: 'horizontal', // we will swipe right if we want to close the screen;  
  transitionSpec: {
    open: {
      animation: 'timing',
    },
    close: {
      animation: 'timing',
      config: {
        duration: 300,
      },
    },
  },
  cardStyleInterpolator: ({ current } : {current: {progress: number}}) => ({
    cardStyle: {
      opacity: current.progress,
    }, // updates the opacity depending on the transition progress value of the current screen
  }),
};

const ProductsStackNavigator = createStackNavigator();

const ProductsNavigator = () => {
  return (
    <ProductsStackNavigator.Navigator screenOptions={{...defaultNavOptions,...opacityTransition}}>
      <ProductsStackNavigator.Screen
        name="ProductsCatalog"
        component={ProductsCatalogScreen}
      />
      <ProductsStackNavigator.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
      />
    </ProductsStackNavigator.Navigator>
  );
};

export default ProductsNavigator;