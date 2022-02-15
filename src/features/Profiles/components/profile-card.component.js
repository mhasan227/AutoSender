import React, {useState, useContext} from 'react';
import styled from 'styled-components/native';
import {TouchableOpacity, View} from 'react-native';
import {
  Avatar,
  Card,
  Title,
  Chip,
  IconButton,
  Badge,
  Text,
  Portal,
  Modal,
  Colors,
} from 'react-native-paper';
import {Button, Menu, Divider, Provider} from 'react-native-paper';

import {ProfilesContext} from '../../../services/profiles/profiles.context';
import {SelectedChips} from './chip.component';
import Moment from 'moment';

const CardProfile = styled(Card)`
  border-radius: 10px;
`;
const TitleContainer = styled.View`
  flex: 1;
  flex-direction: row
  padding: 10px;
  padding-left: 15px;
  padding-right: 5px;
  padding-bottom: 0px
`;
const BackgroundBorder = styled.View`
  margin: 15px;
  margin-bottom: 0px;
  border-radius: 10px;
`;
const TimeChipContainer = styled.View`
  flex: 1;
  flex-direction: row
  padding: 15px
  padding-bottom: 10px;
  padding-top: 0px
  bottom: 10px
`;
const DateChipContainer = styled.View`
  flex: 1;
  flex-direction: row
  padding: 15px
  padding-bottom: 10px;
  padding-top: 0px
  bottom: 10px
`;
const DateChip = styled(Chip)`
  margin: 5px
  margin-top: 0px
  margin-bottom: 0px
`;

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />;

export const ProfileCards = props => {
  const profiles = props.AllProfiles;
  const showModal = props.showModal;
  const profileBackgrounds = {Location: 'lightblue', Time: '#93C572'};
  const ProfileCard = ProfileProps => {
    Moment.locale('en');
    const dt1 = ProfileProps.time;
    const [isSwitchOn, setIsSwitchOn] = useState(false);

    return (
      <Provider>
        <BackgroundBorder>
          <CardProfile elevation={5}>
            <TouchableOpacity>
              <Card.Actions>
                <TitleContainer>
                  <Title>{ProfileProps.title}</Title>
                  {(ProfileProps.type === 'Location' ||
                    ProfileProps.type === 'Location Time') && (
                    <IconButton
                      icon="map-marker"
                      style={{margin: 0, marginTop: 5}}
                      size={20}
                      onPress={() => console.log('Pressed')}
                    />
                  )}
                  {ProfileProps.type === 'Time' && (
                    <IconButton
                      icon="clock"
                      style={{margin: 0, marginTop: 5}}
                      size={20}
                      onPress={() => console.log('Pressed')}
                    />
                  )}
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'flex-end',
                      flexDirection: 'row',
                    }}>
                    <IconButton
                      icon="dots-vertical"
                      color={Colors.black}
                      size={20}
                      onPress={() => showModal(ProfileProps)}
                    />
                  </View>
                </TitleContainer>
              </Card.Actions>
              <Card.Actions style={{padding: 0}}>
                <DateChipContainer>
                  <SelectedChips day={ProfileProps} />
                </DateChipContainer>
              </Card.Actions>
              {(ProfileProps.type === 'Time' ||
                ProfileProps.type === 'Location Time & Date') && (
                <Card.Actions style={{padding: 0}}>
                  <TimeChipContainer>
                    <DateChip mode="flat">{Moment(dt1).format('LT')}</DateChip>
                  </TimeChipContainer>
                </Card.Actions>
              )}
              {ProfileProps.type === 'Interval' && (
                <Card.Actions style={{padding: 0}}>
                  <TimeChipContainer>
                    <DateChip mode="flat">
                      {ProfileProps.interval} Seconds
                    </DateChip>
                  </TimeChipContainer>
                </Card.Actions>
              )}
              <Card.Actions style={{padding: 0}}>
                <TimeChipContainer>
                  <DateChip mode="flat">
                    {ProfileProps.messages.length} Messages
                  </DateChip>
                </TimeChipContainer>
              </Card.Actions>
            </TouchableOpacity>
          </CardProfile>
        </BackgroundBorder>
      </Provider>
    );
  };
  return ProfileCard(profiles);
};
