import React from 'react';
import {Text, StyleSheet, View} from 'react-native';

import {ITransaction, transactionTypeBackgroundColor} from '../types';

const TransactionComponent = ({
  type,
  description,
  value,
  parent,
}: ITransaction) => {
  const transactionStyle = StyleSheet.create({
    transaction: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '75%',
      maxHeight: 65,
      backgroundColor: transactionTypeBackgroundColor[type],
      padding: 15,
      margin: 5,
      borderRadius: 25,
      borderWidth: 1,
    },
    name: {
      fontSize: 12,
      color: 'black',
      overflow: 'scroll',
    },
    balance: {
      flexDirection: 'row',
      fontSize: 18,
      textAlign: 'center',
      marginLeft: 'auto',
    },
    infos: {
      alignSelf: 'center',
      width: '70%',
    },
  });

  return (
    <View style={transactionStyle.transaction}>
      <View style={transactionStyle.infos}>
        <Text style={transactionStyle.name}>
          {description || 'Sem Descrição'}
        </Text>
        <Text>{parent}</Text>
      </View>
      <Text style={transactionStyle.balance}>{value} ⭐</Text>
    </View>
  );
};

export default TransactionComponent;
