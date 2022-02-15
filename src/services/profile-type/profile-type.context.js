import React, {useState, useEffect, useContext, createContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthenticationContext} from '../authentication/authentication.context';
export const ProfileTypeContext = createContext();

export const ProfileTypeContextProvider = ({children}) => {
  const {user} = useContext(AuthenticationContext);
  const [ProfileType, setProfileType] = useState('');
  const saveProfileType = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(`@ProfileType ${user.uid}`, jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const loadProfileType = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(`@ProfileType ${user.uid}`);
      if (jsonValue) {
        AddProfileType(jsonValue != null ? JSON.parse(jsonValue) : null);
      }

      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e);
    }
  };
  const AddProfileType = NewProfileType => {
    setProfileType(NewProfileType);
  };
  const clearProfileType = () => {
    setProfileType('');
  };

  useEffect(() => {
    loadProfileType();
  }, []);

  useEffect(() => {
    saveProfileType(ProfileType);
  }, [ProfileType]);

  return (
    <ProfileTypeContext.Provider
      value={{
        ProfileType,
        addToProfileType: AddProfileType,
        clearProfileType: clearProfileType,
      }}>
      {children}
    </ProfileTypeContext.Provider>
  );
};
