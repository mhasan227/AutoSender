import React from 'react';
import Icon from 'react-native-ionicons';
import {ProfilesNavigator} from './Profiles.navigator';
import {Settings} from '../../features/Settings/screens/Settings.screen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ContactsContextProvider} from '../../services/contacts/contacts.context';
import {MessagesContextProvider} from '../../services/messages/messages.context';
import {LocationsContextProvider} from '../../services/locations/locations.context';
import {ProfileTypeContextProvider} from '../../services/profile-type/profile-type.context';
import {DailyContextProvider} from '../../services/daily/daily.context';
const Tab = createBottomTabNavigator();

const TAB_ICON = {
  Profiles: 'md-restaurant',
  Money: 'md-map',
};

const createScreenOptions = ({route}) => {
  const iconName = TAB_ICON[route.name];
  return {
    tabBarIcon: ({size, color}) => (
      <Icon name={iconName} size={size} color={color} />
    ),
  };
};
export const AppNavigator = () => {
  return (
    <DailyContextProvider>
      <ProfileTypeContextProvider>
        <LocationsContextProvider>
          <MessagesContextProvider>
            <ContactsContextProvider>
              <Tab.Navigator
                screenOptions={({route}) => ({
                  keyboardHidesTabBar: true,
                  headerShown: false,
                  tabBarIcon: ({focused, color, size}) => {
                    let iconName;

                    if (route.name === 'Home') {
                      iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Settings') {
                      iconName = focused ? 'settings' : 'settings-outline';
                    }

                    // You can return any component that you like here!
                    return (
                      <Ionicons name={iconName} size={size} color={color} />
                    );
                  },
                  tabBarActiveTintColor: '#90bae1',
                  tabBarInactiveTintColor: 'gray',
                })}>
                <Tab.Screen name="Home" component={ProfilesNavigator} />
                <Tab.Screen name="Settings" component={Settings} />
              </Tab.Navigator>
            </ContactsContextProvider>
          </MessagesContextProvider>
        </LocationsContextProvider>
      </ProfileTypeContextProvider>
    </DailyContextProvider>
  );
};
