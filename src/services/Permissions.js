import {PermissionsAndroid} from 'react-native';
import React, {useState, useContext} from 'react';
import ReactNativeForegroundService from '@supersami/rn-foreground-service';
import RNLocation from 'react-native-location';
export const permissionHandle = async () => {
  try {
    const backgroundgranted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
      {
        title: 'Background Location Permission',
        message:
          'We need access to your location ' +
          'so you can get live quality updates.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (backgroundgranted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('granted Permission');
    }
  } catch (err) {
    console.log('error 2');
    console.warn(err);
  }
};
export const getLocationPermission = async () => {
  RNLocation.requestPermission({
    ios: 'whenInUse',
    android: {
      detail: 'fine',
    },
  }).then(granted => {});
};
export const isLocationAccepted = async setAccepted => {
  //result would be false if not granted and true if required permission is granted.

  const result = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
  );
  setAccepted(result);
  return result;
};
export const isSMSAccepted = async setAccepted => {
  //result would be false if not granted and true if required permission is granted.

  const result = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.SEND_SMS,
  );
  setAccepted(result);
  return result;
};
export const isContactsAccepted = async setAccepted => {
  //result would be false if not granted and true if required permission is granted.

  const result = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
  );
  setAccepted(result);
  return result;
};
export const sendDirectSmsText = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.SEND_SMS,
      {
        title: 'YourProject App Sms Permission',
        message:
          'YourProject App needs access to your inbox ' +
          'so you can send messages in background.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      //DirectSms.sendDirectSms('07307363306', 'This is a direct message');
    } else {
      console.log('SMS permission denied');
    }
  } catch (err) {
    console.log('error 2');
    console.warn(err);
  }
};
export const getContactsPermission = async () => {
  try {
    const permission = PermissionsAndroid.PERMISSIONS.READ_CONTACTS;
    await PermissionsAndroid.request(permission);
    Promise.resolve();
  } catch (error) {
    Promise.reject(error);
  }
};

export const sendDirectSms = async () => {
  try {
    const permission = PermissionsAndroid.PERMISSIONS.SEND_SMS;
    await PermissionsAndroid.request(permission);
    Promise.resolve();
  } catch (error) {
    Promise.reject(error);
  }
};
