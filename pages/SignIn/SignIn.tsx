import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useTranslation} from 'react-i18next';

import api from '../../services/api';
import {useAuth} from '../../context/AuthContext';

import Button from '../../components/button';
import Input from '../../components/input';
import InputError from '../../components/InputError';
import {loginSchema} from '../../types/schemaValidations';
import {IFormData, IParent, primary, secondary, third} from '../../types';

const SignIn = ({navigation}: any) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<IFormData>({resolver: yupResolver(loginSchema)});
  const [parents, setParents] = useState<IParent[]>([]);
  const isFocused = useIsFocused();
  const {i18n} = useTranslation(['signIn', 'button', 'input']);
  const {signIn} = useAuth();

  const handleSignIn = ({login, password}: IFormData) => {
    try {
      signIn({id: login, password: password});
      reset();
    } catch (error) {}
  };

  const getParents = async () => {
    try {
      const {data} = await api.get<IParent[]>('parents');
      setParents(
        Object.values(data).map(({name, id}): IParent => {
          return {
            name: name,
            code: id,
          } as IParent;
        }),
      );
    } catch (error) {}
  };

  const handleSignUp = () => {
    navigation.navigate('Register');
  };

  const style = StyleSheet.create({
    title: {
      fontSize: 48,
      fontWeight: '500',
      textAlign: 'center',
      marginBottom: 60,
      color: primary,
    },
    signIn: {
      fontSize: 24,
      textAlign: 'center',
    },
    container: {
      backgroundColor: secondary,
    },
    form: {
      justifyContent: 'center',
      alignSelf: 'center',
      height: '100%',
      width: '85%',
    },
    input: {
      marginVertical: 20,
    },
    forgotPass: {
      textAlign: 'center',
      marginTop: 10,
      color: secondary,
    },
    buttons: {
      justifyContent: 'space-between',
      height: 90,
    },
  });

  useEffect(() => {
    if (isFocused) {
      getParents();
    }
  }, [isFocused]);

  return (
    <View style={style.container}>
      <View style={style.form}>
        <Text style={style.title}>Luizapp</Text>
        {/* <Text style={style.signIn}>Sign in</Text> */}
        <View style={style.input}>
          <Controller
            name="login"
            control={control}
            render={({field: {onChange, value}}) => (
              <Input
                name={i18n.t('input.login')}
                placeholder={false}
                type="select"
                options={parents}
                onChange={onChange}
                value={value}
              />
            )}
          />
          {errors.login && <InputError message={errors.login?.message} />}

          <Controller
            control={control}
            name="password"
            render={({field: {onChange, value}}) => (
              <Input
                name={i18n.t('input.password')}
                secured={true}
                onChange={onChange}
                value={value}
              />
            )}
          />
          {errors.password && <InputError message={errors.password?.message} />}

          <Text style={style.forgotPass}>{i18n.t('signIn.forgotPass')}</Text>
        </View>
        <View style={style.buttons}>
          <Button
            text={i18n.t('button.signIn')}
            type="third"
            displayFunction={handleSubmit(handleSignIn)}
          />
          <Button
            text={i18n.t('button.createNewAccount')}
            type="primary"
            displayFunction={handleSignUp}
          />
        </View>
      </View>
    </View>
  );
};

export default SignIn;
