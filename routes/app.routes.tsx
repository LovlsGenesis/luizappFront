import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import Transaction from '../pages/Transaction/Transaction';
import Home from '../pages/Home/Home';
// import Mathematic from '../pages/Mathematic/Mathematic';
import {useTranslation} from 'react-i18next';
import {useAuth} from '../context/AuthContext';

// const AppStack = createNativeStackNavigator();
const AppStack = createDrawerNavigator();

const AppRoutes = () => {
  const {i18n} = useTranslation(['home', 'button', 'input']);
  const {signOut} = useAuth();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <AppStack.Navigator
      drawerContent={props => {
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem
              label={i18n.t('button.signOut')}
              onPress={() => handleSignOut()}
            />
          </DrawerContentScrollView>
        );
      }}>
      <AppStack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <AppStack.Screen
        name="Transaction"
        component={Transaction}
        options={{drawerItemStyle: {display: 'none'}}}
      />
      {/* <AppStack.Screen
        name={i18n.t('screens.mathematic')}
        component={Mathematic}
      /> */}
    </AppStack.Navigator>
  );
};

export default AppRoutes;
