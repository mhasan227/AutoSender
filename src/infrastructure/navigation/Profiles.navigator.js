import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {View} from 'react-native';
import {ProfilesScreen} from '../../features/Profiles/screens/Profiles.screen';
import {CreateProfilesScreen} from '../../features/Profiles/screens/Create-Profiles.screen';
import {AppsScreen} from '../../features/Profiles/screens/Apps.screen';
import {AddMessagesScreen} from '../../features/Profiles/screens/Add-Messages.screen';
import {SelectProfileTypeScreen} from '../../features/Profiles/screens/Select-ProfileType.screen';
import {SelectContactScreen} from '../../features/Profiles/screens/Select-Contact.screen';
import {SelectLocationScreen} from '../../features/Profiles/screens/Select-Location.screen';
import {TutorialNavigator} from './tutorial.navigator';
import {ProfilesContextProvider} from '../../services/profiles/profiles.context';

import {ContactsContextProvider} from '../../services/contacts/contacts.context';
import {MessagesContextProvider} from '../../services/messages/messages.context';
import {LocationsContextProvider} from '../../services/locations/locations.context';
import {ProfileTypeContextProvider} from '../../services/profile-type/profile-type.context';
import {DailyContextProvider} from '../../services/daily/daily.context';
const Stack = createStackNavigator();

export const ProfilesNavigator = () => (
  <DailyContextProvider>
    <ProfileTypeContextProvider>
      <LocationsContextProvider>
        <MessagesContextProvider>
          <ContactsContextProvider>
            <ProfilesContextProvider>
              <Stack.Navigator
                screenOptions={{
                  headerShown: false,
                }}>
                <Stack.Screen name="Profiles" component={ProfilesScreen} />
                <Stack.Screen
                  name="TutorialProfiles"
                  component={TutorialNavigator}
                />
                <Stack.Screen
                  name="SelectProfileType"
                  component={SelectProfileTypeScreen}
                />
                <Stack.Screen
                  name="Create Profile"
                  component={CreateProfilesScreen}
                />
                <Stack.Screen
                  name="Add Messages"
                  component={AddMessagesScreen}
                />
                <Stack.Screen
                  name="Select Contact"
                  component={SelectContactScreen}
                />
                <Stack.Screen
                  name="Select Location"
                  component={SelectLocationScreen}
                />
              </Stack.Navigator>
            </ProfilesContextProvider>
          </ContactsContextProvider>
        </MessagesContextProvider>
      </LocationsContextProvider>
    </ProfileTypeContextProvider>
  </DailyContextProvider>
);
