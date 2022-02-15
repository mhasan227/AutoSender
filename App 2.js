import {StatusBar as ExpoStatusBar} from 'expo-status-bar';
import {Navigation} from './src/infrastructure/navigation';
import React, {useState, useEffect} from 'react';
import {ThemeProvider} from 'styled-components/native';
import {theme} from './src/infrastructure/theme';
import {ProfilesContextProvider} from './src/services/profiles/profiles.context';
import {ContactsContextProvider} from './src/services/contacts/contacts.context';
import {MessagesContextProvider} from './src/services/messages/messages.context';
import {LocationsContextProvider} from './src/services/locations/locations.context';
import {GetAllPermissions} from './src/services/Permissions';
import Geolocation from 'react-native-geolocation-service';
import VIForegroundService from '@voximplant/react-native-foreground-service';
import {PermissionsAndroid, Button, AppRegistry} from 'react-native';

const permissionHandle = async () => {
  const backgroundgrantedcheck = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
  );
  const backgroundgranted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
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
    //do your thing!
  }
};

const getContactsPermission = async () => {
  try {
    const permission = PermissionsAndroid.PERMISSIONS.READ_CONTACTS;
    await PermissionsAndroid.request(permission);
    Promise.resolve();
  } catch (error) {
    Promise.reject(error);
  }
};
const channelConfig = {
  id: 'channelId',
  name: 'Channel name',
  description: 'Channel description',
  enableVibration: true,
};
VIForegroundService.createNotificationChannel(channelConfig);
startForegroundService = async () => {
  const notificationConfig = {
    channelId: 'channelId',
    id: 3456,
    title: 'Title',
    text: 'Some text',
    icon: 'ic_icon',
  };
  try {
    await VIForegroundService.startService(notificationConfig);
  } catch (e) {
    console.error(e);
  }
};

export default function App() {
  permissionHandle();
  getContactsPermission();
  startForegroundService();
  return (
    <ThemeProvider theme={theme}>
      <LocationsContextProvider>
        <MessagesContextProvider>
          <ContactsContextProvider>
            <ProfilesContextProvider>
              <Navigation />
              <ExpoStatusBar style="auto" />
            </ProfilesContextProvider>
          </ContactsContextProvider>
        </MessagesContextProvider>
      </LocationsContextProvider>
    </ThemeProvider>
  );
}
