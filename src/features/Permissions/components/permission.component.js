import React from 'react';
import {Image, View} from 'react-native';

import {Subheading, Button, useTheme, Headline} from 'react-native-paper';
export const Permission = ({
  permissionTitle,
  permissionContext,
  nextPermission,
  getPermission,
}) => {
  const {colors} = useTheme();
  return (
    <>
      <View style={{flex: 1, padding: 10, justifyContent: 'center'}}>
        <Image
          source={require('../images/locationIcon.png')}
          style={{
            width: 200,
            height: 200,
            opacity: 0.7,
            alignSelf: 'center',
            flex: 0.75,
          }}
          resizeMode="contain"></Image>
        <View style={{padding: 10}}>
          <Headline
            style={{
              marginBottom: 5,
              color: colors.primary,
              fontWeight: 'bold',
            }}>
            {permissionTitle}
          </Headline>
          <Subheading style={{color: 'grey'}}>{permissionContext}</Subheading>
        </View>
      </View>
      <View style={{flex: 0.2}}>
        <Button mode="outlined" style={{margin: 10}}>
          Deny
        </Button>
        <Button
          dark={true}
          mode="contained"
          style={{marginLeft: 10, marginRight: 10}}
          onPress={() => {
            getPermission();
            nextPermission();
          }}>
          Accept
        </Button>
      </View>
    </>
  );
};
