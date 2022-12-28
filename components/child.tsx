import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Transaction from '../pages/Transaction/Transaction';

import {IChild} from '../types/types';

const Child = ({id, name, balance}: IChild, navigate) => {
  const childStyle = StyleSheet.create({
    child: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '75%',
      backgroundColor: 'grey',
      padding: 15,
      margin: 5,
      borderRadius: 25,
    },
    name: {
      fontSize: 24,
    },
    balance: {
      fontSize: 18,
      alignSelf: 'center',
    },
  });

  const handleOnPress = () => {
    console.log(
      // RootNavigation,
      navigate('Transaction', {}),
    );
    navigate(Transaction, {});
  };

  return (
    <TouchableOpacity style={childStyle.child} onPress={handleOnPress}>
      <Text style={childStyle.name}>{name}</Text>
      <Text style={childStyle.balance}>{balance} ⭐</Text>
    </TouchableOpacity>
  );
};

export default Child;
