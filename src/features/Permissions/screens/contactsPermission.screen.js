import React, {useState} from 'react';
import {Permission} from '../components/permission.component';
import {
  getContactsPermission,
  isContactsAccepted,
} from '../../../services/Permissions';
export const contactsPermission = ({navigation}) => {
  const [accepted, setAccepted] = useState(false);
  isContactsAccepted(setAccepted);
  if (accepted === true) {
    navigation.navigate('ProfilesHomePermission');
  }
  return (
    <Permission
      iconUrl={'contactsIcon'}
      permissionTitle={'Contacts Permission'}
      navigation={navigation}
      getPermission={getContactsPermission}
      nextPermission={() => {
        navigation.navigate('ProfilesHomePermission');
      }}
      permissionContext={
        'Auto-Sender collects SMS contacts data to enable us to get your contacts when the app is open'
      }
    />
  );
};
