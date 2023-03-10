import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import Routes from './routes';
import {AuthProvider} from './context/AuthContext';
import './i18n';

const App = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
