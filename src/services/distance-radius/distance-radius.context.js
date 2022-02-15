import React, {useState, useEffect, useContext, createContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthenticationContext} from '../authentication/authentication.context';
export const DistanceRadiusContext = createContext();

export const DistanceRadiusContextProvider = ({children}) => {
  const {user} = useContext(AuthenticationContext);
  const [DistanceRadius, setDistanceRadius] = useState();
  const saveDistanceRadius = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(`@DistanceRadius ${user.uid}`, jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const loadDistanceRadius = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(
        `@DistanceRadius ${user.uid}`,
      );
      if (jsonValue) {
        AddDistanceRadius(jsonValue != null ? JSON.parse(jsonValue) : null);
      }

      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e);
    }
  };
  const AddDistanceRadius = NewDistanceRadius => {
    setDistanceRadius(NewDistanceRadius);
  };
  const clearDistanceRadius = () => {
    setDistanceRadius(100);
  };

  useEffect(() => {
    loadDistanceRadius();
  }, []);

  useEffect(() => {
    saveDistanceRadius(DistanceRadius);
  }, [DistanceRadius]);

  return (
    <DistanceRadiusContext.Provider
      value={{
        DistanceRadius,
        addToDistanceRadius: AddDistanceRadius,
        clearDistanceRadius: clearDistanceRadius,
      }}>
      {children}
    </DistanceRadiusContext.Provider>
  );
};
