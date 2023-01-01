import React from 'react';
import api from '../../services/api';
import {useForm} from 'react-hook-form';
import {View, Alert, Button} from 'react-native';
import Input from '../../components/input';
import {useTranslation} from 'react-i18next';

const Register = ({navigation}: any) => {
  const {control, handleSubmit} = useForm();
  const {i18n} = useTranslation(['button', 'input']);

  const onSubmit = async (params: any) => {
    try {
      const {data} = await api.post('parents/new', {
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

  return (
    <View style={{padding: 15}}>
      <Input
        name="type"
        type="select"
        options={[
          {name: 'Father', code: 'father'},
          {name: 'Mother', code: 'mother'},
        ]}
        control={control}
      />
      <Input name="name" control={control} />
      <Input name="password" control={control} secured={true} />
      <Button
        title={i18n.t('button.submit')}
        onPress={handleSubmit(onSubmit)}
      />
      <Button
        title={i18n.t('button.signIn')}
        onPress={() => {
          navigation.navigate('SignIn');
        }}
      />
    </View>
  );
};

export default Register;
