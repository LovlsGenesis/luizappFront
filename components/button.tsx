import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';

import {IButton, buttonTypeColor} from '../types';

const Button = ({text, displayFunction, type = 'primary'}: IButton) => {
  const handleOnPress = () => {
    displayFunction();
  };

  const style = StyleSheet.create({
    button: {
      backgroundColor: buttonTypeColor[type],
      padding: 10,
      elevation: 4,
      borderRadius: 5,
      minWidth: 100,
    },
    text: {
      fontWeight: '500',
      textAlign: 'center',
      color: 'white',
    },
  });
  return (
    <View>
      <TouchableOpacity style={style.button} onPress={handleOnPress}>
        <Text style={style.text}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Button;
