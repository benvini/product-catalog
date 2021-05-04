import React from 'react';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import { Platform } from 'react-native';

import ProductDetailScreen from '../screens/ProductDetailScreen/ProductDetailScreen';
import { ProductsCatalogScreen } from '../screens/ProductsCatalogScreen/components';
import {PRIMARY} from '../styles/color';

const defaultNavOptions: StackNavigationOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? PRIMARY : 'white'
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : PRIMARY,
  headerTitleStyle: {
    alignSelf: 'center'
  }
};

const opacityTransition: object = {
  gestureDirection: 'horizontal',  
  transitionSpec: {
    open: {
      animation: 'timing',
    },
    close: {
      animation: 'timing',
      config: {
        duration: 600,
      },
    },
  },
  cardStyleInterpolator: ({ current } : {current: {progress: number}}) => ({
    cardStyle: {
      opacity: current.progress,
    }, 
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