import React, {useState, useEffect, useContext} from 'react';
import {View, Text, Image} from 'react-native';
import auth from '@react-native-firebase/auth';
import {SnackBar} from '../components/snackbar.component';
import {TextInput, Button, useTheme} from 'react-native-paper';
import {TouchableOpacity} from 'react-native';
import {AuthenticationContext} from '../../../services/authentication/authentication.context';
import {NavigationContainer} from '@react-navigation/native';

export const LogInScreen = ({navigation}) => {
  const {colors} = useTheme();
  const {onSignIn, error, isLoading} = useContext(AuthenticationContext);
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [visible, setVisible] = useState(false);
  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <>
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
            loading={isLoading}
            contentStyle={{height: 55}}
            mode="contained"
            color={'white'}
            onPress={() => {
              onSignIn(email, password);
              if (error) {
                setVisible(true);
              }
            }}>
            <Text style={{color: colors.primary}}>Log In</Text>
          </Button>

          <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('SignUp');
              }}>
              <Text>
                Don't Have An Account?
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

  return (
    <View>
      <Text>Welcome {user.email}</Text>
    </View>
  );
};
