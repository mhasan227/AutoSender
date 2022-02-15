import React, {useState, useEffect, useContext, createContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthenticationContext} from '../authentication/authentication.context';
export const DailyContext = createContext();

export const DailyContextProvider = ({children}) => {
  const {user} = useContext(AuthenticationContext);
  const [Daily, setDaily] = useState(true);

  const saveDaily = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(`@Daily ${user.uid}`, jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const loadDaily = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(`@Daily ${user.uid}`);
      if (jsonValue) {
        setDaily(jsonValue != null ? JSON.parse(jsonValue) : null);
      }

      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e);
    }
  };
  const resetDaily = () => {
    setDaily(true);
  };
  const finishedDaily = () => {};

  useEffect(() => {
    loadDaily();
  }, []);

  useEffect(() => {
    saveDaily(Daily);
  }, [Daily]);

  return (
    <DailyContext.Provider
      value={{
        Daily,
        finishedDaily: finishedDaily,
        resetDaily: resetDaily,
      }}>
      {children}
    </DailyContext.Provider>
  );
};
