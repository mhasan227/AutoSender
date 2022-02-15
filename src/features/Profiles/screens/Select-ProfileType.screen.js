import React, {useContext} from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';
import {AppbarHeader} from '../components/AppbarHeader.component';
import {Text, TouchableRipple} from 'react-native-paper';
import {Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';
import {ProfileTypeContext} from '../../../services/profile-type/profile-type.context';
const SelectionView = styled(TouchableRipple)`
    flex: 1
    margin: 10px
    margin-top: 15px
    margin-bottom: 0px
    borderRadius: 10px
`;
const SelectionViewBottom = styled(SelectionView)`
  marginbottom: 15px;
`;
const SelectionCard = styled(Card)`
  flex: 1;
`;
export const SelectProfileTypeScreen = ({navigation}) => {
  const LeftContentLocation = props => (
    <Avatar.Icon {...props} icon="map-marker" />
  );
  const {addToProfileType} = useContext(ProfileTypeContext);
  const LeftContentTime = props => <Avatar.Icon {...props} icon="clock" />;
  const LeftContentInterval = props => <Avatar.Icon {...props} icon="timer" />;
  return (
    <>
      <AppbarHeader
        title="Select Type"
        action={false}
        subtitle="Choose Between Types of Profiles"
        navigate="Create Profile"
        navigation={navigation}
        OnPressNavigate={() => {}}
        BackButton={true}
      />
      <SelectionView
        onPress={() => {
          addToProfileType('Location');
          navigation.navigate('Create Profile', {ProfileType: 'Location'});
        }}
        rippleColor="rgba(0, 0, 0, .32)"
        borderless={true}>
        <SelectionCard>
          <Card.Title title="Location" left={LeftContentLocation} />
          <Card.Content>
            <Paragraph>
              Select A Location Which Will Trigger A Message To Be Sent To Your
              Selected Recipient.
            </Paragraph>
          </Card.Content>
          <Card.Actions></Card.Actions>
        </SelectionCard>
      </SelectionView>
      <SelectionView
        onPress={() => {
          addToProfileType('Location Time');
          navigation.navigate('Create Profile', {
            ProfileType: 'Location Time',
          });
        }}
        rippleColor="rgba(0, 0, 0, .32)"
        borderless={true}>
        <SelectionCard>
          <Card.Title title="Location Time & Date" left={LeftContentLocation} />
          <Card.Content>
            <Paragraph>
              Select A Location With A Time And Date To Send The Message.
            </Paragraph>
          </Card.Content>
          <Card.Actions></Card.Actions>
        </SelectionCard>
      </SelectionView>
      <SelectionView
        onPress={() => {
          addToProfileType('Time');
          navigation.navigate('Create Profile', {ProfileType: 'Time'});
        }}
        rippleColor="rgba(0, 0, 0, .32)"
        borderless={true}>
        <SelectionCard>
          <Card.Title title="Time & Date" left={LeftContentTime} />
          <Card.Content>
            <Paragraph>
              Select A Specific Time And Date To Send The Message.
            </Paragraph>
          </Card.Content>
          <Card.Actions></Card.Actions>
        </SelectionCard>
      </SelectionView>
      <SelectionView
        style={{marginBottom: 15}}
        onPress={() => {
          addToProfileType('Interval');
          navigation.navigate('Create Profile', {ProfileType: 'Interval'});
        }}
        rippleColor="rgba(0, 0, 0, .32)"
        borderless={true}>
        <SelectionCard>
          <Card.Title title="Spam Message" left={LeftContentInterval} />
          <Card.Content>
            <Paragraph>
              Select A Message To Be Sent Every Few Seconds, You Can Choose The
              Seconds.
            </Paragraph>
          </Card.Content>
          <Card.Actions></Card.Actions>
        </SelectionCard>
      </SelectionView>
    </>
  );
};
