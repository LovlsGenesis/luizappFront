import React, {useState} from 'react';
import {TextInput, Text, View, StyleSheet} from 'react-native';
import {useController} from 'react-hook-form';

import {IInput} from '../types/types';

const Input = ({name, control, secured = false, type, options}: IInput) => {
  const [selectedType, setSelectedType] = useState('');

  const Select = () => {};

  const {field} = useController({
    control,
    defaultValue: '',
    name,
  });

  const inputStyle = StyleSheet.create({
    input: {
      width: '75%',
      borderColor: 'black',
      borderWidth: 1,
      paddingHorizontal: 5,
      paddingVertical: 2,
      alignSelf: 'center',
    },
    margin5: {
      margin: 5,
    },
    text: {
      textAlign: 'center',
    },
  });

  return (
    <View style={inputStyle.margin5}>
      <Text style={(inputStyle.margin5, inputStyle.text)}>
        {name[0].toUpperCase() + name.substr(1)}
      </Text>
      <TextInput
        value={field.value}
        onChangeText={field.onChange}
        secureTextEntry={secured}
        style={inputStyle.input}
      />
      {type === 'select' && <Select />}
    </View>
  );
};
export default Input;
