import React from 'react';
import 'react-native-gesture-handler';

import {NavigationContainer} from '@react-navigation/native';
import {MenuProvider} from 'react-native-popup-menu';

import Routes from './routes';
import {AuthProvider} from './context/AuthContext';
import './i18n';
// import NavigationDrawer from './sidemenu';

const App = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <MenuProvider>
          <Routes />
        </MenuProvider>
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
