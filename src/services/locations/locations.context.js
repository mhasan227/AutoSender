import React, {useState, useEffect, createContext, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthenticationContext} from '../authentication/authentication.context';
export const LocationsContext = createContext();

export const LocationsContextProvider = ({children}) => {
  const {user} = useContext(AuthenticationContext);
  const [Locations, setLocations] = useState([]);
  const saveLocations = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(`@locations ${user.uid}`, jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const loadLocations = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(`@locations ${user.uid}`);
      if (jsonValue) {
        AddLocations(jsonValue != null ? JSON.parse(jsonValue) : null);
      }

      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e);
    }
  };
  const AddLocations = (Lat, Lng, range) => {
    setLocations([
      ...Locations,
      {
        Lat: Lat,
        Lng: Lng,
        range: range,
      },
    ]);
  };
  const clearLocations = () => {
    setLocations([]);
  };

  useEffect(() => {
    loadLocations();
  }, []);

  useEffect(() => {
    saveLocations(Locations);
  }, [Locations]);

  return (
    <LocationsContext.Provider
      value={{
        Locations,
        addToLocations: AddLocations,
        clearLocations: clearLocations,
      }}>
      {children}
    </LocationsContext.Provider>
  );
};
