import React, {useState} from 'react';
import Contacts from 'react-native-contacts';

export const ContactsRequest = (searchTerm, contacts) => {
  const AllContacts = contacts.filter(x =>
    x.displayName.toLowerCase().includes(searchTerm),
  );

  return new Promise((resolve, reject) => {
    if (!AllContacts) {
      reject('not found');
    }
    resolve(AllContacts);
  });
};

export const allContactsRequest = () => {
  return new Promise((resolve, reject) => {
    Contacts.getAll()
      .then(contacts => {
        resolve(contacts);
      })
      .catch(err => {
        console.log(err);
      });
  });
};
