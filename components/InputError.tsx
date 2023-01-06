import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {IInputError} from '../types';
import {useTranslation} from 'react-i18next';

const InputError = ({message}: IInputError) => {
  const {i18n} = useTranslation('errors');

  const style = StyleSheet.create({
    error: {
      alignSelf: 'center',
      color: '#FF375B',
      marginBottom: 0,
    },
  });

  return <Text style={style.error}>{i18n.t(message)}</Text>;
};

export default InputError;
