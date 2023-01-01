import {Control} from 'react-hook-form';
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

export const transactionTypeBackgroundColor = {
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
  control: Control;
  name: string;
  secured?: boolean;
  keyboardType?: KeyboardTypeOptions;
  placeholder?: boolean;
};

export type IUser = {
  id: number;
  name: string;
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
