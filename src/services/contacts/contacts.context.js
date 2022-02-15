import React, {
  useState,
  useEffect,
  useRef,
  createContext,
  useContext,
} from 'react';

import {ContactsRequest, allContactsRequest} from './contacts.service';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const ContactsContext = createContext();

import {AuthenticationContext} from '../authentication/authentication.context';

export const ContactsContextProvider = ({children}) => {
  const [originalContacts, setOriginalContacts] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const {user} = useContext(AuthenticationContext);
  const saveContacts = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(`@Contacts ${user.uid}`, jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const loadContacts = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(`@Contacts ${user.uid}`);
      if (jsonValue) {
        setContacts(jsonValue != null ? JSON.parse(jsonValue) : null);
      }

      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    saveContacts(contacts);
  }, [contacts]);

  const onSearch = searchKeyword => {
    setIsLoading(true);
    setKeyword(searchKeyword);
  };

  const getData = () => {
    let contactsArr = [];
    let aCode = 'A'.charCodeAt(0);
    for (let i = 0; i < 26; i++) {
      let currChar = String.fromCharCode(aCode + i);
      let obj = {
        title: currChar,
      };

      let currContacts = contacts.filter(item => {
        return item.displayName[0].toUpperCase() === currChar;
      });
      if (currContacts.length > 0) {
        currContacts.sort((a, b) => a.displayName.localeCompare(b.displayName));
        obj.data = currContacts;
        contactsArr.push(obj);
      }
    }
    return contactsArr;
  };

  useEffect(() => {
    if (keyword !== '') {
      ContactsRequest(keyword.toLowerCase(), originalContacts)
        .then(result => {
          setIsLoading(false);

          setContacts(result);
        })
        .catch(err => {
          setIsLoading(false);
          setError(err);
        });
    } else {
      setContacts(originalContacts);
      setIsLoading(false);
    }
  }, [keyword]);

  useEffect(() => {
    loadContacts();
    if (contacts.length === 0) {
      allContactsRequest()
        .then(result => {
          setIsLoading(false);
          setOriginalContacts(result);
          setContacts(result);
        })
        .catch(err => {
          setOriginalContacts(false);
          setError(err);
        });
    }
  }, []);

  return (
    <ContactsContext.Provider
      value={{
        search: onSearch,

        keyword,
        contacts,
        isLoading,
        getData: getData,
      }}>
      {children}
    </ContactsContext.Provider>
  );
};
