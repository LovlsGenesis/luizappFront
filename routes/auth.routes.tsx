import React from 'react';
import SignIn from '../pages/SignIn/SignIn';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

const AuthStack = createNativeStackNavigator();

const AuthRoutes = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen
      name="SignIn"
      component={SignIn}
      options={{headerShown: false}}
    />
  </AuthStack.Navigator>
);

export default AuthRoutes;
