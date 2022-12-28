import React, {
  useCallback,
  useEffect,
  useState,
  Component,
  ComponentProps,
} from 'react';
import {
  Text,
  View,
  Button,
  ScrollView,
  Alert,
  StyleSheet,
  RefreshControl,
} from 'react-native';

import api from '../../services/api';

import {IChild} from '../../types/types';

import Child from '../../components/child';
import Input from '../../components/input';
import {useForm} from 'react-hook-form';

import {Modal} from '../../components/modal';

const Home = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [child, setChild] = useState<IChild[]>([
    {id: 0, name: 'Ana Luiza', balance: 5},
  ]);
  const {control, handleSubmit} = useForm();

  const getChild = async () => {
    try {
      const {data} = await api.get('parents/children', {
        params: {
          parent: {
            id: 1,
          },
        },
      });

      setChild(data.child);
    } catch (error) {
      const data = error.response.data;
      Alert.alert(data.message, `${data.errors}`);
    }
  };

  const newChild = async (params: any) => {
    try {
      const {data} = await api.post('children/new', {
        child: {
          name: params.name,
          parent_ids: [1],
        },
      });

      await getChild;
      Alert.alert(data.message);
    } catch (error) {
      const data = error.response.data;
      Alert.alert(data.message, `${data.errors}`);
    }
    setModalVisible(!modalVisible);
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await getChild;
    setRefreshing(false);
  }, []);

  const homeStyle = StyleSheet.create({
    container: {
      height: '100%',
    },
    childList: {
      justifyContent: 'space-evenly',
      alignItems: 'center',
      margin: 10,
      flexGrow: 1,
      minHeight: '90%',
    },
    welcome: {
      alignSelf: 'center',
    },
    button: {
      width: '25%',
      flex: 1,
    },
    buttons: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },
  });

  useEffect(() => {
    getChild();
  }, []);

  return (
    <View>
      <Modal isVisible={modalVisible}>
        <Modal.Container>
          <Modal.Header title="Create new child" />
          <Modal.Body>
            <Input name={'name'} control={control} />
          </Modal.Body>
          <Modal.Footer>
            <View style={homeStyle.buttons}>
              <Button
                title={'Create new child'}
                onPress={handleSubmit(newChild)}
              />
              <Button
                title={'Cancel'}
                color={'red'}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              />
            </View>
          </Modal.Footer>
        </Modal.Container>
      </Modal>

      <View style={homeStyle.container}>
        <Text style={homeStyle.welcome}>Welcome, Luana</Text>
        <Button
          onPress={() => setModalVisible(!modalVisible)}
          title="New Child"
        />
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={homeStyle.childList}>
          {child.map(({id, name, balance}) => (
            <Child
              id={id}
              name={name}
              balance={balance}
              key={`${name}${id}`}
              navigate={navigation}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default Home;
