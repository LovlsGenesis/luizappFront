import AsyncStorage from '@react-native-async-storage/async-storage';
import {ILocalStorage, IUser} from '../types';

const getLocalStorageData = async (): Promise<ILocalStorage | null> => {
  const userLocalStorageData = await AsyncStorage.getItem('@user');
  if (!userLocalStorageData) {
    return null;
  }
  return JSON.parse(userLocalStorageData);
};

const userData: IUser = getLocalStorageData();

export {getLocalStorageData, userData};
