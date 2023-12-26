import {Alert} from 'react-native';
import {IError} from './index';

export function handleApiError(error: unknown) {
  if (isApiError(error)) {
    const {message, errors: apiErrors} = error.response.data;
    Alert.alert(message, `${apiErrors}`);
  }
}

export function isApiError(x: unknown): x is IError {
  if (x && typeof x === 'object' && 'message' in x && 'errors' in x) {
    return true;
  }
  return false;
}
