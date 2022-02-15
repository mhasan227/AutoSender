import React, {useState, useEffect, useContext, createContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthenticationContext} from '../authentication/authentication.context';
export const ProfilesContext = createContext();

export const ProfilesContextProvider = ({children}) => {
  const {user} = useContext(AuthenticationContext);
  const [profiles, setProfiles] = useState([]);
  const currentDate = new Date();
  // [ {
  // title: "title"
  // on: false
  // date: [mon,tue]
  // time: [12,12]
  // },
  // ]
  const saveProfiles = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(`@profiles ${user.uid}`, jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const loadProfiles = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(`@profiles ${user.uid}`);
      if (jsonValue) {
        setProfiles(jsonValue != null ? JSON.parse(jsonValue) : null);
      }

      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e);
    }
  };
  const changeProfile = profile => {
    let oldProfiles = Object.assign({}, profiles); // creating copy of state variable jasper
    oldProfiles.title = profile;
    setProfiles([...profiles, profile]);
  };
  const addProfile = (
    profileTitle,
    Time,
    Date,
    messages,
    messageType,
    Locations,
    intervalSec,
  ) => {
    setProfiles([
      {
        title: profileTitle,
        messages: messages,
        date: Date,
        on: false,
        time: Time,
        type: messageType,
        locations: Locations,
        interval: intervalSec,
        active: true,
        today: currentDate.getDay() + 1,
      },
      ...profiles,
    ]);
  };

  const setToday = (profileName, todayNum) => {
    const newProfiles = profiles.filter(x => x.title === profileName);
    newProfiles[0]['today'] = todayNum;
  };
  const clearAsyncStorage = async () => {
    AsyncStorage.clear();
  };
  const toggleActive = profileName => {
    //removeProfile(profileName)
    const newProfiles = profiles.filter(x => x.title === profileName);
    newProfiles[0]['active'] = false;
  };
  //clearAsyncStorage();
  const removeProfile = profileName => {
    const newProfiles = profiles.filter(x => x.title !== profileName);
    setProfiles(newProfiles);
  };
  const addOrRemoveDate = profile => {
    if (isSelected) {
      removeProfile(profile);
    } else {
      addProfile(profile);
    }
  };
  const profileNameUsed = profileName => {
    return profiles.filter(x => x.title === profileName);
  };
  const isSelected = profile => {
    return profiles.some(item => profile === item.title);
  };

  useEffect(() => {
    loadProfiles();
  }, []);
  useEffect(() => {
    loadProfiles();
  }, [user]);

  useEffect(() => {
    saveProfiles(profiles);
  }, [profiles]);

  return (
    <ProfilesContext.Provider
      value={{
        profiles,
        toggleActive: toggleActive,
        addToProfiles: addProfile,
        removeFromProfiles: removeProfile,
        addOrRemoveDate: addOrRemoveDate,
        isSelected: isSelected,
        setToday,
        profileNameUsed,
      }}>
      {children}
    </ProfilesContext.Provider>
  );
};
