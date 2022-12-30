import React, {useCallback, useEffect, useState} from 'react';
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert,
} from 'react-native';
import api from '../../services/api';
import TransactionComponent from '../../components/transactionComponent';
import TransactionTypeKey from '../../components/transactionTypeKey';
import Button from '../../components/button';
import {ITransaction, transactionTypeBackgroundColor} from '../../types/types';

const Transaction = ({route}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [transactions, setTransactions] = useState<ITransaction[]>(
    [] as ITransaction[],
  );
  const {id, balance, name} = route.params;
  const getTransactions = async () => {
    const {data} = await api.get('/children/transactions', {
      params: {
        child: {
          id,
        },
      },
    });
    setTransactions(data.transactions);
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await getTransactions();
    setRefreshing(false);
  }, []);

  const style = StyleSheet.create({
    KeysView: {
      flexDirection: 'row',
      width: '50%',
      justifyContent: 'space-between',
      alignSelf: 'center',
      marginTop: 10,
      marginBottom: 10,
    },
    noTransactions: {
      fontSize: 24,
    },
    scrollView: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 10,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 5,
      marginHorizontal: 10,
    },
    balance: {
      fontSize: 20,
      fontWeight: '500',
    },
  });

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <View>
      <View style={style.header}>
        <Text style={style.balance}>Balance: {balance} ⭐</Text>
        <Button
          text="New Transaction"
          type="primary"
          displayFunction={() => Alert.alert('Hello World')}
        />
      </View>
      <View style={style.KeysView}>
        <TransactionTypeKey
          color={transactionTypeBackgroundColor.task}
          text="Task"
        />
        <TransactionTypeKey
          color={transactionTypeBackgroundColor.trade}
          text="Trade"
        />
        <TransactionTypeKey
          color={transactionTypeBackgroundColor.penalty}
          text="Penalty"
        />
      </View>
      <View style={{height: '90%'}}>
        <ScrollView
          contentContainerStyle={style.scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {transactions.length === 0 ? (
            <Text style={style.noTransactions}>{name} has no transaction</Text>
          ) : (
            transactions.map(transaction => (
              <TransactionComponent
                {...transaction}
                key={transaction.id}
                // key={transaction.id.toString()}
              />
            ))
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default Transaction;
