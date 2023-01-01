import React from 'react';
import Transaction from '../pages/Transaction/Transaction';
import Home from '../pages/Home/Home';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

const AppStack = createNativeStackNavigator();

const AppRoutes = () => (
  <AppStack.Navigator>
    <AppStack.Screen
      name="Home"
      component={Home}
      options={{headerShown: false}}
    />
    <AppStack.Screen name="Transaction" component={Transaction} />
  </AppStack.Navigator>
);

export default AppRoutes;
