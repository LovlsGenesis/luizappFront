import {Control} from 'react-hook-form';

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
  control: Control;
  name: string;
  secured?: boolean;
};
