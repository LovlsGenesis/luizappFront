import React from 'react';
import api from '../../services/api';
import {useForm} from 'react-hook-form';
import {View, Alert, Button} from 'react-native';
import Input from '../../components/input';

const Register = () => {
  const {control, handleSubmit} = useForm();
  const onSubmit = async (params: any) => {
    try {
      const {data} = await api.post('api/parents/new', {
        parent: {
          type: params.type,
          name: params.name,
          password: params.password,
        },
      });
      Alert.alert(data.message);
    } catch (error) {
      const data = error.response.data;
      Alert.alert(data.message, `${data.errors}`);
    }
  };

  const handleSignUp = () => {};

  return (
    <View style={{padding: 15}}>
      <Input name="type" control={control} />
      <Input name="name" control={control} />
      <Input name="password" control={control} secured={true} />
      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
      <Button title="Sign Up" onPress={handleSignUp()} />
    </View>
  );
};

export default Register;
