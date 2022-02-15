import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Button,
  SectionList,
} from 'react-native';
import styled from 'styled-components/native';

const SingleContactContainer = styled(TouchableOpacity)`
  flex-direction: row;
  padding: 10px;
  padding-left: 0px;
  padding-right: 0px;
  z-index: 1;
`;
const ContactNumberName = styled(Text)`
    flex: 1
    font-size: 17px
    margin-left: 16px;
`;
const ContactNumber = styled(Text)`
  margin-right: 16px;
  font-size: 15;
`;

export const ContactsNumber = props => {
  const contacts = props.Contacts;
  const showDialog = props.showDialog;

  const SingleContact = ContactsMap => {
    if (ContactsMap.item.phoneNumbers[0] !== undefined) {
      const PhoneNumber = ContactsMap.item.phoneNumbers[0].number;
      const DisplayName = ContactsMap.item.displayName;
      return (
        <SingleContactContainer
          onPress={() => showDialog(PhoneNumber, DisplayName)}>
          <ContactNumberName>{DisplayName}</ContactNumberName>
          <ContactNumber>{PhoneNumber}</ContactNumber>
        </SingleContactContainer>
      );
    }
  };
  return (
    <FlatList
      data={contacts}
      renderItem={SingleContact}
      maxToRenderPerBatch={15}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};
export const ContactsNumberRN = props => {
  const showDialog = props.showDialog;
  const OriginalContacts = props.Contacts;
  const [nContacts, setNContacts] = useState(100);
  const [contacts, setContacts] = useState(OriginalContacts);
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
  const renderItemContent = ({item}) => {
    if (item.phoneNumbers.length > 0) {
      const PhoneNumber = item.phoneNumbers[0].number;
      return (
        <TouchableOpacity
          onPress={() =>
            showDialog(PhoneNumber.replace(/^\D+/g, ''), item.displayName)
          }>
          <View style={styles.row}>
            <Text>{item.displayName}</Text>
          </View>
        </TouchableOpacity>
      );
    } else {
      return <></>;
    }
  };
  const renderItemHeader = ({section}) => {
    return (
      <View style={styles.sectionHeader}>
        <Text>{section.title}</Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <SectionList
        onPress={() => showDialog(PhoneNumber, DisplayName)}
        stickySectionHeadersEnabled={true}
        sections={getData()}
        renderItem={renderItemContent}
        renderSectionHeader={renderItemHeader}
        removeClippedSubviews={true}
        keyExtractor={(item, index) => item.displayName + index}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignSelf: 'stretch',
  },
  row: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sectionHeader: {
    backgroundColor: '#efefef',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
