import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {TutorialScreen} from '../../features/Tutorial/screens/Tutorial.screen';
import {AppNavigator} from './app.navigator';
import {locationPermission} from '../../features/Permissions/screens/locationPermission.screen';
import {contactsPermission} from '../../features/Permissions/screens/contactsPermission.screen';
import {smsPermission} from '../../features/Permissions/screens/smsPermission.screen';
import {checkPermission} from '../../features/Permissions/screens/checkPermission.screen';
const PermissionNav = createStackNavigator();

export const PermissionNavigator = () => {
  return (
    <PermissionNav.Navigator screenOptions={{headerShown: false}}>
      <PermissionNav.Screen
        name="LocationPermission"
        component={locationPermission}
      />
      <PermissionNav.Screen name="SMSPermission" component={smsPermission} />

      <PermissionNav.Screen
        name="ContactsPermission"
        component={contactsPermission}
      />
      <PermissionNav.Screen
        name="ProfilesHomePermission"
        component={AppNavigator}
      />
    </PermissionNav.Navigator>
  );
};
