import React, {useState, useEffect, useContext, createContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthenticationContext} from '../authentication/authentication.context';
export const TutorialContext = createContext();

export const TutorialContextProvider = ({children}) => {
  const [Tutorial, setTutorial] = useState(true);
  const getUser = async () => {
    const {userTmp} = await useContext(AuthenticationContext);
    return userTmp;
  };
  const user = getUser();
  const saveTutorial = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(`@Tutorial ${user.uid}`, jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const loadTutorial = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(`@Tutorial ${user.uid}`);

      if (jsonValue) {
        AddTutorial(jsonValue != null ? JSON.parse(jsonValue) : null);
      }

      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e);
    }
  };
  const AddTutorial = NewTutorial => {
    setTutorial(NewTutorial);
  };
  const clearTutorial = () => {
    setTutorial(true);
  };

  useEffect(() => {
    loadTutorial();
  }, []);

  useEffect(() => {
    saveTutorial(Tutorial);
  }, [Tutorial]);

  return (
    <TutorialContext.Provider
      value={{
        Tutorial,
        addToTutorial: AddTutorial,
        clearTutorial: clearTutorial,
      }}>
      {children}
    </TutorialContext.Provider>
  );
};
