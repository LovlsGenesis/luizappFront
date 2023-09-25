import React from 'react';
import {View, Text} from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

const TransactionPopupMenu = ({children}) => (
  <View style={{alignSelf: 'flex-start'}}>
    <Menu>
      <MenuTrigger>{children}</MenuTrigger>
      <MenuOptions>
        <MenuOption onSelect={() => {}} text="Editar" />
        <MenuOption onSelect={() => {}}>
          <Text style={{color: 'red'}}>Apagar</Text>
        </MenuOption>
      </MenuOptions>
    </Menu>
  </View>
);

export default TransactionPopupMenu;
