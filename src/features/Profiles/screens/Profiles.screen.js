import React, {useContext, useState, useEffect} from 'react';
import {Image} from 'react-native';
import {FlatList, View} from 'react-native';
import {Appbar, IconButton, Colors, Caption} from 'react-native-paper';
import {ProfileCards} from '../components/profile-card.component';
import {ProfilesContext} from '../../../services/profiles/profiles.context';
import {Platform, NativeModules} from 'react-native';
import {MessagesContext} from '../../../services/messages/messages.context';
import {LocationsContext} from '../../../services/locations/locations.context';
import {ProfileTypeContext} from '../../../services/profile-type/profile-type.context';
import {AddForegroundService} from '../../../services/foreground/foreground';
import {
  Modal,
  Portal,
  Text,
  Button,
  Provider,
  List,
  TouchableRipple,
  Paragraph,
} from 'react-native-paper';
import {TouchableOpacity} from 'react-native';
export const ProfilesScreen = ({navigation}) => {
  const {profiles, removeFromProfiles, toggleActive, setToday} =
    useContext(ProfilesContext);
  const {Messages, clearMessages} = useContext(MessagesContext);
  const {clearLocations} = useContext(LocationsContext);
  const {clearProfileType} = useContext(ProfileTypeContext);
  const {StatusBarManager} = NativeModules;
  const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 0 : StatusBarManager.HEIGHT;
  const [visible, setVisible] = useState(false);
  const [profileTitle, setProfileTitle] = useState({active: false, title: ''});
  const [runForeground, setRunForeground] = useState(true);
  const showModal = ParamProfileTitle => {
    setVisible(true);
    setProfileTitle(ParamProfileTitle);
  };
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 0};
  const renderItem = ({item}) => {
    return <ProfileCards AllProfiles={item} showModal={showModal} />;
  };

  if (profiles) {
    AddForegroundService(profiles, setToday);
  }

  return (
    <>
      <Appbar.Header dark={true} statusBarHeight={STATUSBAR_HEIGHT}>
        <Appbar.Content
          title="Profiles"
          subtitle={'All Profiles Are Shown Here'}
        />
        <Appbar.Action
          size={35}
          icon="plus"
          onPress={() => {
            clearMessages();
            clearLocations();
            clearProfileType();
            navigation.navigate('SelectProfileType');
          }}
        />
      </Appbar.Header>

      {profiles.length === 0 ? (
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            clearMessages();
            clearLocations();
            clearProfileType();
            navigation.navigate('SelectProfileType');
          }}>
          <>
            <Image
              source={require('../../../../assets/addProfile.png')}
              style={{width: 150, height: 150, opacity: 0.6}}
            />
          </>
        </TouchableOpacity>
      ) : (
        <FlatList
          contentContainerStyle={{paddingBottom: 10}}
          data={profiles}
          keyExtractor={item => item.title}
          renderItem={renderItem}
        />
      )}
      <Provider>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={containerStyle}
            style={{padding: 20}}>
            <List.Section>
              <List.Subheader>Settings</List.Subheader>
              <List.Item
                title="Delete"
                left={() => <List.Icon icon="delete" />}
                onPress={() => {
                  removeFromProfiles(profileTitle.title);
                  setVisible(false);
                }}
              />
              <List.Item
                title="Edit"
                left={() => <List.Icon color="#000" icon="account-edit" />}
              />

              <List.Item
                title={profileTitle.active ? 'Disable' : 'Enable'}
                left={() => <List.Icon color="#000" icon="folder" />}
                onPress={() => {
                  toggleActive(profileTitle.title);
                  setVisible(false);
                }}
              />
            </List.Section>
          </Modal>
        </Portal>
      </Provider>
    </>
  );
};
