import React, {useCallback, useEffect, useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  Alert,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import {useForm} from 'react-hook-form';

import api from '../../services/api';

import {IChild, IUser} from '../../types';

import Child from '../../components/child';
import Input from '../../components/input';
import Button from '../../components/button';
import {Modal} from '../../components/modal';
import {useAuth} from '../../context/AuthContext';

const Home = ({navigation}: any) => {
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [child, setChild] = useState<IChild[]>([] as IChild[]);
  const {control, handleSubmit, reset} = useForm();
  const {localStorage: user, signOut} = useAuth();
  const [parents, setParents] = useState<any[]>([]);

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
          parent_ids: [user?.id],
        },
      });

      await getChild();
      reset();
      Alert.alert(data.message);
    } catch (error) {
      const data = error.response.data;
      Alert.alert(data.message, `${data.errors}`);
    }
    setModalVisible(!modalVisible);
  };

  const getParents = async () => {
    try {
      const {data} = await api.get('parents');
      setParents(
        Object.values(data).map(type => {
          return {
            name: type.name,
            code: type.id,
          };
        }),
      );
    } catch (error) {}
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await getParents();
    await getChild();
    setRefreshing(false);
  }, []);

  const handleSignOut = () => {
    signOut();
  };

  const homeStyle = StyleSheet.create({
    container: {
      height: '100%',
    },
    childList: {
      justifyContent: child.length === 1 ? 'flex-start' : 'space-evenly',
      alignItems: 'center',
      margin: 10,
      paddingVertical: 5,
    },
    welcome: {
      alignSelf: 'center',
      fontSize: 24,
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
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 5,
      marginHorizontal: 10,
    },
  });

  useEffect(() => {
    getChild();
    getParents();
  }, []);

  return (
    <View>
      <Modal isVisible={modalVisible}>
        <Modal.Container>
          <Modal.Header title="Create new child" />
          <Modal.Body>
            <Input name="name" control={control} />
            <Input
              name="parent"
              type="select"
              options={parents}
              control={control}
            />
          </Modal.Body>
          <Modal.Footer>
            <View style={homeStyle.buttons}>
              <Button
                text="Create new child"
                displayFunction={handleSubmit(newChild)}
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

      <View style={homeStyle.container}>
        {/* <Button displayFunction={handleSignOut} text="Sign Out" /> */}
        <View style={homeStyle.header}>
          <Text style={homeStyle.welcome}>Welcome, {user?.name}</Text>
          <Button
            displayFunction={() => setModalVisible(!modalVisible)}
            text="New Child"
          />
        </View>
        <View style={{height: '85%'}}>
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
    </View>
  );
};

export default Home;
