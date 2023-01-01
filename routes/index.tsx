import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {useAuth} from '../context/AuthContext';
import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';

const Routes = () => {
  const {signed, loading} = useAuth();

  const style = StyleSheet.create({
    loading: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  });

  if (loading) {
    return (
      <View style={style.loading}>
        <ActivityIndicator size="large" color="#666" />
      </View>
    );
  }

  return signed ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
