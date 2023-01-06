import React, {useEffect, useState} from 'react';
import {
  RefreshControl,
  FlatList,
  StyleSheet,
  Text,
  View,
  Alert,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useAuth} from '../../context/AuthContext';
import {useTranslation} from 'react-i18next';

import api from '../../services/api';
import {
  IFormData,
  ITransaction,
  transactionTypeBackgroundColor,
} from '../../types';
import {transactionSchema} from '../../types/schemaValidations';

import TransactionComponent from '../../components/transactionComponent';
import TransactionTypeKey from '../../components/transactionTypeKey';
import Button from '../../components/button';
import {Modal} from '../../components/modal';
import Input from '../../components/input';
import InputError from '../../components/InputError';
import {isApiError} from '../../types/ApiError';

const Transaction = ({route}) => {
  const {i18n} = useTranslation(['transaction', 'button', 'transaction']);
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [types, setTypes] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<ITransaction[]>(
    [] as ITransaction[],
  );
  const {id: childId, balance: defaultBalance, name} = route.params;
  const [balance, setBalance] = useState<number>(defaultBalance);
  const {localStorage: user} = useAuth();
  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<IFormData>({
    resolver: yupResolver(transactionSchema),
  });

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

  const newTransaction = async ({type, value, description}: IFormData) => {
    try {
      const {data} = await api.post('transactions/new', {
        transaction: {
          type: type,
          value: value,
          parent_id: user?.id,
          description: description,
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
      if (isApiError(error)) {
        const {message} = error.response.data;
        Alert.alert(message);
      }
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await getTransactions();
    setRefreshing(false);
  };

  const style = StyleSheet.create({
    KeysView: {
      flexDirection: 'row',
      width: '65%',
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
          <Modal.Header title={i18n.t('button.createNewTransaction')} />
          <Modal.Body>
            <Controller
              name="type"
              control={control}
              render={({field: {onChange, value}}) => (
                <Input
                  type="select"
                  name={i18n.t('input.type')}
                  options={types}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
            {errors.type && <InputError message={errors.type?.message} />}

            <Controller
              name="value"
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <Input
                  name={i18n.t('input.value')}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  keyboardType="numeric"
                />
              )}
            />
            {errors.value && <InputError message={errors.value?.message} />}
            <Controller
              name="description"
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <Input
                  name={i18n.t('input.description')}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                />
              )}
            />
            {errors.description && (
              <InputError message={errors.description?.message} />
            )}
          </Modal.Body>
          <Modal.Footer>
            <View style={style.buttons}>
              <Button
                text={i18n.t('button.createNewTransaction')}
                displayFunction={handleSubmit(newTransaction)}
              />
              <Button
                text={i18n.t('button.cancel')}
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
        <Text style={style.balance}>
          {i18n.t('transaction.balance')}: {balance} ⭐
        </Text>
        <Button
          text={i18n.t('button.newTransactionButton')}
          type="primary"
          displayFunction={() => setModalVisible(true)}
        />
      </View>
      <View style={style.KeysView}>
        <TransactionTypeKey
          color={transactionTypeBackgroundColor.task}
          text={i18n.t('transaction.task')}
        />
        <TransactionTypeKey
          color={transactionTypeBackgroundColor.trade}
          text={i18n.t('transaction.trade')}
        />
        <TransactionTypeKey
          color={transactionTypeBackgroundColor.penalty}
          text={i18n.t('transaction.penalty')}
        />
      </View>
      <View>
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
            <Text style={style.noTransactions}>
              {i18n.t('transaction.noTransaction', {name: name})}
            </Text>
          }
        />
      </View>
    </View>
  );
};

export default Transaction;
