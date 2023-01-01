import React from 'react';
import api from '../../services/api';
import {useForm} from 'react-hook-form';
import {View, Alert, StyleSheet} from 'react-native';
import Input from '../../components/input';
import {useTranslation} from 'react-i18next';
import Button from '../../components/button';

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
  });

  return (
    <View style={style.form}>
      <View style={style.input}>
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
      </View>
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
  );
};

export default Register;
