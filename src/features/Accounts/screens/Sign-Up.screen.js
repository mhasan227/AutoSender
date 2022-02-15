import React, {useState, useEffect, useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import auth from '@react-native-firebase/auth';
import {TextInput, Button, useTheme} from 'react-native-paper';
import {AuthenticationContext} from '../../../services/authentication/authentication.context';
import {SnackBar} from '../components/snackbar.component';
export const SignUpScreen = ({navigation}) => {
  // Set an initializing state whilst Firebase connects
  const {colors} = useTheme();
  const {onSignUp, error} = useContext(AuthenticationContext);
  const [visible, setVisible] = useState();
  const [user, setUser] = useState();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  if (!user) {
    return (
      <>
        <View
          style={{
            height: '100%',
            backgroundColor: colors.secondary,
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
        <View style={{margin: 10, top: 400, width: 400, position: 'absolute'}}>
          <TextInput
            color={colors.primary}
            label="Email"
            outlineColor={colors.primary}
            value={email}
            mode="outlined"
            style={{
              margin: 10,
              marginTop: 0,
              marginBottom: 5,
              backgroundColor: colors.primary,
              color: 'white',
              borderWidth: 0,
            }}
            theme={{
              roundness: 50,
              colors: {
                text: 'white',
                placeholder: 'white',
                primary: 'white',
              },
            }}
            onChangeText={password => setEmail(password)}
          />
          <TextInput
            secureTextEntry={true}
            color={colors.primary}
            label="Password"
            outlineColor={colors.primary}
            value={password}
            mode="outlined"
            style={{
              margin: 10,
              marginTop: 0,
              marginBottom: 20,
              backgroundColor: colors.primary,
              color: 'white',
              borderWidth: 0,
            }}
            theme={{
              roundness: 50,
              colors: {
                text: 'white',
                placeholder: 'white',
                primary: 'white',
              },
            }}
            onChangeText={password => setPassword(password)}
          />

          <Button
            style={{
              margin: 10,
              borderRadius: 100,
              borderColor: 'white',
              alignContent: 'center',
              justifyContent: 'center',
              elevation: 0,
            }}
            contentStyle={{height: 55}}
            mode="contained"
            color={'white'}
            onPress={() => {
              onSignUp(email, password);
              if (error) {
                setVisible(true);
              }
            }}>
            <Text style={{color: colors.primary}}>Create Account</Text>
          </Button>

          <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('LogIn');
              }}>
              <Text>
                <Text>Already Have An Account?</Text>

                <Text style={{color: colors.primary, fontWeight: 'bold'}}>
                  {' '}
                  Log In Here
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <SnackBar visible={visible} setVisible={setVisible} text={error} />
      </>
    );
  }
  navigation.navigate('Home', {screen: 'Tutorial'});
  return <Text>logging in</Text>;
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});
