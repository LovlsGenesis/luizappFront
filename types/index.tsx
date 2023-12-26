import {ReactNode} from 'react';
import {KeyboardTypeOptions} from 'react-native';

export const primary = '#2F2032';
export const secondary = '#E0D3DE';
export const third = '#75507C';

export const task = '#43C76A';
export const penalty = '#F72C25';
export const trade = '#F7B32B';

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
  trade: trade,
  penalty: penalty,
  task: task,
};

export type IButton = {
  text: string;
  displayFunction: Function;
  type?: string;
};

export const buttonTypeColor = {
  primary: primary,
  secondary: secondary,
};

export const buttonTextColor = {
  primary: secondary,
  secondary: primary,
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
