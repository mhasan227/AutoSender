import React, {useState, useEffect, useContext, createContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthenticationContext} from '../authentication/authentication.context';
export const MessagesContext = createContext();

export const MessagesContextProvider = ({children}) => {
  const {user} = useContext(AuthenticationContext);
  const [Messages, setMessages] = useState([]);
  // [ {
  // title: "title"
  // on: false
  // date: [mon,tue]
  // time: [12,12]
  // },
  // ]
  const saveMessages = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(`@messages ${user.uid}`, jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const loadMessages = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(`@messages ${user.uid}`);
      if (jsonValue) {
        setMessages(jsonValue != null ? JSON.parse(jsonValue) : null);
      }

      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e);
    }
  };
  const addMessages = (messageNumber, messageText) => {
    messageText = messageText.replace(/(\r\n|\n|\r)/gm, '');
    setMessages([
      {
        number: messageNumber,
        message: messageText,
      },
      ...Messages,
    ]);
  };
  const clearMessages = () => {
    setMessages([]);
  };
  const removeMessages = messageName => {
    const newMessages = Messages.filter(x => x.title !== messageNumber);
    setMessages(newMessages);
  };

  useEffect(() => {
    loadMessages();
    return () => {
      setMessages([]); // This worked for me
    };
  }, []);

  useEffect(() => {
    saveMessages(Messages);
  }, [Messages]);

  return (
    <MessagesContext.Provider
      value={{
        Messages,
        addToMessages: addMessages,
        clearMessages: clearMessages,
      }}>
      {children}
    </MessagesContext.Provider>
  );
};
