import React, {useCallback, useEffect, useState} from 'react';
import {
  RefreshControl,
  FlatList,
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useAuth} from '../../context/AuthContext';
import {useTranslation} from 'react-i18next';

import api from '../../services/api';
import {
  IFormData,
  ITransaction,
  primary,
  secondary,
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
import {RouteProp, useRoute} from '@react-navigation/native';
import TransactionPopupMenu from '../../components/transactionPopupMenu';

const Transaction = () => {
  const route: RouteProp<{
    params: {id: number; balance: number; name: string};
  }> = useRoute();
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

  const getTypes = useCallback(async () => {
    const {data} = await api.get('transactions/types');
    setTypes(
      Object.values(data).map(type => {
        return {
          name: i18n.t(`transaction.${type}`),
          value: type,
          code: type,
        };
      }),
    );
  }, [i18n]);

  const getTransactions = useCallback(async () => {
    const {data} = await api.get(`/children/${childId}/transactions`);
    setBalance(data.balance);
    setTransactions(data.transactions);
  }, [childId]);

  const newTransaction = async ({type, value, description}: IFormData) => {
    try {
      const {data} = await api.post('transactions', {
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
    container: {
      flex: 1,
      backgroundColor: secondary,
    },
    KeysView: {
      flexDirection: 'row',
      width: '65%',
      justifyContent: 'space-between',
      alignSelf: 'center',
      marginTop: 10,
      marginBottom: 25,
      color: primary,
    },
    noTransactions: {
      fontSize: 24,
    },
    scrollView: {
      justifyContent: 'center',
      alignItems: 'center',
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
      color: primary,
    },
    buttons: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },
    touchableOpacity: {
      alignSelf: 'flex-start',
    },
  });

  useEffect(() => {
    getTransactions();
    getTypes();
  }, [getTransactions, getTypes]);

  return (
    <View style={style.container}>
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
                type="secondary"
              />
              <Button
                text={i18n.t('button.cancel')}
                type="primary"
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
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={style.scrollView}
        data={transactions}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onLongPress={() => {}}
            delayLongPress={1000}
            style={style.touchableOpacity}>
            <TransactionComponent
              {...item}
              key={index}
              // key={transaction.id.toString()}
            />
            {/* <TransactionPopupMenu>
                <TransactionComponent
                  {...item}
                  key={index}
                  // key={transaction.id.toString()}
                />
              </TransactionPopupMenu> */}
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={style.noTransactions}>
            {i18n.t('transaction.noTransaction', {name: name})}
          </Text>
        }
      />
    </View>
  );
};

export default Transaction;
