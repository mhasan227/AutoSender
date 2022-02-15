import React, {useState, useContext} from 'react';
import {SafeAreaView, Text} from 'react-native';
import {Searchbar, ActivityIndicator} from 'react-native-paper';
import {View} from 'react-native';
import styled from 'styled-components/native';
import {ContactsContext} from '../../../services/contacts/contacts.context';
import {
  ContactsNumber,
  ContactsNumberRN,
} from '../components/ContactsNumber.component';
import {AppbarHeader} from '../components/AppbarHeader.component';

import {Button, Paragraph, Dialog, Portal, Provider} from 'react-native-paper';

const ContactsNumberContainer = styled.View`
  zindex: 100px;
`;
const ContactsSearchbar = styled(Searchbar)`
  margin: 20px;
  position: absolute;
`;

export const SelectContactScreen = ({route, navigation}) => {
  const {setMobileNumberFunc} = route.params;
  const {contacts, search, isLoading, getData} = useContext(ContactsContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [visible, setVisible] = useState(false);
  const [number, setNumber] = useState('');
  const [clickable, setClickable] = useState(true);
  const [displayName, setDisplayName] = useState('');
  const [showSearchbar, setShowSearchbar] = useState(false);
  const showDialog = (PhoneNumber, Name) => {
    if (clickable) {
      setNumber(PhoneNumber);
      setDisplayName(Name);
      setClickable(false);
    }
    setNumber(PhoneNumber);
    setDisplayName(Name);
    setVisible(true);
  };

  const hideDialog = () => {
    setVisible(false);
    setClickable(false);
  };

  const ToggleSearchbar = () => {
    setShowSearchbar(!showSearchbar);
  };
  const onChangeSearch = query => {
    setSearchQuery(query);
    search(query);
  };
  return (
    <View>
      <AppbarHeader
        title="Select Contact"
        subtitle="Select A Contact To Recieve The Message"
        OnPressNavigate={ToggleSearchbar}
        navigation={navigation}
        noNavigation={true}
        BackButton={true}
        action={true}
        icon="magnify"
      />

      {showSearchbar && (
        <View>
          <ContactsNumberContainer>
            <ContactsSearchbar
              placeholder="Search"
              onChangeText={onChangeSearch}
              value={searchQuery}
            />
          </ContactsNumberContainer>
        </View>
      )}
      {isLoading ? (
        <ActivityIndicator animating={true} />
      ) : (
        <>
          <View>
            <ContactsNumberRN
              Contacts={contacts}
              showDialog={showDialog}
              getData={getData}
            />
          </View>
        </>
      )}
      <View>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Confirm</Dialog.Title>
            <Dialog.Content>
              <Paragraph>
                Are You Sure You Want To Select "{displayName}" As The Contact?
              </Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                onPress={() => {
                  setMobileNumberFunc(number);
                  navigation.goBack();
                }}>
                Yes
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </View>
  );
};
