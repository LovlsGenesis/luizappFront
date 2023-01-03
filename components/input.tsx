import React from 'react';
import {TextInput, Text, View, StyleSheet} from 'react-native';
import {useController} from 'react-hook-form';
import Dropdown from 'react-native-input-select';

import {IInput} from '../types';
import {useTranslation} from 'react-i18next';

const Input = ({
  name,
  control,
  secured = false,
  type,
  options,
  keyboardType = 'default',
  placeholder,
}: IInput) => {
  const {i18n} = useTranslation(['transaction', 'button', 'transaction']);

  const Select = (): JSX.Element => (
    <>
      <Dropdown
        dropdownContainerStyle={inputStyle.dropdownContainer}
        dropdownStyle={inputStyle.dropdown}
        placeholder={
          placeholder
            ? i18n.t('input.selectPlaceholder', {
                type: name[0].toUpperCase() + name.substr(1),
              })
            : ''
        }
        options={options}
        optionLabel={'name'}
        optionValue={'code'}
        selectedValue={field.value}
        onValueChange={field.onChange}
        primaryColor={'green'}
      />
      {name === 'parent' && (
        <Text style={inputStyle.parentInfo}>{i18n.t('input.parentInfo')}</Text>
      )}
    </>
  );

  const {field} = useController({
    control,
    defaultValue: '',
    name,
  });

  const inputStyle = StyleSheet.create({
    input: {
      width: '75%',
      borderColor: 'black',
      borderBottomWidth: 1,
      paddingHorizontal: 5,
      paddingVertical: 2,
      alignSelf: 'center',
      color: 'black',
    },
    margin5: {
      margin: 5,
    },
    text: {
      textAlign: 'center',
    },
    dropdownContainer: {
      marginBottom: 10,
      width: '75%',
      alignSelf: 'center',
    },
    dropdown: {
      backgroundColor: 'white',
      borderWidth: 0,
      borderBottomWidth: 1,
    },
    parentInfo: {textAlign: 'center', fontSize: 10},
  });

  return (
    <View style={inputStyle.margin5}>
      <Text style={(inputStyle.margin5, inputStyle.text)}>
        {name[0].toUpperCase() + name.substr(1)}
      </Text>
      {type === 'select' ? (
        <Select />
      ) : (
        <TextInput
          value={field.value}
          onChangeText={field.onChange}
          secureTextEntry={secured}
          style={inputStyle.input}
          keyboardType={keyboardType}
        />
      )}
    </View>
  );
};
export default Input;
