import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AppNavigator} from './app.navigator';
import {ProfilesNavigator} from './Profiles.navigator';
import {AccountNavigator} from './account.navigator';
import {Text} from 'react-native-paper';
import {AuthenticationContext} from '../../services/authentication/authentication.context';
import {TutorialContext} from '../../services/tutorial/tutorial.context';
import {TutorialNavigator} from './tutorial.navigator';
import {PermissionNavigator} from './permission.navigator';
import {isLocationAccepted2} from '../../services/Permissions';
export const Navigation = () => {
  const {user} = useContext(AuthenticationContext);
  const {Tutorial} = useContext(TutorialContext);
  const AllPermissionsAccepted = false;
  return (
    <>
      <NavigationContainer>
        {user && !Tutorial ? (
          !AllPermissionsAccepted ? (
            <PermissionNavigator />
          ) : (
            <AppNavigator />
          )
        ) : user && Tutorial ? (
          <TutorialNavigator />
        ) : (
          <AccountNavigator />
        )}
      </NavigationContainer>
    </>
  );
};
