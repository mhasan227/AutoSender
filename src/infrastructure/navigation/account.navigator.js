import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SignUpScreen} from '../../features/Accounts/screens/Sign-Up.screen';
import {LogInScreen} from '../../features/Accounts/screens/Log-In.screen';
import {Options} from '../../features/Accounts/screens/Options.screen';
import {ProfilesNavigator} from './Profiles.navigator';
const Account = createStackNavigator();

export const AccountNavigator = () => (
  <Account.Navigator screenOptions={{headerShown: false}}>
    <Account.Screen name="Options" component={Options} />
    <Account.Screen name="SignUp" component={SignUpScreen} />
    <Account.Screen name="LogIn" component={LogInScreen} />
    <Account.Screen name="Home" component={ProfilesNavigator} />
  </Account.Navigator>
);
