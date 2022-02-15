import React, {useState, useContext} from 'react';
import {TextInput} from 'react-native-paper';
import {SafeAreaView, Text} from 'react-native';
import {View} from 'react-native';
import styled from 'styled-components/native';
import {AppbarHeader} from '../components/AppbarHeader.component';
import {MessagesContext} from '../../../services/messages/messages.context';
import {useTheme} from 'react-native-paper';
const SetPhoneNumber = styled(TextInput)`
  margin: 16px;
`;
const SetWhatsappMsg = styled(TextInput)`
  margin: 16px;
  margin-top: 0px;
`;
const ContactsNumberContainer = styled.View`
  margin: 16px;
`;

export const AddMessagesScreen = ({route, navigation}) => {
  const {colors} = useTheme();
  const [mobileNumber, setMobileNumber] = useState();

  const [whatsAppMsg, setWhatsAppMsg] = useState('\n\n');

  const {addToMessages} = useContext(MessagesContext);

  const AddMessage = () => {};
  const setMobileNumberFunc = num => {
    setMobileNumber(num);
  };
  return (
    <SafeAreaView>
      <View>
        <AppbarHeader
          title="Add Contact"
          subtitle="Add A PhoneNumber Or Select A Contact"
          navigation={navigation}
          action={true}
          navigate="Create Profile"
          BackButton={true}
          OnPressNavigate={() => addToMessages(mobileNumber, whatsAppMsg)}
        />
        <SetPhoneNumber
          label="PhoneNumber"
          value={mobileNumber}
          onChangeText={mobileNumber => setMobileNumber(mobileNumber)}
          mode="outlined"
          placeholder="PhoneNumber"
          size={35}
          right={
            <TextInput.Icon
              name="account-multiple-plus"
              color={colors.primary}
              onPress={() => {
                navigation.navigate('Select Contact', {
                  setMobileNumberFunc: setMobileNumberFunc,
                });
              }}
            />
          }
        />
        <SetWhatsappMsg
          value={whatsAppMsg}
          multiline={true}
          label="Text Message"
          placeholder="Text Message"
          mode="outlined"
          numberOfLines={5}
          onChangeText={whatsAppMsg => setWhatsAppMsg(whatsAppMsg)}
        />
      </View>
    </SafeAreaView>
  );
};
