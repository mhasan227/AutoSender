import auth from '@react-native-firebase/auth';

export const createUserRequest = (email, password, setError) => {
  let errorMessage;
  if (!email || !password) {
    setError('No Email Or Password');
  } else {
    auth()
      .createUserWithEmailAndPassword(email.trim(), password)

      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          setError('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          setError('That email address is invalid!');
        }
      });
  }
};
export const loginUserRequest = (email, password, navigation, setError) => {
  if (!email || !password) {
    setError('No Email Or Password');
  } else {
    auth()
      .signInWithEmailAndPassword(email.trim(), password)
      .then(() => {
        navigation.navigate('Home', {screen: 'Tutorial'});
      })
      .catch(error => {
        let errorCode = error.code;
        let errorMessage;
        if (errorCode === 'auth/invalid-email')
          errorMessage = 'Your email address appears to be malformed.';
        else if (errorCode === 'auth/wrong-password')
          errorMessage = 'Your password is wrong.';
        else if (errorCode === 'auth/user-not-found')
          errorMessage = "User with this email doesn't exist.";
        else if (errorCode === 'auth/user-disabled')
          errorMessage = 'User with this email has been disabled.';
        else if (errorCode === 'auth/too-many-requests')
          errorMessage = 'Too many requests. Try again later.';
        else if (errorCode === 'ERROR_OPERATION_NOT_ALLOWED')
          errorMessage = 'Signing in with Email and Password is not enabled.';
        else errorMessage = 'An undefined Error happened.';
        setError(errorMessage);
      });
  }
  return undefined;
};
export const getUser = setUser => {
  return auth().onAuthStateChanged(user => {
    if (user) {
      // User logged in already or has just logged in.
      setUser(user);
    } else {
      setUser(undefined);
      // User not logged in or has just logged out.
    }
  });
};
export const logOut = () => {
  auth()
    .signOut()
    .then(() => console.log('User signed out!'));
};
