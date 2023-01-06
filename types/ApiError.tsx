import {IError} from './index';

export function isApiError(x: unknown): x is IError {
  if (x && typeof x === 'object' && 'message' in x && 'errors' in x) {
    return true;
  }
  return false;
}
