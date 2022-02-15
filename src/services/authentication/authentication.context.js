import React, {useState, createContext} from 'react';
import {
  createUserRequest,
  loginUserRequest,
  getUser,
  logOut,
} from './authentication.service';
import auth from '@react-native-firebase/auth';

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState();
  const [error, setError] = useState('');
  getUser(setUser);

  const onSignUp = (email, password) => {
    setIsLoading(true);
    createUserRequest(email, password, setError);

    setIsLoading(false);
  };
  const onSignIn = (email, password, navigation) => {
    setIsLoading(true);
    loginUserRequest(email, password, navigation, setError);
    setIsLoading(false);
  };

  const onSignOut = () => {
    logOut();
  };

  return (
    <AuthenticationContext.Provider
      value={{
        user,
        isLoading,
        error,
        onSignUp,
        onSignIn,
        onSignOut,
      }}>
      {children}
    </AuthenticationContext.Provider>
  );
};
