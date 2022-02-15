import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {TutorialScreen} from '../../features/Tutorial/screens/Tutorial.screen';
import {ProfilesNavigator} from './Profiles.navigator';
const Tutorial = createStackNavigator();

export const TutorialNavigator = () => (
  <Tutorial.Navigator screenOptions={{headerShown: false}}>
    <Tutorial.Screen name="Tutorial" component={TutorialScreen} />
    <Tutorial.Screen name="ProfilesHome" component={ProfilesNavigator} />
  </Tutorial.Navigator>
);
