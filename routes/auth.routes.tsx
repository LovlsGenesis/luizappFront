import React from 'react';
import SignIn from '../pages/SignIn/SignIn';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Register from '../pages/Register/Register';

const AuthStack = createNativeStackNavigator();

const AuthRoutes = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen
      name="SignIn"
      component={SignIn}
      options={{headerShown: false}}
    />
    <AuthStack.Screen
      name="Register"
      component={Register}
      options={{headerShown: false}}
    />
  </AuthStack.Navigator>
);

export default AuthRoutes;
