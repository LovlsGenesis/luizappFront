import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import Input from '../../components/input';
import {useForm} from 'react-hook-form';
import Button from '../../components/button';
import {useAuth} from '../../context/AuthContext';
import {useTranslation} from 'react-i18next';
import api from '../../services/api';
import {useIsFocused} from '@react-navigation/native';

const SignIn = ({navigation}: any) => {
  const {control, handleSubmit, reset} = useForm();
  const [parents, setParents] = useState<any[]>([]);
  const isFocused = useIsFocused();

  const {i18n} = useTranslation(['signIn', 'button', 'input']);
  const {signIn} = useAuth();

  const handleSignIn = (params: any) => {
    try {
      signIn({id: params.login, password: params.password});
      reset();
    } catch (error) {
      Alert.alert(error.response.data.message);
    }
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

  const handleSignUp = () => {
    navigation.navigate('Register');
  };

  const style = StyleSheet.create({
    title: {
      fontSize: 48,
      fontWeight: '500',
      textAlign: 'center',
      marginBottom: 60,
    },
    signIn: {
      fontSize: 24,
      textAlign: 'center',
    },
    form: {
      flex: 1,
      justifyContent: 'center',
      alignSelf: 'center',
      width: '80%',
    },
    input: {
      marginVertical: 20,
    },
    forgotPass: {
      textAlign: 'center',
      marginTop: 10,
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
    <View style={style.form}>
      <Text style={style.title}>Luizapp</Text>
      {/* <Text style={style.signIn}>Sign in</Text> */}
      <View style={style.input}>
        <Input
          name="login"
          placeholder={false}
          type="select"
          options={parents}
          control={control}
        />
        <Input name="password" control={control} secured={true} />
        <Text style={style.forgotPass}>{i18n.t('signIn.forgotPass')}</Text>
      </View>
      <View style={style.buttons}>
        <Button
          text={i18n.t('button.signIn')}
          displayFunction={handleSubmit(handleSignIn)}
        />
        <Button
          text={i18n.t('button.createNewAccount')}
          displayFunction={handleSubmit(handleSignUp)}
        />
      </View>
    </View>
  );
};

export default SignIn;
