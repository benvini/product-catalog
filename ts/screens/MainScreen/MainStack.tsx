import React, {FunctionComponent} from 'react';
import {Main} from '../../shared/utils/routes';
import {createStackNavigator} from '@react-navigation/stack';
import {MainScreen} from './components';

const Stack = createStackNavigator<Main>();

const MainStack: FunctionComponent = () => {
  return (
    <Stack.Navigator initialRouteName="Main" headerMode="none" screenOptions={{animationEnabled: false}}>
      <Stack.Screen name="Main" component={MainScreen} />
    </Stack.Navigator>
  );
};

export default MainStack;
