import React from 'react';
import {TextInput, Text, View, StyleSheet} from 'react-native';
import Dropdown from 'react-native-input-select';

import {IInput, buttonTextColor, buttonTypeColor, secondary} from '../types';
import {useTranslation} from 'react-i18next';

const Input = ({
  name,
  secured = false,
  type,
  options,
  keyboardType = 'default',
  placeholder,
  value,
  color = secondary,
  onChange,
  onBlur,
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
        selectedValue={value}
        onValueChange={onChange}
        primaryColor={'green'}
      />
      {i18n.t('input.parent') === name && (
        <Text style={inputStyle.parentInfo}>{i18n.t('input.parentInfo')}</Text>
      )}
    </>
  );

  const inputStyle = StyleSheet.create({
    input: {
      width: '75%',
      borderColor: buttonTypeColor[color],
      borderBottomWidth: 1,
      paddingHorizontal: 5,
      paddingVertical: 2,
      alignSelf: 'center',
      color: buttonTypeColor[color],
    },
    margin5: {
      margin: 5,
    },
    text: {
      color: buttonTypeColor[color],
      textAlign: 'center',
    },
    dropdownContainer: {
      marginBottom: 10,
      width: '75%',
      alignSelf: 'center',
    },
    dropdown: {
      backgroundColor: buttonTypeColor[color],
      borderWidth: 0,
      borderBottomWidth: 1,
    },
    parentInfo: {
      textAlign: 'center',
      fontSize: 10,
      color: buttonTypeColor[color],
    },
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
          value={value}
          onChangeText={onChange}
          onBlur={onBlur}
          secureTextEntry={secured}
          style={inputStyle.input}
          keyboardType={keyboardType}
        />
      )}
    </View>
  );
};
export default Input;
