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
import {Modal} from '../../components/modal';
import Input from '../../components/input';
import {useForm} from 'react-hook-form';

type ITransactionForm = {
  type: string;
  value: number;
  description: string;
};

const Transaction = ({route}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const {control, handleSubmit} = useForm();
  const [refreshing, setRefreshing] = useState(false);
  const [types, setTypes] = useState<string[]>([]);
  const [transactions, setTransactions] = useState<ITransaction[]>(
    [] as ITransaction[],
  );
  const {id: childId, balance, name} = route.params;

  const getTypes = async () => {
    const {data} = await api.get('transactions/types');
    setTypes(Object.values(data));
  };

  const getTransactions = async () => {
    const {data} = await api.get('/children/transactions', {
      params: {
        child: {
          id: childId,
        },
      },
    });
    setTransactions(data.transactions);
  };

  const newTransaction = async params => {
    await api.post('transactions/new', {
      transaction: {
        type: params.type,
        value: params.value,
        parent_id: 1,
        description: params.description,
      },
      child: {
        id: childId,
      },
    });
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
    buttons: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },
  });

  useEffect(() => {
    getTransactions();
    getTypes();
  }, []);

  return (
    <View>
      <Modal isVisible={modalVisible}>
        <Modal.Container>
          <Modal.Header title="Create new child" />
          <Modal.Body>
            <Input
              type="select"
              name="type"
              options={types}
              control={control}
            />
            <Input name="value" control={control} />
            <Input name="description" control={control} />
          </Modal.Body>
          <Modal.Footer>
            <View style={style.buttons}>
              <Button
                text="Create new transaction"
                displayFunction={handleSubmit(newTransaction)}
              />
              <Button
                text="Cancel"
                type="danger"
                displayFunction={() => {
                  setModalVisible(!modalVisible);
                }}
              />
            </View>
          </Modal.Footer>
        </Modal.Container>
      </Modal>

      <View style={style.header}>
        <Text style={style.balance}>Balance: {balance} ⭐</Text>
        <Button
          text="New Transaction"
          type="primary"
          displayFunction={() => setModalVisible(true)}
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
