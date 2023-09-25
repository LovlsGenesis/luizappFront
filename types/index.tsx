import {ReactNode} from 'react';
import {KeyboardTypeOptions} from 'react-native';

export type IChild = {
  id?: number;
  name: string;
  balance: number;
  navigate?: any;
};

export type ITransaction = {
  id: number;
  type: string;
  value: number;
  balance_id: number;
  parent: string;
  description: string | null;
  created_at: Date;
  updated_at: Date;
};

type TransactionTypeBackgroundColor = {
  [key: string]: string;
};

export const transactionTypeBackgroundColor: TransactionTypeBackgroundColor = {
  trade: '#FEBE8C',
  penalty: '#FF6464',
  task: '#B3FFAE',
};

export type IButton = {
  text: string;
  displayFunction: Function;
  type?: string;
};

export const buttonTypeColor = {
  danger: 'red',
  primary: '#2196F3',
};

export type IInput = {
  type?: string;
  options?: any[];
  name: string;
  secured?: boolean;
  keyboardType?: KeyboardTypeOptions;
  placeholder?: boolean;
  value: string | number;
  onChange: () => void;
  onBlur?: () => void;
};

export type IUser = {
  id: number;
  name: string;
};

export type IParent = {
  name: string;
  code: number;
  id?: number;
};

export type ILocalStorage = {
  token: string;
  exp: Date;
  user: IUser;
};

export type IError = {
  response: {
    data: {
      message: string;
      errors: string | string[];
    };
  };
};

export type AuthContextData = {
  loading: boolean;
  signed: boolean;
  localStorage: IUser | null;
  signIn(credentials: any): Promise<void>;
  signOut(): void;
};

export type AuthProviderProps = {
  children: ReactNode;
};

export type IInputError = {
  message?: any;
};

export type IFormData = {
  name: string;
  login: number;
  password: string;
  value: number;
  description: string;
  parent: number;
  type: string;
};

export type Error = {
  response: {
    data: {
      message: string;
      errors: string | string[];
    };
  };
};
