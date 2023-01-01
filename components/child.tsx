import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {IChild} from '../types';

const Child = ({id, name, balance}: IChild) => {
  const navigation = useNavigation();

  const childStyle = StyleSheet.create({
    child: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '75%',
      maxHeight: 65,
      backgroundColor: 'grey',
      padding: 15,
      margin: 5,
      borderRadius: 5,
    },
    name: {
      fontSize: 24,
    },
    balance: {
      fontSize: 18,
      alignSelf: 'center',
    },
  });

  return (
    <TouchableOpacity
      style={childStyle.child}
      onPress={() => navigation.navigate('Transaction', {id, balance, name})}>
      <Text style={childStyle.name}>{name}</Text>
      <Text style={childStyle.balance}>{balance} ⭐</Text>
    </TouchableOpacity>
  );
};

export default Child;
