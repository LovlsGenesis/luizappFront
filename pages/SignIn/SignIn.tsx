import React from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import Input from '../../components/input';
import {useForm} from 'react-hook-form';
import Button from '../../components/button';
import {useAuth} from '../../context/AuthContext';

const SignIn = ({navigation}: any) => {
  const {control, handleSubmit, reset} = useForm();

  const {signIn} = useAuth();

  const handleSignIn = (params: any) => {
    try {
      signIn({id: params.id, password: params.password});
      reset();
    } catch (error) {
      Alert.alert(error.response.data.message);
    }
  };

  const style = StyleSheet.create({
    container: {
      flex: 1,
    },
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
  });

  return (
    <View style={style.form}>
      <Text style={style.title}>Luizapp</Text>
      {/* <Text style={style.signIn}>Sign in</Text> */}
      <View style={style.input}>
        <Input name="id" control={control} />
        <Input name="password" control={control} secured={true} />
      </View>
      <Button text="Sign In" displayFunction={handleSubmit(handleSignIn)} />
    </View>
  );
};

export default SignIn;
