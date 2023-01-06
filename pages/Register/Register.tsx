import React from 'react';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {View, Alert, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';

import api from '../../services/api';

import Input from '../../components/input';
import Button from '../../components/button';
import InputError from '../../components/InputError';
import {registerSchema} from '../../types/schemaValidations';
import {IFormData} from '../../types';
import {isApiError} from '../../types/ApiError';

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
      const {data} = await api.post('parents/new', {
        parent: {
          type: type,
          name: name,
          password: password,
        },
      });
      navigation.navigate('SignIn');
      Alert.alert(data.message);
    } catch (error) {
      if (isApiError(error)) {
        const {message, errors: apiErrors} = error.response.data;
        Alert.alert(message, `${apiErrors}`);
      }
    }
  };

  const style = StyleSheet.create({
    form: {
      flex: 1,
      justifyContent: 'center',
      alignSelf: 'center',
      width: '80%',
    },
    input: {
      marginVertical: 20,
    },
    buttons: {
      justifyContent: 'space-between',
      height: 90,
    },
  });

  return (
    <View style={style.form}>
      <View style={style.input}>
        <Controller
          control={control}
          name="type"
          render={({field: {onChange, value}}) => (
            <Input
              name={i18n.t('input.type')}
              type="select"
              options={[
                {name: 'Father', code: 'father'},
                {name: 'Mother', code: 'mother'},
              ]}
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
          displayFunction={handleSubmit(onSubmit)}
        />
        <Button
          text={i18n.t('button.signIn')}
          displayFunction={() => {
            navigation.navigate('SignIn');
          }}
        />
      </View>
    </View>
  );
};

export default Register;
