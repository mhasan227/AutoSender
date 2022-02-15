import React, {useState} from 'react';
import {Permission} from '../components/permission.component';
import {getLocationPermission} from '../../../services/Permissions';
import {isLocationAccepted} from '../../../services/Permissions';
export const locationPermission = ({navigation}) => {
  const [accepted, setAccepted] = useState(false);
  isLocationAccepted(setAccepted);
  if (accepted === true) {
    navigation.navigate('SMSPermission');
  }

  return (
    <Permission
      iconUrl={'locationIcon'}
      permissionTitle={'Location Permission'}
      navigation={navigation}
      getPermission={getLocationPermission}
      nextPermission={() => navigation.navigate('SMSPermission')}
      permissionContext={
        'Auto-Sender collects location data to enable us to send messages based on location even when the app is closed or not in use'
      }
    />
  );
};
