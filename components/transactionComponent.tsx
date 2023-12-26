import React from 'react';
import {Text, StyleSheet, View} from 'react-native';

import {
  ITransaction,
  secondary,
  third,
  transactionTypeBackgroundColor,
} from '../types';

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
      width: '95%',
      maxHeight: 65,
      backgroundColor: third,
      padding: 15,
      margin: 1.5,
      borderRadius: 5,
      borderBottomWidth: 2,
      borderBottomColor: transactionTypeBackgroundColor[type],
    },
    name: {
      fontSize: 12,
      color: secondary,
      overflow: 'scroll',
    },
    balance: {
      color: secondary,
      flexDirection: 'row',
      fontSize: 18,
      textAlign: 'center',
      marginLeft: 'auto',
    },
    infos: {
      color: secondary,
      alignSelf: 'center',
      width: '70%',
    },
    parent: {
      color: secondary,
    },
  });

  return (
    <View style={transactionStyle.transaction}>
      <View style={transactionStyle.infos}>
        <Text style={transactionStyle.name}>
          {description || 'Sem Descrição'}
        </Text>
        <Text style={transactionStyle.parent}>{parent}</Text>
      </View>
      <Text style={transactionStyle.balance}>{value} ⭐</Text>
    </View>
  );
};

export default TransactionComponent;
