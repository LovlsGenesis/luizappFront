import React, {useCallback, useEffect, useState} from 'react';
import {
  RefreshControl,
  ScrollView,
  FlatList,
  StyleSheet,
  Text,
  View,
  Alert,
} from 'react-native';
import api from '../../services/api';
import TransactionComponent from '../../components/transactionComponent';
import TransactionTypeKey from '../../components/transactionTypeKey';
import Button from '../../components/button';
import {ITransaction, transactionTypeBackgroundColor} from '../../types';
import {Modal} from '../../components/modal';
import Input from '../../components/input';
import {useForm} from 'react-hook-form';
import {useAuth} from '../../context/AuthContext';

const Transaction = ({route}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const {control, handleSubmit, reset} = useForm();
  const [refreshing, setRefreshing] = useState(false);
  const [types, setTypes] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<ITransaction[]>(
    [] as ITransaction[],
  );
  const {id: childId, balance: defaultBalance, name} = route.params;
  const [balance, setBalance] = useState<number>(defaultBalance);
  const {localStorage: user} = useAuth();

  const getTypes = async () => {
    const {data} = await api.get('transactions/types');
    setTypes(
      Object.values(data).map(type => {
        return {
          name: type,
          code: type,
        };
      }),
    );
  };

  const getTransactions = async () => {
    const {data} = await api.get('/children/transactions', {
      params: {
        child: {
          id: childId,
        },
      },
    });
    setBalance(data.balance);
    setTransactions(data.transactions);
  };

  const newTransaction = async (params: any) => {
    try {
      const {data} = await api.post('transactions/new', {
        transaction: {
          type: params.type,
          value: params.value,
          parent_id: user?.id,
          description: params.description,
        },
        child: {
          id: childId,
        },
      });
      await getTransactions();
      reset();
      setModalVisible(!modalVisible);
      Alert.alert(data.message);
    } catch (error) {
      Alert.alert(error.response.data.message);
    }
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
      marginVertical: 10,
      flexGrow: 1,
      paddingBottom: 20,
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
    <View style={{flex: 1}}>
      <Modal isVisible={modalVisible}>
        <Modal.Container>
          <Modal.Header title="Create new transaction" />
          <Modal.Body>
            <Input
              type="select"
              name="type"
              options={types}
              control={control}
            />
            <Input name="value" control={control} keyboardType="numeric" />
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
                  reset();
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
      <View>
        {/* <ScrollView
          contentContainerStyle={style.scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {transactions.length === 0 ? (

          ) : (
            transactions.map(transaction => (
              <TransactionComponent
                {...transaction}
                key={transaction.id}
                // key={transaction.id.toString()}
              />
            ))
          )}
        </ScrollView> */}
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={style.scrollView}
          data={transactions}
          renderItem={({item, index}) => (
            <TransactionComponent
              {...item}
              key={index}
              // key={transaction.id.toString()}
            />
          )}
          ListEmptyComponent={
            <Text style={style.noTransactions}>{name} has no transaction</Text>
          }
        />
      </View>
    </View>
  );
};

export default Transaction;
