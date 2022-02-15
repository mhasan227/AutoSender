import React, {useState, useContext} from 'react';
import {
  Caption,
  Title,
  Button,
  TextInput,
  IconButton,
  Subheading,
  Snackbar,
} from 'react-native-paper';
import {useTheme} from 'react-native-paper';
import {View, Text, ScrollView, FlatList, TouchableOpacity} from 'react-native';
import NumericInput from 'react-native-numeric-input';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import {ProfilesContext} from '../../../services/profiles/profiles.context';
import {LocationsContext} from '../../../services/locations/locations.context';
import {ProfileTypeContext} from '../../../services/profile-type/profile-type.context';
import {ChipComponent} from '../components/SelectChip.component';
import {AppbarHeader} from '../components/AppbarHeader.component';
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';
import {MessagesContext} from '../../../services/messages/messages.context';

const ChipContainer = styled.View`
  flex-direction: row
  align-items: center
  margin-top: 8px
  margin-left: 16px
  margin-right: 16px
  margin-bottom: 16px
  flex-wrap: wrap
`;
const MessagesContainer = styled.View`
  margin-left: 25px;
  margin-bottom: 20px;
`;
const TimePickerContainer = styled.View`
  margin-left: 16px
  margin-bottom: 24px
  margin-right: 16px
`;
const AddButtonContainer = styled.View`
  flex-direction: row
  align-items: center
  flex-align: center
`;
const SubmitButtonContainer = styled.View`
  margin-left: 16px
  margin-right: 16px
`;
const ChipTitle = styled(Subheading)`
  margin-left: 25px;
`;
const ChipTitleOpacity = styled(TouchableOpacity)`
  flex: 1;
`;
const ChipAddTitle = styled(ChipTitle)`
  flex: 1;
`;
const SetTitle = styled(TextInput)`
  margin: 16px;
`;
const MessageContainer = styled.View`
  flex-direction: row;
`;
const LocationContainer = styled.View`
  margin-left: 25px;
  margin-bottom: 20px;
`;
const TimeContainer = styled.View`
  margin-left: 25px;
  margin-bottom: 20px;
`;
const NumericInputContainer = styled.View`
  margin-left: 25px;
  margin-top: 10px;
`;
Date.prototype.addHours = function (h) {
  this.setTime(this.getTime() + h * 60 * 60 * 1000);
  return this;
};

export const CreateProfilesScreen = ({route, navigation}) => {
  const {colors} = useTheme();
  const [visible, setVisible] = useState(false);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  const {ProfileType} = useContext(ProfileTypeContext);
  const {addToProfiles, profileNameUsed} = useContext(ProfilesContext);
  const {Locations, clearLocations} = useContext(LocationsContext);
  const {Messages, clearMessages} = useContext(MessagesContext);
  const [selectedDateChips, setSelectedDateChips] = useState([]);
  const [titleValue, setTitleValue] = useState('');
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [intervalSec, setIntervalSec] = useState(5);
  const [makeNavigation, setMakeNavigation] = useState(true);
  const getMakeNavigation = () => {
    if (profileNameUsed(titleValue).length > 0) {
      console.log('1');
      return true;
    } else if (titleValue.length === 0) {
      console.log('2');
      return true;
    } else if (Messages.length === 0) {
      console.log('3');
      return true;
    } else if (
      selectedDateChips.length === 0 &&
      (ProfileType === 'Time' || ProfileType === 'Location Time')
    ) {
      console.log('4');
      return true;
    } else if (
      Locations.length === 0 &&
      (ProfileType === 'Location' || ProfileType === 'Location Time')
    ) {
      console.log('5');
      return true;
    }
    return false;
  };
  const showError = errorMessage => {
    setVisible(true);
    setError(errorMessage);
  };

  const createProfile = () => {
    if (profileNameUsed(titleValue).length > 0) {
      showError('Title Already Used');
    } else if (titleValue.length === 0) {
      showError('Please Add A Title');
    } else if (Messages.length === 0) {
      showError('Please Add A Message');
    } else if (
      selectedDateChips.length === 0 &&
      (ProfileType === 'Time' || ProfileType === 'Location Time')
    ) {
      showError('Please Selected A Date');
    } else if (
      Locations.length === 0 &&
      (ProfileType === 'Location' || ProfileType === 'Location Time')
    ) {
      showError('Please Selected A Location');
    } else {
      addToProfiles(
        titleValue,
        date,
        selectedDateChips,
        Messages,
        ProfileType,
        Locations,
        intervalSec,
      );
    }
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showTimepicker = () => {
    showMode('time');
  };
  const renderMessages = ({item}) => {
    return (
      <View style={{flexDirection: 'row'}}>
        <Text style={{flex: 1}}>{item.message}</Text>
        <Text style={{paddingRight: 15}}>{item.number}</Text>
      </View>
    );
  };
  const renderLocations = ({item}) => {
    if (item.Lat && item.Lng) {
      return (
        <View style={{flexDirection: 'row'}}>
          <Text>
            <Text style={{fontWeight: 'bold'}}>Lat: </Text>
            {item.Lat.toFixed(3).toString()}
          </Text>
          <Text>
            <Text style={{fontWeight: 'bold'}}> Lng: </Text>
            {item.Lng.toFixed(3).toString()}
          </Text>
        </View>
      );
    } else {
      return <Text>No Messages</Text>;
    }
  };
  return (
    <>
      <AppbarHeader
        title="Create Profile"
        subtitle="Add Profiles To Ban Apps"
        navigate="Profiles"
        OnPressBack={() => {
          clearMessages();
          clearLocations();
        }}
        OnPressNavigate={() => createProfile()}
        BackButton={true}
        navigation={navigation}
        noNavigationFunc={getMakeNavigation}
        action={true}
      />
      <SetTitle
        label="Title"
        value={titleValue}
        mode="outlined"
        placeholder="Title"
        onChangeText={text => {
          setTitleValue(text);
        }}
        theme={{roundness: 10}}
      />
      <Snackbar
        duration={4000}
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Ok',
          onPress: () => {
            // Do something
          },
        }}>
        {error}
      </Snackbar>

      {(ProfileType === 'Time' || ProfileType === 'Location Time') && (
        <>
          <View>
            <ChipTitle style={{color: colors.accent}}>
              Select Day of the week
            </ChipTitle>
            <ChipContainer>
              <ChipComponent
                selectedDateChips={selectedDateChips}
                setSelectedDateChips={setSelectedDateChips}
              />
            </ChipContainer>
          </View>
          <View>
            <>
              <AddButtonContainer>
                <ChipTitleOpacity onPress={() => showTimepicker()}>
                  <ChipAddTitle style={{color: colors.accent}}>
                    Select Time To Send Message
                  </ChipAddTitle>
                </ChipTitleOpacity>
                <IconButton
                  color={colors.primary}
                  icon="clock"
                  onPress={() => showTimepicker()}
                  size={22.5}
                  style={{margin: 0, marginRight: 10}}
                />
              </AddButtonContainer>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
                />
              )}
              <TimeContainer>
                <Text>{Moment(date).format('hh:mm A')}</Text>
              </TimeContainer>
            </>
          </View>
        </>
      )}
      <View>
        <AddButtonContainer>
          <ChipTitleOpacity
            onPress={() =>
              navigation.navigate('Add Messages', {SelectedPhoneNumber: ''})
            }>
            <ChipAddTitle style={{color: colors.accent}}>
              Add Message
            </ChipAddTitle>
          </ChipTitleOpacity>
          <IconButton
            color={colors.primary}
            icon="message-plus"
            onPress={() =>
              navigation.navigate('Add Messages', {SelectedPhoneNumber: ''})
            }
            size={22.5}
            style={{margin: 0, marginRight: 10}}
          />
        </AddButtonContainer>
        <MessagesContainer>
          {Messages.length ? (
            <FlatList
              data={Messages}
              renderItem={renderMessages}
              keyExtractor={(item, index) => index.toString()}
            />
          ) : (
            <Text>No Messages</Text>
          )}
        </MessagesContainer>
      </View>
      <View>
        {(ProfileType === 'Location' || ProfileType === 'Location Time') && (
          <>
            <AddButtonContainer>
              <ChipTitleOpacity
                onPress={() =>
                  navigation.navigate('Select Location', {initialRegion: ''})
                }>
                <ChipAddTitle style={{marginTop: 5, color: colors.accent}}>
                  Add Location
                </ChipAddTitle>
              </ChipTitleOpacity>
              <IconButton
                color={colors.primary}
                icon="map-marker"
                onPress={() =>
                  navigation.navigate('Select Location', {initialRegion: ''})
                }
                size={25}
                style={{margin: 0, marginRight: 10}}
              />
            </AddButtonContainer>
            <LocationContainer>
              {Locations.length ? (
                <FlatList
                  data={Locations}
                  renderItem={renderLocations}
                  keyExtractor={(item, index) => index.toString()}
                />
              ) : (
                <Text>No Locations</Text>
              )}
            </LocationContainer>
          </>
        )}
      </View>
      <View>
        {ProfileType === 'Interval' && (
          <>
            <ChipTitle>Select Interval In Seconds</ChipTitle>
            <NumericInputContainer>
              <NumericInput
                value={intervalSec}
                onChange={value => setIntervalSec(value)}
                totalWidth={100}
                totalHeight={50}
                iconSize={20}
                minValue={0}
                type="up-down"
                rounded
                textColor="black"
                iconStyle={{color: 'white'}}
                upDownButtonsBackgroundColor="black"
                leftButtonBackgroundColor="black"
              />
            </NumericInputContainer>
          </>
        )}
      </View>
    </>
  );
};
