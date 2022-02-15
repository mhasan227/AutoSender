import React, {useState, useEffect, useContext} from 'react';
import {View, Text, Image, useColorScheme} from 'react-native';
import auth from '@react-native-firebase/auth';
import {SnackBar} from '../components/snackbar.component';
import {TextInput, Button, useTheme} from 'react-native-paper';
import {TouchableOpacity} from 'react-native';
import {AuthenticationContext} from '../../../services/authentication/authentication.context';
import {NavigationContainer} from '@react-navigation/native';
export const Options = ({navigation}) => {
  const {colors} = useTheme();

  return (
    <View>
      <View
        style={{
          height: '100%',
          backgroundColor: colors.primary,
          opacity: 0.6,
        }}></View>

      <Image
        source={require('../../../../assets/WhiteLogo.png')}
        style={{
          position: 'absolute',
          bottom: 300,
          flex: 1,
          alignSelf: 'center',
          width: '100%',
          resizeMode: 'contain',
        }}
      />
      <View
        style={{
          margin: 10,
          top: 450,
          width: '90%',
          flex: 1,

          alignSelf: 'center',
          position: 'absolute',
        }}>
        <Button
          style={{
            margin: 10,
            borderRadius: 100,
            borderWidth: 1.5,
            height: 60,
            borderColor: 'white',
            alignContent: 'center',
            justifyContent: 'center',
          }}
          contentStyle={{height: 60}}
          mode="outlined"
          onPress={() => {
            navigation.navigate('SignUp');
          }}>
          <Text style={{color: 'white'}}>Sign Up</Text>
        </Button>
        <Button
          style={{
            margin: 10,
            marginTop: 5,
            borderRadius: 100,
            borderWidth: 2,

            alignContent: 'center',
            justifyContent: 'center',

            elevation: 0,
          }}
          contentStyle={{height: 60}}
          color="white"
          mode="contained"
          onPress={() => {
            navigation.navigate('LogIn');
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 15,
              color: colors.primary,
            }}>
            Log In
          </Text>
        </Button>
      </View>
    </View>
  );
};
