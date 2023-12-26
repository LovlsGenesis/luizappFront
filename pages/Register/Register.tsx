import React from 'react';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {View, Alert, StyleSheet, Text} from 'react-native';
import {useTranslation} from 'react-i18next';

import api from '../../services/api';

import Input from '../../components/input';
import Button from '../../components/button';
import InputError from '../../components/InputError';
import {registerSchema} from '../../types/schemaValidations';
import {IFormData, primary, secondary} from '../../types';
import {handleApiError, isApiError} from '../../types/ApiError';

const Register = ({navigation}: any) => {
  const {i18n} = useTranslation(['button', 'input', 'errors']);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<IFormData>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async ({type, name, password}: IFormData) => {
    try {
      const {data} = await api.post('parents', {
        parent: {
          type: type,
          name: name,
          password: password,
        },
      });
      navigation.navigate('SignIn');
      Alert.alert(data.message);
    } catch (error) {
      handleApiError(error);
    }
  };

  const parentsType = [
    {name: i18n.t('input.father'), code: 'father'},
    {name: i18n.t('input.mother'), code: 'mother'},
  ];

  const style = StyleSheet.create({
    container: {
      backgroundColor: secondary,
    },
    form: {
      justifyContent: 'center',
      alignSelf: 'center',
      width: '80%',
      height: '100%',
    },
    input: {
      marginVertical: 20,
    },
    buttons: {
      justifyContent: 'space-between',
      height: 90,
    },
    title: {
      fontSize: 48,
      fontWeight: '500',
      textAlign: 'center',
      marginBottom: 60,
      color: primary,
    },
  });

  return (
    <View style={style.container}>
      <View style={style.form}>
        <Text style={style.title}>Luizapp</Text>
        <View style={style.input}>
          <Controller
            control={control}
            name="type"
            render={({field: {onChange, value}}) => (
              <Input
                name={i18n.t('input.type')}
                type="select"
                options={parentsType}
                value={value}
                onChange={onChange}
              />
            )}
          />
          {errors.type && <InputError message={errors.type?.message} />}

          <Controller
            control={control}
            name="name"
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                name={i18n.t('input.name')}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
              />
            )}
          />
          {errors.name && <InputError message={errors.name?.message} />}

          <Controller
            control={control}
            name="password"
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                name={i18n.t('input.password')}
                secured={true}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
              />
            )}
          />
          {errors.password && <InputError message={errors.password?.message} />}
        </View>
        <View style={style.buttons}>
          <Button
            text={i18n.t('button.submit')}
            type="third"
            displayFunction={handleSubmit(onSubmit)}
          />
          <Button
            text={i18n.t('button.back')}
            displayFunction={() => {
              navigation.navigate('SignIn');
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default Register;
