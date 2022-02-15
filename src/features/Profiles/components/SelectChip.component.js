import React, {useState, useContext} from 'react';
import {Chip} from 'react-native-paper';
import {ProfilesContext} from '../../../services/profiles/profiles.context';
import {View} from 'react-native';
import styled from 'styled-components/native';

const DayChip = styled(Chip)`
  margin-right:10px
  height: 35px
  margin-top: 10px
`;
export const ChipComponent = ({selectedDateChips, setSelectedDateChips}) => {
  const {profiles, addToProfiles, addOrRemoveDate, isSelected} =
    useContext(ProfilesContext);
  const [dateChips, setDateChips] = useState([
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
    'Sun',
  ]);
  const AddDayToProfiles = event => {
    const day =
      event._dispatchInstances.memoizedProps.children[0].props.children[2].props
        .children;
    if (InSelectedDateChips(day)) {
      removeSelectedDateChips(day);
    } else {
      setSelectedDateChips([...selectedDateChips, day]);
    }
  };
  const InSelectedDateChips = date => {
    return selectedDateChips.some(item => date === item);
  };

  const removeSelectedDateChips = date => {
    setSelectedDateChips(selectedDateChips.filter(item => date !== item));
  };

  const AllChips = () => {
    return dateChips.map(ChipContent => {
      return (
        <DayChip
          selected={InSelectedDateChips(ChipContent)}
          mode="flat"
          onPress={event => AddDayToProfiles(event)}>
          {ChipContent}
        </DayChip>
      );
    });
  };

  return AllChips();
};
