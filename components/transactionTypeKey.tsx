import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

type IKey = {
  color: string;
  text: string;
};

const TransactionTypeKey = ({color, text}: IKey) => {
  const test = StyleSheet.create({
    test: {
      height: 15,
      width: 15,
      borderColor: 'black',
      borderWidth: 1,
      backgroundColor: color,
      marginRight: 5,
      alignSelf: 'center',
    },
    viewStyle: {
      flexDirection: 'row',
    },
  });

  return (
    <View style={test.viewStyle}>
      <View style={test.test} />
      <Text>{text}</Text>
    </View>
  );
};

export default TransactionTypeKey;
