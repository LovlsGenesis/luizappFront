import React from 'react';
import {Alert, Text, View} from 'react-native';
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

  return (
    <View>
      <Text>Sign in</Text>
      <Input name="id" control={control} />
      <Input name="password" control={control} secured={true} />
      <Button text="Sign In" displayFunction={handleSubmit(handleSignIn)} />
    </View>
  );
};

export default SignIn;
