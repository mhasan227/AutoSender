import React, {useContext, useState} from 'react';
import {Text, SafeAreaView, View} from 'react-native';
import {
  Avatar,
  List,
  Card,
  Modal,
  Provider,
  Portal,
  Button,
  Menu,
  IconButton,
  Divider,
} from 'react-native-paper';
import {MenuComponent} from '../components/menu.component';
import {AuthenticationContext} from '../../../services/authentication/authentication.context';
import {TutorialContext} from '../../../services/tutorial/tutorial.context';
export const Settings = ({navigation}) => {
  const {user, onSignOut} = useContext(AuthenticationContext);
  const {addToTutorial} = useContext(TutorialContext);

  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 0};
  return (
    <>
      <Card.Title
        title="User"
        subtitle={user.displayName || user.uid.substring(0, 15) + '...'}
        style={{marginTop: 20}}
        left={props => <Avatar.Icon {...props} icon="account" />}
        right={props => (
          <MenuComponent
            props={props}
            setVisible={setVisible}
            visible={visible}
          />
        )}
      />
      <List.Section>
        <List.Accordion
          title="Personal Info"
          left={props => <List.Icon {...props} icon="account" />}>
          <List.Item title={user.email} />
          <List.Item title={user.displayName || user.uid} />
        </List.Accordion>
      </List.Section>
      <Provider>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={containerStyle}
            style={{padding: 20}}>
            <List.Section>
              <List.Subheader style={{padding: 0}}>Account</List.Subheader>
              <List.Item
                title="Log Out"
                left={() => <List.Icon icon="logout" />}
                onPress={() => {
                  onSignOut();
                  setVisible(false);
                }}
              />
              <List.Item
                title="Tutorial"
                left={() => <List.Icon color="#000" icon="account-question" />}
                onPress={() => {
                  addToTutorial(true);
                  navigation.navigate('TutorialProfiles');
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
{
  /* 
<View
  style={{
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
    paddingTop: 30,
    backgroundColor: 'grey',
    color: 'white',
  }}>
  <View style={{flex: 1, alignItems: 'center'}}>
    <IconButton
      icon="account-question"
      color={'white'}
      size={30}
      onPress={() => navigation.navigate('TutorialProfiles')}
    />
  </View>
  <View style={{flex: 1, alignItems: 'center'}}>
    <Avatar.Icon size={50} icon="account" />
    <Text style={{color: 'white'}}>User</Text>
  </View>

  <View style={{flex: 1, alignItems: 'center'}}>
    <IconButton
      icon="logout"
      color={'white'}
      size={30}
      onPress={() => onSignOut()}
    />
  </View>
</View>;
*/
}
