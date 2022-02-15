import React from 'react';
import styled from 'styled-components/native';
import {Chip} from 'react-native-paper';

const DateChip = styled(Chip)`
  margin: 5px
  margin-top: 10px
  margin-bottom: 0px
`;

export const SelectedChips = props => {
  const AllSelectedChips = props.day.date;
  const ProfileCards = Props => {
    const day = Props;
    return (
      <DateChip mode="flat" onPress={() => console.log('Pressed')}>
        {day}
      </DateChip>
    );
  };

  const SelectedChipMap = () => {
    return AllSelectedChips.map(ChipMap => {
      return ProfileCards(ChipMap);
    });
  };
  return SelectedChipMap();
};
