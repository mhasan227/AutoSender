import React, {useState} from 'react';
import {Text} from 'react-native';
import {Permission} from '../components/permission.component';
import {permissionHandle} from '../../../services/Permissions';
import {
  isLocationAccepted,
  isSMSAccepted,
  isContactsAccepted,
} from '../../../services/Permissions';
export const checkPermission = ({navigation}) => {
  const [acceptedLocation, setAcceptedLocation] = useState(false);
  const [acceptedSMS, setAcceptedSMS] = useState(false);
  const [acceptedContacts, setAcceptedContacts] = useState(false);
  isLocationAccepted(setAcceptedLocation);
  isSMSAccepted(setAcceptedSMS);
  isContactsAccepted(setAcceptedContacts);
  if (
    acceptedLocation === true &&
    acceptedSMS === true &&
    acceptedContacts === true
  ) {
    navigation.navigate('ProfilesHomePermission');
  } else {
    navigation.navigate('LocationPermission');
  }

  return <Text>Loading</Text>;
};
