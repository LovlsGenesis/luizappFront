import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {IUser, AuthContextData, AuthProviderProps} from '../types';
import {Alert} from 'react-native';

const AuthContext = createContext({} as AuthContextData);

function AuthProvider({children}: AuthProviderProps) {
  const [localStorage, setlocalStorage] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStorageData = async () => {
      const storageUser = await AsyncStorage.getItem('@Luizapp:user');
      const storageToken = await AsyncStorage.getItem('@Luizapp:token');

      if (storageUser && storageToken) {
        const {exp, token} = JSON.parse(storageToken);
        if (new Date() > new Date(exp)) {
          AsyncStorage.clear().then(() => {
            setlocalStorage(null);
            setLoading(false);
          });
          return;
        }
        api.defaults.headers.Authorization = `Bearer ${token}`;
        setlocalStorage(JSON.parse(storageUser));
      }
      setLoading(false);
    };
    loadStorageData();
  }, []);

  async function signIn({id, password}: any) {
    try {
      const {data} = await api.post('auth/sign_in', {
        parent: {
          id: id,
          password: password,
        },
      });

      setlocalStorage(data.user);

      api.defaults.headers.Authorization = `Bearer ${data.token}`;

      await AsyncStorage.setItem('@Luizapp:user', JSON.stringify(data.user));
      await AsyncStorage.setItem(
        '@Luizapp:token',
        JSON.stringify({token: data.token, exp: data.exp}),
      );
    } catch (error) {
      Alert.alert(error.response.data.message);
    }
  }

  const signOut = useCallback(() => {
    AsyncStorage.clear().then(() => {
      setlocalStorage(null);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{loading, signed: !!localStorage, localStorage, signIn, signOut}}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export {AuthProvider, useAuth};
