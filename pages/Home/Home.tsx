import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  Alert,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useTranslation} from 'react-i18next';

import api from '../../services/api';

import {childSchema} from '../../types/schemaValidations';
import {IChild, IFormData, IParent, primary, secondary} from '../../types';
import {handleApiError} from '../../types/ApiError';

import Child from '../../components/child';
import Input from '../../components/input';
import InputError from '../../components/InputError';
import Button from '../../components/button';
import {Modal} from '../../components/modal';
import {useAuth} from '../../context/AuthContext';
import {useIsFocused} from '@react-navigation/native';

const Home = ({navigation}: any) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<IFormData>({
    resolver: yupResolver(childSchema),
  });
  const [parents, setParents] = useState<IParent[]>([]);
  const isFocused = useIsFocused();
  const {i18n} = useTranslation(['home', 'button', 'input']);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [child, setChild] = useState<IChild[]>([] as IChild[]);
  const {localStorage: user} = useAuth();

  const getChild = async () => {
    try {
      const {data} = await api.get(`parents/${user?.id}/children`);
      setChild(data.child);
    } catch (error) {
      handleApiError(error);
    }
  };

  const newChild = async ({name, parent}: IFormData) => {
    try {
      const {data} = await api.post('children', {
        child: {
          name: name,
          parent_ids: [user?.id, parent],
        },
      });

      await getChild();
      reset();
      Alert.alert(data.message);
    } catch (error) {
      handleApiError(error);
    }
    setModalVisible(!modalVisible);
  };

  const getParents = async () => {
    try {
      const {data} = await api.get<IParent[]>('parents');
      const removingUser = data.filter((dataInfo: IParent) => {
        return dataInfo.id !== user?.id;
      });
      setParents(
        Object.values(removingUser).map(({name, id}): IParent => {
          return {
            name: name,
            code: id,
          } as IParent;
        }),
      );
    } catch (error) {}
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await getParents();
    await getChild();
    setRefreshing(false);
  };

  const homeStyle = StyleSheet.create({
    container: {
      height: '100%',
      backgroundColor: secondary,
    },
    childList: {
      justifyContent: child.length === 1 ? 'flex-start' : 'space-evenly',
      alignItems: 'center',
      margin: 10,
      paddingTop: 5,
      paddingBottom: 25,
    },
    welcome: {
      alignSelf: 'center',
      fontSize: 24,
      color: primary,
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
      justifyContent: 'flex-end',
      alignItems: 'center',
      marginVertical: 5,
      marginHorizontal: 10,
    },
  });

  useEffect(() => {
    if (isFocused) {
      getChild();
      getParents();
    }
  }, [isFocused]);

  return (
    <View>
      <Modal isVisible={modalVisible}>
        <Modal.Container>
          <Modal.Header title={i18n.t('button.createNewChild')} />
          <Modal.Body>
            <Controller
              name="name"
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <Input
                  name={i18n.t('input.name')}
                  value={value}
                  color="secondary"
                  onChange={onChange}
                  onBlur={onBlur}
                />
              )}
            />
            {errors.name && <InputError message={errors.name?.message} />}

            <Controller
              name="parent"
              control={control}
              render={({field: {onChange, value}}) => (
                <Input
                  name={i18n.t('input.parent')}
                  type="select"
                  options={parents}
                  value={value}
                  color="secondary"
                  onChange={onChange}
                />
              )}
            />
          </Modal.Body>
          <Modal.Footer>
            <View style={homeStyle.buttons}>
              <Button
                text={i18n.t('button.createNewChild')}
                type="secondary"
                displayFunction={handleSubmit(newChild)}
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

      <View style={homeStyle.container}>
        <Text style={homeStyle.welcome}>
          {i18n.t('home.welcome', {name: user?.name})}
        </Text>
        <View style={homeStyle.header}>
          <Button
            displayFunction={() => setModalVisible(!modalVisible)}
            text={i18n.t('button.newChildButton')}
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
