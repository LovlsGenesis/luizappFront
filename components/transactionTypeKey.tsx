import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {primary} from '../types';

type IKey = {
  color: string;
  text: string;
};

const TransactionTypeKey = ({color, text}: IKey) => {
  const TransactionTypeKeyStyle = StyleSheet.create({
    box: {
      height: 15,
      width: 15,
      borderColor: primary,
      borderWidth: 1,
      backgroundColor: color,
      marginRight: 5,
      alignSelf: 'center',
    },
    viewStyle: {
      flexDirection: 'row',
    },
    text: {
      color: primary,
    },
  });

  return (
    <View style={TransactionTypeKeyStyle.viewStyle}>
      <View style={TransactionTypeKeyStyle.box} />
      <Text style={TransactionTypeKeyStyle.text}>{text}</Text>
    </View>
  );
};

export default TransactionTypeKey;
