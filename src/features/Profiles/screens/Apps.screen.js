import React, {useContext, useState} from 'react';
import {Search} from '../components/searchbar.component';
import {AppsContext, changeActive} from '../../../services/apps/apps.context';
import {TextInput, Caption} from 'react-native-paper';
import {FlatList, SafeAreaView, Text} from 'react-native';
import {View} from 'react-native';
import styled from 'styled-components/native';
const SetPhoneNumber = styled(TextInput)`
  margin: 16px;
`;
const SetWhatsappMsg = styled(TextInput)`
  margin: 16px;
`;
const SearchContainer = styled.View`
  padding: ${props => props.theme.space[3]};
  z-index: 999;
  top: 20px;
  width: 100%;
`;
const ChipTitle = styled(Caption)`
  margin-left: 25px
  margin-bottom: 5px
  margin-top: 20px
`;

export const AppsScreen = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [whatsAppMsg, setWhatsAppMsg] = useState('');

  const {Apps} = useContext(AppsContext);
  const renderItem = ({item}) => {
    return (
      <View>
        <Text>{item.name}</Text>
      </View>
    );
  };
  return (
    <>
      <SearchContainer>
        <Search />
      </SearchContainer>
      <SafeAreaView>
        <FlatList
          keyExtractor={item => item.name}
          data={Apps}
          renderItem={renderItem}
        />
      </SafeAreaView>
      <View>
        <ChipTitle>Phone Number</ChipTitle>
        <SetPhoneNumber
          label="PhoneNumber"
          value={mobileNumber}
          onChangeText={mobileNumber => setMobileNumber(mobileNumber)}
          mode="outlined"
          placeholder="PhoneNumber"
        />
        <ChipTitle>WhatsApp Message</ChipTitle>
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
    </>
  );
};
